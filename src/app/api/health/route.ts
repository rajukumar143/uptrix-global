import { contentRoot } from "@/lib/content-files";

export function GET() {
  try {
    contentRoot();
    const writable = process.env.APP_MODE === "admin" || process.env.APP_MODE === "all";
    return Response.json(
      { status: "ok", contentDir: { exists: true, readable: true, writable } },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Health check failed", error);
    return Response.json(
      { status: "error", message: "Content storage is not configured or accessible." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
