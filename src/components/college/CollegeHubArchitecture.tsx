"use client";

import React from "react";
import Image from "next/image";

// SVG Icons tailored for the Hub Diagram
function MetaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 4.332c-2.83 0-5.26 1.632-6.666 4.02C3.93 5.955 2.15 4.332 0 4.332v4.86c1.396 0 2.592.832 3.125 2.037.166.377.29.774.37 1.185H0v3.424h3.495c-.08.411-.204.808-.37 1.185-.533 1.205-1.729 2.037-3.125 2.037v4.86c2.15 0 3.93-1.623 5.334-4.02 1.406 2.397 3.836 4.02 6.666 4.02 4.418 0 8-3.582 8-8s-3.582-8-8-8zm0 12.576c-2.527 0-4.576-2.049-4.576-4.576s2.049-4.576 4.576-4.576 4.576 2.049 4.576 4.576-2.049 4.576-4.576 4.576z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function KeyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="16.5" r="5.5" />
    </svg>
  );
}

function BellIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function RefreshCwIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function LaptopPhoneIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="10" x="2" y="3" rx="2" />
      <path d="M12 17H2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2h-3" />
      <rect width="6" height="10" x="16" y="10" rx="1" />
    </svg>
  );
}

export default function CollegeHubArchitecture() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#f5f8fc] border-b border-slate-200 overflow-hidden">
      {/* Background Soft Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-[radial-gradient(circle,rgba(31,95,214,0.08)_0%,rgba(16,185,129,0.04)_45%,transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1f5fd6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f5fd6] animate-pulse" />
            Unified Higher Education Backbone
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 mt-4 leading-[1.18] text-balance">
            Every Campus Department Connected to{" "}
            <span className="text-[#1f5fd6]">One Unified Account</span>
          </h2>

          <p className="mt-3.5 text-slate-600 text-base sm:text-lg leading-relaxed text-pretty">
            Stop stitching together isolated spreadsheets, admissions CRMs, and campus ERPs. Uptrix coordinates your entire student lifecycle on a single, synchronized database.
          </p>
        </div>

        {/* =========================================================================
            HUB-AND-SPOKE ARCHITECTURAL CANVAS (Exact Matching Aesthetic)
        ========================================================================== */}
        <div className="relative mx-auto max-w-[1080px] rounded-[36px] bg-gradient-to-b from-[#fafdff]/95 via-[#f6faff]/90 to-[#edf4fc] p-6 sm:p-10 lg:p-14 border border-blue-100 shadow-[0_20px_60px_-15px_rgba(31,95,214,0.08)]">
          
          {/* Radial Concentric Guides (Decorative Circles & Rays) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Outermost Ring */}
            <div className="w-[680px] h-[680px] rounded-full border border-blue-200/40" />
            {/* Mid Ring */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-200/60" />
            {/* Inner Ring */}
            <div className="absolute w-[290px] h-[290px] rounded-full border-2 border-dashed border-blue-300/70 animate-[spin_60s_linear_infinite]" />
          </div>

          {/* Connective Ray Lines (Desktop Visible) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
            {/* Top Connector */}
            <div className="absolute top-[130px] left-1/2 -translate-x-1/2 w-0.5 h-16 bg-blue-300/80" />
            <div className="absolute top-[130px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />

            {/* Left Connector */}
            <div className="absolute top-[340px] left-[295px] w-20 h-0.5 bg-blue-300/80" />
            <div className="absolute top-[340px] left-[375px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />

            {/* Right Connector */}
            <div className="absolute top-[340px] right-[295px] w-20 h-0.5 bg-blue-300/80" />
            <div className="absolute top-[340px] right-[375px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />

            {/* Bottom Left Ray */}
            <div className="absolute bottom-[230px] left-[320px] w-20 h-0.5 rotate-[35deg] bg-blue-300/80 origin-left" />
            <div className="absolute bottom-[210px] left-[330px] w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              <LockIcon className="w-3 h-3 text-white" />
            </div>

            {/* Bottom Center Ray */}
            <div className="absolute bottom-[165px] left-1/2 -translate-x-1/2 w-0.5 h-16 bg-blue-300/80" />
            <div className="absolute bottom-[170px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />

            {/* Bottom Right Ray */}
            <div className="absolute bottom-[230px] right-[320px] w-20 h-0.5 -rotate-[35deg] bg-blue-300/80 origin-right" />
            <div className="absolute bottom-[210px] right-[330px] w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>

          {/* =========================================================================
              RADIAL CONTENT GRID
          ========================================================================== */}
          <div className="relative z-10 flex flex-col gap-8 sm:gap-10">

            {/* TOP CARD: Channel & Lead Ingestion (App Access) */}
            <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-4 sm:p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] text-center">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-mono">
                Omnichannel Lead &amp; App Access
              </span>
              <div className="grid grid-cols-6 gap-2 items-center justify-center">
                {/* Meta */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877f2] flex items-center justify-center border border-blue-100 shadow-2xs">
                    <MetaIcon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">Meta</span>
                </div>
                {/* Instagram */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-pink-50 text-[#e4405f] flex items-center justify-center border border-pink-100 shadow-2xs">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17.5" cy="6.5" r="1.5" />
                    </svg>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">Instagram</span>
                </div>
                {/* WhatsApp */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25d366] flex items-center justify-center border border-emerald-100 shadow-2xs">
                    <WhatsAppIcon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">WhatsApp</span>
                </div>
                {/* Google */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-amber-50 text-[#ea4335] flex items-center justify-center border border-amber-100 shadow-2xs font-bold font-sans text-base">
                    G
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">Google Ads</span>
                </div>
                {/* Shiksha */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-2xs">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                      <path d="M6 6h10" />
                      <path d="M6 10h10" />
                    </svg>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">Portals</span>
                </div>
                {/* + More */}
                <div className="flex flex-col items-center gap-1.5">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 border border-dashed border-slate-300 flex items-center justify-center font-bold text-sm">
                    +
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">More</span>
                </div>
              </div>
            </div>

            {/* MIDDLE ROW: Left Card, Center Hub, Right Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* LEFT CARD: Device & Workspace Integration */}
              <div className="lg:col-span-4 rounded-2xl bg-white p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-mono">
                  Device &amp; Console Access
                </span>
                
                {/* Visual Devices Mockup */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center gap-3">
                  <div className="w-24 h-16 rounded-lg bg-slate-900 text-white p-1.5 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-[7px] font-mono text-slate-300">Uptrix Web</span>
                    </div>
                    <div className="h-6 w-full rounded bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[8px] font-bold text-blue-300">
                      CRM Desktop
                    </div>
                  </div>
                  <div className="w-11 h-20 rounded-xl bg-slate-900 text-white p-1 flex flex-col justify-between border-2 border-slate-800 shadow-sm">
                    <div className="w-2.5 h-0.5 bg-slate-700 rounded-full mx-auto" />
                    <div className="h-12 w-full rounded-md bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-[7px] font-bold text-emerald-300">
                      Counselor App
                    </div>
                    <div className="w-2 h-0.5 bg-slate-700 rounded-full mx-auto" />
                  </div>
                </div>

                {/* 3 Sub-bullets */}
                <div className="grid grid-cols-3 gap-1 pt-4 text-center border-t border-slate-100 mt-4 text-[10px] text-slate-600 font-medium">
                  <div>
                    <span className="block font-bold text-slate-800">Cloud Sync</span>
                    <span className="text-slate-400 text-[9px]">Live Data</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">Auto Route</span>
                    <span className="text-slate-400 text-[9px]">Instant SLA</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">All Devices</span>
                    <span className="text-slate-400 text-[9px]">iOS &amp; Android</span>
                  </div>
                </div>
              </div>

              {/* CENTER HUB: Concentric Unified Campus Account Circle */}
              <div className="lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
                <div className="relative flex items-center justify-center">
                  
                  {/* Outer Pulsing Glow Circle */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-blue-500/20 to-teal-400/20 border-2 border-blue-400/50 p-3 shadow-2xl flex items-center justify-center">
                    
                    {/* Inner Pure White Hub Card */}
                    <div className="w-full h-full rounded-full bg-white shadow-xl flex flex-col items-center justify-center p-4 text-center border border-blue-200/80">
                      
                      {/* Logo Infinity / Connected Engine Emblem */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1f5fd6] to-[#0f8b8d] text-white flex items-center justify-center shadow-md mb-2">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 3a9.004 9.004 0 0 1 8.716 6.747M12 3a9.004 9.004 0 0 0-8.716 6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 9v6m-3-3h6" />
                        </svg>
                      </div>

                      <strong className="font-display text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                        Unified Campus
                      </strong>
                      <span className="text-[11px] font-mono font-bold text-[#1f5fd6] uppercase tracking-wider mt-0.5">
                        Operating System
                      </span>

                      {/* Small Verified Profile Pill */}
                      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 border border-blue-200 text-[10px] font-bold text-[#1f5fd6]">
                        <span className="w-2 h-2 rounded-full bg-[#1f5fd6]" />
                        <span>Single Source of Truth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD: Security & Compliance Controls */}
              <div className="lg:col-span-4 rounded-2xl bg-white p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-mono">
                  Institutional Security Controls
                </span>

                <div className="space-y-2.5 text-xs">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-800 text-[11px]">Two-Factor Biometric Auth</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-700 border border-emerald-200">
                      Enabled
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <KeyIcon className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-800 text-[11px]">DigiLocker &amp; Aadhaar Verification</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-700 border border-emerald-200">
                      Enabled
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <BellIcon className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-800 text-[11px]">Role-Based Access Alerts</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-700 border border-emerald-200">
                      Enabled
                    </span>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2">
                      <LockIcon className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-800 text-[11px]">NAAC &amp; NIRF Audit Trails</span>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold font-mono text-emerald-700 border border-emerald-200">
                      Enabled
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM ROW: Bottom Left, Bottom Center, Bottom Right */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* BOTTOM LEFT: One Student Identity */}
              <div className="lg:col-span-3 rounded-2xl bg-white p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                    ✓
                  </div>
                  <strong className="font-display text-sm font-bold text-slate-900 block leading-tight">
                    One Student Identity
                  </strong>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Lifetime student records from admission to alumni.
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mt-3 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">CRM</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">LMS</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">Fees</span>
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium">Exams</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">+3</span>
                </div>
              </div>

              {/* BOTTOM CENTER: Centralized Settings & Core Modules */}
              <div className="lg:col-span-6 rounded-2xl bg-white p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] flex flex-col justify-between text-center">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-mono">
                  Integrated Institutional Modules
                </span>

                <div className="grid grid-cols-5 gap-2 items-center justify-center">
                  {/* Module 1 */}
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-blue-50/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Admissions CRM</span>
                  </div>

                  {/* Module 2 */}
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Fee Engine</span>
                  </div>

                  {/* Module 3 */}
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-indigo-50/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Tally Prime</span>
                  </div>

                  {/* Module 4 */}
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-amber-50/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">Campus ERP</span>
                  </div>

                  {/* Module 5 */}
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-teal-50/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                      <WhatsAppIcon className="w-4 h-4 text-teal-700" />
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">WhatsApp API</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM RIGHT: Data Synchronized Card */}
              <div className="lg:col-span-3 rounded-2xl bg-white p-5 border border-blue-100 shadow-[0_8px_25px_rgba(31,95,214,0.06)] flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      ●
                    </span>
                    <span className="text-xs font-bold text-slate-900">Your Data. Synchronized.</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 mt-2">
                    <li className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-[11px]">Zero duplicate data entry</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-[11px]">Real-time bi-directional sync</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-[11px]">100% data sovereignty</span>
                    </li>
                  </ul>
                </div>

                {/* Floating Animated Sync Badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Status</span>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                    <RefreshCwIcon className="w-3 h-3 animate-spin" />
                    <span>Always in Sync</span>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM REASSURANCE PILL (Exact Meta Reference Match) */}
            <div className="mx-auto inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 border border-blue-100 shadow-sm text-xs text-slate-700">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="font-medium text-slate-700">
                <strong className="font-bold text-slate-900">Secure. Dedicated Cloud. Connected.</strong> One unified platform for modern higher education.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
