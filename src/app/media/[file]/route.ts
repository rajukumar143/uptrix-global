import { readImage } from "@/lib/media-store";

// Serves images uploaded in the blog editor. File names are random and never reused,
// so browsers and Google can cache them for a year.
export async function GET(_request: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  const data = await readImage(file);
  if (!data) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
