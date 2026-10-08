import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog-store";
import BlogAdminView from "@/components/admin/BlogAdminView";

export default async function BlogAdmin({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const { deleted } = await searchParams;
  const posts = getAllPosts();

  return <BlogAdminView posts={posts} deleted={Boolean(deleted)} />;
}
