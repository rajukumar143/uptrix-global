// Server-only: images uploaded from the blog editor, stored in CONTENT_DIR/uploads.
// Every upload is resized and converted to WebP, which keeps pages fast (a Google ranking factor).
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import sharp from "sharp";

const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "content");
export const UPLOAD_DIR = path.join(CONTENT_DIR, "uploads");
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_WIDTH = 1600;

export const MEDIA_NAME = /^[a-z0-9-]+\.webp$/;

export async function saveImage(data: Buffer) {
  // sharp reads the actual file contents, so a renamed non-image is rejected here
  const meta = await sharp(data).metadata();
  if (!meta.format || !["jpeg", "png", "webp", "gif", "avif"].includes(meta.format)) throw new Error("Please upload a JPG, PNG, WebP or GIF image.");

  const { data: out, info } = await sharp(data)
    .rotate() // respect phone camera orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer({ resolveWithObject: true });

  const month = new Date().toISOString().slice(0, 7);
  const name = `${month}-${randomBytes(6).toString("hex")}.webp`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), out);
  return { url: `/media/${name}`, width: info.width, height: info.height, bytes: info.size };
}

export async function readImage(name: string) {
  if (!MEDIA_NAME.test(name)) return null;
  try {
    return await fs.readFile(path.join(UPLOAD_DIR, name));
  } catch {
    return null;
  }
}
