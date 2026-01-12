"use server";

import { db } from "@/config/db";
import { users, employers, applicants } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { RegisterUserData, registerUserSchema } from "../auth.schema";
import {
  createSessionAndSetCookies,
  invalidateSession,
} from "./usecases/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export const registrationAction = async (data: RegisterUserData) => {
  try {
    const { data: validatedData, error } = registerUserSchema.safeParse(data);

    if (error) {
      return {
        status: "error",
        message: error.issues[0].message,
      };
    }

    const { name, email, password, role, userName } = validatedData;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email) {
        return {
          status: "error",
          message: "Email already in use",
        };
      }
      if (user.userName === userName) {
        return {
          status: "error",
          message: "Username already in use",
        };
      }
    }

    const hashPassword = await argon2.hash(password);

    let insertedUserId!: number;

    await db.transaction(async (tx) => {
      const [result] = await tx.insert(users).values({
        name,
        email,
        password: hashPassword,
        role,
        userName,
      });

      insertedUserId = Number(result.insertId);

      if (role === "employer") {
        await tx.insert(employers).values({
          id: insertedUserId,
          name,
        });
      }

      if (role === "applicant") {
        await tx.insert(applicants).values({
          id: insertedUserId,
        });
      }
    });

    await createSessionAndSetCookies(insertedUserId);

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

type LoginData = {
  email: string;
  password: string;
};

export const loginAction = async (data: LoginData) => {
  try {
    const { email, password } = data;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return {
        status: "error",
        message: "Invalid email or password",
      };
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return {
        status: "error",
        message: "Invalid email or password",
      };
    }

    await createSessionAndSetCookies(user.id);

    return {
      status: "success",
      message: "Login successful",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Unkown error occurred during login",
    };
  }
};

export const LogOutAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) redirect("/login");

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  await invalidateSession(session);

  return redirect("/login");
};
