import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { requireAdmin } from "@/lib/admin-auth";
import { emptyPost, getAllPosts, getPostById } from "@/lib/blog-store";

export default async function EditPost({ params }: PageProps<"/admin/blog/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const all = getAllPosts();
  const categories = [...new Set(all.map((p) => p.category).filter(Boolean))].sort();
  const internalLinks = all.filter((p) => p.status === "published").map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));

  if (id === "new") {
    return <PostEditor initial={{ ...emptyPost(), id: "", createdAt: "", updatedAt: "" }} categories={categories} internalLinks={internalLinks} />;
  }
  const post = getPostById(id);
  if (!post) notFound();
  return <PostEditor initial={post} categories={categories} internalLinks={internalLinks.filter((l) => l.href !== `/blog/${post.slug}`)} />;
}
