"use client";

import { useState } from "react";

export default function AdmissionsConsole() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "stream" | "team">("pipeline");

  return (
    <div className="relative rounded-3xl border border-[#dfe3f2] bg-white p-5 sm:p-7 shadow-[0_24px_60px_-20px_rgba(20,28,80,0.12)] ring-1 ring-pulse/5">
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e9ecf5] pb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-code text-xs font-bold text-pulse-ink">Uptrix Admissions Console</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          LIVE ADMISSION FEED
        </span>
      </div>

      {/* Console Tabs */}
      <div className="mt-4 flex gap-2 rounded-xl bg-[#f1f3f9] p-1">
        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-bold transition ${
            activeTab === "pipeline" ? "bg-pulse text-white shadow-xs" : "text-pulse-muted hover:text-pulse-ink"
          }`}
        >
          Admissions Funnel
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("stream")}
          className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-bold transition ${
            activeTab === "stream" ? "bg-pulse text-white shadow-xs" : "text-pulse-muted hover:text-pulse-ink"
          }`}
        >
          Live Leads (5)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("team")}
          className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-bold transition ${
            activeTab === "team" ? "bg-pulse text-white shadow-xs" : "text-pulse-muted hover:text-pulse-ink"
          }`}
        >
          Counselors
        </button>
      </div>

      {/* Tab 1: Funnel Pipeline */}
      {activeTab === "pipeline" && (
        <div className="mt-5 flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-xs text-pulse-subtle font-medium">
            <span>Stage Breakdown</span>
            <span>Total: 1,248 Enquiries</span>
          </div>
          {[
            { stage: "New Inquiries", count: 1248, pct: 100, color: "bg-[#7c80ff]" },
            { stage: "Counselor Consultation", count: 864, pct: 69, color: "bg-[#5b8cff]" },
            { stage: "Campus Tour / Demo Class", count: 432, pct: 35, color: "bg-[#f0a24a]" },
            { stage: "Application Submitted", count: 286, pct: 23, color: "bg-[#e0457b]" },
            { stage: "Fee Paid & Enrolled", count: 194, pct: 16, color: "bg-[#22b07d]" },
          ].map((s, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e3e6f2]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-pulse-ink">{s.stage}</span>
                <div className="flex items-center gap-2 font-code">
                  <span className="text-pulse font-bold">{s.pct}%</span>
                  <span className="font-extrabold text-pulse-ink">{s.count}</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e3e6f2]">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Live Stream */}
      {activeTab === "stream" && (
        <div className="mt-5 flex flex-col gap-2.5">
          {[
            { name: "Aarav Sharma", course: "JEE Advanced 2 Yr", source: "Meta Ad", time: "Just now", status: "Assigned to Priya" },
            { name: "Ananya Deshmukh", course: "Grade 11 CBSE", source: "Campus Kiosk", time: "2m ago", status: "WhatsApp Sent" },
            { name: "Rohan Varma", course: "B.Tech Computer Science", source: "Google Search", time: "5m ago", status: "Counselor Calling" },
            { name: "Meera Nair", course: "NEET Medical Batch", source: "CollegeDunia", time: "11m ago", status: "Demo Booked" },
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-[#e3e6f2] bg-[#f8f9fd] p-3 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-pulse-ink">{lead.name}</span>
                <span className="text-[11px] text-pulse-muted">
                  {lead.course} • <span className="text-pulse font-medium">{lead.source}</span>
                </span>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  {lead.status}
                </span>
                <span className="font-code text-[10px] text-pulse-subtle">{lead.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Counselor Activity */}
      {activeTab === "team" && (
        <div className="mt-5 flex flex-col gap-3">
          {[
            { name: "Priya Nair", campus: "City Center", calls: "48 calls", rate: "24% conv.", status: "In Call" },
            { name: "Kavita Rao", campus: "South Branch", calls: "42 calls", rate: "21% conv.", status: "Available" },
            { name: "Vikram Mehta", campus: "North Campus", calls: "39 calls", rate: "19% conv.", status: "Visit Tour" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-[#e3e6f2] bg-[#f8f9fd] p-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-pulse text-xs font-bold text-white shadow-2xs">
                  {c.name[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-pulse-ink">{c.name}</span>
                  <span className="text-[11px] text-pulse-subtle">{c.campus}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block font-code text-pulse-ink font-extrabold">{c.rate}</span>
                  <span className="text-[10px] text-pulse-subtle">{c.calls}</span>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full ${c.status === "Available" ? "bg-emerald-500" : "bg-amber-500"}`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Console Footer Alert */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-pulse-soft/80 border border-pulse/20 px-3.5 py-2.5 text-xs">
        <span className="flex items-center gap-2 text-pulse-ink font-semibold">
          <span className="text-emerald-700 font-bold">⚡</span>
          WhatsApp brochure auto-sent to parent in 14 seconds
        </span>
        <span className="font-code text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
          100% Delivered
        </span>
      </div>
    </div>
  );
}
