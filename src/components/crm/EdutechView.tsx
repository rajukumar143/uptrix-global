import Link from "next/link";
import Header from "@/components/site/Header";
import PulseFooter from "@/components/crm/PulseFooter";
import PulseFaq from "@/components/crm/PulseFaq";
import StoriesSection from "@/components/site/StoriesSection";
import CaseStudiesSection from "@/components/site/CaseStudiesSection";
import AdmissionsConsole from "@/components/crm/edutech/AdmissionsConsole";
import VerticalsSwitcher from "@/components/crm/edutech/VerticalsSwitcher";
import AdmissionsCalculator from "@/components/crm/edutech/AdmissionsCalculator";
import EdutechToolFeatures from "@/components/crm/edutech/EdutechToolFeatures";
import { btnPrimary, container, eyebrow, h2 } from "@/components/crm/styles";
import type { HeaderContent } from "@/content/header";
import type { IndustryContent } from "@/content/industries";
import type { CrmLayoutContent } from "@/content/crm";

interface EdutechViewProps {
  c: IndustryContent;
  header: HeaderContent;
  footer: CrmLayoutContent["footer"];
}

export default function EdutechView({ c, header, footer }: EdutechViewProps) {
  return (
    <>
      <Header content={header} />
      <main className="bg-white text-pulse-ink">
        {/* =========================================================================
            1. HERO SECTION (Admissions Command Center)
        ========================================================================== */}
        <section aria-labelledby="edutech-hero-h" className="relative overflow-hidden border-b border-pulse-line bg-gradient-to-b from-[#f4f6fc] via-[#fafbff] to-white text-pulse-ink pt-[clamp(60px,8vw,110px)] pb-[clamp(72px,10vw,130px)]">
          {/* Ambient Lighting Gradients */}
          <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,63,212,0.07),transparent_65%)] blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(34,176,125,0.06),transparent_65%)] blur-3xl" />

          <div className={`${container} relative flex flex-col gap-12 lg:gap-16`}>
            {/* Top Breadcrumb & Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-code text-pulse-subtle">
                <Link href="/" className="hover:text-pulse-ink transition">Home</Link>
                <span>/</span>
                <Link href="/crm" className="hover:text-pulse-ink transition">CRM</Link>
                <span>/</span>
                <span className="text-emerald-700 font-bold">EduTech</span>
              </nav>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 font-code font-bold tracking-wider text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-[#22b07d] animate-pulse" />
                ADMISSIONS CRM + CAMPUS ERP UNIFIED
              </div>
            </div>

            {/* Hero Main Grid */}
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Left Column: Headlines & Value Proposition */}
              <div className="flex flex-col gap-6 lg:col-span-6 xl:col-span-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pulse/20 bg-pulse-soft px-3.5 py-1.5 text-xs font-bold tracking-[0.08em] text-pulse uppercase font-code">
                  <span>🎓</span>
                  <span>SPECIALIZED EDTECH & ADMISSIONS CRM + ERP</span>
                </div>

                <h1
                  id="edutech-hero-h"
                  className="text-[clamp(36px,5vw,60px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance text-pulse-ink"
                >
                  Turn Every Student Enquiry into a{" "}
                  <span className="bg-gradient-to-r from-pulse via-[#1e7e5a] to-[#22b07d] bg-clip-text text-transparent">
                    Confirmed Admission.
                  </span>
                </h1>

                <p className="text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">
                  One purpose-built operating system for coaching academies, K-12 schools, and universities. Capture every enquiry, track counselor talk-time, boost demo class turnout, and recover tuition installments without spreadsheet chaos.
                </p>

                {/* Primary Actions */}
                <div className="mt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    href={c.hero.primaryButtonLink || "/crm#demo"}
                    className={`${btnPrimary} shadow-[0_14px_35px_-8px_rgba(59,63,212,0.5)] flex items-center gap-2.5 transition-transform hover:-translate-y-0.5`}
                  >
                    <span>{c.hero.primaryButtonLabel || "Book Admissions Walkthrough"}</span>
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

                {/* High-Impact Proof Points */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-pulse-line pt-6 sm:grid-cols-3">
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold tracking-tight text-pulse-ink">&lt; 30s</span>
                    <span className="text-xs font-semibold text-pulse-subtle">WhatsApp Prospectus</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-extrabold tracking-tight text-emerald-700">92%</span>
                    <span className="text-xs font-semibold text-pulse-subtle">Demo / Tour Turnout</span>
                  </div>
                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <span className="text-2xl font-extrabold tracking-tight text-pulse-ink">₹0</span>
                    <span className="text-xs font-semibold text-pulse-subtle">Fee Leakage</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Live Admissions Console Widget */}
              <div className="lg:col-span-6 xl:col-span-6">
                <AdmissionsConsole />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. THE PLATFORM MODULES (Direct From Uptrix Tool Architecture)
        ========================================================================== */}
        <EdutechToolFeatures />

        {/* =========================================================================
            4. VERTICAL SPECIALIZATION SWITCHER
        ========================================================================== */}
        <section aria-labelledby="verticals-h" className="border-b border-pulse-line bg-gradient-to-b from-[#fafbfe] to-white py-[clamp(64px,8vw,104px)]">
          <div className={`${container} flex flex-col gap-10`}>
            <div className="flex flex-col gap-3 text-center sm:text-left max-w-[700px]">
              <p className={eyebrow}>Tailored for Academic Leaders</p>
              <h2 id="verticals-h" className={h2}>
                Engineered for Your Specific Academic Model
              </h2>
              <p className="text-[17px] leading-relaxed text-pulse-muted">
                Whether you run an 8-branch coaching network, an elite K-12 school, or an engineering campus, Pulse adapts to your enrollment workflows.
              </p>
            </div>

            <VerticalsSwitcher />
          </div>
        </section>

        {/* =========================================================================
            5. THE 4-STAGE STUDENT ADMISSION LIFECYCLE
        ========================================================================== */}
        <section aria-labelledby="lifecycle-h" className="border-b border-pulse-line bg-pulse-bg py-[clamp(64px,9vw,112px)]">
          <div className={`${container} flex flex-col gap-12`}>
            <div className="flex flex-col gap-4 text-center max-w-[700px] mx-auto">
              <p className={eyebrow}>The Student Journey</p>
              <h2 id="lifecycle-h" className={h2}>
                Four Steps from First Click to Confirmed Enrollment
              </h2>
              <p className="text-[17px] leading-relaxed text-pulse-muted">
                Every interaction happens on the exact same student profile across branches, counselors, and departments.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Omnichannel Ingestion",
                  desc: "Connects Meta Ads, Google Ads, Shiksha, CollegeDunia, website forms, JustDial, and walk-in tablets automatically.",
                  pill: "Instant Capture",
                },
                {
                  step: "02",
                  title: "Smart Assignment",
                  desc: "Assigns the enquiry by course (e.g. JEE vs NEET), branch, or language. Sends automated WhatsApp prospectus.",
                  pill: "< 30s Routing",
                },
                {
                  step: "03",
                  title: "Counseling & Visits",
                  desc: "Counselors log calls, schedule demo classes and campus tours with automated WhatsApp reminder pins.",
                  pill: "92% Attendance",
                },
                {
                  step: "04",
                  title: "Enrolment & Fees",
                  desc: "Tracks document verification, scholarship test discounts, and token fee receipts until batch seats are confirmed.",
                  pill: "Seat Confirmed",
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 rounded-3xl border border-pulse-line bg-white p-6 shadow-2xs transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-code text-2xl font-extrabold text-pulse">{s.step}</span>
                    <span className="rounded-full bg-pulse-soft px-2.5 py-0.5 text-[11px] font-bold text-pulse">{s.pill}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-pulse-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-pulse-subtle">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. INTERACTIVE ADMISSIONS ROI & CAPACITY CALCULATOR
        ========================================================================== */}
        <section id="calculator" aria-labelledby="calc-h" className="border-b border-pulse-line bg-gradient-to-b from-[#f8f9fd] via-white to-[#f8f9fd] text-pulse-ink py-[clamp(64px,9vw,112px)]">
          <div className={`${container} flex flex-col gap-12`}>
            <div className="flex flex-col gap-4 text-center max-w-[700px] mx-auto">
              <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 font-code">
                💰 Admissions ROI Estimator
              </span>
              <h2 id="calc-h" className="text-[clamp(30px,4vw,46px)] leading-[1.1] font-extrabold tracking-tight text-pulse-ink text-balance">
                See How Much Recovered Revenue Pulse Brings to Your Campus
              </h2>
              <p className="text-[17px] leading-relaxed text-pulse-muted">
                See the measurable impact of reducing response time from hours to seconds and eliminating lost follow-ups.
              </p>
            </div>

            <AdmissionsCalculator />
          </div>
        </section>

        {/* =========================================================================
            7. HIGHLIGHTED CASE STUDIES CAROUSEL (EduTech Filtered)
        ========================================================================== */}
        <CaseStudiesSection productFilter="EduTech" />

        {/* =========================================================================
            8. CUSTOMER STORIES & VIDEO TESTIMONIALS (EduTech Filtered)
        ========================================================================== */}
        <StoriesSection section={c.stories} />

        {/* =========================================================================
            9. FREQUENTLY ASKED QUESTIONS (PulseFaq)
        ========================================================================== */}
        <section aria-labelledby="edutech-faq-h" className="border-t border-pulse-line bg-white py-[clamp(64px,9vw,112px)]">
          <div className={`${container} grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}>
            <div className="flex flex-col gap-4">
              <p className={eyebrow}>{c.faq.eyebrow}</p>
              <h2 id="edutech-faq-h" className={h2}>
                {c.faq.heading}
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                Have questions about WhatsApp API compliance, multi-campus setup, or student data privacy? Here is what education directors frequently ask.
              </p>
              <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-pulse-bg p-5 border border-pulse-line">
                <span className="font-bold text-sm text-pulse-ink">Need a tailored campus quote?</span>
                <p className="text-xs text-pulse-subtle">Talk with our education technology architects about multi-branch volume pricing.</p>
                <Link href="/crm/contact" className="mt-1 text-xs font-bold text-pulse hover:underline">
                  Contact EduTech Specialists →
                </Link>
              </div>
            </div>

            <PulseFaq questions={c.faq.questions} />
          </div>
        </section>

        {/* =========================================================================
            10. FINAL ADMISSIONS SEASON CALL TO ACTION
        ========================================================================== */}
        <section aria-labelledby="edutech-cta-h" className="relative overflow-hidden border-t border-pulse-line bg-gradient-to-b from-[#f4f6fc] via-white to-[#edf1fc] text-pulse-ink py-[clamp(72px,10vw,128px)]">
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,63,212,0.08),transparent_70%)] blur-3xl" />

          <div className={`${container} relative flex flex-col items-center gap-6 text-center max-w-[800px]`}>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider font-code">
              🎓 Ready for Your Peak Admission Cycle?
            </span>
            <h2 id="edutech-cta-h" className="text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-extrabold tracking-tight text-pulse-ink text-balance">
              Stop losing student enquiries. Fill your batches faster with Uptrix.
            </h2>
            <p className="max-w-[600px] text-lg leading-relaxed text-pulse-muted">
              Join schools, coaching academies, and universities running their highest-enrolling admission seasons on Uptrix EduTech CRM + ERP.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={c.cta.buttonLink || "/crm#demo"}
                className={`${btnPrimary} shadow-[0_12px_35px_-8px_rgba(59,63,212,0.5)] text-base font-bold`}
              >
                {c.cta.buttonLabel || "Book a 30-Minute Free Demo"}
              </Link>
              <Link
                href="/crm/pricing"
                className="rounded-xl border border-pulse-line bg-white px-6.5 py-4 text-base font-bold text-pulse-ink shadow-xs transition hover:border-pulse hover:bg-pulse-soft/30"
              >
                Explore Pricing Plans
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
