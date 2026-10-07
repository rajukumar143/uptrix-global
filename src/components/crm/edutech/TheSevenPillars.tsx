"use client";

import { useState } from "react";
import { container, eyebrow, h2 } from "@/components/crm/styles";

export default function TheSevenPillars() {
  const [activeCampus, setActiveCampus] = useState(0);

  const campuses = [
    { name: "Central Campus", admissions: 84, revenue: "₹42.0 Lakh", rate: "22.4%" },
    { name: "South Branch", admissions: 62, revenue: "₹31.0 Lakh", rate: "19.8%" },
    { name: "North Center", admissions: 48, revenue: "₹24.0 Lakh", rate: "18.2%" },
  ];

  return (
    <section
      aria-labelledby="pillars-h"
      className="relative overflow-hidden border-b border-pulse-line bg-gradient-to-b from-[#f8f9fd] via-white to-[#f8f9fd] text-pulse-ink py-[clamp(64px,9vw,120px)]"
    >
      {/* Subtle ambient light gradient blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,63,212,0.06),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(34,176,125,0.07),transparent_70%)] blur-3xl"
      />

      <div className={`${container} relative flex flex-col gap-12 lg:gap-16`}>
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center max-w-[840px] mx-auto">
          <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 font-code">
            🛡️ The 7 Non-Negotiables for Academic Leaders
          </span>
          <h2 id="pillars-h" className={h2}>
            How Uptrix Plugs the 7 Costliest Leaks in Academic Operations
          </h2>
          <p className="text-[17px] leading-relaxed text-pulse-muted">
            Every school principal, coaching institute owner, and university dean buys a CRM + ERP to solve these 7 specific operational leaks. See how Uptrix automates each step.
          </p>
        </div>

        {/* Light Theme Bento Grid Architecture */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* =========================================================================
              CARD 1: SPEED TO LEAD (Double-Width Bento Card - 7 Cols)
          ========================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 rounded-3xl border border-[#e1e4f2] bg-white p-6 sm:p-8 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold font-code text-emerald-800">
                  <span>⚡</span> PILLAR 01 • SPEED TO LEAD
                </span>
                <span className="font-code text-xs font-bold text-pulse">&lt; 30s Guaranteed</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-pulse-ink tracking-tight">
                Instant 30-Second WhatsApp Prospectus
              </h3>
              <p className="text-sm leading-relaxed text-pulse-muted">
                Parents inquiring at 9 PM who wait hours for an email reply will enroll with the rival coaching center down the road. Uptrix triggers verified WhatsApp brochures with fee details in under 30 seconds.
              </p>
            </div>

            {/* Visual Simulated WhatsApp UI (Crisp Light Theme) */}
            <div className="rounded-2xl border border-[#e1e4f0] bg-[#f0f2f5] p-4 text-xs font-sans shadow-xs">
              <div className="flex items-center justify-between border-b border-[#e1e4ee] pb-2.5 mb-3 bg-white -mx-4 -mt-4 px-4 pt-3.5 rounded-t-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#128c7e] text-white font-bold text-xs">
                    A
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-pulse-ink text-xs">Apex Academy (Official WhatsApp)</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">● Verified Business Account</span>
                  </div>
                </div>
                <span className="font-code text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ⚡ Sent in 14s
                </span>
              </div>

              {/* Chat Message Bubble */}
              <div className="flex flex-col gap-2 rounded-2xl bg-white p-3.5 border border-[#e3e6f0] text-pulse-ink max-w-[95%] shadow-2xs">
                <p className="leading-relaxed text-xs">
                  👋 <strong>Hello Sharma ji!</strong> Thank you for inquiring about our <strong>JEE Advanced 2-Year Classroom Program</strong> for Aarav.
                </p>
                <div className="flex items-center gap-3 rounded-xl bg-[#f7f8fc] p-2.5 border border-[#e3e6f0] mt-1">
                  <span className="text-2xl">📄</span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-[11px] truncate text-pulse-ink">JEE_Advanced_Prospectus_2026.pdf</span>
                    <span className="text-[10px] text-pulse-subtle">2.4 MB • Complete Syllabus & Fee Structure</span>
                  </div>
                  <span className="rounded-lg bg-pulse px-2.5 py-1.5 text-[10px] font-bold text-white shrink-0 shadow-2xs">
                    Download
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 pt-2 border-t border-[#f0f1f8]">
                  <span className="rounded-lg bg-pulse-soft px-3 py-1.5 text-[11px] text-pulse font-bold cursor-pointer hover:bg-pulse hover:text-white transition">
                    📅 Book Free Demo Lecture
                  </span>
                  <span className="rounded-lg border border-[#d9dbe6] bg-white px-3 py-1.5 text-[11px] text-pulse-ink font-bold cursor-pointer hover:border-pulse transition">
                    📞 Talk to Academic Counselor
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-4 text-xs">
              <span className="text-pulse-subtle">First Response Benchmark:</span>
              <span className="font-code text-sm font-extrabold text-emerald-700">14s Average Delivery</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 2: COUNSELOR ACCOUNTABILITY (5 Cols Bento Card)
          ========================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-3xl border border-[#e1e4f2] bg-white p-6 sm:p-8 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-pulse-soft border border-pulse/20 px-3 py-1 text-xs font-bold font-code text-pulse">
                  <span>📊</span> PILLAR 02 • ACCOUNTABILITY
                </span>
                <span className="font-code text-xs font-bold text-pulse">Live Floor Tracker</span>
              </div>

              <h3 className="text-2xl font-extrabold text-pulse-ink tracking-tight">
                Counselor Attendance & Live Activity Ticker
              </h3>
              <p className="text-sm leading-relaxed text-pulse-muted">
                Eliminate uncalled leads and slacking off. Managers see daily counselor punch-in, call recordings, talk-time, and active dispositions in real-time.
              </p>
            </div>

            {/* Visual Live Activity Widget (Light Theme) */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-4 text-xs font-sans shadow-xs">
              <div className="flex items-center justify-between border-b border-[#e3e6f0] pb-2.5">
                <span className="font-bold text-pulse-ink">Counseling Floor Status</span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  14 Staff Active On-Duty
                </span>
              </div>

              {/* Active Counselor Row */}
              <div className="flex items-center justify-between rounded-xl bg-white p-3 border border-[#e1e4f0] shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-pulse-soft text-xs font-bold text-pulse">
                    PN
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-pulse-ink text-xs">Priya Nair (Lead Counselor)</span>
                    <span className="text-[10px] text-pulse-subtle">Punch-in: 08:54 AM (Geo-verified)</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-code text-emerald-700 font-bold text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    In Call: 04m 18s
                  </span>
                  <span className="text-[10px] text-pulse-subtle">38 calls • 4.2h Talk Time</span>
                </div>
              </div>

              {/* Real-time Ticker Item */}
              <div className="flex items-center justify-between rounded-xl bg-emerald-50/80 p-2.5 border border-emerald-200/80 text-[11px]">
                <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                  <span>⚡</span> Chemistry Demo Lecture Scheduled
                </span>
                <span className="font-code text-pulse-subtle text-[10px]">Just now</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-4 text-xs">
              <span className="text-pulse-subtle">Daily Staff Utilization:</span>
              <span className="font-code text-sm font-extrabold text-pulse">4.2 hrs Talk-Time Avg</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 3: DATA PROTECTION & PHONE MASKING (4 Cols)
          ========================================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 rounded-3xl border border-[#e1e4f2] bg-white p-6 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-bold font-code text-purple-800">
                  <span>🔒</span> PILLAR 03 • SECURITY
                </span>
                <span className="font-code text-xs font-bold text-purple-700">Anti-Theft</span>
              </div>

              <h3 className="text-xl font-extrabold text-pulse-ink tracking-tight">
                Phone Masking & Anti-Theft Protection
              </h3>
              <p className="text-xs leading-relaxed text-pulse-muted">
                Stop departing counselors from downloading 5,000 student numbers to a pen drive. Uptrix masks parent phone numbers and locks bulk Excel exports.
              </p>
            </div>

            {/* Visual Security Shield Widget */}
            <div className="flex flex-col gap-2 rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-3.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-pulse-subtle">Parent Contact:</span>
                <span className="font-code text-xs font-bold text-pulse-ink bg-white px-2.5 py-1 rounded-md border border-[#e1e4f0] shadow-2xs">
                  +91 98450 •••••
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-bold pt-1.5 border-t border-[#e5e7f2]">
                <span>🛡️</span>
                <span>Click-to-Call Active • Excel Export Blocked</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-3 text-xs">
              <span className="text-pulse-subtle">Student Data Safety:</span>
              <span className="font-code font-extrabold text-purple-700">100% Protected</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 4: TUITION TOKEN LEDGER & BANK ROUTING (4 Cols)
          ========================================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 rounded-3xl border border-[#e1e4f2] bg-white p-6 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold font-code text-amber-800">
                  <span>💳</span> PILLAR 04 • REVENUE
                </span>
                <span className="font-code text-xs font-bold text-amber-700">Zero Leakage</span>
              </div>

              <h3 className="text-xl font-extrabold text-pulse-ink tracking-tight">
                Tuition Token Ledger & Bank Routing
              </h3>
              <p className="text-xs leading-relaxed text-pulse-muted">
                Never lose track of a ₹10,000 seat token or subsequent ₹50,000 installments. Branded WhatsApp payment links route straight into your designated trust account.
              </p>
            </div>

            {/* Visual Payment Token Widget */}
            <div className="flex flex-col gap-2 rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-3.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pulse-ink">Seat Token Received</span>
                <span className="font-code font-extrabold text-emerald-700 text-sm">₹25,000</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-pulse-subtle">
                <span>Direct to HDFC Trust A/C</span>
                <span className="text-emerald-700 font-code font-bold">● Verified UPI</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-3 text-xs">
              <span className="text-pulse-subtle">Unaccounted Fee Leak:</span>
              <span className="font-code font-extrabold text-emerald-700">₹0 Discrepancy</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 5: MULTI-CAMPUS MASTER GOVERNANCE (4 Cols)
          ========================================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 rounded-3xl border border-[#e1e4f2] bg-white p-6 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold font-code text-blue-800">
                  <span>🏫</span> PILLAR 05 • GOVERNANCE
                </span>
                <span className="font-code text-xs font-bold text-blue-700">Multi-Campus</span>
              </div>

              <h3 className="text-xl font-extrabold text-pulse-ink tracking-tight">
                Multi-Campus Director Dashboard
              </h3>
              <p className="text-xs leading-relaxed text-pulse-muted">
                Stop relying on manipulated branch spreadsheets. Compare conversion rates, counselor performance, and fee collections across all branches on one screen.
              </p>
            </div>

            {/* Interactive Campus Switcher Widget */}
            <div className="flex flex-col gap-2 rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-3 text-xs shadow-2xs">
              <div className="flex gap-1.5 rounded-lg bg-white p-1 border border-[#e1e4f0]">
                {campuses.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveCampus(i)}
                    className={`flex-1 rounded py-1 text-[10px] font-bold transition cursor-pointer ${
                      activeCampus === i
                        ? "bg-pulse text-white shadow-xs"
                        : "text-pulse-subtle hover:text-pulse-ink"
                    }`}
                  >
                    Branch {i + 1}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-pulse-ink font-bold">{campuses[activeCampus].name}</span>
                <span className="font-code text-emerald-700 font-extrabold">
                  {campuses[activeCampus].revenue} ({campuses[activeCampus].admissions} Confirmed)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-3 text-xs">
              <span className="text-pulse-subtle">Director Oversight:</span>
              <span className="font-code font-extrabold text-blue-700">1 Master View</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 6: DEMO CLASS & CAMPUS TOUR SHOW-UP (6 Cols)
          ========================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 rounded-3xl border border-[#e1e4f2] bg-white p-6 sm:p-7 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold font-code text-rose-800">
                  <span>📍</span> PILLAR 06 • TURNOUT
                </span>
                <span className="font-code text-xs font-bold text-rose-700">92% Show-Up</span>
              </div>

              <h3 className="text-2xl font-extrabold text-pulse-ink tracking-tight">
                Automated Demo Class & Campus Tour Pass
              </h3>
              <p className="text-sm leading-relaxed text-pulse-muted">
                Up to 60% of parents and students who book a trial class or campus visit never show up. Uptrix sends automated WhatsApp gate passes with exact Google Maps location pins and 24h & 2h reminders.
              </p>
            </div>

            {/* Visual Digital Gate Pass */}
            <div className="rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-4 text-xs font-sans shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#e1e4ee] pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎫</span>
                  <span className="font-bold text-pulse-ink">Digital Campus Visit Pass #VP-402</span>
                </div>
                <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                  Confirmed
                </span>
              </div>
              <div className="flex flex-col gap-1.5 text-[11px] text-pulse-ink">
                <p><strong>Student:</strong> Ananya Deshmukh • Physics Trial Class</p>
                <p><strong>Venue:</strong> Main City Campus, Auditorium B • <strong>Date:</strong> Saturday 4:00 PM</p>
                <div className="mt-1 flex items-center gap-2 text-emerald-700 font-bold bg-white p-2 rounded-lg border border-[#e1e4f0]">
                  <span>📍</span>
                  <span>Google Maps Pin & Gate QR Code Dispatched to Parent WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-3 text-xs">
              <span className="text-pulse-subtle">Visit Attendance Rate:</span>
              <span className="font-code text-sm font-extrabold text-rose-700">92% Average Turnout</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 7: CLASSROOM SEAT MATRIX & CUTOFFS (6 Cols)
          ========================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 rounded-3xl border border-[#e1e4f2] bg-white p-6 sm:p-7 shadow-[0_16px_40px_-20px_rgba(20,28,80,0.08)] transition-all duration-300 hover:border-pulse hover:shadow-[0_24px_55px_-20px_rgba(59,63,212,0.16)] hover:-translate-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold font-code text-emerald-800">
                  <span>🎯</span> PILLAR 07 • CAPACITY
                </span>
                <span className="font-code text-xs font-bold text-emerald-700">Seat Matrix</span>
              </div>

              <h3 className="text-2xl font-extrabold text-pulse-ink tracking-tight">
                Live Classroom Seat Matrix & Batch Cutoffs
              </h3>
              <p className="text-sm leading-relaxed text-pulse-muted">
                Prevent classroom overcrowding and empty afternoon batches. Counselors see live seat availability in real-time, with automated waitlists as soon as batch thresholds are met.
              </p>
            </div>

            {/* Visual Batch Capacity Meter */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[#e1e4f0] bg-[#f8f9fd] p-4 text-xs font-sans shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pulse-ink">Batch Capacity: JEE Advanced Morning</span>
                <span className="font-code font-extrabold text-emerald-700 text-sm">48 / 50 Seats (96%)</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#e5e8f5]">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 w-[96%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-pulse-subtle">
                <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ⚠️ Only 2 Seats Remaining
                </span>
                <span>Auto-Overflow to Afternoon Batch</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-pulse-line pt-3 text-xs">
              <span className="text-pulse-subtle">Classroom Seat Utilization:</span>
              <span className="font-code text-sm font-extrabold text-emerald-700">100% Target Capacity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
