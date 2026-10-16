import { isAdmin } from "@/lib/admin-auth";
import { logAdminWrite } from "@/lib/admin-audit";
import { ImageUploadError, MAX_UPLOAD_BYTES, saveImage } from "@/lib/media-store";

export const dynamic = "force-dynamic";

// Image upload from the blog editor (admins only).
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return Response.json({ error: "Request origin is required." }, { status: 403 });
  try {
    if (new URL(origin).origin !== new URL(request.url).origin) {
      return Response.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
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
      console.error("Image was saved but the admin audit record failed", e);
      return Response.json({ error: "The image was uploaded, but audit logging failed. Contact the site administrator." }, { status: 500 });
    }
    return Response.json(saved);
  } catch (e) {
    if (e instanceof ImageUploadError) return Response.json({ error: e.message }, { status: 400 });
    console.error("Admin image upload failed", e);
    return Response.json({ error: "The image could not be saved. Please try again." }, { status: 500 });
  }
}
