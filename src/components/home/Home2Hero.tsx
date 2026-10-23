"use client";

import Image from "next/image";
import Link from "next/link";

// Self-contained SVG Icons for zero-dependency rendering
function UsersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function HeartIcon({ className = "h-4 w-4", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MegaphoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function MoreIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function GaugeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function SproutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  );
}

export default function Home2Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f8ff] via-[#fafbff] to-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Dot Grids */}
      <div 
        className="pointer-events-none absolute left-6 top-16 h-36 w-36 opacity-35"
        style={{
          backgroundImage: "radial-gradient(#9333ea 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px"
        }}
      />
      <div 
        className="pointer-events-none absolute right-6 top-24 h-44 w-44 opacity-35"
        style={{
          backgroundImage: "radial-gradient(#f59e0b 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px"
        }}
      />

      {/* Soft Ambient Radial Blur Glows */}
      <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Badge: Votre mission, notre technologie (Single clean pill) */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-200/80 bg-purple-100/60 px-5 py-2 text-xs font-semibold text-purple-900 shadow-2xs backdrop-blur-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-700">
              <UsersIcon className="h-3 w-3" />
            </span>
            <span>Votre mission, notre technologie</span>
          </div>
        </div>

        {/* Main Headline with 3D Purple Heart */}
        <div className="mx-auto mt-7 max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="block">Générateurs de sites</span>
            <span className="mt-2 inline-flex flex-wrap items-center justify-center gap-3">
              <span>pour associations</span>
              <Image
                src="/images/purple-heart-3d.png"
                alt="Purple Heart"
                width={56}
                height={46}
                className="inline-block h-10 w-auto sm:h-12 lg:h-14 -translate-y-1 object-contain drop-shadow-md"
                priority
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            Créez un site professionnel en quelques minutes, sans compétences techniques.
            <br className="hidden sm:inline" /> Mobilisez, inspirez et faites grandir votre impact.
          </p>

          {/* CTA Area with Sketched Hand-Drawn Arrow and Exact Amber Button */}
          <div className="relative mt-8 flex flex-col items-center justify-center">
            {/* Sketched Curving Arrow */}
            <div className="pointer-events-none absolute -right-2 top-0 hidden -translate-y-6 translate-x-12 sm:block">
              <svg width="74" height="60" viewBox="0 0 74 60" fill="none" className="text-purple-400">
                <path
                  d="M62 4C55 18 35 24 16 34C11 36 6 39 4 44"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d="M12 47L4 44L7 36"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <Link
              href="#contact"
              className="group inline-flex items-center gap-3.5 rounded-full bg-[#FFB000] hover:bg-[#FFA500] px-8 py-3.5 text-sm sm:text-base font-bold text-[#0A1128] shadow-lg shadow-amber-400/30 transition-all duration-200 hover:shadow-xl hover:shadow-amber-400/40 hover:-translate-y-0.5"
            >
              <span>Commencer gratuitement</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0A1128] shadow-2xs transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRightIcon className="h-4 w-4 stroke-[2.8]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Centerpiece Composition */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          {/* Main Visual Cutout / Portrait */}
          <div className="relative mx-auto flex justify-center">
            <div className="relative z-10 w-[90%] max-w-[540px] sm:w-[82%]">
              {/* Soft purple halo behind the portrait */}
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-purple-200/50 via-purple-100/40 to-transparent blur-2xl transform scale-95" />

              <div className="overflow-hidden rounded-3xl bg-transparent">
                <Image
                  src="/images/hero-home-2.jpg"
                  alt="Young woman in purple shirt happily working on laptop at desk"
                  width={640}
                  height={640}
                  priority
                  className="h-auto w-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>
            </div>

            {/* FLOATING CARD 1: Vue d'ensemble (Top Left) */}
            <div className="absolute -left-2 top-8 z-20 w-64 sm:-left-6 sm:w-72 lg:-left-12">
              <div className="rounded-2xl border border-slate-100/80 bg-white/95 p-4 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100 text-purple-600">
                    <UsersIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold text-slate-800">Vue d'ensemble</span>
                </div>

                {/* Donut Chart and Legend */}
                <div className="mt-3.5 flex items-center gap-4">
                  {/* SVG Donut */}
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      {/* Background ring */}
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="5" />
                      {/* Segment 1: Purple 42% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="5"
                        strokeDasharray="36.9 88"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Segment 2: Tan/Light Brown 35% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#d4a373"
                        strokeWidth="5"
                        strokeDasharray="30.8 88"
                        strokeDashoffset="-38"
                      />
                      {/* Segment 3: Amber 23% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="5"
                        strokeDasharray="20.2 88"
                        strokeDashoffset="-70"
                      />
                    </svg>
                    {/* Inner hole */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-9 w-9 rounded-full bg-white shadow-inner" />
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="font-medium text-slate-600">Dons</span>
                      </div>
                      <span className="font-semibold text-slate-900">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#d4a373]" />
                        <span className="font-medium text-slate-600">Bénévoles</span>
                      </div>
                      <span className="font-semibold text-slate-900">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="font-medium text-slate-600">Campagnes</span>
                      </div>
                      <span className="font-semibold text-slate-900">23%</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card: Nouveaux soutiens */}
                <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="text-[10px] font-medium text-slate-500">Nouveaux soutiens</div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900">1 248</span>
                      <span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] font-bold text-emerald-600">
                        +18%
                      </span>
                    </div>
                    {/* Mini Sparkline */}
                    <svg width="48" height="18" viewBox="0 0 48 18" fill="none" className="text-purple-500">
                      <path
                        d="M2 14L12 11L22 13L32 6L46 2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Sketched Hand-Drawn Arrow (Left side bottom) */}
            <div className="pointer-events-none absolute -left-4 bottom-24 z-20 hidden text-purple-400 sm:block">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path
                  d="M10 10C15 28 28 42 48 46"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <path
                  d="M48 38L50 48L40 48"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* FLOATING CARD 2: Collecte en cours (Bottom Left) */}
            <div className="absolute -left-1 bottom-6 z-20 w-56 sm:-left-4 sm:w-64 lg:-left-8">
              <div className="rounded-2xl border border-slate-100/80 bg-white/95 p-3.5 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <HeartIcon className="h-3 w-3" filled />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">Collecte en cours</span>
                </div>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-slate-900">5 670 €</span>
                  <span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] font-bold text-emerald-600">
                    +22%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 w-3/4" />
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: Engagement (Right Side) */}
            <div className="absolute -right-2 top-14 z-20 w-64 sm:-right-6 sm:w-72 lg:-right-12">
              <div className="rounded-2xl border border-slate-100/80 bg-white/95 p-4 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Engagement</span>
                  <button className="cursor-pointer text-slate-400 hover:text-slate-600">
                    <MoreIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Smooth Area Wave Chart */}
                <div className="mt-3">
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-gradient-to-b from-purple-50/50 to-transparent">
                    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="h-full w-full">
                      <defs>
                        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area Fill */}
                      <path
                        d="M0,45 C25,48 40,25 60,32 C80,38 95,20 120,28 C145,35 160,18 180,24 C190,28 198,22 200,20 L200,60 L0,60 Z"
                        fill="url(#purpleGrad)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M0,45 C25,48 40,25 60,32 C80,38 95,20 120,28 C145,35 160,18 180,24 C190,28 198,22 200,20"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Monthly Visits */}
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-medium text-slate-500">Visites ce mois-ci</div>
                      <div className="text-xl font-black text-slate-900">8 934</div>
                    </div>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                      +32%
                    </span>
                  </div>

                  {/* 3 Action Badges */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col items-center rounded-xl bg-purple-50/60 p-2 border border-purple-100/60 transition hover:bg-purple-100/60">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500 text-white shadow-2xs">
                        <UsersIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">
                        Communauté active
                      </span>
                    </div>

                    <div className="flex flex-col items-center rounded-xl bg-amber-50/60 p-2 border border-amber-100/60 transition hover:bg-amber-100/60">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-2xs">
                        <MegaphoneIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">
                        Campagnes efficaces
                      </span>
                    </div>

                    <div className="flex flex-col items-center rounded-xl bg-rose-50/60 p-2 border border-rose-100/60 transition hover:bg-rose-100/60">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white shadow-2xs">
                        <HeartIcon className="h-3.5 w-3.5" filled />
                      </div>
                      <span className="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">
                        Impact durable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE BAR / TRUST PILLARS */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="rounded-2xl border border-slate-100 bg-white/95 px-6 py-5 shadow-xl shadow-slate-200/50 backdrop-blur-md">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100/80">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Sécurisé et fiable
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80">
                  <SmartphoneIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Conçu pour le secteur associatif
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100/80">
                  <GaugeIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Rapide et sans code
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/80">
                  <SproutIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Évolutif avec votre mission
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
