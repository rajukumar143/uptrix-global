"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import LogoMarquee from "@/components/site/LogoMarquee";
import { submitLead } from "@/app/actions/lead";
import type { HeaderContent } from "@/content/header";
import type { CrmLayoutContent } from "@/content/crm";

interface RealEstateLandingPageProps {
  header: HeaderContent;
  footer: CrmLayoutContent["footer"];
}

export default function RealEstateLandingPage({ header, footer }: RealEstateLandingPageProps) {
  // Interactive state for sales leads pipeline table filter
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string>("all");

  // Interactive state for Buyer 360 tab
  const [activeBuyerTab, setActiveBuyerTab] = useState<string>("Profile");

  // Interactive state for WhatsApp demo
  const [chatReplied, setChatReplied] = useState<string | null>(null);

  // Interactive modal state for "Book a VIP Demo"
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [demoSubmitting, setDemoSubmitting] = useState<boolean>(false);
  const [demoError, setDemoError] = useState<string>("");

  // Interactive state for The Complete Journey stepper
  const [activeJourneyStep, setActiveJourneyStep] = useState<string>("Lead");

  // Interactive state for Business Insights
  const [insightFilter, setInsightFilter] = useState<"all" | "sales" | "inventory" | "collections">("all");
  const [bulkReminderSent, setBulkReminderSent] = useState<boolean>(false);
  const [showReportsModal, setShowReportsModal] = useState<boolean>(false);

  // Interactive state for Case Studies
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"elysium" | "aurora" | "horizon">("elysium");
  const [showCaseStudyModal, setShowCaseStudyModal] = useState<boolean>(false);

  // Interactive state for Video Testimonials
  const [activeVideoId, setActiveVideoId] = useState<string>("video-1");
  const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);

  // Interactive state for Reviews
  const [reviewFilter, setReviewFilter] = useState<"all" | "residential" | "commercial" | "brokers">("all");

  // Interactive state for FAQ accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const leadsTableData = [
    {
      name: "Vikram Singhania",
      source: "99acres",
      project: "Emerald Bay - 3BHK",
      budget: "₹2.45 Cr",
      stage: "Site Visit",
      stageColor: "bg-amber-50 text-amber-700 border-amber-200",
      manager: "Kavita R.",
      avatarBg: "bg-blue-600",
    },
    {
      name: "Ananya Deshmukh",
      source: "MagicBricks",
      project: "Skyline Towers - 4BHK",
      budget: "₹3.80 Cr",
      stage: "Token Paid",
      stageColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      manager: "Rahul M.",
      avatarBg: "bg-emerald-600",
    },
    {
      name: "Rohan & Pooja Varma",
      source: "Meta Ads",
      project: "The Grove Villas",
      budget: "₹4.10 Cr",
      stage: "Qualified",
      stageColor: "bg-blue-50 text-blue-700 border-blue-200",
      manager: "Priya S.",
      avatarBg: "bg-purple-600",
    },
    {
      name: "Suresh Pillai",
      source: "CP Broker (JLL)",
      project: "Vertex Commercial Hub",
      budget: "₹6.50 Cr",
      stage: "Negotiation",
      stageColor: "bg-rose-50 text-rose-700 border-rose-200",
      manager: "Amit K.",
      avatarBg: "bg-rose-600",
    },
    {
      name: "Meera Nair",
      source: "Google Search",
      project: "Emerald Bay - 2BHK",
      budget: "₹1.65 Cr",
      stage: "Contacted",
      stageColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      manager: "Kavita R.",
      avatarBg: "bg-teal-600",
    },
  ];

  const filteredLeads =
    selectedPipelineStage === "all"
      ? leadsTableData
      : leadsTableData.filter(
          (lead) => lead.stage.toLowerCase() === selectedPipelineStage.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1e293b] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header content={header} />

      <main className="overflow-hidden">
        {/* =========================================================================
            SECTION 1: HERO SECTION
        ========================================================================== */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-[#f0f9f6]/70 via-[#f8fafc] to-white border-b border-slate-200/80">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.09),transparent_65%)]"
          />

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline, CTAs, Benefits */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold tracking-wider uppercase w-fit shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>REAL ESTATE CRM + DEVELOPER ERP</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] leading-[1.14] font-black tracking-tight text-slate-900">
                  Close More Bookings. <br className="hidden sm:inline" />
                  Manage Every Unit. <br className="hidden sm:inline" />
                  From{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    One Connected Platform
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Unified lead-to-possession operating system for builders, developers, and high-velocity channel partners. Sync portal leads, automate site visits, manage live inventory, and recover milestone payments without spreadsheets.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 cursor-pointer"
                  >
                    <span>Book a 1-on-1 Product Demo</span>
                    <span className="ml-2 font-mono">→</span>
                  </button>

                  <a
                    href="#journey-section"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 font-bold text-sm shadow-xs transition cursor-pointer"
                  >
                    <span>Explore 10-Stage Lifecycle</span>
                  </a>
                </div>

                {/* Micro-Benefits Checklist */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 max-w-lg">
                  {[
                    "99acres & MagicBricks Instant Sync",
                    "3D Live Inventory Matrix",
                    "RERA Milestone Demand Notices",
                    "Channel Partner (CP) Self-Serve Portal",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Real Estate Sales Cockpit */}
              <div className="lg:col-span-6 relative">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  
                  {/* Console Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-800">
                        Emerald Bay (Tower A &amp; B)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>LIVE PRE-SALES RADAR</span>
                      </span>
                    </div>
                  </div>

                  {/* Stage Filter Buttons */}
                  <div className="flex flex-wrap gap-1.5 my-4 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60">
                    {[
                      { key: "all", label: "All Leads" },
                      { key: "qualified", label: "Qualified" },
                      { key: "site visit", label: "Site Visit" },
                      { key: "token paid", label: "Token Paid" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setSelectedPipelineStage(tab.key)}
                        className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                          selectedPipelineStage === tab.key
                            ? "bg-white text-emerald-800 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Live Leads Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="pb-2">Buyer / Investor</th>
                          <th className="pb-2">Unit / Budget</th>
                          <th className="pb-2">Stage</th>
                          <th className="pb-2 text-right">Manager</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => (
                          <tr key={lead.name} className="hover:bg-slate-50/70 transition">
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full ${lead.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                                  {lead.name[0]}
                                </span>
                                <div>
                                  <span className="font-bold text-slate-800 block">{lead.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{lead.source}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5">
                              <span className="font-medium text-slate-700 block">{lead.project}</span>
                              <span className="text-[10px] font-mono text-emerald-600 font-bold">{lead.budget}</span>
                            </td>
                            <td className="py-2.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${lead.stageColor}`}>
                                {lead.stage}
                              </span>
                            </td>
                            <td className="py-2.5 text-right font-medium text-slate-600">
                              {lead.manager}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* WhatsApp Automated Brochure Simulation Card */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl border-t">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                        💬
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            WhatsApp Business Auto-Cadence
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Dispatched in 11s
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          {chatReplied ||
                            '“Hello Vikram, thanks for inquiring about Emerald Bay 3BHK. Floor plan PDF, cost sheet and Sunday site visit slot sent.”'}
                        </p>
                        
                        {/* Interactive WhatsApp reply test buttons */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <button
                            type="button"
                            onClick={() => setChatReplied("📍 VIP Site Visit Booked: Sun 11:30 AM with Sales Lead Kavita. Gate QR Pass generated.")}
                            className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 border border-slate-200 text-[10px] font-bold text-slate-700 hover:text-emerald-700 transition cursor-pointer"
                          >
                            Simulate: Book Site Visit
                          </button>
                          <button
                            type="button"
                            onClick={() => setChatReplied("📑 Unit Cost Sheet Sent: Unit #A-1402 (1,840 sq.ft) with all-inclusive pricing breakdown.")}
                            className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 border border-slate-200 text-[10px] font-bold text-slate-700 hover:text-emerald-700 transition cursor-pointer"
                          >
                            Simulate: Send Cost Sheet
                          </button>
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
          heading="Trusted by 180+ Real Estate Developers & Promoters Across India"
          names={[
            "Prestige Group",
            "Sobha Ltd",
            "Oberoi Realty",
            "Godrej Properties",
            "Brigade Enterprises",
            "Puravankara",
            "Casagrand",
            "Mahindra Lifespaces",
            "DLF",
            "Lodha Group",
          ]}
          id="real-estate-trust-heading"
        />

        {/* =========================================================================
            SECTION 2: THE CHALLENGE (WHY REAL ESTATE POINT SOLUTIONS BREAK DOWN)
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wider uppercase mb-3">
              THE REAL ESTATE DILEMMA
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why Real Estate Sales &amp; Collections Break Down
            </h2>

            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Real estate developers spend lakhs every month on portal ads and broker commissions, yet lose high-ticket bookings in spreadsheet chaos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
              {[
                {
                  icon: "⏳",
                  title: "Leads Go Cold in Hours",
                  desc: "Portals like 99acres and MagicBricks send high-intent buyers, but sales teams take 4+ hours to call back. By then, the buyer is visiting another developer’s site.",
                  metric: "68% Drop-off Rate",
                },
                {
                  icon: "📊",
                  title: "Double-Booking Inventory",
                  desc: "Sales executives book the same prime corner unit over phone calls while the site office was already locking it on an offline register.",
                  metric: "Zero Real-Time Stock",
                },
                {
                  icon: "💸",
                  title: "Payment Milestone Delays",
                  desc: "Slab completion demand notices are sent late via manual postal mail or forgotten, creating months of cashflow crunch and delayed project delivery.",
                  metric: "₹18 Cr+ Unrecovered",
                },
                {
                  icon: "🤝",
                  title: "Broker Commission Disputes",
                  desc: "Channel partners submit leads through WhatsApp chats. Without automated client registration timestamps, conflicts arise over who closed the deal.",
                  metric: "Lost Partner Trust",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/60 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-xl mb-4">
                      {c.icon}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono font-bold text-rose-600">
                    <span>Impact:</span>
                    <span>{c.metric}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 3: REAL-TIME BUSINESS INSIGHTS & SALES RADAR
        ========================================================================== */}
        <section className="py-6 sm:py-8 bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f7fb] border-b border-slate-200/80 relative overflow-hidden">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-white shadow-sm">
              
              {/* Header with Title and Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wider uppercase mb-1">
                    LIVE SALES VELOCITY RADAR
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Executive Dashboard &amp; Inventory Telemetry
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
                    {[
                      { key: "all", label: "Overview" },
                      { key: "sales", label: "Pre-Sales" },
                      { key: "inventory", label: "Inventory" },
                      { key: "collections", label: "Collections" },
                    ].map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => {
                          setInsightFilter(f.key as any);
                          setBulkReminderSent(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          insightFilter === f.key
                            ? "bg-white text-emerald-800 shadow-2xs font-extrabold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowReportsModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Export MIS Report
                  </button>
                </div>
              </div>

              {/* Dynamic 4 Cards & Action Banner Based on Selected Tab */}
              {(() => {
                const telemetryData: Record<
                  "all" | "sales" | "inventory" | "collections",
                  {
                    cards: { label: string; value: string; sub: string; trend: string; color: string; icon: string }[];
                    bannerTitle: string;
                    bannerSub: string;
                    bannerBtn: string;
                    bannerSuccess: string;
                  }
                > = {
                  all: {
                    cards: [
                      {
                        icon: "📈",
                        label: "Active Pipeline Value",
                        value: "₹84.60 Cr",
                        sub: "142 Qualified Inquiries",
                        trend: "+19.4% MoM",
                        color: "text-emerald-600",
                      },
                      {
                        icon: "🏛️",
                        label: "Site Visit Turnout Ratio",
                        value: "84.2%",
                        sub: "69 Visits Completed this week",
                        trend: "+12.1% Conversion",
                        color: "text-blue-600",
                      },
                      {
                        icon: "🏢",
                        label: "Total Units Sold / Locked",
                        value: "148 / 180",
                        sub: "82.2% Total Inventory Sold",
                        trend: "Tower A 96% Full",
                        color: "text-purple-600",
                      },
                      {
                        icon: "💸",
                        label: "Overdue Construction Demands",
                        value: "₹4.12 Cr",
                        sub: "28 Buyers on 7th Slab",
                        trend: "Auto-Cadence Active",
                        color: "text-amber-600",
                      },
                    ],
                    bannerTitle: "Automated 7th Slab Demand Notice Ready (₹4.12 Cr)",
                    bannerSub: "Architect milestone certified. Click to dispatch WhatsApp demand letters with Razorpay UPI & RTGS virtual accounts.",
                    bannerBtn: "Dispatch WhatsApp Demands Now",
                    bannerSuccess: "✓ 28 Demands Dispatched!",
                  },
                  sales: {
                    cards: [
                      {
                        icon: "⚡",
                        label: "Pre-Sales Response Speed",
                        value: "< 14 Seconds",
                        sub: "99acres & MagicBricks leads dialed",
                        trend: "+52% Connect Rate",
                        color: "text-emerald-600",
                      },
                      {
                        icon: "🏆",
                        label: "Top Closer Leaderboard",
                        value: "Kavita R. (38.4%)",
                        sub: "48 Calls today • 12 Visits booked",
                        trend: "Rank #1 Closer",
                        color: "text-blue-600",
                      },
                      {
                        icon: "📅",
                        label: "Weekend Site Visit Slots",
                        value: "34 / 40 Booked",
                        sub: "85% Capacity at Experience Center",
                        trend: "High Footfall",
                        color: "text-purple-600",
                      },
                      {
                        icon: "🤝",
                        label: "Channel Partner Inquiries",
                        value: "62 Leads Active",
                        sub: "From 28 CP Brokers registered",
                        trend: "0% Commission Conflict",
                        color: "text-amber-600",
                      },
                    ],
                    bannerTitle: "Weekend Experience Center VIP Passes Ready (34 Buyers)",
                    bannerSub: "Send personalized WhatsApp passes with Google Maps directions, QR parking code, and sales closer assignment.",
                    bannerBtn: "Dispatch 34 VIP Passes Now",
                    bannerSuccess: "✓ 34 QR Passes Dispatched!",
                  },
                  inventory: {
                    cards: [
                      {
                        icon: "🏢",
                        label: "Available Unit Stock",
                        value: "32 Units Left",
                        sub: "Tower A: 4 • Tower B: 18 • Villas: 10",
                        trend: "148 Sold Out",
                        color: "text-emerald-600",
                      },
                      {
                        icon: "⭐",
                        label: "Fastest Moving Layout",
                        value: "3BHK East Facing",
                        sub: "100% Sold in Tower A • 4 left in B",
                        trend: "High Demand",
                        color: "text-blue-600",
                      },
                      {
                        icon: "🔒",
                        label: "Active 2-Hour Soft Locks",
                        value: "6 Units Reserved",
                        sub: "Token advance in progress via UPI",
                        trend: "Expires in 42m",
                        color: "text-purple-600",
                      },
                      {
                        icon: "📊",
                        label: "Avg Realization Rate",
                        value: "₹11,250 / sq.ft",
                        sub: "+8.5% price rise after 14th slab",
                        trend: "+18.2% Project ROI",
                        color: "text-amber-600",
                      },
                    ],
                    bannerTitle: "Phase-2 Price Escalation Rule Trigger (18 Units Left in Tower B)",
                    bannerSub: "Automatic +₹250/sq.ft price revision alert ready to be sent to 94 warm inquiries on WhatsApp.",
                    bannerBtn: "Broadcast Price Revision Alert",
                    bannerSuccess: "✓ Price Revision Sent to 94 Buyers!",
                  },
                  collections: {
                    cards: [
                      {
                        icon: "💰",
                        label: "Month Realized Collections",
                        value: "₹14.85 Cr Cleared",
                        sub: "96.4% of expected milestone tranches",
                        trend: "+22.8% vs Last Mo",
                        color: "text-emerald-600",
                      },
                      {
                        icon: "⏳",
                        label: "Overdue 7th Slab Aging",
                        value: "₹4.12 Cr (28 Buyers)",
                        sub: "12 days overdue • Auto-penalty active",
                        trend: "RERA Escrow Slabs",
                        color: "text-rose-600",
                      },
                      {
                        icon: "🏦",
                        label: "Bank Loan Disbursal Queue",
                        value: "₹8.60 Cr Approved",
                        sub: "Tranches awaiting tripartite sign-off",
                        trend: "HDFC & SBI APF",
                        color: "text-blue-600",
                      },
                      {
                        icon: "🛡️",
                        label: "RERA Escrow Reconciliation",
                        value: "100% Synced",
                        sub: "₹0 unreconciled credits • Tally sync",
                        trend: "Zero Audit Gaps",
                        color: "text-emerald-600",
                      },
                    ],
                    bannerTitle: "Dispatch 7th Slab Final Demand Notices via WhatsApp (₹4.12 Cr)",
                    bannerSub: "Trigger 1-click Razorpay UPI & ICICI Virtual Account payment links with automated late interest to 28 overdue buyers.",
                    bannerBtn: "Send Final Demand Notices",
                    bannerSuccess: "✓ Final Demands Sent to 28 Buyers!",
                  },
                };

                const currentData = telemetryData[insightFilter] || telemetryData.all;

                return (
                  <div key={insightFilter} className="animate-in fade-in duration-200">
                    {/* 4 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                      {currentData.cards.map((stat) => (
                        <div
                          key={stat.label}
                          className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 hover:bg-white hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              {stat.label}
                            </span>
                            <span className="text-base">{stat.icon}</span>
                          </div>
                          <span className="text-2xl font-black text-slate-900 mt-1 block">
                            {stat.value}
                          </span>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50 text-[10px]">
                            <span className="text-slate-500 font-medium">{stat.sub}</span>
                            <span className={`font-bold font-mono ${stat.color}`}>{stat.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Action Banner */}
                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                          ⚡
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {currentData.bannerTitle}
                          </h4>
                          <p className="text-[11px] text-slate-600">
                            {currentData.bannerSub}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setBulkReminderSent(true)}
                        disabled={bulkReminderSent}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                          bulkReminderSent
                            ? "bg-emerald-700 text-white cursor-default"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {bulkReminderSent ? currentData.bannerSuccess : currentData.bannerBtn}
                      </button>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE COMPLETE 10-STAGE REAL ESTATE LIFECYCLE (THE STEPPER)
        ========================================================================== */}
        <section id="journey-section" className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
              THE COMPLETE REAL ESTATE LIFECYCLE
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              From First Portal Inquiry to Key Possession — One Connected System
            </h2>

            <p className="mt-2 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Automate the full buyer journey across sales, site visits, legal BBA, inventory, and construction-linked billing.
            </p>

            {/* Stepper with 10 Circular Nodes — Perfectly Padded with No Top Clipping */}
            <div className="mt-10 overflow-x-auto py-6">
              <div className="min-w-[940px] flex items-center justify-between relative px-6 pt-4 pb-2">
                
                {/* Connecting Track Line */}
                <div className="absolute top-[40px] -translate-y-1/2 left-12 right-12 h-0.5 bg-slate-200 z-0" />

                {/* 10 Nodes */}
                {[
                  { step: "Lead", icon: "🌱", color: "bg-emerald-50 text-emerald-700 border-emerald-400" },
                  { step: "Pre-Sales", icon: "📞", color: "bg-blue-50 text-blue-700 border-blue-400" },
                  { step: "Site Visit", icon: "🏛️", color: "bg-amber-50 text-amber-700 border-amber-400" },
                  { step: "Inventory", icon: "🏢", color: "bg-purple-50 text-purple-700 border-purple-400" },
                  { step: "Token Booking", icon: "💳", color: "bg-teal-50 text-teal-700 border-teal-400" },
                  { step: "Agreement & KYC", icon: "📝", color: "bg-emerald-50 text-emerald-700 border-emerald-400" },
                  { step: "Demands & CLP", icon: "🏗️", color: "bg-blue-50 text-blue-700 border-blue-400" },
                  { step: "Home Loan", icon: "🏦", color: "bg-amber-50 text-amber-700 border-amber-400" },
                  { step: "Buyer Portal", icon: "📲", color: "bg-cyan-50 text-cyan-700 border-cyan-400" },
                  { step: "Handover", icon: "🔑", color: "bg-purple-50 text-purple-700 border-purple-400" },
                ].map((item) => {
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
                  title: "Omnichannel Lead Capture & Instant Attribution",
                  tagline: "Capture buyer inquiries from 99acres, MagicBricks, Housing.com, Meta Ads, Google, Website, and walk-ins instantly.",
                  metrics: [
                    { label: "Dispatch Latency", value: "< 15s Auto-Call" },
                    { label: "Channel Attribution", value: "100% UTM & Broker Tag" },
                    { label: "Lead Duplication", value: "0% Overlaps" },
                  ],
                  actions: [
                    "Direct webhooks sync inquiries from 99acres, MagicBricks, Housing and Facebook lead forms in under 2 seconds",
                    "Automated WhatsApp digital brochure, walk-through video, and location pin sent to prospective buyer instantly",
                    "Round-robin pre-sales allocation distributes leads to available tele-callers based on project tier & language",
                  ],
                  preview: "New inquiry from 99acres for Emerald Bay 3BHK → Auto-assigned to Pre-Sales Agent Kavita. WhatsApp brochure sent.",
                  previewIcon: "🌱",
                  badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
                },
                "Pre-Sales": {
                  num: 2,
                  title: "Tele-Calling Qualification & Cloud Telephony",
                  tagline: "Integrated click-to-call dialer with automatic recording, disposition tagging, and follow-up schedules.",
                  metrics: [
                    { label: "First Call Time", value: "< 7 Minutes Avg" },
                    { label: "Telephony Integration", value: "Cloud Audio Recording" },
                    { label: "Follow-Up Discipline", value: "Zero Missed Callbacks" },
                  ],
                  actions: [
                    "Single-click calling from web and mobile CRM masks agent numbers for lead privacy and compliance",
                    "Mandatory call dispositions (Interested, Budget Mismatch, Re-schedule, Investor) update pipeline dynamically",
                    "Automated WhatsApp reminders sent 24h & 2h before scheduled consultation calls",
                  ],
                  preview: "Call completed with Vikram Singhania (Talk time: 6m 14s) → Budget ₹2.5 Cr confirmed. Site visit booked for Sunday.",
                  previewIcon: "📞",
                  badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                },
                "Site Visit": {
                  num: 3,
                  title: "Experience Center Check-in & Site Visit Management",
                  tagline: "Track physical and virtual site visits with digital passes, sales gallery tablets, and instant feedback.",
                  metrics: [
                    { label: "Visit Conversion", value: "48.2% to Token" },
                    { label: "Site Check-in", value: "QR Digital Pass" },
                    { label: "Manager Allocation", value: "Live Desk Routing" },
                  ],
                  actions: [
                    "Generates personalized WhatsApp Site Visit Pass with Google Maps directions and dedicated parking slot QR",
                    "Site office kiosk scans QR on buyer arrival, instantly notifying senior sales closer assigned to the family",
                    "Post-visit digital feedback recorded on tablet with buyer preferences, favored unit views, and customization requests",
                  ],
                  preview: "Vikram Singhania checked in at Experience Center Hub (11:24 AM) → Assigned Senior Sales Closer Rahul Mehta.",
                  previewIcon: "🏛️",
                  badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                },
                Inventory: {
                  num: 4,
                  title: "Real-Time 3D & Grid Unit Inventory Matrix",
                  tagline: "Lock units with zero double-booking risk. View real-time floor plans, facing, PLC, and pricing calculator.",
                  metrics: [
                    { label: "Inventory Sync", value: "100% Real-Time" },
                    { label: "Holding Window", value: "2-Hour Soft Lock" },
                    { label: "Cost Sheet Accuracy", value: "Instant Dynamic Math" },
                  ],
                  actions: [
                    "Interactive color-coded floor grid (Green: Available, Yellow: Blocked, Red: Booked, Purple: Registered)",
                    "1-Click dynamic cost sheet computation with base rate, floor rise charges (PLC), parking, clubhouse, and GST",
                    "Temporary 2-hour soft-lock allows buyers to finalize financing without losing preferred corner units",
                  ],
                  preview: "Unit #A-1402 (3BHK East Facing, 1,840 sq.ft) soft-locked → All-inclusive quotation generated at ₹2,42,80,000.",
                  previewIcon: "🏢",
                  badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
                },
                "Token Booking": {
                  num: 5,
                  title: "Digital Token Advance & Instant Booking Docket",
                  tagline: "Collect initial booking tokens via UPI/NEFT and auto-generate branded provisional receipts.",
                  metrics: [
                    { label: "Collection Speed", value: "Instant UPI Gateway" },
                    { label: "Booking Slip", value: "Auto QR Generated" },
                    { label: "Accounts Sync", value: "Tally / ERP Ready" },
                  ],
                  actions: [
                    "Direct UPI / payment link dispatched on WhatsApp allows buyer to swipe booking amount on the spot",
                    "Instantly locks unit permanently across all sales desks, channel partner portals, and head office registers",
                    "Generates branded Booking Docket PDF with transaction UTR, flat details, and welcome letter",
                  ],
                  preview: "Token payment of ₹2,00,000 received via UPI → Unit #A-1402 status shifted to 'Sold'. Booking Docket #BK-8902 issued.",
                  previewIcon: "💳",
                  badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
                },
                "Agreement & KYC": {
                  num: 6,
                  title: "Builder-Buyer Agreement (BBA) & Digital KYC",
                  tagline: "Verify Aadhaar/PAN, auto-generate RERA-compliant BBA contracts, and capture digital e-signatures.",
                  metrics: [
                    { label: "KYC Verification", value: "< 2 Minutes Auto" },
                    { label: "BBA Generation", value: "1-Click Template" },
                    { label: "Signature Channel", value: "Aadhaar e-Sign Valid" },
                  ],
                  actions: [
                    "Secure digital vault stores buyer PAN, Aadhaar, IT Returns, and passport photos with encryption",
                    "Automated legal contract engine populates schedule of payment, undivided land share (UDS), and specifications",
                    "Aadhaar OTP-based legally binding e-Sign eliminates multiple physical visits for paperwork execution",
                  ],
                  preview: "Aadhaar e-Sign executed by Vikram Singhania → Builder-Buyer Agreement (BBA) stamped and uploaded to RERA registry.",
                  previewIcon: "📝",
                  badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
                },
                "Demands & CLP": {
                  num: 7,
                  title: "Construction-Linked Milestone Demands & Recovery",
                  tagline: "Trigger demand letters as structural slabs are completed. Automate WhatsApp payment reminders.",
                  metrics: [
                    { label: "Recovery Velocity", value: "94.6% On-Time" },
                    { label: "Architect Certification", value: "Photo Sign-Off" },
                    { label: "Late Interest Calc", value: "Automated RERA Slabs" },
                  ],
                  actions: [
                    "Site engineers upload civil structural photos and engineer certificate to approve project stage (e.g. 14th Floor Slab)",
                    "System auto-generates branded Demand Notices for all 48 buyers in that tower with unique virtual bank accounts",
                    "Smart reminder cadence triggers 7 days prior, due date, and automated interest calculation for overdue accounts",
                  ],
                  preview: "Tower A 14th Slab certified → Demand Notice of ₹24,28,000 auto-sent on WhatsApp to Vikram with virtual ICICI account.",
                  previewIcon: "🏗️",
                  badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                },
                "Home Loan": {
                  num: 8,
                  title: "Bank Approval (APF) & Home Loan Liaison Desk",
                  tagline: "Speed up disbursals with pre-approved project codes (APF) from SBI, HDFC, ICICI, and Axis Bank.",
                  metrics: [
                    { label: "Bank Disbursal", value: "< 14 Days Avg" },
                    { label: "Partner Banks", value: "12+ Major APF Banks" },
                    { label: "Liaison Tracking", value: "Direct Bank Portal" },
                  ],
                  actions: [
                    "Direct bank desk tracking tracks Tripartite Agreement, NOC for mortgage, and demand letters",
                    "Bank managers receive digital document packets directly through dedicated portal access",
                    "Automated payment reconciliation matches incoming RTGS/NEFT loan tranches against buyer ledger",
                  ],
                  preview: "HDFC Home Loan sanctioned (₹1.80 Cr) → Tripartite agreement logged & initial disbursal tranche of ₹40L cleared.",
                  previewIcon: "🏦",
                  badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                },
                "Buyer Portal": {
                  num: 9,
                  title: "Self-Service Customer Portal & Live Drone Updates",
                  tagline: "Delight buyers with 24/7 web & mobile access to ledgers, receipts, progress photos, and support.",
                  metrics: [
                    { label: "Portal Adoption", value: "98% Active Buyers" },
                    { label: "Query Resolution", value: "< 4 Hours" },
                    { label: "Monthly Updates", value: "Drone 4K Footage" },
                  ],
                  actions: [
                    "Mobile-responsive buyer portal provides real-time access to paid receipts, pending demand notices, and statements",
                    "Monthly drone 4K construction videos and interior finishing photos shared automatically on WhatsApp",
                    "Helpdesk ticketing for custom modification requests, electrical changes, and car parking allocation queries",
                  ],
                  preview: "Vikram accessed Buyer Portal → Downloaded GST Tax Invoice for Milestone #6 & reviewed October Tower A drone update.",
                  previewIcon: "📲",
                  badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
                },
                Handover: {
                  num: 10,
                  title: "Snagging, Key Handover & Registry Management",
                  tagline: "Systematic digital snags resolution, possession certificate, and sub-registrar deed facilitation.",
                  metrics: [
                    { label: "Snag Resolution", value: "99.2% Cleared" },
                    { label: "Key Handover", value: "Digitally Certified" },
                    { label: "NOC Issuance", value: "Society Ready" },
                  ],
                  actions: [
                    "Quality inspection mobile app logs snags with photo tags and assigns work orders to electrical/carpentry contractors",
                    "Buyer signs digital inspection sign-off once all snags are verified and cleared",
                    "Generates Possession Certificate, Electricity Meter NOC, Key Handover Docket, and legal deed registry checklist",
                  ],
                  preview: "Snag audit cleared (0 pending points) → Key Handover Certificate issued for Unit #A-1402. Welcome box dispatched.",
                  previewIcon: "🔑",
                  badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
                },
              };

              const stepNames = [
                "Lead",
                "Pre-Sales",
                "Site Visit",
                "Inventory",
                "Token Booking",
                "Agreement & KYC",
                "Demands & CLP",
                "Home Loan",
                "Buyer Portal",
                "Handover",
              ];
              const currentIndex = stepNames.indexOf(activeJourneyStep);
              const info = journeyDetails[activeJourneyStep] || journeyDetails["Lead"];

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

                  {/* Live Simulation Preview Footer */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-mono flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{info.preview}</span>
                  </div>

                </div>
              );
            })()}

          </div>
        </section>

        {/* =========================================================================
            SECTION 5: TWO SIDES. ONE PLATFORM. (DARK SLATE/NAVY CONTAINER)
        ========================================================================== */}
        <section className="py-20 bg-[#091a2b] text-white relative overflow-hidden">
          {/* Subtle glowing orbs */}
          <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3">
              TWO SIDES. ONE CONNECTED PLATFORM.
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Pre-Sales &amp; Closer Engine Meets Real Estate Back-Office ERP
            </h2>

            <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Eliminate the disconnect between site sales managers on phone calls and finance controllers managing construction cashflows.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14 text-left">
              
              {/* Left Box: Front Office Sales & Pre-Sales */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 hover:bg-white/[0.07] transition">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                      🎯
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">Front Office: Sales &amp; Channel Partners</h3>
                      <p className="text-xs text-slate-400">Lead capture, cloud telephony, site visits &amp; broker desks</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    GROW REVENUE
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-300">
                  {[
                    "Direct API ingestion from 99acres, MagicBricks, Housing, Meta & Google Ads",
                    "Click-to-call cloud telephony with automatic call recording & smart disposition",
                    "Digital WhatsApp Site Visit passes with Google location and QR access code",
                    "Dedicated Channel Partner (CP) portal with commission ledger & dispute protection",
                    "Live inventory floor plan view with instant 2-hour unit reservation lock",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Box: Back Office Developer ERP & Collections */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 hover:bg-white/[0.07] transition">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-xl font-bold">
                      🏢
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">Back Office: Developer ERP &amp; Collections</h3>
                      <p className="text-xs text-slate-400">Inventory matrix, milestone demands, BBA contracts &amp; RERA ledger</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                    PROTECT CASHFLOW
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-300">
                  {[
                    "Centralized unit matrix across multiple towers, phases, and commercial wings",
                    "Construction-Linked Plan (CLP) demand letter auto-generation upon civil milestones",
                    "RERA escrow bank account reconciliation with virtual accounts and UPI links",
                    "Legal Builder-Buyer Agreement (BBA) auto-drafting with Aadhaar e-Sign",
                    "Snag list resolution app for site contractors before key possession handover",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-teal-400 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FEATURE SPOTLIGHT 1: MULTI-CHANNEL PORTAL CAPTURE & AUTO-DISPATCH
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Deep Feature Explanation */}
              <div className="lg:col-span-5 text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
                  FEATURE SPOTLIGHT 01
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Zero Lead Leakage Across Portals, Ads &amp; Walk-ins
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Real estate buyers research properties after office hours. If your team doesn't reply immediately, they book site visits elsewhere. Uptrix captures inquiries from 99acres, MagicBricks, Housing, and Meta within 2 seconds, delivering brochures instantly on WhatsApp.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Real-time webhooks eliminate delayed spreadsheet exports and lost CSV files",
                    "Automated call dialing connects prospective buyers to available site specialists",
                    "Interactive WhatsApp brochures with 3D walkthroughs increase visit turnouts by 42%",
                    "Built-in fraud detection flags duplicate phone numbers and protects CP registrations",
                  ].map((pt) => (
                    <div key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                  >
                    See Portal Integration Demo →
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Showcase using generated Sales Experience image */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl bg-white">
                  <div className="relative h-64 sm:h-80 w-full bg-slate-100">
                    <Image
                      src="/images/real-estate/site-experience.jpg"
                      alt="Modern real estate sales gallery and experience center"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                      <div className="text-white">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                          Smart Experience Center
                        </span>
                        <h4 className="text-lg font-bold">Interactive Digital Scale Models &amp; Walk-in Desk Sync</h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Response Time</span>
                        <span className="text-base font-black text-slate-900">&lt; 15 Seconds</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Visit Show-up</span>
                        <span className="text-base font-black text-emerald-600">84.2% Ratio</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Portals Connected</span>
                        <span className="text-base font-black text-slate-900">7+ Real-Time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FEATURE SPOTLIGHT 2: BUYER 360° PROFILE (WITH VIKRAM AVATAR)
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading and Context */}
              <div className="lg:col-span-5 text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
                  FEATURE SPOTLIGHT 02
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Buyer 360° Profile: Every Unit, Interaction &amp; Rupee Tracked
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Say goodbye to scattered notes on WhatsApp chats, paper files in site offices, and separate accounts Excel sheets. Inspect every buyer's complete timeline from first inquiry through legal agreements and final payment ledger in one unified cockpit.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Profile", "Interactions", "Unit & Cost", "Milestones", "KYC & BBA"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveBuyerTab(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        activeBuyerTab === tab
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Buyer 360 Card Mockup with Vikram Image */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-lg">
                  
                  {/* Buyer Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-xs shrink-0 bg-slate-100">
                        <Image
                          src="/images/real-estate/buyer-vikram.jpg"
                          alt="Vikram Singhania - Property Buyer"
                          fill
                          sizes="48px"
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">Vikram Singhania</h3>
                          <span className="px-2 py-0.2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                            Unit Booked
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          Emerald Bay • Tower A, Unit #1402 • Sales Lead: Kavita R.
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Agreement Value</span>
                      <span className="text-sm sm:text-base font-black text-emerald-700 font-mono">₹2,42,80,000</span>
                    </div>
                  </div>

                  {/* Dynamic Tab Body */}
                  <div className="pt-4 min-h-[200px]">
                    {activeBuyerTab === "Profile" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Source</span>
                          <span className="font-bold text-slate-800">99acres Direct Lead</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Configuration</span>
                          <span className="font-bold text-slate-800">3BHK + Servant (1,840 sq.ft)</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Financing Plan</span>
                          <span className="font-bold text-slate-800">Bank Loan (HDFC Approved)</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Parking Slots</span>
                          <span className="font-bold text-slate-800">2 Covered (B2-14, B2-15)</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">RERA Status</span>
                          <span className="font-bold text-emerald-700">BBA Executed &amp; Stamped</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Possession Date</span>
                          <span className="font-bold text-slate-800">December 2026</span>
                        </div>
                      </div>
                    )}

                    {activeBuyerTab === "Interactions" && (
                      <div className="space-y-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-600 font-bold">💬 WhatsApp:</span>
                            <span className="text-slate-700">Digital receipt of ₹2,00,000 booking token delivered</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">Yesterday 4:15 PM</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold">🏛️ Site Visit:</span>
                            <span className="text-slate-700">Experience center walkthrough completed (Duration: 52 mins)</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">Oct 5, 11:30 AM</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-600 font-bold">📞 Pre-Sales Call:</span>
                            <span className="text-slate-700">Initial qualification call by Agent Kavita (Talk time: 6m 14s)</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">Oct 3, 10:02 AM</span>
                        </div>
                      </div>
                    )}

                    {activeBuyerTab === "Unit & Cost" && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-600">Base Unit Consideration (1,840 sq.ft @ ₹10,500/sq.ft):</span>
                          <span className="font-bold font-mono">₹1,93,20,000</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-600">Preferential Location Charges (PLC - East Facing &amp; Park View):</span>
                          <span className="font-bold font-mono">₹12,50,000</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-600">Clubhouse, Infrastructure &amp; 2 Covered Parking Slots:</span>
                          <span className="font-bold font-mono">₹14,00,000</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-slate-200">
                          <span className="text-slate-600">Statutory GST (5%) &amp; Stamp Duty Estimate:</span>
                          <span className="font-bold font-mono">₹23,10,000</span>
                        </div>
                        <div className="flex justify-between pt-1 font-bold text-emerald-800 text-sm">
                          <span>All-Inclusive Package:</span>
                          <span>₹2,42,80,000</span>
                        </div>
                      </div>
                    )}

                    {activeBuyerTab === "Milestones" && (
                      <div className="space-y-2 text-xs">
                        {[
                          { stage: "Token Booking Amount (10%)", amt: "₹24,28,000", status: "Cleared", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                          { stage: "Execution of Agreement (10%)", amt: "₹24,28,000", status: "Paid", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                          { stage: "On Completion of 7th Floor Slab (15%)", amt: "₹36,42,000", status: "Due in 14 Days", color: "text-amber-700 bg-amber-50 border-amber-200" },
                          { stage: "On Completion of Superstructure (35%)", amt: "₹84,98,000", status: "Upcoming", color: "text-slate-500 bg-slate-50 border-slate-200" },
                          { stage: "On Notice of Possession (30%)", amt: "₹72,84,000", status: "Upcoming", color: "text-slate-500 bg-slate-50 border-slate-200" },
                        ].map((m) => (
                          <div key={m.stage} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                            <span className="font-medium text-slate-800">{m.stage}</span>
                            <div className="flex items-center gap-3">
                              <span className="font-bold font-mono text-slate-900">{m.amt}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${m.color}`}>
                                {m.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeBuyerTab === "KYC & BBA" && (
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="font-bold block">Aadhaar &amp; PAN Card</span>
                            <span className="text-[10px] text-slate-500">UIDAI Verified</span>
                          </div>
                          <span className="text-emerald-600 font-bold">✓ Verified</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="font-bold block">Builder-Buyer Agreement</span>
                            <span className="text-[10px] text-slate-500">e-Signed with OTP</span>
                          </div>
                          <span className="text-emerald-600 font-bold">✓ Active</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="font-bold block">HDFC Bank Sanction Letter</span>
                            <span className="text-[10px] text-slate-500">Loan #HL-98217</span>
                          </div>
                          <span className="text-emerald-600 font-bold">✓ Approved</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="font-bold block">Allotment Letter</span>
                            <span className="text-[10px] text-slate-500">Digital Seal</span>
                          </div>
                          <span className="text-emerald-600 font-bold">✓ Issued</span>
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
            SECTION 8: 6-CARD CORE DEVELOPER ERP FEATURES GRID
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
              COMPLETE BUILDER OPERATING SYSTEM
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Six Pillars Engineered Specifically for Real Estate Scale
            </h2>

            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Everything high-volume real estate developers and channel partners require to operate with speed, governance, and zero leakages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
              {[
                {
                  icon: "🏢",
                  title: "Interactive Unit Inventory Matrix",
                  desc: "Live color-coded floor grid across all towers. View corner units, East/West facing, square footage, and pricing locks in real-time across head office and site teams.",
                  tag: "Zero Double-Booking",
                },
                {
                  icon: "🏗️",
                  title: "Construction Milestone Recovery",
                  desc: "Site engineers sign off slab completions with photos. Uptrix instantly calculates and dispatches customized demand notices with UPI links and virtual accounts.",
                  tag: "Automated Demands",
                },
                {
                  icon: "🤝",
                  title: "Channel Partner (CP) Portal",
                  desc: "Give your 500+ brokers a branded login to register buyer leads, view available units, check commission ledger balances, and avoid commission disputes.",
                  tag: "Broker Transparency",
                },
                {
                  icon: "📊",
                  title: "Instant Cost Sheet Generator",
                  desc: "Generate professional branded quotations with custom floor rise charges, parking options, GST, and customized payment schedules in under 30 seconds.",
                  tag: "1-Click PDF Quotes",
                },
                {
                  icon: "📱",
                  title: "Pre-Sales Cloud Telephony & Dialer",
                  desc: "Inbuilt click-to-call dialer with automated call recordings, IVR queue distribution, mandatory outcome disposition, and zero personal phone number leaks.",
                  tag: "Call Governance",
                },
                {
                  icon: "🔑",
                  title: "Digital Snagging & Key Possession",
                  desc: "Pre-possession inspection app captures snag photos with electrical and plumbing contractor tags, generating verified handover certificates on completion.",
                  tag: "Flawless Handover",
                },
              ].map((pill) => (
                <div
                  key={pill.title}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center text-2xl mb-4">
                      {pill.icon}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{pill.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pill.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-emerald-700">{pill.tag}</span>
                    <span className="text-slate-400 font-mono">Enterprise Ready</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 9: MANAGEMENT DASHBOARD & BEFORE VS AFTER
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3">
              TRANSFORMATION MATRIX
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Before vs. After Uptrix Real Estate Operating System
            </h2>

            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              See the measurable difference between managing real estate projects across WhatsApp and spreadsheets versus an automated unified platform.
            </p>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Dimension</th>
                    <th className="p-4 sm:p-5 text-rose-700 bg-rose-50/50">Old Way (Spreadsheets &amp; Standalone CRM)</th>
                    <th className="p-4 sm:p-5 text-emerald-700 bg-emerald-50/50">Uptrix Unified Real Estate OS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      area: "Lead Response Time",
                      before: "3 to 6 hours after portal export CSV upload",
                      after: "< 15 seconds automated call & WhatsApp brochure dispatch",
                    },
                    {
                      area: "Inventory Management",
                      before: "Excel sheet updated once a day; frequent double-booking",
                      after: "Real-time 3D unit grid with 2-hour reservation soft-lock",
                    },
                    {
                      area: "Payment Collections",
                      before: "Demands delayed by 30+ days; manual accounting reconciliation",
                      after: "Automated slab demands with UPI links & virtual RTGS accounts",
                    },
                    {
                      area: "Channel Partner Tracking",
                      before: "WhatsApp chat logs leading to frequent commission disputes",
                      after: "Dedicated CP Portal with tamper-proof client registration stamps",
                    },
                    {
                      area: "Buyer Experience",
                      before: "Buyers call staff repeatedly for statements and construction photos",
                      after: "24/7 self-service web portal with live 4K drone progress videos",
                    },
                  ].map((row) => (
                    <tr key={row.area} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{row.area}</td>
                      <td className="p-4 sm:p-5 text-rose-800 bg-rose-50/20">{row.before}</td>
                      <td className="p-4 sm:p-5 text-emerald-900 font-semibold bg-emerald-50/20 flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{row.after}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 10: INSTITUTIONAL DEVELOPER CASE STUDIES (Prominent 3-Card Showcase)
        ========================================================================== */}
        <section
          id="case-studies"
          className="py-16 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f4f7fb] border-b border-slate-200/80 relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[840px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>📊 PROVEN DEVELOPER RESULTS • CASE STUDIES</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                Real Estate Developer Transformations: Results Across 180+ Projects
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Explore how leading luxury high-rise builders, plotted township developers, and commercial asset managers eliminated double-booking conflicts, cut response times to 14 seconds, and automated ₹38+ Cr in milestone cashflows.
              </p>
            </div>

            {/* 3 High-Impact Visual Case Study Story Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
              
              {/* Case Study Card 1: Aurora Skylight & Residences */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-white/10">
                        Luxury High-Rise
                      </span>
                      <span className="text-xs text-slate-400 font-mono">4 Towers • 480 Units</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-emerald-400 font-mono leading-none">
                          14s
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">Lead Response</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          ₹38.4 Cr
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">CLP Recovered</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-emerald-300 font-mono leading-none">
                          0%
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">Double-Booking</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 tracking-wider">
                        Case Study #01 • Mumbai &amp; Thane
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-emerald-700 transition-colors">
                        How Aurora Group Sold 78% Inventory in 90 Days and Recovered ₹38.4 Cr in Construction Demands
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Before Uptrix, 99acres and Meta leads took 6+ hours to reach sales closers. Multiple executives booked the same corner 3BHK penthouse over phone calls, sparking buyer disputes.
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> 6-hour CSV delay; spreadsheet inventory caused buyer booking conflicts.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> 14s WhatsApp brochures, 2-hour 3D grid inventory locks, automated UPI milestone notices.</span>
                      </div>
                    </div>

                    {/* Leader Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0 border border-emerald-300">
                        SO
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;Uptrix synchronized our pre-sales and site office completely. Zero double-booking across 480 units.&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          Siddharth Oberoi — CEO, Aurora Group
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
                      setSelectedCaseStudy("aurora");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>Read Full Case Study</span>
                    <span className="text-emerald-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

              {/* Case Study Card 2: Elysium Parkland Township */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-blue-300 border border-white/10">
                        Plotted Villas &amp; Plots
                      </span>
                      <span className="text-xs text-slate-400 font-mono">120 Acres • 640 Plots</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-blue-400 font-mono leading-none">
                          +142%
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">Visit Turnout</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          280+
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">Active Brokers</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-indigo-300 font-mono leading-none">
                          ₹0
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">CP Disputes</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-blue-700 tracking-wider">
                        Case Study #02 • Bengaluru &amp; Pune
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-blue-700 transition-colors">
                        How Elysium Parkland Scaled 280+ Channel Partners with a Self-Service Broker Portal
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Managing 280+ external channel partner brokers via WhatsApp created constant disputes over client ownership and delayed site visit verification slips.
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> Unverified WhatsApp lead notes; frequent commission disputes between brokers.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> CP mobile portal with tamper-proof timestamps, QR visit passes, and live payout ledger.</span>
                      </div>
                    </div>

                    {/* Leader Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0 border border-blue-300">
                        RS
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;Our channel partners love the absolute transparency. Payout disputes dropped to zero.&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          Rajesh Singhal — Director of Sales
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
                      setSelectedCaseStudy("elysium");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>Read Full Case Study</span>
                    <span className="text-blue-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

              {/* Case Study Card 3: Horizon Commercial Business Parks */}
              <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Dark Accent Header Strip with 3 Key Metrics */}
                  <div className="relative bg-[#0d132e] text-white p-6 border-b border-slate-900">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-500" />
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono font-bold text-teal-300 border border-white/10">
                        Commercial IT Park
                      </span>
                      <span className="text-xs text-slate-400 font-mono">2.4M Sq.Ft • Grade-A Office</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-teal-400 font-mono leading-none">
                          99.4%
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">Demand Recovery</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-white font-mono leading-none">
                          48h
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">LOI to BBA Sign</span>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-[26px] font-black text-cyan-300 font-mono leading-none">
                          100%
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium mt-1 block">RERA Escrow Sync</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase text-teal-700 tracking-wider">
                        Case Study #03 • Gurugram &amp; Noida
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-teal-700 transition-colors">
                        How Horizon Infrastructure Automated ₹62 Cr in Commercial Milestone Recoveries
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Delayed civil milestone certifications and manual courier notices led to ₹18+ Cr in overdue construction cashflow, putting contractor schedules at risk.
                    </p>

                    {/* Before vs After Highlights */}
                    <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                        <span className="text-slate-500"><strong>Before:</strong> Paper demand notices posted manually; months lost in bank loan disbursement liaison.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold shrink-0">✓</span>
                        <span className="text-slate-800"><strong>With Uptrix:</strong> Architect civil sign-off auto-generates branded WhatsApp demand letters with virtual accounts.</span>
                      </div>
                    </div>

                    {/* Leader Quote */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                      <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center shrink-0 border border-teal-300">
                        KM
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          &quot;Milestone recovery is completely hands-free now. Construction cashflows never stall.&quot;
                        </p>
                        <span className="text-[10px] font-bold text-slate-900 block mt-0.5">
                          Kunal Mehra — VP Commercial Assets
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
                      setSelectedCaseStudy("horizon");
                      setShowCaseStudyModal(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>Read Full Case Study</span>
                    <span className="text-teal-400 group-hover:text-white transition-colors">→</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Support Callout Banner */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  Want to achieve similar sales velocity and eliminate double-booking conflicts?
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Our real estate solutions engineers configure your portals, unit matrices, and WhatsApp workflows in under 5 business days.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition shrink-0 cursor-pointer"
              >
                Book Similar Implementation Demo →
              </button>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 11: VIDEO TESTIMONIALS
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
              EXECUTIVE TESTIMONIALS
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Hear How Sales Directors Transformed Their Operations
            </h2>

            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
              Real estate promoters share how Uptrix helped them scale from single-site developments to multi-city real estate brands.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
              {[
                {
                  id: "video-1",
                  title: "How We Automated 680 Inquiries a Day",
                  speaker: "Sunil Shenoy",
                  role: "Head of Pre-Sales & Digital",
                  company: "Prestige Horizon",
                  dur: "3m 45s",
                },
                {
                  id: "video-2",
                  title: "Zero Double-Booking in 6 Towers",
                  speaker: "Pooja Hegde",
                  role: "Chief Operating Officer",
                  company: "Metro Living Spaces",
                  dur: "4m 12s",
                },
                {
                  id: "video-3",
                  title: "Recovering Construction Demands via WhatsApp",
                  speaker: "Arun Vaidya",
                  role: "VP Finance & Accounts",
                  company: "Skyline Infra",
                  dur: "2m 58s",
                },
              ].map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition group cursor-pointer"
                  onClick={() => {
                    setActiveVideoId(v.id);
                    setShowVideoPopup(true);
                  }}
                >
                  <div className="h-44 bg-slate-800 relative flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold group-hover:scale-110 shadow-lg transition">
                      ▶
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                      {v.dur}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                      {v.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {v.speaker} • {v.role}
                    </p>
                    <span className="mt-3 inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {v.company}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 12: CUSTOMER REVIEWS & WALL OF SOCIAL PROOF
        ========================================================================== */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-3">
              REVIEWS &amp; RATINGS
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              4.9 / 5.0 Rated by 180+ Real Estate Developers &amp; Brokerages
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                { key: "all", label: "All Reviews (34)" },
                { key: "residential", label: "Residential Developers" },
                { key: "commercial", label: "Commercial Assets" },
                { key: "brokers", label: "Channel Partners" },
              ].map((rf) => (
                <button
                  key={rf.key}
                  type="button"
                  onClick={() => setReviewFilter(rf.key as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    reviewFilter === rf.key
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
              {[
                {
                  quote: "Our pre-sales call connect rate went from 34% to 78% after deploying Uptrix cloud dialer. Leads from 99acres are called while they are still browsing the property photos.",
                  author: "Manish Chawla",
                  role: "Director of Marketing",
                  company: "Greenfield Developers, Pune",
                  cat: "residential",
                },
                {
                  quote: "Double booking was our nightmare in previous projects. Uptrix unit inventory matrix solved this across 400 flats. Once a token is paid, it locks instantly across all site offices.",
                  author: "Anita Subramanian",
                  role: "Head of Operations",
                  company: "Sobha Landmark Spaces, Bangalore",
                  cat: "residential",
                },
                {
                  quote: "As a channel partner managing 40 brokers, the CP portal gives us 100% trust. Client registrations are timestamped, and we can check commission payouts live.",
                  author: "Gaurav Malhotra",
                  role: "Managing Partner",
                  company: "Prime Edge Real Estate Advisory, Delhi NCR",
                  cat: "brokers",
                },
              ].map((rev, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      “{rev.quote}”
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <span className="font-bold text-slate-900 block text-xs sm:text-sm">{rev.author}</span>
                    <span className="text-xs text-slate-500">{rev.role} • {rev.company}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 13: FREQUENTLY ASKED QUESTIONS (ACCORDION)
        ========================================================================== */}
        <section className="py-20 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold tracking-wider uppercase mb-3">
              GOT QUESTIONS?
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-slate-500 text-sm sm:text-base">
              Everything you need to know about implementation, portal integrations, RERA compliance, and data security.
            </p>

            <div className="mt-10 space-y-3 text-left">
              {[
                {
                  q: "How does Uptrix connect to 99acres, MagicBricks, and Housing.com?",
                  a: "Uptrix features pre-built webhooks and official developer API connectors for 99acres, MagicBricks, Housing, Meta Lead Ads, and Google Ads. When a prospective buyer submits an inquiry, it lands in your Uptrix CRM in less than 2 seconds with complete UTM attribution.",
                },
                {
                  q: "Can we manage multiple towers, phases, and commercial projects simultaneously?",
                  a: "Yes. Uptrix supports unlimited projects, phases, towers, and wings under a single enterprise developer account. You can assign dedicated sales teams, price sheets, and inventory matrices per project with strict role-based access control.",
                },
                {
                  q: "How does the inventory locking system prevent double-booking?",
                  a: "Whenever a sales closer initiates a cost sheet or selects a unit, they can place a temporary 2-hour soft lock. Once token payment is authenticated through UPI, payment gateway, or RTGS UTR, the unit is permanently marked as 'Sold' across all sales galleries, tablets, and broker portals.",
                },
                {
                  q: "Is the Builder-Buyer Agreement (BBA) RERA compliant?",
                  a: "Yes. You can upload your official legal BBA templates. The system dynamically injects unit area details, undivided land share (UDS), parking allotments, and payment milestones. Buyers can review and e-sign through Aadhaar OTP verification.",
                },
                {
                  q: "Can our channel partners (CP brokers) access the system?",
                  a: "Yes. Uptrix includes a dedicated, white-labeled Channel Partner Portal. Brokers can register their client leads with automated anti-poaching timestamps, download branded brochures, check available unit inventory, and track their earned commissions.",
                },
                {
                  q: "How long does implementation and data migration take?",
                  a: "A typical real estate project deployment takes 3 to 5 business days. Our dedicated onboarding engineering team imports your existing Excel buyer records, sets up WhatsApp Business API credentials, and trains your pre-sales and closer staff.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{item.q}</span>
                    <span className="text-slate-400 font-mono text-lg shrink-0">
                      {expandedFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 14: BOTTOM HIGH-CONVERTING CTA BANNER
        ========================================================================== */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f0f9f6]/60 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 shadow-xl">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                GET STARTED TODAY
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-4">
                Ready to Accelerate Your Real Estate Sales Velocity?
              </h2>

              <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                Join 180+ developers closing deals faster with zero inventory conflicts and automated payment milestone recovery.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition cursor-pointer"
                >
                  Book a Personalized 30-Minute Demo →
                </button>

                <a
                  href="https://wa.me/?text=Hi%20Uptrix%20team,%20I%20am%20interested%20in%20the%20Real%20Estate%20CRM%20and%20ERP%20platform"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-sm shadow-xs transition cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Chat with Real Estate Specialist</span>
                  <span className="text-emerald-600">💬</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          INTERACTIVE MODALS
      ========================================================================== */}

      {/* 1. BOOK A DEMO MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Book a VIP Real Estate Product Demo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tailored walk-through for real estate builders, developers &amp; brokers
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDemoModal(false);
                  setDemoSubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <span className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 text-2xl flex items-center justify-center mx-auto">
                  ✓
                </span>
                <h4 className="text-lg font-bold text-slate-900">Demo Scheduled Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our real estate solutions engineer will reach out on WhatsApp &amp; phone within 15 minutes with your custom demo room link.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowDemoModal(false);
                    setDemoSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
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
                  const fd = new FormData(e.currentTarget);
                  fd.append("source", "Real Estate Demo Modal");
                  fd.append("pageUrl", typeof window !== "undefined" ? window.location.href : "/real-estate");
                  const res = await submitLead(fd).catch(() => ({ ok: false, error: "Network error. Please try again." }));
                  setDemoSubmitting(false);
                  if (!res.ok) {
                    setDemoError(res.error || "Submission failed. Please try again.");
                    return;
                  }
                  setDemoSubmitted(true);
                }}
                className="space-y-3.5 pt-2 text-xs"
              >
                {demoError && (
                  <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs">
                    ⚠️ {demoError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Contact Name *</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company / Developer Name *</label>
                    <input
                      required
                      name="company"
                      type="text"
                      placeholder="e.g. Prestige / Oberoi Realty"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Gmail / Official Email *</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="vikram@gmail.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Business Type *</label>
                  <select
                    name="businessType"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-hidden bg-white text-slate-700 font-medium"
                  >
                    <option value="Real Estate Developer">Real Estate Developer / Builder</option>
                    <option value="Channel Partner / Master Broker">Channel Partner / Master Brokerage</option>
                    <option value="Township & Plotted Developer">Township &amp; Plotted Developer</option>
                    <option value="Commercial & IT Park Developer">Commercial &amp; IT Park Developer</option>
                    <option value="Real Estate Marketing Agency">Real Estate Marketing Agency</option>
                    <option value="Other Real Estate Business">Other Real Estate Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    What would you like to solve? <span className="font-normal text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    name="solveProblem"
                    rows={2}
                    placeholder="e.g. Portal lead leakage, 3D inventory sync across brokers, automated payment recovery..."
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
                      <span>Scheduling VIP Demo…</span>
                    ) : (
                      <>
                        <span>Confirm Demo Booking</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    🔒 100% confidential. No spam. Instant confirmation on WhatsApp &amp; Email.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. CASE STUDY DETAILS MODAL */}
      {showCaseStudyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold">
                  Developer Case Study Deep-Dive
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {selectedCaseStudy === "aurora" && "Aurora Group: 78% Inventory Absorption"}
                  {selectedCaseStudy === "elysium" && "Elysium Parkland: 42% Sales Velocity Boost"}
                  {selectedCaseStudy === "horizon" && "Horizon Infra: 100% Demand Recovery"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCaseStudyModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {(() => {
              const studyDetails: Record<
                "aurora" | "elysium" | "horizon",
                {
                  title: string;
                  segment: string;
                  p1Title: string;
                  p1Desc: string;
                  p2Title: string;
                  p2Desc: string;
                  p3Title: string;
                  p3Desc: string;
                  roiTitle: string;
                  roiDesc: string;
                  status: string;
                }
              > = {
                aurora: {
                  title: "Aurora Group: 78% Inventory Sold & Zero Double-Bookings",
                  segment: "Luxury High-Rise (4 Towers • 480 Units) • Mumbai & Thane",
                  p1Title: "Phase 1: 48-Hour Unit Inventory Matrix & Floor Plan Mapping",
                  p1Desc: "Imported 480 luxury apartments across 4 towers. Configured floor rise charges (PLC), East/West facing views, and eliminated paper reservation registers.",
                  p2Title: "Phase 2: Sub-14s Portal Webhooks & WhatsApp Green Tick API",
                  p2Desc: "Connected 99acres, MagicBricks, and Meta Lead Ads. Dispatched automated 3D walkthrough videos and interactive cost sheets in under 14 seconds.",
                  p3Title: "Phase 3: Construction-Linked Slabs & RERA Escrow Virtual Accounts",
                  p3Desc: "Civil engineer slab sign-offs auto-generate branded demand letters with UPI links and ICICI virtual accounts, syncing directly with Tally ERP Prime.",
                  roiTitle: "Measurable Business ROI:",
                  roiDesc: "78% inventory absorption in 90 days, ₹38.4 Cr recovered on-time, and zero double-booking conflicts across 480 units.",
                  status: "Production Live across 4 Towers",
                },
                elysium: {
                  title: "Elysium Parkland: 280+ Channel Partners with Zero Disputes",
                  segment: "Plotted Township & Gated Villas (120 Acres • 640 Plots) • Bengaluru & Pune",
                  p1Title: "Phase 1: Channel Partner Database Cleansing & Anti-Poaching Rules",
                  p1Desc: "Enrolled 280+ active brokers with RERA credentials and tamper-proof client registration timestamps to prevent duplicate lead disputes.",
                  p2Title: "Phase 2: Self-Service Broker Mobile Portal & VIP Site Passes",
                  p2Desc: "Brokers check live plot availability, download co-branded marketing brochures, and dispatch digital WhatsApp site visit passes with Google Maps pins.",
                  p3Title: "Phase 3: Automated Commission Ledger & Milestone Payouts",
                  p3Desc: "Broker commission tiers auto-calculated and approved in real-time as buyer token advances and agreement values clear escrow.",
                  roiTitle: "Measurable Business ROI:",
                  roiDesc: "+142% site visit turnout, 280+ channel partners actively submitting deals, and ₹0 commission disputes.",
                  status: "Production Live across 120-Acre Township",
                },
                horizon: {
                  title: "Horizon Infra: ₹62 Cr Automated Commercial Demand Recovery",
                  segment: "Grade-A Commercial IT Towers (2.4M Sq.Ft) • Gurugram & Noida",
                  p1Title: "Phase 1: Commercial Asset Lease & Sale Inventory Structuring",
                  p1Desc: "Structured 2.4M sq.ft of floor plates, bare shell / warm shell specifications, cafeteria allocations, and customized payment schedules.",
                  p2Title: "Phase 2: LOI to Digital Builder-Buyer Agreement (BBA) e-Sign",
                  p2Desc: "Integrated legal contract drafting engine with Aadhaar OTP-based digital signing, cutting lease execution times from 3 weeks to 48 hours.",
                  p3Title: "Phase 3: CLP Milestone Recovery & APF Bank Disbursal Desk",
                  p3Desc: "Architect civil milestone sign-offs auto-trigger demand notices to corporate investors, synchronizing Tripartite agreements across 12 APF partner banks.",
                  roiTitle: "Measurable Business ROI:",
                  roiDesc: "99.4% on-time milestone demand recovery velocity, 48 hours from LOI to signed agreement, and 100% RERA audit compliance.",
                  status: "Production Live across 2.4M Sq.Ft Commercial Campus",
                },
              };

              const cs = studyDetails[selectedCaseStudy] || studyDetails.aurora;

              return (
                <div className="space-y-3.5 my-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="p-3 bg-slate-100/80 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block font-mono">Project Scope:</span>
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">{cs.segment}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{cs.p1Title}</h4>
                    <p className="text-slate-600 text-xs">{cs.p1Desc}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{cs.p2Title}</h4>
                    <p className="text-slate-600 text-xs">{cs.p2Desc}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{cs.p3Title}</h4>
                    <p className="text-slate-600 text-xs">{cs.p3Desc}</p>
                  </div>

                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-emerald-900 text-xs mb-1">{cs.roiTitle}</h4>
                    <p className="text-emerald-800 text-xs font-semibold">{cs.roiDesc}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-mono">Status: {cs.status}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCaseStudyModal(false);
                          setShowDemoModal(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                      >
                        Book Similar Implementation Demo
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCaseStudyModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 3. MIS REPORTS MODAL */}
      {showReportsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Executive Real Estate MIS Reports</h3>
              <button
                type="button"
                onClick={() => setShowReportsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              {[
                { title: "Monthly Inventory Absorption & Stock Aging", format: "Excel / PDF", tag: "Updated Today" },
                { title: "Channel Partner Lead Attribution & Commission Payouts", format: "CSV / Sheet", tag: "Live Sync" },
                { title: "Construction-Linked Demand Recovery Ledger (RERA Escrow)", format: "Tally Compatible", tag: "Daily" },
                { title: "Sales Executive Conversion & Site Visit Leaderboard", format: "PDF Summary", tag: "Weekly" },
              ].map((rep) => (
                <div key={rep.title} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 block">{rep.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{rep.format} • {rep.tag}</span>
                  </div>
                  <span className="text-emerald-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    Download
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowReportsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. VIDEO PLAYER MODAL */}
      {showVideoPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-6 shadow-2xl border border-white/20 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Developer Executive Testimonial</h3>
              <button
                type="button"
                onClick={() => setShowVideoPopup(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 aspect-video bg-black/60 rounded-2xl flex flex-col items-center justify-center border border-white/10 p-6 text-center">
              <span className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
                ▶
              </span>
              <p className="text-sm font-bold text-white">Prestige Horizon: Scaling from 1 to 4 Towers with Uptrix</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                “Our sales closers and broker channel partners operate in seamless synchronization. Zero double-booking, and on-time collection of ₹38 Cr in slab demands.”
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowVideoPopup(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      <PulseFooter content={footer} />
    </div>
  );
}
