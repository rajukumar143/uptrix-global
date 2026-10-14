import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const requestSchema = z.object({
  paths: z.array(z.string().min(1).max(300)).min(1).max(100),
}).strict();

function authorized(request: Request) {
  const expected = process.env.ADMIN_API_SECRET || "";
  const received = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (expected.length < 32) return false;
  return timingSafeEqual(createHash("sha256").update(expected).digest(), createHash("sha256").update(received).digest());
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success || parsed.data.paths.some((path) => !path.startsWith("/") || path.startsWith("//") || path.includes("?") || path.includes("#"))) {
    return Response.json({ error: "Invalid revalidation paths." }, { status: 400 });
  }

  for (const path of new Set(parsed.data.paths)) {
    revalidatePath(path, path === "/" ? "layout" : undefined);
  }
  return Response.json({ revalidated: true }, { headers: { "Cache-Control": "no-store" } });
}
