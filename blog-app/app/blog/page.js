import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/supabase-admin";

export const metadata = {
  title: "All Articles",
  description: "Browse all published articles, engineering guides, and technology insights.",
};

export const revalidate = 60; // Cache and revalidate every 60s

export default async function BlogListingPage() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("[BlogListingPage] Error fetching posts:", err.message);
  }

  return (
    <div className="relative py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
            Archive & Knowledge Base
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            All Articles
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Curated articles on software architecture, cloud platforms, and modern engineering practices.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.06] hover:shadow-[0_16px_36px_-16px_rgba(79,70,229,0.3)]"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {post.cover_image_url ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-indigo-950/60 to-slate-900 flex items-center justify-center border-b border-white/10">
                      <span className="text-xs font-mono text-slate-400">Article</span>
                    </div>
                  )}

                  <div className="flex flex-col p-6 flex-1 gap-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="rounded bg-white/5 px-2 py-0.5 font-medium text-slate-300">
                        Post
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-indigo-200 transition line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    {post.meta_description && (
                      <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                        {post.meta_description}
                      </p>
                    )}

                    <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 group-hover:text-teal-300">
                      <span>Read Story</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-16 text-center">
            <p className="text-slate-400 text-base mb-4">No published articles found.</p>
            <Link
              href="/admin/upload"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <span>Go to Admin & Publish</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
