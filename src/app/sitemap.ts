import type { MetadataRoute } from "next";
import { liveStudies } from "@/content/stories";
import { getCategories, getPublishedPosts } from "@/lib/blog-store";
import { getContent } from "@/lib/content-store";
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
    { url: siteUrl("/crm/edutech"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: siteUrl("/crm/real-estate"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: siteUrl("/case-studies"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: siteUrl("/video-testimonials"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
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

  // Example case studies are left out until they're about a real customer
  const studyPages = liveStudies(getContent().caseStudies.studies)
    .filter((s) => !s.isExample)
    .map((s) => ({ url: siteUrl(`/case-studies/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [...pages, ...studyPages, ...categoryPages, ...postPages];
}
