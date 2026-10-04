"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { deletePost as removePost, savePost as storePost, type Post } from "@/lib/blog-store";

export type SavePostResult = { ok: true; id: string; slug: string; savedAt: string } | { ok: false; error: string };

function refreshBlog() {
  // Rebuild the blog pages, the sitemap and the RSS feed with the new post
  revalidatePath("/blog", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/rss.xml");
}

export async function savePost(input: Partial<Post>, id?: string): Promise<SavePostResult> {
  await requireAdmin();
  if (!input.title || !String(input.title).trim()) return { ok: false, error: "Please give the post a title." };
  try {
    const post = await storePost(input, id);
    refreshBlog();
    return { ok: true, id: post.id, slug: post.slug, savedAt: post.updatedAt };
  } catch (e) {
    console.error("Blog save failed", e);
    return { ok: false, error: "Could not save. Check that the server can write to the content folder." };
  }
}

export async function deletePost(id: string) {
  await requireAdmin();
  await removePost(id);
  refreshBlog();
  redirect("/admin/blog?deleted=1");
}
