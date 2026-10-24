"use client";

import React from "react";
import Image from "next/image";

export default function CollegeCrmIntelligence() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8faff] via-white to-[#f4f7fc] border-b border-slate-200/80 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,#e0e7ff_0%,#ede9fe_35%,transparent_70%)] opacity-70 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,#fef3c7_0%,transparent_70%)] opacity-40 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Main Graphic Container with High-Fidelity Shadow and Rounded Corners */}
        <div className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white/80 backdrop-blur-xs p-2 sm:p-4 md:p-6 shadow-[0_25px_70px_-15px_rgba(105,56,239,0.12)] border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_80px_-15px_rgba(105,56,239,0.18)]">
          
          {/* Main Visual Display */}
          <div className="relative w-full rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-xs">
            <Image
              src="/college/college-crm-intelligence.jpg"
              alt="Your College CRM. Built Around Your Business - AI Powered College CRM"
              width={2048}
              height={1364}
              priority
              quality={95}
              className="w-full h-auto object-contain block"
            />
          </div>

        </div>

        {/* Accessible SEO description for search engines and screen readers */}
        <div className="sr-only">
          <h2>Your College CRM. Built Around Your Business.</h2>
          <p>Don’t settle for a dashboard. Ask for intelligence.</p>
          <p>
            Every college tracks different numbers. Pulse uses AI to create dashboards around the metrics
            that matter to your institution — admissions, marketing, student engagement or operations.
          </p>
          <ul>
            <li>Revenue this month: ₹12.4L (+22%)</li>
            <li>Average Lead Cost: ₹480 (-8%)</li>
            <li>Lead Conversion: 18.60% (+18%)</li>
            <li>Cost per Acquisition: ₹2,850</li>
            <li>Leads requiring action: 94</li>
            <li>Pending payments: ₹4.2L</li>
          </ul>
          <blockquote>
            Google Ads is generating fewer leads than Meta, but converting 2.1X better.
            23 high-value leads haven’t received a follow-up today.
            Your cost per acquisition increased 18% this week.
          </blockquote>
          <p>Don’t just look at your numbers. Know what they mean.</p>
        </div>

      </div>
    </section>
  );
}
