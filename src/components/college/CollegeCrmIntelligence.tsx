"use client";

import React, { useState } from "react";

// AI Robot Mascot SVG
function AiRobotMascot({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className}>
      {/* Radiant Spark Rays around head */}
      <line x1="28" y1="20" x2="16" y2="12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="12" x2="60" y2="2" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="92" y1="20" x2="104" y2="12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />

      {/* Antenna */}
      <line x1="60" y1="30" x2="60" y2="18" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="16" r="4.5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Robot Ears / Headset */}
      <rect x="22" y="38" width="6" height="14" rx="3" fill="#3b82f6" />
      <rect x="92" y="38" width="6" height="14" rx="3" fill="#3b82f6" />

      {/* Head Outer Pill */}
      <rect x="26" y="24" width="68" height="42" rx="20" fill="#f8fafc" stroke="#60a5fa" strokeWidth="2.5" />

      {/* Visor / Face Screen */}
      <rect x="33" y="31" width="54" height="28" rx="14" fill="#0f172a" />

      {/* Cyan Smiling Eyes */}
      <path d="M 43 45 Q 48 39 53 45" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 67 45 Q 72 39 77 45" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Smile */}
      <path d="M 56 50 Q 60 53 64 50" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Neck */}
      <rect x="54" y="66" width="12" height="6" rx="2" fill="#94a3b8" />

      {/* Body */}
      <path d="M 40 72 C 40 70, 80 70, 80 72 L 86 102 C 86 106, 34 106, 34 102 Z" fill="#f1f5f9" stroke="#60a5fa" strokeWidth="2.5" />

      {/* Chest Star */}
      <path
        d="M 60 81 L 61.5 86 L 66.5 87.5 L 61.5 89 L 60 94 L 58.5 89 L 53.5 87.5 L 58.5 86 Z"
        fill="#7c3aed"
      />

      {/* Arms */}
      <path d="M 36 78 C 28 85, 30 96, 38 98" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 84 78 C 92 85, 90 96, 82 98" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function CollegeCrmIntelligence() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "conversations" | "marketing" | "payments">("dashboard");

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-white overflow-hidden font-sans border-b border-slate-200/80">
      
      {/* Ambient background glows */}
      

      <div className="relative mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: HEADINGS, 6 METRIC CARDS, BOTTOM PILL BANNER
          ========================================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            {/* Eyebrow Pill: AI DASHBOARD */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#c4b5fd] shadow-2xs mb-4 w-fit">
              <span className="text-[11px] sm:text-xs font-extrabold text-[#6938ef] tracking-wider uppercase">
                AI DASHBOARD
              </span>
            </div>

            {/* Main Headline: Your Dashboard. Built Around Your Business. */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0b0f19] tracking-tight leading-[1.12] mb-3">
              Your Dashboard.<br />
              <span className="text-[#2563eb]">
                Built Around<br />
                Your Business.
              </span>
            </h2>

            {/* Subheading: Don't settle for a dashboard. Ask for intelligence. */}
            <div className="text-sm sm:text-base font-bold text-[#0f172a] mb-2.5 leading-snug">
              Don’t settle for a dashboard.<br />
              Ask for intelligence.
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5 font-normal max-w-[460px]">
              Every business tracks different numbers. Pulse uses AI to create dashboards
              around the metrics that matter to your business — marketing, sales, revenue,
              customer engagement or operations.
            </p>

            {/* Sub-label: Your management view could show: */}
            <span className="text-xs sm:text-[13px] font-bold text-[#6938ef] mb-3 block">
              Your management view could show:
            </span>

            {/* 6 Metric Cards Grid: 2 COLUMNS x 3 ROWS */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              
              {/* Card 1: Revenue this month */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    ₹12.4L
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Revenue this month
                  </div>
                </div>
              </div>

              {/* Card 2: Average Lead Cost */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    ₹480
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Average Lead Cost
                  </div>
                </div>
              </div>

              {/* Card 3: Lead Conversion */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffedd5] text-[#ea580c] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    18.60%
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Lead Conversion
                  </div>
                </div>
              </div>

              {/* Card 4: Cost per Acquisition */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 3.79 2 6s4.48 4 10 4 10-1.79 10-4-4.48-4-10-4zm0 6c-4.41 0-8-1.34-8-2s3.59-2 8-2 8 1.34 8 2-3.59 2-8 2zm0 3c-5.52 0-10-1.79-10-4v3c0 2.21 4.48 4 10 4s10-1.79 10-4V7c0 2.21-4.48 4-10 4zm0 5c-5.52 0-10-1.79-10-4v3c0 2.21 4.48 4 10 4s10-1.79 10-4v-3c0 2.21-4.48 4-10 4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    ₹2,850
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Cost per Acquisition
                  </div>
                </div>
              </div>

              {/* Card 5: Leads requiring action */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    94
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Leads requiring action
                  </div>
                </div>
              </div>

              {/* Card 6: Pending payments */}
              <div className="rounded-2xl bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#0f172a] leading-tight">
                    ₹4.2L
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Pending payments
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom-Left Blue-Purple Pill: Don&apos;t just look at your numbers. Know what they mean. */}
            <div className="rounded-2xl bg-[#2563eb] text-white p-3 sm:p-3.5 flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 4.24 4.24" />
                  <path d="m14.83 9.17 4.24-4.24" />
                  <path d="m14.83 14.83 4.24 4.24" />
                  <path d="m9.17 14.83-4.24 4.24" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div className="h-8 w-px bg-white/20 shrink-0" />
              <div>
                <div className="font-extrabold text-xs sm:text-[13px] text-white leading-tight">
                  Don't just look at your numbers.
                </div>
                <div className="text-xs sm:text-[13px] text-white/90 font-medium leading-tight mt-0.5">
                  Know what they mean.
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: FLOATING AI BADGE, COCKPIT FRAME, AND AI INSIGHTS CARD
          ========================================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-5 relative">
            
            {/* Top Floating AI Badge */}
            <div className="relative flex justify-end -mb-3 z-30">
              {/* Purple Glow */}
              
              
              <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-[0_10px_25px_rgba(105,56,239,0.15)] p-2.5 px-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] border border-purple-200 text-[#7c3aed] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2m-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-6 5v1h6v-1z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 leading-tight m-0">
                    AI Dashboard
                  </h4>
                  <span className="text-[9.5px] text-slate-400 font-medium block leading-tight mt-0.5">
                    Custom insights for your business
                  </span>
                </div>
                <span className="text-sm ml-1 text-purple-600">🪄</span>
              </div>
            </div>

            {/* Main Cockpit Frame (Tablet UI) */}
            <div className="rounded-[24px] bg-[#0f172a] shadow-[0_25px_60px_rgba(0,0,0,0.14)] border border-slate-200 overflow-hidden flex flex-row">
              
              {/* Dark Left Sidebar */}
              <div className="w-[145px] sm:w-[175px] bg-[#0f172a] p-3 sm:p-4 flex flex-col justify-between shrink-0 text-white border-r border-slate-800">
                <div className="flex flex-col gap-4">
                  {/* Logo */}
                  <div className="flex items-center gap-1.5 px-1 py-1">
                    <span className="text-white text-base">✦</span>
                    <span className="font-black text-sm tracking-wide text-white">Pulse</span>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-1 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveTab("dashboard")}
                      className={
                        activeTab === "dashboard"
                          ? "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all bg-[#6938ef] text-white shadow-xs"
                          : "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    >
                      <span>📊</span>
                      <span>Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("leads")}
                      className={
                        activeTab === "leads"
                          ? "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all bg-[#6938ef] text-white shadow-xs"
                          : "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    >
                      <span>👥</span>
                      <span>Leads</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("conversations")}
                      className={
                        activeTab === "conversations"
                          ? "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all bg-[#6938ef] text-white shadow-xs"
                          : "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    >
                      <span>💬</span>
                      <span>Conversations</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("marketing")}
                      className={
                        activeTab === "marketing"
                          ? "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all bg-[#6938ef] text-white shadow-xs"
                          : "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    >
                      <span>📢</span>
                      <span>Marketing</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("payments")}
                      className={
                        activeTab === "payments"
                          ? "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all bg-[#6938ef] text-white shadow-xs"
                          : "w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 transition-all text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }
                    >
                      <span>💳</span>
                      <span>Payments</span>
                    </button>

                    <div className="w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 text-slate-400 hover:text-white">
                      <span>📑</span>
                      <span>Reports</span>
                    </div>

                    <div className="w-full text-left px-2.5 py-1.5 rounded-xl flex items-center gap-2 text-slate-400 hover:text-white">
                      <span>⚙️</span>
                      <span>Settings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main White Content Area */}
              <div className="flex-1 bg-white p-3.5 sm:p-5 flex flex-col gap-3.5 overflow-hidden">
                
                {/* Header Welcome Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight m-0">
                      Welcome back!
                    </h3>
                    <p className="text-[9.5px] text-slate-400 leading-tight mt-0.5">
                      Here&apos;s what&apos;s happening with your business today.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] text-slate-600 font-semibold bg-white flex items-center gap-1 shrink-0">
                    <span>📅</span>
                    <span>This Month</span>
                    <span>⌵</span>
                  </div>
                </div>

                {/* 6 Metric Mini Cards (3 Columns x 2 Rows) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Metric 1 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-xs">📊</span>
                      <span className="text-[9px] font-bold text-emerald-600">↑ +14%</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">₹12.4L</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Revenue this month</div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-xs">⬇️</span>
                      <span className="text-[9px] font-bold text-emerald-600">↓ +12%</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">₹480</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Average Lead Cost</div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#ffedd5] text-[#ea580c] flex items-center justify-center text-xs">🎯</span>
                      <span className="text-[9px] font-bold text-emerald-600">↑ +2.4%</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">18.60%</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Lead Conversion</div>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-xs">🪙</span>
                      <span className="text-[9px] font-bold text-rose-500">🔻</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">₹2,850</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Cost per Acquisition</div>
                    </div>
                  </div>

                  {/* Metric 5 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-xs">👥</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">94</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Leads requiring action</div>
                    </div>
                  </div>

                  {/* Metric 6 */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-xs">💳</span>
                    </div>
                    <div className="mt-1">
                      <div className="font-black text-xs sm:text-sm text-slate-900 leading-tight">₹4.2L</div>
                      <div className="text-[8.5px] text-slate-400 font-medium truncate">Pending payments</div>
                    </div>
                  </div>
                </div>

                {/* Two Bottom Charts: Leads by Source & Revenue Trend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Left Chart: Leads by Source */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <h5 className="font-bold text-[11px] text-slate-800 m-0 leading-tight">
                      Leads by Source
                    </h5>
                    
                    {/* Vertical multi-color bar chart */}
                    <div className="flex items-end gap-1.5 h-16 pt-2 pb-1 justify-center">
                      <div className="w-3.5 h-[65%] rounded-t bg-[#3b82f6]" />
                      <div className="w-3.5 h-[90%] rounded-t bg-[#2563eb]" />
                      <div className="w-3.5 h-[75%] rounded-t bg-[#06b6d4]" />
                      <div className="w-3.5 h-[45%] rounded-t bg-[#10b981]" />
                      <div className="w-3.5 h-[55%] rounded-t bg-[#f59e0b]" />
                    </div>

                    {/* Chart Legend */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[8.5px] text-slate-500 pt-1 border-t border-slate-200/60">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />Meta Ads</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />Google Ads</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />Organic</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />Referrals</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />Other</span>
                    </div>
                  </div>

                  {/* Right Chart: Revenue Trend */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-[11px] text-slate-800 m-0 leading-tight">
                        Revenue Trend
                      </h5>
                      <span className="font-black text-xs text-slate-900 leading-tight">₹12.4L <span className="text-[8px] text-slate-400 font-normal">This month</span></span>
                    </div>

                    {/* Line Chart */}
                    <div className="h-16 pt-1 flex items-center justify-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 160 50">
                        <path
                          d="M 5 40 L 30 35 L 60 30 L 90 28 L 120 20 L 155 8"
                          fill="none"
                          stroke="#7c3aed"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="5" cy="40" r="2.5" fill="#7c3aed" />
                        <circle cx="30" cy="35" r="2.5" fill="#7c3aed" />
                        <circle cx="60" cy="30" r="2.5" fill="#7c3aed" />
                        <circle cx="90" cy="28" r="2.5" fill="#7c3aed" />
                        <circle cx="120" cy="20" r="2.5" fill="#7c3aed" />
                        <circle cx="155" cy="8" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[8px] text-slate-400 font-medium pt-1 border-t border-slate-200/60 px-1">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Right Box: And AI tells you what matters */}
            <div className="rounded-[22px] overflow-hidden border-2 border-[#7c3aed] bg-white shadow-xl flex flex-col">
              
              {/* Header Banner */}
              <div className="bg-[#6938ef] text-white px-4 py-2 flex items-center gap-1.5 shadow-xs">
                <span className="text-sm">✦</span>
                <h4 className="font-black text-xs sm:text-sm tracking-wide text-white m-0">
                  And AI tells you what matters:
                </h4>
              </div>

              {/* Body: 3 Insight Cards + Robot Mascot */}
              <div className="p-3.5 sm:p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* 3 Insight Cards */}
                <div className="flex-1 flex flex-col gap-2 w-full">
                  
                  {/* Insight 1: Google Ads */}
                  <div className="rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] p-2 sm:p-2.5 px-3 flex items-center gap-2.5 shadow-2xs hover:border-emerald-300 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-semibold text-slate-800 leading-tight">
                      “Google Ads is generating fewer leads than Meta, but converting 2.1X better.”
                    </span>
                  </div>

                  {/* Insight 2: High-value leads */}
                  <div className="rounded-xl bg-[#fff1f2] border border-[#fecdd3] p-2 sm:p-2.5 px-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-300 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-semibold text-slate-800 leading-tight">
                      “23 high-value leads haven&apos;t received a follow-up today.”
                    </span>
                  </div>

                  {/* Insight 3: Cost per acquisition */}
                  <div className="rounded-xl bg-[#fff7ed] border border-[#fed7aa] p-2 sm:p-2.5 px-3 flex items-center gap-2.5 shadow-2xs hover:border-orange-300 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-semibold text-slate-800 leading-tight">
                      “Your cost per acquisition increased 18% this week.”
                    </span>
                  </div>

                </div>

                {/* Right Robot Mascot */}
                <div className="shrink-0 flex items-center justify-center">
                  <AiRobotMascot className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md" />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
