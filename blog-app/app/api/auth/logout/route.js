import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });
  
  // Clear admin session cookie
  response.cookies.set({
    ...getSessionCookieOptions(0),
    value: "",
  });

  return response;
}

export async function GET(request) {
  // Allow browser navigation to /api/auth/logout with redirect
  const redirectUrl = new URL("/admin/login", request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set({
    ...getSessionCookieOptions(0),
    value: "",
  });

  return response;
}
