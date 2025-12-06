import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { getIPAddress } from "./location";
import { SESSION_LIFETIME } from "@/config/constant";
import { sessions, users } from "@/drizzle/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

type CreateSessionData = {
  userAgent: string;
  ip: string;
  userId: number;
  token: string;
};

const createUserSession = async ({
  token,
  userId,
  userAgent,
  ip,
}: CreateSessionData) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const [session] = await db.insert(sessions).values({
    id: hashedToken,
    UserId:userId,
    userAgent:userAgent,
    ip:ip,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
  });
  return session;
};

const getSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

export const createSessionAndSetCookies = async (userId: number) => {
  const token = getSessionToken();
  const ip = await getIPAddress();
  const headerList = await headers();

  await createUserSession({
    token: token,
    userId: userId,
    userAgent: headerList.get("user-agent") || "",
    ip: ip,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });

};


export const validateSessionAndGetUser = async (token: string) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

   const [user] = await db
    .select({
      id: users.id,
      session: {
        id: sessions.id,
        expiresAt: sessions.expiresAt,
        userAgent: sessions.userAgent,
        ip: sessions.ip,
      },
      name: users.name,
      userName: users.userName,
      role: users.role,
      phoneNumber: users.phoneNumber,
      email: users.email,
      // emailVerifiedAt: users.emailVerifiedAt,
      // avatarUrl: users.avatarUrl,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(sessions)
    .where(eq(sessions.id, hashedToken))
    .innerJoin(users, eq(users.id, sessions.UserId));

return user;

}