// Server-only: blog posts, stored as one JSON file per post in CONTENT_DIR/blog/posts.
// Do not import this file from client components.
import "server-only";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { safeLink } from "@/content/merge";
import { listFiles, listFilesSync, readText, readTextSync, removeFile, withFileLock, writeAtomic } from "@/lib/content-files";
import { slugify } from "./markdown";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type Post = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  excerpt: string;
  content: string; // Markdown
  coverImage: { src: string; alt: string; width: number; height: number };
  category: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
  publishedAt: string; // ISO date; posts with a future date go live at that time
  updatedAt: string;
  createdAt: string;
  noindex: boolean;
  canonicalUrl: string;
};

const coverSchema = z.object({
  src: z.string().max(300),
  alt: z.string().max(200),
  width: z.number().int().nonnegative(),
  height: z.number().int().nonnegative(),
}).strict();

const postSchema = z.object({
  id: z.string().regex(/^[a-f0-9]+$/),
  slug: z.string().max(120),
  title: z.string().max(200),
  seoTitle: z.string().max(120),
  metaDescription: z.string().max(320),
  focusKeyword: z.string().max(100),
  excerpt: z.string().max(500),
  content: z.string().max(200000),
  coverImage: coverSchema,
  category: z.string().max(60),
  tags: z.array(z.string().max(40)).max(20),
  author: z.string().max(80),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  noindex: z.boolean(),
  canonicalUrl: z.string().max(300),
}).strict();

const postInputSchema = postSchema.partial().extend({
  id: z.string().regex(/^[a-f0-9]+$/).optional().or(z.literal("")),
  createdAt: z.string().datetime().optional().or(z.literal("")),
  updatedAt: z.string().datetime().optional().or(z.literal("")),
  publishedAt: z.string().datetime().optional().or(z.literal("")),
  coverImage: coverSchema.partial().optional(),
}).strict();
const MAX_POST_BACKUPS = 20;

export const emptyPost = (): Omit<Post, "id" | "createdAt" | "updatedAt"> => ({
  slug: "",
  title: "",
  seoTitle: "",
  metaDescription: "",
  focusKeyword: "",
  excerpt: "",
  content: "",
  coverImage: { src: "", alt: "", width: 0, height: 0 },
  category: "",
  tags: [],
  author: "Uptrix Team",
  status: "draft",
  publishedAt: new Date().toISOString(),
  noindex: false,
  canonicalUrl: "",
});

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.round(v)) : 0);
const date = (v: unknown, fallback: string) => {
  const d = typeof v === "string" ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString() : fallback;
};

/** Clean up whatever the editor sends so only valid values are stored. */
function clean(raw: unknown, existing?: Post): Post {
  const sanitized = typeof raw === "object" && raw !== null ? { ...raw } : {};
  if ("id" in sanitized && !sanitized.id) delete (sanitized as any).id;
  if ("createdAt" in sanitized && !sanitized.createdAt) delete (sanitized as any).createdAt;
  if ("updatedAt" in sanitized && !sanitized.updatedAt) delete (sanitized as any).updatedAt;
  if ("publishedAt" in sanitized && !sanitized.publishedAt) delete (sanitized as any).publishedAt;

  const input = postInputSchema.parse(sanitized);
  const now = new Date().toISOString();
  const base = existing ?? { ...emptyPost(), id: randomBytes(6).toString("hex"), createdAt: now, updatedAt: now };
  const title = str(input.title, 200).trim();
  const cover = (input.coverImage ?? {}) as Partial<Post["coverImage"]>;
  const coverSrc = str(cover.src, 300);
  return {
    id: base.id,
    createdAt: base.createdAt,
    updatedAt: now,
    title,
    slug: slugify(str(input.slug, 120)) || slugify(title) || base.id,
    seoTitle: str(input.seoTitle, 120).trim(),
    metaDescription: str(input.metaDescription, 320).trim(),
    focusKeyword: str(input.focusKeyword, 100).trim(),
    excerpt: str(input.excerpt, 500).trim(),
    content: str(input.content, 200000),
    coverImage: {
      src: coverSrc ? safeLink(coverSrc) : "",
      alt: str(cover.alt, 200),
      width: num(cover.width),
      height: num(cover.height),
    },
    category: str(input.category, 60).trim(),
    tags: Array.isArray(input.tags)
      ? [...new Set(input.tags.map((t) => str(t, 40).trim()).filter(Boolean))].slice(0, 20)
      : [],
    author: str(input.author, 80).trim(),
    status: input.status === "published" ? "published" : "draft",
    publishedAt: date(input.publishedAt, base.publishedAt),
    noindex: input.noindex === true,
    canonicalUrl: str(input.canonicalUrl, 300).trim() ? safeLink(str(input.canonicalUrl, 300).trim()) : "",
  };
}

function readPostFile(file: string): Post | null {
  try {
    return postSchema.parse(JSON.parse(readTextSync(["blog", "posts", file])));
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error(`Could not read blog post ${file}`, error);
    }
    return null;
  }
}

async function backupPost(id: string) {
  let previous: string;
  try {
    previous = await readText(["blog", "posts", `${id}.json`]);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
    throw error;
  }
  const validPrevious = postSchema.parse(JSON.parse(previous));
  if (validPrevious.id !== id) throw new Error("Stored blog post id does not match its file name.");

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  await writeAtomic(["backups", "blog", `${id}-${stamp}-${randomBytes(3).toString("hex")}.json`], previous);
  const versions = (await listFiles(["backups", "blog"]))
    .filter((file) => file.startsWith(`${id}-`) && file.endsWith(".json"))
    .sort()
    .reverse()
    .slice(MAX_POST_BACKUPS);
  await Promise.all(versions.map((file) => removeFile(["backups", "blog", file])));
}

/** Every post (drafts included), newest first. */
export function getAllPosts(): Post[] {
  let files: string[];
  try {
    files = listFilesSync(["blog", "posts"]).filter((f) => /^[a-f0-9]+\.json$/.test(f));
  } catch (error) {
    console.warn("Could not list local blog post files:", error);
    return [];
  }
  return files
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function isLive(p: Post, now = Date.now()) {
  return p.status === "published" && new Date(p.publishedAt).getTime() <= now;
}

/** Posts visitors can see: published, with a date that has arrived. */
export function getPublishedPosts() {
  const now = Date.now();
  return getAllPosts().filter((p) => isLive(p, now));
}

export function getPostById(id: string) {
  if (!/^[a-f0-9]+$/.test(id)) return null;
  return readPostFile(`${id}.json`);
}

export function getPublishedPostBySlug(slug: string) {
  return getPublishedPosts().find((p) => p.slug === slug) ?? null;
}

export function categorySlug(category: string) {
  return slugify(category);
}

export function getCategories() {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of getPublishedPosts()) {
    if (!p.category) continue;
    const slug = categorySlug(p.category);
    const c = map.get(slug) ?? { name: p.category, slug, count: 0 };
    c.count += 1;
    map.set(slug, c);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Other posts on the same subject, for "Related articles". */
export function getRelatedPosts(post: Post, limit = 3) {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return getPublishedPosts()
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score: (p.category && p.category === post.category ? 2 : 0) + p.tags.filter((t) => tags.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || b.p.publishedAt.localeCompare(a.p.publishedAt))
    .slice(0, limit)
    .map((x) => x.p);
}

export async function savePost(input: Partial<Post>, id?: string) {
  const existing = id ? getPostById(id) : null;
  if (id && !existing) throw new Error("Post not found");
  const post = clean(input, existing ?? undefined);

  // Every post needs its own web address
  let taken = new Set<string>();
  try {
    taken = new Set(getAllPosts().filter((p) => p.id !== post.id).map((p) => p.slug));
  } catch {
    taken = new Set();
  }
  let slug = post.slug;
  for (let n = 2; taken.has(slug); n++) slug = `${post.slug}-${n}`;
  post.slug = slug;

  postSchema.parse(post);

  // 1. Primary storage: Supabase database
  let supabaseSaved = false;
  try {
    const { error: sbError } = await supabaseAdmin.from("posts").upsert(
      {
        title: post.title,
        slug: post.slug,
        content: post.content,
        cover_image_url: post.coverImage?.src || null,
        meta_title: post.seoTitle || post.title,
        meta_description: post.metaDescription || post.excerpt,
        meta_keywords: post.tags?.join(", ") || post.focusKeyword || null,
        og_image_url: post.coverImage?.src || null,
        published: post.status === "published",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (sbError) {
      console.error("[blog-store] Supabase upsert error:", sbError);
    } else {
      supabaseSaved = true;
    }
  } catch (err) {
    console.error("[blog-store] Failed to sync post to Supabase:", err);
  }

  // 2. Secondary storage: Local file backup (if filesystem is writable)
  try {
    await withFileLock(["blog", "posts", "slug-index.lock"], async () => {
      try {
        await backupPost(post.id);
      } catch (backupErr) {
        console.warn("[blog-store] Local backup skipped:", backupErr);
      }
      await writeAtomic(["blog", "posts", `${post.id}.json`], JSON.stringify(post, null, 2));
    });
  } catch (fsErr) {
    console.warn("[blog-store] Local filesystem write failed (proceeding since Supabase is active):", fsErr);
    // If Supabase also failed, throw so user is notified
    if (!supabaseSaved) {
      throw new Error(`Failed to save post: ${fsErr instanceof Error ? fsErr.message : "Filesystem not writable"}`);
    }
  }

  return post;
}

export async function deletePost(id: string) {
  if (!/^[a-f0-9]+$/.test(id)) throw new Error("Invalid blog post id.");
  return withFileLock(["blog", "posts", "slug-index.lock"], async () => {
    const existing = getPostById(id);
    await backupPost(id);
    await removeFile(["blog", "posts", `${id}.json`]);

    // Delete from Supabase database
    try {
      if (existing?.slug) {
        await supabaseAdmin.from("posts").delete().eq("slug", existing.slug);
      }
    } catch (err) {
      console.warn("[blog-store] Failed to delete post from Supabase:", err);
    }
  });
}

export async function restorePostBackup(id: string, backupFile: string) {
  if (!/^[a-f0-9]+$/.test(id) || !backupFile.startsWith(`${id}-`) || !backupFile.endsWith(".json")) {
    throw new Error("Invalid blog post backup.");
  }
  const post = postSchema.parse(JSON.parse(await readText(["backups", "blog", backupFile])));
  if (post.id !== id) throw new Error("Blog backup does not match the requested post.");
  return savePost(post, id);
}
import "server-only";
