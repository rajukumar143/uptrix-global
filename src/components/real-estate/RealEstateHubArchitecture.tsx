"use client";

import React from "react";
import Image from "next/image";

// Meta Icon
function MetaIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.962 4.332c-1.895 0-3.612.87-4.962 2.308-1.35-1.438-3.067-2.308-4.962-2.308C3.12 4.332 0 7.452 0 11.294c0 3.842 3.12 6.962 7.038 6.962 2.368 0 4.414-1.162 5.688-2.946 1.274 1.784 3.32 2.946 5.688 2.946 3.918 0 7.038-3.12 7.038-6.962 0-3.842-3.12-6.962-7.038-6.962zm-9.924 11.75c-2.684 0-4.864-2.18-4.864-4.864s2.18-4.864 4.864-4.864c1.88 0 3.518 1.074 4.34 2.666-.822 1.592-2.46 2.666-4.34 2.666zm9.924 0c-1.88 0-3.518-1.074-4.34-2.666.822-1.592 2.46-2.666 4.34-2.666 2.684 0 4.864 2.18 4.864 4.864s-2.18 4.864-4.864 4.864z" />
    </svg>
  );
}

// WhatsApp Icon
function WhatsAppIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// 99acres & MagicBricks Portal Icon
function PortalIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// Tally ERP Icon
function TallyIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default function RealEstateHubArchitecture() {
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

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* =========================================================================
            HEADER: Section Eyebrow + Headline + Subtitle (Identical to College)
        ========================================================================== */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3.5 mb-3">
            <div className="w-12 h-[1.5px] bg-[#d8b4fe]" />
            <span className="px-4 py-1 rounded-full bg-[#f3e8ff] border border-[#e9d5ff] text-[#6938ef] text-xs font-bold tracking-wide shadow-2xs">
              Unified Ecosystem
            </span>
            <div className="w-12 h-[1.5px] bg-[#d8b4fe]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111827] tracking-tight leading-tight m-0">
            <span className="text-[#6938ef]">One Account.</span> Unlimited Possibilities.
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mt-2.5 max-w-[640px] mx-auto">
            One central account for everything Uptrix — seamlessly connecting your portals, site lounges, broker apps, and milestone finance controls.
          </p>
        </header>

        {/* Outer Main Container matching Reference Image Aspect Ratio & Rounded Corners */}
        <div className="relative w-full max-w-[860px] mx-4 sm:mx-auto rounded-[38px] sm:rounded-[44px] bg-[#f0f4f9] p-5 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,40,120,0.08)] border border-[#e1eaf5] overflow-hidden">
          
          {/* Soft Radial Ambient Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#cde4ff_0%,#dbe9f9_45%,transparent_75%)] opacity-80"
          />

          {/* Diagram Contents Grid */}
          <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
            
            {/* CARD 1: TOP (App & Portal Ingestion) */}
            <div className="mx-auto w-full max-w-[460px] rounded-[24px] bg-white p-3.5 sm:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-800 block mb-3 font-sans">
                Portal & Channel Ingestion
              </span>

              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {/* 99acres */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#1877f2] flex items-center justify-center shadow-xs">
                    <PortalIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">99acres</span>
                </div>

                {/* MagicBricks */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#e11d48] flex items-center justify-center shadow-xs">
                    <PortalIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">MagicBricks</span>
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#25d366] flex items-center justify-center shadow-xs">
                    <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">WhatsApp</span>
                </div>

                {/* Meta */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#0081fb] flex items-center justify-center shadow-xs">
                    <MetaIcon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">Meta Ads</span>
                </div>

                {/* Tally */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#059669] flex items-center justify-center shadow-xs">
                    <TallyIcon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">Tally ERP</span>
                </div>

                {/* More */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-[10px] bg-[#edf2f7] text-slate-600 flex items-center justify-center font-bold text-base shadow-xs">
                    +
                  </div>
                  <span className="text-[9px] font-medium text-slate-600">More</span>
                </div>
              </div>
            </div>

            {/* ROW 2: Left Device, Perfectly Centered Hub, Right Security */}
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Concentric Radial Circles Anchored Exactly on Central Hub */}
              <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center z-0">
                <div className="w-[520px] h-[520px] rounded-full border border-blue-200/50" />
                <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-200/70" />
                <div className="absolute w-[260px] h-[260px] rounded-full border-2 border-blue-300/80 shadow-[0_0_40px_rgba(0,129,251,0.12)]" />
                
                <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-[2px] h-[56px] bg-blue-300" />
                <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />

                <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2 w-[2px] h-[56px] bg-blue-300" />
                <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
              </div>

              {/* CARD 2: MIDDLE-LEFT (Site & Field Integration) */}
              <div className="relative z-10 md:col-span-4 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 text-center block mb-2 font-sans">
                  Field & Lounge Devices
                </span>

                <div className="flex items-center justify-center gap-3 py-1">
                  {/* VR Tour Headset */}
                  <div className="w-13 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-xs">
                    <div className="flex items-center gap-1.5 opacity-90">
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-800" />
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-800" />
                    </div>
                  </div>

                  {/* Smartphone */}
                  <div className="w-7 h-12 rounded-lg bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center p-0.5 shadow-xs">
                    <div className="w-1.5 h-0.5 rounded-full bg-slate-600 mb-auto mt-0.5" />
                    <Image src="/logo-mark.png" alt="Uptrix" width={12} height={12} className="w-3 h-3 object-contain" />
                    <div className="w-2 h-0.5 rounded-full bg-slate-600 mt-auto mb-0.5" />
                  </div>

                  {/* Laptop */}
                  <div className="w-14 flex flex-col items-center">
                    <div className="w-12 h-8 rounded-t-md bg-slate-800 border border-slate-700 flex items-center justify-center shadow-xs">
                      <Image src="/logo-mark.png" alt="Uptrix" width={10} height={10} className="w-2.5 h-2.5 object-contain" />
                    </div>
                    <div className="w-14 h-1 rounded-b-md bg-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-100 mt-2 text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px]">📍</span>
                    <span className="text-[8px] font-medium text-slate-600">Site GPS Pin</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px]">📱</span>
                    <span className="text-[8px] font-medium text-slate-600">CP Mobile App</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px]">🏢</span>
                    <span className="text-[8px] font-medium text-slate-600">Lounge Tablets</span>
                  </div>
                </div>
              </div>

              {/* CENTER HUB: Concentric Unified Account Card */}
              <div className="relative z-10 md:col-span-4 flex items-center justify-center my-2 md:my-0">
                <div aria-hidden className="pointer-events-none absolute right-[100%] top-1/2 -translate-y-1/2 w-14 h-[2px] bg-blue-300 hidden md:block">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                </div>

                <div aria-hidden className="pointer-events-none absolute left-[100%] top-1/2 -translate-y-1/2 w-14 h-[2px] bg-blue-300 hidden md:block">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                </div>

                <div className="w-[196px] h-[196px] rounded-full bg-white shadow-[0_15px_35px_rgba(0,129,251,0.14)] border border-blue-200 flex flex-col items-center justify-center p-4 text-center transform transition-transform hover:scale-105 duration-300">
                  <div className="relative mb-1 flex items-center justify-center">
                    <Image
                      src="/logo-mark.png"
                      alt="Uptrix Logo"
                      width={56}
                      height={56}
                      className="w-13 h-13 object-contain drop-shadow-xs"
                      priority
                    />
                  </div>

                  <h3 className="font-display text-base font-extrabold text-slate-900 leading-tight">
                    Unified<br />PropTech OS
                  </h3>

                  <div className="relative mt-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1f5fd6] to-[#0081fb] text-white flex items-center justify-center shadow-xs">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white text-[#1f5fd6] border border-[#1f5fd6] flex items-center justify-center text-[9px] font-black shadow-2xs">
                      ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 3: MIDDLE-RIGHT (Security Controls) */}
              <div className="relative z-10 md:col-span-4 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 text-center block mb-3 font-sans">
                  Enterprise Security
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-slate-700">RERA 90-Day CP Lock</span>
                    </div>
                    <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-slate-700">Two-Factor Authentication</span>
                    </div>
                    <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                      Enabled
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-slate-700">Gate Pass QR Encryption</span>
                    </div>
                    <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                      Enabled
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 py-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0081fb]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-slate-700">Dedicated Tenant Cloud</span>
                    </div>
                    <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                      Isolated
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ROW 3: Bottom Left, Bottom Center, Bottom Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* CARD 4: BOTTOM-LEFT (One Login) */}
              <div className="md:col-span-3 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between text-center">
                <div>
                  <div className="w-7 h-7 mx-auto rounded-full bg-[#10b981] text-white flex items-center justify-center font-bold text-xs mb-2 shadow-2xs">
                    ✓
                  </div>
                  <strong className="text-xs font-bold text-slate-900 block leading-tight">
                    One Login
                  </strong>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Unlimited Velocity
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-slate-100 mt-3">
                  <Image src="/logo-mark.png" alt="Uptrix" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                  <div className="w-3.5 h-3.5 rounded bg-[#1877f2] flex items-center justify-center">
                    <PortalIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded bg-[#25d366] flex items-center justify-center">
                    <WhatsAppIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>

              {/* CARD 5: BOTTOM-CENTER (Centralized Settings) */}
              <div className="md:col-span-6 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-800 text-center block mb-2 font-sans">
                  Centralized Developer Settings
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-mono block">Commission Slabs</span>
                    <strong className="text-[11px] text-slate-800">Tier 1 / 2 / 3 Payouts</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-mono block">Milestone Rules</span>
                    <strong className="text-[11px] text-slate-800">RERA Stage Triggers</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-mono block">Lock Timers</span>
                    <strong className="text-[11px] text-slate-800">30-min Auto Release</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] text-slate-400 font-mono block">Tally Sync</span>
                    <strong className="text-[11px] text-slate-800">Two-Way Virtual Accounts</strong>
                  </div>
                </div>
              </div>

              {/* CARD 6: BOTTOM-RIGHT (Zero Downtime) */}
              <div className="md:col-span-3 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between text-center">
                <div>
                  <div className="w-7 h-7 mx-auto rounded-full bg-[#0081fb] text-white flex items-center justify-center font-bold text-xs mb-2 shadow-2xs">
                    ✦
                  </div>
                  <strong className="text-xs font-bold text-slate-900 block leading-tight">
                    99.99% Uptime
                  </strong>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Zero Launch-Day Glitches
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 text-[10px] text-emerald-600 font-bold">
                  ● Enterprise SLA Guaranteed
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
