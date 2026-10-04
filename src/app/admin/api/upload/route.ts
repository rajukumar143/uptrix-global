import { isAdmin } from "@/lib/admin-auth";
import { MAX_UPLOAD_BYTES, saveImage } from "@/lib/media-store";

// Image upload from the blog editor (admins only).
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Please sign in again." }, { status: 401 });

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
    return Response.json(saved);
  } catch (e) {
    const msg = e instanceof Error && e.message.startsWith("Please") ? e.message : "That file could not be read as an image.";
    return Response.json({ error: msg }, { status: 400 });
  }
}
