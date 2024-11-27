"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AccommodationType, CategoryType } from "@prisma/client";
import prisma from "@/lib/db";
import z from "zod";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/private", "layout");
  redirect("/private");
}

export async function signup(formData: FormData) {
  const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().min(2, "Email is required"),
    password: z.string().min(4, "Password is required"),
  });
  const supabase = await createClient();

  const data = userSchema.parse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error || !authData?.user?.id) {
    console.error("Supabase signup error:", error);
    redirect("/error");
  }
  try {
    await prisma.user.create({
      data: {
        id: authData.user?.id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (dbError) {
    console.error("Database error:", dbError);
    redirect("/error");
  }

  revalidatePath("/private", "layout");
  redirect("/private");
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/private");
  redirect("/private");
}

const accommodationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  address: z.string().min(1, "Address is required"),
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
  //add user
  userId: z.string().uuid(),

  // category:,
});
const tourismSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  category: z.nativeEnum(CategoryType),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Slug can only contain letters, numbers, and hyphens"
    ),
  //add user
  userId: z.string().uuid(),

  // category:,
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
    // id: formData.get("id") as string,
    title: formData.get("title") as string,
    address: formData.get("address") as string,
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
      const uniquePath = `accommodations/${Date.now()}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from("accommodations") // Ensure this matches your bucket name in Supabase
        .upload(uniquePath, file);

      if (error) {
        console.error("Image upload error:", error.message);
        return null;
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/accommodations/${data.path}`;
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
export async function createTourism(formData: FormData) {
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
  const data = tourismSchema.parse({
    // id: formData.get("id") as string,
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
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
      const uniquePath = `tourism/${Date.now()}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from("tourism") // Ensure this matches your bucket name in Supabase
        .upload(uniquePath, file);

      if (error) {
        console.error("Image upload error:", error.message);
        return null;
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/tourism/${data.path}`;
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
  await prisma.tourism.create({
    data: {
      title: data.title,
      location: data.location,
      description: data.description,
      slug: data.slug,
      category: data.category,
      user: { connect: { id: userId } },
      imageUrls: uploadedImageUrls,
    },
  });

  revalidatePath("/tourism");
}
