// Server-only: admin login sessions. Do not import this file from client components.
//
// Set these in .env.local (or your server's environment):
//   ADMIN_USERNAME        the admin login name
//   ADMIN_PASSWORD        the admin password
//   ADMIN_SESSION_SECRET  a long random string used to sign the login cookie
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "uptrix_admin";
const SESSION_DAYS = 7;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32);
}

function sign(payload: string) {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET as string).update(payload).digest("base64url");
}

function sameText(a: string, b: string) {
  // Compare hashes so the comparison takes the same time whatever the input length
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkCredentials(username: string, password: string) {
  if (!adminConfigured()) return false;
  const userOk = sameText(username.trim(), process.env.ADMIN_USERNAME as string);
  const passOk = sameText(password, process.env.ADMIN_PASSWORD as string);
  return userOk && passOk;
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${expires}.${randomBytes(16).toString("base64url")}`;
  return { token: `${payload}.${sign(payload)}`, expires: new Date(expires) };
}

function verifyToken(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(payload.split(".")[0]) > Date.now();
}

export async function isAdmin() {
  return verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Use at the top of every admin page and admin server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export function cookieSecure() {
  // Browsers drop "secure" cookies on plain http. Set ADMIN_ALLOW_HTTP=true only if the
  // site runs without HTTPS (not recommended).
  return process.env.NODE_ENV === "production" && process.env.ADMIN_ALLOW_HTTP !== "true";
}

// ---- Simple brute-force protection: 5 wrong attempts locks that address for 15 minutes ----
const attempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function clientAddress() {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "local").trim();
}

export function lockedFor(ip: string) {
  const a = attempts.get(ip);
  return a && a.lockedUntil > Date.now() ? Math.ceil((a.lockedUntil - Date.now()) / 60000) : 0;
}

export function recordFailure(ip: string) {
  const a = attempts.get(ip) ?? { count: 0, lockedUntil: 0 };
  a.count += 1;
  if (a.count >= MAX_ATTEMPTS) {
    a.lockedUntil = Date.now() + LOCK_MS;
    a.count = 0;
  }
  attempts.set(ip, a);
}

export function clearFailures(ip: string) {
  attempts.delete(ip);
}
