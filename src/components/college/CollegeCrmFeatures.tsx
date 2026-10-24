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

// Meta Infinity Logo SVG
function MetaInfinityLogo({ className = "w-6 h-6 text-[#0081fb]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.962 4.332c-1.895 0-3.612.87-4.962 2.308-1.35-1.438-3.067-2.308-4.962-2.308C3.12 4.332 0 7.452 0 11.294c0 3.842 3.12 6.962 7.038 6.962 2.368 0 4.414-1.162 5.688-2.946 1.274 1.784 3.32 2.946 5.688 2.946 3.918 0 7.038-3.12 7.038-6.962 0-3.842-3.12-6.962-7.038-6.962zm-9.924 11.75c-2.684 0-4.864-2.18-4.864-4.864s2.18-4.864 4.864-4.864c1.88 0 3.518 1.074 4.34 2.666-.822 1.592-2.46 2.666-4.34 2.666zm9.924 0c-1.88 0-3.518-1.074-4.34-2.666.822-1.592 2.46-2.666 4.34-2.666 2.684 0 4.864 2.18 4.864 4.864s-2.18 4.864-4.864 4.864z" />
    </svg>
  );
}

// Realistic Avatar with image fallback
function ContactAvatar({
  src,
  initials,
  gradient,
  className = "w-7 h-7"
}: {
  src?: string;
  initials: string;
  gradient: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={initials}
        onError={() => setHasError(true)}
        className={`${className} rounded-full object-cover shrink-0 shadow-2xs border border-white/80`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full ${gradient} text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-2xs`}
    >
      {initials}
    </div>
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
    <section className="relative py-14 sm:py-20 lg:py-24 bg-[#f8faff] border-b border-slate-200/80 overflow-hidden font-sans">
      
      {/* Background radial ambient highlights matching reference graphic */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#eaf1ff_0,transparent_60%)] opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#f3e8ff_0,transparent_60%)] opacity-80"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 flex flex-col gap-7 sm:gap-9">
        
        {/* =========================================================================
            HEADER: Section 3 Eyebrow + Headline + Subtitle (1:1 with reference)
        ========================================================================== */}
        <header className="text-center">
          {/* Eyebrow with flanking divider lines */}
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <div className="w-12 h-[1.5px] bg-[#d8b4fe]" />
            <span className="px-4 py-1 rounded-full bg-[#f3e8ff] border border-[#e9d5ff] text-[#6938ef] text-xs font-bold tracking-wide shadow-2xs">
              Section 3
            </span>
            <div className="w-12 h-[1.5px] bg-[#d8b4fe]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111827] tracking-tight leading-tight m-0">
            <span className="text-[#6938ef]">Key Features</span> of Your CRM Tool
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mt-2.5 max-w-[640px] mx-auto">
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
                aria-controls={`crm-feature-panel-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`relative rounded-2xl p-2.5 sm:py-3.5 sm:px-3 min-h-[72px] sm:min-h-[78px] flex items-center gap-2.5 text-left cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-[#6938ef] text-white border-transparent shadow-[0_10px_25px_rgba(105,56,239,0.28)] -translate-y-0.5"
                    : "bg-white text-slate-800 border-slate-200/70 hover:border-[#c4b5fd] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Active Indicator Tail Triangle (Points directly down to panel below) */}
                {isActive && (
                  <div
                    aria-hidden
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[9px] border-x-transparent border-t-[9px] border-t-[#6938ef] z-20"
                  />
                )}

                {/* Tab Icon Circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm shadow-2xs ${
                    isActive
                      ? tab.icon === "whatsapp"
                        ? "bg-[#25d366] text-white"
                        : "bg-white/20 text-white"
                      : `${tab.iconBg} ${tab.iconColor}`
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
            WHITE SHOWCASE CARD (Switches dynamically per Tab)
        ========================================================================== */}
        <div
          role="tabpanel"
          id={`crm-feature-panel-${activeTab}`}
          aria-labelledby={`crm-feature-tab-${activeTab}`}
          className="rounded-[30px] sm:rounded-[38px] bg-white border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col gap-8 sm:gap-10 transition-all duration-300"
        >
          {/* TAB 0: META CONVERSATION API (1:1 with Reference Image) */}
          {activeTab === 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#6938ef] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      META CONVERSATION API
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Turn Meta Conversations<br />
                      <span className="text-[#6938ef]">Into Revenue</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Your <strong className="text-slate-900 font-bold">customers</strong> are already talking to you on <strong className="text-slate-900 font-bold">WhatsApp</strong>. Pulse brings those conversations directly into your CRM through the <strong className="text-slate-900 font-bold">Meta Conversation API</strong>.
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

                {/* Column 2: Visual Cockpit (WhatsApp Smartphone + College CRM Tablet + Dotted Curve + Floating Badge) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  {/* Dotted Purple Curved Arrow pointing from Phone to CRM Tablet */}
                  <div className="absolute -top-3 right-1/4 z-30 hidden sm:block pointer-events-none">
                    <svg className="w-28 h-12 text-[#6938ef]" viewBox="0 0 100 40" fill="none">
                      <path
                        d="M 10 32 C 35 5, 75 5, 92 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <path d="M 86 24 L 92 24 L 92 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* 1. SMARTPHONE (WhatsApp Inbox) */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[26px] bg-white border-2 border-slate-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.12)] p-2 -mr-10 sm:-mr-12 shrink-0">
                      {/* Floating WhatsApp Green Icon Badge */}
                      <div className="absolute -top-3.5 left-4 w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-md">
                        <WhatsAppLogo className="w-5 h-5 text-white" />
                      </div>

                      {/* Screen Content */}
                      <div className="rounded-[20px] bg-white overflow-hidden text-slate-800 text-[10px]">
                        {/* Status bar / App title */}
                        <div className="bg-white px-2.5 pt-3.5 pb-1.5 flex items-center justify-between border-b border-slate-100">
                          <span className="font-extrabold text-[#128c7e] text-xs">WhatsApp</span>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                            <span>📷</span><span>🔍</span><span>⋮</span>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-50/80 text-[8px] font-bold border-b border-slate-100">
                          <span className="px-1.5 py-0.5 rounded-full bg-[#128c7e] text-white">All 12</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">Unread 8</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">Groups 2</span>
                        </div>

                        {/* Contact Rows */}
                        <div className="divide-y divide-slate-100">
                          {/* Priya Sharma */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                              initials="PS"
                              gradient="bg-gradient-to-tr from-purple-400 to-indigo-500"
                              className="w-6 h-6"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 truncate text-[9px]">Priya Sharma</span>
                                <span className="text-[7.5px] text-emerald-600 font-semibold">10:24 AM</span>
                              </div>
                              <p className="text-[7.5px] text-slate-500 truncate">Hi, I&apos;m interested in Data Science...</p>
                            </div>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">1</span>
                          </div>

                          {/* Rahul Mehta */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                              initials="RM"
                              gradient="bg-gradient-to-tr from-blue-400 to-sky-500"
                              className="w-6 h-6"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 truncate text-[9px]">Rahul Mehta</span>
                                <span className="text-[7.5px] text-emerald-600 font-semibold">10:15 AM</span>
                              </div>
                              <p className="text-[7.5px] text-slate-500 truncate">Can you share fee details?</p>
                            </div>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">2</span>
                          </div>

                          {/* Sneha Reddy */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                              initials="SR"
                              gradient="bg-gradient-to-tr from-pink-400 to-rose-500"
                              className="w-6 h-6"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 truncate text-[9px]">Sneha Reddy</span>
                                <span className="text-[7.5px] text-slate-400">09:45 AM</span>
                              </div>
                              <p className="text-[7.5px] text-slate-500 truncate">Do you have weekend batches?</p>
                            </div>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#25d366] text-white text-[7px] font-bold flex items-center justify-center shrink-0">1</span>
                          </div>

                          {/* Arjun Kumar */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                              initials="AK"
                              gradient="bg-gradient-to-tr from-amber-400 to-orange-500"
                              className="w-6 h-6"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 truncate text-[9px]">Arjun Kumar</span>
                                <span className="text-[7.5px] text-slate-400">09:20 AM</span>
                              </div>
                              <p className="text-[7.5px] text-slate-500 truncate">Is there any discount available?</p>
                            </div>
                          </div>

                          {/* Neha Verma */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                              initials="NV"
                              gradient="bg-gradient-to-tr from-emerald-400 to-teal-500"
                              className="w-6 h-6"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 truncate text-[9px]">Neha Verma</span>
                                <span className="text-[7.5px] text-slate-400">Yesterday</span>
                              </div>
                              <p className="text-[7.5px] text-slate-500 truncate">I want to enroll for next batch</p>
                            </div>
                          </div>

                          {/* Karan Singh */}
                          <div className="p-1.5 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
                              initials="KS"
                              gradient="bg-gradient-to-tr from-indigo-400 to-violet-500"
                              className="w-6 h-6"
                            />
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

                    {/* 2. TABLET (College CRM Chat Window) */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(30,27,75,0.12)] p-2.5 flex flex-col justify-between">
                      {/* Top Bar */}
                      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                        <span className="text-xs">🎓</span>
                        <span className="font-extrabold text-[#111827] text-[11px] tracking-wide">College CRM</span>
                      </div>

                      {/* Student Profile Card with Photo Avatar */}
                      <div className="flex items-center gap-2 py-2 border-b border-slate-100">
                        <ContactAvatar
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                          initials="PS"
                          gradient="bg-gradient-to-tr from-purple-500 to-indigo-600"
                          className="w-8 h-8"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-slate-900 text-[11px]">Priya Sharma</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[7.5px]">
                              New Lead
                            </span>
                          </div>
                          <span className="text-[8px] text-slate-400 block leading-tight">From WhatsApp • Today, 10:24 AM</span>
                        </div>
                      </div>

                      {/* Chat Sub-tabs */}
                      <div className="flex items-center gap-2.5 py-1 text-[8.5px] font-bold border-b border-slate-100 text-slate-500">
                        <span className="text-[#6938ef] border-b-2 border-[#6938ef] pb-0.5">Conversation</span>
                        <span>Details</span>
                        <span>Activities</span>
                        <span>Notes</span>
                      </div>

                      {/* Message Thread */}
                      <div className="py-2 space-y-1.5 text-[8.5px]">
                        <div className="flex justify-start">
                          <div className="bg-slate-100 text-slate-800 rounded-lg rounded-tl-none p-1.5 max-w-[85%]">
                            <span className="block font-semibold">Hi, I&apos;m interested in Data Science course</span>
                            <span className="text-[7px] text-slate-400 block text-right mt-0.5">10:24 AM</span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#dcfce7] text-slate-900 rounded-lg rounded-tr-none p-1.5 max-w-[85%]">
                            <span>Hi Priya! Thanks for reaching out. I can share all the details.</span>
                            <span className="text-[7px] text-emerald-700 block text-right mt-0.5">10:25 AM ✓✓</span>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-slate-100 text-slate-800 rounded-lg rounded-tl-none p-1.5 max-w-[85%]">
                            <span className="block">Can you share the fee structure and next batch date?</span>
                            <span className="text-[7px] text-slate-400 block text-right mt-0.5">10:26 AM</span>
                          </div>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400">
                        <span>Type a message...</span>
                        <div className="flex items-center gap-1.5 text-[#6938ef]">
                          <span className="cursor-pointer">📎</span>
                          <span className="cursor-pointer">😊</span>
                          <span className="w-4 h-4 rounded-full bg-[#6938ef] text-white flex items-center justify-center text-[7px] cursor-pointer">➤</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. FLOATING METRIC BADGE (WhatsApp Leads This Month) */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <WhatsAppLogo className="w-4.5 h-4.5 text-white" />
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">WhatsApp Leads This Month</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">1,248</span>
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center">↗ 22%</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-6 ml-1">
                        <span className="w-1.5 h-2 bg-emerald-300 rounded-t-sm" />
                        <span className="w-1.5 h-3 bg-emerald-400 rounded-t-sm" />
                        <span className="w-1.5 h-4 bg-emerald-500 rounded-t-sm" />
                        <span className="w-1.5 h-5 bg-emerald-600 rounded-t-sm" />
                        <span className="w-1.5 h-6 bg-emerald-600 rounded-t-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits (1:1 with Reference Image) */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center text-lg shadow-2xs">
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

                  {/* Benefit 2 */}
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

                  {/* Benefit 3 */}
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

                  {/* Benefit 4 */}
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

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#f8faff] border border-slate-200/90 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Capture</span><span className="text-[#6938ef]">→</span>
                  <span>Assign</span><span className="text-[#6938ef]">→</span>
                  <span>Converse</span><span className="text-[#6938ef]">→</span>
                  <span>Follow Up</span><span className="text-[#6938ef]">→</span>
                  <span>Convert</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-xs shrink-0">
                      <WhatsAppLogo className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Capture</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Leads from WhatsApp via Meta API</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center shadow-xs shrink-0 text-base">👤</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Assign</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Auto assign to the right counsellor</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shadow-xs shrink-0 text-base">💬</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Converse</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Respond and provide details</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shadow-xs shrink-0 text-base">📅</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Follow Up</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Track activities and reminders</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shadow-xs shrink-0 text-base">📊</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. Convert</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Turn conversations into enrollments</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 1: SMART LEAD ASSIGNMENT */}
          {activeTab === 1 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#0284c7] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      SMART LEAD ASSIGNMENT
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Route Every Inbound Lead<br />
                      <span className="text-[#0284c7]">In Under 15 Seconds</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Distribute prospective student enquiries instantaneously using <strong className="text-slate-900 font-bold">round-robin</strong>, course specialization, region, or counsellor capacity.
                      </p>
                      <p>
                        Never let a high-intent student go cold waiting for a callback.
                      </p>
                      <p>
                        Dynamic rules assign engineering leads to technical advisors and management leads to MBA specialists with full contact history.
                      </p>
                      <p>
                        Automated escalation rules reassign unopened leads after 10 minutes so no student slips through the cracks.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-[#f0f9ff] border border-sky-100 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">⚙️</span>
                      <span className="text-sm font-bold text-slate-900">Intelligent Routing Engine</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold">Zero Delay</span>
                    </div>
                    <small className="text-slate-500 text-xs font-medium">
                      Multi-criteria lead assignment with real-time counsellor load balancing
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Cockpit (Lead Dispatch Card + Counsellor Live Roster) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* Foreground Card */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[24px] bg-white border-2 border-sky-200/90 shadow-[0_20px_45px_rgba(2,132,199,0.14)] p-3 -mr-10 sm:-mr-12 shrink-0">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold text-[8px] flex items-center gap-1">
                          ⚡ Instant Dispatch
                        </span>
                        <span className="text-[7.5px] text-slate-400">Just now</span>
                      </div>
                      <div className="py-2.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Incoming Student</span>
                        <h5 className="font-extrabold text-slate-900 text-xs mt-0.5">Arjun Verma</h5>
                        <p className="text-[8px] text-slate-500 mt-0.5">B.Tech Computer Science & AI</p>
                        <div className="mt-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                          <span className="text-[8px] text-emerald-800 font-bold">Lead Score: 94%</span>
                          <span className="text-[7.5px] text-emerald-600 font-semibold">High Intent</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[8px] text-slate-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Auto-routed to <strong>Rohan S.</strong></span>
                        </div>
                        <span className="text-[7px] text-slate-400 block mt-0.5">Matched: Course Expert • North Region</span>
                      </div>
                    </div>

                    {/* Background Tablet */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">👥</span>
                          <span className="font-extrabold text-[#111827] text-[11px]">Admissions Roster</span>
                        </div>
                        <span className="text-[7.5px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">5 Online</span>
                      </div>
                      <div className="py-2 space-y-2 text-[8.5px]">
                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                              initials="RS"
                              gradient="bg-sky-500"
                              className="w-5 h-5"
                            />
                            <div>
                              <strong className="block text-slate-900 text-[8px]">Rohan Sharma</strong>
                              <span className="text-[7px] text-slate-400">Engineering • 14 leads</span>
                            </div>
                          </div>
                          <span className="text-[7px] text-emerald-600 font-bold">🟢 Active (2m)</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                              initials="AR"
                              gradient="bg-purple-500"
                              className="w-5 h-5"
                            />
                            <div>
                              <strong className="block text-slate-900 text-[8px]">Ananya Roy</strong>
                              <span className="text-[7px] text-slate-400">MBA / Finance • 11 leads</span>
                            </div>
                          </div>
                          <span className="text-[7px] text-emerald-600 font-bold">🟢 Active (1m)</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <ContactAvatar
                              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
                              initials="VS"
                              gradient="bg-amber-500"
                              className="w-5 h-5"
                            />
                            <div>
                              <strong className="block text-slate-900 text-[8px]">Vikram Seth</strong>
                              <span className="text-[7px] text-slate-400">Design • 9 leads</span>
                            </div>
                          </div>
                          <span className="text-[7px] text-amber-600 font-bold">🟡 In Call</span>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100 text-[7.5px] text-slate-500 flex justify-between">
                        <span>Rule: Round-Robin + Skill Match</span>
                        <span className="text-sky-600 font-bold">Active</span>
                      </div>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 text-base shadow-sm">
                        ⚡
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">Average Lead Routing Time</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">12 Seconds</span>
                          <span className="text-[10px] font-bold text-emerald-600">-94% Drop-off</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">⚡</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Zero Delay Routing</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">First response time drops from hours to under 30 seconds.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">🎯</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Course & Skill Matching</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Direct engineering queries to engineering advisors.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-lg shadow-2xs">⚖️</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Balanced Workloads</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Prevent counsellor burnout with smart capacity limits.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">🔄</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Auto-Escalation</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Unopened leads automatically re-route after 10 minutes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#f0f9ff] border border-sky-100 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Capture</span><span className="text-[#0284c7]">→</span>
                  <span>Filter</span><span className="text-[#0284c7]">→</span>
                  <span>Rule Match</span><span className="text-[#0284c7]">→</span>
                  <span>Auto Assign</span><span className="text-[#0284c7]">→</span>
                  <span>First Touch</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📩</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Capture</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Student enquiry lands in CRM</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🔍</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Filter</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Extract course, region, and intent</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">⚙️</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Rule Match</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Run counsellor skill matrix</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📲</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Auto Assign</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Push mobile alert to advisor</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📞</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. First Touch</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Connect with student in &lt;60s</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: LEAD COST CALCULATOR */}
          {activeTab === 2 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#8b5cf6] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      LEAD COST CALCULATOR
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Know Your Exact Cost Per Lead<br />
                      <span className="text-[#8b5cf6]">&amp; CAC By Channel</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Stop guessing marketing ROI. Connect ad accounts (<strong className="text-slate-900 font-bold">Meta, Google, LinkedIn</strong>) directly to enrolled students.
                      </p>
                      <p>
                        Attribution reveals your exact <strong className="text-slate-900 font-bold">Cost Per Lead (CPL)</strong> and <strong className="text-slate-900 font-bold">Customer Acquisition Cost (CAC)</strong>.
                      </p>
                      <p>
                        Track which ad creative generates real admissions versus low-quality clicks.
                      </p>
                      <p>
                        Reallocate budgets dynamically to channels delivering enrolled students at the lowest CAC.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-[#faf5ff] border border-purple-100 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">🧮</span>
                      <span className="text-sm font-bold text-slate-900">Multi-Touch Attribution Engine</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">Live ROI</span>
                    </div>
                    <small className="text-slate-500 text-xs font-medium">
                      Real-time sync with Meta Ads Manager, Google Ads &amp; Campus Portals
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Cockpit (CPL Calculator Dial + Channel Attribution Table) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* Foreground Card */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[24px] bg-white border-2 border-purple-200/90 shadow-[0_20px_45px_rgba(139,92,246,0.14)] p-3 -mr-10 sm:-mr-12 shrink-0">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[8px]">
                          Ad Spend Analysis
                        </span>
                        <span className="text-[7.5px] text-emerald-600 font-bold">● Live Sync</span>
                      </div>
                      <div className="py-2.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Monthly Ad Spend</span>
                        <h5 className="font-extrabold text-slate-900 text-base mt-0.5">₹4,20,000</h5>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-[7px] text-slate-400 block">Total Inquiries</span>
                            <span className="text-xs font-bold text-slate-800">2,950</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 block">Blended CPL</span>
                            <span className="text-xs font-bold text-purple-600">₹142.30</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[7.5px]">
                        <span className="text-slate-500">Target CPL: ₹180</span>
                        <span className="text-emerald-600 font-bold">21% Under Budget</span>
                      </div>
                    </div>

                    {/* Background Tablet */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">📈</span>
                          <span className="font-extrabold text-[#111827] text-[11px]">Channel CAC Breakdown</span>
                        </div>
                        <span className="text-[7.5px] text-purple-600 font-bold">This Term</span>
                      </div>
                      <div className="py-1.5 space-y-1.5 text-[8px]">
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-slate-800 block">Meta Ads (Instagram)</span>
                            <span className="text-[7px] text-slate-400">1,420 leads • 84 Enrolled</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-purple-600">₹1,990</span>
                            <span className="text-[6.5px] text-slate-400 block">CAC / Student</span>
                          </div>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-slate-800 block">Google Search (High Intent)</span>
                            <span className="text-[7px] text-slate-400">890 leads • 72 Enrolled</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-indigo-600">₹2,280</span>
                            <span className="text-[6.5px] text-slate-400 block">CAC / Student</span>
                          </div>
                        </div>
                        <div className="p-1 rounded bg-slate-50 border border-slate-100 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-slate-800 block">WhatsApp Direct Inbound</span>
                            <span className="text-[7px] text-slate-400">430 leads • 45 Enrolled</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-emerald-600">₹708</span>
                            <span className="text-[6.5px] text-slate-400 block">CAC / Student</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1 border-t border-slate-100 text-[7px] text-slate-500 flex justify-between">
                        <span>Total Enrolled: 201 Students</span>
                        <span className="text-purple-600 font-bold">Blended CAC: ₹2,089</span>
                      </div>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-base shadow-sm">
                        📊
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">Return on Marketing Ad Spend</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">5.4x ROAS</span>
                          <span className="text-[10px] font-bold text-emerald-600">+18% Efficiency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">💰</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Real-Time CAC Tracking</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Calculate student acquisition cost down to the exact rupee.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">🔍</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Multi-Touch Attribution</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Credit the first touch ad and the closing WhatsApp chat.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">📉</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Eliminate Ad Waste</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Instantly shut down ad sets generating low-intent leads.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-lg shadow-2xs">📈</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Predict Admission Yield</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Forecast batch fill rates based on proven cost curves.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#faf5ff] border border-purple-100 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Connect Ads</span><span className="text-[#8b5cf6]">→</span>
                  <span>Ingest Leads</span><span className="text-[#8b5cf6]">→</span>
                  <span>Track Spend</span><span className="text-[#8b5cf6]">→</span>
                  <span>Attribute Admission</span><span className="text-[#8b5cf6]">→</span>
                  <span>Optimize Budget</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🔗</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Connect Ads</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Sync Meta &amp; Google ad accounts</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🏷️</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Ingest Leads</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Tag leads with UTM source &amp; ad set</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">💳</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Track Spend</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Calculate live cost per lead (CPL)</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🎓</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Attribute</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Link tuition fee back to campaign</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🚀</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. Optimize</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Scale highest-yielding campaigns</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: CONVERSION ANALYTICS */}
          {activeTab === 3 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#e11d48] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      CONVERSION ANALYTICS
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Uncover Every Bottleneck<br />
                      <span className="text-[#e11d48]">In Your Admission Funnel</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Gain crystal-clear visibility into where prospective students drop off—from initial click to verified fee deposit.
                      </p>
                      <p>
                        Compare counsellor conversion rates, campus branches, and course popularity side-by-side with granular cohort tracking.
                      </p>
                      <p>
                        Identify leads stuck in the application review pipeline and trigger automated WhatsApp nudges before deadlines pass.
                      </p>
                      <p>
                        Forecast upcoming batch enrollment volumes with 94% predictive accuracy.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-[#fff1f2] border border-rose-100 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">📊</span>
                      <span className="text-sm font-bold text-slate-900">Full-Funnel Student Journey Analytics</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">Real-time</span>
                    </div>
                    <small className="text-slate-500 text-xs font-medium">
                      Multi-stage drop-off tracking from first click to orientation day
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Cockpit (Drop-off Alert Card + 5-Stage Funnel Visualizer) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* Foreground Card */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[24px] bg-white border-2 border-rose-200/90 shadow-[0_20px_45px_rgba(225,29,72,0.14)] p-3 -mr-10 sm:-mr-12 shrink-0">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[8px]">
                          Funnel Warning
                        </span>
                        <span className="text-[7.5px] text-rose-600 font-bold">Action Needed</span>
                      </div>
                      <div className="py-2.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Stage Bottleneck Detected</span>
                        <h5 className="font-extrabold text-slate-900 text-xs mt-0.5">Doc Verification → Fee</h5>
                        <p className="text-[8px] text-slate-500 mt-1">48 qualified students haven&apos;t paid admission deposit within 5 days.</p>
                        <div className="mt-2 p-1.5 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-between">
                          <span className="text-[8px] text-rose-800 font-bold">Trigger WhatsApp Nudge</span>
                          <span className="text-[7.5px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold cursor-pointer">Send</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex justify-between text-[7.5px] text-slate-400">
                        <span>Recoverable Pipeline:</span>
                        <span className="font-bold text-slate-800">₹21.6 Lakhs</span>
                      </div>
                    </div>

                    {/* Background Tablet */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🔻</span>
                          <span className="font-extrabold text-[#111827] text-[11px]">Admission Funnel</span>
                        </div>
                        <span className="text-[7.5px] text-rose-600 font-bold">Batch 2026</span>
                      </div>
                      <div className="py-2 space-y-1.5 text-[8px]">
                        <div>
                          <div className="flex justify-between text-[7.5px] mb-0.5">
                            <span className="font-bold text-slate-700">1. Total Inquiries</span>
                            <span className="font-bold text-slate-900">12,450 (100%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-500 h-full w-full rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[7.5px] mb-0.5">
                            <span className="font-bold text-slate-700">2. Qualified Leads</span>
                            <span className="font-bold text-slate-900">8,240 (66.2%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-400 h-full w-[66.2%] rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[7.5px] mb-0.5">
                            <span className="font-bold text-slate-700">3. Applications Submitted</span>
                            <span className="font-bold text-slate-900">4,120 (33.1%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-400/80 h-full w-[33.1%] rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[7.5px] mb-0.5">
                            <span className="font-bold text-slate-700">4. Entrance / Interview Passed</span>
                            <span className="font-bold text-slate-900">2,380 (19.1%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-300 h-full w-[19.1%] rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[7.5px] mb-0.5">
                            <span className="font-bold text-slate-700">5. Confirmed &amp; Fee Paid</span>
                            <span className="font-bold text-emerald-700">1,620 (13.0%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[13.0%] rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100 text-[7.5px] text-slate-500 flex justify-between">
                        <span>Target: 1,800 Enrolled</span>
                        <span className="text-emerald-600 font-bold">90% Achieved</span>
                      </div>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 text-base shadow-sm">
                        📈
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">Overall Conversion Rate</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">13.0%</span>
                          <span className="text-[10px] font-bold text-emerald-600">+3.4% YoY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">🎯</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Funnel Stage Visualization</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">See exact drop-off points at each stage of admission.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">👥</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Counsellor League Table</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Spot top-performing advisors and coach team members.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">⏱️</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Stage Velocity Metrics</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Measure average days taken from enquiry to fee deposit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-lg shadow-2xs">📑</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Custom PDF Reports</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Export leadership presentations with 1-click downloads.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#fff1f2] border border-rose-100 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Enquire</span><span className="text-[#e11d48]">→</span>
                  <span>Qualify</span><span className="text-[#e11d48]">→</span>
                  <span>Application</span><span className="text-[#e11d48]">→</span>
                  <span>Document Check</span><span className="text-[#e11d48]">→</span>
                  <span>Enrolled</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">💬</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Enquire</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Student makes initial contact</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📋</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Qualify</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Counsellor confirms eligibility</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📝</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Application</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Student submits admission form</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🔍</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Doc Check</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Academic verification &amp; approval</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🎉</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. Enrolled</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Fee received &amp; seat confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: PAYMENT ANALYTICS */}
          {activeTab === 4 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#107e43] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      PAYMENT ANALYTICS
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Automate Tuition Fee Collection<br />
                      <span className="text-[#107e43]">&amp; Ledger Reconciliation</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Send branded payment links via <strong className="text-slate-900 font-bold">WhatsApp, SMS, and Email</strong> with instant receipt generation and ERP synchronization.
                      </p>
                      <p>
                        Track upcoming installments, overdue balances, and partial scholarships automatically with zero accounting friction.
                      </p>
                      <p>
                        Real-time bank reconciliation eliminates manual bank statement matching and prevents unauthorized discounts.
                      </p>
                      <p>
                        Automated multi-channel reminders recover 96.4% of scheduled semester fees on time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-[#f0fdf4] border border-emerald-100 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">💳</span>
                      <span className="text-sm font-bold text-slate-900">UPI, NetBanking &amp; Auto-Debit</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Instant Receipts</span>
                    </div>
                    <small className="text-slate-500 text-xs font-medium">
                      Direct integration with Razorpay, Cashfree, UPI QR &amp; Campus ERPs
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Cockpit (Payment Receipt + Fee Collections Dashboard) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* Foreground Card */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[24px] bg-white border-2 border-emerald-200/90 shadow-[0_20px_45px_rgba(16,126,67,0.14)] p-3 -mr-10 sm:-mr-12 shrink-0">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[8px] flex items-center gap-1">
                          ✓ Payment Received
                        </span>
                        <span className="text-[7.5px] text-slate-400">10:28 AM</span>
                      </div>
                      <div className="py-2.5">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Tuition Deposit Paid</span>
                        <h5 className="font-extrabold text-slate-900 text-base mt-0.5">₹45,000</h5>
                        <div className="mt-1.5 p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[7.5px] space-y-0.5">
                          <div className="flex justify-between text-slate-700">
                            <span>Student:</span>
                            <span className="font-bold">Priya Sharma</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Mode:</span>
                            <span className="font-bold">UPI (GPay)</span>
                          </div>
                          <div className="flex justify-between text-slate-700">
                            <span>Receipt ID:</span>
                            <span className="font-mono text-emerald-700 font-bold">#UPX-8821</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[7.5px]">
                        <span className="text-slate-500">PDF Sent to WhatsApp</span>
                        <span className="text-emerald-700 font-bold">Auto-Synced</span>
                      </div>
                    </div>

                    {/* Background Tablet */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">💼</span>
                          <span className="font-extrabold text-[#111827] text-[11px]">Fee Collections</span>
                        </div>
                        <span className="text-[7.5px] text-emerald-700 font-bold">Q1 2026</span>
                      </div>
                      <div className="py-2 space-y-1.5 text-[8px]">
                        <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                          <div>
                            <span className="text-[7px] text-slate-400 block">Total Fee Collected</span>
                            <strong className="text-slate-900 text-[10px]">₹4.82 Crore</strong>
                          </div>
                          <span className="text-[7.5px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">88.4% of Goal</span>
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between items-center text-[7.5px] p-1 bg-white rounded border border-slate-100">
                            <span>Priya Sharma (B.Tech)</span>
                            <span className="font-bold text-emerald-600">₹45,000 ✓</span>
                          </div>
                          <div className="flex justify-between items-center text-[7.5px] p-1 bg-white rounded border border-slate-100">
                            <span>Arjun Kumar (MBA)</span>
                            <span className="font-bold text-emerald-600">₹75,000 ✓</span>
                          </div>
                          <div className="flex justify-between items-center text-[7.5px] p-1 bg-white rounded border border-slate-100">
                            <span>Neha Verma (Design)</span>
                            <span className="font-bold text-amber-600">₹30,000 (Due 3d)</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100 text-[7.5px] text-slate-500 flex justify-between">
                        <span>Pending Balance: ₹63.2 L</span>
                        <span className="text-emerald-700 font-bold">Reminders Active</span>
                      </div>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-base shadow-sm font-bold">
                        ₹
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">On-Time Fee Recovery Rate</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">96.4%</span>
                          <span className="text-[10px] font-bold text-emerald-600">+12% faster</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#dcfce7] text-[#107e43] flex items-center justify-center text-lg shadow-2xs">⚡</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">1-Tap WhatsApp Links</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Parents and students pay easily via UPI, Debit Card, or EMI.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">🤖</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Automated Installment Nudges</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Polite automated reminders prevent overdue fees.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">📑</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Automatic Reconciliation</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Zero manual spreadsheet work or lost transaction slips.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">🔒</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Fraud &amp; Discount Auditing</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Strict multi-tier approval for fee waivers and scholarships.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#f0fdf4] border border-emerald-100 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Generate Invoice</span><span className="text-[#107e43]">→</span>
                  <span>Send Link</span><span className="text-[#107e43]">→</span>
                  <span>Student Pays</span><span className="text-[#107e43]">→</span>
                  <span>Instant Receipt</span><span className="text-[#107e43]">→</span>
                  <span>ERP Sync</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🧾</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Generate</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Create semester fee schedule</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📲</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Send Link</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">WhatsApp link with breakdown</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">💳</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Student Pays</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Instant UPI, Card or NetBanking</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📑</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Receipt</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Auto-generate PDF receipt</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🔄</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. ERP Sync</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Update ledger &amp; student account</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 5: AI ACTION CENTER */}
          {activeTab === 5 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#7c3aed] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      AI ACTION CENTER
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Autonomous AI Agents That<br />
                      <span className="text-[#7c3aed]">Convert Leads 24/7</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Empower your admissions office with an intelligent AI copilot that responds to student queries <strong className="text-slate-900 font-bold">24/7 in 15+ Indian languages</strong>.
                      </p>
                      <p>
                        AI reads student intent signals, scores lead readiness, and drafts personalized follow-up messages tailored to each candidate.
                      </p>
                      <p>
                        Counsellors get automated AI summaries after every phone call, complete with action items and recommended next steps.
                      </p>
                      <p>
                        Never lose a midnight enquiry to competitor colleges again.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-[#faf5ff] border border-purple-100 text-center flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-lg">✦</span>
                      <span className="text-sm font-bold text-slate-900">Education LLM Copilot</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">15+ Languages</span>
                    </div>
                    <small className="text-slate-500 text-xs font-medium">
                      Autonomous intent scoring, dynamic FAQ resolution &amp; voice call summarization
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Cockpit (AI Bot Chat + AI Action Queue) */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-4">
                  <div className="relative w-full max-w-[430px] flex items-center justify-center">
                    {/* Foreground Card */}
                    <div className="relative z-20 w-[215px] sm:w-[230px] rounded-[24px] bg-white border-2 border-purple-200/90 shadow-[0_20px_45px_rgba(124,58,237,0.14)] p-3 -mr-10 sm:-mr-12 shrink-0">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold text-[8px] flex items-center gap-1">
                          ✦ AI Admissions Bot
                        </span>
                        <span className="text-[7.5px] text-emerald-600 font-semibold">● Instant</span>
                      </div>
                      <div className="py-2 space-y-1.5 text-[8px]">
                        <div className="bg-slate-100 rounded-lg p-1.5 text-slate-700">
                          <span className="block font-semibold">Student: What is the highest placement package for CS?</span>
                        </div>
                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-1.5 text-purple-950">
                          <span className="block"><strong>AI:</strong> Highest CTC is <strong>₹44 LPA</strong> (Microsoft) with 94.2% placement rate. Would you like the official 2025 placement report?</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[7.5px]">
                        <span className="text-slate-400">Response time: <strong>0.8s</strong></span>
                        <span className="text-purple-600 font-bold">Intent: 96%</span>
                      </div>
                    </div>

                    {/* Background Tablet */}
                    <div className="relative z-10 w-[245px] sm:w-[265px] rounded-[22px] bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2.5 flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">✦</span>
                          <span className="font-extrabold text-[#111827] text-[11px]">AI Action Center</span>
                        </div>
                        <span className="text-[7.5px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">Auto Pilot</span>
                      </div>
                      <div className="py-2 space-y-1.5 text-[8px]">
                        <div className="p-1.5 rounded-lg bg-purple-50/60 border border-purple-100">
                          <div className="flex justify-between items-center">
                            <strong className="text-purple-900 text-[8px]">⚡ Call Rahul Mehta</strong>
                            <span className="text-[7px] text-purple-700 font-bold">High Intent (92%)</span>
                          </div>
                          <p className="text-[7px] text-slate-500 mt-0.5">Visited tuition fee page 4 times in 2 hours.</p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-sky-50/60 border border-sky-100">
                          <div className="flex justify-between items-center">
                            <strong className="text-sky-900 text-[8px]">✉️ Auto-Drafted Brochure</strong>
                            <span className="text-[7px] text-sky-700 font-bold">Ready to Send</span>
                          </div>
                          <p className="text-[7px] text-slate-500 mt-0.5">Customized scholarship letter for Priya Sharma.</p>
                        </div>
                        <div className="p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                          <div className="flex justify-between items-center">
                            <strong className="text-emerald-900 text-[8px]">🎙️ Call Transcribed</strong>
                            <span className="text-[7px] text-emerald-700 font-bold">Counsellor Vikram</span>
                          </div>
                          <p className="text-[7px] text-slate-500 mt-0.5">Parent asked for campus hostel visit on Saturday.</p>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100 text-[7.5px] text-slate-500 flex justify-between">
                        <span>342 queries resolved today</span>
                        <span className="text-purple-600 font-bold">Zero Human Latency</span>
                      </div>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute -bottom-4 left-0 sm:left-4 z-30 bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-2.5 sm:p-3 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-base shadow-sm">
                        ✦
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold text-slate-500 block leading-tight">Routine Inquiries Resolved by AI</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-extrabold text-slate-900">68%</span>
                          <span className="text-[10px] font-bold text-emerald-600">Saved 4.5 hrs/day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">🌙</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">24/7 Instant Responses</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Never lose a midnight enquiry to competitor colleges.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">🧠</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Predictive Intent Scoring</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Focus your team on the top 20% most likely to enroll.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#dcfce7] text-[#107e43] flex items-center justify-center text-lg shadow-2xs">🗣️</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">15+ Regional Languages</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Communicate naturally with parents in their native language.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">📝</div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">Call &amp; Chat Summaries</h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">Save counsellors 2 hours daily on manual data entry.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Workflow Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#faf5ff] border border-purple-100 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Detect Inquiry</span><span className="text-[#7c3aed]">→</span>
                  <span>AI Qualify</span><span className="text-[#7c3aed]">→</span>
                  <span>Score Intent</span><span className="text-[#7c3aed]">→</span>
                  <span>Draft Action</span><span className="text-[#7c3aed]">→</span>
                  <span>Counsellor Closes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📩</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Detect</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Student inquires on WhatsApp or web</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">✦</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. AI Qualify</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Answers FAQs &amp; verifies eligibility</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">📊</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Score Intent</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Calculates 0-100% enrollment score</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">⚡</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Draft Action</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Generates tailored follow-up plan</span>
                    </div>
                    <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10">→</span>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 text-base">🤝</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. Close</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Advisor steps in with full context</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
