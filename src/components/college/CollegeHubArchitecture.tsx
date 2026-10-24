"use client";

import React from "react";
import Image from "next/image";

// Facebook Icon
function FacebookIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Instagram Icon
function InstagramIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
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

// Messenger Icon
function MessengerIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.303 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z" />
    </svg>
  );
}

// Reality Labs / Hardware Icon
function RealityLabsIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function CollegeHubArchitecture() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#f8fbff] border-b border-slate-200/80 overflow-hidden flex items-center justify-center">
      
      {/* Outer Main Container matching Reference Image Aspect Ratio & Rounded Corners */}
      <div className="relative w-full max-w-[860px] mx-4 sm:mx-auto rounded-[38px] sm:rounded-[44px] bg-[#f0f4f9] p-5 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,40,120,0.08)] border border-[#e1eaf5] overflow-hidden">
        
        {/* Soft Radial Ambient Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#cde4ff_0%,#dbe9f9_45%,transparent_75%)] opacity-80"
        />

        {/* Diagram Contents Grid */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-7">
          
          {/* =========================================================================
              CARD 1: TOP (App Access)
          ========================================================================== */}
          <div className="mx-auto w-full max-w-[430px] rounded-[24px] bg-white p-3.5 sm:p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 text-center">
            <span className="text-xs font-bold text-slate-800 block mb-3 font-sans">
              App Access
            </span>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {/* Facebook */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-[#1877f2] flex items-center justify-center shadow-xs">
                  <FacebookIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[9px] font-medium text-slate-600">Facebook</span>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center shadow-xs">
                  <InstagramIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-[9px] font-medium text-slate-600">Instagram</span>
              </div>

              {/* WhatsApp */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-[#25d366] flex items-center justify-center shadow-xs">
                  <WhatsAppIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-[9px] font-medium text-slate-600">WhatsApp</span>
              </div>

              {/* Messenger */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-[#00b2fe] via-[#006aff] to-[#a033ff] flex items-center justify-center shadow-xs">
                  <MessengerIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-[9px] font-medium text-slate-600">Messenger</span>
              </div>

              {/* Reality Labs */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-black flex items-center justify-center shadow-xs">
                  <RealityLabsIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-[9px] font-medium text-slate-600">Reality Labs</span>
              </div>

              {/* More / Plus */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-[10px] bg-[#edf2f7] text-slate-600 flex items-center justify-center font-bold text-base shadow-xs">
                  +
                </div>
                <span className="text-[9px] font-medium text-slate-600">More</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              ROW 2: Left Device, Perfectly Centered Hub, Right Security
          ========================================================================== */}
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Concentric Radial Circles Anchored Exactly on Central Hub */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center z-0">
              <div className="w-[520px] h-[520px] rounded-full border border-blue-200/50" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-200/70" />
              <div className="absolute w-[260px] h-[260px] rounded-full border-2 border-blue-300/80 shadow-[0_0_40px_rgba(0,129,251,0.12)]" />
              
              {/* Radial Top Line to App Access */}
              <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-[2px] h-[56px] bg-blue-300" />
              <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
              <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />

              {/* Radial Bottom Line to Centralized Settings */}
              <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2 w-[2px] h-[56px] bg-blue-300" />
              <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
              <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />

              {/* Radial Bottom-Left Ray with Lock Icon */}
              <div className="absolute -bottom-[42px] left-[32%] w-[42px] h-[2px] rotate-[32deg] bg-blue-300 origin-left" />
              <div className="absolute -bottom-[54px] left-[30%] w-5 h-5 rounded-full bg-[#0081fb] text-white flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              {/* Radial Bottom-Right Ray with Database Icon */}
              <div className="absolute -bottom-[42px] right-[32%] w-[42px] h-[2px] -rotate-[32deg] bg-blue-300 origin-right" />
              <div className="absolute -bottom-[54px] right-[30%] w-5 h-5 rounded-full bg-[#0081fb] text-white flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
            </div>

            {/* CARD 2: MIDDLE-LEFT (Device Integration) */}
            <div className="relative z-10 md:col-span-4 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-800 text-center block mb-2 font-sans">
                Device Integration
              </span>

              {/* Visual Hardware Displays */}
              <div className="flex items-center justify-center gap-3 py-1">
                {/* Meta Quest VR Headset Illustration */}
                <div className="w-13 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-xs">
                  <div className="flex items-center gap-1.5 opacity-90">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-800" />
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-400 bg-slate-800" />
                  </div>
                </div>

                {/* Smartphone with Logo */}
                <div className="w-7 h-12 rounded-lg bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center p-0.5 shadow-xs">
                  <div className="w-1.5 h-0.5 rounded-full bg-slate-600 mb-auto mt-0.5" />
                  <Image src="/logo-mark.png" alt="Uptrix" width={12} height={12} className="w-3 h-3 object-contain" />
                  <div className="w-2 h-0.5 rounded-full bg-slate-600 mt-auto mb-0.5" />
                </div>

                {/* Laptop with Logo */}
                <div className="w-14 flex flex-col items-center">
                  <div className="w-12 h-8 rounded-t-md bg-slate-800 border border-slate-700 flex items-center justify-center shadow-xs">
                    <Image src="/logo-mark.png" alt="Uptrix" width={10} height={10} className="w-2.5 h-2.5 object-contain" />
                  </div>
                  <div className="w-14 h-1 rounded-b-md bg-slate-400" />
                </div>
              </div>

              {/* 3 Status Columns */}
              <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-100 mt-2 text-center">
                <div className="flex flex-col items-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                  <span className="text-[8px] font-medium text-slate-600">Cloud Sync</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-[8px] font-medium text-slate-600">Seamless Handoff</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="14" height="10" x="8" y="2" rx="2" />
                    <rect width="10" height="14" x="2" y="8" rx="2" />
                  </svg>
                  <span className="text-[8px] font-medium text-slate-600">Cross-Device Access</span>
                </div>
              </div>
            </div>

            {/* CENTER HUB: Concentric Unified Account White Card with Uptrix Logo */}
            <div className="relative z-10 md:col-span-4 flex items-center justify-center my-2 md:my-0">
              
              {/* Desktop Horizontal Ray to Left Card with Junction Dots */}
              <div aria-hidden className="pointer-events-none absolute right-[100%] top-1/2 -translate-y-1/2 w-14 h-[2px] bg-blue-300 hidden md:block">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
              </div>

              {/* Desktop Horizontal Ray to Right Card with Junction Dots */}
              <div aria-hidden className="pointer-events-none absolute left-[100%] top-1/2 -translate-y-1/2 w-14 h-[2px] bg-blue-300 hidden md:block">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0081fb] ring-4 ring-white" />
              </div>

              {/* Circular Hub Card */}
              <div className="w-[196px] h-[196px] rounded-full bg-white shadow-[0_15px_35px_rgba(0,129,251,0.14)] border border-blue-200 flex flex-col items-center justify-center p-4 text-center transform transition-transform hover:scale-105 duration-300">
                
                {/* UPTRIX LOGO IN CENTER */}
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

                {/* Unified Account Label */}
                <h3 className="font-display text-base font-extrabold text-slate-900 leading-tight">
                  Unified<br />Account
                </h3>

                {/* Profile Avatar with Blue Checkmark */}
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
                Security Controls
              </span>

              <div className="space-y-2 text-xs">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between gap-1 py-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="text-[10.5px] font-medium text-slate-700">Two-Factor Authentication</span>
                  </div>
                  <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                    Enabled
                  </span>
                </div>

                {/* Passkeys */}
                <div className="flex items-center justify-between gap-1 py-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                      <path d="m21 2-9.6 9.6" />
                      <circle cx="7.5" cy="16.5" r="5.5" />
                    </svg>
                    <span className="text-[10.5px] font-medium text-slate-700">Passkeys</span>
                  </div>
                  <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                    Enabled
                  </span>
                </div>

                {/* Login Alerts */}
                <div className="flex items-center justify-between gap-1 py-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    <span className="text-[10.5px] font-medium text-slate-700">Login Alerts</span>
                  </div>
                  <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                    Enabled
                  </span>
                </div>

                {/* Account Recovery */}
                <div className="flex items-center justify-between gap-1 py-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0081fb]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-[10.5px] font-medium text-slate-700">Account Recovery</span>
                  </div>
                  <span className="rounded-full bg-[#e8f8f0] px-2 py-0.5 text-[8.5px] font-bold text-[#107e43]">
                    Enabled
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              ROW 3: Bottom Left, Bottom Center, Bottom Right
          ========================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* CARD 4: BOTTOM-LEFT (One Login Unlimited Possibilities) */}
            <div className="md:col-span-3 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between text-center">
              <div>
                <div className="w-7 h-7 mx-auto rounded-full bg-[#10b981] text-white flex items-center justify-center font-bold text-xs mb-2 shadow-2xs">
                  ✓
                </div>
                <strong className="text-xs font-bold text-slate-900 block leading-tight">
                  One Login
                </strong>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Unlimited Possibilities
                </span>
              </div>

              {/* 6 Micro Icons including Uptrix */}
              <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-slate-100 mt-3">
                <Image src="/logo-mark.png" alt="Uptrix" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                <div className="w-3.5 h-3.5 rounded bg-[#1877f2] flex items-center justify-center">
                  <FacebookIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-[#f58529] to-[#dd2a7b] flex items-center justify-center">
                  <InstagramIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="w-3.5 h-3.5 rounded bg-[#25d366] flex items-center justify-center">
                  <WhatsAppIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="w-3.5 h-3.5 rounded bg-gradient-to-tr from-[#00b2fe] to-[#a033ff] flex items-center justify-center">
                  <MessengerIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[9px] font-bold text-slate-400">+</span>
              </div>
            </div>

            {/* CARD 5: BOTTOM-CENTER (Centralized Settings) */}
            <div className="md:col-span-6 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between text-center">
              <span className="text-xs font-bold text-slate-800 block mb-3 font-sans">
                Centralized Settings
              </span>

              <div className="grid grid-cols-5 gap-2 items-center justify-center">
                {/* Profile Information */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-[#edf5ff] text-[#0081fb] flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600 leading-tight">Profile Information</span>
                </div>

                {/* Privacy Settings */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-[#edf5ff] text-[#0081fb] flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600 leading-tight">Privacy Settings</span>
                </div>

                {/* Notifications Preferences */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-[#edf5ff] text-[#0081fb] flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600 leading-tight">Notification Preferences</span>
                </div>

                {/* Payment Methods */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-[#edf5ff] text-[#0081fb] flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600 leading-tight">Payment Methods</span>
                </div>

                {/* Security Center */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-[#edf5ff] text-[#0081fb] flex items-center justify-center shadow-2xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600 leading-tight">Security Center</span>
                </div>
              </div>
            </div>

            {/* CARD 6: BOTTOM-RIGHT (Your data. Synchronized.) */}
            <div className="md:col-span-3 rounded-[24px] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between gap-3">
              <div className="space-y-1.5 text-left">
                <strong className="text-xs font-bold text-slate-900 block leading-tight">
                  Your data.<br />Synchronized.
                </strong>
                <div className="space-y-1 pt-1 text-[9px] text-slate-600 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-[#10b981] font-bold">✓</span>
                    <span>Real-time Sync</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#10b981] font-bold">✓</span>
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#10b981] font-bold">✓</span>
                    <span>Backups</span>
                  </div>
                </div>
              </div>

              {/* 3D Glossy Sync Cloud Icon */}
              <div className="relative shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066ff] via-[#0081fb] to-[#38bdf8] p-2.5 shadow-[0_10px_20px_rgba(0,129,251,0.3)] flex items-center justify-center text-white">
                <svg className="w-7 h-7 fill-current filter drop-shadow-sm" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                </svg>
              </div>
            </div>

          </div>

          {/* =========================================================================
              BOTTOM BAR: Floating Pill Tag & Sparkle Search Button
          ========================================================================== */}
          <div className="flex items-center justify-between pt-1">
            <div className="hidden sm:block w-9" /> {/* Spacer */}

            {/* Central Pill Tag */}
            <div className="mx-auto flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xs px-4 py-2 shadow-xs border border-blue-100 text-[11px] font-semibold text-slate-700">
              <svg className="w-4 h-4 text-[#0081fb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>
                <strong className="text-slate-900">Secure. Private. Connected.</strong> One account for everything Uptrix.
              </span>
            </div>

            {/* Floating Search Action Button */}
            <button
              type="button"
              aria-label="Search Ecosystem"
              className="w-9 h-9 rounded-full bg-white text-slate-600 border border-slate-200 shadow-xs flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
