"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";

export const registrationAction = async (data: {
  userName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer";
}) => {
  try {
    const { name, email, password, role, userName } = data;

    const hashPassword = await argon2.hash(password);

    await db.insert(users).values({
      name,
      email,
      password: hashPassword,
      role,
      userName,
    });

    return {
      status: "success",
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Registration failed",
    };
  }
};
