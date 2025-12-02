// "use server";

// import { db } from "@/config/db";
// import { users } from "@/drizzle/schema";
// import argon2 from "argon2";
// import { eq, or } from "drizzle-orm";

// export const registrationAction = async (data: {
//   userName: string;
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   role: "applicant" | "employer";
// }) => {
//   try {
//     const { name, email, password, role, userName } = data;


//     const [user]= await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)))

//     if(user){
//       if(user.email=== email){
//         return {
//           status: "error",
//           message: "Email already in use",
//         };
//       } 
//       if(user.userName === userName){
//         return {
//           status: "error",
//           message: "Username already in use",
//         };
//       }
//     }

//     const hashPassword = await argon2.hash(password);

//     await db.insert(users).values({
//       name,
//       email,
//       password: hashPassword,
//       role,
//       userName,
//     });

//     return {
//       status: "success",
//       message: "User registered successfully",
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message: "Registration failed",
//     };
//   }
// };
