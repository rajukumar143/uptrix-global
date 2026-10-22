import { isAdmin } from "@/lib/admin-auth";
import { logAdminWrite } from "@/lib/admin-audit";
import { ImageUploadError, MAX_UPLOAD_BYTES, saveImage } from "@/lib/media-store";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

function isAllowedOrigin(request: Request): boolean {
  // 1. Check sec-fetch-site header (supported by modern browsers for CSRF defence)
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "same-origin" || secFetchSite === "none") {
    return true;
  }

  const origin = request.headers.get("origin");
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");

  // If no origin header, check referer header
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) return true; // Direct same-site request where browser omitted origin
    try {
      const refUrl = new URL(referer);
      if (hostHeader) {
        const cleanHost = hostHeader.toLowerCase().split(":")[0];
        if (refUrl.hostname.toLowerCase() === cleanHost) return true;
      }
      try {
        if (refUrl.host.toLowerCase() === new URL(request.url).host.toLowerCase()) return true;
      } catch {}
    } catch {
      return false;
    }
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase();
    const originHostname = originUrl.hostname.toLowerCase();

    // 2. Direct match with request.url
    try {
      const reqUrl = new URL(request.url);
      if (originUrl.origin.toLowerCase() === reqUrl.origin.toLowerCase()) return true;
      if (originHost === reqUrl.host.toLowerCase()) return true;
      if (originHostname === reqUrl.hostname.toLowerCase()) return true;
    } catch {}

    // 3. Match with Host or X-Forwarded-Host header (handles HTTPS termination by reverse proxy / CDN / Vercel)
    if (hostHeader) {
      const cleanHost = hostHeader.toLowerCase();
      if (originHost === cleanHost) return true;
      if (originHostname === cleanHost.split(":")[0]) return true;
    }

    // 4. Match configured site URLs (SITE_URL, PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_URL, siteUrl())
    const configuredSites = [
      siteUrl(),
      process.env.SITE_URL,
      process.env.PUBLIC_SITE_URL,
      process.env.NEXT_PUBLIC_SITE_URL,
    ].filter(Boolean) as string[];

    for (const site of configuredSites) {
      try {
        const parsed = new URL(site);
        if (parsed.host.toLowerCase() === originHost) return true;
        if (parsed.hostname.toLowerCase() === originHostname) return true;
      } catch {}
    }

    // 5. Localhost / loopback for local development or LAN testing
    const isLoopback = (h: string) =>
      h === "localhost" ||
      h === "127.0.0.1" ||
      h === "::1" ||
      h === "[::1]" ||
      h.startsWith("192.168.") ||
      h.startsWith("10.") ||
      h.endsWith(".local");

    if (isLoopback(originHostname)) return true;

    // 6. In non-production, allow dev origins
    if (process.env.NODE_ENV !== "production") return true;

    return false;
  } catch {
    return false;
  }
}

// Image upload from the blog editor (admins only).
export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  if (!(await isAdmin())) return Response.json({ error: "Please sign in again." }, { status: 401 });

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_UPLOAD_BYTES + 64 * 1024) {
    return Response.json({ error: "Image is too large. The limit is 8 MB." }, { status: 413 });
  }

  let file: FormDataEntryValue | null = null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return Response.json({ error: "No image received." }, { status: 400 });
  }
  if (!(file instanceof File)) return Response.json({ error: "No image received." }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: "Image is too large. The limit is 8 MB." }, { status: 413 });

  try {
    const saved = await saveImage(Buffer.from(await file.arrayBuffer()));
    try {
      await logAdminWrite("upload-image", saved.url);
    } catch (e) {
      console.warn("Image was saved but admin audit logging record was skipped:", e);
    }
    return Response.json(saved);
  } catch (e) {
    if (e instanceof ImageUploadError) return Response.json({ error: e.message }, { status: 400 });
    console.error("Admin image upload failed", e);
    return Response.json({ error: "The image could not be saved. Please try again." }, { status: 500 });
  }
}
