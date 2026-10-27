"use client";

import React, { useState } from "react";

// Real Estate AI Robot / PropTech Mascot SVG
function PropTechRobotMascot({ className = "w-28 h-28" }: { className?: string }) {
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

      {/* Chest Real Estate Building Emblem */}
      <rect x="54" y="79" width="12" height="16" rx="1.5" fill="#7c3aed" />
      <line x1="57" y1="83" x2="57.01" y2="83" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
      <line x1="63" y1="83" x2="63.01" y2="83" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
      <line x1="57" y1="88" x2="57.01" y2="88" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
      <line x1="63" y1="88" x2="63.01" y2="88" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />

      {/* Arms */}
      <path d="M 36 78 C 28 85, 30 96, 38 98" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 84 78 C 92 85, 90 96, 82 98" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function RealEstateCrmIntelligence() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "inventory" | "conversations" | "payments">("dashboard");
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "buyer" | "ai"; text: string; time: string }>>([
    { sender: "buyer", text: "Hi, I saw your 3BHK ad on 99acres for Emerald Bay. What is the floor plan and pricing?", time: "10:14 AM" },
    { sender: "ai", text: "Hello Vikram! Here is the verified RERA floor plan for Emerald Bay Tower A (1,840 sq.ft carpet). Pricing starts at ₹2.45 Cr + stamp duty. Would you like to schedule an exclusive VIP site visit this Saturday?", time: "10:14 AM" },
    { sender: "buyer", text: "Yes, Saturday 11 AM works. Can you arrange a cab pickup from Worli?", time: "10:15 AM" },
    { sender: "ai", text: "Confirmed! Your driver Ramesh (Innova MH-02-EE-4102) will arrive at 10:15 AM. Here is your digital gate pass QR code: [QR-98214]", time: "10:16 AM" },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: "buyer", text: userMsg, time: "Just now" }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Our senior sales manager has received your inquiry and locked your unit hold for 30 minutes. We have sent the brochure on WhatsApp!",
          time: "Just now",
        },
      ]);
    }, 600);
  };

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-white overflow-hidden font-sans border-b border-slate-200/80">
      
      <div className="relative mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: HEADINGS, 6 METRIC CARDS, BOTTOM PILL BANNER (Same as College)
          ========================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Eyebrow Pill: SECTION 2 — AI DASHBOARD */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#c4b5fd] shadow-2xs mb-4 w-fit">
              <span className="text-[11px] sm:text-xs font-extrabold text-[#6938ef] tracking-wider uppercase">
                SECTION 2 — AI DASHBOARD
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
              Every real estate business tracks different numbers. Pulse uses AI to create dashboards
              around the metrics that matter to your project — lead velocity, site visits,
              inventory absorption, broker commissions or milestone payments.
            </p>

            {/* Sub-label: Your management view could show: */}
            <span className="text-xs sm:text-[13px] font-bold text-[#6938ef] mb-3 block">
              Your management view could show:
            </span>

            {/* 6 Metric Cards Grid: 2 COLUMNS x 3 ROWS (Identical to College) */}
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
                    ₹18.4 Cr
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Bookings this month
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
                    Site Visit Conversion
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
                    ₹18,500
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Cost per Booking
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
                    Visits requiring action
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
                    ₹4.2 Cr
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Pending milestone dues
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom-Left Blue-Purple Pill: Don't just look at your numbers. Know what they mean. */}
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
                  Don&apos;t just look at your numbers.
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
          <div className="lg:col-span-7 flex flex-col gap-5 relative">
            
            {/* Top Floating AI Badge */}
            <div className="relative flex justify-end -mb-3 z-30">
              <div className="relative rounded-2xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-[0_10px_25px_rgba(105,56,239,0.15)] p-2.5 px-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] border border-purple-200 text-[#7c3aed] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    PropTech AI Engine Active
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Pulse AI analyzes buyer intent, tracks portal CAC & recovers milestone cashflow.
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Cockpit Container */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
              
              {/* Cockpit Top Navigation Tabs */}
              <div className="bg-[#0b1329] px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "dashboard"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("leads")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "leads"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Leads & Portals
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("inventory")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "inventory"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    3D Inventory
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("conversations")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "conversations"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    WhatsApp Meta
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("payments")}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === "payments"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    Milestones
                  </button>
                </div>

                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                  ● LIVE PROPTECH
                </span>
              </div>

              {/* Cockpit Content Panels */}
              <div className="p-4 sm:p-6 bg-slate-50/50 min-h-[380px]">
                
                {/* TAB 1: DASHBOARD */}
                {activeTab === "dashboard" && (
                  <div className="space-y-4">
                    {/* 3 Overview Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Total Bookings</span>
                        <div className="text-xl font-black text-slate-900 mt-1">₹18.42 Cr</div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          ↑ 28.4% vs last month
                        </span>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Weekend Site Footfalls</span>
                        <div className="text-xl font-black text-blue-700 mt-1">142 Visits</div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          78% Show-up attendance
                        </span>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-500">Absorption Rate</span>
                        <div className="text-xl font-black text-purple-700 mt-1">84% Sold</div>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                          Tower A & B fast pace
                        </span>
                      </div>
                    </div>

                    {/* Funnel Pipeline Visual */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-800">Omnichannel Lead Pipeline</span>
                        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                          Sub-2.4s sync
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-center text-xs">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-500 block">Inquiries</span>
                          <span className="text-base font-black text-slate-900">1,280</span>
                        </div>
                        <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                          <span className="text-[10px] font-bold text-blue-700 block">Contacted</span>
                          <span className="text-base font-black text-blue-800">842</span>
                        </div>
                        <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                          <span className="text-[10px] font-bold text-indigo-700 block">Site Visit</span>
                          <span className="text-base font-black text-indigo-800">386</span>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                          <span className="text-[10px] font-bold text-amber-700 block">Negotiation</span>
                          <span className="text-base font-black text-amber-800">94</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                          <span className="text-[10px] font-bold text-emerald-700 block">Booked</span>
                          <span className="text-base font-black text-emerald-800">42</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: LEADS & PORTALS */}
                {activeTab === "leads" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-700">Real-Time Ingestion Feed</span>
                      <span className="text-[11px] text-slate-500">99acres • MagicBricks • Meta • Google</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { name: "Rahul Deshmukh", budget: "₹2.2 - 2.8 Cr", source: "99acres Webhook", time: "2m ago", status: "Auto-Assigned to Neha", tag: "High Intent 3BHK" },
                        { name: "Ananya Singhal", budget: "₹4.5 Cr Penthouse", source: "Meta Lead Ad", time: "8m ago", status: "Brochure Sent on WhatsApp", tag: "VIP Investor" },
                        { name: "Sameer Varma", budget: "₹1.8 Cr", source: "MagicBricks API", time: "18m ago", status: "Site Visit Confirmed Sat 11 AM", tag: "Verified Phone" },
                      ].map((lead, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{lead.name}</span>
                              <span className="text-[9px] font-mono bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-bold">{lead.tag}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Budget: {lead.budget} • <span className="text-blue-600 font-semibold">{lead.source}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                              {lead.status}
                            </span>
                            <div className="text-[9px] text-slate-400 font-mono mt-0.5">{lead.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: 3D INVENTORY */}
                {activeTab === "inventory" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200">
                      <span className="font-bold text-slate-800">Tower A — Stacking Matrix (Floors 12 to 14)</span>
                      <div className="flex items-center gap-3 text-[10px] font-bold">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Available</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> 30m Hold</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-300 inline-block" /> Sold</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {[
                        { unit: "1401", type: "3BHK Luxury", sqft: "1,840 sqft", status: "available", price: "₹2.65 Cr" },
                        { unit: "1402", type: "3BHK Sea-Facing", sqft: "1,890 sqft", status: "locked", price: "₹2.80 Cr" },
                        { unit: "1403", type: "2BHK Premium", sqft: "1,240 sqft", status: "sold", price: "₹1.85 Cr" },
                        { unit: "1404", type: "2BHK Garden", sqft: "1,210 sqft", status: "available", price: "₹1.78 Cr" },
                        { unit: "1301", type: "3BHK Luxury", sqft: "1,840 sqft", status: "sold", price: "₹2.62 Cr" },
                        { unit: "1302", type: "3BHK Sea-Facing", sqft: "1,890 sqft", status: "sold", price: "₹2.78 Cr" },
                        { unit: "1303", type: "2BHK Premium", sqft: "1,240 sqft", status: "available", price: "₹1.82 Cr" },
                        { unit: "1304", type: "2BHK Garden", sqft: "1,210 sqft", status: "locked", price: "₹1.75 Cr" },
                      ].map((u, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            u.status === "available"
                              ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                              : u.status === "locked"
                              ? "bg-amber-50/60 border-amber-300 text-amber-900 animate-pulse"
                              : "bg-slate-100 border-slate-200 text-slate-400"
                          }`}
                        >
                          <div className="font-mono font-black text-sm">{u.unit}</div>
                          <div className="text-[10px] font-semibold truncate">{u.type}</div>
                          <div className="text-[10px] font-mono mt-0.5">{u.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: WHATSAPP META */}
                {activeTab === "conversations" && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-3 flex flex-col h-[300px] justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-800">WhatsApp Official Business API (+91 98210 ...)</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Green Tick Verified</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 py-2 text-xs">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.sender === "buyer" ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl p-2.5 shadow-2xs leading-relaxed ${
                              msg.sender === "buyer"
                                ? "bg-slate-100 text-slate-800"
                                : "bg-[#dcfce7] text-slate-900 border border-emerald-200"
                            }`}
                          >
                            <p className="text-[11px]">{msg.text}</p>
                            <span className="text-[9px] text-slate-400 font-mono block text-right mt-0.5">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message or trigger automated WhatsApp brochure..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}

                {/* TAB 5: MILESTONES */}
                {activeTab === "payments" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-200">
                      <span className="font-bold text-slate-800">Architect-Certified Milestone Demands</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        Tally & Virtual Account Sync
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { milestone: "Slab 14 Completion — Tower A", total: "₹4.80 Cr", collected: "₹4.12 Cr", pending: "₹68 Lakh", status: "86% Cleared", date: "Due in 4 days" },
                        { milestone: "Plinth Stage — Tower C", total: "₹8.20 Cr", collected: "₹8.20 Cr", pending: "₹0", status: "100% Cleared", date: "Reconciled" },
                        { milestone: "Internal Plaster — Tower B", total: "₹3.50 Cr", collected: "₹2.10 Cr", pending: "₹1.40 Cr", status: "60% In-Progress", date: "WhatsApp Reminders Dispatched" },
                      ].map((m, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-slate-900">{m.milestone}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Total Demand: {m.total} • Collected: <span className="text-emerald-600 font-bold">{m.collected}</span> • Pending: <span className="text-rose-600 font-bold">{m.pending}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                              {m.status}
                            </span>
                            <div className="text-[9px] text-slate-400 font-mono mt-0.5">{m.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Bottom AI Robot Mascot & Insights Card (Identical to College) */}
            <div className="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs flex items-center gap-4">
              <PropTechRobotMascot className="w-16 h-16 shrink-0" />
              <div>
                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <span className="text-[#6938ef]">✦ PropTech AI Suggestion:</span> 14 buyers confirmed site visits for Saturday.
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  4 buyers haven&apos;t opened their location map pin. We can auto-dispatch WhatsApp cab coordination links now to maintain your 78% show-up SLA.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
