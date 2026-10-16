"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/site";

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "draft" | "published";
  publishedAt: string;
  seoScore: number;
}

interface BlogAdminViewProps {
  posts: BlogPostItem[];
  deleted?: boolean;
}

export default function BlogAdminView({ posts, deleted }: BlogAdminViewProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [, startTransition] = useTransition();

  // Compute metrics in a single pass without re-analyzing SEO or markdown
  const { publishedCount, draftCount, avgSeo } = useMemo(() => {
    let published = 0;
    let draft = 0;
    let totalScore = 0;

    for (const p of posts) {
      if (p.status === "published") published++;
      else if (p.status === "draft") draft++;
      totalScore += p.seoScore;
    }

    return {
      publishedCount: published,
      draftCount: draft,
      avgSeo: posts.length > 0 ? Math.round(totalScore / posts.length) : 0,
    };
  }, [posts]);

  // Fast memoized search and filter
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && p.status === "published") ||
        (statusFilter === "draft" && p.status === "draft");

      return matchesSearch && matchesStatus;
    });
  }, [posts, search, statusFilter]);

  const handleSearchChange = (val: string) => {
    startTransition(() => {
      setSearch(val);
    });
  };

  return (
    <div className="mx-auto max-w-[1360px] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <span>CONTENT MARKETING &amp; SEO ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            Blog Posts &amp; Articles
          </h1>
          <p className="text-xs text-slate-500">
            Create high-ranking SEO content to attract buyers, developers, and college administrators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/blog"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
          >
            <span>View Public Blog</span>
            <span className="text-[10px]">↗</span>
          </a>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-700 transition"
          >
            <span>+ Write New Post</span>
          </Link>
        </div>
      </div>

      {deleted && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-900 shadow-xs"
        >
          <span>🗑️</span>
          <span>The selected post has been removed successfully.</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Articles
          </span>
          <div className="mt-2 text-3xl font-black text-slate-900 font-display">
            {posts.length}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Published Live
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 font-display">
              {publishedCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Online
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Drafts in Progress
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-700 font-display">
              {draftCount}
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              Editing
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Average SEO Health
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-3xl font-black font-display ${
                avgSeo >= 80 ? "text-emerald-700" : avgSeo >= 50 ? "text-amber-700" : "text-rose-700"
              }`}
            >
              {avgSeo}/100
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              Audited
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search posts by title, slug, or category…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "All Posts" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <span className="text-3xl">📝</span>
          <p className="mt-2 text-sm font-bold text-slate-800">No blog posts found</p>
          <p className="text-xs text-slate-500 mt-1">
            {posts.length === 0
              ? "Start writing articles to drive organic search traffic to your CRM solutions."
              : "Try adjusting your search query or status filter."}
          </p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
          >
            <span>Create First Article</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5">Article Title &amp; URL</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Published Date</th>
                <th className="px-4 py-3.5">SEO Health</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const isPub = p.status === "published";
                const scColor =
                  p.seoScore >= 80
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : p.seoScore >= 50
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200";

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Title + Slug */}
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="font-bold text-slate-900 hover:text-indigo-600 transition block text-sm"
                      >
                        {p.title || "Untitled Article"}
                      </Link>
                      <span className="font-mono text-[10px] text-slate-400">
                        /blog/{p.slug}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {p.category || "General"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          isPub
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {isPub ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                      {formatDate(p.publishedAt)}
                    </td>

                    {/* SEO Score */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-mono font-bold border ${scColor}`}>
                        <span>{p.seoScore}</span>
                        <span className="text-[9px] text-slate-400">/100</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {isPub && (
                          <a
                            href={`/blog/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition"
                          >
                            Live ↗
                          </a>
                        )}

                        <Link
                          href={`/admin/blog/${p.id}`}
                          className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100 transition"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
