import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin", "/api/admin", "/admin/api"];
const ASSET_PATH = /^\/(?:logo[^/]*|icon\.png|favicon\.ico|apple-icon(?:\d*)?(?:\.png)?|manifest\.webmanifest|robots\.txt|sitemap\.xml)$/;

function isPathOrChild(path: string, root: string) {
  return path === root || path.startsWith(`${root}/`);
}

export function middleware(request: NextRequest) {
  const mode = process.env.APP_MODE;
  if (mode === "all" || process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;

  // Let Next.js internals, static bundles, images, and public assets pass immediately
  if (
    isPathOrChild(path, "/_next") ||
    isPathOrChild(path, "/media") ||
    ASSET_PATH.test(path) ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // PUBLIC APP MODE (trendsondigital.in)
  if (mode === "public") {
    // If someone visits admin on public site, deflect or return 404 immediately
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

  // ADMIN APP MODE (admin.trendsondigital.in)
  if (mode === "admin") {
    // Immediately redirect root to login page instead of rendering the heavy public homepage
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin/login", request.url), 307);
    }

    // Only allow admin endpoints and health check
    const isAdminAllowed =
      isPathOrChild(path, "/admin") ||
      isPathOrChild(path, "/api/admin") ||
      isPathOrChild(path, "/admin/api") ||
      path === "/api/health";

    if (!isAdminAllowed) {
      // Deflect automated bot traffic (e.g. /wp-admin, .php, public pages) in 0ms without server-side rendering
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
