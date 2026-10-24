"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import LogoMarquee from "@/components/site/LogoMarquee";
import CollegeHubArchitecture from "./CollegeHubArchitecture";
import CollegeCrmIntelligence from "./CollegeCrmIntelligence";
import CollegeCrmFeatures from "./CollegeCrmFeatures";
import CollegeTraditionalVsPulse from "./CollegeTraditionalVsPulse";
import TurnstileField from "@/components/site/TurnstileField";
import { submitLead } from "@/app/actions/lead";
import { youtubeId } from "@/content/stories";
import type { CollegeContent } from "@/content/college";
import type { HeaderContent } from "@/content/header";
import type { CrmLayoutContent } from "@/content/crm";
import {
  CheckIcon,
  CrossIcon,
  StarIcon,
  SearchIcon,
  BellIcon,
  LockIcon,
  PlayIcon,
  VideoIcon,
  FileTextIcon,
  MessageSquareIcon,
  CreditCardIcon,
  GraduationCapIcon,
  ChartBarIcon,
  UsersIcon,
  BookOpenIcon,
  TrendingUpIcon,
  SettingsIcon,
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

  // Interactive state for Case Studies
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"apex" | "vanguard" | "stjude">("apex");
  const [showCaseStudyModal, setShowCaseStudyModal] = useState<boolean>(false);

  // Interactive state for Video Testimonials
  const [activeVideoId, setActiveVideoId] = useState<string>(content.videos.cards[0]?.id ?? "video-1");
  const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);

  // Interactive state for Google / Customer Reviews
  const [reviewFilter, setReviewFilter] = useState<string>("all");

  // Interactive state for FAQ accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const { hero, trustBar, caseStudies, videos, reviews, faq, finalCta, demoModal } = content;

  const reviewCategories = Array.from(new Set(reviews.cards.map((review) => review.category)));
  const activeVideo = videos.cards.find((video) => video.id === activeVideoId) ?? videos.cards[0];
  const selectedCaseStudyIndex = selectedCaseStudy === "apex" ? 0 : selectedCaseStudy === "vanguard" ? 1 : 2;
  const selectedCaseStudyCard = caseStudies.cards[selectedCaseStudyIndex] ?? caseStudies.cards[0];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header content={header} />

      <main className="overflow-hidden">
        {/* =========================================================================
            SECTION 1: HERO SECTION (From College Page)
        ========================================================================== */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-[#f0f9f6]/70 via-[#f8fafc] to-white border-b border-slate-200/80">
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

                  {/* Cockpit Inner Body */}
                  <div className="grid grid-cols-12 min-h-[420px] bg-slate-50/60">
                    
                    {/* Left Mini Sidebar */}
                    <div className="col-span-3 bg-[#0d2a20] text-emerald-100 p-3 flex flex-col justify-between text-xs">
                      <div className="space-y-1">
                        <div className="px-2 py-1.5 rounded-lg bg-emerald-700/60 text-white font-semibold flex items-center gap-2 text-[11px]">
                          <ChartBarIcon className="w-3.5 h-3.5 text-white" />
                          <span>Leads</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <GraduationCapIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Admissions</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <UsersIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Students</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <BookOpenIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Academic</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <CreditCardIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Fee &amp; Finance</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <MessageSquareIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Communication</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <TrendingUpIcon className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Reports</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-emerald-900/60 text-[10px] text-emerald-300/70 px-2 flex items-center gap-1.5">
                        <SettingsIcon className="w-3 h-3 text-emerald-400" />
                        <span>Settings</span>
                      </div>
                    </div>

                    {/* Main Cockpit Content */}
                    <div className="col-span-9 p-3 sm:p-4 flex flex-col gap-3">
                      
                      {/* 4 Metric Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Total Leads</span>
                          <div className="text-base font-black text-slate-900 mt-0.5">1,284</div>
                          <span className="inline-flex items-center text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
                            ↑ 16.4%
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Admissions</span>
                          <div className="text-base font-black text-emerald-700 mt-0.5">386</div>
                          <span className="inline-flex items-center text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
                            ↑ 12.8%
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Active Students</span>
                          <div className="text-base font-black text-indigo-700 mt-0.5">2,840</div>
                          <span className="inline-flex items-center text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded mt-0.5">
                            ↑ 8.2%
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Revenue</span>
                          <div className="text-base font-black text-amber-700 mt-0.5">₹48.6L</div>
                          <span className="inline-flex items-center text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded mt-0.5">
                            ↑ 21.4%
                          </span>
                        </div>
                      </div>

                      {/* Admission Pipeline Stepper */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800">Admission Pipeline</span>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                            Live Funnel
                          </span>
                        </div>

                        {/* Visual Connected Pipeline */}
                        <div className="relative pt-2 pb-1">
                          <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-slate-100 rounded-full z-0" />
                          <div className="grid grid-cols-5 gap-1 relative z-10 text-center">
                            <div>
                              <div className="w-6 h-6 mx-auto rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                                1
                              </div>
                              <span className="text-[9px] font-bold text-slate-700 block mt-1">New Leads</span>
                              <span className="text-[11px] font-black text-blue-700 font-mono">291</span>
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
                                <span className="font-semibold text-slate-700 truncate">Fee payment received ₹42,500</span>
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

        {/* SECTION: AI POWERED COLLEGE CRM - BUILT AROUND YOUR BUSINESS (Below Trust Section) */}
        <CollegeCrmIntelligence />

        {/* SECTION 03: CRM PLATFORM - KEY FEATURES OF YOUR CRM TOOL */}
        <CollegeCrmFeatures />

        {/* SECTION: TRADITIONAL CRM VS. PULSE - AI CRM COMPARISON MATRIX */}
        <CollegeTraditionalVsPulse />

        {/* SECTION 04: UNIFIED ACCOUNT & CONNECTED ECOSYSTEM ARCHITECTURE */}
        <CollegeHubArchitecture />

        {/* =========================================================================
            SECTION 4: INSTITUTIONAL CASE STUDIES (3-Card Showcase + Dossier)
        ========================================================================== */}
        <section
          id="case-studies"
          className="py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f7fb] border-b border-slate-200/80 relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[840px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>{caseStudies.eyebrow}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                {caseStudies.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {caseStudies.body}
              </p>
            </div>

            {/* Case study story cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
              {caseStudies.cards.map((card, cIdx) => {
                const studyKeys: Array<"apex" | "vanguard" | "stjude"> = ["apex", "vanguard", "stjude"];
                const key = studyKeys[cIdx] || "apex";
                const borderHover = cIdx === 0 ? "hover:border-emerald-400" : cIdx === 1 ? "hover:border-blue-400" : "hover:border-teal-400";
                const gradientBar = cIdx === 0 ? "from-emerald-400 via-teal-300 to-blue-500" : cIdx === 1 ? "from-blue-400 via-indigo-300 to-purple-500" : "from-teal-400 via-cyan-300 to-indigo-500";
                const metricHighlight = cIdx === 0 ? "text-emerald-400" : cIdx === 1 ? "text-blue-400" : "text-teal-400";
                const authorInitials = card.author.split(" ").map((n) => n[0]).join("").slice(0, 2);

                return (
                  <div
                    key={cIdx}
                    className={`rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl ${borderHover} transition-all duration-300 flex flex-col justify-between group`}
                  >
                    <div>
                      {/* Dark Accent Header Strip with 3 Key Metrics */}
                      <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradientBar}`} />
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-white/10">
                            {card.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{card.campuses}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                          <div>
                            <div className={`text-2xl sm:text-[26px] font-black ${metricHighlight} font-mono leading-none`}>
                              {card.metric1}
                            </div>
                            <span className="text-[10px] text-slate-300 font-medium mt-1 block">{card.metric1Label}</span>
                          </div>
                          <div>
                            <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                              {card.metric2}
                            </div>
                            <span className="text-[10px] text-slate-300 font-medium mt-1 block">{card.metric2Label}</span>
                          </div>
                          <div>
                            <div className="text-2xl sm:text-[26px] font-black text-emerald-300 font-mono leading-none">
                              {card.metric3}
                            </div>
                            <span className="text-[10px] text-slate-300 font-medium mt-1 block">{card.metric3Label}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col gap-4">
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 tracking-wider">
                            {card.location}
                          </span>
                          <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-emerald-700 transition-colors">
                            {card.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {card.body}
                        </p>

                        {/* Before vs After Highlights */}
                        <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                          <div className="flex items-start gap-2">
                            <CrossIcon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span className="text-slate-500"><strong>Before:</strong> {card.before}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-slate-800"><strong>With Uptrix:</strong> {card.after}</span>
                          </div>
                        </div>

                        {/* Dean Quote */}
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                            {authorInitials}
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-600 italic line-clamp-2">
                              &quot;{card.quote}&quot;
                            </p>
                            <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                              {card.author}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card CTA Footer */}
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCaseStudy(key);
                          setShowCaseStudyModal(true);
                        }}
                        className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                      >
                        <span>{caseStudies.readButton}</span>
                        <span className="text-emerald-400 group-hover:text-white transition-colors">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: VIDEO TESTIMONIALS (Interactive 4K Executive Interviews)
        ========================================================================== */}
        <section
          id="video-testimonials"
          className="py-16 sm:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[800px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-700 font-mono">
                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span>{videos.eyebrow}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                {videos.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {videos.body}
              </p>
            </div>

            {/* 3 Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.cards.map((card) => {
                const ytId = "youtubeUrl" in card && typeof card.youtubeUrl === "string" ? youtubeId(card.youtubeUrl) : "";
                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      setActiveVideoId(card.id);
                      setShowVideoPopup(true);
                    }}
                    className="group cursor-pointer rounded-3xl border border-slate-200/90 p-4 bg-white shadow-2xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Executive Video Thumbnail Box */}
                    <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner group-hover:border-emerald-500/60 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={"posterImage" in card && typeof card.posterImage === "string" ? card.posterImage : (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : "/college/video-thumb-arvind.jpg")}
                        alt={card.speaker}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover:from-black/75 transition-colors" />

                      {/* Central Play Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVideoId(card.id);
                          setShowVideoPopup(true);
                        }}
                        className="relative z-10 h-14 w-14 rounded-full bg-emerald-600/90 text-white backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-emerald-500 transition-all duration-300 cursor-pointer"
                        aria-label={`Play ${card.speaker} interview video`}
                      >
                        <PlayIcon className="w-5 h-5 ml-0.5 fill-white text-white" />
                      </button>

                      {/* Bottom-left pill badge */}
                      <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white font-mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {card.tag}
                      </div>

                      {/* Bottom-right duration */}
                      <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] font-mono text-slate-200 flex items-center gap-1">
                        <span className="text-[9px] font-bold text-emerald-300 font-sans">4K</span>
                        <span>•</span>
                        <span>{card.duration}</span>
                      </div>
                    </div>

                    {/* Card Info Below Thumbnail */}
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-800 border border-emerald-200">
                          {card.metric}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                          {videos.watchButton} →
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {card.speaker}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {card.role} • <span className="text-slate-700 font-semibold">{card.institute}</span>
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic border-t border-slate-100 pt-2">
                        &quot;{card.quote}&quot;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: GOOGLE / CUSTOMER REVIEWS & WALL OF SOCIAL PROOF
        ========================================================================== */}
        <section
          id="reviews"
          className="py-16 sm:py-20 bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f7fb] border-b border-slate-200/80 relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-8">
            {/* Header with Rating Badge */}
            <div className="flex flex-col gap-3 text-center max-w-[820px] mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 font-mono mx-auto">
                <span className="text-amber-500">★★★★★</span>
                <span>{reviews.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                {reviews.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {reviews.body}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: `All Reviews (${reviews.cards.length})` },
                ...reviewCategories.map((category) => ({
                  id: category,
                  label: `${category} (${reviews.cards.filter((review) => review.category === category).length})`,
                })),
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === tab.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 6 Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {reviews.cards
                .filter((r) => reviewFilter === "all" || r.category === reviewFilter)
                .map((r, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between gap-4 animate-in fade-in duration-150"
                  >
                    <div>
                      {/* Top Row: Stars + Metric */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: r.stars }).map((_, si) => (
                            <StarIcon key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-800 border border-emerald-200">
                          {r.metric}
                        </span>
                      </div>

                      {/* Review Quote */}
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mt-3">
                        &quot;{r.review}&quot;
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 leading-tight">{r.name}</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">
                          {r.role} • <span className="text-slate-700 font-semibold">{r.institute}</span>
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-bold mt-0.5">
                          <CheckIcon className="w-3 h-3 text-emerald-600" />
                          <span>{r.badge}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
        ========================================================================== */}
        <section
          id="faq"
          className="py-16 sm:py-20 bg-white border-b border-slate-200/80 relative overflow-hidden"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>{faq.eyebrow}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                {faq.heading}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl mx-auto">
                {faq.body}
              </p>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3">
              {faq.items.map((faqItem, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? "border-emerald-300 bg-white shadow-xs"
                        : "border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {faqItem.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-transform duration-200 ${
                          isExpanded
                            ? "bg-emerald-600 text-white rotate-180"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        ↓
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                        {faqItem.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Support Banner */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-black text-slate-900">{finalCta.heading}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {finalCta.body}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  {finalCta.buttonLabel} →
                </button>
                <Link
                  href="https://wa.me/919999999999"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FINAL REASSURANCE & CTA
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
                    if (res.ok || res.success) {
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
                    <span>{"eyebrow" in demoModal ? (demoModal as any).eyebrow : "Book a Demo"}</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    {demoModal.heading}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {"subheading" in demoModal ? (demoModal as any).subheading : demoModal.body}
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

      {/* =========================================================================
          INTERACTIVE VIDEO TESTIMONIALS MODAL
      ========================================================================== */}
      {showVideoPopup && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowVideoPopup(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex flex-col gap-1">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                  <VideoIcon className="w-3.5 h-3.5 text-purple-700" />
                  <span>{videos.eyebrow}</span>
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  {activeVideo?.interviewTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 font-mono border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeVideo?.metric}
                </span>
                <button
                  type="button"
                  onClick={() => setShowVideoPopup(false)}
                  className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition cursor-pointer"
                  aria-label="Close video modal"
                >
                  <CrossIcon className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

            {/* Video Player Box */}
            {"youtubeUrl" in activeVideo && typeof activeVideo.youtubeUrl === "string" && activeVideo.youtubeUrl ? (
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-2xl border border-slate-900">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId(activeVideo.youtubeUrl)}?autoplay=1&rel=0`}
                  title={activeVideo.interviewTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            ) : "videoUrl" in activeVideo && typeof activeVideo.videoUrl === "string" && activeVideo.videoUrl ? (
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden shadow-2xl border border-slate-900">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 border border-slate-800 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-slate-900/90 to-slate-950" />
                <div className="relative z-10 flex items-center justify-between text-xs text-white/80">
                  <span className="font-mono font-bold text-emerald-400">● LIVE RECORDING ARCHIVE</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded font-mono text-[10px]">1080p HD</span>
                </div>
                <div className="relative z-10 my-auto text-center flex flex-col items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-500/30 animate-pulse">
                    <PlayIcon className="w-7 h-7 ml-1 fill-white text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-base sm:text-lg font-black">
                      {activeVideo?.episodeTitle}
                    </h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {activeVideo?.role} • {activeVideo?.institute}
                    </p>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col gap-2 pt-2 border-t border-white/10">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[44%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/70 font-mono">
                    <span>1:38 / 3:45</span>
                    <div className="flex items-center gap-3">
                      <span>1.0x Speed</span>
                      <span>HD 80%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quote Transcript Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                {videos.transcriptLabel}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                {activeVideo?.transcript}
              </p>
            </div>

            {/* Switch to Other Interviews */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold text-slate-600">{videos.switchButtonLabel}</span>
              <div className="flex flex-wrap gap-2">
                {videos.cards.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveVideoId(v.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeVideoId === v.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {v.institute}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE CASE STUDY DOSSIER MODAL
      ========================================================================== */}
      {showCaseStudyModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowCaseStudyModal(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                  <FileTextIcon className="w-3.5 h-3.5 text-blue-700" />
                  <span>{"modal" in caseStudies && (caseStudies as any).modal?.eyebrow ? (caseStudies as any).modal.eyebrow : caseStudies.eyebrow}</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {selectedCaseStudyCard?.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCaseStudyModal(false)}
                className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition cursor-pointer"
                aria-label="Close case study modal"
              >
                <CrossIcon className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {caseStudies.modal.phases.map((phase, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">{phase.heading}</h4>
                  <p className="text-slate-600">{phase.body}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-mono">{caseStudies.modal.status}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCaseStudyModal(false);
                    setShowDemoModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  {caseStudies.modal.demoButton}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCaseStudyModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  {caseStudies.modal.closeButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
