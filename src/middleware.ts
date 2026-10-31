import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin", "/api/admin", "/admin/api"];
const ASSET_PATH = /^\/(?:logo[^/]*|icon\.png|favicon\.ico|apple-icon(?:\d*)?(?:\.png)?|manifest\.webmanifest|robots\.txt|sitemap\.xml)$/;

function isPathOrChild(path: string, root: string) {
  return path === root || path.startsWith(`${root}/`);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Immediately terminate WordPress cron, PHP probes, and scanner bots in 0ms with Connection: close
  if (
    path.endsWith(".php") ||
    path.startsWith("/wp-") ||
    path.startsWith("/xmlrpc") ||
    path.startsWith("/phpmyadmin") ||
    path.includes(".env") ||
    path.includes("/.")
  ) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Connection": "close",
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  // Let Next.js internals, static bundles, images, and public assets pass immediately
  if (
    isPathOrChild(path, "/_next") ||
    isPathOrChild(path, "/media") ||
    ASSET_PATH.test(path) ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Detect Host / Subdomain (supports local port forwarding and reverse proxies)
  const rawHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host || "";
  const hostname = rawHost.toLowerCase().split(":")[0];

  // 1. OLD ADMIN SUBDOMAIN: admin.localhost or admin.uptrixglobal.com -> Redirect to proud.
  if (hostname === "admin.localhost" || hostname === "admin.uptrixglobal.com" || hostname.startsWith("admin.")) {
    const newHost = rawHost.replace(/^admin\./i, "proud.");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.host = newHost;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // 2. PROUD ADMIN SUBDOMAIN: proud.localhost or proud.uptrixglobal.com
  const isProudAdmin =
    hostname === "proud.localhost" ||
    hostname === "proud.uptrixglobal.com" ||
    hostname.startsWith("proud.");

  if (isProudAdmin) {
    // If visiting root or /login on the proud admin subdomain, go directly to admin
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }
    if (path === "/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url), 307);
    }

    // Only allow admin endpoints and health check on the proud admin subdomain
    const isAdminAllowed =
      isPathOrChild(path, "/admin") ||
      isPathOrChild(path, "/api/admin") ||
      isPathOrChild(path, "/admin/api") ||
      path === "/api/health";

    if (!isAdminAllowed) {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }

    return NextResponse.next();
  }

  // 3. PUBLIC WEBSITE (uptrixglobal.com / localhost:3000):
  // Admin dashboard is strictly hosted on proud.uptrixglobal.com (or proud.localhost:3000).
  // If someone accesses /admin or /admin/* on the public site, redirect them to the proud subdomain!
  if (isPathOrChild(path, "/admin")) {
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const proudOrigin = isLocal
      ? (process.env.ADMIN_SITE_URL || "http://proud.localhost:3000")
      : "https://proud.uptrixglobal.com";
    return NextResponse.redirect(new URL(`${path}${request.nextUrl.search}`, proudOrigin), 307);
  }

  // Block admin APIs on public domain
  if (isPathOrChild(path, "/api/admin") || isPathOrChild(path, "/admin/api")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // APP_MODE overrides (used when running separate public & admin production instances)
  const mode = process.env.APP_MODE;
  if (mode === "all" || process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // PUBLIC APP MODE (uptrixglobal.com)
  if (mode === "public") {
    if (isPathOrChild(path, "/admin")) {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }
    if (
      ADMIN_PATHS.some((root) => isPathOrChild(path, root)) ||
      (isPathOrChild(path, "/api") && path !== "/api/health" && path !== "/api/revalidate")
    ) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  // ADMIN APP MODE (proud.uptrixglobal.com)
  if (mode === "admin") {
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin/login", request.url), 307);
    }

    const isAdminAllowed =
      isPathOrChild(path, "/admin") ||
      isPathOrChild(path, "/api/admin") ||
      isPathOrChild(path, "/admin/api") ||
      path === "/api/health";

    if (!isAdminAllowed) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
