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

function ArrowRightIcon({ className = "h-4 w-4 stroke-[2.8]" }: { className?: string }) {
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function GaugeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function SproutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 20h10" />
      <path d="M12 20v-8" />
      <path d="M12 12c0-3 2.5-5 5.5-5 0 3-2.5 5-5.5 5Z" />
      <path d="M12 12c0-3-2.5-5-5.5-5 0 3 2.5 5 5.5 5Z" />
    </svg>
  );
}

export default function Home2Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Top-Right Soft Lilac Organic Ambient Curve */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-[520px] w-[520px] rounded-full bg-[#f4efff]/70 blur-2xl"
      />

      {/* Decorative Dot Grid (Top-Left: 4 cols x 6 rows light dots) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-16 left-6 hidden sm:grid grid-cols-4 gap-3 opacity-45"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        ))}
      </div>

      {/* Decorative Dot Grid (Top-Right: 4 cols x 6 rows amber/golden dots) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-28 right-8 hidden sm:grid grid-cols-4 gap-3 opacity-55"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Pill: Votre mission, notre technologie */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5dcff] bg-[#f1edfe] px-4 py-1.5 text-xs font-semibold text-[#5a48a2] shadow-2xs backdrop-blur-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7c5ce9] text-white">
              <UsersIcon className="h-3 w-3" />
            </span>
            <span>Votre mission, notre technologie</span>
          </div>
        </div>

        {/* Main Headline with 3D Purple Heart */}
        <div className="mx-auto mt-7 max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[56px] leading-[1.14]">
            <span className="block">Générateurs de sites</span>
            <span className="mt-2 inline-flex flex-wrap items-center justify-center gap-3">
              <span>pour associations</span>
              <Image
                src="/images/purple-heart-3d.png"
                alt="Purple Heart"
                width={56}
                height={46}
                className="inline-block h-10 w-auto sm:h-12 lg:h-14 -translate-y-1 object-contain drop-shadow-sm"
                priority
              />
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] sm:text-lg text-slate-600 leading-relaxed">
            Créez un site professionnel en quelques minutes, sans compétences techniques.
            <br className="hidden sm:inline" /> Mobilisez, inspirez et faites grandir votre impact.
          </p>

          {/* CTA Button with Sketched Hand-Drawn Arrow */}
          <div className="relative mt-8 flex flex-col items-center justify-center">
            {/* Sketched Hand-Drawn Arrow Curving Toward the Woman */}
            <div className="pointer-events-none absolute right-12 sm:right-28 top-0 hidden -translate-y-6 translate-x-12 sm:block text-[#8a70d6]">
              <svg width="74" height="60" viewBox="0 0 74 60" fill="none">
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
              className="group inline-flex items-center gap-3.5 rounded-full bg-[#FFB000] hover:bg-[#FFA500] px-8 py-3.5 text-sm sm:text-base font-bold text-[#0A1128] shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Commencer gratuitement</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0A1128] shadow-2xs transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRightIcon className="h-4 w-4 stroke-[2.8]" />
              </span>
            </Link>
          </div>
        </div>

        {/* Centerpiece Composition: Portrait + Lilac Circle + 3 Floating Cards */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="relative mx-auto flex justify-center">
            {/* Soft Lilac Circular Disc Behind the Portrait (as in reference image) */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] rounded-full bg-[#eee9ff] -z-0"
            />

            {/* Cutout Portrait */}
            <div className="relative z-10 w-[90%] max-w-[520px] sm:w-[80%]">
              <div className="overflow-hidden bg-transparent">
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
              <div className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7c5ce9] text-white">
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
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4.5" />
                      {/* Purple Segment (42%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#6355d8"
                        strokeWidth="4.5"
                        strokeDasharray="37 100"
                        strokeDashoffset="0"
                      />
                      {/* Peach Segment (35%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="4.5"
                        strokeDasharray="31 100"
                        strokeDashoffset="-37"
                      />
                      {/* Amber Segment (23%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="4.5"
                        strokeDasharray="20 100"
                        strokeDashoffset="-68"
                      />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-1 flex-col gap-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#6355d8]" />
                        <span className="font-medium text-slate-600">Dons</span>
                      </div>
                      <span className="font-semibold text-slate-900">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#f97316]" />
                        <span className="font-medium text-slate-600">Bénévoles</span>
                      </div>
                      <span className="font-semibold text-slate-900">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
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
                    <svg width="48" height="18" viewBox="0 0 48 18" fill="none" className="text-[#6355d8]">
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
            <div className="pointer-events-none absolute -left-4 bottom-24 z-20 hidden text-[#8a70d6] sm:block">
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
              <div className="rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1edfe] text-[#7c5ce9]">
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
                  <div className="h-full rounded-full bg-[#7c5ce9] w-3/4" />
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: Engagement (Right Side) */}
            <div className="absolute -right-2 top-14 z-20 w-64 sm:-right-6 sm:w-72 lg:-right-12">
              <div className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-purple-950/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Engagement</span>
                  <button className="cursor-pointer text-slate-400 hover:text-slate-600">
                    <MoreIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Smooth Area Wave Chart */}
                <div className="mt-3">
                  <div className="relative h-20 w-full overflow-hidden rounded-lg bg-[#f6f3ff]">
                    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="h-full w-full">
                      {/* Area Fill */}
                      <path
                        d="M0,45 C25,48 40,25 60,32 C80,38 95,20 120,28 C145,35 160,18 180,24 C190,28 198,22 200,20 L200,60 L0,60 Z"
                        fill="rgba(124, 92, 233, 0.15)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M0,45 C25,48 40,25 60,32 C80,38 95,20 120,28 C145,35 160,18 180,24 C190,28 198,22 200,20"
                        fill="none"
                        stroke="#7c5ce9"
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
                      +37%
                    </span>
                  </div>

                  {/* 3 Action Badges */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col items-center rounded-xl bg-[#f5f2ff] p-2 border border-[#eae3ff] transition hover:bg-[#ede7ff]">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5ce9] text-white shadow-2xs">
                        <UsersIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">
                        Communauté active
                      </span>
                    </div>

                    <div className="flex flex-col items-center rounded-xl bg-[#fff7ed] p-2 border border-[#fed7aa] transition hover:bg-[#ffedd5]">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f97316] text-white shadow-2xs">
                        <MegaphoneIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-semibold text-slate-700 leading-tight">
                        Campagnes efficaces
                      </span>
                    </div>

                    <div className="flex flex-col items-center rounded-xl bg-[#fff1f2] p-2 border border-[#fecdd3] transition hover:bg-[#ffe4e6]">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f43f5e] text-white shadow-2xs">
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

        {/* BOTTOM FEATURE BAR / 4 TRUST PILLARS (Matching exact screenshot) */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="rounded-2xl border border-slate-100 bg-[#fcfbfe] px-6 py-5 shadow-lg shadow-purple-950/5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f0ff] text-[#7c5ce9] border border-[#e9e2ff]">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Sécurisé et fiable
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f0ff] text-[#7c5ce9] border border-[#e9e2ff]">
                  <SmartphoneIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Conçu pour le secteur associatif
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fffbeb] text-[#d97706] border border-[#fef3c7]">
                  <GaugeIcon className="h-5 w-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  Rapide et sans code
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7]">
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
