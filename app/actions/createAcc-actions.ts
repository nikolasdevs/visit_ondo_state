"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { AccommodationType, CategoryType } from "@prisma/client";
import prisma from "@/lib/db";
import z from "zod";

const accommodationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  address: z.string().min(1, "Address is required"),
  localGovt: z.string().min(1, "Local Govt is required"),
  description: z.string().min(1, "Description is required"),
  type: z.nativeEnum(AccommodationType),
  category: z.nativeEnum(CategoryType),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Slug can only contain letters, numbers, and hyphens"
    ),
  userId: z.string().uuid(),
});

export async function createAccommodation(formData: FormData) {
  const supabase = await createClient();

  // Retrieve the authenticated user
  const { data: user, error } = await supabase.auth.getUser();
  const userId = user.user?.id;
  if (!userId) {
    throw new Error("User ID not found. Ensure the user is authenticated.");
  }
  if (error || !user) {
    throw new Error("User not authenticated");
  }

  // Parse and validate form data
  const data = accommodationSchema.parse({
    title: formData.get("title") as string,
    address: formData.get("address") as string,
    localGovt: formData.get("localGovt") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
    userId,
    // imageUrl: formData.get("imageFile") as string,
  });

  // Handle image upload
  const imageFiles = formData.getAll("images") as File[];

  const sanitizeFileName = (filename: string) =>
    filename
      .replace(/[^a-zA-Z0-9_.-]/g, "_") // Replace invalid characters with "_"
      .toLowerCase();

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const sanitizedFileName = sanitizeFileName(file.name);
      const uniquePath = `accommodation/${Date.now()}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from("accommodation") // Ensure this matches your bucket name in Supabase
        .upload(uniquePath, file);

      if (error) {
        console.error("Image upload error:", error.message);
        return null;
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/accommodation/${data.path}`;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const uploadedImageUrls: string[] = [];
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        uploadedImageUrls.push(imageUrl); // Store the uploaded URL
      } else {
        console.error(`Failed to upload image: ${file.name}`);
      }
    }
  } else {
    // Provide a fallback if no files are uploaded
    uploadedImageUrls.push("https://picsum.photos/seed/picsum/200/300");
  }

  await prisma.accommodation.create({
    data: {
      title: data.title,
      address: data.address,
      localGovt: data.localGovt,
      description: data.description,
      slug: data.slug,
      type: data.type,
      category: data.category,
      user: { connect: { id: userId } },
      imageUrls: uploadedImageUrls,
    },
  });

  revalidatePath("/where-to-stay");
}
