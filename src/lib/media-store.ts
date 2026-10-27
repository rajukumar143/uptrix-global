// Server-only: images uploaded from the blog editor, stored in CONTENT_DIR/uploads.
// Every upload is resized and converted to WebP, which keeps pages fast (a Google ranking factor).
import "server-only";

import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { readBytes, writeAtomic } from "@/lib/content-files";

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_WIDTH = 1600;
const MAX_INPUT_PIXELS = 40_000_000;

export const MEDIA_NAME = /^[a-z0-9-]+\.webp$/;

export class ImageUploadError extends Error {}

export async function saveImage(data: Buffer) {
  let meta: Awaited<ReturnType<ReturnType<typeof sharp>["metadata"]>>;
  try {
    meta = await sharp(data, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  } catch {
    throw new ImageUploadError("Please upload a valid JPG, PNG, WebP or GIF image.");
  }
  if (!meta.format || !["jpeg", "png", "webp", "gif"].includes(meta.format)) {
    throw new ImageUploadError("Please upload a JPG, PNG, WebP or GIF image.");
  }

  let out: Buffer;
  let info: { width: number; height: number; size: number };
  try {
    ({ data: out, info } = await sharp(data, { limitInputPixels: MAX_INPUT_PIXELS })
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer({ resolveWithObject: true }));
  } catch {
    throw new ImageUploadError("That image could not be processed.");
  }

  const month = new Date().toISOString().slice(0, 7);
  const name = `${month}-${randomBytes(6).toString("hex")}.webp`;
  
  // Write to local disk as safety backup
  try {
    await writeAtomic(["uploads", name], out);
  } catch (e) {
    console.warn("[media-store] Could not write local upload backup:", e);
  }

  const publicUrl = `/media/${name}`;
  return { url: publicUrl, width: info.width, height: info.height, bytes: info.size };
}

export async function readImage(name: string) {
  if (!MEDIA_NAME.test(name)) return null;
  try {
    return await readBytes(["uploads", name]);
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error("Could not read uploaded image", error);
    }
    return null;
  }
}
import "server-only";
