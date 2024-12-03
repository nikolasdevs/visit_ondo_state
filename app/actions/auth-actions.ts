"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import prisma from "@/lib/db";
import z from "zod";

export async function login(formData: FormData) {
  const supabase = await createClient();

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
