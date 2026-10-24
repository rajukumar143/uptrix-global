"use client";

import React, { useState } from "react";

// Google G logo icon
function GoogleGIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// 3D AI Robot Head Vector Illustration
function AiRobotAvatar({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative ${className} shrink-0 flex items-center justify-center`}>
      {/* Outer Floating Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6938ef] to-[#a855f7] opacity-30 blur-md animate-pulse" />
      
      {/* Robot Head Body */}
      <div className="relative w-full h-full rounded-[22px] bg-gradient-to-b from-white via-[#f3f0ff] to-[#e9d5ff] p-1.5 shadow-[0_8px_20px_rgba(105,56,239,0.25)] border-2 border-white flex flex-col items-center justify-center">
        {/* Antenna */}
        <div className="absolute -top-2 w-1.5 h-2 rounded-full bg-[#7c3aed]" />
        <div className="absolute -top-3 w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />

        {/* Ears */}
        <div className="absolute -left-1.5 w-2 h-4 rounded-full bg-[#7c3aed] shadow-xs" />
        <div className="absolute -right-1.5 w-2 h-4 rounded-full bg-[#7c3aed] shadow-xs" />

        {/* Screen / Visor */}
        <div className="w-[84%] h-[72%] rounded-[14px] bg-[#110d29] p-1 flex items-center justify-center gap-2 shadow-inner border border-[#3b0764]/40">
          {/* Left Eye */}
          <div className="w-2.5 h-3 rounded-full bg-gradient-to-b from-[#60a5fa] to-[#9333ea] shadow-[0_0_8px_#60a5fa]" />
          {/* Right Eye */}
          <div className="w-2.5 h-3 rounded-full bg-gradient-to-b from-[#60a5fa] to-[#9333ea] shadow-[0_0_8px_#60a5fa]" />
        </div>
      </div>
    </div>
  );
}

export default function CollegeCrmIntelligence() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f9faff] via-[#f4f3ff] to-[#eef2ff] border-b border-slate-200/80 overflow-hidden font-sans">
      
      {/* Soft Ambient Radial Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,#ede9fe_0%,transparent_70%)] opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-12 right-1/4 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,#dbeafe_0%,transparent_70%)] opacity-60 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        
        {/* =========================================================================
            TOP ROW: Left Copy & 6 Metric Cards + Right 3D Cockpit Tablet
        ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* -----------------------------------------------------------------------
              LEFT COLUMN: Header Copy + 6 Metric Cards
          ------------------------------------------------------------------------ */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] text-xs font-bold tracking-wider uppercase mb-5 w-fit shadow-2xs">
              <span className="text-sm leading-none">✳</span>
              <span>AI POWERED COLLEGE CRM</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 leading-[1.12] tracking-tight mb-4">
              Your College CRM.<br />
              Built Around Your{" "}
              <span className="text-[#6938ef] font-black">Business.</span>
            </h2>

            {/* Subheading with Purple Wavy Highlight */}
            <p className="text-base sm:text-lg font-bold text-slate-800 mb-3">
              Don’t settle for a dashboard. Ask for{" "}
              <span className="relative inline-block text-[#6938ef] font-extrabold">
                intelligence.
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#a855f7]"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M0,6 Q25,0 50,6 T100,6" />
                </svg>
              </span>
            </p>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[480px] mb-8 font-normal">
              Every college tracks different numbers. Pulse uses AI to create dashboards
              around the metrics that matter to your institution — admissions, marketing,
              student engagement or operations.
            </p>

            {/* 6 Metric Cards Grid (2 Columns x 3 Rows) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              
              {/* Card 1: Revenue this month */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#e8f8f0] text-[#107e43] font-black text-sm flex items-center justify-center">
                    ₹
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-[#10b981]">
                    <span>↗</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    ₹12.4L
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Revenue this month
                  </div>
                </div>
                {/* Mini Green Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[35%] rounded-t bg-[#bbf7d0]" />
                  <div className="w-1.5 h-[60%] rounded-t bg-[#86efac]" />
                  <div className="w-1.5 h-[45%] rounded-t bg-[#86efac]" />
                  <div className="w-1.5 h-[80%] rounded-t bg-[#4ade80]" />
                  <div className="w-1.5 h-[100%] rounded-t bg-[#22c55e]" />
                </div>
              </div>

              {/* Card 2: Average Lead Cost */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#f3e8ff] text-[#8b5cf6] flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                    <span>⌵</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    ₹480
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Average Lead Cost
                  </div>
                </div>
                {/* Mini Purple Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[90%] rounded-t bg-[#c084fc]" />
                  <div className="w-1.5 h-[70%] rounded-t bg-[#d8b4fe]" />
                  <div className="w-1.5 h-[85%] rounded-t bg-[#c084fc]" />
                  <div className="w-1.5 h-[50%] rounded-t bg-[#e9d5ff]" />
                  <div className="w-1.5 h-[40%] rounded-t bg-[#a855f7]" />
                </div>
              </div>

              {/* Card 3: Lead Conversion */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-[#10b981]">
                    <span>↗</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    18.60%
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Lead Conversion
                  </div>
                </div>
                {/* Mini Blue Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[40%] rounded-t bg-[#bae6fd]" />
                  <div className="w-1.5 h-[55%] rounded-t bg-[#7dd3fc]" />
                  <div className="w-1.5 h-[70%] rounded-t bg-[#38bdf8]" />
                  <div className="w-1.5 h-[65%] rounded-t bg-[#38bdf8]" />
                  <div className="w-1.5 h-[95%] rounded-t bg-[#0284c7]" />
                </div>
              </div>

              {/* Card 4: Cost per Acquisition */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center">
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-[#ea580c]">
                    <span>↗</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    ₹2,850
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Cost per Acquisition
                  </div>
                </div>
                {/* Mini Orange Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[30%] rounded-t bg-[#fed7aa]" />
                  <div className="w-1.5 h-[50%] rounded-t bg-[#fdba74]" />
                  <div className="w-1.5 h-[75%] rounded-t bg-[#fb923c]" />
                  <div className="w-1.5 h-[60%] rounded-t bg-[#fb923c]" />
                  <div className="w-1.5 h-[90%] rounded-t bg-[#ea580c]" />
                </div>
              </div>

              {/* Card 5: Leads requiring action */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#fce7f3] text-[#db2777] flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-400">
                    <span>→</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    94
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Leads requiring action
                  </div>
                </div>
                {/* Mini Pink Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[40%] rounded-t bg-[#fbcfe8]" />
                  <div className="w-1.5 h-[65%] rounded-t bg-[#f472b6]" />
                  <div className="w-1.5 h-[80%] rounded-t bg-[#f472b6]" />
                  <div className="w-1.5 h-[95%] rounded-t bg-[#db2777]" />
                  <div className="w-1.5 h-[60%] rounded-t bg-[#be185d]" />
                </div>
              </div>

              {/* Card 6: Pending payments */}
              <div className="rounded-[18px] bg-white p-3 sm:p-3.5 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center">
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-400">
                    <span>→</span>
                  </div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    ₹4.2L
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Pending payments
                  </div>
                </div>
                {/* Mini Teal Bar Chart */}
                <div className="flex items-end gap-1 mt-2.5 h-6">
                  <div className="w-1.5 h-[35%] rounded-t bg-[#99f6e4]" />
                  <div className="w-1.5 h-[55%] rounded-t bg-[#5eead4]" />
                  <div className="w-1.5 h-[75%] rounded-t bg-[#2dd4bf]" />
                  <div className="w-1.5 h-[90%] rounded-t bg-[#0d9488]" />
                  <div className="w-1.5 h-[65%] rounded-t bg-[#0f766e]" />
                </div>
              </div>

            </div>

          </div>

          {/* -----------------------------------------------------------------------
              RIGHT COLUMN: Handwritten Note + 3D Cockpit Tablet Screen
          ------------------------------------------------------------------------ */}
          <div className="lg:col-span-7 relative flex flex-col">
            
            {/* Handwritten Annotation Callout with Curved Arrow */}
            <div className="relative self-start sm:self-center mb-2 sm:-mb-3 z-20 flex items-center gap-2 pl-6 sm:pl-0">
              <span className="font-handwriting font-semibold text-sm sm:text-base text-slate-700 italic tracking-wide">
                Get a complete view of your college, in one place.
              </span>
              {/* Curved Purple Arrow SVG */}
              <svg className="w-10 h-6 text-[#7c3aed] transform rotate-12" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 14 C 15 2, 28 4, 34 16" />
                <path d="M28 16 L 34 16 L 34 10" />
              </svg>
            </div>

            {/* 3D Cockpit Tablet Device Frame */}
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#111827] p-2.5 sm:p-4 shadow-[0_30px_70px_-15px_rgba(30,27,75,0.28)] border-4 sm:border-8 border-[#1f2937] transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Tablet Screen Surface */}
              <div className="rounded-[18px] sm:rounded-[24px] bg-[#f8fafc] overflow-hidden flex flex-col border border-slate-200/60 text-slate-800">
                
                {/* Cockpit Inner Grid: Mini Sidebar + Main Workspace */}
                <div className="grid grid-cols-12 min-h-[460px]">
                  
                  {/* --- Sidebar (Navy #111827 / #1e293b) --- */}
                  <div className="col-span-3 bg-[#111827] text-slate-300 p-2.5 sm:p-3 flex flex-col justify-between text-[11px]">
                    <div className="space-y-3">
                      {/* Brand Logo */}
                      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
                        <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-[10px]">
                          🎓
                        </div>
                        <span className="font-bold text-white tracking-wide text-xs">
                          College CRM
                        </span>
                      </div>

                      {/* Nav Links */}
                      <nav className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => setActiveTab("dashboard")}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                            activeTab === "dashboard"
                              ? "bg-[#4f46e5] text-white shadow-xs"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                          <span>Dashboard</span>
                        </button>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                          </svg>
                          <span>Leads</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                          </svg>
                          <span>Admissions</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <span>Students</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                          <span>Fees & Payments</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="m3 11 18-5v12L3 14v-3z" />
                          </svg>
                          <span>Marketing</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="m9 11 3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                          <span>Tasks</span>
                        </div>

                        <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-white cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 3v18h18" />
                            <path d="m19 9-5 5-4-4-3 3" />
                          </svg>
                          <span>Reports</span>
                        </div>
                      </nav>
                    </div>

                    {/* Settings at bottom */}
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2 px-2 text-slate-400 hover:text-white cursor-pointer">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* --- Main Workspace (Right 9 Cols) --- */}
                  <div className="col-span-9 p-3 sm:p-4 flex flex-col gap-3 bg-[#f8fafc]">
                    
                    {/* Top Search & Admin Profile Bar */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                      {/* Search Input */}
                      <div className="relative flex-1 max-w-[280px]">
                        <svg className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                          type="text"
                          readOnly
                          placeholder="Search students, leads, applications..."
                          className="w-full pl-8 pr-2 py-1 text-[10px] rounded-lg bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-hidden"
                        />
                      </div>

                      {/* Right Profile Controls */}
                      <div className="flex items-center gap-2">
                        {/* Notification Bell */}
                        <div className="relative cursor-pointer text-slate-500 hover:text-slate-800">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                          </svg>
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500" />
                        </div>

                        {/* Admin Badge */}
                        <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200">
                          <div className="w-6 h-6 rounded-full bg-indigo-900 text-white font-bold text-[10px] flex items-center justify-center">
                            A
                          </div>
                          <div className="hidden sm:block text-left text-[9px] leading-tight">
                            <span className="font-bold text-slate-800 block">Admin</span>
                            <span className="text-slate-400 block">Admissions Team</span>
                          </div>
                        </div>

                        {/* Date Filter Pill */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-700 shadow-2xs">
                          <span>📅 This Month ▾</span>
                        </div>
                      </div>
                    </div>

                    {/* Welcome Header */}
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Welcome Back!</h4>
                      <p className="text-[10px] text-slate-500">
                        Here&apos;s what&apos;s happening with your college today.
                      </p>
                    </div>

                    {/* Top 3 Stat Cards in Cockpit */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-600">₹</span>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">+22%</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1">₹12.4L</div>
                        <div className="text-[8.5px] text-slate-400">Revenue this month</div>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-600">👤</span>
                          <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1 rounded">-8%</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1">₹480</div>
                        <div className="text-[8.5px] text-slate-400">Average Lead Cost</div>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-sky-600">📊</span>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">+18%</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 mt-1">18.60%</div>
                        <div className="text-[8.5px] text-slate-400">Lead Conversion</div>
                      </div>
                    </div>

                    {/* Middle Row: Leads by Source (Multi-Line Chart) & Applications Donut */}
                    <div className="grid grid-cols-12 gap-2">
                      
                      {/* Left: Leads by Source Line Chart (7 Cols) */}
                      <div className="col-span-7 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-bold text-slate-800">Leads by Source</span>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-2 text-[8px] text-slate-500 mb-2">
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Google Ads</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Meta Ads</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Website</span>
                          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Referrals</span>
                        </div>

                        {/* Line Chart Graphic */}
                        <div className="relative h-20 w-full">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                            {/* Horizontal Grid lines */}
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="60" x2="200" y2="60" stroke="#f1f5f9" strokeWidth="1" />

                            {/* Blue Line (Google Ads) */}
                            <path
                              d="M 10,65 Q 40,55 70,40 T 130,22 T 190,30"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2.5"
                            />
                            {/* Highlighted Peak Dot with 320 callout */}
                            <circle cx="130" cy="22" r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />

                            {/* Green Line (Website) */}
                            <path
                              d="M 10,72 Q 50,60 90,68 T 150,52 T 190,48"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                            />

                            {/* Purple Line (Meta Ads) */}
                            <path
                              d="M 10,50 Q 50,45 90,52 T 150,38 T 190,20"
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="2"
                            />
                          </svg>

                          {/* 320 Pill Badge */}
                          <div className="absolute top-1 left-[60%] -translate-x-1/2 bg-[#3b82f6] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                            320
                          </div>
                        </div>

                        {/* Months X-axis */}
                        <div className="flex justify-between text-[8px] text-slate-400 mt-1 pt-1 border-t border-slate-100">
                          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        </div>
                      </div>

                      {/* Right: Applications by Status Donut (5 Cols) */}
                      <div className="col-span-5 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                        <span className="font-bold text-slate-800 text-[10px] mb-1">
                          Applications by Status
                        </span>

                        <div className="flex items-center gap-2 my-auto">
                          {/* Donut Circle SVG */}
                          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="30 70" strokeDashoffset="0" />
                              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#ec4899" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-30" />
                              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-55" />
                              <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-75" />
                            </svg>
                            <div className="absolute text-center leading-none">
                              <span className="text-[11px] font-black text-slate-900 block">286</span>
                              <span className="text-[7px] text-slate-400 block font-medium">Total</span>
                            </div>
                          </div>

                          {/* Legend List */}
                          <div className="space-y-0.5 text-[8px] text-slate-600">
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />New</span>
                              <span className="font-bold text-slate-900">76</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Contacted</span>
                              <span className="font-bold text-slate-900">68</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Qualified</span>
                              <span className="font-bold text-slate-900">52</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Admitted</span>
                              <span className="font-bold text-slate-900">64</span>
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500" />Enrolled</span>
                              <span className="font-bold text-slate-900">26</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Row: Recent Leads Table & AI Insights Widget */}
                    <div className="grid grid-cols-12 gap-2">
                      
                      {/* Left: Recent Leads Table (7 Cols) */}
                      <div className="col-span-7 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="font-bold text-slate-800 text-[10px] block mb-1.5">
                          Recent Leads
                        </span>

                        <table className="w-full text-left text-[8px]">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-100">
                              <th className="pb-1 font-semibold">Name</th>
                              <th className="pb-1 font-semibold">Source</th>
                              <th className="pb-1 font-semibold">Course</th>
                              <th className="pb-1 font-semibold">Status</th>
                              <th className="pb-1 font-semibold">Follow-up</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            <tr>
                              <td className="py-1 font-bold text-slate-800">Rahul Mehta</td>
                              <td className="py-1 text-slate-500">Google Ads</td>
                              <td className="py-1 text-slate-500">B.Tech</td>
                              <td className="py-1"><span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[7.5px]">New</span></td>
                              <td className="py-1 text-slate-500 font-medium">Today</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-bold text-slate-800">Sneha Reddy</td>
                              <td className="py-1 text-slate-500">Website</td>
                              <td className="py-1 text-slate-500">MBA</td>
                              <td className="py-1"><span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[7.5px]">Contacted</span></td>
                              <td className="py-1 text-slate-500 font-medium">Today</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-bold text-slate-800">Arjun Kumar</td>
                              <td className="py-1 text-slate-500">Meta Ads</td>
                              <td className="py-1 text-slate-500">B.Sc</td>
                              <td className="py-1"><span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[7.5px]">Hot Lead</span></td>
                              <td className="py-1 text-slate-500 font-medium">Today</td>
                            </tr>
                            <tr>
                              <td className="py-1 font-bold text-slate-800">Priya Sharma</td>
                              <td className="py-1 text-slate-500">Referral</td>
                              <td className="py-1 text-slate-500">BBA</td>
                              <td className="py-1"><span className="px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[7.5px]">In Process</span></td>
                              <td className="py-1 text-slate-500 font-medium">Tomorrow</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Right: AI Insights Widget (5 Cols) */}
                      <div className="col-span-5 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[9px] mb-1.5">
                          <span className="flex items-center gap-1 font-bold text-purple-700">
                            <span>✦</span> AI Insights
                          </span>
                          <span className="text-[8px] text-indigo-600 font-semibold cursor-pointer">View All →</span>
                        </div>

                        <div className="space-y-1.5">
                          {/* Insight 1 */}
                          <div className="flex items-center justify-between gap-1 p-1 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-1.5">
                              <GoogleGIcon className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-[8px] text-slate-700 leading-tight">
                                Google Ads converting <strong>2.1X better</strong>.
                              </span>
                            </div>
                            <span className="text-slate-400 text-[8px]">›</span>
                          </div>

                          {/* Insight 2 */}
                          <div className="flex items-center justify-between gap-1 p-1 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px]">👥</span>
                              <span className="text-[8px] text-slate-700 leading-tight">
                                <strong>23 high-value leads</strong> need follow-up.
                              </span>
                            </div>
                            <span className="text-slate-400 text-[8px]">›</span>
                          </div>

                          {/* Insight 3 */}
                          <div className="flex items-center justify-between gap-1 p-1 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px]">📊</span>
                              <span className="text-[8px] text-slate-700 leading-tight">
                                Acquisition cost increased <strong>18%</strong>.
                              </span>
                            </div>
                            <span className="text-slate-400 text-[8px]">›</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM ROW: 3D AI Robot + Speech Bubble + 3 Insight Cards
        ========================================================================== */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-5 justify-center">
          
          {/* Left: 3D Robot Head + Speech Bubble */}
          <div className="flex items-center gap-3 shrink-0">
            <AiRobotAvatar className="w-14 h-14" />
            
            {/* Speech Bubble Tag */}
            <div className="relative px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#6938ef] to-[#8b5cf6] text-white font-bold text-xs shadow-md">
              <span>And AI tells you what matters:</span>
              {/* Little speech tail pointing left */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#6938ef] rotate-45" />
            </div>
          </div>

          {/* 3 Insight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto flex-1 max-w-[850px]">
            
            {/* Insight Card 1 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 shadow-2xs border border-slate-100">
                <GoogleGIcon className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-700 leading-tight font-medium">
                &ldquo;Google Ads is generating fewer leads than Meta, but converting <strong>2.1X better</strong>.&rdquo;
              </p>
            </div>

            {/* Insight Card 2 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <p className="text-xs text-slate-700 leading-tight font-medium">
                &ldquo;<strong>23 high-value leads</strong> haven&apos;t received a follow-up today.&rdquo;
              </p>
            </div>

            {/* Insight Card 3 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-xl bg-[#fee2e2] text-[#ef4444] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                </svg>
              </div>
              <p className="text-xs text-slate-700 leading-tight font-medium">
                &ldquo;Your cost per acquisition increased <strong>18% this week</strong>.&rdquo;
              </p>
            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM PUNCHLINE: "Don't just look at your numbers. Know what they mean."
        ========================================================================== */}
        <div className="text-center pt-2">
          <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight inline-flex flex-wrap items-center justify-center gap-1.5">
            <span>Don&apos;t just look at your numbers.</span>{" "}
            <span className="relative inline-block text-[#6938ef] font-extrabold">
              Know what they mean.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#7c3aed]"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              >
                <path d="M2,7 C60,2 140,11 198,6" />
              </svg>
            </span>
            <span className="text-[#a855f7] text-sm ml-1 select-none font-sans">✦</span>
          </p>
        </div>

      </div>
    </section>
  );
}
