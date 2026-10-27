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

// 3D Database Cylinder Icon (Silver/Slate Metallic)
function DatabaseCylinderIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <ellipse cx="16" cy="7" rx="10" ry="4" fill="#94a3b8" />
      <ellipse cx="16" cy="6" rx="10" ry="4" fill="#cbd5e1" />
      <path d="M6 7v6c0 2.21 4.48 4 10 4s10-1.79 10-4V7" stroke="#64748b" strokeWidth="1.5" fill="#94a3b8" />
      <path d="M6 13v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6" stroke="#475569" strokeWidth="1.5" fill="#64748b" />
      <path d="M6 19v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6" stroke="#334155" strokeWidth="1.5" fill="#475569" />
    </svg>
  );
}

// Checkmark circle with custom colors
function CheckCircle({ bg = "bg-[#2563eb]" }: { bg?: string }) {
  return (
    <span className={`w-5 h-5 rounded-full ${bg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
      <svg className="w-3 h-3 stroke-white stroke-[3]" fill="none" viewBox="0 0 24 24">
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
    id: "portal-sync",
    feature: "Portal Lead Capture",
    featureIcon: "users",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#0284c7]",
    traditional: "Manual CSV exports 2x daily; 6hr delay",
    pulse: "Instant webhook capture in <2.4s",
    pulseCheckBg: "bg-[#0284c7]",
  },
  {
    id: "reporting",
    feature: "Executive Reporting",
    featureIcon: "chart",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#7c3aed]",
    traditional: "Static Excel sales reports",
    pulse: "AI-explained cashflow intelligence",
    pulseCheckBg: "bg-[#7c3aed]",
  },
  {
    id: "lead-assign",
    feature: "Lead Assignment",
    featureIcon: "user-group",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    traditional: "Manual round-robin allocation",
    pulse: "Intelligent AI intent assignment",
    pulseCheckBg: "bg-[#16a34a]",
  },
  {
    id: "follow-ups",
    feature: "Follow-ups & Site Visits",
    featureIcon: "bell",
    iconBg: "bg-[#ffedd5]",
    iconColor: "text-[#ea580c]",
    traditional: "Paper registers; 60% no-shows",
    pulse: "WhatsApp GPS pins & cab dispatch",
    pulseCheckBg: "bg-[#ea580c]",
  },
  {
    id: "whatsapp",
    feature: "WhatsApp / Meta API",
    featureIcon: "whatsapp",
    iconBg: "bg-[#25d366]",
    iconColor: "text-white",
    traditional: "Personal phones; lost chats",
    pulse: "Official Meta conversations inside CRM",
    pulseCheckBg: "bg-[#16a34a]",
  },
  {
    id: "mktg-spend",
    feature: "Marketing Spend & CAC",
    featureIcon: "megaphone",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#9333ea]",
    traditional: "Tracks spend without lead quality",
    pulse: "Calculates cost per walk-in & booking",
    pulseCheckBg: "bg-[#7c3aed]",
  },
  {
    id: "inventory",
    feature: "Live Inventory Matrix",
    featureIcon: "coins",
    iconBg: "bg-[#fef9c3]",
    iconColor: "text-[#ca8a04]",
    traditional: "Offline sheets; double-bookings",
    pulse: "3D stacking matrix with 30m locks",
    pulseCheckBg: "bg-[#eab308]",
  },
  {
    id: "cp-portal",
    feature: "Channel Partner Portal",
    featureIcon: "grid",
    iconBg: "bg-[#e0f2fe]",
    iconColor: "text-[#2563eb]",
    traditional: "Broker disputes over walk-in clients",
    pulse: "90-day cryptographic client lock",
    pulseCheckBg: "bg-[#2563eb]",
  },
  {
    id: "milestones",
    feature: "Milestone Collections",
    featureIcon: "database",
    iconBg: "bg-[#f3e8ff]",
    iconColor: "text-[#6938ef]",
    traditional: "Delayed paper demand letters",
    pulse: "Architect-certified WhatsApp links",
    pulseCheckBg: "bg-[#6938ef]",
  },
];

export default function RealEstateTraditionalVsPulse() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden font-sans border-b border-slate-200/80">
      
      <div className="relative mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12">
        
        {/* =========================================================================
            HEADER: TRADITIONAL CRM vs. PULSE
        ========================================================================== */}
        <header className="text-center">
          {/* Eyebrow Badge: TRADITIONAL CRM vs. PULSE */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white border border-[#c4b5fd] shadow-2xs mb-4">
            <span className="text-[11px] sm:text-xs font-extrabold text-[#1e293b] tracking-wider">
              TRADITIONAL CRM
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-[#3b82f6]">
              vs.
            </span>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#6938ef] tracking-wider">
              PULSE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0b0f19] tracking-tight leading-[1.15] m-0">
            The AI PropTech That Turns<br />
            <span className="text-[#2563eb]">
              Real Estate Data Into Action
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed mt-3 max-w-[650px] mx-auto">
            Acquire smarter. Follow up faster. Convert better. Collect more.
          </p>
        </header>

        {/* =========================================================================
            3-COLUMN COMPARISON TABLE (Exact Match to Reference Image)
        ========================================================================== */}
        <div className="relative">
          
          {/* Three Sparkle Rays on top-right of Pulse card */}
          <div className="hidden md:block absolute -top-5.5 right-4 lg:right-5 z-30 pointer-events-none text-[#9333ea]">
            <svg className="w-8 h-6" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="20" x2="2" y2="4" />
              <line x1="16" y1="20" x2="16" y2="2" />
              <line x1="26" y1="20" x2="30" y2="4" />
            </svg>
          </div>

          {/* Horizontal scroll on mobile to keep layout intact */}
          <div className="overflow-x-auto pb-4 md:overflow-visible">
            <div className="min-w-[800px] md:min-w-0 flex items-stretch">
              
              {/* -------------------------------------------------------------------
                  LEFT CONTAINER: COL 1 (Features) + COL 2 (Traditional CRM)
              -------------------------------------------------------------------- */}
              <div className="w-[62%] rounded-l-3xl border-2 border-[#60a5fa] bg-white flex overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                
                {/* COLUMN 1: Features List */}
                <div className="w-[45%] border-r-2 border-[#60a5fa] flex flex-col bg-white">
                  <div className="h-[84px] border-b border-slate-200 shrink-0" />

                  <div className="flex-1 flex flex-col justify-between">
                    {comparisonRows.map((row) => (
                      <div
                        key={row.id}
                        className="h-[54px] px-4 sm:px-5 flex items-center gap-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors"
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
                        <span className="text-xs sm:text-[13.5px] font-bold text-[#0f172a] truncate">
                          {row.feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLUMN 2: Traditional CRM */}
                <div className="w-[55%] flex flex-col bg-white text-center">
                  <div className="h-[84px] px-3 flex items-center justify-center gap-3 border-b border-slate-200 bg-slate-50/20 shrink-0">
                    <DatabaseCylinderIcon className="w-7 h-7 shrink-0" />
                    <div className="text-left">
                      <h4 className="font-extrabold text-[#0f172a] text-sm leading-tight m-0">
                        Traditional CRM
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium block leading-tight mt-0.5">
                        Stores static leads
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    {comparisonRows.map((row) => (
                      <div
                        key={row.id}
                        className="h-[54px] px-3 flex items-center justify-center text-xs sm:text-[13.5px] text-slate-700 font-medium border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                      >
                        {row.traditional}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* -------------------------------------------------------------------
                  RIGHT CONTAINER: COLUMN 3 (PULSE - Highlighted Hero Column)
              -------------------------------------------------------------------- */}
              <div className="w-[38%] rounded-r-3xl border-2 border-[#7c3aed] bg-[#f8f7ff] flex flex-col relative overflow-hidden -ml-[2px] z-10 shadow-[0_15px_35px_rgba(124,58,237,0.1)]">
                
                {/* Column Header */}
                <div className="h-[84px] px-4 py-3 bg-[#6938ef] text-white flex flex-col items-center justify-center text-center shadow-sm shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">✦</span>
                    <h4 className="font-extrabold text-lg sm:text-xl tracking-wide text-white m-0">
                      Pulse
                    </h4>
                  </div>
                  <span className="text-[11px] sm:text-xs text-white/95 font-medium block leading-tight mt-0.5">
                    Understands and accelerates sales velocity
                  </span>
                </div>

                {/* Feature Rows */}
                <div className="flex-1 flex flex-col justify-between p-1.5 sm:p-2">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.id}
                      className="h-[54px] flex items-center justify-center px-1"
                    >
                      <div className="w-full h-[42px] px-3.5 sm:px-4 rounded-xl bg-white border border-purple-100/90 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center gap-2.5 sm:gap-3 hover:border-[#6938ef] hover:shadow-xs transition-all">
                        <CheckCircle bg={row.pulseCheckBg} />
                        <span className="text-xs sm:text-[13px] font-extrabold text-[#0f172a] truncate">
                          {row.pulse}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION BANNER (Exact Match to College Reference)
        ========================================================================== */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-white border-2 border-[#7c3aed] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(105,56,239,0.08)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 overflow-hidden">
          
          {/* Top-Right Decorative Flow Arrow */}
          <div className="absolute top-5 right-8 hidden lg:block text-[#6938ef] pointer-events-none">
            <svg className="w-14 h-12" viewBox="0 0 54 44" fill="none">
              <path
                d="M 6 38 C 18 28, 32 18, 46 8"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 30 7 L 47 7 L 46 24"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Left Sparkle Accents */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7c3aed] hidden sm:block">
            <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="20" y1="12" x2="4" y2="4" />
              <line x1="20" y1="20" x2="2" y2="20" />
              <line x1="20" y1="28" x2="4" y2="36" />
            </svg>
          </div>

          {/* Left Mini Cockpit / Window Mockup */}
          <div className="relative w-full max-w-[340px] shrink-0 my-3 sm:my-4">
            
            {/* Background window card */}
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-3.5 pb-6">
              {/* Chrome dots */}
              <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>

              {/* Purple pill bar & placeholders */}
              <div className="pt-3">
                <div className="w-14 h-3.5 rounded-full bg-[#8b5cf6]" />
                <div className="w-10 h-1.5 rounded-full bg-slate-200 mt-2" />
                <div className="w-16 h-1.5 rounded-full bg-slate-200 mt-1" />
              </div>

              {/* Rising Line Chart with Gradient Fill & Nodes */}
              <div className="pt-2 h-24 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 280 85" fill="none">
                  {/* Purple Zigzag Line */}
                  <path
                    d="M 10 65 L 55 70 L 95 40 L 140 52 L 185 22 L 230 30 L 275 10"
                    stroke="#7c3aed"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Circular Nodes */}
                  <circle cx="10" cy="65" r="3.5" fill="#7c3aed" />
                  <circle cx="55" cy="70" r="3.5" fill="#7c3aed" />
                  <circle cx="95" cy="40" r="3.5" fill="#7c3aed" />
                  <circle cx="140" cy="52" r="3.5" fill="#7c3aed" />
                  <circle cx="185" cy="22" r="3.5" fill="#7c3aed" />
                  <circle cx="230" cy="30" r="3.5" fill="#7c3aed" />
                  <circle cx="275" cy="10" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Overlapping Floating Badge 1: New Lead from WhatsApp */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 z-20 flex items-center">
              <div className="w-11 h-11 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg -mr-3 z-10 shrink-0">
                <WhatsAppLogo className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 py-2 px-3 pl-4.5 flex flex-col">
                <strong className="block text-[11px] font-extrabold text-slate-900 leading-tight">
                  New Lead
                </strong>
                <span className="text-[8.5px] text-slate-400 font-medium block leading-tight">
                  from WhatsApp
                </span>
                <span className="text-[8px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Site Visit Booked
                </span>
              </div>
            </div>

            {/* Overlapping Floating Badge 2: Revenue +68% */}
            <div className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 px-3.5 flex items-center gap-3">
              <div>
                <span className="text-[9px] font-semibold text-slate-400 block leading-tight">Bookings</span>
                <span className="text-sm font-black text-slate-900 leading-tight">+68%</span>
              </div>
              <div className="flex items-end gap-1 h-6">
                <span className="w-1.5 h-2 bg-blue-300 rounded-t-xs" />
                <span className="w-1.5 h-3 bg-blue-400 rounded-t-xs" />
                <span className="w-1.5 h-4.5 bg-blue-500 rounded-t-xs" />
                <span className="w-1.5 h-5.5 bg-blue-600 rounded-t-xs" />
                <span className="w-1.5 h-6.5 bg-blue-700 rounded-t-xs" />
              </div>
            </div>
          </div>

          {/* Middle Sparkle Accents */}
          <div className="pointer-events-none text-[#7c3aed] hidden lg:block shrink-0 -mx-1">
            <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="12" x2="20" y2="4" />
              <line x1="4" y1="20" x2="22" y2="20" />
              <line x1="4" y1="28" x2="20" y2="36" />
            </svg>
          </div>

          {/* Right Copy & CTA Buttons */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0f172a] leading-tight tracking-tight m-0">
              Stop Managing Your CRM.<br />
              <span className="text-[#2563eb]">Start Running Your Real Estate Business From It.</span>
            </h3>

            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mt-2.5 mb-5 max-w-[580px]">
              CRM-Pulse brings AI dashboards, instant portal webhooks, WhatsApp Meta API, 3D inventory locks, site visit dispatch and milestone cashflow into one intelligent operating system.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#interactive-cockpit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore PropTech Cockpit</span>
                <span>→</span>
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 shadow-2xs transition-all"
              >
                <span>Read Developer Case Studies</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
