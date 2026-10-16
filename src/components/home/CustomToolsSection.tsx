"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import type { HomeContent } from "@/content/home";
import Reveal from "@/components/Reveal";
import { submitLead } from "@/app/actions/lead";
import { ArrowRight, Check } from "./icons";

// Specialized SVG icons for custom tools capabilities
function GearWorkflowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect x="2" y="3" width="6" height="6" rx="1.5" />
      <rect x="16" y="3" width="6" height="6" rx="1.5" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" />
      <path d="M5 9v3a2 2 0 0 0 2 2h2" />
      <path d="M19 9v3a2 2 0 0 1-2 2h-2" />
      <path d="M12 15V11" />
    </svg>
  );
}

function DashboardPortalIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M6 8h.01" />
      <path d="M10 8h.01" />
      <path d="M14 8h.01" />
      <path d="M6 12h5" />
      <path d="M6 16h3" />
      <circle cx="16" cy="14" r="2.5" />
      <path d="m18 16 2 2" />
    </svg>
  );
}

function IntegrationApiIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 2v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="M12 18v4" />
      <path d="m19.07 19.07-2.83-2.83" />
      <path d="M18 12h4" />
      <path d="m19.07 4.93-2.83 2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AiBotIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M12 2v2" />
      <rect width="16" height="12" x="4" y="6" rx="3" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <path d="M9 15h6" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m19 18 2 3" />
      <path d="m5 18-2 3" />
    </svg>
  );
}

function MobileFieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2.5" />
      <path d="M12 18h.01" />
      <path d="m9 9 2 2 4-4" />
      <path d="M10 5h4" />
    </svg>
  );
}

function IndustryModuleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <circle cx="18" cy="17" r="1" />
      <circle cx="12" cy="17" r="1" />
      <circle cx="6" cy="17" r="1" />
    </svg>
  );
}

const toolIcons = [
  { icon: GearWorkflowIcon, color: "#6366F1", bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)" },
  { icon: DashboardPortalIcon, color: "#14B8A6", bg: "rgba(20,184,166,0.15)", border: "rgba(20,184,166,0.3)" },
  { icon: IntegrationApiIcon, color: "#3B82F6", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)" },
  { icon: AiBotIcon, color: "#EC4899", bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.3)" },
  { icon: MobileFieldIcon, color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
  { icon: IndustryModuleIcon, color: "#10B981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" },
];

const toolCardImages = [
  "/images/custom-tools/workflow.jpg",
  "/images/custom-tools/dashboard.jpg",
  "/images/products/crm-pipeline.jpg",
  "/images/custom-tools/dashboard.jpg",
  "/images/custom-tools/mobile-app.jpg",
  "/images/products/hrms-dashboard.jpg",
];

const toolTags = [
  ["Multi-Step Approvals", "Dynamic Triggers", "Audit Trails"],
  ["Role-Based Access", "Executive Cockpit", "Export & Alerts"],
  ["Tally Bi-Directional", "Zero Data Duplication", "REST & Webhooks"],
  ["WhatsApp Integration", "Smart Document OCR", "Lead Scoring"],
  ["Offline Sync", "GPS Geofencing", "Instant Order Logging"],
  ["Tailored Architecture", "Custom Logic", "100% IP Ownership"],
];

const showcaseDemos = [
  {
    id: "analytics",
    tabLabel: "Executive Analytics Cockpit",
    title: "Real-Time Business Telemetry & Revenue Forecasting",
    tag: "Business Intelligence",
    description:
      "Custom-built BI command centers consolidating multi-branch revenues, MRR/ARR trajectories, team KPIs, and live financial health into a single unified screen.",
    image: "/images/custom-tools/dashboard.jpg",
    bullets: ["Live MRR & ARR telemetry", "Automated scheduled PDF/Excel reports", "Role-based branch & partner permissions"],
  },
  {
    id: "workflow",
    tabLabel: "Visual Workflow Engine",
    title: "Multi-Tier Approval & Trigger Pipeline Engine",
    tag: "Process Automation",
    description:
      "Drag-and-drop visual logic designer that connects your inbound leads, purchase approvals, team assignments, and alerts with zero code bottlenecks.",
    image: "/images/custom-tools/workflow.jpg",
    bullets: ["Dynamic multi-stage approval loops", "Automated email & WhatsApp triggers", "Audit log tracking & exception alerts"],
  },
  {
    id: "mobile",
    tabLabel: "Field Force & Mobile App",
    title: "GPS Geofenced Sales & Field Operations Suite",
    tag: "Field Mobility",
    description:
      "Progressive mobile app tailored for ground executives, featuring GPS-verified customer visits, instant offline catalog order booking, and route tracking.",
    image: "/images/custom-tools/mobile-app.jpg",
    bullets: ["Offline-first data sync", "Geofenced attendance verification", "Instant invoice & order capture"],
  },
];

const categories = ["All Custom Tools", "Workflow & Portals", "Integrations & AI", "Mobile & Niche Ops"];

export default function CustomToolsSection({ content }: { content: HomeContent["customToolsSection"] }) {
  const [activeCategory, setActiveCategory] = useState("All Custom Tools");
  const [showcaseTab, setShowcaseTab] = useState(0);

  // Quick Blueprint Consultation Form State
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredTools = content.tools
    .map((t, idx) => ({ ...t, originalIndex: idx }))
    .filter((_, idx) => {
      if (activeCategory === "All Custom Tools") return true;
      if (activeCategory === "Workflow & Portals") return idx === 0 || idx === 1;
      if (activeCategory === "Integrations & AI") return idx === 2 || idx === 3;
      if (activeCategory === "Mobile & Niche Ops") return idx === 4 || idx === 5;
      return true;
    });

  const activeShowcase = showcaseDemos[showcaseTab];

  async function handleConsultationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("source", "Custom Tools Consultation");
    data.set("businessType", "Custom Software & Tools");
    data.set("pageUrl", typeof window !== "undefined" ? window.location.href : "/#custom-tools");

    startTransition(async () => {
      try {
        const res = await submitLead(data);
        if (res.ok) {
          setFormSent(true);
        } else {
          setFormError(res.error || "Unable to send request. Please try again.");
        }
      } catch {
        setFormError("Network error. Please try again or contact us directly.");
      }
    });
  }

  return (
    <section
      id="custom-tools"
      aria-labelledby="custom-tools-heading"
      className="scroll-mt-18 relative overflow-hidden py-[clamp(80px,11vw,128px)]"
      style={{
        background:
          "radial-gradient(1000px 580px at 15% 10%, rgba(79, 70, 229, 0.28), transparent 75%), radial-gradient(900px 520px at 85% 90%, rgba(20, 184, 166, 0.22), transparent 75%), radial-gradient(700px 350px at 50% 50%, rgba(30, 27, 75, 0.45), transparent 80%), #070D24",
      }}
    >
      {/* Background ambient grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Header Section with Official Uptrix Branding */}
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-400/35 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-teal-500/15 px-4.5 py-1.5 shadow-[0_0_28px_-4px_rgba(99,102,241,0.5)] backdrop-blur-md">
              <Image
                src="/logo-mark.png"
                alt="Uptrix Logo Mark"
                width={20}
                height={20}
                className="h-5 w-5 rounded-md object-contain shadow-sm"
              />
              <span className="h-3.5 w-px bg-white/20" />
              <span className="text-xs font-bold tracking-[.14em] text-indigo-200 uppercase">
                {content.eyebrow} • {content.tag}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="custom-tools-heading"
              className="font-display text-[clamp(28px,3.8vw,48px)] leading-[1.12] font-extrabold tracking-[-0.025em] text-balance text-white"
            >
              We Develop{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                Custom Tools for Your Business Growth
              </span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="max-w-[760px] text-pretty text-[clamp(16px,1.25vw,18px)] text-slate-300">
              {content.body}
            </p>
          </Reveal>

          {/* Value Stats Strip */}
          <Reveal delay={200} className="w-full mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-md">
              {content.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-3.5 px-4 rounded-xl bg-white/[0.02] border border-white/5 transition hover:bg-white/[0.05]">
                  <span className="font-display text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 text-center font-medium mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Featured Interactive Custom Tool Image Showcase with Uptrix Logo & Live Frame */}
        <Reveal delay={260} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 md:p-8 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
            {/* Showcase Tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-white/10">
              {showcaseDemos.map((demo, idx) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setShowcaseTab(idx)}
                  className={`h-11 cursor-pointer rounded-full px-5 text-sm font-semibold transition duration-200 flex items-center gap-2 ${
                    showcaseTab === idx
                      ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-[0_4px_18px_-4px_rgba(79,70,229,0.7)]"
                      : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: showcaseTab === idx ? "#2DD4BF" : "#94A3B8" }} />
                  <span>{demo.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Showcase Detail & Real Image Preview */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Info Column */}
              <div className="lg:col-span-4 flex flex-col gap-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-1 text-xs font-bold tracking-wider text-teal-300 uppercase">
                    {activeShowcase.tag}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-slate-400">
                    Custom Build
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white leading-tight">
                  {activeShowcase.title}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed text-slate-300">
                  {activeShowcase.description}
                </p>

                <ul className="mt-2 flex flex-col gap-2.5">
                  {activeShowcase.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-slate-200">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-500/20 text-teal-300 text-xs">
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#consultation-form"
                  className="mt-3 inline-flex h-11 items-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(255,255,255,0.4)]"
                >
                  <span>Request This Custom Tool</span>
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Right Screenshot Window Frame With Uptrix Logo */}
              <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]">
                {/* Browser Titlebar with Uptrix Logo */}
                <div className="flex h-10 items-center justify-between border-b border-white/10 bg-slate-900/90 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    {/* Official Uptrix Logo inside Window Mockup */}
                    <div className="hidden sm:flex items-center gap-1.5 border-l border-white/10 pl-2.5">
                      <Image
                        src="/logo-light.png"
                        alt="Uptrix"
                        width={756}
                        height={235}
                        className="h-4 w-auto opacity-80"
                      />
                      <span className="rounded bg-indigo-500/25 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-indigo-300 uppercase">
                        Enterprise Tool
                      </span>
                    </div>
                  </div>

                  {/* Browser Address Bar */}
                  <div className="flex items-center gap-2 rounded-md bg-white/[0.06] px-3.5 py-1 font-mono text-[11px] text-slate-300 max-w-[260px] sm:max-w-xs truncate">
                    <span className="text-teal-400">🔒</span> https://custom.uptrixglobal.com/{activeShowcase.id}
                  </div>

                  {/* Live Status indicator */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-medium text-teal-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" /> Live Telemetry
                  </span>
                </div>

                {/* Screenshot Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <Image
                    key={activeShowcase.id}
                    src={activeShowcase.image}
                    alt={activeShowcase.title}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={280} className="mt-16 flex flex-col items-center">
          <div
            role="tablist"
            aria-label="Filter custom tool capabilities"
            className="flex flex-wrap justify-center gap-1.5 rounded-full border border-white/15 bg-navy/60 p-1.5 backdrop-blur-md"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-10 cursor-pointer rounded-full px-5 text-sm font-semibold transition duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-[0_4px_16px_-4px_rgba(79,70,229,0.6)]"
                    : "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 6 Capabilities Grid With Images, Uptrix Mark & Tags */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const meta = toolIcons[tool.originalIndex % toolIcons.length];
            const tags = toolTags[tool.originalIndex % toolTags.length];
            const cardImg = toolCardImages[tool.originalIndex % toolCardImages.length];
            const IconComponent = meta.icon;

            return (
              <Reveal key={tool.originalIndex} delay={tool.originalIndex * 60}>
                <div
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:bg-white/[0.065] hover:shadow-[0_20px_40px_-20px_rgba(79,70,229,0.3)]"
                >
                  {/* Top Thumbnail Image with Uptrix Logo Watermark */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                    <Image
                      src={cardImg}
                      alt={tool.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1433] via-transparent to-transparent opacity-85" />
                    
                    {/* Left category tag */}
                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-slate-950/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-teal-300 uppercase backdrop-blur-md">
                      {tool.tag}
                    </span>

                    {/* Right: Uptrix Brand Watermark Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-2.5 py-0.5 backdrop-blur-md">
                      <Image
                        src="/logo-mark.png"
                        alt="Uptrix"
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 rounded-sm object-contain"
                      />
                      <span className="text-[10px] font-semibold text-white/90 tracking-wide">Uptrix Build</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 p-6 flex-1">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition duration-300 group-hover:scale-105"
                        style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
                      >
                        <IconComponent />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white transition group-hover:text-indigo-200">
                        {tool.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-300">
                      {tool.body}
                    </p>

                    {/* Feature highlight tags */}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md bg-white/[0.05] px-2 py-0.5 text-[11px] text-slate-300 transition group-hover:bg-white/[0.08]"
                        >
                          <span className="text-teal-400">✓</span> {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <a
                      href="#consultation-form"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition group-hover:text-teal-300 group-hover:gap-2"
                    >
                      <span>Customise this tool</span>
                      <ArrowRight size={13} />
                    </a>
                    <span className="text-xs text-slate-500 font-mono">0{tool.originalIndex + 1}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 4-Step Build Lifecycle Timeline */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <Reveal className="flex flex-col items-center gap-3 text-center mb-12">
            <span className="text-xs font-bold tracking-[.14em] text-teal-400 uppercase">
              How We Build For You
            </span>
            <h3 className="font-display text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight text-white">
              From Problem Statement to Deployed Tool in 4 Sprints
            </h3>
            <p className="max-w-[600px] text-sm md:text-base text-slate-300">
              Clear delivery milestones with no ambiguity. You get full visibility from wireframe to production launch.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {content.processSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:border-indigo-400/40 hover:bg-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-sm font-extrabold text-white bg-gradient-to-br from-indigo-500 to-teal-500 shadow-[0_4px_12px_-3px_rgba(79,70,229,0.5)]">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Sprint 0{idx + 1}</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold text-white">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-300">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Consultation CTA Banner with Uptrix Logo & Interactive Quick Blueprint Request */}
        <Reveal delay={200} className="mt-16">
          <div
            id="consultation-form"
            className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-indigo-400/35 bg-gradient-to-r from-indigo-950/90 via-slate-900/95 to-teal-950/90 p-8 md:p-12 shadow-[0_24px_60px_-20px_rgba(79,70,229,0.4)] backdrop-blur-xl"
          >
            {/* Ambient background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-[580px] text-center lg:text-left">
                {/* Uptrix Brand Header */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Image
                    src="/logo-light.png"
                    alt="Uptrix"
                    width={756}
                    height={235}
                    className="h-8 w-auto self-start"
                  />
                  <span className="h-4 w-px bg-white/20" />
                  <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-0.5 text-xs font-semibold text-teal-300">
                    Bespoke Solutions Studio
                  </span>
                </div>

                <h3 className="font-display text-[clamp(24px,2.8vw,36px)] font-extrabold tracking-tight text-white leading-tight">
                  Have a unique workflow or bottleneck in your business?
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Talk directly with our solutions engineering team. We will audit your current process, prepare a custom architecture blueprint, and outline exact timelines.
                </p>

                {/* Trust Guarantees */}
                <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-300">
                  <span className="flex items-center gap-1.5"><span className="text-teal-400 font-bold">✓</span> Strict NDA Protected</span>
                  <span className="flex items-center gap-1.5"><span className="text-teal-400 font-bold">✓</span> Free Solution Architecture</span>
                  <span className="flex items-center gap-1.5"><span className="text-teal-400 font-bold">✓</span> Full Source Code Ownership</span>
                </div>
              </div>

              {/* Quick Consultation Form or Success Confirmation */}
              <div className="w-full lg:max-w-[460px] rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md">
                {formSent ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-teal-500/20 text-teal-300 text-xl font-bold">
                      ✓
                    </div>
                    <h4 className="font-display text-lg font-bold text-white">Consultation Request Received</h4>
                    <p className="text-sm text-slate-300">
                      Our solutions architects will review your requirements and reach out within 1 business day with a proposed architecture blueprint.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                        Request Custom Blueprint
                      </span>
                      <span className="text-[11px] text-teal-400">100% Free Consultation</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="Your Name *"
                        className="h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="Mobile / WhatsApp *"
                        className="h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        name="email"
                        type="email"
                        placeholder="Work Email"
                        className="h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                      <input
                        name="company"
                        type="text"
                        placeholder="Company Name"
                        className="h-10 rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    </div>

                    <textarea
                      name="solveProblem"
                      rows={2}
                      placeholder="What tool or workflow would you like to build? (e.g., custom portal, Tally sync, approval engine)..."
                      className="rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 resize-none"
                    />

                    {formError && (
                      <p role="alert" className="text-xs text-rose-300">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 px-6 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.7)] transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
                    >
                      {isPending ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Blueprint Request</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
