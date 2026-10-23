"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import type { HomeContent } from "@/content/home";
import Reveal from "@/components/Reveal";
import { submitLead } from "@/app/actions/lead";

// Zero-dependency SVG Icons
function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BoltIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ServerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
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

// Logo Colors Only (Blue #1f5fd6, Teal #0f8b8d, Green #5db833, Orange #ff8a00, Pink #ec1c64, Indigo #4f46e5)
const toolIcons = [
  { icon: WorkflowIcon, color: "#1f5fd6", bg: "rgba(31, 95, 214, 0.08)", border: "rgba(31, 95, 214, 0.2)" },
  { icon: DashboardPortalIcon, color: "#0f8b8d", bg: "rgba(15, 139, 141, 0.08)", border: "rgba(15, 139, 141, 0.2)" },
  { icon: IntegrationIcon, color: "#4f46e5", bg: "rgba(79, 70, 229, 0.08)", border: "rgba(79, 70, 229, 0.2)" },
  { icon: AiBotIcon, color: "#ec1c64", bg: "rgba(236, 28, 100, 0.08)", border: "rgba(236, 28, 100, 0.2)" },
  { icon: SmartphoneIcon, color: "#ff8a00", bg: "rgba(255, 138, 0, 0.08)", border: "rgba(255, 138, 0, 0.2)" },
  { icon: IndustryModuleIcon, color: "#5db833", bg: "rgba(93, 184, 51, 0.08)", border: "rgba(93, 184, 51, 0.2)" },
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


const categories = ["All Custom Tools", "Workflow & Portals", "Integrations & AI", "Mobile & Niche Ops"];

export default function Home2CustomTools({
  content,
}: {
  content: HomeContent["customToolsSection"];
}) {
  const [activeCategory, setActiveCategory] = useState("All Custom Tools");

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
      className="relative overflow-hidden py-20 sm:py-28 bg-[#f8fafc] border-y border-slate-200"
    >
      <div className="relative mx-auto max-w-[1240px] px-6">
        {/* Section Header & Category Filter */}
        <Reveal delay={80} className="flex flex-col items-center">
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-[.14em] uppercase text-[#1f5fd6]">
              Complete Portfolio
            </span>
            <h2
              id="custom-tools-heading"
              className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900"
            >
              Explore Our Custom Engineering Capabilities
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter custom tool capabilities"
            className="flex flex-wrap justify-center gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-2xs"
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
                      ? "bg-[#1f5fd6] text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 6 Capabilities Grid (Solid Logo Colors Only) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const tags = toolTags[tool.originalIndex % toolTags.length];
            const cardImg = toolCardImages[tool.originalIndex % toolCardImages.length];

            return (
              <Reveal key={tool.originalIndex} delay={tool.originalIndex * 60}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#1f5fd6]/50 hover:shadow-lg">
                  {/* Top Thumbnail Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                    <Image
                      src={cardImg}
                      alt={tool.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 rounded-full border border-slate-200 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[#1f5fd6] uppercase shadow-xs">
                      {tool.tag}
                    </span>

                    {/* Right: Uptrix Brand Watermark */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-0.5 shadow-xs">
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
                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-slate-900 transition group-hover:text-[#1f5fd6]">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-600">
                      {tool.body}
                    </p>

                    {/* Feature Highlight Tags */}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {tags.map((tg, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] text-[#1f5fd6]"
                        >
                          <CheckIcon className="h-2.5 w-2.5 text-[#0f8b8d]" /> <span>{tg}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href="#consultation-form"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f5fd6] transition group-hover:gap-2 group-hover:text-[#0f8b8d]"
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
        <div id="how-we-build" className="mt-20 pt-16 border-t border-slate-200 scroll-mt-24">
          <Reveal className="flex flex-col items-center gap-2.5 text-center mb-12">
            <h3 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-tight text-slate-900">
              Built & Deployed in <span className="text-[#1f5fd6]">4 Sprints</span>
            </h3>
            <p className="max-w-[520px] text-sm md:text-[15px] text-slate-600">
              Clear milestones and full visibility from wireframe to launch.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {content.processSteps.map((step, idx) => {
              // Solid Logo Palette per Milestone Card: Blue (#1f5fd6), Teal (#0f8b8d), Indigo (#4f46e5), Green (#5db833)
              const sprintConfigs = [
                {
                  color: "#1f5fd6",
                  borderHover: "hover:border-[#1f5fd6]",
                  duration: "Week 01",
                  phase: "Discovery & Scope",
                  deliverables: ["Architecture Blueprint", "API & Schema Specs"],
                },
                {
                  color: "#0f8b8d",
                  borderHover: "hover:border-[#0f8b8d]",
                  duration: "Week 02",
                  phase: "UI/UX Prototype",
                  deliverables: ["Figma Clickable Prototype", "User Flow Validation"],
                },
                {
                  color: "#4f46e5",
                  borderHover: "hover:border-[#4f46e5]",
                  duration: "Weeks 03–04",
                  phase: "Sprint Build & QA",
                  deliverables: ["Staging Deployment", "ERP & DB Integrations"],
                },
                {
                  color: "#5db833",
                  borderHover: "hover:border-[#5db833]",
                  duration: "Week 05+",
                  phase: "Go-Live & SLA",
                  deliverables: ["Production Launch", "24/7 SLA & Team Training"],
                },
              ];

              const cfg = sprintConfigs[idx % sprintConfigs.length];

              return (
                <Reveal key={idx} delay={idx * 80} className="h-full">
                  <div
                    className={`group relative flex flex-col justify-between h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm ${cfg.borderHover} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left`}
                  >
                    <div>
                      {/* Top Header: Stylized Number Badge & Duration Tag */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="grid h-10 w-10 place-items-center rounded-xl font-display text-sm font-black text-white shadow-xs transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: cfg.color }}
                        >
                          {step.step}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                          {cfg.duration}
                        </span>
                      </div>

                      {/* Milestone Phase Tag */}
                      <div className="mt-4 font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                        {cfg.phase}
                      </div>

                      {/* Title */}
                      <h4 className="mt-1 font-display text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                        {step.title}
                      </h4>

                      {/* Narrative */}
                      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {step.body}
                      </p>
                    </div>

                    {/* Bottom Area: Deliverables Checklist & Phase Progress Bar */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col gap-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Deliverables
                        </div>
                        <ul className="space-y-1">
                          {cfg.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <span
                                className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full text-white"
                                style={{ backgroundColor: cfg.color }}
                              >
                                <CheckIcon className="h-2 w-2" />
                              </span>
                              <span className="truncate font-medium">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 4-Segment Milestone Progress Bar */}
                      <div className="pt-2 border-t border-slate-100/60 flex items-center gap-1">
                        {[0, 1, 2, 3].map((seg) => (
                          <div
                            key={seg}
                            className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: seg <= idx ? cfg.color : "#e2e8f0",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom Consultation CTA Banner (Solid Colors Only, Zero Gradients) */}
        <Reveal delay={200} className="mt-16">
          <div
            id="consultation-form"
            className="scroll-mt-24 relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl"
          >
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
                  <span className="h-4 w-px bg-slate-200" />
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-mono font-semibold text-[#1f5fd6] uppercase tracking-wider">
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
                    <span className="text-[#0f8b8d] font-bold">✓</span> Free Architectural Blueprint
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[#0f8b8d] font-bold">✓</span> Fixed-Fee & Fixed-Timeline
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[#0f8b8d] font-bold">✓</span> Full Source Code & IP
                  </span>
                </div>
              </div>

              {/* Consultation Form Card */}
              <div className="w-full max-w-[460px] rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
                {formSent ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-[#0f8b8d] border border-teal-200">
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
                      className="mt-4 text-xs font-semibold text-[#1f5fd6] hover:underline"
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
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1f5fd6] focus:outline-none transition"
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
                          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1f5fd6] focus:outline-none transition"
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
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1f5fd6] focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label htmlFor="h2-consult-toolType" className="sr-only">Tool Type</label>
                      <select
                        id="h2-consult-toolType"
                        name="toolType"
                        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:border-[#1f5fd6] focus:outline-none transition"
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
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 placeholder-slate-400 focus:border-[#1f5fd6] focus:outline-none resize-none transition"
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
                      className="mt-1 h-11 w-full rounded-xl bg-[#1f5fd6] hover:bg-[#184cb0] font-bold text-xs uppercase tracking-wider text-white transition disabled:opacity-60 cursor-pointer shadow-md shadow-[#1f5fd6]/25"
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
