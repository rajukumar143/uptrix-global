"use client";

import { useState } from "react";
import type { Lead } from "@/lib/lead-store";

interface LeadsAdminViewProps {
  initialLeads: Lead[];
}

const dateTime = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
};

export default function LeadsAdminView({ initialLeads }: LeadsAdminViewProps) {
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");

  const realEstateCount = initialLeads.filter((l) =>
    (l.source || "").toLowerCase().includes("real-estate") || (l.source || "").toLowerCase().includes("property")
  ).length;

  const collegeCount = initialLeads.filter((l) =>
    (l.source || "").toLowerCase().includes("college") || (l.source || "").toLowerCase().includes("education")
  ).length;

  const filteredLeads = initialLeads.filter((l) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      l.name.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term) ||
      l.phone.toLowerCase().includes(term) ||
      l.company.toLowerCase().includes(term) ||
      l.source.toLowerCase().includes(term);

    const matchesSource =
      selectedSource === "all" ||
      (selectedSource === "real-estate" && l.source.toLowerCase().includes("real-estate")) ||
      (selectedSource === "college" && (l.source.toLowerCase().includes("college") || l.source.toLowerCase().includes("education"))) ||
      (selectedSource === "case-study" && l.source.toLowerCase().includes("case study"));

    return matchesSearch && matchesSource;
  });

  return (
    <div className="mx-auto max-w-[1360px] space-y-6">
      
      {/* =========================================================================
          HEADER: Title, Subtitle, Actions
      ========================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE INBOUND RADAR</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            Customer Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-slate-500">
            Real-time pipeline of visitors who requested product demos, case study access, or pricing.
          </p>
        </div>

        {initialLeads.length > 0 && (
          <a
            href="/admin/api/leads"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-700 transition cursor-pointer self-start sm:self-auto"
          >
            <span>📥</span>
            <span>Download CSV Export</span>
          </a>
        )}
      </div>

      {/* =========================================================================
          METRICS CARDS
      ========================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Captured Enquiries
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {initialLeads.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Synced
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Real Estate Inquiries
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 font-display">
              {realEstateCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Builders &amp; CPs
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            College &amp; Higher Ed
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-700 font-display">
              {collegeCount}
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              Institutions
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH & FILTER CONTROLS
      ========================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search by name, company, email, phone, or source…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* Source Filter Tabs */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "All Leads" },
            { id: "real-estate", label: "Real Estate" },
            { id: "college", label: "Colleges" },
            { id: "case-study", label: "Case Studies" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedSource(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedSource === tab.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* =========================================================================
          DATA TABLE
      ========================================================================== */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <span className="text-3xl">📭</span>
          <p className="mt-2 text-sm font-bold text-slate-800">No matching leads found</p>
          <p className="text-xs text-slate-500">
            {initialLeads.length === 0
              ? "New enquiries will automatically show here when visitors submit forms."
              : "Try clearing your search query or switching source filters."}
          </p>
          {initialLeads.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedSource("all");
              }}
              className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <table className="w-full min-w-[840px] text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5">Contact Name</th>
                <th className="px-4 py-3.5">Company / Org</th>
                <th className="px-4 py-3.5">Phone Number</th>
                <th className="px-4 py-3.5">Email Address</th>
                <th className="px-4 py-3.5">Source Channel</th>
                <th className="px-4 py-3.5 text-right">Received (IST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((l, i) => {
                const isRealEstate = (l.source || "").toLowerCase().includes("real-estate");
                const isCollege = (l.source || "").toLowerCase().includes("college");

                return (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    {/* Name + Avatar */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-50 font-bold text-indigo-700 text-[11px]">
                          {l.name ? l.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{l.name}</div>
                          <div className="text-[10px] text-slate-400">Verified Submission</div>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {l.company || "—"}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <a
                        href={`tel:${l.phone.replace(/[^\d+]/g, "")}`}
                        className="inline-flex items-center gap-1 font-mono font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        <span>📞</span>
                        <span>{l.phone}</span>
                      </a>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {l.email ? (
                        <a
                          href={`mailto:${l.email}`}
                          className="font-medium text-slate-700 hover:text-indigo-600 hover:underline"
                        >
                          {l.email}
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Source Pill */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          isRealEstate
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isCollege
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {l.source}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="px-4 py-3.5 text-right font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {dateTime(l.createdAt)}
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
