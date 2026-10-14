import "server-only";

import { z } from "zod";
import { appendText } from "@/lib/content-files";

const actionSchema = z.enum([
  "save-page",
  "reset-page",
  "restore-content-backup",
  "save-blog-post",
  "delete-blog-post",
  "upload-image",
]);

export async function logAdminWrite(action: z.infer<typeof actionSchema>, target: string) {
  const event = z.object({
    at: z.string().datetime(),
    actor: z.string().min(1).max(100),
    action: actionSchema,
    target: z.string().min(1).max(200),
  }).strict().parse({
    at: new Date().toISOString(),
    actor: process.env.ADMIN_USERNAME,
    action,
    target,
  });

  await appendText(["audit.jsonl"], `${JSON.stringify(event)}\n`);
}
