"use client";

import { useState } from "react";
import Link from "next/link";
import { restoreVersion } from "@/app/admin/actions";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import type { pageInfo, PageKey } from "@/content";
import type { Backup } from "@/lib/content-store";

interface AdminDashboardViewProps {
  pageKeys: PageKey[];
  pagesMeta: typeof pageInfo;
  backups: Backup[];
  leadsCount: number;
  postsCount: number;
  restored?: boolean;
}

const CATEGORY_MAP: Record<string, { label: string; icon: string; tag: string; tagColor: string }> = {
  crmRealEstate: {
    label: "Industry CRM",
    icon: "🏢",
    tag: "High Priority",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  crm: {
    label: "Industry CRM",
    icon: "💼",
    tag: "Flagship",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  home: {
    label: "Core Platform",
    icon: "🏠",
    tag: "Homepage",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  header: {
    label: "Global Shell",
    icon: "🧭",
    tag: "Navigation",
    tagColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
  caseStudies: {
    label: "Trust & Proof",
    icon: "📈",
    tag: "Stories",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  videoTestimonials: {
    label: "Trust & Proof",
    icon: "🎬",
    tag: "Video",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  reviews: {
    label: "Trust & Proof",
    icon: "⭐",
    tag: "Social Proof",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  pricing: {
    label: "Core Platform",
    icon: "💳",
    tag: "Revenue",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  about: {
    label: "Core Platform",
    icon: "🏛️",
    tag: "Company",
    tagColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
  contact: {
    label: "Core Platform",
    icon: "📞",
    tag: "Support",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  blog: {
    label: "Core Platform",
    icon: "📰",
    tag: "SEO",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  crmLayout: {
    label: "Global Shell",
    icon: "📑",
    tag: "Footer",
    tagColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

const when = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      });
};

export default function AdminDashboardView({
  pageKeys,
  pagesMeta,
  backups,
  leadsCount,
  postsCount,
  restored,
}: AdminDashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Industry CRM", "Core Platform", "Trust & Proof", "Global Shell"];

  const filteredPages = pageKeys.filter((k) => {
    const meta = pagesMeta[k];
    const cat = CATEGORY_MAP[k]?.label || "Other";

    const matchesCategory = selectedCategory === "All" || cat === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-[1360px] space-y-8">
      
      {/* =========================================================================
          TOP BANNER: Welcome, Date & Status
      ========================================================================== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-40 bottom-0 -mb-16 h-48 w-48 rounded-full bg-teal-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-semibold text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Uptrix Unified Administration
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Manage website copy, oversee CRM inbound pipelines, configure multi-product modules, and publish articles with real-time live synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-xs transition shadow-xs"
            >
              <span>View Enquiries</span>
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] text-white">
                {leadsCount}
              </span>
            </Link>

            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition"
            >
              <span>+ New Blog Post</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Version Restored Notification */}
      {restored && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900 shadow-xs"
        >
          <span className="text-lg">✅</span>
          <div>
            <p className="font-bold">Content Snapshot Restored Successfully</p>
            <p className="text-xs text-emerald-700 font-normal">
              The selected version has been re-applied across website pages.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          KPI SUMMARY CARDS (4 Cards)
      ========================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Leads */}
        <Link
          href="/admin/leads"
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-indigo-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Inbound Leads
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              🎯
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{leadsCount}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Form submissions</span>
            <span className="font-bold text-indigo-600 group-hover:underline">Manage leads →</span>
          </div>
        </Link>

        {/* Card 2: Blog Posts */}
        <Link
          href="/admin/blog"
          className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-indigo-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Blog Articles
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              📝
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{postsCount}</span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
              Indexed
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>SEO Content Hub</span>
            <span className="font-bold text-indigo-600 group-hover:underline">Manage posts →</span>
          </div>
        </Link>

        {/* Card 3: CMS Pages */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Content Modules
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-600">
              ⚙️
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{pageKeys.length}</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Synced
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Live editable surfaces</span>
            <span className="font-semibold text-slate-600">100% Up-to-date</span>
          </div>
        </div>

        {/* Card 4: Version Snapshots */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Version Backups
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-purple-50 text-purple-600">
              🛡️
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">{backups.length}</span>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              Stored
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Instant Rollback</span>
            <span className="font-semibold text-slate-600">30 max retained</span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          CONTENT MODULES SECTION (Filter Bar + Dynamic Card Grid)
      ========================================================================== */}
      <div className="space-y-4">
        
        {/* Section Heading & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Website Content Modules</span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
                {filteredPages.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Select any section below to update live headings, features, FAQs, pricing, or media without touching code.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search page modules…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 shadow-2xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-200/80 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPages.map((k) => {
            const meta = pagesMeta[k];
            const cat = CATEGORY_MAP[k] || {
              label: "Module",
              icon: "📄",
              tag: "Standard",
              tagColor: "bg-slate-100 text-slate-700 border-slate-200",
            };

            return (
              <div
                key={k}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
              >
                {/* Header: Icon + Category + Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-base">
                        {cat.icon}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {cat.label}
                      </span>
                    </div>

                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${cat.tagColor}`}>
                      {cat.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {meta.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {meta.description}
                  </p>
                </div>

                {/* Footer: Live route link & Edit button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {meta.paths?.[0] && (
                      <a
                        href={meta.paths[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono font-medium text-slate-500 hover:text-indigo-600 transition inline-flex items-center gap-1"
                      >
                        <span className="truncate max-w-[130px]">{meta.paths[0]}</span>
                        <span className="text-[10px]">↗</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/admin/pages/${k}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition"
                  >
                    <span>Edit Content</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <span className="text-3xl">🔍</span>
            <p className="mt-2 text-sm font-bold text-slate-800">No content modules found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* =========================================================================
          VERSION HISTORY & RESTORE TIMELINE
      ========================================================================== */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>🛡️ Version History &amp; Automated Rollback</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 font-normal">
                {backups.length} snapshots
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every save automatically creates an immutable snapshot of all website copy. Restore any prior version instantly.
            </p>
          </div>
        </div>

        {backups.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No previous versions recorded yet. Backups will appear here as soon as you save any edits.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {backups.map((b, idx) => (
              <div
                key={b.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 hover:bg-slate-50/60 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold font-mono">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Snapshot taken at {when(b.savedAt)}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      ID: {b.id}
                    </div>
                  </div>
                </div>

                <form action={restoreVersion}>
                  <input type="hidden" name="id" value={b.id} />
                  <ConfirmSubmit
                    message="Are you sure you want to restore this snapshot? All website content will immediately revert back to the exact state saved at this point."
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition cursor-pointer"
                  >
                    Restore This Version
                  </ConfirmSubmit>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
