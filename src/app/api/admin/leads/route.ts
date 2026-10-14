import { createHash, timingSafeEqual } from "node:crypto";
import { ZodError } from "zod";
import { addLead, parseLeadInput } from "@/lib/lead-store";

const recent = new Map<string, number[]>();

function secretMatches(request: Request) {
  const expected = process.env.ADMIN_API_SECRET;
  const received = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!expected || expected.length < 32) return false;
  return timingSafeEqual(createHash("sha256").update(expected).digest(), createHash("sha256").update(received).digest());
}

function configuredPublicOrigin() {
  if (!process.env.PUBLIC_SITE_URL) return null;
  try {
    const url = new URL(process.env.PUBLIC_SITE_URL);
    if (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function jsonResponse(request: Request, body: unknown, status: number) {
  const headers = new Headers();
  const origin = request.headers.get("origin");
  if (origin && origin === configuredPublicOrigin()) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  return Response.json(body, { status, headers });
}

function rateLimited(address: string) {
  const now = Date.now();
  const timestamps = (recent.get(address) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  timestamps.push(now);
  recent.set(address, timestamps);
  return timestamps.length > 60;
}

export function OPTIONS(request: Request) {
  const allowedOrigin = configuredPublicOrigin();
  if (!allowedOrigin) return new Response(null, { status: 503 });
  if (request.headers.get("origin") !== allowedOrigin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Max-Age": "600",
      Vary: "Origin",
    },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = configuredPublicOrigin();
  if (origin && origin !== allowedOrigin) return jsonResponse(request, { error: "Origin is not allowed." }, 403);
  if (!secretMatches(request)) return jsonResponse(request, { error: "Unauthorized." }, 401);

  const address = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (rateLimited(address.trim())) return jsonResponse(request, { error: "Too many requests." }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(request, { error: "Invalid JSON." }, 400);
  }
  try {
    await addLead(parseLeadInput(body));
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonResponse(request, { error: "Invalid lead data." }, 400);
    }
    console.error("Admin API could not store a website enquiry", error);
    return jsonResponse(request, { error: "The enquiry could not be saved." }, 500);
  }
  return jsonResponse(request, { ok: true }, 201);
}

export { GET } from "@/app/admin/api/leads/route";
