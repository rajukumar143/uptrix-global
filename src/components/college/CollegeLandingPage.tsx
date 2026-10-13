"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import LogoMarquee from "@/components/site/LogoMarquee";
import { submitLead } from "@/app/actions/lead";
import type { CollegeContent } from "@/content/college";
import type { HeaderContent } from "@/content/header";
import type { CrmLayoutContent } from "@/content/crm";

interface CollegeLandingPageProps {
  header: HeaderContent;
  footer: CrmLayoutContent["footer"];
  content: CollegeContent;
}

export default function CollegeLandingPage({ header, footer, content }: CollegeLandingPageProps) {
  // Interactive state for admissions table filter
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string>("all");
  
  // Interactive state for Student 360 tab
  const [activeStudentTab, setActiveStudentTab] = useState<string>("Profile");

  // Interactive state for WhatsApp demo
  const [chatReplied, setChatReplied] = useState<string | null>(null);

  // Interactive modal state for "See How It Works" / "Book a Demo"
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [demoSubmitting, setDemoSubmitting] = useState<boolean>(false);
  const [demoError, setDemoError] = useState<string>("");

  // Interactive state for The Complete Journey stepper
  const [activeJourneyStep, setActiveJourneyStep] = useState<string>(content.journey.steps[0] ?? "Lead");

  // Interactive state for Business Insights
  const [insightFilter, setInsightFilter] = useState("all");
  const [bulkReminderSent, setBulkReminderSent] = useState<boolean>(false);
  const [showReportsModal, setShowReportsModal] = useState<boolean>(false);

  // Interactive state for Case Studies
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"apex" | "vanguard" | "stjude">("apex");
  const [showCaseStudyModal, setShowCaseStudyModal] = useState<boolean>(false);

  // Interactive state for Video Testimonials
  const [activeVideoId, setActiveVideoId] = useState<string>(content.videos.cards[0]?.id ?? "video-1");
  const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);

  // Interactive state for Reviews
  const [reviewFilter, setReviewFilter] = useState("all");

  // Interactive state for FAQ accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const leadsTableData = [
    {
      name: "Rahul Kumar",
      source: "Website",
      course: "Data Analytics",
      stage: "Counseling",
      stageColor: "bg-amber-50 text-amber-700 border-amber-200",
      counselor: "Priya",
      avatarBg: "bg-blue-500",
    },
    {
      name: "Sneha Reddy",
      source: "Meta Ads",
      course: "Web Dev",
      stage: "Applied",
      stageColor: "bg-blue-50 text-blue-700 border-blue-200",
      counselor: "Rahul",
      avatarBg: "bg-purple-500",
    },
    {
      name: "Arjun Mehta",
      source: "Phone Call",
      course: "Full Stack",
      stage: "Hot Lead",
      stageColor: "bg-rose-50 text-rose-700 border-rose-200",
      counselor: "Anjali",
      avatarBg: "bg-emerald-500",
    },
    {
      name: "Divya S",
      source: "Google Ads",
      course: "Digital Marketing",
      stage: "Enrolled",
      stageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      counselor: "Priya",
      avatarBg: "bg-indigo-500",
    },
    {
      name: "Karan Patel",
      source: "Walk-in",
      course: "Cloud & DevOps",
      stage: "Contacted",
      stageColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      counselor: "Amit",
      avatarBg: "bg-teal-500",
    },
  ];

  const filteredLeads =
    selectedPipelineStage === "all"
      ? leadsTableData
      : leadsTableData.filter(
          (lead) => lead.stage.toLowerCase() === selectedPipelineStage.toLowerCase()
        );

  const {
    hero,
    challenge,
    insights,
    journey,
    platform,
    admissions,
    studentProfile,
    erpFeatures,
    management,
    caseStudies,
    videos,
    reviews,
    faq,
    finalCta,
    demoModal,
  } = content;
  const reviewCategories = Array.from(new Set(reviews.cards.map((review) => review.category)));
  const activeVideo = videos.cards.find((video) => video.id === activeVideoId) ?? videos.cards[0];
  const selectedCaseStudyIndex = selectedCaseStudy === "apex" ? 0 : selectedCaseStudy === "vanguard" ? 1 : 2;
  const selectedCaseStudyCard = caseStudies.cards[selectedCaseStudyIndex] ?? caseStudies.cards[0];
  const activeInsightGroup = insights.signalGroups.find((group) => group.id === insightFilter)
    ?? insights.signalGroups[0];
  const insightCardStyles = [
    { border: "border-emerald-200 hover:border-emerald-400", gradient: "from-emerald-50/50", eyebrow: "text-emerald-800", icon: "bg-emerald-100 text-emerald-800", value: "text-emerald-700", footer: "border-emerald-100 text-emerald-800", progress: "bg-emerald-600" },
    { border: "border-indigo-200 hover:border-indigo-400", gradient: "from-indigo-50/50", eyebrow: "text-indigo-900", icon: "bg-indigo-100 text-indigo-900", value: "text-indigo-950", footer: "border-indigo-100 text-indigo-900", progress: "bg-indigo-600" },
    { border: "border-teal-200 hover:border-teal-400", gradient: "from-teal-50/50", eyebrow: "text-teal-900", icon: "bg-teal-100 text-teal-900", value: "text-teal-800", footer: "border-teal-100 text-teal-900", progress: "bg-teal-600" },
    { border: "border-rose-200 hover:border-rose-400", gradient: "from-rose-50/50", eyebrow: "text-rose-900", icon: "bg-rose-100 text-rose-800", value: "text-rose-600", footer: "border-rose-100 text-rose-700", progress: "bg-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header content={header} />

      <main className="overflow-hidden">
        {/* =========================================================================
            SECTION 1: HERO SECTION
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
                  <Link
                    href={hero.primaryButtonLink}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{hero.primaryButtonLabel}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

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
                  <div className="flex items-center gap-2">
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                      ✓
                    </span>
                    <span>All-in-one platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                      ✓
                    </span>
                    <span>Easy to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs">
                      ✓
                    </span>
                    <span>Built for education businesses</span>
                  </div>
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
                        <span>🔍</span>
                        <span>Search students, leads, courses...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative text-slate-300 text-xs">
                          🔔
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
                          <span>📊</span>
                          <span>Leads</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>🎓</span>
                          <span>Admissions</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>👥</span>
                          <span>Students</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>📚</span>
                          <span>Academic</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>💳</span>
                          <span>Fee &amp; Finance</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>💬</span>
                          <span>Communication</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg text-emerald-200/80 hover:bg-emerald-800/40 flex items-center gap-2 text-[11px] cursor-pointer">
                          <span>📈</span>
                          <span>Reports</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-emerald-900/60 text-[10px] text-emerald-300/70 px-2 flex items-center gap-1.5">
                        <span>⚙️</span>
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

        {/* Client Logo Carousel (Same as Home Page) */}
        <LogoMarquee
          heading={content.trustBar.heading}
          names={content.trustBar.clientNames}
          id="college-trust-heading"
        />

        {/* =========================================================================
            SECTION 2: THE CHALLENGE
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Section Tag */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3">
              {challenge.eyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {challenge.heading}
            </h2>
            
            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              {challenge.body}
            </p>

            {/* Problem cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-left">
              {challenge.cards.map((card, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between ${
                    ["bg-[#fffbfb] border-rose-200/70", "bg-[#fffdfa] border-amber-200/70", "bg-[#fbfdff] border-blue-200/70", "bg-[#f9fefd] border-teal-200/70", "bg-[#fcfaff] border-purple-200/70", "bg-[#fff9f9] border-rose-200/70"][index % 6]
                  }`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${
                      ["bg-rose-100 text-rose-600", "bg-amber-100 text-amber-600", "bg-blue-100 text-blue-600", "bg-teal-100 text-teal-600", "bg-purple-100 text-purple-600", "bg-rose-100 text-rose-600"][index % 6]
                    }`}>
                      {["📢", "⏰", "📁", "⚙️", "👁️", "🛑"][index % 6]}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{card.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: BUSINESS INSIGHTS (Compact & Instantly Reactive Radar)
        ========================================================================== */}
        <section className="py-6 sm:py-8 bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f7fb] border-b border-slate-200/80 relative overflow-hidden">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-4">
            
            {/* Top Compact Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider font-mono mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>{insights.eyebrow}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {insights.heading}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                  {insights.body}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReportsModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 text-xs font-bold shadow-2xs transition self-start sm:self-auto shrink-0 cursor-pointer"
              >
                <span>{insights.reportButton}</span>
                <span className="text-emerald-600 font-bold">→</span>
              </button>
            </div>

            {/* Category Filter Pills Directly Above Cards */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="text-[11px] font-bold text-slate-500 uppercase px-2 font-mono hidden sm:inline">
                  {insights.filterLabel}:
                </span>
                {insights.filters.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInsightFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      insightFilter === tab.id
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono px-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {insights.viewingLabel}:{" "}
                  <strong className="text-slate-900 uppercase">
                    {insights.filters.find((filter) => filter.id === insightFilter)?.viewing}
                  </strong>
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                DYNAMIC 4 CARDS: IMMEDIATELY UPDATE ON FILTER BUTTON CLICK
            -------------------------------------------------------------- */}
            <div
              key={insightFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in zoom-in-98 duration-150"
            >
              {false && insightFilter === "all" && (
                <>
                  {/* Card 1: Revenue Velocity */}
                  <div className="group rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                        Period Velocity
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        📈
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
                        +100.0%
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Tuition Intake Volume
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Revenue growth vs previous period: +100.0% with 2x acceleration in enrollments.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100 text-[10px] text-emerald-800 font-medium font-mono">
                      <span className="text-emerald-600 font-bold">↑</span> 2x Volume Intake Surge
                    </div>
                  </div>

                  {/* Card 2: Expected Pipeline */}
                  <div className="group rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900">
                        Expected Pipeline
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 text-xs font-bold">
                        💼
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-indigo-950 font-mono tracking-tight">
                        ₹12,32,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Active Receivables Ledger
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Expected revenue if all pending installments collected across visible students.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-100 text-[10px] text-indigo-900 font-medium font-mono">
                      <span>●</span> Active Receivables Ledger
                    </div>
                  </div>

                  {/* Card 3: Collection Efficiency */}
                  <div className="group rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-900">
                        Collection Efficiency
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-900 text-xs font-bold">
                        🎯
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-teal-800 font-mono tracking-tight">
                        88.8%
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Collection Success Rate
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        88.8% Realized • 11.2% in automated WhatsApp recovery cadence.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-teal-100 flex flex-col gap-1">
                      <div className="h-1 w-full bg-teal-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full w-[88.8%]" />
                      </div>
                      <span className="text-[9px] text-teal-900 font-mono font-medium">
                        88.8% Realized • 11.2% in Recovery
                      </span>
                    </div>
                  </div>

                  {/* Card 4: Defaulter Attention */}
                  <div className="group rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-900">
                        Defaulter Attention
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-800 text-xs font-bold">
                        ⚠️
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-rose-600 font-mono tracking-tight">
                        7 Students
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Overdue Installments
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        7 student(s) with overdue installments. 1-click WhatsApp payment links staged.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-rose-100 text-[10px] text-rose-700 font-medium font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Installment 2 &amp; 3 Follow-up Ready
                    </div>
                  </div>
                </>
              )}

              {false && insightFilter === "counselor" && (
                <>
                  {/* Counselor Card 1: Top Leader */}
                  <div className="group rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                        Counselor Leaderboard #1
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        👑
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
                        ₹646,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Madhuri Tirlangi (Top Performer)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Closed 42 enrollments with 100% token fee clearance and zero applicant churn.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100 text-[10px] text-emerald-800 font-medium font-mono">
                      <span className="text-emerald-600 font-bold">★</span> 42 Enrollments Closed
                    </div>
                  </div>

                  {/* Counselor Card 2: Desk Audit */}
                  <div className="group rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900">
                        Counselor Desk Audit
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
                        ⚠️
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-amber-700 font-mono tracking-tight">
                        ₹37,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Kavitha Lingampally (Audit Flag)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Lowest collection desk. 17.5x performance gap vs top desk; flagged for call script coaching.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-amber-100 text-[10px] text-amber-800 font-medium font-mono">
                      <span>●</span> 17.5x Gap vs Top Desk
                    </div>
                  </div>

                  {/* Counselor Card 3: Conversion Speed */}
                  <div className="group rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                        Conversion Velocity
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                        ⚡
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-700 font-mono tracking-tight">
                        4.2 Days
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Average Lead-to-Token Speed
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        From initial WhatsApp enquiry to booking token deposit. 35% faster than average.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-blue-100 text-[10px] text-blue-800 font-medium font-mono">
                      <span className="text-blue-600 font-bold">↑</span> 35% Faster Conversions
                    </div>
                  </div>

                  {/* Counselor Card 4: Daily Touchpoints */}
                  <div className="group rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900">
                        Daily Call Queue
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 text-xs font-bold">
                        📞
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-indigo-950 font-mono tracking-tight">
                        128 Leads
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Active Scheduled Touchpoints
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        High-intent applicants scheduled across engineering and management counselor shifts today.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-100 text-[10px] text-indigo-900 font-medium font-mono">
                      <span>●</span> 94% Connect Rate
                    </div>
                  </div>
                </>
              )}

              {false && insightFilter === "course" && (
                <>
                  {/* Course Card 1: Most Profitable */}
                  <div className="group rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                        Academic Yield Star
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                        🎓
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-700 font-mono tracking-tight">
                        ₹954,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Data Analytics - Gen AI
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Most profitable course cohort across campuses. Highest average tuition fee collected per seat.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-blue-100 text-[10px] text-blue-800 font-medium font-mono">
                      <span className="text-blue-600 font-bold">★</span> Top Grossing Academic Cohort
                    </div>
                  </div>

                  {/* Course Card 2: Defaulter Hotspot */}
                  <div className="group rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-900">
                        Defaulter Hotspot
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-800 text-xs font-bold">
                        🚨
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-rose-600 font-mono tracking-tight">
                        6 Students
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Data Analytics - Gen AI
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Accounts for 85.7% of all overdue accounts. Concentrated installment risk in 2nd semester fees.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-rose-100 text-[10px] text-rose-700 font-medium font-mono">
                      <span>●</span> 85.7% of Total Overdue
                    </div>
                  </div>

                  {/* Course Card 3: Fast-Filling Intake */}
                  <div className="group rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                        Admissions Rush
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        🔥
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
                        18 Seats Left
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        B.Tech Computer Science
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        92% of merit intake quota filled. High demand ratio with 3.8x applicants per available desk.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100 text-[10px] text-emerald-800 font-medium font-mono">
                      <span className="text-emerald-600 font-bold">↑</span> 92% Capacity Reached
                    </div>
                  </div>

                  {/* Course Card 4: Fee Realization */}
                  <div className="group rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-900">
                        Tuition Clearance
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-900 text-xs font-bold">
                        ⚖️
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-teal-800 font-mono tracking-tight">
                        91.4%
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        On-Time Milestone Rate
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Semester 1 milestone fee clearance pace institute-wide with automatic receipts issued.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-teal-100 text-[10px] text-teal-900 font-medium font-mono">
                      <span>✓</span> On-Time Milestone Clearance
                    </div>
                  </div>
                </>
              )}

              {false && insightFilter === "cashflow" && (
                <>
                  {/* Cashflow Card 1: Receivables */}
                  <div className="group rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900">
                        Active Receivables
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 text-xs font-bold">
                        💼
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-indigo-950 font-mono tracking-tight">
                        ₹12,32,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Active Receivables Ledger
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Installments scheduled across next 45 days. Auto-debit and WhatsApp link reminders pre-queued.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-100 text-[10px] text-indigo-900 font-medium font-mono">
                      <span>●</span> Tracked in Daily Cashbook
                    </div>
                  </div>

                  {/* Cashflow Card 2: Collection Efficiency */}
                  <div className="group rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-900">
                        Collection Efficiency
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-900 text-xs font-bold">
                        🎯
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-teal-800 font-mono tracking-tight">
                        88.8%
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        88.8% Realized • 11.2% Recovery
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Instant reconciliation into institute bank account. 11.2% in automated WhatsApp 3-step recovery.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-teal-100 text-[10px] text-teal-900 font-medium font-mono">
                      <span>✓</span> Direct Bank Settlement
                    </div>
                  </div>

                  {/* Cashflow Card 3: Biggest Payment */}
                  <div className="group rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                        Tuition Milestone
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                        💎
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-emerald-700 font-mono tracking-tight">
                        ₹60,000
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        Full Upfront Tuition Clear
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        Biggest single payment on record: ₹60,000 upfront annual tuition cleared via direct UPI payment link.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100 text-[10px] text-emerald-800 font-medium font-mono">
                      <span>✓</span> Cleared in Full via UPI
                    </div>
                  </div>

                  {/* Cashflow Card 4: Most Used Payment Method */}
                  <div className="group rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white p-3.5 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-900">
                        Preferred Payment Rails
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                        📱
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-blue-700 font-mono tracking-tight">
                        84% UPI
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        UPI Rails (Razorpay / Instant QR)
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        8 out of 10 parents choose direct WhatsApp UPI links over offline cash or manual NEFT bank visits.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-blue-100 text-[10px] text-blue-800 font-medium font-mono">
                      <span>●</span> 84% Digital Rail Share
                    </div>
                  </div>
                </>
              )}

              {activeInsightGroup?.cards.map((card, index) => {
                const style = insightCardStyles[index % insightCardStyles.length];
                return (
                  <article
                    key={`${activeInsightGroup.id}-${index}`}
                    className={`group rounded-xl border ${style.border} bg-gradient-to-br ${style.gradient} via-white to-white p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-2.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${style.eyebrow}`}>
                        {card.eyebrow}
                      </span>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${style.icon}`}>
                        {card.icon}
                      </span>
                    </div>
                    <div>
                      <div className={`text-2xl font-black font-mono tracking-tight ${style.value}`}>
                        {card.value}
                      </div>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">{card.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{card.body}</p>
                    </div>
                    <div className={`pt-2 border-t text-[10px] font-medium font-mono ${style.footer}`}>
                      {card.progress !== undefined ? (
                        <div className="flex flex-col gap-1">
                          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${style.progress}`} style={{ width: `${Math.min(100, Math.max(0, card.progress))}%` }} />
                          </div>
                          <span>{card.footer}</span>
                        </div>
                      ) : card.footer}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Compact Action Banner for 7 Overdue Reminders */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 text-xs flex items-center justify-center font-bold shrink-0">
                  ⚡
                </span>
                <span className="text-xs font-bold text-slate-800">{insights.reminderBanner}</span>
              </div>

              <button
                type="button"
                onClick={() => setBulkReminderSent(!bulkReminderSent)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer font-mono ${
                  bulkReminderSent
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                }`}
              >
                {bulkReminderSent
                  ? `✓ ${insights.sentRemindersButton}`
                  : insights.sendRemindersButton}
              </button>
            </div>

            {bulkReminderSent && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                <span>✓</span>
                <span>{insights.reminderSuccess}</span>
              </div>
            )}

          </div>
        </section>

        {/* Interactive Reports Modal */}
        {showReportsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setShowReportsModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                {insights.reportModal.heading}
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {insights.reportModal.body}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono text-xs">
                {insights.reportModal.metrics.map((metric, index) => {
                  const styles = [
                    "bg-slate-50 border-slate-200 text-slate-500 text-slate-900",
                    "bg-emerald-50 border-emerald-200 text-emerald-700 text-emerald-800",
                    "bg-indigo-50 border-indigo-200 text-indigo-700 text-indigo-800",
                    "bg-rose-50 border-rose-200 text-rose-700 text-rose-800",
                  ];
                  const [background, border, labelColor, valueColor] = styles[index % styles.length].split(" ");
                  return (
                    <div key={index} className={`${background} p-3 rounded-xl border ${border}`}>
                      <span className={`text-[10px] ${labelColor} uppercase block font-bold`}>{metric.label}</span>
                      <span className={`text-base font-black ${valueColor}`}>{metric.value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 text-xs text-slate-700">
                {insights.reportModal.details.map((detail, index) => (
                  <div key={index} className={`flex justify-between py-1.5 ${index < insights.reportModal.details.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <span className="font-medium">{detail.label}</span>
                    <span className="font-bold text-slate-900">{detail.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBulkReminderSent(true);
                    setShowReportsModal(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center text-sm shadow-md transition cursor-pointer"
                >
                  {insights.reportModal.sendRemindersButton}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportsModal(false)}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  {insights.reportModal.closeButton}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: THE COMPLETE JOURNEY
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
              {journey.eyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {journey.heading}
            </h2>

            <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              {journey.body}
            </p>

            {/* Stepper with 10 Circular Nodes */}
            <div className="mt-10 overflow-x-auto py-6">
              <div className="min-w-[920px] flex items-center justify-between relative px-6 pt-4 pb-2">
                
                {/* Connecting Track Line */}
                <div className="absolute top-[40px] -translate-y-1/2 left-12 right-12 h-0.5 bg-slate-200 z-0" />

                {/* 10 Nodes */}
                {journey.steps.map((step, index) => {
                  const styles = [
                  { step: "Lead", icon: "🌱", color: "bg-emerald-50 text-emerald-700 border-emerald-400" },
                  { step: "Counseling", icon: "💬", color: "bg-blue-50 text-blue-700 border-blue-400" },
                  { step: "Application", icon: "📝", color: "bg-amber-50 text-amber-700 border-amber-400" },
                  { step: "Admission", icon: "🎓", color: "bg-purple-50 text-purple-700 border-purple-400" },
                  { step: "Fee Payment", icon: "💳", color: "bg-teal-50 text-teal-700 border-teal-400" },
                  { step: "Creation", icon: "👤", color: "bg-emerald-50 text-emerald-700 border-emerald-400" },
                  { step: "Academics", icon: "📖", color: "bg-blue-50 text-blue-700 border-blue-400" },
                  { step: "Attendance", icon: "📅", color: "bg-amber-50 text-amber-700 border-amber-400" },
                  { step: "Communication", icon: "📲", color: "bg-cyan-50 text-cyan-700 border-cyan-400" },
                  { step: "Graduation", icon: "🎖️", color: "bg-purple-50 text-purple-700 border-purple-400" },
                  ];
                  const item = { ...styles[index % styles.length], step };
                  const isActive = activeJourneyStep === item.step;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveJourneyStep(item.step)}
                      className="flex flex-col items-center gap-2 relative z-10 cursor-pointer group focus:outline-hidden"
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 ${item.color} bg-white flex items-center justify-center text-lg shadow-xs transition-all duration-200 ${
                          isActive
                            ? "ring-4 ring-emerald-400/80 ring-offset-2 scale-115 shadow-md bg-emerald-50/40"
                            : "group-hover:scale-105 group-hover:shadow-sm"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={`text-xs whitespace-nowrap transition-colors ${
                          isActive
                            ? "font-black text-slate-900 underline decoration-emerald-500 decoration-2 underline-offset-4"
                            : "font-semibold text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {item.step}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Interactive Stage Card */}
            {(() => {
              const journeyDetails: Record<
                string,
                {
                  num: number;
                  title: string;
                  tagline: string;
                  metrics: { label: string; value: string }[];
                  actions: string[];
                  preview: string;
                  previewIcon: string;
                  badgeColor: string;
                }
              > = {
                Lead: {
                  num: 1,
                  title: "Lead Capture & Multi-Channel Attribution",
                  tagline: "Instantly capture and attribute every student inquiry across Meta, Google, Website, and walk-ins.",
                  metrics: [
                    { label: "Response Velocity", value: "< 30s Auto-Dispatch" },
                    { label: "Source Tracking", value: "100% UTM & Campaign" },
                    { label: "Webhook Latency", value: "0s Real-Time Sync" },
                  ],
                  actions: [
                    "Ingests inquiries from Meta Lead Ads, Google Search, Website forms, WhatsApp & Campus Walk-ins",
                    "Automated WhatsApp brochure and welcome introduction message sent within seconds",
                    "Round-robin intelligent distribution assigns leads to available academic counselors",
                  ],
                  preview: "New inquiry from Meta Ads for B.Tech Data Science → Dispatched WhatsApp brochure & assigned to Counselor Priya",
                  previewIcon: "🌱",
                  badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
                },
                Counseling: {
                  num: 2,
                  title: "1-on-1 Academic Counseling & Guidance",
                  tagline: "Track calls, schedule campus walkthroughs, and nurture student interest with structured workflows.",
                  metrics: [
                    { label: "Demo Show-Up Rate", value: "92% Attendance" },
                    { label: "Telephony Cloud", value: "Audio Recording Active" },
                    { label: "Follow-Up Alerts", value: "Zero Missed Callbacks" },
                  ],
                  actions: [
                    "Integrated click-to-call telephony with automated call recording and outcome disposition tags",
                    "One-click calendar scheduling for campus walkthroughs and online video consultations",
                    "Automated WhatsApp reminder dispatches 24h & 2h prior to the scheduled counseling session",
                  ],
                  preview: "Counseling call completed with Rahul Kumar (Talk time: 7m 42s) → Campus visit booked for Sat 11 AM",
                  previewIcon: "💬",
                  badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                },
                Application: {
                  num: 3,
                  title: "Application Form & Digital Document Submission",
                  tagline: "Frictionless online application portal with automated document checklists and reminders.",
                  metrics: [
                    { label: "Completion Rate", value: "94.6% Conversion" },
                    { label: "Required Docs", value: "4 Core Verifications" },
                    { label: "Avg Submission Time", value: "6.5 Minutes" },
                  ],
                  actions: [
                    "Mobile-friendly application links sent via WhatsApp for self-service completion",
                    "Automated document collection for Aadhaar, Class 10/12 marksheets, and transfer certificates",
                    "Automated WhatsApp alerts remind students if any mandatory documents are pending",
                  ],
                  preview: "Application #APP-2026-081 completed online → Class 12 marksheet & Aadhaar card uploaded to vault",
                  previewIcon: "📝",
                  badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                },
                Admission: {
                  num: 4,
                  title: "Merit Evaluation & Provisional Admission Offer",
                  tagline: "Verify cut-offs, issue digital admission offer letters, and lock provisional quota seats.",
                  metrics: [
                    { label: "Review Duration", value: "< 2 Hours" },
                    { label: "Seat Locking Timer", value: "48-Hour Seat Hold" },
                    { label: "Offer Acceptance", value: "89% Intake Ratio" },
                  ],
                  actions: [
                    "Automated eligibility calculation against minimum aggregate academic cutoffs",
                    "Instantly generates branded Provisional Admission Offer Letter with verification QR code",
                    "Enforces quota seat reservations with dynamic expiry countdowns to prevent empty desks",
                  ],
                  preview: "Eligibility criteria met (88.4% Aggregate) → Provisional Admission Offer Letter generated for ED-2026-A",
                  previewIcon: "🎓",
                  badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
                },
                "Fee Payment": {
                  num: 5,
                  title: "Token Fee Locking & Installment Recovery",
                  tagline: "Collect initial seat confirmation tokens, manage flexible installment milestones, and auto-sync receipts.",
                  metrics: [
                    { label: "Collection Efficiency", value: "98.4% Realized" },
                    { label: "Payment Channels", value: "UPI, NetBanking, Cards" },
                    { label: "Accounting Sync", value: "₹0 Unreconciled" },
                  ],
                  actions: [
                    "Branded direct UPI payment links sent via WhatsApp with instant trust account confirmation",
                    "Automatic GST invoice generation and seamless synchronization with Tally ERP Prime / Zoho Books",
                    "Intelligent reminder cadence auto-sent 5 days before, on due date, and on overdue installments",
                  ],
                  preview: "Seat token payment of ₹25,000 cleared via UPI → Official GST Receipt #REC-801 dispatched on WhatsApp",
                  previewIcon: "💳",
                  badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
                },
                Creation: {
                  num: 6,
                  title: "Student Master Profile & Identity Creation",
                  tagline: "Promote accepted applicant to enrolled student with unique Roll Number, LMS login, and ID card.",
                  metrics: [
                    { label: "Provisioning Speed", value: "Instant Onboarding" },
                    { label: "Campus Credentials", value: "Automated Setup" },
                    { label: "Biometric Enrolment", value: "100% Synced" },
                  ],
                  actions: [
                    "Generates permanent university enrollment ID and student master profile in the central database",
                    "Provisions official student portal access, campus email address, and LMS course library",
                    "Activates RFID smart card and biometric punch terminal authentication for campus access",
                  ],
                  preview: "Roll Number UP-2026-081 assigned → Portal access & orientation timetable sent to student email",
                  previewIcon: "👤",
                  badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
                },
                Academics: {
                  num: 7,
                  title: "Curriculum, Batches & Academic Operations",
                  tagline: "Manage courses, batch scheduling, faculty allocation, syllabus progression, and lab timetables.",
                  metrics: [
                    { label: "Semester Modules", value: "Full Syllabus Tracking" },
                    { label: "Faculty Allocated", value: "8 Dedicated Professors" },
                    { label: "Lab Availability", value: "Real-Time Room Alloc." },
                  ],
                  actions: [
                    "Organizes students into cohorts, morning/evening shifts, and specialized seminar sections",
                    "Automated timetable schedule synchronization delivered directly to student & parent mobile apps",
                    "Faculty portal for posting assignments, syllabus status, and supplementary reading materials",
                  ],
                  preview: "Enrolled in B.Tech Data Science (Morning Batch ED-2026-A) → Next class: Python & Data Structures, Room 204",
                  previewIcon: "📖",
                  badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                },
                Attendance: {
                  num: 8,
                  title: "Smart Attendance & Compliance Monitoring",
                  tagline: "Ensure classroom presence with biometric hardware integration, RFID taps, and automated absence alerts.",
                  metrics: [
                    { label: "Current Attendance", value: "88.3% (Compliant)" },
                    { label: "Hardware Support", value: "Biometric & 50m Geo-Fence" },
                    { label: "Parent Notification", value: "Real-Time WhatsApp" },
                  ],
                  actions: [
                    "Biometric gate turnstiles and professor classroom mobile roll calls log presence in milliseconds",
                    "Real-time WhatsApp notifications dispatched to parents if student is marked absent without prior leave",
                    "Dynamic exam hall ticket eligibility calculator enforces the statutory 75% attendance criteria",
                  ],
                  preview: "Biometric punch logged at Gate 2 Hub (09:12 AM) → Total attendance: 106/120 classes (Eligible for exams)",
                  previewIcon: "📅",
                  badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                },
                Communication: {
                  num: 9,
                  title: "Omnichannel Communication & 24/7 AI Bot",
                  tagline: "Keep students and parents informed via WhatsApp broadcasts, SMS circulars, and AI assistance.",
                  metrics: [
                    { label: "Bot Resolution", value: "< 5s Instant Reply" },
                    { label: "Read Rate", value: "98% on WhatsApp" },
                    { label: "Broadcast Reach", value: "Full Batch Targeting" },
                  ],
                  actions: [
                    "AI conversational assistant answers timetable questions, holiday queries, and fees balances 24/7",
                    "Automated broadcast campaigns for exam schedules, fee alerts, campus events, and guest lectures",
                    "Two-way private counseling and parent consultation channels with complete historical message logs",
                  ],
                  preview: "WhatsApp announcement sent to Batch ED-2026-A: Mid-Term syllabus revision notes now downloadable in portal",
                  previewIcon: "📲",
                  badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
                },
                Graduation: {
                  num: 10,
                  title: "Graduation, Placement Drives & Alumni Network",
                  tagline: "Compile transcripts, verify certificates via QR code, facilitate placement drives, and track alumni.",
                  metrics: [
                    { label: "Placement Drive", value: "Tier-1 Recruiter Ready" },
                    { label: "Final CGPA", value: "8.85 / 10.0 (Grade A+)" },
                    { label: "Certificate Security", value: "QR Verified Digital Dip." },
                  ],
                  actions: [
                    "Automated transcript consolidation and CGPA computation across all semesters without manual errors",
                    "Placement cell module tracks student resumes, recruiter interview shortlists, and offer letters",
                    "Lifelong alumni network profile migration for career mentoring, reunions, and higher degree tracking",
                  ],
                  preview: "Final Academic Transcript verified (Grade A+) → Placement shortlist confirmed for Campus Placement Drive 2026",
                  previewIcon: "🎖️",
                  badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
                },
              };

              const stepDetailKeys = [
                "Lead",
                "Counseling",
                "Application",
                "Admission",
                "Fee Payment",
                "Creation",
                "Academics",
                "Attendance",
                "Communication",
                "Graduation",
              ];
              const stepNames = journey.steps;
              const currentIndex = stepNames.indexOf(activeJourneyStep);
              const info = {
                ...(journeyDetails[stepDetailKeys[currentIndex]] || journeyDetails["Lead"]),
                ...(journey.stepDetails[currentIndex] ?? {}),
              };

              const handlePrev = () => {
                if (currentIndex > 0) setActiveJourneyStep(stepNames[currentIndex - 1]);
              };
              const handleNext = () => {
                if (currentIndex < stepNames.length - 1) setActiveJourneyStep(stepNames[currentIndex + 1]);
              };

              return (
                <div className="mt-8 mx-auto max-w-4xl text-left rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-white p-6 sm:p-8 shadow-md transition-all">
                  {/* Top Bar with Stage Badge & Stepper Nav */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-xl shrink-0">
                        {info.previewIcon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${info.badgeColor}`}>
                            Stage {info.num} of 10
                          </span>
                          <span className="text-xs text-slate-400 font-mono">• Lifecycle Step</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                          {info.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          currentIndex === 0
                            ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400"
                            : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                        }`}
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentIndex === stepNames.length - 1}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          currentIndex === stepNames.length - 1
                            ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400"
                            : "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {info.tagline}
                  </p>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                    {info.metrics.map((m) => (
                      <div key={m.label} className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Workflows */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Automated Platform Actions in This Stage:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700 font-medium">
                      {info.actions.map((act) => (
                        <li key={act} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real-time simulation bar */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-center gap-2.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-500 shrink-0">Live Simulation:</span>
                    <span className="text-slate-800 font-semibold truncate">{info.preview}</span>
                  </div>
                </div>
              );
            })()}

            {/* Handwritten style quote */}
            <div className="mt-10 font-serif italic text-lg sm:text-xl text-emerald-800 tracking-wide">
              &ldquo;{journey.quote}&rdquo;
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 5: TWO SIDES. ONE PLATFORM. (Dark Slate/Navy Container)
        ========================================================================== */}
        <section className="py-20 bg-[#091a2b] text-white relative overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.1),transparent_70%)] blur-3xl"
          />

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            {/* Pill */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3">
              {platform.eyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {platform.heading}
            </h2>

            {/* 3-Part Architecture Grid */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              {/* Left Card: Admissions CRM */}
              <div className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-4">
                    📢
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{platform.crmTitle}</h3>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {platform.crmBody}
                  </p>

                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700 font-semibold">
                    {platform.crmFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center Element: Central Database Cylinder with bidirectional arrows */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center text-center gap-3">
                <div className="relative flex items-center justify-center">
                  {/* Glowing Rings */}
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center animate-pulse">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-2xl">
                      🗄️
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <span>←</span>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300">
                    {platform.databaseLabel}
                  </span>
                  <span>→</span>
                </div>

                <p className="text-[11px] text-slate-400 max-w-[180px] leading-tight">
                  {platform.databaseBody}
                </p>
              </div>

              {/* Right Card: Education ERP */}
              <div className="lg:col-span-5 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4">
                    🎓
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{platform.erpTitle}</h3>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {platform.erpBody}
                  </p>

                  <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700 font-semibold">
                    {platform.erpFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: ADMISSIONS MANAGEMENT (Feature Spotlight 1)
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase w-fit">
                  {admissions.eyebrow}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black tracking-tight text-slate-900 leading-tight">
                  {admissions.heading}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {admissions.body}
                </p>

                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
                  {admissions.features.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Console Mockup with Table */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-lg">
                  
                  {/* Top Bar inside console */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-500 w-full sm:w-64">
                      <span>🔍</span>
                      <span>Search student, course...</span>
                    </div>

                    <button
                      type="button"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition"
                    >
                      <span>+</span>
                      <span>Add Lead</span>
                    </button>
                  </div>

                  {/* Funnel Tabs */}
                  <div className="grid grid-cols-5 gap-1.5 py-3 border-b border-slate-100 text-center font-mono">
                    <button
                      type="button"
                      onClick={() => setSelectedPipelineStage("all")}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                        selectedPipelineStage === "all"
                          ? "bg-slate-100 border-slate-300"
                          : "bg-slate-50/50 border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 block">New Leads</span>
                      <span className="text-sm font-black text-slate-900">234</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPipelineStage("contacted")}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                        selectedPipelineStage === "contacted"
                          ? "bg-blue-100 border-blue-300"
                          : "bg-blue-50/50 border-blue-100 hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-[10px] text-blue-600 block">Contacted</span>
                      <span className="text-sm font-black text-blue-900">162</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPipelineStage("counseling")}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                        selectedPipelineStage === "counseling"
                          ? "bg-amber-100 border-amber-300"
                          : "bg-amber-50/50 border-amber-100 hover:bg-amber-50"
                      }`}
                    >
                      <span className="text-[10px] text-amber-600 block">Counseling</span>
                      <span className="text-sm font-black text-amber-900">86</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPipelineStage("applied")}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                        selectedPipelineStage === "applied"
                          ? "bg-purple-100 border-purple-300"
                          : "bg-purple-50/50 border-purple-100 hover:bg-purple-50"
                      }`}
                    >
                      <span className="text-[10px] text-purple-600 block">Applied</span>
                      <span className="text-sm font-black text-purple-900">42</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPipelineStage("enrolled")}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                        selectedPipelineStage === "enrolled"
                          ? "bg-emerald-100 border-emerald-300"
                          : "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50"
                      }`}
                    >
                      <span className="text-[10px] text-emerald-600 block">Enrolled</span>
                      <span className="text-sm font-black text-emerald-900">28</span>
                    </button>
                  </div>

                  {/* Leads Data Table */}
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">Source</th>
                          <th className="py-2.5 px-3">Course</th>
                          <th className="py-2.5 px-3">Stage</th>
                          <th className="py-2.5 px-3">Counselor</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.name} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 px-3 font-bold text-slate-800 flex items-center gap-2">
                              <span
                                className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ${lead.avatarBg}`}
                              >
                                {lead.name[0]}
                              </span>
                              <span>{lead.name}</span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-500">{lead.source}</td>
                            <td className="py-2.5 px-3 text-slate-700 font-medium">{lead.course}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${lead.stageColor}`}
                              >
                                {lead.stage}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{lead.counselor}</td>
                            <td className="py-2.5 px-3 text-right text-slate-400 font-mono font-bold hover:text-slate-600 cursor-pointer">
                              •••
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STUDENT 360° PROFILE (Feature Spotlight 2)
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase w-fit">
                  {studentProfile.eyebrow}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black tracking-tight text-slate-900 leading-tight">
                  {studentProfile.heading}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {studentProfile.body}
                </p>
              </div>

              {/* Right Column: Student 360 Card Mockup */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-lg">
                  
                  {/* Student Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-xs shrink-0 bg-slate-100">
                        <Image
                          src="/images/student-rahul.jpg"
                          alt="Rahul Kumar"
                          fill
                          sizes="48px"
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">Rahul Kumar</h3>
                          <span className="px-2 py-0.2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          B.Tech Data Science • Batch: ED-2026-A • Counselor: Priya
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80">
                      ID: UP-2026-081
                    </span>
                  </div>

                  {/* Horizontal Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 py-3 border-b border-slate-100 text-xs font-semibold">
                    {["Profile", "Fees", "Attendance", "Exams", "Documents", "Communication"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveStudentTab(tab)}
                        className={`px-3 py-1 rounded-lg transition cursor-pointer font-medium ${
                          activeStudentTab === tab
                            ? "bg-slate-900 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body: Dynamic Related Content */}
                  <div className="pt-4 transition-all">
                    
                    {/* TAB 1: PROFILE */}
                    {activeStudentTab === "Profile" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Phone:</span>
                            <span className="font-semibold text-slate-800 font-mono">+91 98765 43210</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Email:</span>
                            <span className="font-semibold text-slate-800">rahul@student.com</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Course:</span>
                            <span className="font-semibold text-slate-800">B.Tech Data Science (Honors)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Batch:</span>
                            <span className="font-semibold text-slate-800 font-mono">ED-2026-A (Morning)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Admission Date:</span>
                            <span className="font-semibold text-slate-800 font-mono">12 Mar 2026</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Parent / Guardian:</span>
                            <span className="font-semibold text-slate-800">Sanjay Kumar</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Status:</span>
                            <span className="font-bold text-emerald-600">Active (Full-Time)</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                            Recent Activity
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600">💰</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Fee payment received ₹30,000</p>
                                <span className="text-[9px] text-slate-400 font-mono">2 hours ago</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-blue-600">🎓</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Attended class - Python</p>
                                <span className="text-[9px] text-slate-400 font-mono">1 day ago</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-purple-600">📝</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Assignment submitted - ML Models</p>
                                <span className="text-[9px] text-slate-400 font-mono">2 days ago</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-amber-600">📄</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Document uploaded - Aadhaar</p>
                                <span className="text-[9px] text-slate-400 font-mono">3 days ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: FEES */}
                    {activeStudentTab === "Fees" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Total Program Fee:</span>
                            <span className="font-bold text-slate-900 font-mono">₹85,000</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Paid to Date:</span>
                            <span className="font-bold text-emerald-700 font-mono">₹55,000 (65%)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Remaining Balance:</span>
                            <span className="font-bold text-amber-700 font-mono">₹30,000</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Next Due Date:</span>
                            <span className="font-semibold text-rose-600 font-mono">15 Nov 2026 (Inst. 2)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Payment Mode:</span>
                            <span className="font-semibold text-slate-800">UPI / Razorpay Mandate</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Scholarship:</span>
                            <span className="font-semibold text-emerald-700">₹10,000 Merit Waiver</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                              Installment Ledger
                            </span>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                                <div>
                                  <span className="font-semibold text-slate-800 block text-[11px]">Token Advance Fee</span>
                                  <span className="text-[9px] text-slate-400 font-mono">Paid 12 Jul • Receipt #801</span>
                                </div>
                                <span className="font-mono font-bold text-emerald-700 text-xs">₹25,000 ✓</span>
                              </div>
                              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                                <div>
                                  <span className="font-semibold text-slate-800 block text-[11px]">Installment 1 of 2</span>
                                  <span className="text-[9px] text-slate-400 font-mono">Paid 15 Aug • Receipt #942</span>
                                </div>
                                <span className="font-mono font-bold text-emerald-700 text-xs">₹30,000 ✓</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-semibold text-slate-800 block text-[11px]">Installment 2 of 2</span>
                                  <span className="text-[9px] text-amber-600 font-mono font-semibold">Due 15 Nov 2026</span>
                                </div>
                                <span className="font-mono font-bold text-amber-700 text-xs">₹30,000 ⏳</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200/70 flex gap-2">
                            <button
                              type="button"
                              className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 transition text-center"
                            >
                              Download Receipt
                            </button>
                            <button
                              type="button"
                              className="flex-1 py-1 px-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-[10px] font-bold hover:bg-slate-50 transition text-center"
                            >
                              WhatsApp Payment Link
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: ATTENDANCE */}
                    {activeStudentTab === "Attendance" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Overall Attendance:</span>
                            <span className="font-bold text-emerald-700 font-mono text-sm">88.3%</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Lectures Attended:</span>
                            <span className="font-semibold text-slate-800 font-mono">106 / 120 Sessions</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Absences:</span>
                            <span className="font-semibold text-slate-800 font-mono">14 (10 Excused / Medical)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Biometric Punch ID:</span>
                            <span className="font-semibold text-slate-800 font-mono">BIO-8821 (Gate 2)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Last Punch:</span>
                            <span className="font-semibold text-slate-800 font-mono">Today, 09:12 AM</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Exam Eligibility:</span>
                            <span className="font-bold text-emerald-600">Eligible (Threshold: &gt;75%)</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                            Subject Attendance Breakdown
                          </span>
                          <div className="space-y-2 text-xs">
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
                                <span>Python &amp; Data Structures</span>
                                <span className="font-mono font-bold text-emerald-700">92%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
                                <span>Probability &amp; Linear Algebra</span>
                                <span className="font-mono font-bold text-emerald-700">86%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full w-[86%]" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
                                <span>Database Systems &amp; SQL</span>
                                <span className="font-mono font-bold text-emerald-700">89%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full w-[89%]" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] font-medium text-slate-700 mb-0.5">
                                <span>Machine Learning Laboratory</span>
                                <span className="font-mono font-bold text-emerald-700">84%</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full w-[84%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: EXAMS */}
                    {activeStudentTab === "Exams" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Cumulative GPA:</span>
                            <span className="font-bold text-emerald-700 font-mono text-sm">8.85 / 10.0 (Grade A+)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Current Standing:</span>
                            <span className="font-semibold text-slate-800">Semester 3 (Fall 2026)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Cohort Class Rank:</span>
                            <span className="font-bold text-indigo-700 font-mono">Rank #4 of 68 Students</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Practical Lab Score:</span>
                            <span className="font-semibold text-slate-800 font-mono">94 / 100</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">University Reg ID:</span>
                            <span className="font-semibold text-slate-800 font-mono">UNI-2026-DS-044</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Active Backlogs:</span>
                            <span className="font-bold text-emerald-600">0 (Clean Academic Record)</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                            Recent Exam Scores
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div>
                                <span className="font-semibold text-slate-800 text-[11px] block">Python Object-Oriented Design</span>
                                <span className="text-[9px] text-slate-400 font-mono">Mid-Term Assessment</span>
                              </div>
                              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">92/100 (A+)</span>
                            </div>
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div>
                                <span className="font-semibold text-slate-800 text-[11px] block">Advanced Data Engineering</span>
                                <span className="text-[9px] text-slate-400 font-mono">Mid-Term Assessment</span>
                              </div>
                              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">88/100 (A)</span>
                            </div>
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div>
                                <span className="font-semibold text-slate-800 text-[11px] block">SQL Database Practicum</span>
                                <span className="text-[9px] text-slate-400 font-mono">Practical Lab Examination</span>
                              </div>
                              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">95/100 (O)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-semibold text-slate-800 text-[11px] block">Campus Placement Drive</span>
                                <span className="text-[9px] text-emerald-600 font-mono font-semibold">Tier-1 Shortlist Ready</span>
                              </div>
                              <span className="text-emerald-700 text-xs font-bold font-mono">Qualified ✓</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 5: DOCUMENTS */}
                    {activeStudentTab === "Documents" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Verification Status:</span>
                            <span className="font-bold text-emerald-700">100% Complete (4/4)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Verification Officer:</span>
                            <span className="font-semibold text-slate-800">Priya Nair (Registrar)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">DigiLocker Integration:</span>
                            <span className="font-semibold text-emerald-700 font-mono">UIDAI Verified ✓</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Document Locker ID:</span>
                            <span className="font-semibold text-slate-800 font-mono">DOC-2026-8812</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Last Audit Date:</span>
                            <span className="font-semibold text-slate-800 font-mono">14 Mar 2026</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Original Physical Files:</span>
                            <span className="font-bold text-slate-800">Archived in Vault 3B</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                            Secure Document Vault
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div className="flex items-center gap-1.5 truncate">
                                <span>📄</span>
                                <span className="font-medium text-slate-800 text-[11px] truncate">Aadhaar Card (UIDAI)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Verified ✓
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div className="flex items-center gap-1.5 truncate">
                                <span>📄</span>
                                <span className="font-medium text-slate-800 text-[11px] truncate">Class 12 Marksheet (CBSE)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Verified ✓
                              </span>
                            </div>
                            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
                              <div className="flex items-center gap-1.5 truncate">
                                <span>📄</span>
                                <span className="font-medium text-slate-800 text-[11px] truncate">Transfer Certificate (TC)</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Verified ✓
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 truncate">
                                <span>📄</span>
                                <span className="font-medium text-slate-800 text-[11px] truncate">Entrance Exam Rank Card</span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Verified ✓
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 6: COMMUNICATION */}
                    {activeStudentTab === "Communication" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-150">
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Primary Channel:</span>
                            <span className="font-semibold text-emerald-700 font-mono">WhatsApp (+91 98765 43210)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Parent Phone:</span>
                            <span className="font-semibold text-slate-800 font-mono">+91 98450 12890</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Preferred Language:</span>
                            <span className="font-semibold text-slate-800">English / Hindi</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Assigned Counselor:</span>
                            <span className="font-semibold text-slate-800">Priya (Desk Ext: 204)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">SMS Alerts:</span>
                            <span className="font-semibold text-emerald-600">Subscribed (Active)</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Broadcast Opt-In:</span>
                            <span className="font-bold text-slate-800">Exam, Schedule &amp; Fee Alerts</span>
                          </div>
                        </div>

                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-700 block mb-2 uppercase tracking-wide">
                            Interaction Log
                          </span>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600">💬</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">WhatsApp: Tomorrow timetable sent</p>
                                <span className="text-[9px] text-slate-400 font-mono">Today, 08:30 AM • Delivered</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600">💬</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">WhatsApp: Installment receipt #942 dispatched</p>
                                <span className="text-[9px] text-slate-400 font-mono">15 Aug • Read by Parent</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-blue-600">✉️</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Email: Mid-term exam syllabus PDF</p>
                                <span className="text-[9px] text-slate-400 font-mono">3 days ago • Opened</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-purple-600">📞</span>
                              <div>
                                <p className="font-semibold text-slate-800 text-[11px]">Telephony: Counselor review call (4m 18s)</p>
                                <span className="text-[9px] text-slate-400 font-mono">5 days ago • Call Recorded</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: 3-COLUMN CORE ERP FEATURES GRID
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Column 1: Academic Management */}
              <div className="bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4">
                    🎓
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{erpFeatures[0].title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{erpFeatures[0].body}</p>

                  <ul className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    {erpFeatures[0].features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini Calendar Widget */}
                <div className="mt-6 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-2">
                    <span>Class Attendance</span>
                    <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                      88% Overall
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-slate-500">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                    <span className="bg-emerald-100 text-emerald-800 rounded p-1 font-bold">1</span>
                    <span className="bg-emerald-100 text-emerald-800 rounded p-1 font-bold">2</span>
                    <span className="bg-emerald-100 text-emerald-800 rounded p-1 font-bold">3</span>
                    <span className="bg-emerald-100 text-emerald-800 rounded p-1 font-bold">4</span>
                    <span className="bg-rose-100 text-rose-800 rounded p-1 font-bold">5</span>
                    <span className="bg-slate-100 rounded p-1">6</span>
                    <span className="bg-slate-100 rounded p-1">7</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Fees & Finance */}
              <div className="bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl mb-4">
                    💳
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{erpFeatures[1].title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{erpFeatures[1].body}</p>

                  <ul className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    {erpFeatures[1].features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini Fee Stats Widget */}
                <div className="mt-6 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100">
                      <span className="text-[10px] text-blue-600 block uppercase font-bold">Total Fees</span>
                      <span className="text-sm font-black text-blue-900 font-mono">₹82.4L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-[10px] text-emerald-600 block uppercase font-bold">Collected</span>
                      <span className="text-sm font-black text-emerald-900 font-mono">₹51.6L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
                      <span className="text-[10px] text-amber-600 block uppercase font-bold">Pending</span>
                      <span className="text-sm font-black text-amber-900 font-mono">₹14.2L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-100">
                      <span className="text-[10px] text-rose-600 block uppercase font-bold">Overdue</span>
                      <span className="text-sm font-black text-rose-900 font-mono">₹6.4L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: WhatsApp & Communication */}
              <div className="bg-slate-50/60 rounded-3xl p-6 sm:p-7 border border-slate-200/80 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-4">
                    💬
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{erpFeatures[2].title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{erpFeatures[2].body}</p>

                  <ul className="mt-5 space-y-2 text-xs font-semibold text-slate-700">
                    {erpFeatures[2].features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Smartphone WhatsApp Mockup */}
                <div className="mt-6 bg-[#0c1815] text-white p-3 rounded-2xl border border-emerald-900/40 shadow-2xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-emerald-900/60">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                      🤖
                    </span>
                    <span className="text-[11px] font-bold text-slate-200">EduPro Bot</span>
                    <span className="text-[9px] text-emerald-400 font-mono ml-auto">● Online</span>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="bg-[#183129] p-2 rounded-xl text-[10px] text-emerald-100 leading-snug">
                      Your Next Data Analytics class is tomorrow at 10:00 AM. Room 204. Trainer: Rohit. Would you like the timetable?
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setChatReplied("yes")}
                        className="flex-1 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[9px] cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setChatReplied("timetable")}
                        className="flex-1 py-1 rounded-lg bg-[#224438] hover:bg-[#2b5446] text-emerald-200 font-bold text-[9px] cursor-pointer"
                      >
                        View Timetable
                      </button>
                    </div>

                    {chatReplied && (
                      <div className="text-[9px] text-emerald-400 italic text-center pt-0.5">
                        ✓ Response recorded in student profile
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: MANAGEMENT DASHBOARD & BEFORE VS AFTER
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Card 1: Management Dashboard */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
                    <span>📊</span>
                    <span>{management.dashboardEyebrow}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {management.dashboardHeading}
                  </h3>

                  {/* 6 Grid Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                    {management.metrics.map((metric, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">{metric.label}</span>
                        <span className="text-lg font-black text-slate-900 font-mono">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Charts preview: Bar chart & Donut */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  {/* Revenue Trend bars */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-600 block mb-2">Revenue Trend</span>
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                      <div className="w-1/6 bg-emerald-300 rounded-t h-[40%]" />
                      <div className="w-1/6 bg-emerald-400 rounded-t h-[55%]" />
                      <div className="w-1/6 bg-emerald-400 rounded-t h-[65%]" />
                      <div className="w-1/6 bg-emerald-500 rounded-t h-[80%]" />
                      <div className="w-1/6 bg-emerald-600 rounded-t h-[92%]" />
                      <div className="w-1/6 bg-emerald-700 rounded-t h-[100%]" />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                    </div>
                  </div>

                  {/* Leads by source pie mini */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="relative w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-[conic-gradient(#3b82f6_0deg_115deg,#8b5cf6_115deg_216deg,#f59e0b_216deg_280deg,#10b981_280deg_360deg)] p-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[8px] font-bold font-mono">
                        98%
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-600 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Website 32%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Meta 28%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Google 18%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> WhatsApp 14%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Before vs After */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase mb-2">
                    <span>⚡</span>
                    <span>{management.comparisonEyebrow}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {management.comparisonHeading}
                  </h3>

                  {/* Comparison Table */}
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 text-xs">
                    <div className="grid grid-cols-2 bg-slate-50 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <div className="p-3 text-rose-700 bg-rose-50/50">{management.comparisonBeforeLabel}</div>
                      <div className="p-3 text-emerald-800 bg-emerald-50/50">{management.comparisonAfterLabel}</div>
                    </div>

                    <div className="divide-y divide-slate-100 font-medium">
                      {management.comparisons.map((row, i) => (
                        <div key={i} className="grid grid-cols-2 hover:bg-slate-50/50 transition">
                          <div className="p-2.5 text-slate-500 flex items-center gap-1.5">
                            <span className="text-rose-400">✕</span>
                            <span>{row.before}</span>
                          </div>
                          <div className="p-2.5 font-bold text-slate-800 bg-emerald-50/20 flex items-center gap-1.5">
                            <span className="text-emerald-600">✓</span>
                            <span>{row.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Ready to modernize your institution?
                  </span>
                  <Link
                    href="/crm#demo"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    <span>Get Started</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: INSTITUTIONAL CASE STUDIES (Prominent 3-Card Showcase)
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
              
              {/* Case Study Card 1: Apex Institute of Technology */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-white/10">
                        {caseStudies.cards[0].category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{caseStudies.cards[0].campuses}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-emerald-400 font-mono leading-none">
                          {caseStudies.cards[0].metric1}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[0].metric1Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          {caseStudies.cards[0].metric2}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[0].metric2Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-emerald-300 font-mono leading-none">
                          {caseStudies.cards[0].metric3}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[0].metric3Label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 tracking-wider">
                        {caseStudies.cards[0].location}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-emerald-700 transition-colors">
                        {caseStudies.cards[0].title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {caseStudies.cards[0].body}
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> {caseStudies.cards[0].before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> {caseStudies.cards[0].after}</span>
                      </div>
                    </div>

                    {/* Dean Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                        AS
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;{caseStudies.cards[0].quote}&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          {caseStudies.cards[0].author}
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
                      setSelectedCaseStudy("apex");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>Read Full Case Study</span>
                    <span className="text-emerald-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

              {/* Case Study Card 2: Vanguard Global Business School */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-blue-300 border border-white/10">
                        {caseStudies.cards[1].category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{caseStudies.cards[1].campuses}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-blue-400 font-mono leading-none">
                          {caseStudies.cards[1].metric1}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[1].metric1Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          {caseStudies.cards[1].metric2}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[1].metric2Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-indigo-300 font-mono leading-none">
                          {caseStudies.cards[1].metric3}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[1].metric3Label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-blue-700 tracking-wider">
                        {caseStudies.cards[1].location}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-blue-700 transition-colors">
                        {caseStudies.cards[1].title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {caseStudies.cards[1].body}
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> {caseStudies.cards[1].before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> {caseStudies.cards[1].after}</span>
                      </div>
                    </div>

                    {/* Dean Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0 border border-blue-300">
                        MS
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;{caseStudies.cards[1].quote}&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          {caseStudies.cards[1].author}
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
                      setSelectedCaseStudy("vanguard");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>{caseStudies.readButton}</span>
                    <span className="text-blue-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

              {/* Case Study Card 3: St. Jude College of Health Sciences */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-teal-300 border border-white/10">
                        {caseStudies.cards[2].category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{caseStudies.cards[2].campuses}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-teal-400 font-mono leading-none">
                          {caseStudies.cards[2].metric1}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[2].metric1Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          {caseStudies.cards[2].metric2}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[2].metric2Label}</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-cyan-300 font-mono leading-none">
                          {caseStudies.cards[2].metric3}
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">{caseStudies.cards[2].metric3Label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-teal-700 tracking-wider">
                        {caseStudies.cards[2].location}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-teal-700 transition-colors">
                        {caseStudies.cards[2].title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {caseStudies.cards[2].body}
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> {caseStudies.cards[2].before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> {caseStudies.cards[2].after}</span>
                      </div>
                    </div>

                    {/* Trustee Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0 border border-teal-300">
                        RP
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;{caseStudies.cards[2].quote}&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          {caseStudies.cards[2].author}
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
                      setSelectedCaseStudy("stjude");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>{caseStudies.readButton}</span>
                    <span className="text-teal-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Support Callout Banner */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  Want to achieve similar admission velocity and zero fee leakage?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Our Education Solutions team will walk you through customized case study blueprints for your specific college or university setup.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <Link
                  href="/crm#demo"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  Book 1-on-1 Campus Walkthrough →
                </Link>
                <Link
                  href="/crm/contact"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
                >
                  Contact Education Team
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 11: VIDEO TESTIMONIALS
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
              {videos.cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setActiveVideoId(card.id);
                    setShowVideoPopup(true);
                  }}
                  className="group cursor-pointer rounded-3xl border border-slate-200/90 p-4 bg-white shadow-2xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Dark Video Thumbnail Box */}
                  <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-[#0a0e27] via-[#0f1738] to-[#1e295d] overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(16,185,129,0.35),transparent_65%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                    {/* Central Play Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoId(card.id);
                        setShowVideoPopup(true);
                      }}
                      className="relative z-10 h-14 w-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-300 cursor-pointer"
                      aria-label={`Play ${card.speaker} interview video`}
                    >
                      <span className="text-white text-base ml-1">▶</span>
                    </button>

                    {/* Bottom-left pill badge */}
                    <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white font-mono">
                      {card.tag}
                    </div>

                    {/* Bottom-right duration */}
                    <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                      {card.duration}
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
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: CUSTOMER REVIEWS & WALL OF SOCIAL PROOF
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
                  onClick={() => setReviewFilter(tab.id as typeof reviewFilter)}
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
                        <div className="flex text-amber-400 text-sm tracking-tighter">
                          {"★".repeat(r.stars)}
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
                        <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                          ✓ {r.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
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
                <Link
                  href={finalCta.buttonLink}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition"
                >
                  {finalCta.buttonLabel} →
                </Link>
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
            FINAL CTA BANNER
        ========================================================================== */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f0f9f6]/60 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {finalCta.bannerHeading}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              {finalCta.bannerBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={finalCta.primaryButtonLink}
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                {finalCta.primaryButtonLabel} →
              </Link>
              <Link
                href={finalCta.secondaryButtonLink}
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-300 shadow-xs transition"
              >
                {finalCta.secondaryButtonLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Modal for "See How It Works" / "Book a Demo" */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setShowDemoModal(false);
                setDemoSubmitted(false);
                setDemoError("");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-3">
              🎓
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {demoModal.heading}
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              {demoModal.body}
            </p>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <span className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </span>
                <h4 className="text-lg font-bold text-slate-900">{demoModal.successHeading}</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  {demoModal.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowDemoModal(false);
                    setDemoSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  {demoModal.doneButton}
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setDemoSubmitting(true);
                  setDemoError("");
                  const fd = new FormData(e.currentTarget);
                  fd.append("source", "College ERP Demo Modal");
                  fd.append("pageUrl", typeof window !== "undefined" ? window.location.href : "/college");
                  const res = await submitLead(fd).catch(() => ({ ok: false, error: "Network error. Please try again." }));
                  setDemoSubmitting(false);
                  if (!res.ok) {
                    setDemoError(res.error || "Submission failed. Please try again.");
                    return;
                  }
                  setDemoSubmitted(true);
                }}
                className="space-y-3 pt-3 text-xs"
              >
                {demoError && (
                  <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs">
                    ⚠️ {demoError}
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
                      name="company"
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
                    {demoModal.businessTypes.map((businessType) => (
                      <option key={businessType.value} value={businessType.value}>{businessType.label}</option>
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
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    🔒 {demoModal.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Interactive Video Testimonials Modal */}
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
                  🎬 {videos.eyebrow}
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  {activeVideo?.interviewTitle}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowVideoPopup(false)}
                className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition cursor-pointer"
                aria-label="Close video player"
              >
                ✕
              </button>
            </div>

            {/* Video Player Mockup Container */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 border border-slate-800 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-slate-900/90 to-slate-950" />
              
              {/* Top Watermark */}
              <div className="relative z-10 flex items-center justify-between text-xs text-white/80">
                <span className="font-mono font-bold text-emerald-400">● LIVE RECORDING ARCHIVE</span>
                <span className="bg-white/10 px-2 py-0.5 rounded font-mono text-[10px]">1080p HD</span>
              </div>

              {/* Center Interview Visualization */}
              <div className="relative z-10 my-auto text-center flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center text-2xl shadow-lg ring-4 ring-emerald-500/30 animate-pulse">
                  ▶
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

              {/* Bottom Video Timeline & Controls */}
              <div className="relative z-10 flex flex-col gap-2 pt-2 border-t border-white/10">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[44%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/70 font-mono">
                  <span>1:38 / 3:45</span>
                  <div className="flex items-center gap-3">
                    <span>1.0x Speed</span>
                    <span>🔊 80%</span>
                  </div>
                </div>
              </div>
            </div>

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

      {/* Interactive Case Study Dossier Modal */}
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
                  📋 {caseStudies.modal.eyebrow}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {selectedCaseStudyCard?.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowCaseStudyModal(false)}
                className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition cursor-pointer"
              >
                ✕
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
                <Link
                  href={finalCta.primaryButtonLink}
                  onClick={() => setShowCaseStudyModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  {caseStudies.modal.demoButton}
                </Link>
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

      <PulseFooter content={footer} />
    </div>
  );
}
