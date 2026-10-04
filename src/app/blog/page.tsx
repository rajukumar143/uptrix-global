import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";
import { container, eyebrow, h1 } from "@/components/crm/styles";
import { getCategories, getPublishedPosts } from "@/lib/blog-store";
import { getContent } from "@/lib/content-store";
import { siteUrl } from "@/lib/site";

// Re-check every minute so new and scheduled posts appear quickly
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().blog;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    alternates: { canonical: "/blog", types: { "application/rss+xml": siteUrl("/blog/rss.xml") } },
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, type: "website", url: "/blog", images: ["/logo-dark.png"] },
  };
}

export default function BlogIndex() {
  const c = getContent().blog;
  const posts = getPublishedPosts();
  const categories = getCategories();
  const [first, ...rest] = posts;

  return (
    <main>
      <section aria-labelledby="blog-h" className={`${container} flex flex-col gap-5 pt-[clamp(48px,8vw,88px)] pb-10`}>
        <p className={eyebrow}>{c.hero.eyebrow}</p>
        <h1 id="blog-h" className={`${h1} max-w-[820px]`}>
          {c.hero.heading}
        </h1>
        <p className="max-w-[600px] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{c.hero.body}</p>
        {categories.length > 0 && (
          <nav aria-label="Categories" className="mt-2 flex flex-wrap gap-2">
            <Link href="/blog" aria-current="page" className="rounded-full bg-pulse-ink px-4 py-2 text-sm font-bold text-white">
              {c.listing.allCategoriesLabel}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="rounded-full border border-[#d9dbe6] bg-white px-4 py-2 text-sm font-bold text-[#2a2f4d] hover:border-pulse"
              >
                {cat.name} <span className="font-semibold text-pulse-faint">{cat.count}</span>
              </Link>
            ))}
          </nav>
        )}
      </section>

      <section aria-label="Articles" className={`${container} pb-[clamp(64px,9vw,112px)]`}>
        {!first ? (
          <p className="rounded-3xl border border-dashed border-[#d4d7e4] bg-white p-10 text-center text-lg text-pulse-muted">{c.listing.emptyMessage}</p>
        ) : (
          <div className="flex flex-col gap-6">
            <PostCard post={first} minuteLabel={c.listing.minuteReadLabel} large />
            {rest.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
                {rest.map((p) => (
                  <PostCard key={p.id} post={p} minuteLabel={c.listing.minuteReadLabel} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
