"use client";

import { useState } from "react";
import Link from "next/link";
import { btnPrimary, container } from "@/components/crm/styles";

export default function EdutechToolFeatures() {
  const [activeCampus, setActiveCampus] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const campuses = [
    { name: "Central Campus", leads: 148, activeCalls: 11, fees: "₹4.85 Lakh", targetPct: "92%", capacity: "48 / 50 Seats" },
    { name: "South Branch", leads: 96, activeCalls: 8, fees: "₹3.10 Lakh", targetPct: "78%", capacity: "38 / 45 Seats" },
    { name: "North Center", leads: 74, activeCalls: 6, fees: "₹2.40 Lakh", targetPct: "65%", capacity: "28 / 35 Seats" },
  ];

  return (
    <div className="flex flex-col">
      {/* =========================================================================
          GLOBAL SECTION ANCHOR NAV & INTRO
      ========================================================================== */}
      <section className="border-b border-pulse-line bg-gradient-to-b from-[#f8f9fd] via-white to-[#f8f9fd] py-14 lg:py-20">
        <div className={`${container} flex flex-col items-center text-center gap-4 max-w-[880px]`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 font-code">
            🛠️ 8 Dedicated Product Modules • Built for Educational Institutions
          </span>
          <h2 className="text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-extrabold tracking-tight text-pulse-ink">
            Every Operational Friction in Academic Admissions Solved by Uptrix
          </h2>
          <p className="text-[17px] leading-relaxed text-pulse-muted">
            See the exact operational pain coaching institutes, schools, and colleges face every day—and explore how each dedicated module in Uptrix CRM + ERP automates the solution.
          </p>

          {/* Module Quick Nav Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "sec-dashboard", label: "01. Dashboard", icon: "⚡" },
              { id: "sec-analytics", label: "02. Analytics", icon: "📈" },
              { id: "sec-leads", label: "03. Leads", icon: "👥" },
              { id: "sec-counsellor", label: "04. Counsellor Mgmt", icon: "📇" },
              { id: "sec-attendance", label: "05. Attendance", icon: "📅" },
              { id: "sec-worklog", label: "06. Work Log", icon: "📋" },
              { id: "sec-teamactivity", label: "07. Team Activity", icon: "⚡" },
              { id: "sec-payments", label: "08. Payments", icon: "💳" },
            ].map((chip) => (
              <a
                key={chip.id}
                href={`#${chip.id}`}
                className="flex items-center gap-1.5 rounded-full border border-[#dce0ef] bg-white px-3.5 py-1.5 text-xs font-bold text-pulse-ink shadow-2xs transition hover:border-pulse hover:text-pulse hover:shadow-xs"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 1: DASHBOARD
          Layout: Panoramic Bento Grid with Live Multi-Branch Switcher & Gauge
      ========================================================================== */}
      <section
        id="sec-dashboard"
        className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 font-code text-xs font-bold text-blue-800 uppercase">
                ⚡ MODULE 01 • DASHBOARD
              </span>
              <span className="font-code text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ● Live Campus Cockpit
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Real-Time Admissions Cockpit &amp; Branch Command Center
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Center heads, principals, and deans cannot steer enrollment targets with fragmented evening spreadsheets. Uptrix unifies all branches into one real-time operational dashboard.
            </p>
          </div>

          {/* Pain vs Solution Bento Top Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Branch managers manipulate numbers in spreadsheets. Principals discover admission shortfalls weeks too late when batches cannot be filled, with zero visibility into whether today's inquiries were called or abandoned.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                One single live screen connects all campuses. Directors instantly see real-time student inquiry inflow, counselor talk-time hours, uncalled SLA breaches, and batch capacity utilization live as it happens.
              </p>
            </div>
          </div>

          {/* Visual Bento Grid Cockpit */}
          <div className="rounded-3xl border border-[#dfe3f2] bg-[#f8f9fd] p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_50px_-20px_rgba(20,28,80,0.08)]">
            {/* Campus Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e1e5f2] pb-5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-pulse-ink">Select Campus Location:</span>
                <div className="flex gap-1.5 rounded-xl bg-white p-1 border border-[#e2e6f4]">
                  {campuses.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveCampus(i)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                        activeCampus === i
                          ? "bg-pulse text-white shadow-xs"
                          : "text-pulse-muted hover:text-pulse-ink"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <span className="font-code text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                ⚡ Admissions Target: {campuses[activeCampus].targetPct} Completed
              </span>
            </div>

            {/* Bento Grid 3 Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Bento Card 1: Today's Admission Velocity (6 Cols) */}
              <div className="lg:col-span-6 rounded-2xl bg-white p-6 border border-[#e2e6f4] flex flex-col justify-between gap-6 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pulse-ink text-sm">Today's Admission Velocity</span>
                  <span className="font-code text-xs font-bold text-pulse">Real-Time</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-pulse-subtle">New Inquiries</span>
                    <span className="text-2xl font-extrabold text-pulse-ink font-code mt-0.5">
                      {campuses[activeCampus].leads}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-pulse-subtle">Active Calling</span>
                    <span className="text-2xl font-extrabold text-emerald-700 font-code mt-0.5">
                      {campuses[activeCampus].activeCalls} Reps
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-pulse-subtle">Batch Status</span>
                    <span className="text-base font-extrabold text-pulse font-code mt-1 truncate">
                      {campuses[activeCampus].capacity}
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-[#f8f9fd] p-3 text-xs text-pulse-muted border border-[#e5e8f4]">
                  💡 <strong>Batch Alert:</strong> Morning JEE Advanced Batch is at 96% capacity. Automated waitlist rules will trigger in 2 seats.
                </div>
              </div>

              {/* Bento Card 2: SLA Breach Watchtower (3 Cols) */}
              <div className="lg:col-span-3 rounded-2xl bg-white p-6 border border-[#e2e6f4] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pulse-ink text-xs">SLA Watchtower</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-extrabold text-amber-700 font-code">2 Leads</span>
                  <span className="text-[11px] text-pulse-subtle">Pending First Call &gt; 12 mins</span>
                </div>
                <div className="rounded-lg bg-amber-50 p-2 text-[10px] text-amber-900 border border-amber-200">
                  ⚠️ Auto-reassigning to standby counselor in 02m 45s
                </div>
              </div>

              {/* Bento Card 3: Today's Fee Counter (3 Cols) */}
              <div className="lg:col-span-3 rounded-2xl bg-white p-6 border border-[#e2e6f4] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pulse-ink text-xs">Tuition Collected Today</span>
                  <span className="text-xs font-bold text-emerald-700 font-code">UPI / Bank</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-code">
                    {campuses[activeCampus].fees}
                  </span>
                  <span className="text-[11px] text-pulse-subtle">Direct to Trust Account</span>
                </div>
                <div className="rounded-lg bg-emerald-50 p-2 text-[10px] text-emerald-900 border border-emerald-200">
                  ✓ 100% Reconciled with Bank Statements
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 2: ANALYTICS
          Layout: Horizontal 4-Stage Chevron Funnel + Channel ROAS Comparison Matrix
      ========================================================================== */}
      <section
        id="sec-analytics"
        className="border-b border-pulse-line bg-[#f8f9fd] py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-purple-50 border border-purple-200 px-3 py-1 font-code text-xs font-bold text-purple-800 uppercase">
              📈 MODULE 02 • ANALYTICS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Enrollment Funnel Drop-Off Intelligence &amp; Ad Campaign ROAS
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Stop guessing which marketing campaigns fill classrooms. Uptrix tracks every rupee of ad spend from initial student inquiry directly to paid tuition receipts.
            </p>
          </div>

          {/* Pain & Solution 2-Column */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Institutes spend ₹1,00,000–₹5,00,000 monthly on Facebook, Google, and portal leads without knowing which leads convert into tuition fees and which are junk numbers. Marketing agencies blame counselors, and counselors blame lead quality.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                True Cost-Per-Enrolled-Student intelligence. Uptrix maps every campaign click to the final token receipt, pinpointing the exact stage where parents drop off and measuring genuine enrollment revenue.
              </p>
            </div>
          </div>

          {/* Horizontal Step-by-Step Chevron Funnel Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "STAGE 01",
                name: "Inquiry Captured",
                count: "1,248 Leads",
                pct: "100%",
                loss: "Top of Funnel",
                solve: "Meta, Google & Walk-in Webhook Ingestion",
                color: "border-[#7c80ff]",
              },
              {
                step: "STAGE 02",
                name: "Counselor Consultation",
                count: "864 Calls",
                pct: "69%",
                loss: "31% Leaked (Uncontactable)",
                solve: "Sub-30s WhatsApp Prospectus Saves 80% Drop",
                color: "border-[#5b8cff]",
              },
              {
                step: "STAGE 03",
                name: "Demo / Campus Visit",
                count: "432 Show-Ups",
                pct: "35%",
                loss: "50% Leaked (No-shows)",
                solve: "Automated WhatsApp Gate QR Pin Boosts Turnout",
                color: "border-[#f0a24a]",
              },
              {
                step: "STAGE 04",
                name: "Confirmed Admission",
                count: "194 Enrolled",
                pct: "16%",
                loss: "45% Demo Conversion",
                solve: "1-Click UPI Token Payment Recovers Final Seat",
                color: "border-[#22b07d]",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between gap-4 rounded-3xl border-2 ${f.color} bg-white p-6 shadow-2xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs font-bold text-pulse">{f.step}</span>
                  <span className="font-code text-xs font-extrabold text-pulse-ink">{f.pct}</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-extrabold text-pulse-ink text-lg">{f.name}</h4>
                  <span className="font-code text-2xl font-black text-pulse-ink mt-1">{f.count}</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-3 border-t border-[#f0f2f8] text-xs">
                  <span className="text-rose-700 font-semibold text-[11px]">⚠️ {f.loss}</span>
                  <span className="text-emerald-800 font-bold text-[11px]">✓ {f.solve}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ad Channel ROAS Comparison Matrix */}
          <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-8 flex flex-col gap-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#e1e5f2] pb-3">
              <span className="font-bold text-pulse-ink text-sm">Ad Marketing Channel Attribution (Verified Tuition Receipts)</span>
              <span className="font-code text-xs font-bold text-emerald-700">₹48.2 Lakh Recovered Revenue</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1 text-xs">
                <span className="font-bold text-pulse-ink">Meta Ads (JEE &amp; NEET Campaign)</span>
                <span className="text-pulse-subtle">₹42,000 Ad Spend • 420 Inquiries</span>
                <span className="font-code font-extrabold text-emerald-700 text-base mt-1">18 Admissions • ₹11.7L Fee (27.8x ROAS)</span>
              </div>
              <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1 text-xs">
                <span className="font-bold text-pulse-ink">Google Search (Campus Visits)</span>
                <span className="text-pulse-subtle">₹35,000 Ad Spend • 280 Inquiries</span>
                <span className="font-code font-extrabold text-emerald-700 text-base mt-1">15 Admissions • ₹9.8L Fee (28.0x ROAS)</span>
              </div>
              <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1 text-xs">
                <span className="font-bold text-pulse-ink">CollegeDunia &amp; Education Portals</span>
                <span className="text-pulse-subtle">₹22,000 Portal Cost • 190 Inquiries</span>
                <span className="font-code font-extrabold text-pulse-ink text-base mt-1">7 Admissions • ₹4.5L Fee (Moderate)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 3: LEADS
          Layout: Mobile WhatsApp Simulator (Center) + Anti-Theft Security Shield (Right)
      ========================================================================== */}
      <section
        id="sec-leads"
        className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-code text-xs font-bold text-emerald-800 uppercase">
              👥 MODULE 03 • LEADS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Omnichannel Inquiry Ingestion &amp; Instant 30-Second WhatsApp Prospectus
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Speed to lead decides who wins the student. Uptrix captures leads instantly from every source and delivers branded WhatsApp brochures with syllabus and fee details in under 30 seconds.
            </p>
          </div>

          {/* 3-Column Display: Pain Story (Left) + WhatsApp Simulator (Center) + Masked Click-to-Call (Right) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* Left: Pain Story & Solution Card (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-2.5 shadow-2xs">
                <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                  <span>⚠️</span> The Operational Pain:
                </span>
                <p className="text-sm text-rose-950 leading-relaxed">
                  Parents inquiring at 9 PM wait 12 hours for an email reply and enroll at a competitor who responded immediately. Furthermore, departing counselors export student contact numbers into Excel pen drives to steal them to another coaching center.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-2.5 shadow-2xs">
                <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                  <span>✅</span> What Uptrix Solves:
                </span>
                <p className="text-sm text-emerald-950 leading-relaxed">
                  Official WhatsApp Cloud API triggers verified brochures in under 30 seconds. Phone numbers are masked for counselors, and Excel export permissions are locked tight.
                </p>
              </div>
            </div>

            {/* Center: Mobile Device Frame with Live WhatsApp Chat (4 Cols) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[340px] rounded-[36px] border-[6px] border-[#d9dde8] bg-[#f0f2f5] p-3 shadow-[0_25px_60px_-15px_rgba(20,28,80,0.15)] flex flex-col gap-2.5">
                {/* Simulated Phone Notch */}
                <div className="mx-auto h-4 w-28 rounded-full bg-[#e1e4ed]" />

                {/* WhatsApp Chat Header */}
                <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-[#e1e4ed] shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#128c7e] text-white font-bold text-xs">
                      U
                    </span>
                    <div className="flex flex-col">
                      <span className="font-bold text-pulse-ink text-xs">Apex Academy WhatsApp</span>
                      <span className="text-[9px] text-emerald-700 font-bold">● Verified Business API</span>
                    </div>
                  </div>
                  <span className="font-code text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    ⚡ 14s
                  </span>
                </div>

                {/* WhatsApp Chat Speech Bubble */}
                <div className="flex flex-col gap-2 rounded-2xl bg-white p-3.5 border border-[#e2e5f0] text-pulse-ink text-xs shadow-2xs">
                  <p className="text-xs">
                    👋 <strong>Hello Sharma ji!</strong> Thank you for inquiring about our <strong>JEE Advanced 2-Year Program</strong> for Aarav.
                  </p>
                  <div className="flex items-center gap-2.5 rounded-xl bg-[#f7f8fd] p-2 border border-[#e2e6f2]">
                    <span className="text-xl">📄</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-[10px] truncate text-pulse-ink">JEE_Prospectus_2026.pdf</span>
                      <span className="text-[9px] text-pulse-subtle">2.4 MB • Complete Fee Structure</span>
                    </div>
                    <span className="rounded bg-pulse px-2 py-1 text-[9px] font-bold text-white shrink-0">
                      Download
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[#f0f2f8]">
                    <span className="rounded bg-pulse-soft px-2 py-0.5 text-[9px] text-pulse font-bold">
                      📅 Book Demo Lecture
                    </span>
                    <span className="rounded border border-[#e2e5f0] px-2 py-0.5 text-[9px] text-pulse-ink font-bold">
                      📞 Talk to Counselor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Counselor CRM Terminal with Masked Click-to-Call (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4 rounded-3xl border border-[#dfe3f2] bg-[#f8f9fd] p-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#e1e5f2] pb-3">
                <span className="font-bold text-pulse-ink text-xs">Counselor Click-to-Call Terminal</span>
                <span className="rounded-full bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                  🛡️ Anti-Theft Lock
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Aarav Sharma", course: "JEE Advanced", phone: "+91 98450 •••••", status: "Prospectus Read" },
                  { name: "Ananya Deshmukh", course: "Grade 11 CBSE", phone: "+91 99201 •••••", status: "Demo Scheduled" },
                  { name: "Rohan Varma", course: "NEET Repeaters", phone: "+91 97114 •••••", status: "Calling Rep" },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-3 border border-[#e2e6f4] text-xs shadow-2xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-pulse-ink">{s.name}</span>
                      <span className="font-code text-pulse-muted text-[11px]">{s.phone}</span>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-pulse px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs cursor-pointer hover:bg-pulse-hover"
                    >
                      Call Rep
                    </button>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-white p-3 border border-[#e2e6f4] text-[11px] text-pulse-muted">
                🔒 <strong>Data Security Enforced:</strong> Excel bulk export button is disabled. Departing counselors cannot extract parent contact records.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 4: COUNSELLOR MANAGEMENT
          Layout: Flowchart Architecture (Ingestion → Rule Engine → Active Rep Cards)
      ========================================================================== */}
      <section
        id="sec-counsellor"
        className="border-b border-pulse-line bg-[#f8f9fd] py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-amber-50 border border-amber-200 px-3 py-1 font-code text-xs font-bold text-amber-800 uppercase">
              📇 MODULE 04 • COUNSELLOR MANAGEMENT
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Intelligent Lead Allocation &amp; Counselor SLA Enforcement
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Stop counselor favoritism, lead cherry-picking, and missed callbacks. Uptrix enforces algorithmic round-robin routing and automatically reassigns idle inquiries.
            </p>
          </div>

          {/* Pain & Solution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Counselors cherry-pick high-fee enrollments (like 2-year classroom programs) and ignore harder leads. Inquiries sit untouched for days, while favorite counselors get overloaded and burn out.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                Specialty round-robin distribution by subject (JEE vs NEET vs Foundation) and campus branch language. If an inquiry is not called in 15 minutes, it auto-escalates and reallocates to another counselor.
              </p>
            </div>
          </div>

          {/* Floor Dispatcher Cards Grid (3 Active Reps with SLA status) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Priya Nair",
                role: "Senior Engineering Counselor",
                campus: "Central Campus",
                leads: 42,
                cap: 45,
                conv: "24.2%",
                speed: "04m 12s Avg",
                status: "In Call: 04m 18s",
                statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
                badge: "🏆 Top Performer",
              },
              {
                name: "Kavita Rao",
                role: "Medical Admissions Specialist",
                campus: "South Branch",
                leads: 38,
                cap: 40,
                conv: "21.0%",
                speed: "05m 30s Avg",
                status: "Available for Calls",
                statusColor: "text-blue-700 bg-blue-50 border-blue-200",
                badge: "On Target",
              },
              {
                name: "Vikram Mehta",
                role: "K-12 School Admissions",
                campus: "North Center",
                leads: 35,
                cap: 40,
                conv: "19.4%",
                speed: "06m 10s Avg",
                status: "Campus Tour Visit",
                statusColor: "text-amber-700 bg-amber-50 border-amber-200",
                badge: "On Target",
              },
            ].map((rep, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-5 rounded-3xl border border-[#dfe3f2] bg-white p-6 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-pulse-soft px-2.5 py-0.5 font-code text-[11px] font-bold text-pulse">
                    {rep.badge}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${rep.statusColor}`}>
                    {rep.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-pulse text-base font-extrabold text-white shadow-2xs">
                    {rep.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-pulse-ink text-base">{rep.name}</h4>
                    <span className="text-xs text-pulse-subtle">{rep.role}</span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-pulse-subtle">Assigned Pipeline Cap:</span>
                    <span className="font-code font-bold text-pulse-ink">{rep.leads} / {rep.cap} Leads</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8ebf5]">
                    <div
                      className="h-full rounded-full bg-pulse"
                      style={{ width: `${(rep.leads / rep.cap) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#f0f2f8] text-xs">
                  <div className="flex flex-col">
                    <span className="text-pulse-subtle text-[11px]">Conversion:</span>
                    <span className="font-code font-bold text-pulse-ink text-sm">{rep.conv}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-pulse-subtle text-[11px]">First Response:</span>
                    <span className="font-code font-bold text-emerald-700 text-sm">{rep.speed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 5: ATTENDANCE
          Layout: Geo-Map Coordinate Card & Shift Roster Matrix
      ========================================================================== */}
      <section
        id="sec-attendance"
        className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-teal-50 border border-teal-200 px-3 py-1 font-code text-xs font-bold text-teal-800 uppercase">
              📅 MODULE 05 • ATTENDANCE
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Shift Roster &amp; Geo-Verified Desk Attendance
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Peak admission season requires every counseling desk manned. Uptrix verifies physical arrival at branch gates via mobile GPS and manages morning, evening, and weekend rosters.
            </p>
          </div>

          {/* Pain & Solution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Parents walk into branch offices on weekends only to find counseling desks empty. Staff punch in remotely from home or arrive late, costing the academy high-intent walk-in admissions.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                Geo-fenced mobile punch-in within 100 meters of campus gates. Center heads get live desk availability indicators and shift schedules for weekend parent rushes with automated payroll export.
              </p>
            </div>
          </div>

          {/* Geo Radar Card & Desk Roster Matrix (Split Layout) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* Geo Radar Card (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl border border-[#dfe3f2] bg-[#f8f9fd] p-6 sm:p-8 flex flex-col gap-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-[#e1e5f2] pb-3">
                <span className="font-bold text-pulse-ink text-sm">GPS Campus Perimeter Check</span>
                <span className="font-code text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  📍 100m Geo-Fence Active
                </span>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-[#e2e6f4] flex flex-col gap-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pulse-ink text-sm">Priya Nair • Central Campus Gate #2</span>
                  <span className="font-code text-xs text-emerald-700 font-bold">Punch-In: 08:54 AM</span>
                </div>
                <p className="text-xs text-pulse-muted">
                  GPS Coordinates: 12.9716° N, 77.5946° E • Device IP Verified • Physical Desk #4
                </p>
                <div className="rounded-xl bg-emerald-50 p-2.5 text-xs text-emerald-900 font-bold border border-emerald-200 flex items-center gap-2">
                  <span>✓</span>
                  <span>Physical Presence Verified inside Campus Boundary</span>
                </div>
              </div>
            </div>

            {/* Shift Matrix (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-8 flex flex-col gap-4 shadow-2xs">
              <span className="font-bold text-pulse-ink text-sm">Active Floor Shift Coverage Today:</span>
              <div className="flex flex-col gap-2.5">
                {[
                  { shift: "Morning Shift (08:30 AM - 02:30 PM)", staffed: "8 Counselors Active", status: "100% Desks Covered", color: "text-emerald-700 bg-emerald-50" },
                  { shift: "Evening Shift (02:30 PM - 08:30 PM)", staffed: "6 Counselors Active", status: "Full Evening Roster", color: "text-blue-700 bg-blue-50" },
                  { shift: "Weekend Walk-In Parent Duty", staffed: "14 Counselors Scheduled", status: "Priority Admission Day", color: "text-purple-700 bg-purple-50" },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4] text-xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-pulse-ink">{s.shift}</span>
                      <span className="text-[11px] text-pulse-subtle">{s.staffed}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 font-bold ${s.color}`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 6: WORK LOG / ACTIVITIES
          Layout: Vertical Timeline with Interactive Audio Player & Call Audit Drawer
      ========================================================================== */}
      <section
        id="sec-worklog"
        className="border-b border-pulse-line bg-[#f8f9fd] py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 font-code text-xs font-bold text-indigo-800 uppercase">
              📋 MODULE 06 • WORK LOG / ACTIVITIES
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Unified Student History &amp; Counselor Call Audio Notes
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Never ask parents to repeat their child's background. Every call recording, WhatsApp interaction, and parent concern lives on a single unified student profile.
            </p>
          </div>

          {/* Pain & Solution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                When parents call back after 3 days, a new counselor asks the same 10 repetitive questions. Parents feel neglected, and management has no record of what was discussed, what discounts were promised, or why the lead dropped.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                Complete chronological interaction timeline with integrated audio recording playback to audit counselor pitch quality, automated callback alarms, and standardized disposition tags.
              </p>
            </div>
          </div>

          {/* Vertical Storyline Feed with Simulated Audio Player */}
          <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#e1e5f2] pb-3">
              <span className="font-bold text-pulse-ink text-sm">Aarav Sharma • Complete Student Interaction Journey</span>
              <span className="font-code text-xs font-bold text-pulse">JEE Advanced 2-Yr Program</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Event 1 */}
              <div className="flex items-start gap-4 rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4]">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-pulse-soft text-pulse font-bold text-xs shrink-0">
                  01
                </span>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold text-pulse-ink text-sm">Lead Captured from Meta Lead Ad</span>
                  <p className="text-pulse-muted">Auto-sent verified WhatsApp prospectus in 14s. Parent opened brochure PDF within 2 minutes.</p>
                  <span className="font-code text-[10px] text-pulse-subtle">Tuesday 09:14 AM</span>
                </div>
              </div>

              {/* Event 2: Interactive Audio Player Simulation */}
              <div className="flex items-start gap-4 rounded-2xl bg-white p-4 border-2 border-pulse/30 shadow-2xs">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-pulse text-white font-bold text-xs shrink-0">
                  02
                </span>
                <div className="flex flex-col gap-2.5 text-xs w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-pulse-ink text-sm">Phone Consultation Logged • Priya Nair</span>
                    <span className="font-code text-xs font-bold text-emerald-700">Duration: 05m 12s</span>
                  </div>

                  {/* Audio Waveform Player */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-pulse text-white font-bold text-xs cursor-pointer hover:bg-pulse-hover shadow-xs"
                    >
                      {isPlayingAudio ? "⏸" : "▶"}
                    </button>
                    <div className="flex items-center gap-1 flex-1 h-6">
                      {[40, 65, 30, 85, 95, 45, 70, 60, 90, 40, 80, 50, 75, 85, 30, 60, 90, 70, 40, 80].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio ? "bg-pulse animate-pulse" : "bg-[#c8cde0]"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <span className="font-code text-[11px] text-pulse font-bold">
                      {isPlayingAudio ? "02:14 / 05:12" : "00:00 / 05:12"}
                    </span>
                  </div>

                  <p className="text-pulse-muted">
                    <strong>Counselor Disposition:</strong> Parent concerned about commute distance. Agreed to visit main campus on Saturday 4:00 PM for physics demo lecture.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-4 rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-200 text-emerald-900 font-bold text-xs shrink-0">
                  03
                </span>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold text-emerald-950 text-sm">Digital Campus Tour Gate Pass Dispatched</span>
                  <p className="text-emerald-900">Pass #VP-402 sent to mother's WhatsApp with exact Google Maps location pin and gate check-in QR code.</p>
                  <span className="font-code text-[10px] text-emerald-800 font-bold">Scheduled for Saturday 04:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 7: TODAY'S TEAM ACTIVITY
          Layout: Marquee Activity Ticker + Gamified Leaderboard Podium
      ========================================================================== */}
      <section
        id="sec-teamactivity"
        className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-sky-50 border border-sky-200 px-3 py-1 font-code text-xs font-bold text-sky-800 uppercase">
              ⚡ MODULE 07 • TODAY'S TEAM ACTIVITY
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Live Tele-Calling Floor Ticker &amp; Talk-Time Benchmarks
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Maintain floor momentum and eliminate tele-calling slacking. Managers monitor active dials, talk duration, and demo bookings in real time.
            </p>
          </div>

          {/* Pain & Solution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Counselors mark fake call entries in spreadsheets while making only 10 actual calls a day. Center heads have no idea if counselors are talking to parents or scrolling social media until month-end targets are missed.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                Live tele-calling activity ticker streaming calls connected, actual talk duration, and demo bookings. Enforces mandatory 3.5+ hours talk-time per counselor with real-time floor leaderboards.
              </p>
            </div>
          </div>

          {/* Gamified Floor Leaderboard Podium Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                rank: "🥇 #1 REPUTATION",
                name: "Priya Nair",
                dials: "48 Calls Dialed",
                talkTime: "4.4 hrs Active Talk",
                targetPct: "125% of Daily Target",
                demos: "6 Demos Booked",
                tokens: "₹75,000 Token Fees",
                borderColor: "border-amber-300 bg-gradient-to-b from-amber-50/40 to-white",
              },
              {
                rank: "🥈 #2 REPUTATION",
                name: "Kavita Rao",
                dials: "42 Calls Dialed",
                talkTime: "3.8 hrs Active Talk",
                targetPct: "108% of Daily Target",
                demos: "5 Demos Booked",
                tokens: "₹50,000 Token Fees",
                borderColor: "border-[#dfe3f2] bg-white",
              },
              {
                rank: "🥉 #3 REPUTATION",
                name: "Vikram Mehta",
                dials: "39 Calls Dialed",
                talkTime: "3.5 hrs Active Talk",
                targetPct: "100% of Daily Target",
                demos: "4 Demos Booked",
                tokens: "₹25,000 Token Fees",
                borderColor: "border-[#dfe3f2] bg-white",
              },
            ].map((rep, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between gap-5 rounded-3xl border-2 ${rep.borderColor} p-6 shadow-2xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-code text-xs font-bold text-pulse-ink">{rep.rank}</span>
                  <span className="font-code text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rep.targetPct}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-xl font-extrabold text-pulse-ink">{rep.name}</h4>
                  <span className="text-xs text-pulse-subtle font-medium mt-0.5">{rep.dials}</span>
                </div>

                <div className="flex flex-col gap-1 rounded-2xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4]">
                  <span className="text-xs text-pulse-subtle">Talk Time:</span>
                  <span className="text-lg font-extrabold text-pulse-ink font-code">{rep.talkTime}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0f2f8] text-xs">
                  <span className="font-bold text-pulse">{rep.demos}</span>
                  <span className="font-code font-bold text-emerald-700">{rep.tokens}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Stream Ticker Bar */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs text-emerald-950 flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <span>⚡</span> Live Floor Activity:
            </span>
            <span>Just Now: Priya Nair closed ₹25,000 seat token for JEE Advanced 2-Year Program via UPI link</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESIGN 8: PAYMENTS
          Layout: Bank Settlement Router & Automated Installment Ledger Matrix
      ========================================================================== */}
      <section
        id="sec-payments"
        className="border-b border-pulse-line bg-[#f8f9fd] py-[clamp(64px,8vw,112px)]"
      >
        <div className={`${container} flex flex-col gap-10`}>
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-[800px]">
            <span className="w-fit rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-code text-xs font-bold text-emerald-800 uppercase">
              💳 MODULE 08 • PAYMENTS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-pulse-ink tracking-tight">
              Seat Reservation Token Ledger &amp; Multi-Installment Tuition Recovery
            </h3>
            <p className="text-base leading-relaxed text-pulse-muted">
              Never lose track of a ₹10,000 seat token or subsequent ₹50,000 installments. Branded WhatsApp payment links route straight into designated institutional trust accounts.
            </p>
          </div>

          {/* Pain & Solution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                <span>⚠️</span> The Operational Pain for Academic Leaders:
              </span>
              <p className="text-sm text-rose-950 leading-relaxed">
                Tuition installment reminders are forgotten on sticky notes. Up to 12% of student fee installments are lost because staff have no automated ledger, and parents share unverified screenshot payment slips in WhatsApp.
              </p>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 flex flex-col gap-3 shadow-2xs">
              <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                <span>✅</span> What Uptrix CRM + ERP Solves:
              </span>
              <p className="text-sm text-emerald-950 leading-relaxed">
                Branded WhatsApp UPI payment links with automated instant GST/trust receipts. Automated installment schedules trigger reminders 5 days before due dates with direct settlement into separate trust accounts.
              </p>
            </div>
          </div>

          {/* Bank Splitter & Installment Calendar Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card 1: 1-Click WhatsApp Payment Link */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pulse-ink text-sm">Instant WhatsApp Payment</span>
                <span className="font-code text-xs font-bold text-emerald-700">UPI / Cards</span>
              </div>
              <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-pulse-ink">Aarav Sharma</span>
                  <span className="font-code font-bold text-emerald-700 text-sm">₹25,000 Token</span>
                </div>
                <p className="text-pulse-subtle text-[11px]">JEE Advanced 2-Year Classroom Seat Deposit</p>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-900 font-bold text-[11px] border border-emerald-200">
                  ● Verified UPI Settlement Confirmed
                </div>
              </div>
              <span className="text-[11px] text-pulse-muted">Auto-dispatches GST receipt PDF to parent WhatsApp in seconds.</span>
            </div>

            {/* Card 2: Multi-Trust Bank Router */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pulse-ink text-sm">Multi-Trust Bank Settlement</span>
                <span className="font-code text-xs font-bold text-blue-700">Multi-Account</span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="font-bold text-pulse-ink block">HDFC Bank • Main Academic Trust</span>
                  <span className="text-[11px] text-pulse-subtle">Tuition &amp; Course Fees Route Here</span>
                </div>
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="font-bold text-pulse-ink block">ICICI Bank • Hostel &amp; Transport Society</span>
                  <span className="text-[11px] text-pulse-subtle">Boarding Fees Route Here Without Mix-ups</span>
                </div>
              </div>
              <span className="text-[11px] text-pulse-muted">Zero bookkeeping confusion between separate registered societies.</span>
            </div>

            {/* Card 3: Automated Installment Calendar */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pulse-ink text-sm">Upcoming Installment Calendar</span>
                <span className="font-code text-xs font-bold text-pulse">Automated</span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <div>
                    <span className="font-bold text-pulse-ink block">Term 1 Tuition • Ananya D.</span>
                    <span className="text-[10px] text-pulse-subtle">Due: 15th April • 5d Alert Sent</span>
                  </div>
                  <span className="font-code font-bold text-pulse-ink">₹45,000</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <div>
                    <span className="font-bold text-pulse-ink block">Balance Fee • Karthik I.</span>
                    <span className="text-[10px] text-pulse-subtle">Due: 20th April • Link Clicked</span>
                  </div>
                  <span className="font-code font-bold text-pulse-ink">₹20,000</span>
                </div>
              </div>
              <span className="text-[11px] text-pulse-muted">Parents receive polite automated reminders 5 days before due date.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CALL TO ACTION
      ========================================================================== */}
      <section className="bg-white py-16 border-b border-pulse-line">
        <div className={`${container} flex flex-col items-center text-center gap-5 max-w-[780px]`}>
          <span className="rounded-full border border-pulse/20 bg-pulse-soft px-3.5 py-1 text-xs font-bold text-pulse uppercase font-code">
            ⚡ Ready to Experience All 8 Modules Live?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-pulse-ink">
            See How Uptrix Solves Admissions Operations for Your Specific Campuses
          </h3>
          <p className="text-base text-pulse-muted">
            Book a tailored 30-minute walkthrough. We will configure your exact courses, counseling team structure, and WhatsApp prospectus templates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/crm#demo"
              className={`${btnPrimary} shadow-md shadow-pulse/25 text-base font-bold`}
            >
              Book Tailored Campus Walkthrough →
            </Link>
            <Link
              href="/crm/pricing"
              className="rounded-xl border border-pulse-line bg-white px-6 py-3.5 text-base font-bold text-pulse-ink shadow-xs transition hover:border-pulse hover:bg-pulse-soft/30"
            >
              View Volume Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
