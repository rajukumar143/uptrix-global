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
    iconColor: "text-white",
  },
  {
    id: "smart-lead",
    name: ["Smart Lead", "Assignment"],
    icon: "users",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]",
  },
  {
    id: "lead-cost",
    name: ["Lead Cost", "Calculator"],
    icon: "calc",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#8b5cf6]",
  },
  {
    id: "conversion",
    name: ["Conversion", "Analytics"],
    icon: "chart",
    iconBg: "bg-[#ffe4e6]",
    iconColor: "text-[#e11d48]",
  },
  {
    id: "milestones",
    name: ["Milestone", "Collections"],
    icon: "rupee",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#107e43]",
  },
  {
    id: "ai-action",
    name: ["AI Action", "Center"],
    icon: "sparkle",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#7c3aed]",
  },
];

export default function RealEstateCrmFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-[#f8faff] border-b border-slate-200/80 overflow-hidden font-sans">
      
      {/* Background ambient highlights matching college theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#eaf1ff_0,transparent_60%)] opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#f3e8ff_0,transparent_60%)] opacity-80"
      />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 flex flex-col gap-7 sm:gap-9">
        
        {/* =========================================================================
            HEADER: Section 3 Eyebrow + Headline + Subtitle (Identical to College)
        ========================================================================== */}
        <header className="text-center">
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
            Everything real estate developers need to capture, manage, convert and collect — all in one place.
          </p>
        </header>

        {/* =========================================================================
            TABS ROW: 6 Interactive Horizontal Tabs (Active has downward pointer tail)
        ========================================================================== */}
        <div
          role="tablist"
          aria-label="Key Real Estate CRM Features"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3"
        >
          {tabItems.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`re-feature-tab-${idx}`}
                aria-selected={isActive}
                aria-controls={`re-feature-panel-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`relative rounded-2xl p-2.5 sm:py-3.5 sm:px-3 min-h-[72px] sm:min-h-[78px] flex items-center gap-2.5 text-left cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-[#6938ef] text-white border-transparent shadow-[0_10px_25px_rgba(105,56,239,0.28)] -translate-y-0.5"
                    : "bg-white text-slate-800 border-slate-200/70 hover:border-[#c4b5fd] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Active Indicator Tail Triangle */}
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
          id={`re-feature-panel-${activeTab}`}
          aria-labelledby={`re-feature-tab-${activeTab}`}
          className="rounded-[30px] sm:rounded-[38px] bg-white border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex flex-col gap-8 sm:gap-10 transition-all duration-300"
        >
          {/* TAB 0: META CONVERSATION API */}
          {activeTab === 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-5 xl:gap-6 items-center">
                {/* Column 1: Copy */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[#6938ef] font-bold text-xs tracking-wider uppercase block mb-2.5">
                      META CONVERSATION API
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.15] mb-4">
                      Turn Inquiries<br />
                      <span className="text-[#6938ef]">Into Site Visits</span>
                    </h3>
                    <div className="space-y-3.5 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                      <p>
                        Your <strong className="text-slate-900 font-bold">home buyers</strong> are already browsing on <strong className="text-slate-900 font-bold">WhatsApp & Meta</strong>. Pulse brings inquiries from 99acres, MagicBricks, and Instagram directly into your CRM through the <strong className="text-slate-900 font-bold">Meta Conversation API</strong>.
                      </p>
                      <p>
                        No switching between personal phones and spreadsheets.
                      </p>
                      <p>
                        Every conversation is tied to the buyer profile, tower unit interest, and budget range — giving your sales architects instant context to book Saturday site visits.
                      </p>
                      <p>
                        And because chats become part of your unified telemetry, you can finally calculate true cost per walk-in across every campaign.
                      </p>
                    </div>
                  </div>

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
                      Direct integration with Meta Business Cloud API
                    </small>
                  </div>
                </div>

                {/* Column 2: Visual Phone + Cockpit */}
                <div className="lg:col-span-5 relative flex items-center justify-center py-2">
                  <div className="relative w-full max-w-[480px] bg-slate-900 rounded-3xl p-4 text-white shadow-xl border border-slate-800">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#25d366]" />
                        <span className="font-bold">Verified Builder WhatsApp</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Response &lt; 2.4s</span>
                    </div>

                    <div className="space-y-3 py-3 text-xs">
                      <div className="bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-200">
                        <span className="text-[10px] text-slate-400 font-mono block">Buyer (99acres Inquiry):</span>
                        Hi, I saw your 3BHK ad for Emerald Bay. What is the carpet area and pricing?
                      </div>

                      <div className="bg-emerald-900/60 border border-emerald-700/60 p-3 rounded-2xl max-w-[85%] ml-auto text-emerald-100">
                        <span className="text-[10px] text-emerald-400 font-mono block">Pulse AI Co-Pilot:</span>
                        Hello! Tower A 3BHK offers 1,840 sq.ft carpet starting at ₹2.45 Cr. Here is the RERA brochure: [PDF-Brochure]. Would you like to schedule a site visit this Saturday?
                      </div>

                      <div className="bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-200">
                        <span className="text-[10px] text-slate-400 font-mono block">Buyer:</span>
                        Yes, Saturday 11 AM works. Can you send location?
                      </div>

                      <div className="bg-blue-950/70 border border-blue-700/60 p-3 rounded-2xl max-w-[85%] ml-auto text-blue-100">
                        <span className="text-[10px] text-blue-400 font-mono block">System:</span>
                        Site visit locked! Location pin + driver pickup details dispatched. Gate Pass #98214 generated.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: 4 Benefits */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center text-lg shadow-2xs">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                        All Conversations in One Place
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">
                        No missed chats across sales executives&apos; personal phones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center text-lg shadow-2xs">
                      🔗
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                        Connected to Buyer Dossier
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">
                        Every chat is linked to unit preference, budget and site visit history.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center text-lg shadow-2xs">
                      📊
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                        Track Real CAC
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">
                        Measure how many portal inquiries turn into site visits and tokens.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center text-lg shadow-2xs">
                      👥
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mb-0.5">
                        Zero Lead Leakage
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed m-0">
                        Sub-2.4 second automated first response locks high-intent prospects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 5-Step Pipeline */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#f8faff] border border-slate-200/90 p-4 sm:p-6 flex flex-col gap-4">
                <h4 className="text-center font-display text-xs sm:text-sm lg:text-base font-extrabold text-[#111827] flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 m-0">
                  <span>Capture</span><span className="text-[#6938ef]">→</span>
                  <span>Assign</span><span className="text-[#6938ef]">→</span>
                  <span>Converse</span><span className="text-[#6938ef]">→</span>
                  <span>Site Visit</span><span className="text-[#6938ef]">→</span>
                  <span>Token</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-xs shrink-0">
                      <WhatsAppLogo className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">1. Capture</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Portals & Meta Lead Ads</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center shadow-xs shrink-0 text-base">👤</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">2. Assign</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Round-robin to sales manager</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shadow-xs shrink-0 text-base">💬</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">3. Converse</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">WhatsApp floor plans & cost sheet</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center shadow-xs shrink-0 text-base">📍</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">4. Site Visit</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">Cab pickup & QR gate pass</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-2xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shadow-xs shrink-0 text-base">🏆</div>
                    <div>
                      <strong className="block text-xs font-extrabold text-slate-900">5. Token</strong>
                      <span className="text-[10px] text-slate-500 block leading-tight">30-min unit hold & booking</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 1: SMART LEAD ASSIGNMENT */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#0284c7] font-bold text-xs tracking-wider uppercase block">
                  SMART LEAD ASSIGNMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Zero Cold Drops with <br />
                  <span className="text-blue-600">Dynamic Round-Robin Routing</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Inquiries lose 80% of conversion probability after 15 minutes of inactivity. Pulse intelligently allocates inbound portal leads to available on-duty sales executives based on project knowledge, language preference, and live queue workload.
                </p>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>Weighted round-robin by closing ratio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>5-minute SLA timeout re-allocation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>Channel Partner 90-day tagging rule</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Active Sales Executive Load</span>
                {[
                  { name: "Priya Sharma", role: "Senior Sales Architect", activeLeads: 12, visitsToday: 4, conversion: "24.2%", status: "Available" },
                  { name: "Vikram Malhotra", role: "Luxury Project Lead", activeLeads: 18, visitsToday: 6, conversion: "28.5%", status: "On Site Visit" },
                  { name: "Anand Rathi", role: "Channel Partner Manager", activeLeads: 9, visitsToday: 2, conversion: "19.8%", status: "Available" },
                ].map((rep, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{rep.name}</div>
                      <div className="text-[11px] text-slate-500">{rep.role} • Conversion: <span className="text-emerald-600 font-bold">{rep.conversion}</span></div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rep.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {rep.status}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">{rep.activeLeads} active • {rep.visitsToday} visits today</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LEAD COST CALCULATOR */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#8b5cf6] font-bold text-xs tracking-wider uppercase block">
                  LEAD COST CALCULATOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Stop Guessing. <br />
                  <span className="text-purple-600">Track True Cost Per Booking.</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Traditional CRMs count leads; Pulse calculates acquisition cost down to the rupee across 99acres, MagicBricks, Meta, Google PPC, and offline hoardings.
                </p>
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-purple-900">
                  <strong>Blended CAC: ₹18,500 per booking</strong> (Down 34% after removing underperforming portal campaigns).
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Portal & Campaign Acquisition Matrix</span>
                <div className="space-y-2 text-xs">
                  {[
                    { source: "99acres Verified Premium", spend: "₹1,80,000", leads: 320, costPerLead: "₹562", visits: 68, bookings: 12, roi: "8.4x" },
                    { source: "Meta Ads (3BHK Luxury Retargeting)", spend: "₹1,20,000", leads: 480, costPerLead: "₹250", visits: 84, bookings: 14, roi: "11.2x" },
                    { source: "MagicBricks Developer Package", spend: "₹1,50,000", leads: 260, costPerLead: "₹576", visits: 42, bookings: 6, roi: "5.1x" },
                    { source: "Google Search (Near Airport Projects)", spend: "₹2,10,000", leads: 310, costPerLead: "₹677", visits: 72, bookings: 10, roi: "7.8x" },
                  ].map((row, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{row.source}</div>
                        <div className="text-[11px] text-slate-500">Spend: {row.spend} • {row.leads} leads • CPL: <span className="font-mono font-bold text-slate-700">{row.costPerLead}</span></div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-purple-700 font-mono">{row.roi} ROI</span>
                        <div className="text-[10px] text-slate-500">{row.bookings} closed bookings</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONVERSION ANALYTICS */}
          {activeTab === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#e11d48] font-bold text-xs tracking-wider uppercase block">
                  CONVERSION ANALYTICS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Identify Sales Drop-Offs <br />
                  <span className="text-rose-600">Before Units Go Stale</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Diagnose exact leakage points in your pre-sales funnel. Understand if prospects are dropping after the initial WhatsApp brochure, during cab scheduling, or post-cost sheet preparation.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Avg Site Visit Show-up</span>
                    <strong className="text-base text-slate-900">78.2%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <span className="text-rose-700 block">Token Conversion</span>
                    <strong className="text-base text-rose-800">18.6%</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Funnel Velocity Telemetry</span>
                <div className="space-y-2 text-xs">
                  {[
                    { stage: "1. Portal Ingestion → First Response", count: "1,280 leads", speed: "1.8 mins avg SLA", drop: "4.2% drop" },
                    { stage: "2. WhatsApp Brochure → Confirmed Site Visit", count: "842 chats", speed: "4.2 hrs avg", drop: "18.4% drop" },
                    { stage: "3. Site Lounge Check-in → Unit Negotiation", count: "386 visits", speed: "Same-day", drop: "12.1% drop" },
                    { stage: "4. Unit Stacking Lock → Token Receipt", count: "94 holds", speed: "28 mins avg hold", drop: "6.8% drop" },
                  ].map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{s.stage}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{s.count} • {s.speed}</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 font-mono">{s.drop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MILESTONE COLLECTIONS */}
          {activeTab === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#107e43] font-bold text-xs tracking-wider uppercase block">
                  MILESTONE COLLECTIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Architect-Certified Billing <br />
                  <span className="text-emerald-600">Dispatched in Seconds</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  When your site structural engineer marks a slab complete, Pulse triggers automated WhatsApp payment demand letters with direct UPI/NetBanking links and two-way sync with Tally ERP.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong>48% faster cashflow turnaround</strong> compared to legacy postal notices.
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Live Construction Milestone Ledger</span>
                <div className="space-y-2 text-xs">
                  {[
                    { milestone: "Foundation Plinth — Wing B", demand: "₹12.4 Cr", collected: "₹12.4 Cr", progress: "100%", status: "Reconciled" },
                    { milestone: "Slab 8 Cast — Wing A", demand: "₹6.8 Cr", collected: "₹5.9 Cr", progress: "86%", status: "4 Reminders Left" },
                    { milestone: "Brickwork & Electrical — Wing C", demand: "₹4.2 Cr", collected: "₹2.8 Cr", progress: "66%", status: "In-Progress" },
                  ].map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">{m.milestone}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Demand: {m.demand} • Collected: <span className="text-emerald-700 font-bold">{m.collected}</span></div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700 font-mono">{m.progress}</span>
                        <div className="text-[10px] text-slate-500 mt-0.5">{m.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI ACTION CENTER */}
          {activeTab === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[#7c3aed] font-bold text-xs tracking-wider uppercase block">
                  AI ACTION CENTER
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Proactive Intelligence. <br />
                  <span className="text-purple-600">Never Miss a High-Value Buyer.</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pulse scans your database around the clock to detect high-intent repeat website visitors, re-engage stale prospects with revised festival offers, and flag at-risk unit holds before timers expire.
                </p>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
                  <strong>✦ 94 High-Intent VIP Actions Ready Today</strong>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">AI Recommended Interventions</span>
                <div className="space-y-2 text-xs">
                  {[
                    { title: "Unit 1402 Hold Timer Expiring in 8 mins", action: "Call buyer Rajesh Varma or release unit to waitlist", priority: "Urgent", color: "bg-rose-50 text-rose-700 border-rose-200" },
                    { title: "14 Site Visitors for Saturday have not confirmed pickup", action: "Trigger automated WhatsApp cab dispatch now", priority: "High", color: "bg-amber-50 text-amber-700 border-amber-200" },
                    { title: "42 Stale Inquiries viewed price-drop announcement", action: "Broadcast VIP launch offer with 1-click token lock", priority: "Revenue", color: "bg-purple-50 text-purple-700 border-purple-200" },
                  ].map((rec, idx) => (
                    <div key={idx} className={`p-3.5 rounded-2xl border ${rec.color} flex items-center justify-between gap-3`}>
                      <div>
                        <div className="font-bold">{rec.title}</div>
                        <div className="text-[11px] opacity-80 mt-0.5">{rec.action}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-1 rounded-md bg-white/80 shrink-0">
                        {rec.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
