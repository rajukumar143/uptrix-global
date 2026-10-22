import { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteUrl } from "@/lib/site";
import { SeoAdminView } from "@/components/admin/SeoAdminView";

export const metadata: Metadata = {
  title: "SEO, Robots.txt & Sitemap | Uptrix Admin",
  description: "Search engine crawler policies, live robots.txt and dynamic XML sitemap inspector.",
};

export default async function SeoPage() {
  await requireAdmin();

  let entries: any[] = [];
  try {
    entries = await sitemap();
  } catch (err) {
    console.warn("Failed to load sitemap entries:", err);
  }

  let robotsCfg: any = { rules: [] };
  try {
    robotsCfg = robots();
  } catch (err) {
    console.warn("Failed to load robots config:", err);
  }

  return (
    <SeoAdminView
      sitemapEntries={entries}
      robotsData={robotsCfg}
      siteUrl={siteUrl()}
    />
  );
}
