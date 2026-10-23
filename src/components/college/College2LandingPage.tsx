"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import LogoMarquee from "@/components/site/LogoMarquee";
import TurnstileField from "@/components/site/TurnstileField";
import { submitLead } from "@/app/actions/lead";
import type { CollegeContent } from "@/content/college";
import type { HeaderContent } from "@/content/header";
import type { CrmLayoutContent } from "@/content/crm";
import {
  CheckIcon,
  CrossIcon,
  SearchIcon,
  BellIcon,
  LockIcon,
  MessageSquareIcon,
  CreditCardIcon,
  TargetIcon,
  UserCheckIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
} from "./CollegeIcons";

interface College2LandingPageProps {
  header: HeaderContent;
  footer: CrmLayoutContent["footer"];
  content: CollegeContent;
}

export default function College2LandingPage({ header, footer, content }: College2LandingPageProps) {
  // Interactive modal state for "Book a Demo"
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [demoSubmitting, setDemoSubmitting] = useState<boolean>(false);
  const [demoError, setDemoError] = useState<string>("");

  const { hero, trustBar, demoModal } = content;

  const trustMetrics = [
    { value: "500+", label: "Higher Education Campuses" },
    { value: "150,000+", label: "Active Students Managed" },
    { value: "99.98%", label: "Guaranteed Production SLA Uptime" },
    { value: "₹85Cr+", label: "Annual Tuition Collections Processed" },
  ];

  const corePillars = [
    {
      icon: MessageSquareIcon,
      color: "#1f5fd6",
      badge: "Unified Admissions",
      title: "Omnichannel Lead Ingestion & Meta API",
      body: "Automatically pull inquiries from Meta Ads, Google Ads, Shiksha, and website forms directly into verified counselor queues with zero latency.",
      points: ["Real-time WhatsApp Business API sync", "Zero duplicate lead routing", "Instant counselor assignment triggers"],
    },
    {
      icon: UserCheckIcon,
      color: "#0f8b8d",
      badge: "Student 360",
      title: "Complete Student Lifecycle Tracking",
      body: "Unify applicant counseling, document verification, biometric attendance, and academic examination history into a single clean record.",
      points: ["Digital DigiLocker & Aadhaar verification", "Biometric and RFID attendance bridges", "Single sign-on parent & student portal"],
    },
    {
      icon: CreditCardIcon,
      color: "#4f46e5",
      badge: "Fee Automation",
      title: "Bi-Directional ERP & Tally Prime Sync",
      body: "Automate tuition installment schedules, WhatsApp payment links, and reconciliation with university bank accounts and Tally ledgers.",
      points: ["UPI, NetBanking & Credit Card gateways", "Automated WhatsApp fee reminder cadence", "Real-time Tally Prime voucher posting"],
    },
    {
      icon: TargetIcon,
      color: "#5db833",
      badge: "Intelligence",
      title: "Executive Dean & Management Cockpit",
      body: "Eliminate fragmented spreadsheets. Give Chancellors and Trustees live cohort retention metrics, counselor conversion rates, and revenue forecasts.",
      points: ["Real-time enrollment funnel analytics", "Counselor performance scorecards", "Daily cashflow & collection telemetry"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header content={header} />

      <main className="overflow-hidden">
        {/* =========================================================================
            SECTION 1: HERO SECTION (From College Page)
        ========================================================================== */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-[#f0f9f6]/70 via-[#f8fafc] to-white border-b border-slate-200/80">
          {/* Subtle decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_65%)]"
          />

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline, CTAs, Benefits */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold tracking-wider uppercase w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{hero.eyebrow}</span>
                </div>

                {hero.tagline && (
                  <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono font-medium border border-slate-800 shadow-xs">
                    <span className="font-bold text-white">{hero.tagline}</span>
                    {hero.subtagline && (
                      <span className="text-emerald-300 font-sans border-l border-slate-700 pl-2">
                        {hero.subtagline}
                      </span>
                    )}
                  </div>
                )}

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.14] font-black tracking-tight text-slate-900">
                  {hero.headingStart} <br className="hidden sm:inline" />
                  {hero.headingEnd ? `${hero.headingEnd} ` : ""}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    {hero.headingHighlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {hero.body}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>{hero.primaryButtonLabel}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-300/80 shadow-xs transition hover:border-slate-400 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{hero.secondaryButtonLabel}</span>
                  </button>
                </div>

                {/* Checklist Badges */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-sm font-semibold text-slate-700">
                  {(hero.highlights || ["WhatsApp Meta API built in", "Intelligent lead assignment", "Full tuition & cashflow analytics"]).map(
                    (highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right Column: High-Fidelity EduPro Cockpit Mockup */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.14)] overflow-hidden transition-all">
                  
                  {/* Top Mockup Header Bar */}
                  <div className="bg-[#0b241b] text-white px-4 py-2.5 flex items-center justify-between border-b border-emerald-900/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                        <span className="font-extrabold text-xs tracking-wide">EduPro</span>
                      </div>
                      <span className="text-[11px] text-emerald-300/80 font-mono hidden sm:inline">
                        / Higher Education Edition
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="hidden sm:flex items-center gap-1.5 bg-[#14362a] px-2.5 py-1 rounded-md text-[11px] text-slate-300">
                        <SearchIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Search students, leads, courses...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative text-slate-300 text-xs">
                          <BellIcon className="w-3.5 h-3.5 text-slate-300" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
                        </span>
                        <div className="flex items-center gap-1.5 pl-2 border-l border-emerald-800">
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px]">
                            P
                          </span>
                          <span className="text-slate-200 text-xs font-semibold hidden sm:inline">
                            Priya (Admin)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Body Content */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 space-y-4">
                    {/* Top Row: Pipeline Summary */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">Lead Conversion Pipeline (2026 Batch)</span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                          92.4% Counseling Target
                        </span>
                      </div>

                      {/* 5-Stage Stepper Track */}
                      <div className="grid grid-cols-5 gap-1.5 text-center pt-1">
                        <div>
                          <div className="w-6 h-6 mx-auto rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                            1
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 block mt-1">Inquiries</span>
                          <span className="text-[11px] font-black text-blue-700 font-mono">482</span>
                        </div>
                        <div>
                          <div className="w-6 h-6 mx-auto rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                            2
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 block mt-1">Contacted</span>
                          <span className="text-[11px] font-black text-indigo-700 font-mono">192</span>
                        </div>
                        <div>
                          <div className="w-6 h-6 mx-auto rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                            3
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 block mt-1">Counseling</span>
                          <span className="text-[11px] font-black text-amber-700 font-mono">96</span>
                        </div>
                        <div>
                          <div className="w-6 h-6 mx-auto rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                            4
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 block mt-1">Applied</span>
                          <span className="text-[11px] font-black text-purple-700 font-mono">42</span>
                        </div>
                        <div>
                          <div className="w-6 h-6 mx-auto rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                            5
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 block mt-1">Enrolled</span>
                          <span className="text-[11px] font-black text-emerald-700 font-mono">28</span>
                        </div>
                      </div>
                    </div>

                    {/* Lower Split: Recent Activity & Leads by Source */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      {/* Recent Activity */}
                      <div className="sm:col-span-7 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-[11px] font-bold text-slate-800 block mb-2">
                          Recent Activity
                        </span>
                        <div className="space-y-2 text-[10px]">
                          <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-100">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span className="font-semibold text-slate-700 truncate">New lead from website</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[9px] shrink-0">12 mins ago</span>
                          </div>
                          <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-100">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span className="font-semibold text-slate-700 truncate">Counseling booked for Rahul</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[9px] shrink-0">28 mins ago</span>
                          </div>
                          <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-100">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-semibold text-slate-700 truncate">Fee payment received ₹1,42,500</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[9px] shrink-0">1 hour ago</span>
                          </div>
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                              <span className="font-semibold text-slate-700 truncate">Document uploaded - Aadhaar</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[9px] shrink-0">2 hours ago</span>
                          </div>
                        </div>
                      </div>

                      {/* Leads by Source Donut Simulation */}
                      <div className="sm:col-span-5 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-slate-800 block mb-1">
                          Leads by Source
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* Circular CSS Donut */}
                          <div className="relative w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-[conic-gradient(#3b82f6_0deg_115deg,#8b5cf6_115deg_216deg,#f59e0b_216deg_280deg,#10b981_280deg_330deg,#94a3b8_330deg_360deg)] p-2">
                            <div className="w-10 h-10 rounded-full bg-white flex flex-col items-center justify-center">
                              <span className="text-[9px] font-black text-slate-800 font-mono leading-none">1,284</span>
                              <span className="text-[6px] text-slate-400 uppercase">Total</span>
                            </div>
                          </div>

                          {/* Legend */}
                          <div className="text-[9px] space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" /> Website
                              </span>
                              <span className="font-mono font-bold text-slate-800">32%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" /> Meta Ads
                              </span>
                              <span className="font-mono font-bold text-slate-800">28%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" /> Google Ads
                              </span>
                              <span className="font-mono font-bold text-slate-800">18%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> WhatsApp
                              </span>
                              <span className="font-mono font-bold text-slate-800">14%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" /> Others
                              </span>
                              <span className="font-mono font-bold text-slate-800">8%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: TRUST SECTION (Client Logo Marquee & Proof from College Page)
        ========================================================================== */}
        <LogoMarquee
          heading={trustBar.heading}
          names={trustBar.clientNames}
          clients={trustBar.clientLogos}
          id="college2-trust-heading"
        />

        {/* Borderless Metrics & Institutional Track Record */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              {trustMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-1.5 ${idx > 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""}`}
                >
                  <strong className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f5fd6] tracking-tight">
                    {m.value}
                  </strong>
                  <span className="text-xs sm:text-sm font-medium text-slate-600 leading-snug">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ARCHITECTURAL PILLARS (Clean, Borderless Layout)
        ========================================================================== */}
        <section className="py-20 sm:py-24 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Comprehensive Campus Suite
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-slate-900 mt-3.5 leading-tight">
                Engineered for High-Growth <span className="text-emerald-600">Educational Institutions</span>
              </h2>
              <p className="mt-3.5 text-slate-600 text-base sm:text-lg leading-relaxed">
                Connect your counselors, academic registry, financial controllers, and executive leadership on one real-time operational engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {corePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col justify-between h-full pt-6 border-t-2 transition-all duration-300"
                    style={{ borderColor: pillar.color }}
                  >
                    <div>
                      {/* Top Row: Icon + Number */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-xs"
                          style={{ backgroundColor: pillar.color }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-xs font-bold tracking-widest text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <span
                        className="inline-block text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                        style={{ color: pillar.color, backgroundColor: `${pillar.color}15` }}
                      >
                        {pillar.badge}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-lg sm:text-[19px] font-bold text-slate-900 mt-3 leading-snug min-h-[54px] flex items-center">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 min-h-[72px]">
                        {pillar.body}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <ul className="space-y-2.5">
                        {pillar.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                            <span
                              className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white"
                              style={{ backgroundColor: pillar.color }}
                            >
                              <CheckIcon className="h-2.5 w-2.5" />
                            </span>
                            <span className="leading-snug font-medium text-slate-800">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: FINAL REASSURANCE & CTA
        ========================================================================== */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="mx-auto max-w-[1240px] px-6 text-center relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Get Started with Uptrix Pulse
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-4 max-w-3xl mx-auto leading-tight">
              Transform Your Campus Operations into a High-Converting Engine
            </h2>

            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Schedule a personalized walkthrough with our higher-education systems architects to review your current admission workflows and ERP integrations.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book Architecture Walkthrough</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <Link
                href="/crm/contact"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-7 text-sm font-bold text-white transition-colors"
              >
                <span>Contact Higher Ed Specialist</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PulseFooter content={footer} />

      {/* =========================================================================
          INTERACTIVE DEMO / ARCHITECTURE REQUEST MODAL
      ========================================================================== */}
      {showDemoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setShowDemoModal(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <CrossIcon className="w-5 h-5" />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">{demoModal.successHeading}</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {demoModal.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowDemoModal(false);
                    setDemoSubmitted(false);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setDemoSubmitting(true);
                  setDemoError("");
                  try {
                    const fd = new FormData(e.currentTarget);
                    fd.set("page", "College 2.0");
                    const res = await submitLead(fd);
                    if (res.success) {
                      setDemoSubmitted(true);
                    } else {
                      setDemoError(res.error || "Failed to submit request.");
                    }
                  } catch {
                    setDemoError("Something went wrong. Please try again.");
                  } finally {
                    setDemoSubmitting(false);
                  }
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                    <GraduationCapIcon className="w-3 h-3 text-emerald-700" />
                    <span>{demoModal.eyebrow}</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {demoModal.heading}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {demoModal.subheading}
                  </p>
                </div>

                {demoError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {demoError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{demoModal.nameLabel}</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder={demoModal.namePlaceholder}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{demoModal.institutionLabel}</label>
                    <input
                      required
                      name="businessName"
                      type="text"
                      placeholder={demoModal.institutionPlaceholder}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{demoModal.emailLabel}</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder={demoModal.emailPlaceholder}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{demoModal.phoneLabel}</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder={demoModal.phonePlaceholder}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{demoModal.businessTypeLabel}</label>
                  <select
                    name="businessType"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden bg-white text-slate-700 font-medium"
                  >
                    {demoModal.businessTypes.map((bt) => (
                      <option key={bt.value} value={bt.value}>{bt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{demoModal.challengeLabel}</label>
                  <textarea
                    name="solveProblem"
                    rows={2}
                    placeholder={demoModal.challengePlaceholder}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-1">
                  <TurnstileField />
                  <button
                    type="submit"
                    disabled={demoSubmitting}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {demoSubmitting ? (
                      <span>{demoModal.submittingButton}</span>
                    ) : (
                      <>
                        <span>{demoModal.submitButton}</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2 inline-flex items-center justify-center gap-1.5 w-full">
                    <LockIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{demoModal.privacyNote}</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
