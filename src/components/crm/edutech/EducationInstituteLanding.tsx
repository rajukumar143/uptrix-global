"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import { btnPrimary, container } from "@/components/crm/styles";
import type { HeaderContent } from "@/content/header";
import type { CrmLayoutContent } from "@/content/crm";

interface EducationInstituteLandingProps {
  header: HeaderContent;
  footer: CrmLayoutContent["footer"];
}

export default function EducationInstituteLanding({
  header,
  footer,
}: EducationInstituteLandingProps) {
  // Integrations category filter state
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<
    "all" | "communication" | "accounting" | "marketing" | "payments" | "meetings"
  >("all");

  // Attendance tab simulation state
  const [attendanceTab, setAttendanceTab] = useState<"org" | "team">("org");

  // Payment filter state
  const [paymentFilter, setPaymentFilter] = useState<"all" | "overdue" | "due_today" | "cleared">("all");
  // Selected student for detailed ledger inspection
  const [selectedStudentId, setSelectedStudentId] = useState<string>("UP-2026-081");
  const [bulkReminderSent, setBulkReminderSent] = useState(false);

  // Telephony audio sample active state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Section 4 Ecosystem Hub state
  const [activeConnectorId, setActiveConnectorId] = useState<
    "whatsapp" | "tally" | "meta" | "payments" | "telephony"
  >("whatsapp");
  const [isTriggeringTest, setIsTriggeringTest] = useState(false);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const handleTriggerTest = () => {
    setIsTriggeringTest(true);
    setTestSuccessMessage(null);
    setTimeout(() => {
      setIsTriggeringTest(false);
      setTestSuccessMessage("✓ Live payload synchronized across channels in 28ms (0 data loss)");
      setTimeout(() => {
        setTestSuccessMessage(null);
      }, 4000);
    }, 450);
  };

  // Case Study interactive tab state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<"apex" | "oakridge" | "vanguard">("apex");

  // Video Testimonial active video state and popup modal state
  const [activeVideoId, setActiveVideoId] = useState<string>("video-1");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);

  // Close video popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowVideoPopup(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Business Insights filter and toast states
  const [insightFilter, setInsightFilter] = useState<"all" | "counselor" | "course" | "cashflow">("all");
  const [insightToast, setInsightToast] = useState<string | null>(null);

  // Reviews filter category state
  const [reviewCategory, setReviewCategory] = useState<"all" | "coaching" | "schools" | "colleges">("all");

  // Pricing billing cycle state (6 months vs 1 year)
  const [billingCycle, setBillingCycle] = useState<"six_months" | "one_year">("one_year");

  // Calculator state
  const [inquiries, setInquiries] = useState(1200);
  const [courseFee, setCourseFee] = useState(65000);

  const extraAdmissions = Math.round(inquiries * (0.125 - 0.08));
  const extraRevenue = extraAdmissions * courseFee;

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const paymentRecords = [
    {
      id: "UP-2026-081",
      student: "Raghu Kumar",
      parentName: "Sanjay Kumar",
      phone: "+91 98450 12890",
      course: "JEE Masterclass (2-Year Target)",
      counselor: "Kiran M.",
      totalFee: "₹85,000",
      paid: "₹55,000",
      due: "₹30,000",
      paidPct: 65,
      status: "overdue" as const,
      statusLabel: "Overdue (5 Days)",
      dueDate: "30 Sep 2026",
      stage: "Installment 2 of 3",
      tokenPaid: "₹25,000 (Cleared 12 Jul)",
      inst1Paid: "₹30,000 (Cleared 15 Aug)",
      inst2Due: "₹30,000 (Due 30 Sep - Overdue)",
      invoiceNo: "GI/INV/2026/081",
      reminderCount: 2,
    },
    {
      id: "UP-2026-094",
      student: "Vinay Sharma",
      parentName: "Dr. R. K. Sharma",
      phone: "+91 97110 44210",
      course: "NEET Medical Fast-Track Batch",
      counselor: "Madhuri S.",
      totalFee: "₹65,000",
      paid: "₹35,000",
      due: "₹30,000",
      paidPct: 54,
      status: "due_today" as const,
      statusLabel: "Due Today",
      dueDate: "06 Oct 2026",
      stage: "Installment 1 of 2",
      tokenPaid: "₹20,000 (Cleared 20 Aug)",
      inst1Paid: "₹15,000 (Cleared 05 Sep)",
      inst2Due: "₹30,000 (Due Today, 06 Oct)",
      invoiceNo: "GI/INV/2026/094",
      reminderCount: 1,
    },
    {
      id: "UP-2026-112",
      student: "Madhukar Reddy",
      parentName: "V. Reddy",
      phone: "+91 99002 88412",
      course: "Grade 11 CBSE Science + Coaching",
      counselor: "Suresh K.",
      totalFee: "₹75,000",
      paid: "₹35,000",
      due: "₹40,000",
      paidPct: 47,
      status: "overdue" as const,
      statusLabel: "Overdue (12 Days)",
      dueDate: "24 Sep 2026",
      stage: "Installment 2 of 2",
      tokenPaid: "₹15,000 (Cleared 10 Jul)",
      inst1Paid: "₹20,000 (Cleared 10 Aug)",
      inst2Due: "₹40,000 (Due 24 Sep - Overdue)",
      invoiceNo: "GI/INV/2026/112",
      reminderCount: 3,
    },
    {
      id: "UP-2026-128",
      student: "Ananya Joshi",
      parentName: "Meera Joshi",
      phone: "+91 98860 33190",
      course: "Foundation Olympiad Batch (Grade 9)",
      counselor: "Priya N.",
      totalFee: "₹45,000",
      paid: "₹45,000",
      due: "₹0",
      paidPct: 100,
      status: "cleared" as const,
      statusLabel: "Cleared in Full",
      dueDate: "Paid 15 Sep",
      stage: "Full Year Tuition (Paid)",
      tokenPaid: "₹15,000 (Cleared 01 Aug)",
      inst1Paid: "₹30,000 (Cleared 15 Sep)",
      inst2Due: "₹0 (Fully Cleared)",
      invoiceNo: "GI/INV/2026/128",
      reminderCount: 0,
    },
    {
      id: "UP-2026-140",
      student: "Kiran Teja",
      parentName: "Satish Teja",
      phone: "+91 94480 66710",
      course: "JEE Dropper Intensive Repeater",
      counselor: "Kavitha R.",
      totalFee: "₹90,000",
      paid: "₹50,000",
      due: "₹40,000",
      paidPct: 56,
      status: "due_today" as const,
      statusLabel: "Due Today",
      dueDate: "06 Oct 2026",
      stage: "Installment 2 of 3",
      tokenPaid: "₹20,000 (Cleared 15 Jul)",
      inst1Paid: "₹30,000 (Cleared 20 Aug)",
      inst2Due: "₹40,000 (Due Today, 06 Oct)",
      invoiceNo: "GI/INV/2026/140",
      reminderCount: 1,
    },
    {
      id: "UP-2026-155",
      student: "Sneha Kulkarni",
      parentName: "Anand Kulkarni",
      phone: "+91 96112 55900",
      course: "Class 12 Commerce + CA Foundation",
      counselor: "Kiran M.",
      totalFee: "₹60,000",
      paid: "₹60,000",
      due: "₹0",
      paidPct: 100,
      status: "cleared" as const,
      statusLabel: "Cleared in Full",
      dueDate: "Paid 28 Sep",
      stage: "Full Year Tuition (Paid)",
      tokenPaid: "₹20,000 (Cleared 05 Aug)",
      inst1Paid: "₹40,000 (Cleared 28 Sep)",
      inst2Due: "₹0 (Fully Cleared)",
      invoiceNo: "GI/INV/2026/155",
      reminderCount: 0,
    },
  ];

  const filteredPayments =
    paymentFilter === "all"
      ? paymentRecords
      : paymentRecords.filter((p) => p.status === paymentFilter);

  const selectedStudent =
    paymentRecords.find((p) => p.id === selectedStudentId) || paymentRecords[0];

  const integrationsList = [
    { name: "WhatsApp Business API", category: "communication", desc: "Automated brochure dispatch & parent follow-ups", badge: "Native", icon: "💬" },
    { name: "Tally ERP / Prime", category: "accounting", desc: "Sync fee installments & receipts automatically", badge: "Accounting", icon: "📒" },
    { name: "Meta Ads (Facebook & Instagram)", category: "marketing", desc: "Instant lead ingestion with zero webhook delay", badge: "Marketing", icon: "📱" },
    { name: "Razorpay / UPI", category: "payments", desc: "Branded instant fee payment links in chat", badge: "Payments", icon: "💳" },
    { name: "Zoom Meetings", category: "meetings", desc: "Auto-schedule demo lectures & online counseling", badge: "Meetings", icon: "🎥" },
    { name: "Google Meet", category: "meetings", desc: "1-click trial class links sent on WhatsApp", badge: "Meetings", icon: "📹" },
    { name: "Exotel & Twilio", category: "communication", desc: "Click-to-call telephony with audio recording", badge: "Telephony", icon: "📞" },
    { name: "Zoho Books", category: "accounting", desc: "Automated GST invoicing & trust reconciliation", badge: "Accounting", icon: "📊" },
    { name: "Google Ads", category: "marketing", desc: "Track admission search keywords to paid tuition receipts", badge: "Marketing", icon: "🔍" },
    { name: "PhonePe & Cashfree", category: "payments", desc: "Direct trust account QR & payment gateway routing", badge: "Payments", icon: "💰" },
  ];

  const filteredIntegrations =
    activeIntegrationTab === "all"
      ? integrationsList
      : integrationsList.filter((item) => item.category === activeIntegrationTab);

  return (
    <>
      <Header content={header} />
      <main className="bg-white text-pulse-ink">
        {/* =========================================================================
            1. HERO SECTION
            Requirements:
            - Left side: Heading, Subheading, some text, and TWO buttons (one is Book a Demo).
            - Right side: Above the preview some static numbers, followed by native admissions cockpit UI.
            - Clean light background!
            - No raw uploaded screenshots!
        ========================================================================== */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-pulse-line bg-gradient-to-b from-[#f4f7fe] via-[#fafbff] to-white pt-[clamp(60px,7vw,100px)] pb-[clamp(72px,9vw,120px)]"
        >
          {/* Subtle light ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,63,212,0.07),transparent_65%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,176,125,0.06),transparent_65%)] blur-3xl"
          />

          <div className={`${container} relative flex flex-col gap-5 lg:gap-6`}>
            {/* Top Breadcrumb & Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-code text-pulse-subtle">
                <Link href="/" className="hover:text-pulse-ink transition">Home</Link>
                <span>/</span>
                <Link href="/crm" className="hover:text-pulse-ink transition">CRM</Link>
                <span>/</span>
                <span className="text-emerald-700 font-bold">Education Institute Operating System</span>
              </nav>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 font-code font-bold tracking-wider text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-[#22b07d] animate-pulse" />
                ADMISSIONS CRM + CAMPUS ERP UNIFIED
              </div>
            </div>

            {/* Main Hero 2-Column Grid */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Heading, Subheading, Text, Two Buttons */}
              <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pulse/20 bg-pulse-soft px-3.5 py-1.5 text-xs font-bold tracking-[0.08em] text-pulse uppercase font-code">
                  <span>🎓</span>
                  <span>BUILT FOR COACHING ACADEMIES, SCHOOLS &amp; COLLEGES</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h1
                    id="hero-heading"
                    className="text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] font-black tracking-tight text-balance text-pulse-ink"
                  >
                    The Complete Operating System for{" "}
                    <span className="bg-gradient-to-r from-pulse via-[#1e7e5a] to-[#22b07d] bg-clip-text text-transparent">
                      Education Institutes.
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg font-bold tracking-tight text-pulse">
                    Turn Every Student Enquiry into a Confirmed Admission.
                  </p>
                </div>

                <p className="text-[17px] leading-relaxed text-pretty text-pulse-muted">
                  Stop managing academic admissions with fragmented spreadsheets and lost WhatsApp messages. Uptrix unifies student inquiry ingestion, automated WhatsApp brochures, counselor attendance tracking, and installment tuition recovery on one reliable platform.
                </p>

                {/* Two Action Buttons */}
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/crm#demo"
                    className={`${btnPrimary} shadow-[0_14px_35px_-8px_rgba(59,63,212,0.5)] flex items-center gap-2.5 transition-transform hover:-translate-y-0.5`}
                  >
                    <span>Book a Demo</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>

                  <a
                    href="#calculator"
                    className="rounded-xl border border-pulse-line bg-white px-6 py-4 text-base font-bold whitespace-nowrap text-pulse-ink shadow-xs transition hover:border-pulse hover:bg-pulse-soft/30"
                  >
                    Calculate Admission ROI ↓
                  </a>
                </div>

                {/* Trust Points */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-pulse-subtle font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span> Free Excel Migration
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span> WhatsApp Cloud API Ready
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span> Go-Live in 5 Days
                  </span>
                </div>
              </div>

              {/* Right Column: Static Numbers Above + Bespoke Native Cockpit Preview */}
              <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-6">
                {/* STATIC NUMBERS ABOVE THE DASHBOARD PREVIEW */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#dfe3f2] shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black text-pulse-ink font-code">&lt; 30s</span>
                    <span className="text-[11px] font-semibold text-pulse-subtle mt-0.5">WhatsApp Brochure</span>
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#dfe3f2] shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-code">92%</span>
                    <span className="text-[11px] font-semibold text-pulse-subtle mt-0.5">Demo Show-Up Rate</span>
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#dfe3f2] shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black text-pulse font-code">₹0</span>
                    <span className="text-[11px] font-semibold text-pulse-subtle mt-0.5">Fee Discrepancy</span>
                  </div>
                  <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#dfe3f2] shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black text-purple-700 font-code">100%</span>
                    <span className="text-[11px] font-semibold text-pulse-subtle mt-0.5">Geo-Verified Staff</span>
                  </div>
                </div>

                {/* BESPOKE NATIVE COCKPIT PREVIEW (No raw screenshots) */}
                <div className="relative rounded-3xl border border-[#dfe3f2] bg-white p-3.5 sm:p-4 shadow-[0_25px_65px_-20px_rgba(20,28,80,0.12)]">
                  {/* Window Bar Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[#f0f2f8] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 font-code text-xs font-bold text-pulse-ink">Uptrix Admissions Command Center</span>
                    </div>
                    <span className="text-[10px] font-code font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ● Live Batch Cycle 2026
                    </span>
                  </div>

                  {/* Cockpit Inner Workspace */}
                  <div className="flex flex-col gap-3 rounded-2xl bg-[#f8f9fd] p-3 sm:p-4 border border-[#e2e6f4]">
                    {/* Top Search & Quick Action bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#e5e9f4]">
                      <div className="flex items-center gap-2 text-xs text-pulse-subtle">
                        <span>🔍</span>
                        <span className="font-code text-[11px] text-pulse-muted">Search 1,280 student applicants, phone, or batch...</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                          + New Inquiry
                        </span>
                        <span className="rounded-lg bg-pulse-soft border border-pulse/20 px-2 py-0.5 text-[10px] font-bold text-pulse font-code">
                          Record Fee
                        </span>
                      </div>
                    </div>

                    {/* 3 Interactive KPI Mini Cards */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-white p-2.5 border border-[#e2e6f4] shadow-2xs">
                        <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Today's Leads</span>
                        <span className="text-base sm:text-lg font-black text-pulse-ink font-code">148 Leads</span>
                        <span className="text-[9px] text-emerald-600 font-bold font-code mt-0.5 block">↑ 24% vs yesterday</span>
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-[#e2e6f4] shadow-2xs">
                        <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Talk Time</span>
                        <span className="text-base sm:text-lg font-black text-emerald-700 font-code">38.4 hrs</span>
                        <span className="text-[9px] text-pulse-subtle font-code mt-0.5 block">18 active callers</span>
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-[#e2e6f4] shadow-2xs">
                        <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Fees Collected</span>
                        <span className="text-base sm:text-lg font-black text-pulse font-code">₹4.85 L</span>
                        <span className="text-[9px] text-pulse-subtle font-code mt-0.5 block">14 tokens verified</span>
                      </div>
                    </div>

                    {/* Funnel Pipeline Stages */}
                    <div className="flex flex-col gap-1.5 rounded-xl bg-white p-3 border border-[#e2e6f4]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-pulse-ink">
                        <span>Admission Velocity Funnel</span>
                        <span className="text-emerald-700 font-code text-[10px]">92 Confirmed This Week</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-code">
                        <div className="rounded-lg bg-blue-50/80 p-1.5 border border-blue-200">
                          <span className="text-[10px] text-blue-700 font-medium block">Inquiry</span>
                          <span className="text-xs font-black text-blue-900">148</span>
                        </div>
                        <div className="rounded-lg bg-indigo-50/80 p-1.5 border border-indigo-200">
                          <span className="text-[10px] text-indigo-700 font-medium block">Counseled</span>
                          <span className="text-xs font-black text-indigo-900">94</span>
                        </div>
                        <div className="rounded-lg bg-purple-50/80 p-1.5 border border-purple-200">
                          <span className="text-[10px] text-purple-700 font-medium block">Demo / Visit</span>
                          <span className="text-xs font-black text-purple-900">42</span>
                        </div>
                        <div className="rounded-lg bg-emerald-50/80 p-1.5 border border-emerald-200">
                          <span className="text-[10px] text-emerald-700 font-medium block">Admitted</span>
                          <span className="text-xs font-black text-emerald-900">28</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Stream Ticker Preview */}
                    <div className="flex flex-col gap-1.5 rounded-xl bg-white p-2.5 border border-[#e2e6f4] text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-code text-pulse-subtle">
                        Live Stream • Just Now
                      </span>
                      <div className="flex items-center justify-between py-1 border-b border-[#f1f3f9] text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span className="font-bold text-pulse-ink">Aryan Verma (NEET 2026)</span>
                        </div>
                        <span className="font-code font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                          ₹15,000 Token Paid
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span className="font-bold text-pulse-ink">Kavitha R. connected call</span>
                        </div>
                        <span className="font-code text-pulse-subtle text-[10px]">Demo Sat 11 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: AUTONOMOUS BUSINESS INSIGHTS & PAYMENT TELEMETRY
            Clean, Executive-Grade SaaS Design:
            - Crisp Ambient Atmosphere (Light, Airy, Modern SaaS)
            - Top 4 Executive KPI Ribbon (Growth, Pipeline, Success Rate, Overdue Count)
            - Interactive Category Switcher Tabs
            - 6 High-Impact Operational Signal Cards with Crisp Badges & Context
            - 1-Click WhatsApp Reminder Dispatch Banner with Interactive Toast
        ========================================================================== */}
        <section
          id="business-insights"
          className="border-b border-pulse-line bg-gradient-to-b from-[#f8faff] via-white to-[#f5f8fd] py-[clamp(64px,8vw,110px)] relative overflow-hidden"
        >
          {/* Subtle Ambient Glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(59,63,212,0.06),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 -left-40 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(34,176,125,0.06),transparent_70%)] blur-3xl"
          />

          <div className={`${container} relative flex flex-col gap-10`}>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e2e8f5] pb-6">
              <div className="flex flex-col gap-3 max-w-[760px]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pulse/20 bg-pulse-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-pulse font-code shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-pulse animate-pulse" />
                  <span>⚡ AI FINANCIAL RADAR • AUTOMATED HIGHLIGHTS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-pulse-ink leading-tight">
                  Business Insights: Automated Highlights from Payment Data
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-pulse-muted">
                  No manual spreadsheets or calculators. Uptrix continuously analyzes tuition fee deposits, counselor velocity, and installment aging to surface 10 real-time operational highlights.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#edf2fa] border border-[#dce4f2] self-start md:self-auto shrink-0 shadow-inner">
                {[
                  { id: "all", label: "All Insights (10)" },
                  { id: "counselor", label: "Counselors" },
                  { id: "course", label: "Courses & Risk" },
                  { id: "cashflow", label: "Cashflow & Rails" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInsightFilter(tab.id as typeof insightFilter)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-code transition-all cursor-pointer ${
                      insightFilter === tab.id
                        ? "bg-white text-pulse-ink shadow-xs"
                        : "text-pulse-muted hover:text-pulse-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------
                TOP KPI RIBBON (4 Core Macro Financial Telemetry Cards)
            -------------------------------------------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
              {/* Metric 1: Revenue Growth */}
              <div className="group rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/60 via-white to-white p-5 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code font-bold uppercase tracking-wider text-emerald-800">
                    Period Velocity
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    📈
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-code tracking-tight">
                    +100.0%
                  </div>
                  <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                    Revenue growth vs previous period: +100.0%.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-100/80 text-[11px] text-emerald-800 font-medium font-code">
                  <span className="text-emerald-600 font-bold">↑</span> 2x Tuition Intake Volume
                </div>
              </div>

              {/* Metric 2: Expected Pipeline */}
              <div className="group rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/60 via-white to-white p-5 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code font-bold uppercase tracking-wider text-indigo-900">
                    Expected Pipeline
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-900 text-xs font-bold">
                    💼
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-indigo-950 font-code tracking-tight">
                    ₹12,32,000
                  </div>
                  <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                    Expected revenue if all pending collected: ₹1,232,000.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-100/80 text-[11px] text-indigo-900 font-medium font-code">
                  <span>●</span> Active Receivables Ledger
                </div>
              </div>

              {/* Metric 3: Collection Success Rate */}
              <div className="group rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/60 via-white to-white p-5 shadow-xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code font-bold uppercase tracking-wider text-teal-900">
                    Collection Efficiency
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-900 text-xs font-bold">
                    🎯
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-teal-800 font-code tracking-tight">
                    88.8%
                  </div>
                  <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                    Collection success rate: 88.8% across visible students.
                  </p>
                </div>
                <div className="pt-2 border-t border-teal-100/80 flex flex-col gap-1">
                  <div className="h-1.5 w-full bg-teal-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full w-[88.8%]" />
                  </div>
                  <span className="text-[10px] text-teal-900 font-code font-medium">
                    88.8% Realized • 11.2% in Recovery
                  </span>
                </div>
              </div>

              {/* Metric 4: Overdue Installments */}
              <div className="group rounded-2xl border border-rose-200/90 bg-gradient-to-br from-rose-50/60 via-white to-white p-5 shadow-xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-code font-bold uppercase tracking-wider text-rose-900">
                    Defaulter Attention
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-800 text-xs font-bold">
                    ⚠️
                  </span>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-rose-600 font-code tracking-tight">
                    7 Students
                  </div>
                  <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                    7 student(s) with overdue installments.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-rose-100/80 text-[11px] text-rose-700 font-medium font-code">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Installment 2 &amp; 3 Follow-up Ready
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                DEEP OPERATIONAL INSIGHTS (6 High-Impact Visual Cards)
            -------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Highest Collecting Counselor */}
              {(insightFilter === "all" || insightFilter === "counselor") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-base font-bold shadow-2xs">
                        👑
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-emerald-700 block">
                          Counselor Leaderboard #1
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Madhuri Tirlangi
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold font-code text-emerald-800 border border-emerald-200">
                      Top Performer
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#f7f9fd] p-3.5 border border-[#e4ebf7]">
                    <div className="text-2xl font-black text-emerald-700 font-code">
                      ₹646,000
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Highest collecting counselor: Madhuri Tirlangi (₹646,000).
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    Closed 42 enrollments with 100% token fee clearance and fastest parent follow-up rate across all counseling desks.
                  </p>
                </div>
              )}

              {/* Card 2: Lowest Collection Counselor */}
              {(insightFilter === "all" || insightFilter === "counselor") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 text-base font-bold shadow-2xs">
                        ⚠️
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-amber-700 block">
                          Counselor Desk Audit
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Kavitha Lingampally
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold font-code text-amber-800 border border-amber-200">
                      Audit Flag
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#fffcf5] p-3.5 border border-amber-200/80">
                    <div className="text-2xl font-black text-amber-700 font-code">
                      ₹37,000
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Lowest collection counselor: Kavitha Lingampally (₹37,000).
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    17.5x performance gap vs top desk. Recommended for lead reassignment and automated WhatsApp brochure assistance.
                  </p>
                </div>
              )}

              {/* Card 3: Most Profitable Course */}
              {(insightFilter === "all" || insightFilter === "course") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-800 text-base font-bold shadow-2xs">
                        🎓
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-blue-700 block">
                          Academic Yield Star
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Data Analytics - Gen AI
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold font-code text-blue-800 border border-blue-200">
                      Most Profitable
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#f4f7fe] p-3.5 border border-blue-200/80">
                    <div className="text-2xl font-black text-blue-700 font-code">
                      ₹954,000 collected
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Most profitable course: Data Analytics - Gen AI (₹954,000 collected).
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    Top grossing academic program for the current cohort with highest total enrollment fee revenue generated to date.
                  </p>
                </div>
              )}

              {/* Card 4: Most Overdue Course */}
              {(insightFilter === "all" || insightFilter === "course") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-rose-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-800 text-base font-bold shadow-2xs">
                        🚨
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-rose-700 block">
                          Defaulter Hotspot
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Data Analytics - Gen AI
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold font-code text-rose-800 border border-rose-200">
                      85.7% of Overdue
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#fff5f5] p-3.5 border border-rose-200/80">
                    <div className="text-2xl font-black text-rose-600 font-code">
                      6 student(s) overdue
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Most overdue course: Data Analytics - Gen AI (6 student(s)).
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    This course accounts for 6 out of 7 institute-wide overdue installment accounts. Recommended for batch WhatsApp reminder wave.
                  </p>
                </div>
              )}

              {/* Card 5: Biggest Single Payment on Record */}
              {(insightFilter === "all" || insightFilter === "cashflow") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800 text-base font-bold shadow-2xs">
                        💎
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-purple-700 block">
                          Transaction Peak
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Annual Full-Fee Clearance
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold font-code text-purple-800 border border-purple-200">
                      Record Ticket
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#faf6fe] p-3.5 border border-purple-200/80">
                    <div className="text-2xl font-black text-purple-700 font-code">
                      ₹60,000
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Biggest single payment on record: ₹60,000.
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    Full-year comprehensive tuition cleared upfront via instant digital rail, eliminating multiple installment collections.
                  </p>
                </div>
              )}

              {/* Card 6: Most Used Payment Method */}
              {(insightFilter === "all" || insightFilter === "cashflow") && (
                <div className="group rounded-2xl border border-[#dce3f1] bg-white p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800 text-base font-bold shadow-2xs">
                        ⚡
                      </span>
                      <div>
                        <span className="text-[10px] font-code font-bold uppercase tracking-wider text-indigo-700 block">
                          Primary Rail
                        </span>
                        <h4 className="text-base font-black text-pulse-ink">
                          Instant UPI &amp; Dynamic QR
                        </h4>
                      </div>
                    </div>
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold font-code text-indigo-800 border border-indigo-200">
                      74%+ Adoption
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#f4f6fe] p-3.5 border border-indigo-200/80">
                    <div className="text-2xl font-black text-indigo-700 font-code">
                      UPI
                    </div>
                    <p className="text-xs font-bold text-pulse-ink mt-1 leading-snug">
                      Most used payment method: UPI.
                    </p>
                  </div>

                  <p className="text-xs text-pulse-muted leading-relaxed">
                    Over 74% of parents settle installments via branded WhatsApp UPI payment links within 2 hours of notification dispatch.
                  </p>
                </div>
              )}
            </div>

            {/* -------------------------------------------------------------
                INTERACTIVE 1-CLICK ACTION CALLOUT BANNER
            -------------------------------------------------------------- */}
            <div className="rounded-2xl border border-pulse-line bg-gradient-to-r from-pulse/5 via-pulse-soft/40 to-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pulse text-white text-lg shadow-md shadow-pulse/30">
                  ⚡
                </div>
                <div>
                  <span className="text-xs font-code font-bold text-pulse uppercase tracking-wider block">
                    Actionable Automation Prompt
                  </span>
                  <p className="text-sm font-bold text-pulse-ink">
                    7 student(s) with overdue installments detected in payment ledger.
                  </p>
                  <p className="text-xs text-pulse-muted mt-0.5">
                    Click below to trigger automated polite WhatsApp reminders with pre-filled UPI payment links.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setInsightToast("✓ Dispatched 7 personalized WhatsApp fee reminders with UPI links!");
                    setTimeout(() => setInsightToast(null), 4000);
                  }}
                  className="w-full sm:w-auto rounded-xl bg-pulse hover:bg-pulse-hover text-white font-code text-xs font-bold px-5 py-3 shadow-md shadow-pulse/30 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>⚡</span> Auto-Dispatch WhatsApp Reminders (7 Students)
                </button>
              </div>
            </div>

            {/* Toast Notification */}
            {insightToast && (
              <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 border border-emerald-500/50 px-4 py-3 text-xs font-bold text-white shadow-2xl animate-bounce">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{insightToast}</span>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: TUITION & PAYMENT RECOVERY ARCHITECTURE
            Distinct Redesign: Multi-Angle Interactive Financial Recovery Cockpit
            - Interactive Student Profile & WhatsApp Payment Simulator (Left Panel)
            - Clickable Campus Fee Ledger with Row Selection & Bulk Actions (Right Panel)
            - Financial Contrast Matrix (Spreadsheet Leakage vs Uptrix Automated Standard)
            - 4 Strategic Pillars of Zero Fee Leakage
        ========================================================================== */}
        <section
          id="sec-payments-feature"
          className="border-b border-pulse-line bg-gradient-to-b from-[#fafbff] via-white to-[#f8f9fd] py-[clamp(68px,8.5vw,116px)]"
        >
          <div className={`${container} flex flex-col gap-12`}>
            {/* Header */}
            <div className="flex flex-col gap-3.5 max-w-[860px]">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 uppercase font-code">
                <span>💳</span>
                <span>TUITION RECOVERY &amp; SEAT TOKEN ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] font-black tracking-tight text-pulse-ink">
                Zero Fee Leakage: Seat Token Ledger &amp; Automated Overdue Tracking
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-pulse-muted">
                Private academies and coaching institutes lose 12% to 18% of earned revenue to forgotten installment dates and unverified WhatsApp payment slips. Uptrix unifies seat reservation tokens, automated WhatsApp installment links, and Tally-synced ledger accounting.
              </p>
            </div>

            {/* Financial Contrast: Spreadsheet Trap vs Uptrix Automated Standard */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-br from-rose-50/90 to-red-50/30 p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                      <span>⚠️</span> The Spreadsheet &amp; Screenshot Trap
                    </span>
                    <span className="font-code text-[11px] font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                      Average 15% Lost
                    </span>
                  </div>
                  <p className="text-sm text-rose-950 leading-relaxed font-medium">
                    Parents promise second installments on sticky notes. Staff accept unverified bank transfer screenshots on personal phones, while branch cash desks go un-reconciled with the central trust account.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-rose-200/60 text-xs">
                  <div>
                    <span className="font-bold text-rose-900 block font-code">₹6.2 Lakh+ Lost</span>
                    <span className="text-rose-700 text-[11px]">Per 100 students every cycle</span>
                  </div>
                  <div>
                    <span className="font-bold text-rose-900 block font-code">14 Days Delay</span>
                    <span className="text-rose-700 text-[11px]">In discovering overdue defaults</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-50/90 to-[#f0fbf6] p-6 sm:p-7 flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                      <span>✅</span> The Uptrix Zero-Leakage Protocol
                    </span>
                    <span className="font-code text-[11px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded">
                      99.4% On-Time Collection
                    </span>
                  </div>
                  <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                    Seats are locked with non-refundable tokens. Branded WhatsApp payment links route straight to your institutional account with automated installment reminders triggered 5 days prior.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200/80 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block font-code">&lt; 30 Seconds</span>
                    <span className="text-emerald-700 text-[11px]">1-Click UPI payment link in chat</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-900 block font-code">Zero Discrepancy</span>
                    <span className="text-emerald-700 text-[11px]">Automated Tally voucher creation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Financial Cockpit: 2-Column Interactive Workspace */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-5 sm:p-8 shadow-[0_20px_55px_-20px_rgba(20,28,80,0.1)] flex flex-col gap-6">
              {/* Financial KPI Summary Bar */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-b border-[#f0f2f8] pb-6">
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4]">
                  <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Total Receivables</span>
                  <span className="text-xl sm:text-2xl font-black text-pulse-ink font-code mt-0.5 block">₹48.50 Lakh</span>
                  <span className="text-[11px] text-pulse-subtle font-code mt-1 block">Term 2026-27 Active</span>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4]">
                  <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Collected To Date</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 font-code mt-0.5 block">₹36.20 Lakh</span>
                  <span className="text-[11px] text-emerald-600 font-bold font-code mt-1 block">74.6% Cleared in Bank</span>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4]">
                  <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Overdue Recoverable</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-600 font-code mt-0.5 block">₹4.80 Lakh</span>
                  <span className="text-[11px] text-rose-700 font-bold font-code mt-1 block">2 Accounts Flagged</span>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4]">
                  <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Due in Next 7 Days</span>
                  <span className="text-xl sm:text-2xl font-black text-pulse font-code mt-0.5 block">₹7.50 Lakh</span>
                  <span className="text-[11px] text-pulse font-bold font-code mt-1 block">WhatsApp links primed</span>
                </div>
              </div>

              {/* Two-Panel Interactive Workspace */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                {/* LEFT PANEL (5 cols): Live Student Profile & WhatsApp Payment Simulator */}
                <div className="flex flex-col gap-4 rounded-2xl border border-[#dfe3f2] bg-[#f8f9fd] p-4 sm:p-5 lg:col-span-5">
                  <div className="flex items-center justify-between border-b border-[#e5e9f4] pb-3">
                    <div>
                      <span className="font-bold text-xs text-pulse-ink font-code uppercase block">
                        Student Fee Inspection
                      </span>
                      <span className="text-[10px] font-code text-pulse-subtle">
                        Selected: <strong className="text-pulse-ink">{selectedStudent.id}</strong>
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-code ${
                        selectedStudent.status === "overdue"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : selectedStudent.status === "due_today"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      }`}
                    >
                      {selectedStudent.statusLabel}
                    </span>
                  </div>

                  {/* Student Card */}
                  <div className="rounded-xl bg-white p-3.5 border border-[#e2e6f4] shadow-2xs flex flex-col gap-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-pulse-ink">{selectedStudent.student}</h4>
                        <p className="text-[11px] text-pulse-muted mt-0.5">{selectedStudent.course}</p>
                      </div>
                      <span className="rounded-md bg-pulse-soft px-2 py-0.5 text-[10px] font-code font-bold text-pulse">
                        {selectedStudent.counselor}
                      </span>
                    </div>

                    {/* Fee Progress Bar */}
                    <div className="flex flex-col gap-1 pt-1 border-t border-[#f1f3f9]">
                      <div className="flex items-center justify-between text-xs font-code">
                        <span className="text-pulse-subtle">Fee Collected:</span>
                        <span className="font-bold text-pulse-ink">
                          {selectedStudent.paid} / {selectedStudent.totalFee}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#e8ebf5] overflow-hidden">
                        <div
                          style={{ width: `${selectedStudent.paidPct}%` }}
                          className={`h-full rounded-full ${
                            selectedStudent.paidPct === 100
                              ? "bg-emerald-500"
                              : selectedStudent.status === "overdue"
                              ? "bg-rose-500"
                              : "bg-pulse"
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-code text-pulse-subtle">
                        <span>{selectedStudent.paidPct}% Cleared</span>
                        <span className={selectedStudent.due === "₹0" ? "text-emerald-700 font-bold" : "text-rose-600 font-bold"}>
                          Outstanding: {selectedStudent.due}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Payment Recovery Card Simulator */}
                  <div className="flex flex-col gap-2 rounded-xl bg-emerald-50/70 p-3.5 border border-emerald-200">
                    <div className="flex items-center justify-between text-[11px] text-emerald-900 border-b border-emerald-200/80 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-bold font-code">WhatsApp Official Cloud Dispatch</span>
                      </div>
                      <span className="font-code text-[10px] text-emerald-700">{selectedStudent.phone}</span>
                    </div>

                    <div className="rounded-lg bg-white p-3 text-xs shadow-2xs border border-emerald-100 flex flex-col gap-2">
                      <p className="text-[11px] leading-relaxed text-pulse-ink">
                        Dear {selectedStudent.parentName}, this is from Uptrix Admissions Desk. Your installment of{" "}
                        <strong className="text-pulse-ink font-bold">
                          {selectedStudent.due === "₹0" ? selectedStudent.totalFee : selectedStudent.due}
                        </strong>{" "}
                        for {selectedStudent.student}&apos;s enrollment is{" "}
                        {selectedStudent.status === "overdue"
                          ? `overdue since ${selectedStudent.dueDate}`
                          : selectedStudent.status === "due_today"
                          ? "scheduled for today"
                          : `cleared on ${selectedStudent.dueDate}`}
                        . Please find your instant payment link and invoice below:
                      </p>

                      <div className="flex flex-col gap-1.5 pt-1">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#1ebc59] transition cursor-pointer shadow-xs"
                        >
                          <span>💳 Pay via UPI QR / Net Banking</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e2e6f4] bg-[#f8f9fd] px-3 py-1 text-[10px] font-code text-pulse-ink hover:bg-white transition cursor-pointer"
                        >
                          <span>📄 Official Invoice #{selectedStudent.invoiceNo}</span>
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] font-code text-emerald-800 text-center">
                      🔒 Direct Settlement to Trust Account • Razorpay &amp; Tally Synced
                    </span>
                  </div>

                  {/* Installment Milestone Stepper */}
                  <div className="flex flex-col gap-2 rounded-xl bg-white p-3 border border-[#e2e6f4] text-xs">
                    <span className="font-bold font-code text-[11px] text-pulse-ink uppercase">
                      Installment Ledger Stepper
                    </span>
                    <div className="flex flex-col gap-2 pt-1 font-code text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <span>✓</span> 1. Seat Token Advance
                        </span>
                        <span className="text-pulse-subtle">{selectedStudent.tokenPaid}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <span>✓</span> 2. First Installment
                        </span>
                        <span className="text-pulse-subtle">{selectedStudent.inst1Paid}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex items-center gap-1.5 font-bold ${
                            selectedStudent.status === "cleared"
                              ? "text-emerald-700"
                              : selectedStudent.status === "overdue"
                              ? "text-rose-600"
                              : "text-amber-600"
                          }`}
                        >
                          <span>{selectedStudent.status === "cleared" ? "✓" : "⏳"}</span> 3. Second Installment
                        </span>
                        <span className="text-pulse-subtle">{selectedStudent.inst2Due}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL (7 cols): Interactive Campus Ledger & Overdue Flagged Board */}
                <div className="flex flex-col gap-4 lg:col-span-7">
                  {/* Control Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f8f9fd] p-3 rounded-2xl border border-[#e2e6f4]">
                    {/* Status Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: "all", label: "All Records (6)" },
                        { id: "overdue", label: "⚠️ Overdue (2)" },
                        { id: "due_today", label: "⏳ Due Today (2)" },
                        { id: "cleared", label: "✅ Cleared (2)" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPaymentFilter(tab.id as any)}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                            paymentFilter === tab.id
                              ? "bg-pulse text-white shadow-xs"
                              : "border border-[#dfe3f2] bg-white text-pulse-muted hover:border-pulse hover:text-pulse-ink"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Bulk Reminder Action Button */}
                    <button
                      type="button"
                      onClick={() => setBulkReminderSent(!bulkReminderSent)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer font-code ${
                        bulkReminderSent
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                      }`}
                    >
                      {bulkReminderSent
                        ? "✅ 2 Overdue WhatsApp Links Sent"
                        : "⚡ Send Bulk Reminders (2 Overdue)"}
                    </button>
                  </div>

                  {/* Interactive Student Fee Records Table */}
                  <div className="overflow-x-auto rounded-2xl border border-[#e2e6f4] bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#e5e9f4] bg-[#f8f9fd] text-[11px] font-bold text-pulse-subtle uppercase font-code">
                          <th className="py-3 px-3.5">Student &amp; ID</th>
                          <th className="py-3 px-3">Batch &amp; Counselor</th>
                          <th className="py-3 px-3">Stage</th>
                          <th className="py-3 px-3">Fee Breakdown</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f2f8]">
                        {filteredPayments.map((p) => {
                          const isSelected = selectedStudentId === p.id;
                          return (
                            <tr
                              key={p.id}
                              onClick={() => setSelectedStudentId(p.id)}
                              className={`transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-50/40 border-l-4 border-l-emerald-600"
                                  : "hover:bg-[#fbfcfe]"
                              }`}
                            >
                              <td className="py-3 px-3.5">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full font-bold text-xs ${
                                      isSelected
                                        ? "bg-emerald-600 text-white"
                                        : "bg-pulse-soft text-pulse"
                                    }`}
                                  >
                                    {p.student.charAt(0)}
                                  </span>
                                  <div>
                                    <div className="font-bold text-pulse-ink">{p.student}</div>
                                    <div className="text-[10px] font-code text-pulse-subtle">{p.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <div className="font-medium text-pulse-ink leading-tight line-clamp-1">{p.course}</div>
                                <div className="text-[10px] font-code text-pulse-muted mt-0.5">Assigned: {p.counselor}</div>
                              </td>
                              <td className="py-3 px-3">
                                <span className="rounded bg-[#f0f2f8] px-2 py-0.5 font-code text-[10px] text-pulse-ink whitespace-nowrap">
                                  {p.stage}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-code">
                                <div className="font-bold text-pulse-ink">{p.totalFee}</div>
                                <div
                                  className={`text-[10px] font-bold ${
                                    p.due === "₹0" ? "text-emerald-700" : "text-rose-600"
                                  }`}
                                >
                                  Due: {p.due}
                                </div>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span
                                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold font-code ${
                                    p.status === "overdue"
                                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                                      : p.status === "due_today"
                                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  }`}
                                >
                                  {p.statusLabel}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedStudentId(p.id);
                                  }}
                                  className={`rounded-lg px-2.5 py-1 text-[10px] font-bold font-code transition cursor-pointer ${
                                    isSelected
                                      ? "bg-emerald-700 text-white shadow-xs"
                                      : "border border-pulse/20 bg-pulse-soft text-pulse hover:bg-pulse hover:text-white"
                                  }`}
                                >
                                  {isSelected ? "Inspecting" : "Inspect →"}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Accounting Sync Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f8f9fd] px-3.5 py-2.5 border border-[#e2e6f4] text-xs font-code">
                    <div className="flex items-center gap-2 text-pulse-ink">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Direct Sync Active: <strong>Tally ERP Prime &amp; Zoho Books</strong></span>
                    </div>
                    <span className="text-emerald-700 font-bold">0 Unreconciled Bank Receipts</span>
                  </div>
                </div>
              </div>

              {/* 4 Strategic Pillars of Zero Fee Leakage */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-[#f0f2f8]">
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1.5 shadow-2xs">
                  <span className="text-xl">🎟️</span>
                  <span className="font-bold text-pulse-ink text-xs">Seat Token Locking</span>
                  <p className="text-[11px] text-pulse-muted leading-relaxed">
                    Reserve seats strictly against non-refundable token fees with an automated release countdown if unpaid.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1.5 shadow-2xs">
                  <span className="text-xl">💬</span>
                  <span className="font-bold text-pulse-ink text-xs">WhatsApp Direct UPI</span>
                  <p className="text-[11px] text-pulse-muted leading-relaxed">
                    Eliminate fake transfer screenshots. Parents tap a branded WhatsApp link and pay directly into trust accounts.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1.5 shadow-2xs">
                  <span className="text-xl">⏰</span>
                  <span className="font-bold text-pulse-ink text-xs">Due-Date Escalation</span>
                  <p className="text-[11px] text-pulse-muted leading-relaxed">
                    Polite reminders auto-dispatched 5 days before, on the due date, and +3 days overdue with counselor alerts.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1.5 shadow-2xs">
                  <span className="text-xl">📒</span>
                  <span className="font-bold text-pulse-ink text-xs">Tally &amp; GST Invoicing</span>
                  <p className="text-[11px] text-pulse-muted leading-relaxed">
                    Official numbered GST invoices generated automatically upon payment with zero manual accounts discrepancy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ORGANIZATION & TEAM ATTENDANCE
            Distinct Design: Live Attendance Board + Real Staff Roster (P Thriveni, Kavitha...)
        ========================================================================== */}
        {/* =========================================================================
            SECTION 3: ORGANIZATION & COUNSELOR ATTENDANCE
            Distinct Redesign: Executive Split Header + 3-Card Floor Readiness Architecture
            - Live Floor Readiness Card in Header (Right Side)
            - 3-Card Operational Anti-Proxy & Geo-Fencing Architecture
            - Dual-View Interactive Campus Attendance Cockpit
        ========================================================================== */}
        <section
          id="sec-attendance-feature"
          className="border-b border-pulse-line bg-gradient-to-b from-white via-[#f7f9fe] to-[#f4f7fd] py-[clamp(68px,8.5vw,116px)]"
        >
          <div className={`${container} flex flex-col gap-12`}>
            {/* Executive Split Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Heading & Context */}
              <div className="flex flex-col gap-3.5 lg:col-span-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-300 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 uppercase font-code">
                  <span>📍</span>
                  <span>SMART CAMPUS BIOMETRICS &amp; GEO-FENCING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] font-black tracking-tight text-pulse-ink">
                  Guaranteed Floor Presence: 50m Geo-Fenced Shifts &amp; Real-Time Desk Audit
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-pulse-muted">
                  During peak admission season, an empty counseling desk on a Saturday afternoon is an immediate lost enrollment. Uptrix monitors physical 50-meter GPS check-ins, biometric hardware sync, and live floor presence across all campus branches.
                </p>
              </div>

              {/* Right Column: Floor Readiness Live Status Widget */}
              <div className="flex flex-col gap-3 rounded-2xl border border-teal-200 bg-white p-5 shadow-xs lg:col-span-4">
                <div className="flex items-center justify-between border-b border-[#f0f2f8] pb-3">
                  <span className="text-xs font-bold uppercase font-code text-pulse-ink">Campus Readiness</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 font-code border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    96.4% Floor Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e2e6f4]">
                    <span className="text-[10px] text-pulse-subtle font-code block">Active Now</span>
                    <span className="text-base font-black text-pulse-ink font-code mt-0.5 block">25 / 28 Staff</span>
                  </div>
                  <div className="rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e2e6f4]">
                    <span className="text-[10px] text-pulse-subtle font-code block">Proxy Punches</span>
                    <span className="text-base font-black text-emerald-700 font-code mt-0.5 block">0 Allowed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-pulse-subtle font-code pt-1">
                  <span>● Biometric Devices Synced</span>
                  <span className="text-emerald-700 font-bold">ZKTeco &amp; GPS Lock</span>
                </div>
              </div>
            </div>

            {/* 3-Card Operational Anti-Proxy & Floor-Readiness Architecture */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: The Problem */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50/70 to-white p-6 shadow-2xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-rose-800">
                      <span>⚠️</span> The Unmanned Desk Trap
                    </span>
                    <span className="rounded bg-rose-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-rose-700">
                      Walk-in Loss
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-rose-950">Counselors Absent When Parents Arrive</h3>
                  <p className="text-xs text-rose-900/90 leading-relaxed">
                    Staff leave desks early on weekends or ask colleagues to mark proxy attendance in Excel. Center Directors only discover unmanned cabins after frustrated parents walk away without enrolling.
                  </p>
                </div>
                <div className="border-t border-rose-200/80 pt-3 text-xs">
                  <span className="font-bold text-rose-900 block font-code">38% Enrollment Drop</span>
                  <span className="text-[11px] text-rose-700">During unmonitored counseling shifts</span>
                </div>
              </div>

              {/* Card 2: The Geo-Fence Fix */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/70 to-white p-6 shadow-2xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-teal-800">
                      <span>🎯</span> 50m Perimeter Lock
                    </span>
                    <span className="rounded bg-teal-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-teal-700">
                      Zero Proxy
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-teal-950">Punch-In Validated by Campus GPS</h3>
                  <p className="text-xs text-teal-900/90 leading-relaxed">
                    Web and mobile punch-ins unlock strictly when the employee is physically inside the campus 50-meter perimeter (e.g. 12.9716°N, 77.5946°E). Eliminates remote proxy punch entirely.
                  </p>
                </div>
                <div className="border-t border-teal-200/80 pt-3 text-xs">
                  <span className="font-bold text-teal-900 block font-code">100% Physical Presence</span>
                  <span className="text-[11px] text-teal-700">Hardware biometric + GPS dual verification</span>
                </div>
              </div>

              {/* Card 3: The Automated Escalation */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-white p-6 shadow-2xs sm:col-span-2 lg:col-span-1">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-indigo-800">
                      <span>⚡</span> Instant Lead Re-Routing
                    </span>
                    <span className="rounded bg-indigo-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-indigo-700">
                      Automated SLA
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-indigo-950">Zero Leads Left Waiting at Reception</h3>
                  <p className="text-xs text-indigo-900/90 leading-relaxed">
                    If an assigned counselor is absent 15 minutes past shift start, the system sends an urgent alert to the Center Director and re-routes pending inquiries to active floor counselors automatically.
                  </p>
                </div>
                <div className="border-t border-indigo-200/80 pt-3 text-xs">
                  <span className="font-bold text-indigo-900 block font-code">&lt; 5 Min Response Time</span>
                  <span className="text-[11px] text-indigo-700">Guaranteed counseling floor readiness</span>
                </div>
              </div>
            </div>

            {/* Attendance Interactive Cockpit */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_55px_-20px_rgba(20,28,80,0.08)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1e5f2] pb-4">
                <div className="flex gap-2 rounded-xl bg-[#f1f3f9] p-1">
                  <button
                    type="button"
                    onClick={() => setAttendanceTab("org")}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                      attendanceTab === "org"
                        ? "bg-pulse text-white shadow-xs"
                        : "text-pulse-muted hover:text-pulse-ink"
                    }`}
                  >
                    Organization Attendance
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendanceTab("team")}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                      attendanceTab === "team"
                        ? "bg-pulse text-white shadow-xs"
                        : "text-pulse-muted hover:text-pulse-ink"
                    }`}
                  >
                    Team Attendance Roster
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-code font-bold">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                    ● Real-Time Biometric &amp; Web Punch
                  </span>
                </div>
              </div>

              {/* Native Bespoke Attendance Cockpit (No raw screenshots) */}
              {attendanceTab === "org" ? (
                /* VIEW 1: Organization Attendance & Geo-fenced Coverage */
                <div className="flex flex-col gap-6">
                  {/* Punch Summary Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4]">
                      <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Total Staff Enrolled</span>
                      <span className="text-lg sm:text-xl font-black text-pulse-ink font-code">28 Staff</span>
                      <span className="text-[10px] text-pulse-subtle font-code mt-0.5 block">Across 2 Campuses</span>
                    </div>
                    <div className="rounded-2xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4]">
                      <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Present on Floor</span>
                      <span className="text-lg sm:text-xl font-black text-emerald-700 font-code">25 Staff</span>
                      <span className="text-[10px] text-emerald-600 font-bold font-code mt-0.5 block">89.3% Desk Attendance</span>
                    </div>
                    <div className="rounded-2xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4]">
                      <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Planned Leave</span>
                      <span className="text-lg sm:text-xl font-black text-pulse font-code">2 Staff</span>
                      <span className="text-[10px] text-pulse-subtle font-code mt-0.5 block">Portal Approved</span>
                    </div>
                    <div className="rounded-2xl bg-[#f8f9fd] p-3.5 border border-[#e2e6f4]">
                      <span className="text-[10px] font-semibold text-pulse-subtle block uppercase font-code">Late / Unmarked</span>
                      <span className="text-lg sm:text-xl font-black text-amber-600 font-code">1 Staff</span>
                      <span className="text-[10px] text-amber-700 font-bold font-code mt-0.5 block">Alert sent to Lead</span>
                    </div>
                  </div>

                  {/* 2-Column Campus Coverage & Real-Time Punch Stream */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left: Campus Geofence Status */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e6f4] bg-[#f8f9fd] p-4 lg:col-span-5">
                      <div className="flex items-center justify-between border-b border-[#e5e9f4] pb-2">
                        <span className="font-bold text-xs text-pulse-ink font-code uppercase">Campus Geofence Radar</span>
                        <span className="text-[10px] font-bold text-emerald-700 font-code">● 50m Perimeter Active</span>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <div className="rounded-xl bg-white p-3 border border-[#e2e6f4]">
                          <div className="flex items-center justify-between text-xs font-bold text-pulse-ink">
                            <span>🏫 Central Campus (Main Desk)</span>
                            <span className="text-emerald-700 font-code">16/16 Present</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between text-[11px] text-pulse-subtle font-code">
                            <span>Biometric Terminal 01 &amp; GPS</span>
                            <span className="text-emerald-600 font-bold">100% Floor Covered</span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white p-3 border border-[#e2e6f4]">
                          <div className="flex items-center justify-between text-xs font-bold text-pulse-ink">
                            <span>🏫 North Campus (Branch Desk)</span>
                            <span className="text-emerald-700 font-code">9/10 Present</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between text-[11px] text-pulse-subtle font-code">
                            <span>Biometric Terminal 02</span>
                            <span className="text-emerald-600 font-bold">90% Floor Covered</span>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white p-3 border border-[#e2e6f4]">
                          <div className="flex items-center justify-between text-xs font-bold text-pulse-ink">
                            <span>🏠 Field Outreach &amp; Tele-Counselors</span>
                            <span className="text-pulse font-code">3 Active Now</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between text-[11px] text-pulse-subtle font-code">
                            <span>Web Geo-Punch Verified</span>
                            <span className="text-pulse font-bold">Live GPS Lock</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Live Staff Punch Stream */}
                    <div className="flex flex-col gap-2 rounded-2xl border border-[#e2e6f4] bg-white p-4 lg:col-span-7">
                      <div className="flex items-center justify-between border-b border-[#f0f2f8] pb-2">
                        <span className="font-bold text-xs text-pulse-ink font-code uppercase">Today's Live Punch-In Stream</span>
                        <span className="text-[10px] font-code text-pulse-subtle">Audit Trail • 100 Logs</span>
                      </div>
                      <div className="flex flex-col divide-y divide-[#f1f3f9] text-xs">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-code font-bold text-pulse-subtle text-[11px]">09:14 AM</span>
                            <div>
                              <span className="font-bold text-pulse-ink">P Thriveni</span>
                              <span className="text-pulse-subtle text-[11px] ml-1.5 font-code">(Client Admin)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pulse-muted font-code hidden sm:inline">Biometric Terminal 01</span>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                              On Time
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-code font-bold text-pulse-subtle text-[11px]">09:21 AM</span>
                            <div>
                              <span className="font-bold text-pulse-ink">Kavitha R.</span>
                              <span className="text-pulse-subtle text-[11px] ml-1.5 font-code">(Sales Lead)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pulse-muted font-code hidden sm:inline">GPS Web (12.9716°N)</span>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                              On Time
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-code font-bold text-pulse-subtle text-[11px]">09:35 AM</span>
                            <div>
                              <span className="font-bold text-pulse-ink">Suresh Babu</span>
                              <span className="text-pulse-subtle text-[11px] ml-1.5 font-code">(Senior Counselor)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pulse-muted font-code hidden sm:inline">Mobile App Punch</span>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                              Session 1 Active
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-code font-bold text-pulse-subtle text-[11px]">09:42 AM</span>
                            <div>
                              <span className="font-bold text-pulse-ink">Madhuri S.</span>
                              <span className="text-pulse-subtle text-[11px] ml-1.5 font-code">(Academic Counselor)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pulse-muted font-code hidden sm:inline">Biometric Terminal 02</span>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                              Session 1 Active
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-code font-bold text-rose-500 text-[11px]">10:15 AM</span>
                            <div>
                              <span className="font-bold text-pulse-ink">Ramesh K.</span>
                              <span className="text-pulse-subtle text-[11px] ml-1.5 font-code">(Tele-caller)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pulse-muted font-code hidden sm:inline">Web Punch</span>
                            <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700 font-code">
                              Late (+15m)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW 2: Team Daily Attendance Roster Table */
                <div className="overflow-x-auto rounded-2xl border border-[#e2e6f4] bg-white shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#e5e9f4] bg-[#f8f9fd] text-[11px] font-bold text-pulse-subtle uppercase font-code">
                        <th className="py-3 px-4">Staff Member</th>
                        <th className="py-3 px-4">Role &amp; Campus</th>
                        <th className="py-3 px-4">Shift Schedule</th>
                        <th className="py-3 px-4">First Punch (In)</th>
                        <th className="py-3 px-4">Active Duration</th>
                        <th className="py-3 px-4">Punch Mode</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f2f8]">
                      {[
                        {
                          name: "P Thriveni",
                          role: "Client Admin",
                          campus: "Central Campus",
                          shift: "09:00 - 18:00",
                          punchIn: "09:14 AM",
                          duration: "7h 46m",
                          mode: "Biometric #01",
                          status: "Present",
                          statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                        },
                        {
                          name: "Kavitha R.",
                          role: "Sales Lead",
                          campus: "Central Campus",
                          shift: "09:00 - 18:00",
                          punchIn: "09:21 AM",
                          duration: "7h 39m",
                          mode: "GPS Web (12.97°N)",
                          status: "Present",
                          statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                        },
                        {
                          name: "Suresh Babu",
                          role: "Senior Admissions Counselor",
                          campus: "Central Campus",
                          shift: "09:30 - 18:30",
                          punchIn: "09:35 AM",
                          duration: "7h 25m",
                          mode: "Mobile App Punch",
                          status: "Present",
                          statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                        },
                        {
                          name: "Madhuri S.",
                          role: "Academic Counselor",
                          campus: "North Campus",
                          shift: "09:30 - 18:30",
                          punchIn: "09:42 AM",
                          duration: "7h 18m",
                          mode: "Biometric #02",
                          status: "Present",
                          statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                        },
                        {
                          name: "Ramesh K.",
                          role: "Outreach Associate",
                          campus: "North Campus",
                          shift: "09:30 - 18:30",
                          punchIn: "10:15 AM",
                          duration: "6h 45m",
                          mode: "Web Punch",
                          status: "Late (+15m)",
                          statusClass: "bg-amber-50 text-amber-700 border-amber-200",
                        },
                        {
                          name: "Rajesh G.",
                          role: "Field Outreach Counselor",
                          campus: "Field / Outreach",
                          shift: "09:30 - 18:30",
                          punchIn: "--",
                          duration: "0h 0m",
                          mode: "HR Portal",
                          status: "Planned Leave",
                          statusClass: "bg-purple-50 text-purple-700 border-purple-200",
                        },
                      ].map((member, idx) => (
                        <tr key={idx} className="hover:bg-[#fbfcfe] transition-colors">
                          <td className="py-3 px-4 font-bold text-pulse-ink">
                            <div className="flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-bold text-[10px]">
                                {member.name.charAt(0)}
                              </span>
                              <span>{member.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-pulse-ink">{member.role}</div>
                            <div className="text-[10px] font-code text-pulse-subtle">{member.campus}</div>
                          </td>
                          <td className="py-3 px-4 font-code text-pulse-muted">{member.shift}</td>
                          <td className="py-3 px-4 font-code font-bold text-pulse-ink">{member.punchIn}</td>
                          <td className="py-3 px-4 font-code text-emerald-700 font-bold">{member.duration}</td>
                          <td className="py-3 px-4 font-code text-pulse-subtle text-[11px]">{member.mode}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold font-code ${member.statusClass}`}>
                              {member.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Role Mapping Details */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2 text-xs">
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="text-[10px] text-pulse-subtle block uppercase font-code">Roles Enforced</span>
                  <span className="font-bold text-pulse-ink mt-0.5 block">Client Admin, Sales Lead, Sales Associate</span>
                </div>
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="text-[10px] text-pulse-subtle block uppercase font-code">Shift Verification</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">Session 1 &amp; Session 2 Auto-Logged</span>
                </div>
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="text-[10px] text-pulse-subtle block uppercase font-code">Live Activity Log</span>
                  <span className="font-bold text-pulse-ink mt-0.5 block">Timestamped Audit Stream (100 Logs)</span>
                </div>
                <div className="rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                  <span className="text-[10px] text-pulse-subtle block uppercase font-code">Payroll Export</span>
                  <span className="font-bold text-purple-700 mt-0.5 block">1-Click Monthly Hours Report</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTEGRATIONS ECOSYSTEM
            Distinct Design: Interactive Category Filterable 50+ App Marketplace Wall
        ========================================================================== */}
        <section
          id="sec-integrations-feature"
          className="border-b border-pulse-line bg-gradient-to-b from-[#f8f9fd] via-white to-[#f4f7fd] py-[clamp(68px,8.5vw,116px)]"
        >
          <div className={`${container} flex flex-col gap-12`}>
            {/* Executive Unified Header with Live Middleware Telemetry */}
            <div className="flex flex-col gap-6 text-center max-w-4xl mx-auto">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-300 bg-blue-50/90 px-4 py-1.5 text-xs font-bold text-blue-800 uppercase font-code mx-auto shadow-2xs">
                <span>⚡</span>
                <span>ZERO-CODE INSTITUTIONAL ECOSYSTEM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] font-black tracking-tight text-pulse-ink">
                Connect Your WhatsApp, Tally, Meta Ads &amp; Telephony in One Unified Hub
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-pulse-muted max-w-3xl mx-auto">
                No need to replace your existing accounting software or rebuild ad campaigns. Uptrix acts as your centralized admissions middleware, synchronizing student leads, fee installments, and parent communication in real time with zero developer effort.
              </p>

              {/* Live Telemetry Health Strip */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-800 font-code">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Middleware Uptime: 100% Operational</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-800 font-code">
                  <span>⚡</span>
                  <span>Sync Latency: &lt; 40ms</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-3.5 py-1 text-xs font-bold text-indigo-800 font-code">
                  <span>🔒</span>
                  <span>TLS 1.3 Bank-Grade Security</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-200 px-3.5 py-1 text-xs font-bold text-purple-800 font-code">
                  <span>🔄</span>
                  <span>Two-Way Bi-Directional Bus</span>
                </div>
              </div>
            </div>

            {/* Interactive Integration Switchboard & Live Pipeline Cockpit */}
            <div className="rounded-3xl border border-[#d9e1f2] bg-white shadow-md overflow-hidden">
              {/* Cockpit Top Bar */}
              <div className="bg-[#f8fafd] border-b border-[#e3e8f6] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="text-xs font-bold uppercase font-code tracking-wider text-pulse-ink">
                    Institutional Data Bus • Live Synchronization Engine
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-code">
                  <span className="text-pulse-muted">Active Connectors: <strong className="text-pulse-ink">14 Enterprise Tools</strong></span>
                  <span className="text-pulse-line">|</span>
                  <span className="text-emerald-700 font-bold">Zero CSV Manual Entry Required</span>
                </div>
              </div>

              {/* Main Cockpit Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e6ebf7]">
                {/* Left Side (5 cols): Interactive Connector Switchboard */}
                <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col gap-3 bg-[#fafbfe]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase font-code text-pulse-muted tracking-wide">
                      Select Turnkey Connector
                    </span>
                    <span className="text-[11px] font-code text-blue-600 font-semibold">
                      Click to inspect data flow
                    </span>
                  </div>

                  {/* Connector 1: WhatsApp */}
                  <button
                    type="button"
                    onClick={() => setActiveConnectorId("whatsapp")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      activeConnectorId === "whatsapp"
                        ? "bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-400/20"
                        : "bg-white/80 border-[#e1e6f4] hover:bg-white hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center text-xl shrink-0">
                        💬
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-pulse-ink">Official WhatsApp Cloud API</span>
                          <span className="text-[10px] font-code font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Meta Verified
                          </span>
                        </div>
                        <p className="text-xs text-pulse-muted mt-1 leading-snug">
                          Brochures, demo reminders &amp; receipts from verified green-tick institutional number.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-code font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded block">
                        28ms ping
                      </span>
                      {activeConnectorId === "whatsapp" && (
                        <span className="text-xs text-emerald-600 font-bold block mt-1.5">● Active</span>
                      )}
                    </div>
                  </button>

                  {/* Connector 2: Tally ERP Prime */}
                  <button
                    type="button"
                    onClick={() => setActiveConnectorId("tally")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      activeConnectorId === "tally"
                        ? "bg-white border-amber-500 shadow-sm ring-2 ring-amber-400/20"
                        : "bg-white/80 border-[#e1e6f4] hover:bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center text-xl shrink-0">
                        📒
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-pulse-ink">Tally ERP Prime &amp; Zoho</span>
                          <span className="text-[10px] font-code font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Auto-Vouchers
                          </span>
                        </div>
                        <p className="text-xs text-pulse-muted mt-1 leading-snug">
                          Seat tokens &amp; tuition installments automatically create numbered vouchers in Tally.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-code font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded block">
                        42ms ping
                      </span>
                      {activeConnectorId === "tally" && (
                        <span className="text-xs text-amber-600 font-bold block mt-1.5">● Active</span>
                      )}
                    </div>
                  </button>

                  {/* Connector 3: Meta & Google Ads */}
                  <button
                    type="button"
                    onClick={() => setActiveConnectorId("meta")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      activeConnectorId === "meta"
                        ? "bg-white border-blue-500 shadow-sm ring-2 ring-blue-400/20"
                        : "bg-white/80 border-[#e1e6f4] hover:bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center text-xl shrink-0">
                        📱
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-pulse-ink">Meta &amp; Google Ads</span>
                          <span className="text-[10px] font-code font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            &lt; 400ms Webhook
                          </span>
                        </div>
                        <p className="text-xs text-pulse-muted mt-1 leading-snug">
                          FB &amp; Instagram leads route directly into counselor rosters within 400ms without CSV exports.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-code font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded block">
                        18ms ping
                      </span>
                      {activeConnectorId === "meta" && (
                        <span className="text-xs text-blue-600 font-bold block mt-1.5">● Active</span>
                      )}
                    </div>
                  </button>

                  {/* Connector 4: Razorpay & UPI Payments */}
                  <button
                    type="button"
                    onClick={() => setActiveConnectorId("payments")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      activeConnectorId === "payments"
                        ? "bg-white border-purple-500 shadow-sm ring-2 ring-purple-400/20"
                        : "bg-white/80 border-[#e1e6f4] hover:bg-white hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-100/80 text-purple-800 flex items-center justify-center text-xl shrink-0">
                        💳
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-pulse-ink">Razorpay &amp; Smart UPI</span>
                          <span className="text-[10px] font-code font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                            Dynamic Links
                          </span>
                        </div>
                        <p className="text-xs text-pulse-muted mt-1 leading-snug">
                          Generates student-tagged payment URLs with automated WhatsApp receipts &amp; T+0 settlement.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-code font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded block">
                        34ms ping
                      </span>
                      {activeConnectorId === "payments" && (
                        <span className="text-xs text-purple-600 font-bold block mt-1.5">● Active</span>
                      )}
                    </div>
                  </button>

                  {/* Connector 5: Telephony CTI */}
                  <button
                    type="button"
                    onClick={() => setActiveConnectorId("telephony")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      activeConnectorId === "telephony"
                        ? "bg-white border-cyan-500 shadow-sm ring-2 ring-cyan-400/20"
                        : "bg-white/80 border-[#e1e6f4] hover:bg-white hover:border-cyan-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-cyan-100/80 text-cyan-800 flex items-center justify-center text-xl shrink-0">
                        📞
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-pulse-ink">Exotel &amp; Cloud PBX</span>
                          <span className="text-[10px] font-code font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">
                            1-Click CTI
                          </span>
                        </div>
                        <p className="text-xs text-pulse-muted mt-1 leading-snug">
                          Calls dial via institutional DID, audio recordings automatically attach to lead timeline.
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-code font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded block">
                        55ms ping
                      </span>
                      {activeConnectorId === "telephony" && (
                        <span className="text-xs text-cyan-600 font-bold block mt-1.5">● Active</span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Right Side (7 cols): Live Data Pipeline & Payload Simulator */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white">
                  {/* Dynamic Header for Selected Connector */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f0f3fa] pb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl shadow-2xs">
                        {activeConnectorId === "whatsapp" && "💬"}
                        {activeConnectorId === "tally" && "📒"}
                        {activeConnectorId === "meta" && "📱"}
                        {activeConnectorId === "payments" && "💳"}
                        {activeConnectorId === "telephony" && "📞"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg text-pulse-ink">
                            {activeConnectorId === "whatsapp" && "Official WhatsApp Cloud API"}
                            {activeConnectorId === "tally" && "Tally ERP Prime Sync Gateway"}
                            {activeConnectorId === "meta" && "Meta & Google Ads Real-Time Hook"}
                            {activeConnectorId === "payments" && "Razorpay & UPI Collect Integration"}
                            {activeConnectorId === "telephony" && "Cloud Telephony & Call Recorder PBX"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-code text-pulse-muted mt-0.5">
                          <span className="text-emerald-600 font-bold">● Two-Way Stream Active</span>
                          <span>•</span>
                          <span>Auth: OAuth 2.0 Bearer Token</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Trigger Button */}
                    <button
                      type="button"
                      onClick={handleTriggerTest}
                      disabled={isTriggeringTest}
                      className="inline-flex items-center gap-2 rounded-xl bg-pulse text-white px-4 py-2 text-xs font-bold font-code hover:bg-pulse-dark transition-all shadow-xs cursor-pointer disabled:opacity-75"
                    >
                      {isTriggeringTest ? (
                        <>
                          <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Simulating Sync...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡</span>
                          <span>Test Webhook Ping</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Feedback Banner if test triggered */}
                  {testSuccessMessage && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3 flex items-center gap-2.5 text-xs font-code text-emerald-900 animate-in fade-in">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <strong>{testSuccessMessage}</strong>
                    </div>
                  )}

                  {/* 3-Stage Visual Pipeline Architecture */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold uppercase font-code text-pulse-muted">
                      Three-Stage Event Execution Pipeline
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Stage 1 */}
                      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase font-code text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                            Stage 1: Inbound
                          </span>
                          <span className="text-xs">📥</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-pulse-ink block">
                            {activeConnectorId === "whatsapp" && "Parent Enquiry"}
                            {activeConnectorId === "tally" && "Seat Token Paid"}
                            {activeConnectorId === "meta" && "Instagram Ad Form"}
                            {activeConnectorId === "payments" && "Fee Milestone Due"}
                            {activeConnectorId === "telephony" && "Counselor Dial Click"}
                          </span>
                          <p className="text-[11px] text-pulse-muted mt-1 leading-snug">
                            {activeConnectorId === "whatsapp" && "Parent enquires via web QR for Grade 11 Science batch."}
                            {activeConnectorId === "tally" && "₹25,000 paid via UPI. Transaction ID verified in 24ms."}
                            {activeConnectorId === "meta" && "Parent submits lead form on Meta/Google ad campaign."}
                            {activeConnectorId === "payments" && "Term-2 fee installment reaches 3-day reminder threshold."}
                            {activeConnectorId === "telephony" && "Counselor clicks dial icon next to student contact."}
                          </p>
                        </div>
                      </div>

                      {/* Stage 2 */}
                      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase font-code text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded">
                            Stage 2: Uptrix Bus
                          </span>
                          <span className="text-xs">⚙️</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-pulse-ink block">
                            {activeConnectorId === "whatsapp" && "Prospectus Mapping"}
                            {activeConnectorId === "tally" && "Tax & Ledger Rule"}
                            {activeConnectorId === "meta" && "Deduplication & Assign"}
                            {activeConnectorId === "payments" && "Smart UPI Link Gen"}
                            {activeConnectorId === "telephony" && "DID Virtual Bridge"}
                          </span>
                          <p className="text-[11px] text-pulse-muted mt-1 leading-snug">
                            {activeConnectorId === "whatsapp" && "De-duplicates phone, attaches brochure PDF & maps counselor."}
                            {activeConnectorId === "tally" && "Maps payment to academic ledger #AY2025 and 18% GST splits."}
                            {activeConnectorId === "meta" && "De-dupes within 18ms and round-robins to active counselor desk."}
                            {activeConnectorId === "payments" && "Builds secure payment URL pre-tagged with student roll number."}
                            {activeConnectorId === "telephony" && "Bridges call through institutional line, encrypts audio stream."}
                          </p>
                        </div>
                      </div>

                      {/* Stage 3 */}
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase font-code text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                            Stage 3: Destination
                          </span>
                          <span className="text-xs">🚀</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-pulse-ink block">
                            {activeConnectorId === "whatsapp" && "Green-Tick WhatsApp"}
                            {activeConnectorId === "tally" && "Tally Voucher Created"}
                            {activeConnectorId === "meta" && "Counselor Phone Rings"}
                            {activeConnectorId === "payments" && "Instant Receipt SMS"}
                            {activeConnectorId === "telephony" && "Timeline Recording"}
                          </span>
                          <p className="text-[11px] text-pulse-muted mt-1 leading-snug">
                            {activeConnectorId === "whatsapp" && "Dispatched from official institutional number with link telemetry."}
                            {activeConnectorId === "tally" && "Numbered Receipt Voucher #UPT-8921 saved with zero manual audit."}
                            {activeConnectorId === "meta" && "Counselor mobile rings in 380ms while parent interest is fresh."}
                            {activeConnectorId === "payments" && "Parent pays via PhonePe/GPay; seat status instantly confirmed."}
                            {activeConnectorId === "telephony" && "Call duration & audio automatically linked to lead profile."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Live Payload Card */}
                  <div className="rounded-2xl border border-[#dfe3f2] bg-[#f8f9fd] p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[11px] font-code">
                      <span className="font-bold text-pulse-ink uppercase flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live Synchronized Payload Preview
                      </span>
                      <span className="text-pulse-subtle">Content-Type: application/json</span>
                    </div>

                    <div className="bg-white rounded-xl border border-[#e2e6f4] p-3 text-[11px] font-code text-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block">event_name:</span>
                        <span className="font-bold text-pulse-ink">
                          {activeConnectorId === "whatsapp" && '"WHATSAPP_OFFICIAL_DISPATCH"'}
                          {activeConnectorId === "tally" && '"TALLY_VOUCHER_AUTO_POST"'}
                          {activeConnectorId === "meta" && '"INSTANT_LEAD_WEBHOOK_INGEST"'}
                          {activeConnectorId === "payments" && '"SMART_PAYMENT_LINK_DELIVERED"'}
                          {activeConnectorId === "telephony" && '"TELEPHONY_CALL_RECORDING_SYNC"'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">sync_latency:</span>
                        <span className="font-bold text-emerald-600">
                          {activeConnectorId === "whatsapp" && '"28ms" (Meta Cloud API)'}
                          {activeConnectorId === "tally" && '"42ms" (ODBC Local Gateway)'}
                          {activeConnectorId === "meta" && '"18ms" (Graph Webhook v19.0)'}
                          {activeConnectorId === "payments" && '"34ms" (Smart Collect v2)'}
                          {activeConnectorId === "telephony" && '"55ms" (WebRTC Dual Stream)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">target_destination:</span>
                        <span className="font-bold text-blue-700">
                          {activeConnectorId === "whatsapp" && '"+91 98450 12890 (Verified WA)"'}
                          {activeConnectorId === "tally" && '"Company: APEX_ACADEMY_AY2025"'}
                          {activeConnectorId === "meta" && '"Counselor Desk #04 (Priya M.)"'}
                          {activeConnectorId === "payments" && '"Roll: UP-2026-081 (Raghu Kumar)"'}
                          {activeConnectorId === "telephony" && '"Lead Dossier: #LD-99218"'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">reconciliation_status:</span>
                        <span className="font-bold text-purple-700">
                          {activeConnectorId === "whatsapp" && '"DELIVERED_READ (Blue Ticks)"'}
                          {activeConnectorId === "tally" && '"POSTED_MATCHED_AUDITED"'}
                          {activeConnectorId === "meta" && '"ROSTER_DIAL_TRIGGERED"'}
                          {activeConnectorId === "payments" && '"AUTO_CONFIRMED_ZERO_DISPUTE"'}
                          {activeConnectorId === "telephony" && '"AUDIO_ATTACHED_06M_40S"'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Footnote Banner */}
                  <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-xs text-blue-950 font-medium">
                      <span className="text-base">💡</span>
                      <span>
                        <strong>Institutional Impact:</strong>{" "}
                        {activeConnectorId === "whatsapp" && "Zero reliance on personal counselor SIMs. Institutional brand identity remains completely protected."}
                        {activeConnectorId === "tally" && "Reconcile fee installments across bank statements and ERP ledgers automatically with zero manual ledger mismatch."}
                        {activeConnectorId === "meta" && "Eliminates CSV spreadsheets. Connecting within 5 minutes results in up to 4.2x higher student admissions."}
                        {activeConnectorId === "payments" && "Automated reminder sequences recover fee dues 68% faster without uncomfortable counselor calling."}
                        {activeConnectorId === "telephony" && "Complete visibility into counseling call conversations and pitch quality with 100% audio auditability."}
                      </span>
                    </div>
                    <span className="text-[11px] font-code font-bold text-blue-700 shrink-0">
                      Zero Developer Code Needed
                    </span>
                  </div>
                </div>
              </div>
            </div>


            {/* Interactive Integrations App Grid with Category Tabs */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-[#f8f9fd] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1e5f2] pb-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Integrations (42+)" },
                    { id: "communication", label: "Communication (WhatsApp, SMS)" },
                    { id: "accounting", label: "Accounting (Tally, Zoho)" },
                    { id: "marketing", label: "Marketing (Meta, Google)" },
                    { id: "payments", label: "Payments (Razorpay, UPI)" },
                    { id: "meetings", label: "Meetings (Zoom, Meet)" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveIntegrationTab(tab.id as any)}
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                        activeIntegrationTab === tab.id
                          ? "bg-pulse text-white shadow-xs"
                          : "border border-[#dfe3f2] bg-white text-pulse-muted hover:border-pulse hover:text-pulse-ink"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <span className="font-code text-xs font-bold text-emerald-700">REST API &amp; Webhooks Included</span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredIntegrations.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-3 rounded-2xl bg-white p-4 border border-[#e2e6f4] shadow-2xs transition-all hover:border-pulse hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{app.icon}</span>
                        <span className="font-bold text-sm text-pulse-ink">{app.name}</span>
                      </div>
                      <span className="rounded-md bg-pulse-soft px-2 py-0.5 text-[10px] font-bold text-pulse uppercase font-code">
                        {app.badge}
                      </span>
                    </div>
                    <p className="text-xs text-pulse-muted leading-relaxed">{app.desc}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#f0f2f8] text-[11px]">
                      <span className="text-emerald-700 font-bold">● Ready to Connect</span>
                      <span className="text-pulse font-bold">Configure →</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Native Live Two-Way Sync Pipeline Visual (No raw screenshots) */}
              <div className="mt-2 flex flex-col gap-4 rounded-2xl border border-[#e1e4f0] bg-white p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0f2f8] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-xs text-pulse-ink font-code uppercase">
                      Live Two-Way Data Pipeline Execution Flow
                    </span>
                  </div>
                  <span className="font-code text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Zero Developer Code Required
                  </span>
                </div>

                {/* Step by Step Real-Time Sync Flow */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 pt-1 text-xs">
                  <div className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pulse-ink font-code text-[10px]">STEP 01</span>
                      <span className="text-[10px] font-code text-pulse-subtle">0.4s</span>
                    </div>
                    <span className="font-bold text-pulse-ink">Meta Lead Form</span>
                    <p className="text-[11px] text-pulse-muted leading-tight">Student inquires on Instagram/FB ad</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-code mt-auto">✓ Ingested</span>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pulse-ink font-code text-[10px]">STEP 02</span>
                      <span className="text-[10px] font-code text-pulse-subtle">0.8s</span>
                    </div>
                    <span className="font-bold text-pulse-ink">Uptrix Router</span>
                    <p className="text-[11px] text-pulse-muted leading-tight">Assigned to counselor based on course</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-code mt-auto">✓ Allocated</span>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pulse-ink font-code text-[10px]">STEP 03</span>
                      <span className="text-[10px] font-code text-pulse-subtle">1.2s</span>
                    </div>
                    <span className="font-bold text-pulse-ink">WhatsApp Cloud</span>
                    <p className="text-[11px] text-pulse-muted leading-tight">Course brochure PDF sent to parent</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-code mt-auto">✓ Delivered</span>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pulse-ink font-code text-[10px]">STEP 04</span>
                      <span className="text-[10px] font-code text-pulse-subtle">Instant</span>
                    </div>
                    <span className="font-bold text-pulse-ink">Razorpay UPI</span>
                    <p className="text-[11px] text-pulse-muted leading-tight">Parent pays seat token advance fee</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-code mt-auto">✓ Verified</span>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-3 border border-[#e2e6f4]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pulse-ink font-code text-[10px]">STEP 05</span>
                      <span className="text-[10px] font-code text-pulse-subtle">2.1s</span>
                    </div>
                    <span className="font-bold text-pulse-ink">Tally ERP Prime</span>
                    <p className="text-[11px] text-pulse-muted leading-tight">Accounts ledger &amp; GST receipt synced</p>
                    <span className="text-[10px] text-emerald-700 font-bold font-code mt-auto">✓ Reconciled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: TODAY'S TEAM ACTIVITY & TELE-CALLING TICKER
            Distinct Design: Live Stream Feed + Real Telephony Talk-Time Progress
        ========================================================================== */}
        <section
          id="sec-teamactivity-feature"
          className="border-b border-pulse-line bg-gradient-to-b from-white via-[#fbfcfe] to-[#f8f9fd] py-[clamp(68px,8.5vw,116px)]"
        >
          <div className={`${container} flex flex-col gap-12`}>
            {/* Executive Split Header */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Heading & Context */}
              <div className="flex flex-col gap-3.5 lg:col-span-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 uppercase font-code">
                  <span>⚡</span>
                  <span>REAL-TIME TELEPHONY &amp; COUNSELOR PERFORMANCE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] font-black tracking-tight text-pulse-ink">
                  Live Calling Stream &amp; Enforced 3.5-Hour Parent Talk-Time Quota
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-pulse-muted">
                  Eliminate inflated Excel call logs. Uptrix streams every dialed call, connected conversation, and scheduled trial class directly from cloud telephony CTI, giving center managers complete audio audit visibility.
                </p>
              </div>

              {/* Right Column: Floor Call Volume Gauge Widget */}
              <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-white p-5 shadow-xs lg:col-span-4">
                <div className="flex items-center justify-between border-b border-[#f0f2f8] pb-3">
                  <span className="text-xs font-bold uppercase font-code text-pulse-ink">Calling Floor Active</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 font-code border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    94.2% Connection Rate
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e2e6f4]">
                    <span className="text-[10px] text-pulse-subtle font-code block">Calls Today</span>
                    <span className="text-base font-black text-pulse-ink font-code mt-0.5 block">412 Dials</span>
                  </div>
                  <div className="rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e2e6f4]">
                    <span className="text-[10px] text-pulse-subtle font-code block">Talk Time</span>
                    <span className="text-base font-black text-emerald-700 font-code mt-0.5 block">41.6 Hours</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-pulse-subtle font-code pt-1">
                  <span>● Exotel &amp; Twilio CTI Synced</span>
                  <span className="text-pulse font-bold">Audio Auto-Recorded</span>
                </div>
              </div>
            </div>

            {/* 3-Pillar Telephony Integrity Engine */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Pillar 1: Verified CTI Records */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/70 to-white p-6 shadow-2xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-amber-800">
                      <span>📞</span> CTI Dialing Truth
                    </span>
                    <span className="rounded bg-amber-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-amber-700">
                      Zero Fake Logs
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-amber-950">Automated Call Duration Logging</h3>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Counselors cannot mark 50 calls in Excel when they only spoke to 8 parents. Telephony integration captures exact call start, end, duration, and disposition automatically.
                  </p>
                </div>
                <div className="border-t border-amber-200/80 pt-3 text-xs">
                  <span className="font-bold text-amber-900 block font-code">100% Verified Telephony</span>
                  <span className="text-[11px] text-amber-700">Zero manual spreadsheet fudging</span>
                </div>
              </div>

              {/* Pillar 2: Enforced 3.5h Quota */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white p-6 shadow-2xs">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-emerald-800">
                      <span>⏱️</span> Enforced 3.5h Quota
                    </span>
                    <span className="rounded bg-emerald-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-emerald-700">
                      Daily Floor Standard
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-950">Active Parent Conversation Benchmarks</h3>
                  <p className="text-xs text-emerald-900/90 leading-relaxed">
                    System tracks cumulative connected talk-time, not ringing seconds. Center Directors immediately spot counselors falling behind on daily enrollment counseling targets.
                  </p>
                </div>
                <div className="border-t border-emerald-200/80 pt-3 text-xs">
                  <span className="font-bold text-emerald-900 block font-code">Live Floor Leaderboard</span>
                  <span className="text-[11px] text-emerald-700">Transparent counselor productivity</span>
                </div>
              </div>

              {/* Pillar 3: Audio Audits & Coaching */}
              <div className="flex flex-col justify-between gap-4 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-white p-6 shadow-2xs sm:col-span-2 lg:col-span-1">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase font-code text-purple-800">
                      <span>🎧</span> Audio Objection Coaching
                    </span>
                    <span className="rounded bg-purple-100/80 px-2 py-0.5 font-code text-[10px] font-bold text-purple-700">
                      Quality Audit
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-purple-950">1-Click Call Playback for Managers</h3>
                  <p className="text-xs text-purple-900/90 leading-relaxed">
                    Center heads can listen to call recordings right from the lead timeline to coach counselors on handling scholarship objections and closing campus visits.
                  </p>
                </div>
                <div className="border-t border-purple-200/80 pt-3 text-xs">
                  <span className="font-bold text-purple-900 block font-code">1-Click In-App Audio</span>
                  <span className="text-[11px] text-purple-700">Continuous sales objection training</span>
                </div>
              </div>
            </div>

            {/* Tool Screen Showcase */}
            <div className="rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#e1e5f2] pb-4">
                <span className="font-bold text-pulse-ink text-sm">Today's Team Activity Stream</span>
                <span className="font-code text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                  ● 412 Calls Dialed Today • 41.6 hrs Talk Time
                </span>
              </div>

              {/* Native Bespoke Live Telephony Stream & Counselor Talk-Time Console (No raw screenshots) */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left (7 cols): Live Feed of Counselor Parent Calls */}
                <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e6f4] bg-[#f8f9fd] p-4 lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-[#e5e9f4] pb-2">
                    <span className="font-bold text-xs text-pulse-ink font-code uppercase">
                      Live Telephony Activity Feed
                    </span>
                    <span className="text-[10px] font-code text-pulse-subtle">Click to preview audio</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {[
                      {
                        id: "call-1",
                        parent: "Ananya Sharma (Parent: Dr. Sharma)",
                        course: "NEET Medical Fast-Track 2026",
                        counselor: "Priya Sharma",
                        duration: "04:32 min",
                        timeAgo: "2 mins ago",
                        disposition: "Demo Class Scheduled (Sat 11 AM)",
                        dispositionClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        id: "call-2",
                        parent: "Rahul Verma (Student: JEE Dropper)",
                        course: "JEE Advanced Target Batch",
                        counselor: "Suresh Babu",
                        duration: "06:15 min",
                        timeAgo: "8 mins ago",
                        disposition: "Fee Installment Discussed",
                        dispositionClass: "bg-blue-50 text-blue-700 border-blue-200",
                      },
                      {
                        id: "call-3",
                        parent: "Sanya Gupta (Parent: Rajesh Gupta)",
                        course: "Class 10 Foundation Olympiad",
                        counselor: "Kavitha R.",
                        duration: "03:48 min",
                        timeAgo: "14 mins ago",
                        disposition: "Brochure Re-sent on WhatsApp",
                        dispositionClass: "bg-purple-50 text-purple-700 border-purple-200",
                      },
                      {
                        id: "call-4",
                        parent: "Dev Patel (Student: Grade 11 CBSE)",
                        course: "Integrated Science + Coaching",
                        counselor: "Madhuri S.",
                        duration: "05:20 min",
                        timeAgo: "21 mins ago",
                        disposition: "Campus Visit Booked for Sunday",
                        dispositionClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                    ].map((call) => {
                      const isPlaying = playingAudioId === call.id;
                      return (
                        <div
                          key={call.id}
                          className="flex flex-col gap-2 rounded-xl bg-white p-3 border border-[#e2e6f4] shadow-2xs hover:border-pulse/40 transition"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="font-bold text-xs text-pulse-ink">{call.parent}</span>
                            <span className="text-[10px] font-code text-pulse-subtle">{call.timeAgo}</span>
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <div className="text-pulse-muted">
                              <span className="font-medium text-pulse-ink">{call.course}</span> •{" "}
                              <span className="font-code">Counselor: {call.counselor}</span>
                            </div>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold font-code ${call.dispositionClass}`}
                            >
                              {call.disposition}
                            </span>
                          </div>
                          {/* Audio Waveform & Player Button */}
                          <div className="mt-1 flex items-center justify-between border-t border-[#f0f2f8] pt-2 text-[11px]">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPlayingAudioId(isPlaying ? null : call.id)}
                                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-bold font-code transition cursor-pointer ${
                                  isPlaying
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "bg-pulse-soft text-pulse border border-pulse/20 hover:bg-pulse hover:text-white"
                                }`}
                              >
                                <span>{isPlaying ? "⏸ Pause" : "▶ Listen"}</span>
                                <span>({call.duration})</span>
                              </button>
                              {/* Visual waveform bars */}
                              <div className="flex items-center gap-0.5 h-3">
                                {[40, 70, 90, 50, 80, 100, 60, 45, 85, 30].map((h, i) => (
                                  <span
                                    key={i}
                                    style={{ height: `${h}%` }}
                                    className={`w-0.5 rounded-full ${
                                      isPlaying ? "bg-emerald-500 animate-pulse" : "bg-[#c5cbe0]"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-pulse-subtle font-code">
                              {isPlaying ? "● Playing Call Audio" : "Exotel & Twilio Recorded"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right (5 cols): Counselor Talk-Time Quota Leaderboard (Enforced 3.5 hrs) */}
                <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e6f4] bg-white p-4 lg:col-span-5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#f0f2f8] pb-2">
                    <div>
                      <span className="font-bold text-xs text-pulse-ink font-code uppercase block">
                        Counselor Talk Time Leaderboard
                      </span>
                      <span className="text-[10px] text-pulse-subtle font-code">Enforced 3.5h Daily Target</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-code">
                      Floor Active
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 pt-1">
                    {[
                      {
                        name: "Kavitha R.",
                        role: "Sales Lead",
                        talkTime: "4h 12m",
                        targetPct: 120,
                        calls: "48 dials",
                        demos: "6 Demos",
                      },
                      {
                        name: "Suresh Babu",
                        role: "Senior Counselor",
                        talkTime: "3h 45m",
                        targetPct: 107,
                        calls: "42 dials",
                        demos: "5 Demos",
                      },
                      {
                        name: "Priya Sharma",
                        role: "Admissions Counselor",
                        talkTime: "3h 30m",
                        targetPct: 100,
                        calls: "39 dials",
                        demos: "4 Demos",
                      },
                      {
                        name: "Madhuri S.",
                        role: "Academic Counselor",
                        talkTime: "3h 15m",
                        targetPct: 93,
                        calls: "35 dials",
                        demos: "3 Demos",
                      },
                      {
                        name: "Ramesh K.",
                        role: "Tele-caller",
                        talkTime: "2h 50m",
                        targetPct: 81,
                        calls: "31 dials",
                        demos: "2 Demos",
                      },
                    ].map((rep, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 rounded-xl bg-[#f8f9fd] p-2.5 border border-[#e5e9f4]">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-pulse-ink">{rep.name}</span>
                            <span className="text-[10px] text-pulse-subtle font-code">({rep.role})</span>
                          </div>
                          <span className="font-code font-bold text-emerald-700 text-[11px]">{rep.talkTime}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full rounded-full bg-[#e1e4f0] overflow-hidden">
                          <div
                            style={{ width: `${Math.min(rep.targetPct, 100)}%` }}
                            className={`h-full rounded-full ${
                              rep.targetPct >= 100 ? "bg-emerald-500" : "bg-pulse"
                            }`}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-code text-pulse-subtle">
                          <span>{rep.calls}</span>
                          <span className="text-pulse-ink font-bold">{rep.demos} Scheduled</span>
                          <span className={rep.targetPct >= 100 ? "text-emerald-700 font-bold" : "text-pulse font-bold"}>
                            {rep.targetPct}% of Quota
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Operational Verification Matrix */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2 text-xs">
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1">
                  <span className="font-bold text-pulse-ink">Real-Time Lead Updates</span>
                  <p className="text-pulse-muted">Every parent touchpoint streams live with counselor name, duration, and disposition.</p>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1">
                  <span className="font-bold text-pulse-ink">Audio Call Recordings</span>
                  <p className="text-pulse-muted">1-click audio playback allows managers to train counselors on objection handling.</p>
                </div>
                <div className="rounded-2xl bg-[#f8f9fd] p-4 border border-[#e2e6f4] flex flex-col gap-1">
                  <span className="font-bold text-pulse-ink">Demo Class Conversion</span>
                  <p className="text-pulse-muted">Direct correlation between counselor talk-time hours and scheduled campus demo lectures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: INTERACTIVE ADMISSIONS ROI CALCULATOR
            Distinct Design: Dynamic Slider Revenue Recovery Engine
        ========================================================================== */}
        <section
          id="calculator"
          className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
        >
          <div className={`${container} flex flex-col gap-10`}>
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[760px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 font-code">
                💰 ADMISSION ROI CALCULATOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-pulse-ink tracking-tight">
                Calculate How Much Recovered Fee Revenue Uptrix Brings to Your Campus
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                See the measurable impact of reducing response time from hours to seconds and eliminating lost follow-ups.
              </p>
            </div>

            {/* Interactive Calculator Component */}
            <div className="grid grid-cols-1 gap-10 rounded-3xl border border-[#dfe3f2] bg-[#f8f9fd] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(20,28,80,0.08)] lg:grid-cols-12 lg:items-center">
              {/* Sliders Column */}
              <div className="flex flex-col gap-8 lg:col-span-7">
                {/* Slider 1: Enquiries */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="enq-slider" className="text-base font-bold text-pulse-ink">
                      Monthly Admissions Inquiries:
                    </label>
                    <span className="font-code text-xl font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      {inquiries.toLocaleString()} leads
                    </span>
                  </div>
                  <input
                    id="enq-slider"
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={inquiries}
                    onChange={(e) => setInquiries(Number(e.target.value))}
                    className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-[#e2e5f2] accent-[#22b07d]"
                  />
                  <div className="flex justify-between text-xs text-pulse-subtle font-code">
                    <span>100 leads</span>
                    <span>2,500</span>
                    <span>5,000+ leads</span>
                  </div>
                </div>

                {/* Slider 2: Average Fee */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="fee-slider" className="text-base font-bold text-pulse-ink">
                      Average Course / Academic Fee:
                    </label>
                    <span className="font-code text-xl font-extrabold text-pulse bg-pulse-soft px-3 py-1 rounded-lg border border-pulse/20">
                      {formatINR(courseFee)}
                    </span>
                  </div>
                  <input
                    id="fee-slider"
                    type="range"
                    min="15000"
                    max="300000"
                    step="5000"
                    value={courseFee}
                    onChange={(e) => setCourseFee(Number(e.target.value))}
                    className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-[#e2e5f2] accent-[#3b3fd4]"
                  />
                  <div className="flex justify-between text-xs text-pulse-subtle font-code">
                    <span>₹15,000</span>
                    <span>₹1,50,000</span>
                    <span>₹3,00,000</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 text-xs text-pulse-muted border border-[#e2e6f4]">
                  💡 <strong>Calculation basis:</strong> Moving from manual Excel tracking (avg. 8% inquiry conversion) to automated WhatsApp + prompt counselor assignment (avg. 12.5% conversion).
                </div>
              </div>

              {/* Calculated Output Card */}
              <div className="flex flex-col gap-6 rounded-2xl border border-emerald-300 bg-gradient-to-b from-emerald-50/80 to-[#f5fbf8] p-6 sm:p-8 lg:col-span-5 shadow-xs">
                <div className="flex flex-col gap-1 border-b border-emerald-200/80 pb-5">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-code">
                    Projected Extra Admissions
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-pulse-ink">
                    +{extraAdmissions} <span className="text-2xl text-emerald-700 font-semibold">students</span>
                  </span>
                  <span className="text-xs text-pulse-subtle">Every single month</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-emerald-200/80 pb-5">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-code">
                    Estimated Recovered Fee Revenue
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700">
                    {formatINR(extraRevenue)}
                  </span>
                  <span className="text-xs text-pulse-subtle">From previously leaked enquiries</span>
                </div>

                <Link
                  href="/crm#demo"
                  className={`${btnPrimary} text-center shadow-md shadow-pulse/25 text-base font-bold`}
                >
                  Book Demo &amp; Unlock This ROI →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: INSTITUTIONAL CASE STUDIES
            Distinct Design: Interactive Tabbed Enterprise Impact Dossier
        ========================================================================== */}
        <section
          id="case-studies"
          className="border-b border-pulse-line bg-gradient-to-b from-[#f8fafd] via-white to-[#f5f8fd] py-[clamp(64px,8vw,112px)]"
        >
          <div className={`${container} flex flex-col gap-10`}>
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[820px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 font-code">
                📊 VERIFIED ADMISSION IMPACT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-pulse-ink">
                Measurable Institutional Turnarounds &amp; Case Studies
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                See how top coaching institutes, CBSE schools, and engineering colleges achieved 2.4x enrollment growth while eliminating fee leakages.
              </p>
            </div>

            {/* Case Study Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { id: "apex", name: "Apex Science & IIT-JEE Academy", badge: "Kota & Jaipur • 6 Campuses", icon: "⚛️" },
                { id: "oakridge", name: "Oakridge Global World School", badge: "Pune • CBSE K-12", icon: "🏫" },
                { id: "vanguard", name: "Vanguard Institute of Technology", badge: "Bengaluru • Higher Ed", icon: "🏛️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCaseStudy(tab.id as "apex" | "oakridge" | "vanguard")}
                  className={`flex items-center gap-2.5 rounded-2xl border px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCaseStudy === tab.id
                      ? "border-pulse bg-white text-pulse shadow-sm ring-2 ring-pulse/15"
                      : "border-[#dfe3f2] bg-white/70 text-pulse-muted hover:bg-white hover:border-pulse/40"
                  }`}
                >
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  <div className="text-left">
                    <span className="block text-pulse-ink leading-tight">{tab.name}</span>
                    <span className="text-[11px] font-code text-pulse-subtle font-normal">{tab.badge}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Case Study Interactive Dossier */}
            <div className="rounded-3xl border border-[#d9e1f2] bg-white p-6 sm:p-9 shadow-sm flex flex-col gap-8">
              {/* Top Banner: Institute Profile & Segment */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eef2fa] pb-6">
                <div className="flex items-center gap-3.5">
                  <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-3xl shadow-2xs">
                    {selectedCaseStudy === "apex" && "⚛️"}
                    {selectedCaseStudy === "oakridge" && "🏫"}
                    {selectedCaseStudy === "vanguard" && "🏛️"}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-pulse-ink">
                        {selectedCaseStudy === "apex" && "Apex Science & IIT-JEE Academy"}
                        {selectedCaseStudy === "oakridge" && "Oakridge Global World School"}
                        {selectedCaseStudy === "vanguard" && "Vanguard Institute of Technology"}
                      </h3>
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 font-code">
                        ✓ Verified Deployment
                      </span>
                    </div>
                    <span className="text-xs text-pulse-subtle block font-code mt-0.5">
                      {selectedCaseStudy === "apex" && "6 Campuses in Kota & Jaipur • 8,400+ Enrolled Students • IIT-JEE & NEET Focus"}
                      {selectedCaseStudy === "oakridge" && "3 Campuses in Pune & Navi Mumbai • 3,200+ Students (K-12) • CBSE & Cambridge"}
                      {selectedCaseStudy === "vanguard" && "Bengaluru Campus • 5,600+ Students • 14 Undergrad & Postgrad Engineering Streams"}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#f8f9fd] border border-[#e2e6f4] px-4 py-2 text-right">
                  <span className="text-[10px] font-code text-pulse-subtle block uppercase">Primary Outcome</span>
                  <span className="text-sm font-bold text-emerald-700">
                    {selectedCaseStudy === "apex" && "+42% Admission Intake in 1st Cycle"}
                    {selectedCaseStudy === "oakridge" && "₹38.5 Lakh Recovered Overdue Fees"}
                    {selectedCaseStudy === "vanguard" && "100% Seats Filled 3 Weeks Early"}
                  </span>
                </div>
              </div>

              {/* 4 Quantified Transformation Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedCaseStudy === "apex" && (
                  <>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-indigo-900 font-code font-bold uppercase">Lead Response Time</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">38 Sec</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 4.5 Hours</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 font-code">⚡ 99.8% Faster Parent Contact</span>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-emerald-900 font-code font-bold uppercase">Overdue Fee Recovery</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">₹38.5 L</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 18.2% Leaked</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 font-code">✓ 98.9% Overdue Collection</span>
                    </div>
                    <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-teal-900 font-code font-bold uppercase">Counselor Desk Presence</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">100%</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: Unverified Register</span>
                      </div>
                      <span className="text-[11px] font-bold text-teal-700 font-code">📍 50m GPS Geofence Audited</span>
                    </div>
                    <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-purple-900 font-code font-bold uppercase">Annual Enrollment Intake</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">4,430</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 3,120 Students</span>
                      </div>
                      <span className="text-[11px] font-bold text-purple-700 font-code">🚀 +42% Net Student Intake</span>
                    </div>
                  </>
                )}

                {selectedCaseStudy === "oakridge" && (
                  <>
                    <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-blue-900 font-code font-bold uppercase">Admission Desk Queue</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">3 Mins</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 45 Min Wait</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 font-code">⚡ 93% Queue Reduction</span>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-emerald-900 font-code font-bold uppercase">Digital Seat Token Trace</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">100%</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: Paper Slips</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 font-code">✓ Instant UPI WhatsApp Receipt</span>
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-amber-900 font-code font-bold uppercase">Tally Reconciliation Time</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">0 Mins</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 15 Days Month-End</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 font-code">📒 Auto-Voucher Posted</span>
                    </div>
                    <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-purple-900 font-code font-bold uppercase">Staff Department Hours</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">Saved 32h</span>
                        <span className="text-xs text-pulse-subtle line-through block">Per week across 3 campuses</span>
                      </div>
                      <span className="text-[11px] font-bold text-purple-700 font-code">⏱️ 4.5x Administrative Speed</span>
                    </div>
                  </>
                )}

                {selectedCaseStudy === "vanguard" && (
                  <>
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-cyan-900 font-code font-bold uppercase">Counselor Talk-Time</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">3.6 Hrs</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 45 Mins/Day</span>
                      </div>
                      <span className="text-[11px] font-bold text-cyan-700 font-code">📞 4.8x Higher Active Effort</span>
                    </div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-emerald-900 font-code font-bold uppercase">2nd Sem Tuition Dues</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">₹49 Lakh</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: ₹54L Delayed</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 font-code">✓ 97.2% On-Time Clearance</span>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-indigo-900 font-code font-bold uppercase">Campus Visit Footfall</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">820+</span>
                        <span className="text-xs text-pulse-subtle line-through block">Previously: 310 Visits</span>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-700 font-code">🏫 +164% Campus Tours Booked</span>
                    </div>
                    <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 flex flex-col justify-between gap-2">
                      <span className="text-xs text-purple-900 font-code font-bold uppercase">Seats Occupancy Speed</span>
                      <div>
                        <span className="text-2xl sm:text-3xl font-black text-pulse-ink">3 Wks</span>
                        <span className="text-xs text-pulse-subtle block">Ahead of State Deadline</span>
                      </div>
                      <span className="text-[11px] font-bold text-purple-700 font-code">🎯 100% Batch Quota Filled</span>
                    </div>
                  </>
                )}
              </div>

              {/* Challenge vs Solution Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-rose-200/90 bg-rose-50/40 p-5 sm:p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase font-code">
                    <span>⚠️</span> The Institutional Challenge (Before Uptrix)
                  </div>
                  <p className="text-xs sm:text-sm text-rose-950/90 leading-relaxed">
                    {selectedCaseStudy === "apex" &&
                      "High ad spend on Meta and Google was yielding 4,000+ monthly leads, but counselors were overwhelmed copying numbers into personal SIMs. Leads sat unattended for 18 to 24 hours. Parents received unofficial messages from personal numbers with no brochure tracking, and second-installment tuition fees suffered a 18% default rate."}
                    {selectedCaseStudy === "oakridge" &&
                      "During the February peak admissions season, hundreds of walk-in parents visiting the Pune and Mumbai campuses created 45-minute queues at reception. Fee accountants spent late nights reconciling bank NEFT transfers against student rosters, leading to heated disputes over uncredited seat reservation tokens."}
                    {selectedCaseStudy === "vanguard" &&
                      "Managing admissions across 14 degree streams (B.Tech, MBA, MCA) with disparate counselor desks led to uneven inquiry distribution. Counselors reported hundreds of calls in spreadsheets, but enrollment closures stagnated because talk-time was unverified and second-term hostel fees were consistently overdue."}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-5 sm:p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase font-code">
                    <span>✅</span> The Uptrix Unified Solution
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed">
                    {selectedCaseStudy === "apex" &&
                      "Deployed turnkey Meta Graph API webhooks with sub-400ms routing to active counselor desks. Official green-tick WhatsApp Cloud API dispatches interactive PDF brochures on autopilot. Paid seat tokens automatically create numbered Receipt Vouchers in Tally Prime, completely eliminating manual accounting disputes."}
                    {selectedCaseStudy === "oakridge" &&
                      "Replaced manual paper tokens with Uptrix digital seat reservation links. Parents scan a campus QR code to register, choose their curriculum stream, and pay token fees via branded UPI links. Receipts post directly into Tally Prime with zero manual reconciliation required."}
                    {selectedCaseStudy === "vanguard" &&
                      "Configured course-specific round-robin routing and cloud telephony CTI with enforced 3.5-hour call quotas. Deans monitor real-time talk-time hours and listen to audio recordings right from student lead dossiers. Automated WhatsApp installment links recover second-semester fees on schedule."}
                  </p>
                </div>
              </div>

              {/* Executive Director Quote Card */}
              <div className="rounded-2xl border border-[#dfe3f2] bg-[#f8fafd] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <div className="text-amber-500 text-sm">★★★★★</div>
                  <blockquote className="text-sm sm:text-base font-bold text-pulse-ink italic leading-snug">
                    {selectedCaseStudy === "apex" &&
                      "“Before Uptrix, our counselors called leads 24 hours later when parent interest had cooled down. With sub-400ms lead routing and official WhatsApp brochures, our conversion jumped by 42% in a single cycle.”"}
                    {selectedCaseStudy === "oakridge" &&
                      "“Uptrix eliminated all paper token chaos. Parents pay their seat confirmation fee via dynamic WhatsApp links, and Tally automatically generates their official school receipt with zero discrepancies.”"}
                    {selectedCaseStudy === "vanguard" &&
                      "“Telephony tracking in Uptrix was an eye-opener. Counselors who completed 3+ hours of counseling had 3.8x higher seat closures. Our board reviews live admissions every morning on the Dean Command Deck.”"}
                  </blockquote>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-xs text-pulse-ink">
                      {selectedCaseStudy === "apex" && "Er. Arvind Singhal"}
                      {selectedCaseStudy === "oakridge" && "Mrs. Meenakshi Sundaram"}
                      {selectedCaseStudy === "vanguard" && "Prof. Dr. Rajesh Kulkarni"}
                    </span>
                    <span className="text-xs text-pulse-subtle">•</span>
                    <span className="text-xs text-pulse-muted">
                      {selectedCaseStudy === "apex" && "Managing Director & Co-Founder"}
                      {selectedCaseStudy === "oakridge" && "Director of Admissions & Operations"}
                      {selectedCaseStudy === "vanguard" && "Dean of Academic Admissions"}
                    </span>
                  </div>
                </div>

                <Link
                  href="/crm#demo"
                  className="rounded-xl border border-pulse bg-white px-5 py-2.5 text-xs font-bold text-pulse hover:bg-pulse hover:text-white transition shadow-2xs whitespace-nowrap shrink-0"
                >
                  Read Full Case Study Dossier →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: VIDEO TESTIMONIALS
            Distinct Design: Interactive Media Showcase Deck with Live Player Simulator
        ========================================================================== */}
        {/* =========================================================================
            SECTION 8: VIDEO TESTIMONIALS
            Dynamic Experience:
            - Default: 3 Cards Grid (matching user reference Image 1) with dark navy thumbnails,
              center circular play button, bottom-left badge, and "Video coming soon"
            - On Play Click: Expands into full-featured interactive Player Deck (matching user reference Image 2)
              with active interview playback simulation, transcript highlight, metric card, and switchers
        ========================================================================== */}
        <section
          id="video-testimonials"
          className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)] transition-all"
        >
          <div className={`${container} flex flex-col gap-10`}>
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[800px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-800 font-code">
                🎬 FOUNDER &amp; DIRECTOR INTERVIEWS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-pulse-ink">
                Hear Directly from Educational Institute Leaders
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                Watch center heads, school directors, and coaching founders explain how Uptrix transformed their admissions desks.
              </p>
            </div>

            {/* ================= 3 CARDS VIEW (Image 1) ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "video-1",
                  badge: "EduTech CRM",
                  label: "Video coming soon",
                  speaker: "Dr. Arvind Singhal • Apex Academies",
                },
                {
                  id: "video-2",
                  badge: "Real Estate CRM",
                  label: "Video coming soon",
                  speaker: "Mrs. Meenakshi Sundaram • Oakridge School",
                },
                {
                  id: "video-3",
                  badge: "EduTech CRM",
                  label: "Video coming soon",
                  speaker: "Vikram Joshi • Pioneer Medical",
                },
              ].map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setActiveVideoId(card.id);
                    setIsVideoPlaying(true);
                    setShowVideoPopup(true);
                  }}
                  className="group cursor-pointer rounded-3xl border border-[#dfe3f2] p-4 bg-white shadow-xs hover:shadow-xl hover:border-pulse/40 transition-all duration-300 flex flex-col"
                >
                  {/* Dark Rounded Video Box with ambient radial glow matching Image 1 */}
                  <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-[#0a0e27] via-[#0f143c] to-[#1a1f58] overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
                    {/* Ambient radial violet/indigo glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(99,102,241,0.38),transparent_62%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />

                    {/* Central circular play button with frosted glass backdrop */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoId(card.id);
                        setIsVideoPlaying(true);
                        setShowVideoPopup(true);
                      }}
                      className="relative z-10 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-pulse group-hover:border-pulse group-hover:shadow-pulse/40 transition-all duration-300 cursor-pointer"
                      aria-label={`Play ${card.badge} interview video in popup`}
                    >
                      <span className="text-white text-base ml-0.5">▶</span>
                    </button>

                    {/* Bottom-left pill badge */}
                    <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-bold text-white font-code">
                      {card.badge}
                    </div>
                  </div>

                  {/* Text below thumbnail */}
                  <div className="mt-3.5 px-1 flex flex-col gap-0.5">
                    <p className="text-sm font-bold text-[#515978] group-hover:text-pulse transition-colors">
                      {card.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            BIG VIDEO SECTION POPUP MODAL (Image 2)
            Opens as a high-fidelity popup overlay when the play button is clicked
        ========================================================================== */}
        {showVideoPopup && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto animate-fadeIn"
            onClick={() => setShowVideoPopup(false)}
          >
            <div
              className="relative w-full max-w-5xl rounded-3xl border border-[#dfe3f2] bg-white shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header with Close Button */}
              <div className="flex items-start justify-between gap-4 border-b border-[#edf1f8] pb-4">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-purple-800 font-code">
                    🎬 FOUNDER &amp; DIRECTOR INTERVIEWS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-pulse-ink">
                    Hear Directly from Educational Institute Leaders
                  </h3>
                  <p className="text-xs sm:text-sm text-pulse-muted">
                    Watch center heads, school directors, and coaching founders explain how Uptrix transformed their admissions desks.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowVideoPopup(false)}
                  className="h-10 w-10 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 text-pulse-ink flex items-center justify-center font-bold text-lg transition cursor-pointer shadow-xs"
                  aria-label="Close video popup"
                >
                  ✕
                </button>
              </div>

              {/* Big Video Showcase Deck (Image 2) */}
              <div className="rounded-3xl border border-[#d9e1f2] bg-gradient-to-b from-[#f8fafd] to-white p-4 sm:p-7 shadow-xs flex flex-col gap-6">
                {/* Player Frame */}
                <div className="relative rounded-2xl border border-[#dfe3f2] bg-slate-900 overflow-hidden aspect-video sm:aspect-[21/9] flex items-center justify-center group shadow-md">
                  {/* Visual Video Backdrop Texture */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,63,212,0.25),transparent_70%)]" />

                  {/* Top Status Bar Inside Video */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-code z-10">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        {activeVideoId === "video-1" && "Dr. Arvind Singhal • Apex Academies"}
                        {activeVideoId === "video-2" && "Mrs. Meenakshi Sundaram • Oakridge School"}
                        {activeVideoId === "video-3" && "Vikram Joshi • Pioneer Medical"}
                        {activeVideoId === "video-4" && "Prof. Rajesh Kulkarni • Vanguard Engineering"}
                      </span>
                    </div>
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px]">
                      1080p Institutional Interview
                    </span>
                  </div>

                  {/* Center Content / Play Controller */}
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6 max-w-xl">
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-pulse text-white flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-pulse/40 hover:scale-105 transition cursor-pointer"
                      aria-label="Play video interview"
                    >
                      {isVideoPlaying ? "⏸" : "▶"}
                    </button>
                    <span className="text-white font-bold text-sm sm:text-base drop-shadow">
                      {isVideoPlaying ? "Simulating Interview Playback..." : "Click to Watch Full 2-Minute Interview"}
                    </span>
                    {isVideoPlaying && (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-4 w-1 bg-emerald-400 animate-pulse rounded" />
                        <span className="h-6 w-1 bg-emerald-400 animate-pulse delay-75 rounded" />
                        <span className="h-8 w-1 bg-emerald-400 animate-pulse delay-150 rounded" />
                        <span className="h-5 w-1 bg-emerald-400 animate-pulse delay-100 rounded" />
                        <span className="h-3 w-1 bg-emerald-400 animate-pulse rounded" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Timeline Bar Inside Video */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70 font-code z-10">
                    <span>01:14 / {activeVideoId === "video-1" ? "02:48" : activeVideoId === "video-2" ? "01:54" : activeVideoId === "video-3" ? "02:15" : "02:30"}</span>
                    <div className="h-1.5 flex-1 mx-4 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-pulse w-2/5 rounded-full" />
                    </div>
                    <span className="text-emerald-400 font-bold">● High Fidelity Audio</span>
                  </div>
                </div>

                {/* Interview Highlight Dossier Below Player */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-pulse/10 text-pulse font-code font-bold text-[10px] px-2 py-0.5">
                        Key Transcript Highlight
                      </span>
                      <span className="text-xs text-pulse-subtle">•</span>
                      <span className="text-xs text-emerald-700 font-bold font-code">
                        {activeVideoId === "video-1" && "+42% Admission Growth in Year 1"}
                        {activeVideoId === "video-2" && "₹38 Lakh Leaked Fees Recovered"}
                        {activeVideoId === "video-3" && "3.4x Higher Counseling Connection Rate"}
                        {activeVideoId === "video-4" && "100% Seats Filled 3 Weeks Early"}
                      </span>
                    </div>
                    <blockquote className="text-sm sm:text-base font-bold text-pulse-ink leading-relaxed">
                      {activeVideoId === "video-1" &&
                        "“Our counselors used to call ad leads 24 hours later when interest had cooled down. With Uptrix, parents receive our brochure on WhatsApp in 1.4 seconds and get a phone call within 3 minutes. It completely transformed our admission numbers across all 6 Kota & Jaipur centers.”"}
                      {activeVideoId === "video-2" &&
                        "“Our accounts team used to spend 15 days after every academic term matching bank statements with student roll numbers. With Uptrix + Tally Prime sync, receipts are posted within seconds of UPI payment with zero manual disputes.”"}
                      {activeVideoId === "video-3" &&
                        "“When parents spend ₹1.5 Lakh on pre-medical coaching, they want prompt, empathetic counseling. Uptrix CTI gives our center directors total visibility into call durations, recordings, and fee objection handling.”"}
                      {activeVideoId === "video-4" &&
                        "“Our governing board reviews real-time admission revenue every morning on the Uptrix Dean Command Deck. It eliminated 100% of conflicting Excel spreadsheets across all 14 engineering streams.”"}
                    </blockquote>
                    <div className="flex items-center gap-2 text-xs text-pulse-subtle mt-1">
                      <span className="font-bold text-pulse-ink">
                        {activeVideoId === "video-1" && "Dr. Arvind Singhal (Academic Director, Apex Academies)"}
                        {activeVideoId === "video-2" && "Mrs. Meenakshi Sundaram (Director of Admissions, Oakridge World School)"}
                        {activeVideoId === "video-3" && "Vikram Joshi (Head of Admissions, Pioneer Medical Academy)"}
                        {activeVideoId === "video-4" && "Prof. Dr. Rajesh Kulkarni (Dean of Admissions, Vanguard Institute)"}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-2.5 bg-[#f8fafd] border border-[#e2e6f4] rounded-2xl p-4">
                    <span className="text-[11px] font-code font-bold uppercase text-pulse-muted">Campus Metric Summary</span>
                    <div className="text-xs flex flex-col gap-1.5 text-pulse-ink">
                      <div className="flex justify-between">
                        <span className="text-pulse-subtle">Deployment Duration:</span>
                        <strong>14 Months Active</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulse-subtle">Counselors Active:</span>
                        <strong>
                          {activeVideoId === "video-1" ? "48 Desks" : activeVideoId === "video-2" ? "22 Desks" : activeVideoId === "video-3" ? "34 Desks" : "28 Desks"}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulse-subtle">Net ROI Generated:</span>
                        <strong className="text-emerald-700">4.8x Platform Cost</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Secondary Video Selector Cards inside popup */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#edf1f8] pt-4">
                  {[
                    {
                      id: "video-1",
                      title: "Scaling from 3 to 6 Campuses Without Adding Extra Staff",
                      speaker: "Dr. Arvind Singhal (Apex)",
                      duration: "02:48",
                      icon: "⚛️",
                    },
                    {
                      id: "video-2",
                      title: "Ending Fee Leakages and Chaotic Parent Counter Queues",
                      speaker: "Mrs. Meenakshi Sundaram (Oakridge)",
                      duration: "01:54",
                      icon: "🏫",
                    },
                    {
                      id: "video-3",
                      title: "Enforcing 3.5-Hour Parent Talk-Time Counseling Quotas",
                      speaker: "Vikram Joshi (Pioneer Medical)",
                      duration: "02:15",
                      icon: "📞",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveVideoId(item.id);
                        setIsVideoPlaying(true);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        activeVideoId === item.id
                          ? "bg-pulse-soft/40 border-pulse ring-1 ring-pulse/20"
                          : "bg-white border-[#e1e6f4] hover:bg-[#fafbfe] hover:border-pulse/30"
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between text-[11px] font-code text-pulse-subtle">
                          <span>▶ {item.duration}</span>
                          {activeVideoId === item.id && <span className="text-pulse font-bold">Playing</span>}
                        </div>
                        <span className="text-xs font-bold text-pulse-ink leading-snug">{item.title}</span>
                        <span className="text-[11px] text-pulse-subtle">{item.speaker}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 9: REVIEWS & WALL OF CAMPUS TRUST
            Distinct Design: Filterable Review Wall with Category Breakdown
        ========================================================================== */}
        <section
          id="reviews"
          className="border-b border-pulse-line bg-gradient-to-b from-[#f8f9fd] via-white to-[#f4f7fd] py-[clamp(64px,8vw,112px)]"
        >
          <div className={`${container} flex flex-col gap-10`}>
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[800px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 font-code">
                ⭐ VERIFIED INSTITUTIONAL REVIEWS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-pulse-ink">
                Trusted by 420+ Coaching Academies, Schools &amp; Colleges
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                Rated 4.9/5 by center directors, admissions counselors, and accounts teams across India.
              </p>
            </div>

            {/* Trust Telemetry Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto w-full">
              <div className="rounded-2xl border border-amber-200 bg-white p-3.5 text-center shadow-2xs">
                <span className="text-xs font-bold text-amber-700 font-code block">★★★★★ 4.9 / 5</span>
                <span className="text-sm font-black text-pulse-ink mt-0.5 block">420+ Campus Audits</span>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-center shadow-2xs">
                <span className="text-xs font-bold text-emerald-700 font-code block">99.4% CSAT</span>
                <span className="text-sm font-black text-pulse-ink mt-0.5 block">Customer Satisfaction</span>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-white p-3.5 text-center shadow-2xs">
                <span className="text-xs font-bold text-blue-700 font-code block">Average 3.8x ROI</span>
                <span className="text-sm font-black text-pulse-ink mt-0.5 block">In First Admission Cycle</span>
              </div>
              <div className="rounded-2xl border border-purple-200 bg-white p-3.5 text-center shadow-2xs">
                <span className="text-xs font-bold text-purple-700 font-code block">40+ Hours Saved</span>
                <span className="text-sm font-black text-pulse-ink mt-0.5 block">Per Counselor / Month</span>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: "All Reviews (420+)" },
                { id: "coaching", label: "Coaching & Test-Prep (210+)" },
                { id: "schools", label: "K-12 Schools (145+)" },
                { id: "colleges", label: "Higher Ed & Colleges (65+)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewCategory(tab.id as "all" | "coaching" | "schools" | "colleges")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    reviewCategory === tab.id
                      ? "bg-pulse text-white shadow-xs"
                      : "bg-white border border-[#dfe3f2] text-pulse-muted hover:bg-pulse-soft hover:text-pulse"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Reviews Wall Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  author: "Sanjay Singhania",
                  role: "Managing Director",
                  institute: "Target NEET Institute, Patna",
                  category: "coaching",
                  rating: 5,
                  date: "Verified 3 weeks ago",
                  highlight: "Recovered ₹18 Lakhs in overdue installments in 2 weeks",
                  comment:
                    "We run 4 coaching centers in Bihar. Previously, parents would make token payments and delay the second installment for months. Uptrix automated WhatsApp reminder links collected over 70% of overdue tuition within 14 days without our counselors having to make awkward phone calls.",
                  stats: "4 Campuses • 2,800 Students",
                  avatarBg: "bg-blue-100 text-blue-800",
                },
                {
                  author: "Sister Maria D'Souza",
                  role: "Principal & Administrator",
                  institute: "St. Xavier's International School, Goa",
                  category: "schools",
                  rating: 5,
                  date: "Verified 1 month ago",
                  highlight: "Zero chaos at admissions counter",
                  comment:
                    "The digital seat token ledger completely transformed our nursery and grade 1 admissions rush. Parents scanned the QR code, selected their syllabus choice, and received automated admission confirmations on WhatsApp with official school branding.",
                  stats: "CBSE K-12 • 1,450 Students",
                  avatarBg: "bg-emerald-100 text-emerald-800",
                },
                {
                  author: "Rohan Deshmukh",
                  role: "Director of Admissions",
                  institute: "Symbiosis Prep Academy, Pune",
                  category: "coaching",
                  rating: 5,
                  date: "Verified 2 weeks ago",
                  highlight: "Sub-400ms lead delivery to counselor phones",
                  comment:
                    "We spend heavily on Instagram and Google search ads. Before Uptrix, leads sat in CSV files until evening. Now, within 400 milliseconds of an inquiry, our counselor's phone rings with parent details. Our contact rate improved by nearly 400%.",
                  stats: "JEE / MHT-CET • 1,900 Students",
                  avatarBg: "bg-purple-100 text-purple-800",
                },
                {
                  author: "Dr. K. S. Ramanathan",
                  role: "Dean & Executive Trustee",
                  institute: "Sri Krishna Educational Institutions, Coimbatore",
                  category: "colleges",
                  rating: 5,
                  date: "Verified 1 month ago",
                  highlight: "Flawless Tally Prime auto-voucher sync",
                  comment:
                    "With 3 colleges and 6,000+ applicants, bank reconciliation was our biggest headache. Uptrix bi-directional Tally integration pushes every paid seat token and semester fee into our company accounts ledger with 100% GST compliance and zero manual data entry.",
                  stats: "Engineering & Arts • 6,200 Students",
                  avatarBg: "bg-amber-100 text-amber-800",
                },
                {
                  author: "Pooja Malhotra",
                  role: "Head of Counseling",
                  institute: "Aakash Foundation Partner Center, Chandigarh",
                  category: "coaching",
                  rating: 5,
                  date: "Verified 3 weeks ago",
                  highlight: "50-meter GPS attendance solved staff absence",
                  comment:
                    "Center managers could never verify if counselors were physically present at their desks on weekends. Uptrix 50m geofencing ensures that counselors can only mark attendance when physically on the counseling floor. No more ghost attendance.",
                  stats: "Test-Prep • 16 Counselors",
                  avatarBg: "bg-teal-100 text-teal-800",
                },
                {
                  author: "Anandita Sen",
                  role: "Vice Principal (Admissions)",
                  institute: "Delhi Public Global School, Kolkata",
                  category: "schools",
                  rating: 5,
                  date: "Verified 2 weeks ago",
                  highlight: "Parents love the verified WhatsApp brochure",
                  comment:
                    "Our admission prospectus is a 24-page PDF. Uptrix delivers it instantly to parents' WhatsApp from our verified green-tick institutional number with tracking links. We know exactly which parents opened the syllabus before calling them.",
                  stats: "ICSE K-12 • 2,100 Students",
                  avatarBg: "bg-indigo-100 text-indigo-800",
                },
              ]
                .filter((r) => reviewCategory === "all" || r.category === reviewCategory)
                .map((review, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-[#dfe3f2] bg-white p-6 shadow-2xs flex flex-col justify-between gap-4 hover:border-pulse/40 transition"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-amber-400 text-xs tracking-wider">★★★★★</div>
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800 font-code">
                          ✓ Verified Campus
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-pulse-ink leading-snug">
                        “{review.highlight}”
                      </h4>
                      <p className="text-xs text-pulse-muted leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    <div className="border-t border-[#f0f3fa] pt-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${review.avatarBg}`}>
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-pulse-ink block leading-tight">{review.author}</span>
                          <span className="text-[11px] text-pulse-subtle block">{review.role}, {review.institute}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-code text-pulse-subtle bg-[#f8f9fd] px-2 py-1 rounded border border-[#e8ecf6]">
                        {review.stats}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: INSTITUTIONAL PRICING
            Distinct Design: Transparent Tiered Campus Pricing Cards with Annual Toggle
        ========================================================================== */}
        <section
          id="pricing"
          className="border-b border-pulse-line bg-white py-[clamp(64px,8vw,112px)]"
        >
          <div className={`${container} flex flex-col gap-10`}>
            {/* Header */}
            <div className="flex flex-col gap-3 text-center max-w-[800px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 font-code">
                💳 TRANSPARENT CAMPUS PRICING
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-pulse-ink">
                Predictable, Turnkey Plans Built for Educational Institutions
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                No hidden per-lead fees. Full admissions CRM, counselor attendance, and fee tracking included.
              </p>

              {/* 6 Months vs 1 Year Toggle */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dfe3f2] bg-[#f8f9fd] p-1.5 mx-auto mt-2">
                <button
                  type="button"
                  onClick={() => setBillingCycle("six_months")}
                  className={`rounded-full px-4 sm:px-5 py-1.5 text-xs font-bold transition cursor-pointer ${
                    billingCycle === "six_months"
                      ? "bg-white text-pulse-ink shadow-2xs"
                      : "text-pulse-muted hover:text-pulse-ink"
                  }`}
                >
                  6 Months Plan
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("one_year")}
                  className={`rounded-full px-4 sm:px-5 py-1.5 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === "one_year"
                      ? "bg-pulse text-white shadow-2xs"
                      : "text-pulse-muted hover:text-pulse-ink"
                  }`}
                >
                  <span>1 Year Plan</span>
                  <span className={`text-[10px] font-code font-bold px-2 py-0.5 rounded-full ${
                    billingCycle === "one_year" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            {/* 3 Pricing Tier Cards (Basic, Standard, Enterprise) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Plan 1: Basic */}
              <div className="rounded-3xl border border-[#dfe3f2] bg-white p-7 shadow-xs flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase font-code text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      5 Users
                    </span>
                    <span className="text-xs font-code text-pulse-subtle">Entry Academy Tier</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-pulse-ink">Basic</h3>
                    <p className="text-xs text-pulse-muted mt-1 leading-snug">
                      Core admissions, fee tracking, and batch scheduling for small coaching academies.
                    </p>
                  </div>
                  <div className="border-y border-[#f0f3fa] py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-pulse-ink">
                        {billingCycle === "one_year" ? "₹399" : "₹479"}
                      </span>
                      <span className="text-xs text-pulse-subtle font-code">/ user / month</span>
                    </div>
                    <span className="text-[11px] font-code text-emerald-700 block mt-1">
                      {billingCycle === "one_year"
                        ? "1 Year Plan (₹4,788/user/year) • Save 20%"
                        : "6 Months Plan (₹2,874/user for 6 mos)"}
                    </span>
                    <span className="text-xs font-bold text-pulse-ink block mt-1">
                      Fixed for 5 Users (₹{billingCycle === "one_year" ? "1,995" : "2,395"}/mo total)
                    </span>
                  </div>

                  {/* Exact Features from User Table */}
                  <div className="flex flex-col gap-3 text-xs text-pulse-muted">
                    <span className="font-bold text-[11px] uppercase font-code text-pulse-ink">Included Modules:</span>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Lead Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Fee Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Batch Management</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/crm#demo"
                  className="rounded-xl border border-pulse text-pulse font-bold text-xs py-3.5 text-center hover:bg-pulse hover:text-white transition shadow-2xs"
                >
                  Start Basic Plan →
                </Link>
              </div>

              {/* Plan 2: Standard (Most Popular) */}
              <div className="rounded-3xl border-2 border-pulse bg-gradient-to-b from-pulse-soft/30 via-white to-pulse-soft/20 p-7 shadow-lg relative flex flex-col justify-between gap-6 ring-2 ring-pulse/15">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-pulse text-white px-4 py-1 text-[11px] font-bold font-code uppercase tracking-wider shadow-sm">
                  ★ MOST POPULAR FOR ACADEMIES
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase font-code text-pulse bg-pulse/10 border border-pulse/20 px-3 py-1 rounded-full">
                      5 - 100 Users
                    </span>
                    <span className="text-xs font-code text-pulse-subtle">Growth &amp; Multi-Staff</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-pulse-ink">Standard</h3>
                    <p className="text-xs text-pulse-muted mt-1 leading-snug">
                      Complete counselor productivity, attendance tracking, customizable fields, and AI assistance.
                    </p>
                  </div>
                  <div className="border-y border-[#e2e8f8] py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-pulse-ink">
                        {billingCycle === "one_year" ? "₹999" : "₹1,199"}
                      </span>
                      <span className="text-xs text-pulse-subtle font-code">/ user / month</span>
                    </div>
                    <span className="text-[11px] font-code text-emerald-700 block mt-1">
                      {billingCycle === "one_year"
                        ? "1 Year Plan (₹11,988/user/year) • Save 20%"
                        : "6 Months Plan (₹7,194/user for 6 mos)"}
                    </span>
                    <span className="text-xs font-bold text-pulse-ink block mt-1">
                      Scalable for 5 to 100 Counseling Users
                    </span>
                  </div>

                  {/* Exact Features from User Table */}
                  <div className="flex flex-col gap-2.5 text-xs text-pulse-muted">
                    <span className="font-bold text-[11px] uppercase font-code text-pulse-ink">Everything in Basic, plus:</span>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Lead Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Fee Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Batch Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Attendance</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Counsellor Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Manage Fields</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-pulse text-white flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">AI Assistant</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/crm#demo"
                  className={`${btnPrimary} text-center shadow-md shadow-pulse/30 text-xs font-bold py-3.5`}
                >
                  Deploy Standard Plan →
                </Link>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="rounded-3xl border border-[#dfe3f2] bg-white p-7 shadow-xs flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase font-code text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                      Enterprise Scale
                    </span>
                    <span className="text-xs font-code text-pulse-subtle">Institutes &amp; Chains</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-pulse-ink">Enterprise</h3>
                    <p className="text-xs text-pulse-muted mt-1 leading-snug">
                      Full-suite institutional operating system with multi-channel integrations, work logs, and SSO.
                    </p>
                  </div>
                  <div className="border-y border-[#f0f3fa] py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-pulse-ink">
                        {billingCycle === "one_year" ? "₹1,499" : "₹1,799"}
                      </span>
                      <span className="text-xs text-pulse-subtle font-code">/ user / month</span>
                    </div>
                    <span className="text-[11px] font-code text-emerald-700 block mt-1">
                      {billingCycle === "one_year"
                        ? "1 Year Plan (₹17,988/user/year) • Save 20%"
                        : "6 Months Plan (₹10,794/user for 6 mos)"}
                    </span>
                    <span className="text-xs font-bold text-pulse-ink block mt-1">
                      Full Institutional Deployment &amp; Dedicated SLA
                    </span>
                  </div>

                  {/* Exact Features from User Table */}
                  <div className="flex flex-col gap-2.5 text-xs text-pulse-muted">
                    <span className="font-bold text-[11px] uppercase font-code text-pulse-ink">Complete Enterprise Suite:</span>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Lead Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Integrations (WA, SMS, Email)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Call and Chat Support</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Fee Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Counsellor Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Customised Field Values</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Employee Work Logs</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Employee Attendance</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Bookmark Lead</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Batch Management</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">Migration Assistance</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">AI Assistant</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span className="text-pulse-ink font-semibold">SSO Login (Single Sign On)</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/crm#demo"
                  className="rounded-xl border border-purple-600 text-purple-700 font-bold text-xs py-3.5 text-center hover:bg-purple-600 hover:text-white transition shadow-2xs"
                >
                  Request Enterprise Pilot →
                </Link>
              </div>
            </div>


            {/* Campus Guarantees Footnote Strip */}
            <div className="rounded-2xl border border-[#dfe3f2] bg-[#f8f9fd] p-4 sm:p-5 flex flex-wrap items-center justify-around gap-4 text-xs font-code text-pulse-muted">
              <span className="flex items-center gap-1.5 font-bold text-pulse-ink">
                <span className="text-emerald-600">✓</span> Free Data Migration from Excel or Old CRM
              </span>
              <span className="flex items-center gap-1.5 font-bold text-pulse-ink">
                <span className="text-emerald-600">✓</span> Live in Under 5 Business Days
              </span>
              <span className="flex items-center gap-1.5 font-bold text-pulse-ink">
                <span className="text-emerald-600">✓</span> WhatsApp Green-Tick Verification Assistance
              </span>
              <span className="flex items-center gap-1.5 font-bold text-pulse-ink">
                <span className="text-emerald-600">✓</span> 100% Student Data Privacy (DPDP Act Ready)
              </span>
            </div>
          </div>
        </section>
        <section className="bg-[#f8f9fd] py-16 lg:py-24 border-b border-pulse-line">
          <div className={`${container} flex flex-col items-center text-center gap-6 max-w-[800px]`}>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider font-code">
              🎓 Ready for Your Peak Admission Cycle?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] leading-[1.18] font-black tracking-tight text-pulse-ink">
              Stop losing student enquiries. Fill your batches faster with Uptrix.
            </h2>
            <p className="text-lg leading-relaxed text-pulse-muted max-w-[620px]">
              Join coaching institutes, schools, and colleges running their highest-enrolling admission cycles on Uptrix CRM + ERP.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link
                href="/crm#demo"
                className={`${btnPrimary} shadow-md shadow-pulse/25 text-base font-bold py-4 px-8`}
              >
                Book a 30-Minute Free Demo
              </Link>
              <Link
                href="/crm/pricing"
                className="rounded-xl border border-pulse-line bg-white px-7 py-4 text-base font-bold text-pulse-ink shadow-xs transition hover:border-pulse hover:bg-pulse-soft/30"
              >
                Explore Volume Pricing
              </Link>
            </div>

            <p className="text-xs text-pulse-subtle mt-2">
              ✓ Free data migration from Excel or old CRMs • ✓ Live in under 5 business days • ✓ WhatsApp Cloud API setup included
            </p>
          </div>
        </section>
      </main>
      <PulseFooter content={footer} />
    </>
  );
}
