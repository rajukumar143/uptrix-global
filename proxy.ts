import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin", "/api/admin", "/admin/api"];
const ADMIN_ASSET_PATH = /^\/(?:logo[^/]*|icon\.png|favicon\.ico|apple-icon(?:\d*)?(?:\.png)?|manifest\.webmanifest)$/;

function isPathOrChild(path: string, root: string) {
  return path === root || path.startsWith(`${root}/`);
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Detect Host / Subdomain
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
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }
    if (path === "/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url), 307);
    }

    const isAdminAllowed =
      isPathOrChild(path, "/admin") ||
      isPathOrChild(path, "/api/admin") ||
      isPathOrChild(path, "/admin/api") ||
      path === "/api/health" ||
      isPathOrChild(path, "/_next") ||
      isPathOrChild(path, "/media") ||
      ADMIN_ASSET_PATH.test(path);

    if (!isAdminAllowed) {
      return NextResponse.redirect(new URL("/admin", request.url), 307);
    }

    return NextResponse.next();
  }

  // 3. PUBLIC WEBSITE: Redirect /admin to proud subdomain
  if (isPathOrChild(path, "/admin")) {
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const proudOrigin = isLocal
      ? (process.env.ADMIN_SITE_URL || "http://proud.localhost:3000")
      : "https://proud.uptrixglobal.com";
    return NextResponse.redirect(new URL(`${path}${request.nextUrl.search}`, proudOrigin), 307);
  }

  if (isPathOrChild(path, "/api/admin") || isPathOrChild(path, "/admin/api")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const mode = process.env.APP_MODE;
  if (mode === "all" || process.env.NODE_ENV === "development" || !mode) return NextResponse.next();
  if (mode !== "public" && mode !== "admin") {
    return new NextResponse("APP_MODE must be set to public or admin.", { status: 500 });
  }
  if (process.env.NODE_ENV === "production") {
    const siteUrl = process.env.SITE_URL;
    if (!siteUrl) return new NextResponse("SITE_URL must be configured.", { status: 500 });
    let canonical: URL;
    try {
      canonical = new URL(siteUrl);
      if (
        canonical.protocol !== "https:" ||
        canonical.pathname !== "/" ||
        canonical.search ||
        canonical.hash ||
        canonical.username ||
        canonical.password
      ) {
        throw new Error("SITE_URL must be an HTTPS origin.");
      }
    } catch {
      return new NextResponse("SITE_URL must be a valid HTTPS URL.", { status: 500 });
    }
    if (request.nextUrl.origin !== canonical.origin) {
      return NextResponse.redirect(new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, canonical), 308);
    }
  }

  const isAdminPath = ADMIN_PATHS.some((root) => isPathOrChild(path, root));
  if (mode === "public") {
    if (isPathOrChild(path, "/admin")) {
      return NextResponse.redirect(new URL("/", request.url), 307);
    }
    if (isAdminPath || (isPathOrChild(path, "/api") && path !== "/api/health" && path !== "/api/revalidate")) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.next();
  }

  const adminAppPath =
    isPathOrChild(path, "/admin") ||
    isPathOrChild(path, "/api/admin") ||
    path === "/api/health" ||
    isPathOrChild(path, "/_next") ||
    isPathOrChild(path, "/media") ||
    ADMIN_ASSET_PATH.test(path);
  if (!adminAppPath) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.next();
}
