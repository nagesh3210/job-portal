import { headers } from "next/headers";
import crypto from "crypto";
import { getIPAddress } from "./location";
import { SESSION_LIFETIME } from "@/config/constant";
import { sessions } from "@/drizzle/schema";
import { db } from "@/config/db";

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
};
