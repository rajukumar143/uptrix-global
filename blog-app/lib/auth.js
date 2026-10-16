import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_session";
export const SESSION_DURATION_SECONDS = 30 * 60; // 30 minutes

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET must be defined and at least 16 characters long.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign a new JWT token valid for 30 minutes
 */
export async function signSession(payload = {}) {
  const key = getSecretKey();
  return await new SignJWT({ ...payload, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(key);
}

/**
 * Verify an existing JWT session token
 */
export async function verifySession(token) {
  if (!token) return null;
  try {
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Cookie options for admin session
 */
export function getSessionCookieOptions(maxAge = SESSION_DURATION_SECONDS) {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  };
}
