import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import { container, eyebrow, h1 } from "@/components/crm/styles";
import { categorySlug, getCategories, getPublishedPosts } from "@/lib/blog-store";
import { getContent } from "@/lib/content-store";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategories().find((c) => c.slug === category);
  if (!cat) return { title: "Category not found", robots: { index: false } };
  const { blog } = getContent();
  const title = `${blog.listing.categoryHeadingPrefix} ${cat.name} | ${blog.organization.name} Blog`;
  return {
    title,
    description: `${cat.count} article${cat.count === 1 ? "" : "s"} about ${cat.name} from the ${blog.organization.name} blog.`,
    alternates: { canonical: `/blog/category/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const { category } = await params;
  const categories = getCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const c = getContent().blog;
  const posts = getPublishedPosts().filter((p) => categorySlug(p.category) === cat.slug);

  return (
    <main>
      <section aria-labelledby="cat-h" className={`${container} flex flex-col gap-5 pt-[clamp(48px,8vw,88px)] pb-10`}>
        <p className={eyebrow}>{c.hero.eyebrow}</p>
        <h1 id="cat-h" className={`${h1} max-w-[820px]`}>
          {c.listing.categoryHeadingPrefix} {cat.name}
        </h1>
        <nav aria-label="Categories" className="mt-2 flex flex-wrap gap-2">
          <Link href="/blog" className="rounded-full border border-[#d9dbe6] bg-white px-4 py-2 text-sm font-bold text-[#2a2f4d] hover:border-pulse">
            {c.listing.allCategoriesLabel}
          </Link>
          {categories.map((x) => (
            <Link
              key={x.slug}
              href={`/blog/category/${x.slug}`}
              aria-current={x.slug === cat.slug ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                x.slug === cat.slug ? "bg-pulse-ink text-white" : "border border-[#d9dbe6] bg-white text-[#2a2f4d] hover:border-pulse"
              }`}
            >
              {x.name}
            </Link>
          ))}
        </nav>
      </section>
      <section aria-label="Articles" className={`${container} pb-[clamp(64px,9vw,112px)]`}>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} minuteLabel={c.listing.minuteReadLabel} />
          ))}
        </div>
      </section>
    </main>
  );
}
