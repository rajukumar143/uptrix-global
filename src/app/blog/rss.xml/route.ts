import { getPublishedPosts } from "@/lib/blog-store";
import { getContent } from "@/lib/content-store";
import { markdownToText } from "@/lib/markdown";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS feed so readers and news apps can follow the blog
export function GET() {
  const { blog } = getContent();
  const posts = getPublishedPosts().filter((p) => !p.noindex).slice(0, 50);
  const items = posts
    .map((p) => {
      const url = siteUrl(`/blog/${p.slug}`);
      const desc = p.metaDescription || p.excerpt || markdownToText(p.content).slice(0, 300);
      return `    <item>
      <title>${x(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${x(desc)}</description>${p.category ? `\n      <category>${x(p.category)}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(blog.seo.pageTitle)}</title>
    <link>${siteUrl("/blog")}</link>
    <description>${x(blog.seo.metaDescription)}</description>
    <language>en-in</language>
    <atom:link href="${siteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
