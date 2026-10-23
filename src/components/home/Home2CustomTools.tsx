"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import type { HomeContent } from "@/content/home";
import Reveal from "@/components/Reveal";
import { submitLead } from "@/app/actions/lead";

// Zero-dependency SVG Icons
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

function SparklesIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  );
}

function GaugeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function WorkflowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="6" height="6" rx="1.5" />
      <rect x="16" y="3" width="6" height="6" rx="1.5" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" />
      <path d="M5 9v3a2 2 0 0 0 2 2h2" />
      <path d="M19 9v3a2 2 0 0 1-2 2h-2" />
      <path d="M12 15V11" />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function IntegrationIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

function AiBotIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

function IndustryModuleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <circle cx="18" cy="17" r="1" />
      <circle cx="12" cy="17" r="1" />
      <circle cx="6" cy="17" r="1" />
    </svg>
  );
}

function DashboardPortalIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const toolIcons = [
  { icon: WorkflowIcon, color: "#9333ea", bg: "rgba(147, 51, 234, 0.12)", border: "rgba(147, 51, 234, 0.25)" },
  { icon: DashboardPortalIcon, color: "#14b8a6", bg: "rgba(20, 184, 166, 0.12)", border: "rgba(20, 184, 166, 0.25)" },
  { icon: IntegrationIcon, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.12)", border: "rgba(59, 130, 246, 0.25)" },
  { icon: AiBotIcon, color: "#ec4899", bg: "rgba(236, 72, 153, 0.12)", border: "rgba(236, 72, 153, 0.25)" },
  { icon: SmartphoneIcon, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.25)" },
  { icon: IndustryModuleIcon, color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.25)" },
];

const toolCardImages = [
  "/images/custom-tools/light-workflow.jpg",
  "/images/custom-tools/light-dashboard.jpg",
  "/images/products/crm-pipeline.jpg",
  "/images/products/hrms-dashboard.jpg",
  "/images/custom-tools/light-mobile-app.jpg",
  "/images/education/payments-dashboard.png",
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
    shortBadge: "Live BI",
    icon: GaugeIcon,
    title: "Real-Time Business Telemetry & Revenue Forecasting",
    tag: "Business Intelligence",
    description:
      "Custom-built BI command centers consolidating multi-branch revenues, MRR/ARR trajectories, team KPIs, and live financial health into a single unified screen.",
    image: "/images/custom-tools/light-dashboard.jpg",
    bullets: [
      "Live MRR & ARR telemetry with drill-down views",
      "Automated scheduled PDF/Excel reports delivered weekly",
      "Role-based branch & partner permissions with audit logs",
    ],
    floatingStat: "+184% Data Accuracy",
    statSubtitle: "Unified Multi-Branch Visibility",
    statusBadge: "Live Bi-Directional Telemetry",
  },
  {
    id: "workflow",
    tabLabel: "Visual Workflow Engine",
    shortBadge: "Automations",
    icon: WorkflowIcon,
    title: "Multi-Tier Approval & Trigger Pipeline Engine",
    tag: "Process Automation",
    description:
      "Drag-and-drop visual logic designer that connects your inbound leads, purchase approvals, team assignments, and alerts with zero code bottlenecks.",
    image: "/images/custom-tools/light-workflow.jpg",
    bullets: [
      "Dynamic multi-stage approval loops with instant routing",
      "Automated email & WhatsApp triggers upon stage transitions",
      "Full audit trail tracking with exception alert fallbacks",
    ],
    floatingStat: "Zero Bottlenecks",
    statSubtitle: "100% Automated Hand-offs",
    statusBadge: "Active Visual Pipeline",
  },
  {
    id: "mobile",
    tabLabel: "Field Force & Mobile App",
    shortBadge: "Mobile & GPS",
    icon: SmartphoneIcon,
    title: "GPS Geofenced Sales & Field Operations Suite",
    tag: "Field Mobility",
    description:
      "Progressive mobile app tailored for ground executives, featuring GPS-verified customer visits, instant offline catalog order booking, and route tracking.",
    image: "/images/custom-tools/light-mobile-app.jpg",
    bullets: [
      "Offline-first data sync when working in low network areas",
      "Geofenced attendance verification with geo-stamped visits",
      "Instant invoice, payment & catalog order capture",
    ],
    floatingStat: "100% Offline Sync",
    statSubtitle: "GPS Verified In-Field Logging",
    statusBadge: "Field Executive Active",
  },
];

const categories = ["All Custom Tools", "Workflow & Portals", "Integrations & AI", "Mobile & Niche Ops"];

export default function Home2CustomTools({
  content,
}: {
  content: HomeContent["customToolsSection"];
}) {
  const [activeCategory, setActiveCategory] = useState("All Custom Tools");
  const [showcaseTab, setShowcaseTab] = useState(0);

  // Consultation Form State
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  const toolsList = content?.tools || [];
  const filteredTools = toolsList
    .map((t, idx) => ({ ...t, originalIndex: idx }))
    .filter((_, idx) => {
      if (activeCategory === "All Custom Tools") return true;
      if (activeCategory === "Workflow & Portals") return idx === 0 || idx === 1;
      if (activeCategory === "Integrations & AI") return idx === 2 || idx === 3;
      if (activeCategory === "Mobile & Niche Ops") return idx === 4 || idx === 5;
      return true;
    });

  const activeShowcase = showcaseDemos[showcaseTab];
  const ActiveTabIcon = activeShowcase.icon;

  async function handleConsultationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("source", "Custom Tools Consultation (Home-2)");
    data.set("businessType", "Custom Software & Tools");
    data.set("pageUrl", typeof window !== "undefined" ? window.location.href : "/home-2#custom-tools");

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
      className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-[#faf5ff]/40 via-[#f8faff] to-white border-y border-purple-100/70"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-r from-purple-400/10 via-indigo-400/10 to-teal-400/10 blur-3xl opacity-75"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-teal-300/10 blur-3xl"
      />

      {/* Subtle modern dot mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#9333ea 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-purple-200/90 bg-white/95 px-4.5 py-1.5 shadow-[0_2px_12px_-2px_rgba(147,51,234,0.14)] backdrop-blur-md">
              <Image
                src="/logo-mark.png"
                alt="Uptrix Logo"
                width={20}
                height={20}
                className="h-5 w-5 rounded-md object-contain shadow-xs"
              />
              <span className="h-3.5 w-px bg-purple-200" />
              <span className="text-xs font-bold tracking-[.14em] uppercase text-purple-700">
                {content.eyebrow} • {content.tag}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="custom-tools-heading"
              className="font-display text-[clamp(30px,4vw,50px)] font-black tracking-[-0.03em] text-slate-900 leading-[1.15] max-w-4xl text-balance"
            >
              We Develop{" "}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Custom Tools for Your Business Growth
              </span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="max-w-[760px] text-pretty text-[clamp(16px,1.2vw,18px)] text-slate-600 leading-relaxed">
              {content.body}
            </p>
          </Reveal>
        </div>

        {/* Redesigned Interactive Showcase Experience (Pure Light Mode) */}
        <Reveal delay={200} className="mt-12 sm:mt-16">
          <div className="relative rounded-3xl border border-purple-100/90 bg-white shadow-[0_25px_70px_-15px_rgba(124,58,237,0.12),0_10px_30px_-5px_rgba(15,23,42,0.04)] backdrop-blur-xl p-5 sm:p-8 md:p-10">
            {/* Ambient subtle corner highlights */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-purple-500/10 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-teal-400/10 blur-2xl"
            />

            {/* Modern Segmented Interactive Tab Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-slate-100">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-purple-100 bg-purple-50/50 p-1.5 shadow-inner">
                {showcaseDemos.map((demo, idx) => {
                  const Icon = demo.icon;
                  const isActive = showcaseTab === idx;
                  return (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => setShowcaseTab(idx)}
                      className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-[0_4px_16px_-3px_rgba(124,58,237,0.45)]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-lg transition ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white text-purple-600 shadow-xs group-hover:scale-105"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span>{demo.tabLabel}</span>
                      <span
                        className={`hidden sm:inline-block rounded-md px-1.5 py-0.5 text-[10px] font-mono tracking-tight uppercase ${
                          isActive ? "bg-white/20 text-purple-100" : "bg-purple-100/80 text-purple-700"
                        }`}
                      >
                        {demo.shortBadge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showcase Stage: 2-Column Responsive Layout */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Feature Narrative & CTA */}
              <div className="lg:col-span-5 flex flex-col gap-4.5 text-left">
                {/* Category & Capability Pill Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
                    <SparklesIcon className="h-3 w-3 text-purple-600" />
                    {activeShowcase.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-mono font-semibold text-teal-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    Bespoke Architecture
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 leading-snug">
                  {activeShowcase.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-slate-600">
                  {activeShowcase.description}
                </p>

                {/* Feature Highlights with Glowing Dual-Tone Checkmarks */}
                <ul className="mt-1 flex flex-col gap-3">
                  {activeShowcase.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xs">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Architecture Perks Badges */}
                <div className="mt-2 flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    🔒 100% IP Ownership
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    ⚡ REST & Webhooks
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    🛡️ Enterprise SLA
                  </span>
                </div>

                {/* Action CTA */}
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="#consultation-form"
                    className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-purple-500/35 hover:gap-3 cursor-pointer"
                  >
                    <span>Request This Custom Tool</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>

                  <a
                    href="#how-we-build"
                    className="text-xs sm:text-sm font-semibold text-purple-700 hover:text-purple-900 transition flex items-center gap-1"
                  >
                    See delivery sprints &darr;
                  </a>
                </div>
              </div>

              {/* Right Column: Studio-Grade Light App Canvas & Window Frame (No Dark Colors) */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl ring-1 ring-slate-900/5">
                  {/* Clean Crisp Light Window Header */}
                  <div className="flex h-11 items-center justify-between border-b border-slate-200/90 bg-slate-50/95 px-4 backdrop-blur-md">
                    {/* Window Controls & Uptrix Mark */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-rose-400 shadow-xs" />
                        <span className="h-3 w-3 rounded-full bg-amber-400 shadow-xs" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-xs" />
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 pl-3">
                        <Image
                          src="/logo-dark.png"
                          alt="Uptrix"
                          width={756}
                          height={235}
                          className="h-3.5 w-auto"
                        />
                        <span className="rounded bg-purple-100 border border-purple-200/80 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-purple-700 uppercase">
                          Custom Suite
                        </span>
                      </div>
                    </div>

                    {/* Window Address Bar */}
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-1 font-mono text-[11px] text-slate-700 max-w-[240px] sm:max-w-xs truncate border border-slate-200 shadow-2xs">
                      <span className="text-emerald-600">🔒</span>
                      <span>https://custom.uptrixglobal.com/{activeShowcase.id}</span>
                    </div>

                    {/* Live Telemetry Ping */}
                    <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {activeShowcase.statusBadge}
                    </span>
                  </div>

                  {/* Screenshot Canvas with Pure Light Floating Overlay Badges */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                    <Image
                      key={activeShowcase.id}
                      src={activeShowcase.image}
                      alt={activeShowcase.title}
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 760px"
                    />

                    {/* Subtle Top Inner Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-40" />

                    {/* Floating Light Glassmorphic Metric Badge (Top-Right) */}
                    <div className="absolute top-4 right-4 rounded-xl border border-purple-200/90 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="font-display text-xs font-bold text-slate-900 tracking-wide">
                          {activeShowcase.floatingStat}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                        {activeShowcase.statSubtitle}
                      </p>
                    </div>

                    {/* Floating Light Live Sync Chip (Bottom-Left) */}
                    <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 rounded-lg border border-emerald-200/90 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-md text-[11px] font-mono text-emerald-800 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Bi-Directional ERP & Tally Sync Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filter Pills for 6 Capabilities */}
        <Reveal delay={240} className="mt-16 sm:mt-20 flex flex-col items-center">
          <div className="text-center mb-5">
            <span className="text-xs font-bold tracking-[.14em] uppercase text-purple-700">
              Complete Portfolio
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
              Explore Our Custom Engineering Capabilities
            </h3>
          </div>

          <div
            role="tablist"
            aria-label="Filter custom tool capabilities"
            className="flex flex-wrap justify-center gap-1.5 rounded-full border border-purple-100 bg-white p-1.5 shadow-sm backdrop-blur-md"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-10 cursor-pointer rounded-full px-5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white shadow-[0_4px_16px_-4px_rgba(124,58,237,0.45)]"
                      : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-purple-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 6 Capabilities Grid (Light Themed) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const meta = toolIcons[tool.originalIndex % toolIcons.length];
            const tags = toolTags[tool.originalIndex % toolTags.length];
            const cardImg = toolCardImages[tool.originalIndex % toolCardImages.length];
            const IconComponent = meta.icon;

            return (
              <Reveal key={tool.originalIndex} delay={tool.originalIndex * 60}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-purple-100/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10">
                  {/* Top Thumbnail Image with Light Badge */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-purple-100/50">
                    <Image
                      src={cardImg}
                      alt={tool.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 rounded-full border border-purple-200 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-purple-700 uppercase shadow-xs backdrop-blur-md">
                      {tool.tag}
                    </span>

                    {/* Right: Uptrix Brand Watermark */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-0.5 shadow-xs backdrop-blur-md">
                      <Image
                        src="/logo-mark.png"
                        alt="Uptrix"
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 rounded-xs object-contain"
                      />
                      <span className="text-[10px] font-semibold text-slate-800 tracking-wide">Uptrix Build</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 p-6 flex-1">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition duration-300 group-hover:scale-105"
                        style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 transition group-hover:text-purple-700">
                        {tool.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-600">
                      {tool.body}
                    </p>

                    {/* Feature Highlight Tags */}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] text-purple-700 transition group-hover:bg-purple-100/70"
                        >
                          <span className="text-teal-600 font-bold">✓</span> {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href="#consultation-form"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 transition group-hover:gap-2 group-hover:text-teal-600"
                    >
                      <span>Customise this tool</span>
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-xs font-mono text-slate-400">
                      0{tool.originalIndex + 1}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 4-Step Build Lifecycle Timeline */}
        <div id="how-we-build" className="mt-20 pt-16 border-t border-purple-100 scroll-mt-24">
          <Reveal className="flex flex-col items-center gap-3 text-center mb-12">
            <span className="text-xs font-bold tracking-[.14em] uppercase text-purple-700">
              How We Build For You
            </span>
            <h3 className="font-display text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight text-slate-900">
              From Problem Statement to Deployed Tool in 4 Sprints
            </h3>
            <p className="max-w-[620px] text-sm md:text-base text-slate-600">
              Clear delivery milestones with no ambiguity. You get full visibility from wireframe to production launch.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {content.processSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="relative flex flex-col gap-3 rounded-2xl border border-purple-100 bg-white p-6 shadow-xs transition duration-300 hover:border-purple-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-sm font-extrabold text-white bg-gradient-to-br from-purple-600 to-indigo-600 shadow-[0_4px_12px_-3px_rgba(124,58,237,0.4)]">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-purple-600 font-semibold">
                      Sprint 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Consultation CTA Banner (Redesigned in Light Mode) */}
        <Reveal delay={200} className="mt-16">
          <div
            id="consultation-form"
            className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.12)] backdrop-blur-xl"
          >
            {/* Ambient background glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-300/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl"
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-[580px] text-center lg:text-left">
                {/* Uptrix Brand Header */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Image
                    src="/logo-dark.png"
                    alt="Uptrix"
                    width={756}
                    height={235}
                    className="h-8 w-auto self-start"
                  />
                  <span className="h-4 w-px bg-purple-200" />
                  <span className="rounded-full bg-purple-100 border border-purple-200 px-3 py-1 text-xs font-mono font-semibold text-purple-700 uppercase tracking-wider">
                    Custom Engineering Lab
                  </span>
                </div>

                <h3 className="font-display text-[clamp(26px,3vw,38px)] font-extrabold text-slate-900 leading-tight">
                  Have a Unique Workflow or Need a Custom Tool?
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  Book a free technical discovery call with our solutions architects. We will audit your current process, share architectural wireframes, and give you a fixed timeline and quote.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2 text-xs text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Free Architectural Blueprint
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Fixed-Fee & Fixed-Timeline
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Full Source Code & IP
                  </span>
                </div>
              </div>

              {/* Consultation Form Card (Crisp Light Mode) */}
              <div className="w-full max-w-[460px] rounded-2xl border border-purple-200/80 bg-white p-6 shadow-xl">
                {formSent ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      <CheckIcon className="h-6 w-6" />
                    </span>
                    <h4 className="font-display text-xl font-bold text-slate-900">
                      Discovery Request Received!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                      Our lead software architect will review your requirements and reach out within 4 business hours with an initial blueprint.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSent(false)}
                      className="mt-4 text-xs font-semibold text-purple-700 hover:underline"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="flex flex-col gap-3.5">
                    <div>
                      <h4 className="font-display text-base font-bold text-slate-900">
                        Request Blueprint Consultation
                      </h4>
                      <p className="text-xs text-slate-500">
                        Get an engineer-led audit of your custom tool requirements.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="h2-consult-name" className="sr-only">Your Name</label>
                        <input
                          id="h2-consult-name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your Name *"
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="h2-consult-phone" className="sr-only">Phone Number</label>
                        <input
                          id="h2-consult-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="h2-consult-email" className="sr-only">Work Email</label>
                      <input
                        id="h2-consult-email"
                        name="email"
                        type="email"
                        required
                        placeholder="Work Email Address *"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="h2-consult-toolType" className="sr-only">Tool Type</label>
                      <select
                        id="h2-consult-toolType"
                        name="toolType"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-xs text-slate-900 focus:border-purple-500 focus:bg-white focus:outline-none transition"
                        defaultValue="Custom Approval Workflow"
                      >
                        <option value="Custom Approval Workflow">Custom Approval Workflow Engine</option>
                        <option value="Executive BI Cockpit">Executive BI Portal / Dashboard</option>
                        <option value="Tally or ERP Integration">Tally / ERP Real-Time Integration</option>
                        <option value="Mobile Field Force App">Mobile Field Force & GPS App</option>
                        <option value="AI Smart Bot">AI / WhatsApp Automation Bot</option>
                        <option value="Other Bespoke Tool">Other Bespoke Software</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="h2-consult-notes" className="sr-only">Workflow Details</label>
                      <textarea
                        id="h2-consult-notes"
                        name="message"
                        rows={2}
                        placeholder="Briefly describe what bottlenecks you want solved..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:bg-white focus:outline-none resize-none transition"
                      />
                    </div>

                    {formError && (
                      <p className="text-[11px] text-rose-600 font-medium">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      className="mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 font-bold text-xs uppercase tracking-wider text-white transition hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 cursor-pointer shadow-lg shadow-purple-500/25"
                    >
                      {isPending ? "Submitting Request..." : "Get Free Architecture Blueprint →"}
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
