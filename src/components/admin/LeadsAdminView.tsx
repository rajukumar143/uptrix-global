"use client";

import { useState } from "react";
import type { Lead } from "@/lib/lead-store";

interface LeadsAdminViewProps {
  initialLeads: Lead[];
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
};

export default function LeadsAdminView({ initialLeads }: LeadsAdminViewProps) {
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const realEstateCount = initialLeads.filter((l) =>
    (l.source || "").toLowerCase().includes("real-estate") ||
    (l.businessType || "").toLowerCase().includes("real estate") ||
    (l.source || "").toLowerCase().includes("property")
  ).length;

  const collegeCount = initialLeads.filter((l) =>
    (l.source || "").toLowerCase().includes("college") ||
    (l.businessType || "").toLowerCase().includes("college") ||
    (l.source || "").toLowerCase().includes("education")
  ).length;

  const filteredLeads = initialLeads.filter((l) => {
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      l.name.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term) ||
      l.phone.toLowerCase().includes(term) ||
      l.company.toLowerCase().includes(term) ||
      (l.businessType || "").toLowerCase().includes(term) ||
      (l.solveProblem || "").toLowerCase().includes(term) ||
      (l.pageUrl || "").toLowerCase().includes(term) ||
      l.source.toLowerCase().includes(term);

    const matchesSource =
      selectedSource === "all" ||
      (selectedSource === "real-estate" &&
        ((l.source || "").toLowerCase().includes("real-estate") ||
          (l.businessType || "").toLowerCase().includes("real estate"))) ||
      (selectedSource === "college" &&
        ((l.source || "").toLowerCase().includes("college") ||
          (l.businessType || "").toLowerCase().includes("college") ||
          (l.source || "").toLowerCase().includes("education"))) ||
      (selectedSource === "case-study" && (l.source || "").toLowerCase().includes("case study"));

    return matchesSearch && matchesSource;
  });

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      
      {/* =========================================================================
          HEADER: Title, Subtitle, Actions
      ========================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE INBOUND RADAR • FULL DETAIL TRACKING</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-display">
            Customer Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-slate-500">
            Capturing Lead Name, Company Name, Email / Gmail, Mobile, Business Type, Solution Requirements, Page URL, Date &amp; Time.
          </p>
        </div>

        {initialLeads.length > 0 && (
          <a
            href="/api/admin/leads"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-700 transition cursor-pointer self-start sm:self-auto"
          >
            <span>📥</span>
            <span>Download Complete CSV Export</span>
          </a>
        )}
      </div>

      {/* =========================================================================
          METRICS CARDS
      ========================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Enquiries
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {initialLeads.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              All Channels
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Real Estate Leads
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 font-display">
              {realEstateCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Builders / CPs
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Colleges &amp; Universities
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-700 font-display">
              {collegeCount}
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              Higher Ed
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH & FILTER CONTROLS
      ========================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
        <div className="relative flex-1 min-w-[260px]">
          <input
            type="text"
            placeholder="Search by name, company, gmail, phone, business type, problem, or page URL…"
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

        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "All Enquiries" },
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
          DATA TABLE (ALL REQUESTED FIELDS DISPLAYED)
      ========================================================================== */}
      {filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <span className="text-3xl">📭</span>
          <p className="mt-2 text-sm font-bold text-slate-800">No matching leads found</p>
          <p className="text-xs text-slate-500">
            {initialLeads.length === 0
              ? "New enquiries will automatically show here as visitors submit demo and inquiry forms."
              : "Try adjusting your search terms or filters."}
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
          <table className="w-full min-w-[1080px] text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5">Lead Name</th>
                <th className="px-4 py-3.5">Company / Org</th>
                <th className="px-4 py-3.5">Gmail / Email</th>
                <th className="px-4 py-3.5">Mobile Number</th>
                <th className="px-4 py-3.5">Business Type</th>
                <th className="px-4 py-3.5">What to Solve?</th>
                <th className="px-4 py-3.5">Page URL</th>
                <th className="px-4 py-3.5 text-right">Date &amp; Time (IST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((l, i) => {
                const dateStr = formatDate(l.createdAt);
                const timeStr = formatTime(l.createdAt);

                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedLead(l)}
                    className="hover:bg-indigo-50/40 transition-colors cursor-pointer"
                  >
                    {/* 1. Lead Name */}
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-50 font-bold text-indigo-700 text-[11px]">
                          {l.name ? l.name.charAt(0).toUpperCase() : "?"}
                        </span>
                        <div>
                          <span>{l.name}</span>
                          <span className="block text-[10px] font-normal text-slate-400">
                            {l.source}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Company Name */}
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {l.company || "—"}
                    </td>

                    {/* 3. Gmail / Email */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {l.email ? (
                        <a
                          href={`mailto:${l.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                        >
                          <span>✉️</span>
                          <span>{l.email}</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* 4. Mobile Number */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <a
                        href={`tel:${l.phone.replace(/[^\d+]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-mono font-semibold text-slate-900 hover:text-emerald-700 hover:underline"
                      >
                        <span>📞</span>
                        <span>{l.phone}</span>
                      </a>
                    </td>

                    {/* 5. Business Type */}
                    <td className="px-4 py-3.5">
                      <span className="inline-block rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {l.businessType || "General"}
                      </span>
                    </td>

                    {/* 6. What would you like to solve? Optional */}
                    <td className="px-4 py-3.5 max-w-[200px]">
                      {l.solveProblem ? (
                        <span
                          title={l.solveProblem}
                          className="block truncate text-slate-600 bg-amber-50/70 border border-amber-200/80 rounded px-2 py-0.5 text-[11px]"
                        >
                          {l.solveProblem}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">None specified</span>
                      )}
                    </td>

                    {/* 7. Page URL */}
                    <td className="px-4 py-3.5">
                      {l.pageUrl ? (
                        <a
                          href={l.pageUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={l.pageUrl}
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-500 hover:text-indigo-600 hover:underline max-w-[120px] truncate"
                        >
                          <span className="truncate">{l.pageUrl.replace(/^https?:\/\/[^/]+/, "") || "/"}</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <span className="text-slate-400 font-mono text-[10px]">—</span>
                      )}
                    </td>

                    {/* 8. Date & Time */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap font-mono text-[11px]">
                      <div className="font-bold text-slate-800">{dateStr}</div>
                      <div className="text-[10px] text-slate-400">{timeStr} IST</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================================================================
          DETAILED LEAD INSPECTION MODAL
      ========================================================================== */}
      {selectedLead && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Lead Details Overview
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Company / Org</span>
                  <span className="text-sm font-bold text-slate-800 mt-0.5 block">{selectedLead.company || "Not specified"}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Business Type</span>
                  <span className="text-sm font-bold text-indigo-700 mt-0.5 block">{selectedLead.businessType || "General"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-sm font-mono font-bold text-emerald-700 mt-0.5 block hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Gmail / Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-sm font-medium text-indigo-600 mt-0.5 block truncate hover:underline">
                    {selectedLead.email || "—"}
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50/60 p-3.5 border border-amber-200/80">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">What would you like to solve?</span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {selectedLead.solveProblem || "No specific requirement provided by the visitor."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px] text-slate-500 font-mono">
                <div>
                  <span className="block font-sans text-[10px] font-bold uppercase text-slate-400">Page Submitted</span>
                  <span className="truncate block mt-0.5">{selectedLead.pageUrl || "/"}</span>
                </div>
                <div className="text-right">
                  <span className="block font-sans text-[10px] font-bold uppercase text-slate-400">Timestamp</span>
                  <span className="block mt-0.5">{formatDate(selectedLead.createdAt)} at {formatTime(selectedLead.createdAt)} IST</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
