"use client";

import { useState } from "react";
import Link from "next/link";
import { btnPrimary } from "@/components/crm/styles";

export default function AdmissionsCalculator() {
  const [enquiries, setEnquiries] = useState(1200);
  const [courseFee, setCourseFee] = useState(65000);

  // Computed ROI
  const currentConversionRate = 0.08; // 8% standard
  const improvedConversionRate = 0.125; // 12.5% with Pulse
  const extraAdmissions = Math.round(enquiries * (improvedConversionRate - currentConversionRate));
  const extraRevenue = extraAdmissions * courseFee;
  const hoursSaved = Math.round((enquiries * 12) / 60); // 12 minutes saved per lead

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="grid grid-cols-1 gap-10 rounded-3xl border border-[#dfe3f2] bg-white p-6 sm:p-10 shadow-[0_24px_60px_-20px_rgba(20,28,80,0.12)] lg:grid-cols-12 lg:items-center">
      {/* Sliders Input Column */}
      <div className="flex flex-col gap-8 lg:col-span-7">
        {/* Slider 1: Enquiries */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label htmlFor="enq-slider" className="text-base font-bold text-pulse-ink">
              Monthly Admissions Enquiries:
            </label>
            <span className="font-code text-xl font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              {enquiries.toLocaleString()} leads
            </span>
          </div>
          <input
            id="enq-slider"
            type="range"
            min="100"
            max="5000"
            step="50"
            value={enquiries}
            onChange={(e) => setEnquiries(Number(e.target.value))}
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

        <div className="rounded-2xl bg-[#f8f9fd] p-4 text-xs text-pulse-muted border border-[#e2e6f4]">
          <p>
            💡 <strong>Calculation basis:</strong> Moving from manual Excel tracking (avg. 8% inquiry conversion) to automated WhatsApp + prompt counselor assignment (avg. 12.5% conversion).
          </p>
        </div>
      </div>

      {/* Calculated Outputs Card */}
      <div className="flex flex-col gap-6 rounded-2xl border border-emerald-300 bg-gradient-to-b from-emerald-50/80 to-[#f5fbf8] p-6 sm:p-8 lg:col-span-5 shadow-xs">
        <div className="flex flex-col gap-1 border-b border-emerald-200/80 pb-5">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-code">
            Projected Extra Admissions
          </span>
          <span className="text-4xl sm:text-5xl font-extrabold text-pulse-ink">
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

        <div className="flex items-center justify-between text-xs text-pulse-muted">
          <span>Counselor time saved:</span>
          <span className="font-code font-bold text-pulse-ink text-sm">~{hoursSaved} hrs/mo</span>
        </div>

        <Link
          href="/crm#demo"
          className={`${btnPrimary} text-center shadow-md shadow-pulse/25`}
        >
          Book Demo & Unlock This ROI →
        </Link>
      </div>
    </div>
  );
}
