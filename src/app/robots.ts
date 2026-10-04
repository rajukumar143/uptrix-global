import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Tells search engines what to crawl: everything except the admin area
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin"] }],
    sitemap: siteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}
