import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import { btnPrimary, container } from "@/components/crm/styles";
import { categorySlug, getPublishedPostBySlug, getPublishedPosts, getRelatedPosts, type Post } from "@/lib/blog-store";
import { getContent } from "@/lib/content-store";
import { markdownToText, readingMinutes, renderMarkdown, wordCount } from "@/lib/markdown";
import { formatDate, siteUrl } from "@/lib/site";

// Pages are built ahead of time; new posts are built on first visit; changes and scheduled posts appear within a minute
export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

const description = (p: Post) => p.metaDescription || p.excerpt || markdownToText(p.content).slice(0, 155);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const title = post.seoTitle || post.title;
  const desc = description(post);
  const images = post.coverImage.src
    ? [{ url: post.coverImage.src, width: post.coverImage.width || undefined, height: post.coverImage.height || undefined, alt: post.coverImage.alt }]
    : ["/logo-dark.png"];
  return {
    title,
    description: desc,
    keywords: [post.focusKeyword, ...post.tags].filter(Boolean),
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
    robots: post.noindex ? { index: false, follow: true } : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "article",
      title,
      description: desc,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      section: post.category || undefined,
      tags: post.tags,
      images,
    },
    twitter: { card: "summary_large_image", title, description: desc, images: post.coverImage.src ? [post.coverImage.src] : undefined },
  };
}

function shareLinks(url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);
  if (!post) notFound();

  const c = getContent().blog;
  const { html, toc } = renderMarkdown(post.content);
  const related = getRelatedPosts(post);
  const url = siteUrl(`/blog/${post.slug}`);
  const updated = post.updatedAt.slice(0, 10) > post.publishedAt.slice(0, 10);
  const catHref = post.category ? `/blog/category/${categorySlug(post.category)}` : "";

  // Structured data: tells Google this is an article, who wrote it and where it sits on the site
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: description(post),
      image: post.coverImage.src ? [siteUrl(post.coverImage.src)] : undefined,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Person", name: post.author || c.organization.name },
      publisher: { "@type": "Organization", name: c.organization.name, logo: { "@type": "ImageObject", url: siteUrl(c.organization.logoPath) } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: post.category || undefined,
      keywords: [post.focusKeyword, ...post.tags].filter(Boolean).join(", ") || undefined,
      wordCount: wordCount(post.content),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.post.breadcrumbHome, item: siteUrl("/") },
        { "@type": "ListItem", position: 2, name: c.post.breadcrumbBlog, item: siteUrl("/blog") },
        ...(post.category ? [{ "@type": "ListItem", position: 3, name: post.category, item: siteUrl(catHref) }] : []),
        { "@type": "ListItem", position: post.category ? 4 : 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <article>
        <header className={`${container} flex max-w-[880px] flex-col gap-5 pt-[clamp(32px,6vw,64px)] pb-8`}>
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-pulse-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-pulse">
                  {c.post.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog" className="hover:text-pulse">
                  {c.post.breadcrumbBlog}
                </Link>
              </li>
              {post.category && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={catHref} className="hover:text-pulse">
                      {post.category}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="text-[clamp(34px,4.6vw,52px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">{post.title}</h1>
          {post.excerpt && <p className="text-[clamp(18px,1.8vw,21px)] leading-relaxed text-pretty text-pulse-muted">{post.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-semibold text-pulse-subtle">
            {post.author && (
              <span>
                {c.post.byLabel} <span className="text-pulse-ink">{post.author}</span>
              </span>
            )}
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {updated && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {c.post.updatedLabel} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>
              {readingMinutes(post.content)} {c.listing.minuteReadLabel}
            </span>
          </div>
        </header>

        {post.coverImage.src && (
          <div className={`${container} max-w-[1100px]`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- uploaded images are already resized WebP */}
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width || 1600}
              height={post.coverImage.height || 900}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/9] w-full rounded-3xl border border-pulse-line object-cover"
            />
          </div>
        )}

        <div className={`${container} grid max-w-[1100px] gap-12 py-[clamp(36px,6vw,64px)] lg:grid-cols-[minmax(0,1fr)_260px]`}>
          <div className="min-w-0">
            {toc.length >= 3 && (
              <details className="mb-8 rounded-2xl border border-pulse-line bg-white p-5 lg:hidden">
                <summary className="cursor-pointer font-bold">{c.post.tableOfContentsLabel}</summary>
                <TocList toc={toc} />
              </details>
            )}
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-bold text-pulse-subtle">{c.post.tagsLabel}:</span>
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-pulse-soft px-3 py-1 text-sm font-semibold text-pulse">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-pulse-line pt-6">
              <span className="mr-1 text-sm font-bold text-pulse-subtle">{c.post.shareLabel}:</span>
              {shareLinks(url, post.title).map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#d9dbe6] bg-white px-3.5 py-1.5 text-sm font-semibold hover:border-pulse hover:text-pulse"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {toc.length >= 3 && (
              <nav aria-label={c.post.tableOfContentsLabel} className="hidden rounded-2xl border border-pulse-line bg-white p-5 lg:block">
                <p className="font-code text-xs tracking-[0.08em] text-pulse uppercase">{c.post.tableOfContentsLabel}</p>
                <TocList toc={toc} />
              </nav>
            )}
            {c.cta.heading && (
              <div className="flex flex-col gap-3 rounded-2xl bg-pulse-night p-6 text-white">
                <p className="text-lg leading-snug font-extrabold">{c.cta.heading}</p>
                <p className="text-sm leading-relaxed text-[#cfd0f0]">{c.cta.body}</p>
                {c.cta.buttonLabel && (
                  <Link href={c.cta.buttonLink || "#"} className={`${btnPrimary} mt-1 text-center text-[15px]`}>
                    {c.cta.buttonLabel}
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="border-t border-pulse-line bg-white">
          <div className={`${container} flex flex-col gap-8 py-[clamp(48px,7vw,88px)]`}>
            <h2 id="related-h" className="text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.02em]">
              {c.post.relatedHeading}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} minuteLabel={c.listing.minuteReadLabel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function TocList({ toc }: { toc: { id: string; text: string; depth: number }[] }) {
  return (
    <ol className="mt-3 flex flex-col gap-2 text-[15px]">
      {toc.map((t) => (
        <li key={t.id} className={t.depth === 3 ? "pl-4" : ""}>
          <a href={`#${t.id}`} className="text-pulse-muted hover:text-pulse">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
