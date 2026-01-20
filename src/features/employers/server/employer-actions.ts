// src/features/employers/server/employer-actions.ts
"use server";

import { db } from "@/config/db";
import { employers } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { eq } from "drizzle-orm";
import { EmployerProfileData } from "../employers.schemas";

export async function updateEmployerProfileAction(data: EmployerProfileData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "employer") {
    return { status: "ERROR", message: "Unauthorized" };
  }

  const {
    name,
    description,
    location,
    yearOfEstablishment,
    websiteUrl,
    organizationType,
    teamSize,
  } = data;

  await db
    .update(employers)
    .set({
      name,
      description,
      location : location || null,
      yearOfEstablishment: yearOfEstablishment
        ? parseInt(yearOfEstablishment)
        : null,
      websiteUrl : websiteUrl || null,
      organizationType,
      teamSize,
      updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    })
    .where(eq(employers.id, currentUser.id));

  return { status: "SUCCESS", message: "Profile updated successfully" };
}
