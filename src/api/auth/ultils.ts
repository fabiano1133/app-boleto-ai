"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  sub: string;
  email: string;
  name?: string;
  mobilePhone: string;
  isSubscriber: boolean;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token?.value) {
    redirect("/auth/sign-in");
  }

  return {
    Authorization: `Bearer ${token.value}`,
    "Content-type": "application/json",
    token: token.value,
  };
}

export async function getUserFromToken(
  token: string
): Promise<JwtPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch {
    return null;
  }
}
