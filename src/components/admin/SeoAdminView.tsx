"use client";

import { useState } from "react";
import Link from "next/link";
import { SitemapTable, type SitemapEntry } from "./SitemapTable";

interface RobotsRule {
  userAgent?: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
}

interface SeoAdminViewProps {
  siteUrl: string;
  sitemapEntries: SitemapEntry[];
  robotsData: {
    rules: RobotsRule | RobotsRule[];
    sitemap?: string | string[];
    host?: string;
  };
}

export function SeoAdminView({ siteUrl, sitemapEntries, robotsData }: SeoAdminViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "sitemap" | "robots">("overview");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const rawRobotsTxt = (() => {
    const lines: string[] = [];
    const rulesList = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    for (const rule of rulesList) {
      if (!rule) continue;
      const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent || "*"];
      agents.forEach((ag) => lines.push(`User-agent: ${ag}`));
      if (rule.allow) {
        const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
        allows.forEach((al) => lines.push(`Allow: ${al}`));
      }
      if (rule.disallow) {
        const disallows = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
        disallows.forEach((dis) => lines.push(`Disallow: ${dis}`));
      }
      if (rule.crawlDelay) {
        lines.push(`Crawl-delay: ${rule.crawlDelay}`);
      }
      lines.push("");
    }
    if (robotsData.sitemap) {
      const sitemaps = Array.isArray(robotsData.sitemap) ? robotsData.sitemap : [robotsData.sitemap];
      sitemaps.forEach((sm) => lines.push(`Sitemap: ${sm}`));
    }
    if (robotsData.host) {
      lines.push(`Host: ${robotsData.host}`);
    }
    return lines.join("\n").trim();
  })();

  const rawSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    ${e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>` : ""}
    ${e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : ""}
    ${e.priority !== undefined ? `<priority>${e.priority.toFixed(1)}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">SEO & Search Engine Indexing</h1>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              Live & Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Real-time crawler policies, dynamic XML sitemaps, and search engine directives for Uptrix Global.
          </p>
        </div>

        {/* Quick Action Link Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:text-white"
          >
            <span>🤖 Open robots.txt</span>
            <span className="text-slate-500">↗</span>
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:text-white"
          >
            <span>🗺️ Open sitemap.xml</span>
            <span className="text-slate-500">↗</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "overview"
              ? "border-indigo-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>⚡ Indexing Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("sitemap")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "sitemap"
              ? "border-indigo-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>🗺️ Dynamic Sitemap ({sitemapEntries.length} URLs)</span>
        </button>
        <button
          onClick={() => setActiveTab("robots")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "robots"
              ? "border-indigo-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>🤖 Robots Directives</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Total Indexed URLs</span>
                <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400">
                  Auto-synced
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{sitemapEntries.length}</div>
              <p className="mt-1 text-[11px] text-slate-500">Includes core routes, blog posts & dynamic pages</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Crawler Access</span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Allowed
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-400">Public (All)</div>
              <p className="mt-1 text-[11px] text-slate-500">Disallow: /admin, /api, /sign-in, /reset-password</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Canonical Domain</span>
                <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-sky-400">
                  HTTPS
                </span>
              </div>
              <div className="mt-2 truncate text-base font-semibold text-white" title={siteUrl}>
                {siteUrl.replace(/^https?:\/\//, "")}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Base origin for all generated links</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Sitemap Spec</span>
                <span className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-purple-400">
                  XML 0.9
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-purple-300">Next.js 14</div>
              <p className="mt-1 text-[11px] text-slate-500">Cached on edge & revalidated automatically</p>
            </div>
          </div>

          {/* Quick Endpoints card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-white">Live Search Engine Endpoints</h2>
            <p className="mt-1 text-xs text-slate-400">
              Provide these endpoints to Google Search Console, Bing Webmaster Tools, and Yandex.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-emerald-400">GET /robots.txt</span>
                    <span className="text-[11px] text-slate-400">— Controls search crawler indexing permissions</span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-slate-300 truncate">{`${siteUrl}/robots.txt`}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(`${siteUrl}/robots.txt`, "robots")}
                    className="rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                  >
                    {copiedUrl === "robots" ? "✓ Copied" : "Copy URL"}
                  </button>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-indigo-600/20 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:bg-indigo-600/30"
                  >
                    Test ↗
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/70 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-sky-400">GET /sitemap.xml</span>
                    <span className="text-[11px] text-slate-400">— Full dynamic catalogue of public URLs</span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-slate-300 truncate">{`${siteUrl}/sitemap.xml`}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(`${siteUrl}/sitemap.xml`, "sitemap")}
                    className="rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                  >
                    {copiedUrl === "sitemap" ? "✓ Copied" : "Copy URL"}
                  </button>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-indigo-600/20 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:bg-indigo-600/30"
                  >
                    Test ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Google Search Console</h3>
              <p className="mt-1 text-xs text-slate-400">
                Submit <code className="text-indigo-300">sitemap.xml</code> in your GSC dashboard under Sitemaps.
                Googlebot fetches this file to discover new pages, updates to blogs, and priority signals.
              </p>
              <div className="mt-3">
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Open Google Search Console ↗
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Bing Webmaster Tools</h3>
              <p className="mt-1 text-xs text-slate-400">
                Bing and Yahoo index pages via your sitemap. Add <code className="text-indigo-300">sitemap.xml</code> or
                sync your Google Search Console account for instant indexation.
              </p>
              <div className="mt-3">
                <a
                  href="https://www.bing.com/webmasters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Open Bing Webmaster Tools ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SITEMAP */}
      {activeTab === "sitemap" && (
        <div className="space-y-4">
          <SitemapTable entries={sitemapEntries} siteBaseUrl={siteUrl} rawXml={rawSitemapXml} onCopy={copyToClipboard} copiedText={copiedUrl} />
        </div>
      )}

      {/* TAB 3: ROBOTS */}
      {activeTab === "robots" && (
        <div className="space-y-6">
          {/* Visual Rules Explorer */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-sm font-semibold text-white">Parsed Crawler Directive Rules</h2>
            <p className="mt-1 text-xs text-slate-400">
              Directives served by Next.js <code className="text-indigo-300">src/app/robots.ts</code>.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">✅</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Allowed Paths</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Search engines (Googlebot, Bingbot, etc.) are allowed to crawl:
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="font-mono text-xs text-emerald-300 bg-emerald-950/30 px-2.5 py-1 rounded border border-emerald-500/20">
                    Allow: /
                  </div>
                  <p className="text-[11px] text-slate-500">
                    (All marketing pages, solutions, blog posts, stories, case studies, terms & privacy)
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-rose-500/20 bg-rose-950/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚫</span>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Protected / Disallowed Paths</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Search engines are blocked from crawling administrative or private routes:
                </p>
                <div className="mt-3 space-y-1.5 font-mono text-xs">
                  <div className="text-rose-300 bg-rose-950/30 px-2.5 py-1 rounded border border-rose-500/20">
                    Disallow: /admin/
                  </div>
                  <div className="text-rose-300 bg-rose-950/30 px-2.5 py-1 rounded border border-rose-500/20">
                    Disallow: /api/
                  </div>
                  <div className="text-rose-300 bg-rose-950/30 px-2.5 py-1 rounded border border-rose-500/20">
                    Disallow: /sign-in
                  </div>
                  <div className="text-rose-300 bg-rose-950/30 px-2.5 py-1 rounded border border-rose-500/20">
                    Disallow: /reset-password
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Raw robots.txt Viewer */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Live robots.txt Output</h3>
                <p className="text-xs text-slate-400">Plain text as fetched by Web crawlers</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(rawRobotsTxt, "rawRobots")}
                  className="rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700"
                >
                  {copiedUrl === "rawRobots" ? "✓ Copied" : "Copy Raw Content"}
                </button>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
                >
                  View /robots.txt ↗
                </a>
              </div>
            </div>

            <pre className="mt-4 max-h-96 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
              {rawRobotsTxt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeoAdminView;
