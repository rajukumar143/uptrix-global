"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import type { pageInfo, PageKey } from "@/content";

const PAGE_ICONS: Record<string, string> = {
  header: "🧭",
  home: "🏠",
  crm: "💼",
  college: "🎓",
  crmRealEstate: "🏢",
  caseStudies: "📈",
  videoTestimonials: "🎬",
  reviews: "⭐",
  pricing: "💳",
  about: "🏛️",
  contact: "📞",
  blog: "📰",
  crmLayout: "📑",
  tracking: "🎯",
};

interface AdminPanelShellProps {
  children: React.ReactNode;
  leadsCount: number;
  postsCount: number;
  pageKeys: PageKey[];
  pagesMeta: typeof pageInfo;
}

export default function AdminPanelShell({
  children,
  leadsCount,
  postsCount,
  pageKeys,
  pagesMeta,
}: AdminPanelShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const isPagesActive = pathname.startsWith("/admin/pages");
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(isPagesActive);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(true);
  const [topbarPagesOpen, setTopbarPagesOpen] = useState(false);
  const topbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname.startsWith("/admin/pages")) {
      setPagesDropdownOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (topbarRef.current && !topbarRef.current.contains(event.target as Node)) {
        setTopbarPagesOpen(false);
      }
    }
    if (topbarPagesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [topbarPagesOpen]);

  const filteredPageKeys = pageKeys.filter((k) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase();
    const info = pagesMeta[k];
    return (
      k.toLowerCase().includes(term) ||
      info.title.toLowerCase().includes(term) ||
      info.description.toLowerCase().includes(term)
    );
  });

  const isPagesOpen = pagesDropdownOpen || searchFilter.trim().length > 0;

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-slate-100/90 text-slate-800 antialiased font-sans">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
        />
      )}

      {/* =========================================================================
          LEFT SIDEBAR: Obsidian Dark Executive Theme
      ========================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/80 bg-slate-950 text-slate-300 transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 px-5">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-teal-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <span className="font-display text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
                  U
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Uptrix <span className="text-slate-400 font-normal">Console</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
                Enterprise v2.5
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white md:hidden cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Quick Filter */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search pages…"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
            <span className="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter("")}
                className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Nav Links Container */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Main Modules */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              Core Overview
            </div>
            <nav className="space-y-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive("/admin") && pathname === "/admin"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">📊</span>
                  <span>Dashboard Overview</span>
                </div>
              </Link>

              <Link
                href="/admin/leads"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive("/admin/leads")
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🎯</span>
                  <span>Leads &amp; Enquiries</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive("/admin/leads")
                      ? "bg-white/20 text-white"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {leadsCount}
                </span>
              </Link>

              <Link
                href="/admin/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive("/admin/blog")
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">📝</span>
                  <span>Blog Articles</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive("/admin/blog")
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {postsCount}
                </span>
              </Link>

              <Link
                href="/admin/seo"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive("/admin/seo")
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🌐</span>
                  <span>Robots & Sitemap</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive("/admin/seo")
                      ? "bg-white/20 text-white"
                      : "bg-teal-500/20 text-teal-400"
                  }`}
                >
                  LIVE
                </span>
              </Link>

              <Link
                href="/admin/pages/tracking"
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  pathname === "/admin/pages/tracking"
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🎯</span>
                  <span>Google & Meta Ads / GTM</span>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    pathname === "/admin/pages/tracking"
                      ? "bg-white/20 text-white"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  TAGS
                </span>
              </Link>
            </nav>
          </div>

          {/* Quick Industry Shortcuts */}
          <div>
            <button
              type="button"
              onClick={() => setIndustryDropdownOpen((prev) => !prev)}
              aria-expanded={industryDropdownOpen}
              className="w-full px-3 pb-1.5 text-[10px] font-bold tracking-wider text-slate-400 hover:text-slate-200 uppercase flex items-center justify-between cursor-pointer transition select-none group"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 group-hover:text-slate-300">Industry Portals</span>
                <svg
                  className={`h-3 w-3 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 ${
                    industryDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-[9px] text-teal-400 font-mono font-normal">Active</span>
            </button>

            {industryDropdownOpen && (
              <nav className="space-y-1">
                <Link
                  href="/admin/pages/crmRealEstate"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                    pathname === "/admin/pages/crmRealEstate"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">🏢</span>
                    <span>Real Estate CRM</span>
                  </div>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                    NEW
                  </span>
                </Link>

                <Link
                  href="/admin/pages/crm"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                    pathname === "/admin/pages/crm"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">💼</span>
                    <span>Pulse Sales CRM</span>
                  </div>
                </Link>
              </nav>
            )}
          </div>

          {/* Website Content / Pages Dropdown */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center justify-between">
              <span>Website Content</span>
              <span className="text-[9px] text-slate-400 font-mono">{filteredPageKeys.length}</span>
            </div>

            {/* Dropdown Button */}
            <button
              type="button"
              onClick={() => setPagesDropdownOpen((prev) => !prev)}
              aria-expanded={isPagesOpen}
              className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                pathname.startsWith("/admin/pages") && !isPagesOpen
                  ? "bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 shadow-xs"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm">📄</span>
                <span className="font-semibold text-slate-200 group-hover:text-white">Pages Dropdown</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                    pathname.startsWith("/admin/pages")
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {filteredPageKeys.length}
                </span>
                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    isPagesOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Dropdown Content with All Pages */}
            {isPagesOpen && (
              <nav className="mt-1.5 space-y-0.5 pl-2.5 ml-2 border-l border-slate-800/80">
                {filteredPageKeys.map((k) => {
                  const info = pagesMeta[k];
                  const active = pathname === `/admin/pages/${k}`;
                  const icon = PAGE_ICONS[k] || "📄";
                  return (
                    <Link
                      key={k}
                      href={`/admin/pages/${k}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                        active
                          ? "bg-indigo-600 text-white font-semibold shadow-xs"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs shrink-0">{icon}</span>
                        <span className="truncate">{info.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono shrink-0 ml-1.5 ${
                          active ? "text-indigo-200" : "text-slate-600 group-hover:text-slate-400"
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

        </div>

        {/* Sidebar Footer: User, Live Website Link & Sign Out */}
        <div className="shrink-0 border-t border-slate-800/80 bg-slate-950/90 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/60 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-xs text-white shadow-xs">
              AD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-200 truncate">Super Admin</span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Live Session
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <a
              href={process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixglobal.com"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1.5 text-[11px] font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <span>Live Site</span>
              <span className="text-[10px]">↗</span>
            </a>

            <form action={logout}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1 rounded-lg border border-rose-900/40 bg-rose-950/20 px-2 py-1.5 text-[11px] font-semibold text-rose-300 hover:bg-rose-900/40 hover:text-rose-100 transition cursor-pointer"
              >
                <span>Sign Out</span>
                <span className="text-[10px]">⎋</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT COLUMN: Modern Top Bar + Dynamic Content Canvas
      ========================================================================== */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* Sticky Header Topbar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/90 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/admin" className="hover:text-indigo-600 transition">
                Admin
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-900 capitalize">
                {pathname === "/admin"
                  ? "Dashboard"
                  : pathname.replace("/admin/", "").replace("pages/", "Page: ")}
              </span>
            </div>

            {/* Quick Pages Dropdown Menu in Topbar */}
            <div className="relative ml-2" ref={topbarRef}>
              <button
                type="button"
                onClick={() => setTopbarPagesOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
              >
                <span>📄 Pages</span>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">
                  {pageKeys.length}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${topbarPagesOpen ? "rotate-180 text-indigo-600" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {topbarPagesOpen && (
                <div className="absolute left-0 mt-1.5 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Select Page to Edit
                  </div>
                  {pageKeys.map((k) => {
                    const info = pagesMeta[k];
                    const active = pathname === `/admin/pages/${k}`;
                    const icon = PAGE_ICONS[k] || "📄";
                    return (
                      <Link
                        key={k}
                        href={`/admin/pages/${k}`}
                        onClick={() => setTopbarPagesOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                          active
                            ? "bg-indigo-600 text-white font-semibold"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span>{icon}</span>
                          <span className="truncate">{info.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono ${active ? "text-indigo-200" : "text-slate-400"}`}>
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Status & Quick Links */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Sync Active</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <a
                href={process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixglobal.com"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition"
              >
                <span>View Web</span>
                <span>↗</span>
              </a>

              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
              >
                <span>+ Post</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
