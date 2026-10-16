import { NextResponse } from "next/server";
import { verifySession, signSession, COOKIE_NAME, getSessionCookieOptions } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Allow unauthenticated access to the login page itself
  if (pathname === "/admin/login") {
    // If the user already has a valid session, redirect them directly to /admin/upload
    const existingToken = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySession(existingToken);
    if (session) {
      return NextResponse.redirect(new URL("/admin/upload", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect all other /admin/* routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySession(token);

    if (!session) {
      // Missing or expired token: redirect to login with callback URL
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      const response = NextResponse.redirect(loginUrl);
      
      // Clear any invalid cookie
      response.cookies.set({
        ...getSessionCookieOptions(0),
        value: "",
      });
      return response;
    }

    // 3. Sliding inactivity timeout: Re-issue a fresh 30-minute token on each authenticated request
    const response = NextResponse.next();
    try {
      const refreshedToken = await signSession({ username: session.username });
      response.cookies.set({
        ...getSessionCookieOptions(),
        value: refreshedToken,
      });
    } catch (refreshErr) {
      console.error("[middleware] Session refresh error:", refreshErr);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
