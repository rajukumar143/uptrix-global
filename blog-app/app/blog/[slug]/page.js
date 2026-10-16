import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";
import { getPostBySlug } from "@/lib/supabase-admin";

export const revalidate = 60; // 60s cache revalidation

/**
 * Generate dynamic SEO metadata matching the user requirements:
 * meta_title, meta_description, og_image_url
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || "";
  const ogImage = post.og_image_url || post.cover_image_url;

  return {
    title,
    description,
    keywords: post.meta_keywords ? post.meta_keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse markdown content into sanitized HTML
  const htmlContent = marked.parse(post.content || "");

  return (
    <article className="relative py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Breadcrumb Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition"
          >
            <span>←</span>
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="flex flex-col gap-5 border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-400/30 px-2.5 py-0.5 text-indigo-300">
              Verified Post
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
            {post.title}
          </h1>

          {post.meta_description && (
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
              {post.meta_description}
            </p>
          )}

          {post.meta_keywords && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.meta_keywords.split(",").map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-slate-400 font-mono"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="my-10 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose-dark mt-8"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Post Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 font-bold text-white text-sm">
              N
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Editorial Team</div>
              <div className="text-xs text-slate-400">Published via NextBlog Studio</div>
            </div>
          </div>

          <Link
            href="/blog"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <span>Browse More Articles</span>
            <span>→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
