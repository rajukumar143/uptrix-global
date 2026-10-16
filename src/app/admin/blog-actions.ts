"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { logAdminWrite } from "@/lib/admin-audit";
import { revalidatePublic } from "@/lib/public-revalidation";
import { deletePost as removePost, savePost as storePost, type Post } from "@/lib/blog-store";

export type SavePostResult = { ok: true; id: string; slug: string; savedAt: string } | { ok: false; error: string };

async function refreshBlog() {
  // Rebuild the blog pages, the sitemap and the RSS feed with the new post
  const paths = ["/blog", "/sitemap.xml", "/blog/rss.xml"];
  for (const path of paths) revalidatePath(path, path === "/blog" ? "layout" : undefined);
  await revalidatePublic(paths);
}

export async function savePost(input: Partial<Post>, id?: string): Promise<SavePostResult> {
  await requireAdmin();
  if (!input.title || !String(input.title).trim()) return { ok: false, error: "Please give the post a title." };
  try {
    const post = await storePost(input, id);
    try {
      await logAdminWrite("save-blog-post", post.id);
    } catch (e) {
      console.warn("Blog post was saved but the admin audit record failed:", e);
    }
    try {
      await refreshBlog();
    } catch (e) {
      console.warn("Blog post was saved but the public cache could not be refreshed:", e);
    }
    return { ok: true, id: post.id, slug: post.slug, savedAt: post.updatedAt };
  } catch (e: unknown) {
    console.error("Blog save failed:", e);
    const msg = e instanceof Error ? e.message : "Could not save post.";
    return { ok: false, error: msg };
  }
}

export async function deletePost(id: string) {
  await requireAdmin();
  await removePost(id);
  await logAdminWrite("delete-blog-post", id);
  await refreshBlog();
  redirect("/admin/blog?deleted=1");
}