// Server-only: blog posts, stored as one JSON file per post in CONTENT_DIR/blog/posts.
// Do not import this file from client components.
import { promises as fs, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { safeLink } from "@/content/merge";
import { slugify } from "./markdown";

const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "blog", "posts");

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
function clean(input: Partial<Post>, existing?: Post): Post {
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
    return JSON.parse(readFileSync(path.join(POSTS_DIR, file), "utf8")) as Post;
  } catch {
    return null;
  }
}

/** Every post (drafts included), newest first. */
export function getAllPosts(): Post[] {
  let files: string[] = [];
  try {
    files = readdirSync(POSTS_DIR).filter((f) => /^[a-f0-9]+\.json$/.test(f));
  } catch {
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
  const taken = new Set(getAllPosts().filter((p) => p.id !== post.id).map((p) => p.slug));
  let slug = post.slug;
  for (let n = 2; taken.has(slug); n++) slug = `${post.slug}-${n}`;
  post.slug = slug;

  await fs.mkdir(POSTS_DIR, { recursive: true });
  const file = path.join(POSTS_DIR, `${post.id}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(post, null, 2));
  await fs.rename(tmp, file);
  return post;
}

export async function deletePost(id: string) {
  if (!/^[a-f0-9]+$/.test(id)) return;
  await fs.rm(path.join(POSTS_DIR, `${id}.json`), { force: true });
}
