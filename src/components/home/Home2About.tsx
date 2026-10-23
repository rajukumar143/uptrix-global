"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function BuildingOfficeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BoltIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function RocketIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export default function Home2About() {
  const pillars = [
    {
      icon: BuildingOfficeIcon,
      color: "#1f5fd6",
      bg: "bg-blue-50",
      border: "border-blue-100",
      badge: "Unified Ecosystem",
      title: "All-in-One Operations Platform",
      body: "Seamlessly unites CRM, HRMS, and bespoke internal workflow tools on a single, clean database with zero synchronization lag.",
      points: ["Zero duplicate data entry", "Single-sign-on access", "Shared organizational hierarchy"],
    },
    {
      icon: ShieldCheckIcon,
      color: "#0f8b8d",
      bg: "bg-teal-50",
      border: "border-teal-100",
      badge: "Data Sovereignty",
      title: "100% IP & Source Code Ownership",
      body: "Deploy on your private dedicated cloud or on-premise infrastructure. You own full source code, databases, and IP with zero vendor lock-in.",
      points: ["Dedicated private cloud tenant", "Full database access", "No per-user licensing penalties"],
    },
    {
      icon: BoltIcon,
      color: "#4f46e5",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      badge: "Interoperability",
      title: "Bi-Directional ERP & Tally Sync",
      body: "Native real-time bridges for Tally, WhatsApp Business API, payment gateways, and banking systems via high-throughput REST webhooks.",
      points: ["Real-time Tally Prime sync", "Automated WhatsApp triggers", "Custom REST webhook endpoints"],
    },
    {
      icon: RocketIcon,
      color: "#5db833",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      badge: "Rapid Engineering",
      title: "Built & Deployed in 4 Sprints",
      body: "We skip multi-month consulting delays. From clickable prototype to production deployment in weeks, backed by strict 99.98% SLAs.",
      points: ["Live weekly staging builds", "Rigorous QA & audit trails", "24/7 dedicated engineering SLA"],
    },
  ];

  const metrics = [
    { value: "500+", label: "Businesses Powered Across India" },
    { value: "99.98%", label: "Guaranteed Production SLA Uptime" },
    { value: "4 Sprints", label: "Average Concept-to-Launch Cycle" },
    { value: "100%", label: "Intellectual Property & Code Ownership" },
  ];

  return (
    <section id="about" aria-labelledby="about-uptrix-heading" className="relative overflow-hidden py-20 sm:py-28 bg-white border-t border-slate-200">
      <div className="relative mx-auto max-w-[1240px] px-6">
        
        {/* Header Block (Solid Logo Colors, Zero Gradients) */}
        <div className="flex flex-col items-center gap-3.5 text-center max-w-3xl mx-auto">
          <Reveal delay={60}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1f5fd6]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1f5fd6]" />
              About Uptrix
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="about-uptrix-heading"
              className="font-display text-[clamp(28px,3.8vw,46px)] font-black tracking-[-0.03em] text-slate-900 leading-[1.18] text-balance"
            >
              Enterprise Software Built for the Way{" "}
              <span className="text-[#1f5fd6]">Modern Businesses Run</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-[15px] sm:text-lg text-slate-600 leading-relaxed text-pretty">
              Uptrix develops the digital operating backbone for scaling enterprises. From integrated CRM and HRMS suites to bespoke internal tools, we engineer software that eliminates bottlenecks and drives measurable revenue growth.
            </p>
          </Reveal>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={idx} delay={160 + idx * 70} className="h-full">
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left">
                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${pillar.bg} ${pillar.border}`} style={{ color: pillar.color }}>
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-slate-900 mt-5 leading-snug group-hover:text-slate-950">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {pillar.body}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100">
                    <ul className="space-y-1.5">
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span
                            className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full text-white"
                            style={{ backgroundColor: pillar.color }}
                          >
                            <CheckIcon className="h-2 w-2" />
                          </span>
                          <span className="leading-snug font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Credentials & Trust Bar */}
        <Reveal delay={340} className="mt-12">
          <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
              {metrics.map((m, idx) => (
                <div key={idx} className={`flex flex-col gap-1 text-center sm:text-left ${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}>
                  <strong className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f5fd6] tracking-tight">
                    {m.value}
                  </strong>
                  <span className="text-xs sm:text-sm font-medium text-slate-600">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Direct CTA Strip */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
                Ready to replace fragmented spreadsheets and legacy software with an integrated modern system?
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1f5fd6] hover:bg-[#184cb0] px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#1f5fd6]/20 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                >
                  <span>Book Architecture Demo</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
