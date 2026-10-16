import { requireAdmin } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/blog-store";
import { analyzeSeo } from "@/lib/seo-check";
import BlogAdminView, { type BlogPostItem } from "@/components/admin/BlogAdminView";

export default async function BlogAdmin({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const { deleted } = await searchParams;
  const rawPosts = getAllPosts();

  // Pre-calculate SEO scores on the server and pass only lightweight summary fields
  // to avoid serializing heavy markdown articles into the client bundle and RSC payload.
  const posts: BlogPostItem[] = rawPosts.map((p) => {
    const { score } = analyzeSeo({
      title: p.title,
      seoTitle: p.seoTitle,
      metaDescription: p.metaDescription,
      focusKeyword: p.focusKeyword,
      slug: p.slug,
      content: p.content,
      excerpt: p.excerpt,
      coverSrc: p.coverImage.src,
      coverAlt: p.coverImage.alt,
    });

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category,
      status: p.status,
      publishedAt: p.publishedAt,
      seoScore: score,
    };
  });

  return <BlogAdminView posts={posts} deleted={Boolean(deleted)} />;
}

