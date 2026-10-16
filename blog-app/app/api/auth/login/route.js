import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signSession, getSessionCookieOptions } from "@/lib/auth";
import { logLoginAttempt } from "@/lib/supabase-admin";
import { checkLoginRateLimit } from "@/lib/rate-limit";

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(request) {
  const ip = getClientIp(request);

  // 1. Upstash Redis Rate Limiting (10 requests per minute per IP)
  const rateLimitResult = await checkLoginRateLimit(ip);
  if (!rateLimitResult.success) {
    await logLoginAttempt(ip, false);
    return NextResponse.json(
      { error: "Too many login attempts. Please wait 1 minute before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { username, password } = body || {};

    const configuredUsername = process.env.ADMIN_USERNAME?.trim();
    const configuredHash = process.env.ADMIN_PASSWORD_HASH?.trim().replace(/^['"]|['"]$/g, '');

    if (!configuredUsername || !configuredHash) {
      console.error("[api/auth/login] ADMIN_USERNAME or ADMIN_PASSWORD_HASH is not configured.");
      await logLoginAttempt(ip, false);
      return NextResponse.json(
        { error: "Authentication system is not properly configured." },
        { status: 500 }
      );
    }

    // Verify username and bcrypt password hash
    const isUsernameMatch = username === configuredUsername;
    const isPasswordMatch = typeof password === "string" && (await bcrypt.compare(password, configuredHash));
    const isAuthenticated = isUsernameMatch && isPasswordMatch;

    // 2. Log every attempt into the login_attempts table
    await logLoginAttempt(ip, isAuthenticated);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }

    // 3. Issue signed JWT session token (30-minute expiry)
    const token = await signSession({ username: configuredUsername });

    // 4. Return success and set secure httpOnly cookie
    const response = NextResponse.json(
      { success: true, message: "Authentication successful." },
      { status: 200 }
    );

    const cookieOptions = getSessionCookieOptions();
    response.cookies.set({
      ...cookieOptions,
      value: token,
    });

    return response;
  } catch (error) {
    console.error("[api/auth/login] Login error:", error);
    await logLoginAttempt(ip, false);
    return NextResponse.json(
      { error: "An error occurred during authentication." },
      { status: 500 }
    );
  }
}
