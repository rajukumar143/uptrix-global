"use client";

import React, { useState } from "react";

// WhatsApp Logo SVG
function WhatsAppLogo({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Meta Infinity Logo
function MetaInfinityLogo({ className = "w-6 h-6 text-[#0081fb]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.962 4.332c-1.895 0-3.612.87-4.962 2.308-1.35-1.438-3.067-2.308-4.962-2.308C3.12 4.332 0 7.452 0 11.294c0 3.842 3.12 6.962 7.038 6.962 2.368 0 4.414-1.162 5.688-2.946 1.274 1.784 3.32 2.946 5.688 2.946 3.918 0 7.038-3.12 7.038-6.962 0-3.842-3.12-6.962-7.038-6.962zm-9.924 11.75c-2.684 0-4.864-2.18-4.864-4.864s2.18-4.864 4.864-4.864c1.88 0 3.518 1.074 4.34 2.666-.822 1.592-2.46 2.666-4.34 2.666zm9.924 0c-1.88 0-3.518-1.074-4.34-2.666.822-1.592 2.46-2.666 4.34-2.666 2.684 0 4.864 2.18 4.864 4.864s-2.18 4.864-4.864 4.864z" />
    </svg>
  );
}

interface FeatureTabItem {
  id: string;
  name: [string, string];
  icon: string;
  iconBg: string;
  iconColor: string;
}

const tabItems: FeatureTabItem[] = [
  {
    id: "meta-api",
    name: ["Meta Conversation", "API"],
    icon: "whatsapp",
    iconBg: "bg-[#25d366]",
    iconColor: "text-white"
  },
  {
    id: "smart-lead",
    name: ["Smart Lead", "Assignment"],
    icon: "users",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]"
  },
  {
    id: "lead-cost",
    name: ["Lead Cost", "Calculator"],
    icon: "calc",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#8b5cf6]"
  },
  {
    id: "conversion",
    name: ["Conversion", "Analytics"],
    icon: "chart",
    iconBg: "bg-[#ffe4e6]",
    iconColor: "text-[#e11d48]"
  },
  {
    id: "payment",
    name: ["Payment", "Analytics"],
    icon: "rupee",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#107e43]"
  },
  {
    id: "ai-action",
    name: ["AI Action", "Center"],
    icon: "sparkle",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#7c3aed]"
  }
];

export default function CollegeCrmFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8faff] via-[#f3f4fd] to-white border-b border-slate-200/80 overflow-hidden font-sans">
      
      {/* Background radial ambient highlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_0%_0%,#e9f3ff_0,transparent_45%)] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_100%_10%,#f0eaff_0,transparent_45%)] opacity-80"
      />

      <div className="relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
        
        {/* =========================================================================
            HEADER: Section 3 Eyebrow + Headline + Subtitle
        ========================================================================== */}
        <header className="text-center">
          {/* Eyebrow with flanking divider lines */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="w-9 h-[1.5px] bg-[#d8b4fe]" />
            <span className="px-3.5 py-1 rounded-full bg-[#ede9fe] text-[#7c3aed] text-xs font-bold tracking-wide shadow-2xs">
              Section 3
            </span>
            <div className="w-9 h-[1.5px] bg-[#d8b4fe]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#111827] tracking-tight leading-tight m-0">
            <span className="text-[#6938ef]">Key Features</span> of Your CRM Tool
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm lg:text-[15px] font-medium leading-relaxed mt-2 max-w-[620px] mx-auto">
            Everything you need to capture, manage, convert and grow — all in one place.
          </p>
        </header>

        {/* =========================================================================
            TABS ROW: 6 Interactive Horizontal Tabs (Active has downward pointer tail)
        ========================================================================== */}
        <div
          role="tablist"
          aria-label="Key CRM Features"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3"
        >
          {tabItems.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`crm-feature-tab-${idx}`}
                aria-selected={isActive}
                onClick={() => setActiveTab(idx)}
                className={`relative rounded-2xl p-2.5 sm:py-3.5 sm:px-3 min-h-[72px] sm:min-h-[80px] flex items-center gap-2.5 text-left cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-[#5b21b6] text-white border-transparent shadow-[0_10px_25px_rgba(91,33,182,0.28)] -translate-y-0.5"
                    : "bg-white text-slate-800 border-slate-100 hover:border-[#d8b4fe] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Active Indicator Tail Triangle (Points directly to panel below) */}
                {isActive && (
                  <div
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-[#5b21b6]"
                  />
                )}

                {/* Tab Icon Circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm shadow-2xs ${
                    isActive ? "bg-white/20 text-white" : `${tab.iconBg} ${tab.iconColor}`
                  }`}
                >
                  {tab.icon === "whatsapp" && <WhatsAppLogo className="w-5 h-5 text-white" />}
                  {tab.icon === "users" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  )}
                  {tab.icon === "calc" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm-1 16H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1zM7 6h10v3H7zm1 5h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2z" />
                    </svg>
                  )}
                  {tab.icon === "chart" && (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                    </svg>
                  )}
                  {tab.icon === "rupee" && <span className="text-base font-black">₹</span>}
                  {tab.icon === "sparkle" && <span className="text-base">✦</span>}
                </div>

                {/* 2-Line Tab Title */}
                <div className="leading-tight">
                  <span className="block text-[11px] sm:text-xs font-bold leading-tight">
                    {tab.name[0]}
                  </span>
                  <span className="block text-[11px] sm:text-xs font-bold leading-tight">
                    {tab.name[1]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            WHITE SHOWCASE CARD (Matching Reference Image 1:1)
        ========================================================================== */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-slate-200/90 p-5 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col gap-8 sm:gap-10">
          
          {/* Main 3-Column Display: Left Copy + Middle Visual Mockups + Right Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* ---------------------------------------------------------------------
                COLUMN 1: Left Copy (Title, Descriptions, Meta & WhatsApp Integration)
            ---------------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-[#6938ef] font-bold text-xs tracking-wider uppercase block mb-2.5">
                  META CONVERSATION API
                </span>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-4">
                  Turn Meta Conversations<br />
                  <span className="text-[#6938ef]">Into Revenue</span>
                </h3>

                <div className="space-y-3 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                  <p>
                    Your <strong className="text-slate-900 font-bold">customers</strong> are already talking to you on <strong className="text-slate-900 font-bold">WhatsApp</strong>.
                    Pulse brings those conversations directly into your CRM through the <strong className="text-slate-900 font-bold">Meta Conversation API</strong>.
                  </p>
                  <p>
                    No switching between WhatsApp and CRM.
                  </p>
                  <p>
                    Every conversation can be connected to the right customer record, giving your team the context they need to respond, follow up and convert.
                  </p>
                  <p>
                    And because conversations become part of the CRM data, you can finally measure what your conversations are actually generating.
                  </p>
                </div>
              </div>

              {/* Bottom Integration Box */}
              <div className="mt-6 p-4 rounded-2xl bg-[#f8faff] border border-slate-200/80 text-center flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MetaInfinityLogo className="w-6 h-6 text-[#0081fb]" />
                  <span className="text-base font-bold text-slate-900">Meta</span>
                  <span className="text-slate-400 text-sm">🔗</span>
                  <div className="w-6 h-6 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-2xs">
                    <WhatsAppLogo className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <small className="text-slate-500 text-xs font-medium">
                  Direct integration with Meta Conversation API
                </small>
              </div>
            </div>

            {/* ---------------------------------------------------------------------
                COLUMN 2: Middle Visual Showcase (Overlapping Phone + Tablet + Floating Stat)
            ---------------------------------------------------------------------- */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4">
              
              {/* Dotted Purple Curved Arrow pointing from Phone to CRM Tablet */}
              <div className="absolute top-0 right-1/4 z-30 hidden sm:block pointer-events-none">
                <svg className="w-24 h-10 text-[#7c3aed]" viewBox="0 0 100 40" fill="none">
                  <path
                    d="M 10 32 C 35 5, 75 5, 92 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path d="M 86 24 L 92 24 L 92 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Container for Overlapping Screens */}
              <div className="relative w-full max-w-[430px] flex items-center justify-center">
                
                {/* 1. SMARTPHONE (WhatsApp UI, Foreground Left) */}
                <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[26px] bg-white border-2 border-slate-200 shadow-[0_20px_45px_rgba(0,0,0,0.12)] p-2 -mr-10 sm:-mr-12 shrink-0">
                  
                  {/* Floating WhatsApp Green Icon Badge */}
                  <div className="absolute -top-3.5 left-4 w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-md">
                    <WhatsAppLogo className="w-4.5 h-4.5 text-white" />
                  </div>

                  {/* Phone Screen Content */}
                  <div className="rounded-[20px] bg-white overflow-hidden text-slate-800 text-[10px]">
                    {/* Phone Status / WhatsApp Header */}
                    <div className="bg-white px-2.5 pt-3 pb-1.5 flex items-center justify-between border-b border-slate-100">
                      <span className="font-extrabold text-[#128c7e] text-xs">WhatsApp</span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <span>📷</span>
                        <span>🔍</span>
                        <span>⋮</span>
                      </div>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-50/80 text-[8px] font-bold border-b border-slate-100">
                      <span className="px-1.5 py-0.5 rounded-full bg-[#128c7e] text-white">All 12</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">Unread 8</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">Groups 2</span>
                    </div>

                    {/* WhatsApp Chat Contacts List */}
                    <div className="divide-y divide-slate-100">
                      {/* Contact 1 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          PS
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Priya Sharma</span>
                            <span className="text-[7.5px] text-emerald-600 font-semibold">10:24 AM</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">Hi, I&apos;m interested in Data Science...</p>
                        </div>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">
                          1
                        </span>
                      </div>

                      {/* Contact 2 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-sky-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          RM
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Rahul Mehta</span>
                            <span className="text-[7.5px] text-emerald-600 font-semibold">10:15 AM</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">Can you share fee details?</p>
                        </div>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">
                          2
                        </span>
                      </div>

                      {/* Contact 3 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          SR
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Sneha Reddy</span>
                            <span className="text-[7.5px] text-slate-400">09:45 AM</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">Do you have weekend batches?</p>
                        </div>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">
                          1
                        </span>
                      </div>

                      {/* Contact 4 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          AK
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Arjun Kumar</span>
                            <span className="text-[7.5px] text-slate-400">09:20 AM</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">Is there any discount available?</p>
                        </div>
                      </div>

                      {/* Contact 5 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          NV
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Neha Verma</span>
                            <span className="text-[7.5px] text-slate-400">Yesterday</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">I want to enroll for next batch</p>
                        </div>
                      </div>

                      {/* Contact 6 */}
                      <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-500 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                          KS
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-900 truncate text-[9px]">Karan Singh</span>
                            <span className="text-[7.5px] text-slate-400">Yesterday</span>
                          </div>
                          <p className="text-[7.5px] text-slate-500 truncate">Can we schedule a demo class?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. TABLET (College CRM Chat Window, Slanted Right) */}
                <div className="relative z-10 w-[240px] sm:w-[260px] rounded-[22px] bg-white border border-slate-200 shadow-[0_15px_40px_rgba(30,27,75,0.14)] p-2.5 flex flex-col justify-between">
                  {/* Tablet Top Brand Bar */}
                  <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                    <span className="text-xs">🎓</span>
                    <span className="font-extrabold text-[#111827] text-[11px] tracking-wide">
                      College CRM
                    </span>
                  </div>

                  {/* Student Lead Profile Card */}
                  <div className="flex items-center gap-2 py-2 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      PS
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-[11px]">Priya Sharma</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[7.5px]">
                          New Lead
                        </span>
                      </div>
                      <span className="text-[8px] text-slate-400 block leading-tight">
                        From WhatsApp • Today, 10:24 AM
                      </span>
                    </div>
                  </div>

                  {/* Chat Sub-tabs */}
                  <div className="flex items-center gap-2 py-1 text-[8.5px] font-bold border-b border-slate-100 text-slate-500">
                    <span className="text-[#6938ef] border-b-2 border-[#6938ef] pb-0.5">Conversation</span>
                    <span>Details</span>
                    <span>Activities</span>
                    <span>Notes</span>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-1.5 py-2 min-h-[120px]">
                    {/* Incoming 1 */}
                    <div className="max-w-[85%] rounded-lg rounded-tl-xs bg-slate-100 p-1.5 text-[8.5px] text-slate-800">
                      Hi, I&apos;m interested in Data Science course
                      <span className="text-[6.5px] text-slate-400 block text-right mt-0.5">10:24 AM</span>
                    </div>

                    {/* Outgoing 2 */}
                    <div className="ml-auto max-w-[88%] rounded-lg rounded-tr-xs bg-[#e8f8f0] border border-[#a7f3d0] p-1.5 text-[8.5px] text-slate-800">
                      Hi Priya! Thanks for reaching out. I can share all the details.
                      <span className="text-[6.5px] text-emerald-600 font-bold block text-right mt-0.5">10:25 AM ✓✓</span>
                    </div>

                    {/* Incoming 3 */}
                    <div className="max-w-[85%] rounded-lg rounded-tl-xs bg-slate-100 p-1.5 text-[8.5px] text-slate-800">
                      Can you share the fee structure and next batch date?
                      <span className="text-[6.5px] text-slate-400 block text-right mt-0.5">10:26 AM</span>
                    </div>
                  </div>

                  {/* Chat Input Bar */}
                  <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-[8px] text-slate-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-400 cursor-pointer">📎</span>
                    <span className="text-[10px] text-slate-400 cursor-pointer">😊</span>
                    <div className="w-5 h-5 rounded-md bg-[#6938ef] text-white flex items-center justify-center text-[9px] cursor-pointer shadow-xs">
                      ➤
                    </div>
                  </div>
                </div>

                {/* 3. FLOATING METRIC CARD (WhatsApp Leads This Month: 1,248) */}
                <div className="absolute -bottom-5 left-1/4 -translate-x-1/4 z-30 rounded-2xl bg-white border border-slate-200/90 shadow-[0_15px_30px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-xs shrink-0">
                    <WhatsAppLogo className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="text-[8.5px] text-slate-500 font-semibold leading-tight">
                      WhatsApp Leads This Month
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        1,248
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600">
                        ↗ 22%
                      </span>
                    </div>
                  </div>
                  {/* Mini Growth Bar Graphic */}
                  <div className="flex items-end gap-0.5 h-5 ml-1">
                    <div className="w-1 h-[25%] rounded-t bg-[#bbf7d0]" />
                    <div className="w-1 h-[45%] rounded-t bg-[#86efac]" />
                    <div className="w-1 h-[65%] rounded-t bg-[#4ade80]" />
                    <div className="w-1 h-[85%] rounded-t bg-[#22c55e]" />
                    <div className="w-1 h-[100%] rounded-t bg-[#16a34a]" />
                  </div>
                </div>

              </div>
            </div>

            {/* ---------------------------------------------------------------------
                COLUMN 3: Right Benefits (4 Items with Circular Icons)
            ---------------------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6 pl-0 lg:pl-2">
              
              {/* Benefit 1: All Conversations in One Place */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">
                  ⚡
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                    All Conversations in One Place
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed m-0">
                    No switching between WhatsApp and CRM.
                  </p>
                </div>
              </div>

              {/* Benefit 2: Connected to Customer Records */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">
                  🔗
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                    Connected to Customer Records
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed m-0">
                    Every chat is linked to the right student profile.
                  </p>
                </div>
              </div>

              {/* Benefit 3: Track Real Impact */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">
                  📊
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                    Track Real Impact
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed m-0">
                    Measure how many conversations actually convert.
                  </p>
                </div>
              </div>

              {/* Benefit 4: Respond Faster */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">
                  👥
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                    Respond Faster
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed m-0">
                    Give your team the full context to follow up and convert.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              BOTTOM WORKFLOW PIPELINE: Capture → Assign → Converse → Follow Up → Convert
          ========================================================================== */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#f8faff] border border-slate-200/90 p-4 sm:p-6 flex flex-col gap-4">
            
            {/* Workflow Heading with Purple Arrows */}
            <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
              <span>Capture</span>
              <span className="text-[#6938ef]">→</span>
              <span>Assign</span>
              <span className="text-[#6938ef]">→</span>
              <span>Converse</span>
              <span className="text-[#6938ef]">→</span>
              <span>Follow Up</span>
              <span className="text-[#6938ef]">→</span>
              <span>Convert</span>
            </h4>

            {/* 5 Step Cards with Connecting Right Arrows */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              
              {/* Step 1: Capture */}
              <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-xs shrink-0">
                  <WhatsAppLogo className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-slate-900">
                    1. Capture
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Leads from WhatsApp via Meta API
                  </span>
                </div>
                {/* Arrow to Next Step on Desktop */}
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">
                  →
                </span>
              </div>

              {/* Step 2: Assign */}
              <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center shadow-xs shrink-0 text-base">
                  👤
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-slate-900">
                    2. Assign
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Auto assign to the right counsellor
                  </span>
                </div>
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">
                  →
                </span>
              </div>

              {/* Step 3: Converse */}
              <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shadow-xs shrink-0 text-base">
                  💬
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-slate-900">
                    3. Converse
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Respond and provide details
                  </span>
                </div>
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">
                  →
                </span>
              </div>

              {/* Step 4: Follow Up */}
              <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shadow-xs shrink-0 text-base">
                  📅
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-slate-900">
                    4. Follow Up
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Track activities and reminders
                  </span>
                </div>
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">
                  →
                </span>
              </div>

              {/* Step 5: Convert */}
              <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shadow-xs shrink-0 text-base">
                  📊
                </div>
                <div>
                  <strong className="block text-xs font-extrabold text-slate-900">
                    5. Convert
                  </strong>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    Turn conversations into enrollments
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
