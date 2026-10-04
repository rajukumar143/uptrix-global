import type { MetadataRoute } from "next";
import { getCategories, getPublishedPosts } from "@/lib/blog-store";
import { siteUrl } from "@/lib/site";

// Rebuilt every hour, and straight away when a post is saved, so Google sees new articles quickly
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getPublishedPosts().filter((p) => !p.noindex && !p.canonicalUrl);
  const latest = posts[0] ? new Date(posts[0].updatedAt) : now;

  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/crm"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/crm/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/crm/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: siteUrl("/crm/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: siteUrl("/blog"), lastModified: latest, changeFrequency: "daily", priority: 0.8 },
  ];

  const categoryPages = getCategories().map((c) => ({
    url: siteUrl(`/blog/category/${c.slug}`),
    lastModified: latest,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const postPages = posts.map((p) => ({
    url: siteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: p.coverImage.src ? [siteUrl(p.coverImage.src)] : undefined,
  }));

  return [...pages, ...categoryPages, ...postPages];
}
