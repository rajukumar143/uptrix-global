import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/supabase-admin";

export const revalidate = 60; // Revalidate public homepage every 60 seconds

export default async function HomePage() {
  let posts = [];
  try {
    posts = await getPublishedPosts();
  } catch (err) {
    console.error("[HomePage] Error loading posts:", err.message);
  }

  const featured = posts[0] || null;
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18)_0%,rgba(20,184,166,0.1)_45%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-indigo-300 uppercase shadow-[0_0_20px_-3px_rgba(99,102,241,0.4)]">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Engineering & Growth Publication
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Thoughts on Technology,{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
              Architecture & Scale
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A high-performance blog platform with strict zero-client Supabase access, signed sliding JWT session security, and automated SEO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/blog"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 px-7 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(79,70,229,0.7)] transition hover:brightness-110"
            >
              <span>Explore All Articles</span>
              <span>→</span>
            </Link>
            <Link
              href="/admin/upload"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
            >
              <span>Admin Studio</span>
            </Link>
          </div>
        </div>

        {/* Featured Post Card */}
        {featured ? (
          <div className="mt-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Featured Story
            </h2>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-md transition duration-300 hover:border-indigo-400/40 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.35)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {featured.cover_image_url && (
                  <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={featured.cover_image_url}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 650px"
                    />
                  </div>
                )}
                <div className={`${featured.cover_image_url ? "lg:col-span-5" : "lg:col-span-12"} p-6 sm:p-8 flex flex-col gap-3.5`}>
                  <span className="text-xs font-semibold text-teal-400">
                    {new Date(featured.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-200 transition">
                    {featured.title}
                  </h3>
                  {featured.meta_description && (
                    <p className="text-slate-300 text-sm md:text-base line-clamp-3 leading-relaxed">
                      {featured.meta_description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 pt-2 group-hover:text-teal-300 group-hover:gap-2 transition-all">
                    <span>Read Article</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center flex flex-col items-center gap-3">
            <span className="text-3xl">✍️</span>
            <h3 className="text-xl font-bold text-white">No published posts yet</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Your Supabase database is connected and ready. Log into the admin studio to create and publish your first article.
            </p>
            <Link
              href="/admin/upload"
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              <span>Publish First Post</span>
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Recent Posts Grid */}
        {recentPosts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white">Latest Articles</h2>
              <Link href="/blog" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition">
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/[0.06]"
                >
                  {post.cover_image_url ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center p-6">
                      <span className="text-slate-500 font-mono text-xs">Article</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2.5 p-6 flex-1">
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition line-clamp-2">
                      {post.title}
                    </h3>
                    {post.meta_description && (
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {post.meta_description}
                      </p>
                    )}
                    <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-teal-300">
                      <span>Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
