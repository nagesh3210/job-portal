"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { RegisterUserData, registerUserSchema } from "../auth.schema";
import { createSessionAndSetCookies } from "./usecases/sessions";

export const registrationAction = async (data: RegisterUserData) => {
  try {


    const{data:validatedData, error} = registerUserSchema.safeParse(data);
    if(error){
      return {
        status: "error",
        message: error.issues[0].message,
      };
    }

    const { name, email, password, role, userName } = validatedData;


    const [user]= await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)))

    if(user){
      if(user.email=== email){
        return {
          status: "error",
          message: "Email already in use",
        };
      } 
      if(user.userName === userName){
        return {
          status: "error",
          message: "Username already in use",
        };
      }
    }

    const hashPassword = await argon2.hash(password);

    const [result]= await db.insert(users).values({
      name,
      email,
      password: hashPassword,
      role,
      userName,
    });

    console.log("Inserted User ID:", result.insertId);

    await createSessionAndSetCookies(Number(result.insertId));


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


export const loginAction = async (data:LoginData ) => {

    try 
    {


        const { email, password } = data;

              console.log("Login Data Submitted:", data);


        const [user] = await db.select().from(users).where(eq(users.email, email));


          await createSessionAndSetCookies(user.id);
 

        console.log("Found User:", user);

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
        return{
            status: "success",
            message: "Login successful",
        };

    } 
    catch (error) 
    {
        return {
            status: "error",
            message: "Unkown error occurred during login",
        };
    }

}