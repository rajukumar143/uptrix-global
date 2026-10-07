"use client";

import { useState } from "react";
import Link from "next/link";

const VERTICALS = [
  {
    id: "coaching",
    label: "Coaching & Test Prep",
    badge: "JEE • NEET • UPSC • Foundation",
    title: "Scale admissions across test-prep batches and multiple centers",
    description:
      "When exam seasons peak, inquiry volume surges 10x. Pulse ensures zero leads slip through the cracks, delivers instant WhatsApp test brochures, and coordinates demo lecture attendance.",
    stats: [
      { label: "Faster First Contact", value: "< 45s" },
      { label: "Demo Class Attendance", value: "86%" },
      { label: "Admission Conversion", value: "+38%" },
    ],
    features: [
      "Automated scholarship test hall tickets & score delivery on WhatsApp",
      "Demo lecture attendance tracking with 1-click counselor feedback",
      "Batch-wise seat limit alerts to prevent over-enrollment",
      "Campaign attribution by course (JEE Advanced vs Foundation)",
    ],
  },
  {
    id: "k12",
    label: "K-12 Private Schools",
    badge: "Pre-Primary to Grade 12",
    title: "Streamline campus tours, parent interactions, and grade admissions",
    description:
      "Provide parents with a polished, modern admissions experience. Schedule campus walkthroughs with Google Map location pins, manage sibling discounts, and track application documents.",
    stats: [
      { label: "Campus Tour Show-Up", value: "92%" },
      { label: "Document Collection", value: "3x Faster" },
      { label: "Seats Filled Early", value: "100%" },
    ],
    features: [
      "Campus visit appointment scheduler with automated parent reminders",
      "Checklist tracker for birth certificates, transfer certificates & photos",
      "Sibling inquiry linking for unified family communication",
      "Branch-by-branch admission seat dashboards for School Boards",
    ],
  },
  {
    id: "higher_ed",
    label: "Colleges & Universities",
    badge: "Undergrad • Postgrad • Professional",
    title: "Manage multi-department counseling and high-volume applicant pipelines",
    description:
      "Route prospective applicants to specialized academic counselors based on degree interests (Engineering, Management, Design). Monitor tele-calling queues and fee payments in real-time.",
    stats: [
      { label: "Counselor Capacity", value: "+55%" },
      { label: "Application Completion", value: "74%" },
      { label: "Lead Response Time", value: "12s" },
    ],
    features: [
      "Multi-course eligibility screening rules built into the inquiry form",
      "Integration with education portals: Shiksha, CollegeDunia & CollegeDekho",
      "Provisional admission token fee tracking & receipt delivery",
      "Centralized oversight for Deans, Chancellors, and Marketing Heads",
    ],
  },
  {
    id: "edtech",
    label: "EdTech & Bootcamps",
    badge: "Live Cohorts • Certification Programs",
    title: "High-velocity sales CRM for fast-moving digital skill academies",
    description:
      "Connect Meta, Google, and LinkedIn ad leads instantly into round-robin dialing queues. Follow up via automated WhatsApp drip messages and webinar reminder sequences.",
    stats: [
      { label: "Webinar Turnout", value: "+64%" },
      { label: "Lead-to-Call Interval", value: "< 30s" },
      { label: "Sales Team Talk Time", value: "4.2 hrs/day" },
    ],
    features: [
      "Real-time webhook sync from Meta Lead Forms, Webflow, and Zoom",
      "Automated syllabus PDF delivery via official WhatsApp Cloud API",
      "Inbound caller popup with complete student learning background",
      "Full ROAS attribution from ad spend to course fee settlement",
    ],
  },
];

export default function VerticalsSwitcher() {
  const [activeVertical, setActiveVertical] = useState(0);
  const currentVertical = VERTICALS[activeVertical];

  return (
    <div className="flex flex-col gap-8">
      {/* Vertical Pill Tabs */}
      <div className="flex flex-wrap gap-2.5 border-b border-pulse-line pb-4">
        {VERTICALS.map((v, idx) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveVertical(idx)}
            className={`cursor-pointer rounded-xl px-5 py-3 text-sm font-bold transition-all ${
              activeVertical === idx
                ? "bg-pulse text-white shadow-md shadow-pulse/25"
                : "border border-pulse-line bg-white text-pulse-subtle hover:border-pulse hover:text-pulse-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Active Vertical Showcase Card */}
      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-pulse-line bg-white p-6 shadow-[0_20px_50px_-30px_rgba(14,19,48,0.18)] sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <span className="w-fit rounded-full bg-pulse-soft px-3 py-1 font-code text-xs font-bold text-pulse uppercase">
            {currentVertical.badge}
          </span>
          <h3 className="text-2xl font-extrabold sm:text-3xl text-pulse-ink tracking-tight">
            {currentVertical.title}
          </h3>
          <p className="text-base leading-relaxed text-pulse-muted">
            {currentVertical.description}
          </p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-2">
            {currentVertical.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm font-semibold text-pulse-ink">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                  ✓
                </span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Column */}
        <div className="flex flex-col gap-4 rounded-2xl bg-pulse-bg p-6 lg:col-span-5 border border-[#e5e7f2]">
          <h4 className="font-code text-xs font-bold tracking-wider text-pulse uppercase">
            Proven Enrollment Benchmarks
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {currentVertical.stats.map((st, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-white p-4 border border-pulse-line shadow-2xs">
                <span className="text-sm font-bold text-pulse-subtle">{st.label}</span>
                <span className="text-2xl font-extrabold text-pulse">{st.value}</span>
              </div>
            ))}
          </div>
          <Link
            href="/crm#demo"
            className="mt-2 text-center text-sm font-bold text-pulse hover:text-pulse-hover"
          >
            See how {currentVertical.label} uses Pulse →
          </Link>
        </div>
      </div>
    </div>
  );
}
