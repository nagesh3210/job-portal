"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";

export const registrationAction = async (data:{userName: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "applicant" | "employer";}
) => { 
    
       
    const {name , email , password , role , userName} = data;

    await db.insert(users).values({name , email , password , role , userName});


    
}



