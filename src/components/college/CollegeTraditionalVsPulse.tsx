"use client";

import React, { useState } from "react";

// WhatsApp Logo SVG
function WhatsAppLogo({ className = "w-4 h-4 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// 3D Database Cylinder Icon
function DatabaseCylinderIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="#94a3b8" />
      <path d="M4 5v5c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#64748b" strokeWidth="1.5" fill="#cbd5e1" />
      <path d="M4 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#64748b" strokeWidth="1.5" fill="#94a3b8" />
      <path d="M4 15v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#475569" strokeWidth="1.5" fill="#64748b" />
    </svg>
  );
}

// Checkmark circle with custom colors
function CheckCircle({ bg = "bg-[#2563eb]" }: { bg?: string }) {
  return (
    <span className={`w-5 h-5 rounded-full ${bg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
      <svg className="w-3 h-3 stroke-white stroke-[2.8]" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

interface ComparisonRow {
  id: string;
  feature: string;
  featureIcon: string;
  iconBg: string;
  iconColor: string;
  traditional: string;
  pulse: string;
  pulseCheckBg: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    id: "lead-mgmt",
    feature: "Lead Management",
    featureIcon: "users",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]",
    traditional: "Stores leads",
    pulse: "Understands leads",
    pulseCheckBg: "bg-[#0284c7]"
  },
  {
    id: "reporting",
    feature: "Reporting",
    featureIcon: "chart",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#7c3aed]",
    traditional: "Shows reports",
    pulse: "Explains the numbers",
    pulseCheckBg: "bg-[#7c3aed]"
  },
  {
    id: "lead-assign",
    feature: "Lead Assignment",
    featureIcon: "user-group",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    traditional: "Manual lead assignment",
    pulse: "Intelligent assignment",
    pulseCheckBg: "bg-[#16a34a]"
  },
  {
    id: "follow-ups",
    feature: "Follow-ups",
    featureIcon: "bell",
    iconBg: "bg-[#ffedd5]",
    iconColor: "text-[#ea580c]",
    traditional: "Manual follow-ups",
    pulse: "Automated follow-up workflows",
    pulseCheckBg: "bg-[#ea580c]"
  },
  {
    id: "whatsapp",
    feature: "WhatsApp / Meta Integration",
    featureIcon: "whatsapp",
    iconBg: "bg-[#25d366]",
    iconColor: "text-white",
    traditional: "WhatsApp alongside CRM",
    pulse: "Meta conversations inside CRM",
    pulseCheckBg: "bg-[#16a34a]"
  },
  {
    id: "mktg-spend",
    feature: "Marketing Spend",
    featureIcon: "megaphone",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#9333ea]",
    traditional: "Tracks marketing spend",
    pulse: "Calculates lead & acquisition cost",
    pulseCheckBg: "bg-[#7c3aed]"
  },
  {
    id: "revenue-track",
    feature: "Revenue Tracking",
    featureIcon: "coins",
    iconBg: "bg-[#fef9c3]",
    iconColor: "text-[#ca8a04]",
    traditional: "Shows revenue",
    pulse: "Connects revenue to campaigns",
    pulseCheckBg: "bg-[#eab308]"
  },
  {
    id: "dashboards",
    feature: "Dashboards",
    featureIcon: "grid",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#2563eb]",
    traditional: "Static dashboards",
    pulse: "AI-powered dashboards",
    pulseCheckBg: "bg-[#2563eb]"
  },
  {
    id: "data-usage",
    feature: "Data Usage",
    featureIcon: "database",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#6938ef]",
    traditional: "Data for reporting",
    pulse: "Data for decisions",
    pulseCheckBg: "bg-[#6938ef]"
  }
];

export default function CollegeTraditionalVsPulse() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8faff] via-white to-[#f5f8ff] border-b border-slate-200/80 overflow-hidden font-sans">
      
      {/* Ambient background glows matching theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-10 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,#eff6ff_0,transparent_60%)] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-0 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,#f5f3ff_0,transparent_60%)] opacity-80"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 flex flex-col gap-9 sm:gap-11">
        
        {/* =========================================================================
            HEADER: TRADITIONAL CRM vs. PULSE
        ========================================================================== */}
        <header className="text-center">
          {/* Eyebrow Badge: TRADITIONAL CRM vs. PULSE */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white border border-[#c4b5fd] shadow-2xs mb-3.5">
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wider">
              TRADITIONAL CRM
            </span>
            <span className="text-[11px] sm:text-xs font-black text-[#2563eb]">
              vs.
            </span>
            <span className="text-[11px] sm:text-xs font-black text-[#6938ef] tracking-wider">
              PULSE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0f172a] tracking-tight leading-tight m-0">
            The AI CRM That Turns<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed]">
              Business Data Into Action
            </span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mt-2.5 max-w-[620px] mx-auto">
            Acquire smarter. Follow up faster. Convert better. Collect more.
          </p>
        </header>

        {/* =========================================================================
            3-COLUMN COMPARISON TABLE (Matching Reference Image 1:1)
        ========================================================================== */}
        <div className="relative">
          
          {/* Sparkle lines on top-right of Pulse card */}
          <div className="hidden lg:block absolute -top-5 right-2 z-20 pointer-events-none text-[#a855f7]">
            <svg className="w-9 h-7" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="8" y1="20" x2="2" y2="6" />
              <line x1="18" y1="20" x2="18" y2="2" />
              <line x1="28" y1="20" x2="34" y2="6" />
            </svg>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            
            {/* ---------------------------------------------------------------------
                COLUMN 1: FEATURES LIST (Left 4 cols)
            ---------------------------------------------------------------------- */}
            <div className="md:col-span-4 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col">
              {/* Column Top Spacer (aligns with headers in Col 2 & Col 3) */}
              <div className="h-[78px] p-4 flex items-center border-b border-slate-100/90">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Feature Comparison
                </span>
              </div>

              {/* 9 Feature Rows */}
              <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-around">
                {comparisonRows.map((row) => (
                  <div
                    key={row.id}
                    className="h-[52px] sm:h-[56px] px-4 sm:px-5 flex items-center gap-3 hover:bg-slate-50/70 transition-colors"
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${row.iconBg} ${row.iconColor} flex items-center justify-center shrink-0 shadow-2xs font-bold`}
                    >
                      {row.featureIcon === "users" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                      )}
                      {row.featureIcon === "chart" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                        </svg>
                      )}
                      {row.featureIcon === "user-group" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.5c0-1.12.44-2.16 1.19-2.97-.4-.02-.8-.03-1.19-.03z" />
                        </svg>
                      )}
                      {row.featureIcon === "bell" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                      )}
                      {row.featureIcon === "whatsapp" && <WhatsAppLogo className="w-4 h-4 text-white" />}
                      {row.featureIcon === "megaphone" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M20 2v3h-2V4h-1.5c-2.48 0-4.5 2.02-4.5 4.5V10h-2V8.5C10 5.46 12.46 3 15.5 3H18V2h2zM3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                      )}
                      {row.featureIcon === "coins" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 3.79 2 6s4.48 4 10 4 10-1.79 10-4-4.48-4-10-4zm0 6c-4.41 0-8-1.34-8-2s3.59-2 8-2 8 1.34 8 2-3.59 2-8 2zm0 3c-5.52 0-10-1.79-10-4v3c0 2.21 4.48 4 10 4s10-1.79 10-4V7c0 2.21-4.48 4-10 4zm0 5c-5.52 0-10-1.79-10-4v3c0 2.21 4.48 4 10 4s10-1.79 10-4v-3c0 2.21-4.48 4-10 4z" />
                        </svg>
                      )}
                      {row.featureIcon === "grid" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
                        </svg>
                      )}
                      {row.featureIcon === "database" && (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.41 0 8 1.34 8 2s-3.59 2-8 2-8-1.34-8-2 3.59-2 8-2z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                      {row.feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------------
                COLUMN 2: TRADITIONAL CRM (Center 4 cols)
            ---------------------------------------------------------------------- */}
            <div className="md:col-span-4 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col text-center">
              {/* Column Header */}
              <div className="h-[78px] p-3 flex items-center justify-center gap-2.5 border-b border-slate-100/90 bg-slate-50/40">
                <DatabaseCylinderIcon className="w-6 h-6 shrink-0" />
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight m-0">
                    Traditional CRM
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium block leading-tight">
                    Stores information
                  </span>
                </div>
              </div>

              {/* 9 Feature Status Rows */}
              <div className="divide-y divide-slate-100 flex-1 flex flex-col justify-around">
                {comparisonRows.map((row) => (
                  <div
                    key={row.id}
                    className="h-[52px] sm:h-[56px] px-3 flex items-center justify-center text-xs sm:text-[13px] text-slate-600 font-medium hover:bg-slate-50/50 transition-colors"
                  >
                    {row.traditional}
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------------
                COLUMN 3: PULSE (Right 4 cols - Highlighted Purple Hero)
            ---------------------------------------------------------------------- */}
            <div className="md:col-span-4 bg-gradient-to-b from-[#f5f3ff] via-[#f8faff] to-white flex flex-col relative shadow-[inset_0_0_0_1.5px_rgba(105,56,239,0.35)] rounded-b-3xl md:rounded-b-none md:rounded-r-3xl overflow-hidden">
              
              {/* Column Header: Vibrant Purple Gradient Banner */}
              <div className="h-[78px] px-4 py-3 bg-gradient-to-r from-[#2563eb] via-[#5825df] to-[#6938ef] text-white flex flex-col items-center justify-center text-center shadow-md">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">✦</span>
                  <h4 className="font-extrabold text-base sm:text-lg tracking-wide text-white m-0">
                    Pulse
                  </h4>
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/90 font-medium block leading-tight mt-0.5">
                  Understands and acts on your data
                </span>
              </div>

              {/* 9 Pulse Feature Rows with Checkmarks */}
              <div className="divide-y divide-purple-100/70 flex-1 flex flex-col justify-around p-1.5 sm:p-2">
                {comparisonRows.map((row) => (
                  <div
                    key={row.id}
                    className="h-[52px] sm:h-[56px] px-3 sm:px-4 rounded-xl bg-white border border-purple-100/80 shadow-2xs flex items-center gap-2.5 my-0.5 hover:border-[#6938ef] hover:shadow-xs transition-all"
                  >
                    <CheckCircle bg={row.pulseCheckBg} />
                    <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 truncate">
                      {row.pulse}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION BANNER (Matching Reference Image 1:1)
        ========================================================================== */}
        <div className="relative rounded-[28px] sm:rounded-[34px] bg-white border-2 border-[#c4b5fd]/80 p-5 sm:p-7 lg:p-8 shadow-[0_20px_45px_rgba(105,56,239,0.08)] flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 overflow-hidden">
          
          {/* Top-Right Decorative Flow Arrow */}
          <div className="absolute top-4 right-6 hidden lg:block text-[#6938ef] pointer-events-none">
            <svg className="w-12 h-10" viewBox="0 0 50 40" fill="none">
              <path
                d="M 5 35 C 15 25, 30 18, 42 8"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 28 6 L 44 7 L 43 23"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Left Mini Cockpit / Window Mockup */}
          <div className="relative w-full max-w-[340px] shrink-0">
            {/* Background window card */}
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-3">
              {/* Chrome dots */}
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>

              {/* Curvy Line Chart */}
              <div className="py-3 h-20 flex items-center justify-center">
                <svg className="w-full h-full text-[#6938ef]" viewBox="0 0 200 60" fill="none">
                  <path
                    d="M 10 50 Q 50 10, 90 35 T 150 15 T 190 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="10" cy="50" r="3" fill="#6938ef" />
                  <circle cx="90" cy="35" r="3" fill="#6938ef" />
                  <circle cx="150" cy="15" r="3" fill="#6938ef" />
                  <circle cx="190" cy="5" r="4" fill="#2563eb" />
                </svg>
              </div>
            </div>

            {/* Overlapping Floating Badge 1: New Lead from WhatsApp */}
            <div className="absolute -bottom-3 -left-3 z-10 rounded-2xl bg-white border border-slate-200 shadow-md p-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <WhatsAppLogo className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <strong className="block text-[10px] font-extrabold text-slate-900 leading-tight">
                  New Lead
                </strong>
                <span className="text-[8px] text-slate-400 block leading-tight">
                  from WhatsApp
                </span>
                <span className="text-[7.5px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Converted
                </span>
              </div>
            </div>

            {/* Overlapping Floating Badge 2: Revenue +68% */}
            <div className="absolute -bottom-3 -right-2 z-10 rounded-2xl bg-white border border-slate-200 shadow-md p-2 flex items-center gap-2.5">
              <div>
                <span className="text-[8.5px] font-semibold text-slate-400 block">Revenue</span>
                <span className="text-xs font-black text-slate-900">+68%</span>
              </div>
              <div className="flex items-end gap-1 h-6">
                <span className="w-1.5 h-2 bg-blue-300 rounded-t-sm" />
                <span className="w-1.5 h-3 bg-blue-400 rounded-t-sm" />
                <span className="w-1.5 h-4.5 bg-blue-500 rounded-t-sm" />
                <span className="w-1.5 h-6 bg-blue-600 rounded-t-sm" />
              </div>
            </div>
          </div>

          {/* Right Copy & CTA Buttons */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0f172a] leading-snug tracking-tight m-0">
              Stop Managing Your CRM.<br />
              <span className="text-[#2563eb]">Start Running Your Business From It.</span>
            </h3>

            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2 mb-4 max-w-[560px]">
              CRM-Pulse brings AI dashboards, lead automation, Meta conversations, follow-ups, marketing intelligence and payment analytics into one intelligent platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#lead-capture"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#6938ef] to-[#7c3aed] text-white text-xs sm:text-[13px] font-bold shadow-md hover:opacity-95 transition-opacity"
              >
                <span>See what Pulse can do for your business</span>
                <span>→</span>
              </a>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-[#6938ef] text-xs sm:text-[13px] font-bold hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <span>📅</span>
                <span>Book a free demo</span>
              </button>

              <a
                href="#lead-capture"
                className="text-xs sm:text-[13px] font-bold text-[#6938ef] hover:underline ml-1"
              >
                Start your free trial →
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Demo Modal Trigger */}
      {showDemoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-base text-slate-900 m-0">Schedule a Live Demo</h4>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Experience the power of Pulse AI CRM for your institution. Our advisors will walk you through live Meta conversation integrations, lead automation, and analytics.
            </p>
            <a
              href="#lead-capture"
              onClick={() => setShowDemoModal(false)}
              className="block w-full text-center py-3 rounded-xl bg-[#6938ef] text-white font-bold text-xs"
            >
              Continue to Registration
            </a>
          </div>
        </div>
      )}

    </section>
  );
}
