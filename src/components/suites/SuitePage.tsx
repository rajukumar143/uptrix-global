import Link from "next/link";
import PulseFooter from "@/components/crm/PulseFooter";
import HrmsDemoForm from "@/components/hrms/HrmsDemoForm";
import StickyDemoCta from "@/components/hrms/StickyDemoCta";
import HrmsHeader from "@/components/hrms-home/HrmsHeader";
import { APP_URL } from "@/content/hrms";
import { SUITES, type Suite } from "@/content/suites";
import { getContent } from "@/lib/content-store";
import { Estimator, ModuleBoard, Walkthrough } from "./SuiteInteractive";
import { Glyph, sparkPoints } from "./parts";

const container = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const sec = "scroll-mt-24 py-20 sm:py-28";
const kicker = "inline-flex items-center gap-2 text-[13px] font-extrabold";
const h2 = "font-semibold leading-[1.06] tracking-[-0.03em] text-[#101828] text-balance";
const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";

export default function SuitePage({ suite }: { suite: Suite }) {
  const { crmLayout } = getContent();
  const otherSuites = Object.values(SUITES).filter((s) => s.key !== suite.key);

  return (
    <div className="bg-[#F3F6FB] font-sans text-[#475467] antialiased">
      <HrmsHeader />

      <main>
        {/* 1. HERO */}
        <section id="hero" className="relative overflow-x-clip pt-28 pb-24 sm:pt-36" style={{ background: suite.heroBg }}>
          <div className={`${container} flex flex-wrap items-center gap-14`}>
            <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-6">
              <nav aria-label="Breadcrumb" className="flex gap-2 text-[13px] text-[#667085]">
                <Link href="/" className="hover:text-[#101828]">
                  Home
                </Link>
                <span aria-hidden="true">›</span>
                <span className="font-bold text-[#101828]">{suite.name}</span>
              </nav>
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(16,24,40,0.3)]" style={{ color: suite.accent }}>
                  <Glyph d={suite.icon} size={20} />
                </span>
                <span className="text-[15px] font-extrabold text-[#101828]">{suite.eyebrow}</span>
              </span>
              <h1 className="font-semibold leading-[1.02] tracking-[-0.035em] text-[#101828] text-[clamp(40px,5.4vw,68px)] text-balance">
                {suite.h1}
                <span className="bg-[linear-gradient(90deg,#F0206E_0%,#FF9609_40%,#0067CC_100%)] bg-clip-text text-transparent">{suite.h1Accent}</span>
              </h1>
              <p className="max-w-[520px] text-lg leading-relaxed text-[#475467] sm:text-[19px]">{suite.lead}</p>
              <div className="flex flex-wrap gap-3">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 font-bold text-white" style={{ background: suite.accent }}>
                  Explore the live demo
                  <span aria-hidden="true">→</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href="#demo" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 font-bold text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] hover:shadow-[inset_0_0_0_1px_#101828]">
                  Book a demo
                </a>
              </div>
            </div>

            <div role="img" aria-label={`Sample live numbers for the ${suite.name}`} className={`${panel} flex min-w-0 max-w-[480px] flex-[1_1_400px] flex-col p-6`}>
              <span className="flex items-center justify-between pb-2.5">
                <span className="text-sm font-extrabold text-[#101828]">{suite.statsCaption}</span>
                <span className="rounded-lg bg-[#E6F4E0] px-2.5 py-1 text-xs font-extrabold text-[#2E6B1E]">Live</span>
              </span>
              {suite.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 border-t border-[#EEF2F7] py-4">
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[13px] text-[#667085]">{s.label}</span>
                    <span className="font-semibold tracking-[-0.02em] text-[#101828]" style={{ fontSize: 28 }}>
                      {s.value}
                    </span>
                    <span className="text-xs font-bold" style={{ color: s.up ? "#2E6B1E" : "#8A4600" }}>
                      {s.delta}
                    </span>
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 120 40" preserveAspectRatio="none" className="h-10 w-[120px] shrink-0">
                    <polyline points={sparkPoints(s.series)} fill="none" stroke={suite.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. MODULES */}
        <section className={`${sec} bg-[#F3F6FB]`} style={{ paddingTop: 64 }} aria-labelledby="modules-title">
          <div className={container}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div className="flex max-w-[640px] flex-col gap-3.5">
                <span className={`${kicker} text-[#3F289D]`} style={{ color: suite.accent }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" />
                  Modules
                </span>
                <h2 id="modules-title" className={`${h2} text-[clamp(30px,4vw,46px)]`}>
                  {suite.modulesTitle}
                </h2>
              </div>
              <p className="max-w-[360px] text-[15px] leading-relaxed text-[#667085]">{suite.modulesLead}</p>
            </div>
            <ModuleBoard suite={suite} />
          </div>
        </section>

        {/* 3. WALKTHROUGH */}
        <section className={`${sec} bg-white`} aria-labelledby="walk-title">
          <div className={container}>
            <div className="mb-8 flex flex-col gap-3.5">
              <span className={kicker} style={{ color: suite.accent }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" />
                Walkthrough
              </span>
              <h2 id="walk-title" className={`${h2} text-[clamp(30px,4vw,46px)]`}>
                {suite.walkthroughTitle}
              </h2>
            </div>
            <Walkthrough suite={suite} />
          </div>
        </section>

        {/* 4. TIME BACK */}
        <section className={sec} aria-labelledby="time-title">
          <div className={container}>
            <h2 id="time-title" className="sr-only">
              Estimated time back
            </h2>
            <Estimator suite={suite} />
          </div>
        </section>

        {/* 5. CONNECTIONS */}
        <section className={`${sec} bg-white`} aria-labelledby="connected-title">
          <div className={container}>
            <div className="mb-9 flex max-w-[700px] flex-col gap-3.5">
              <span className={kicker} style={{ color: suite.accent }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" />
                Connected
              </span>
              <h2 id="connected-title" className={`${h2} text-[clamp(30px,4vw,46px)]`}>
                Data flows between suites — automatically.
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
              {suite.connections.map((c) => (
                <Link key={c.title} href={c.href} className="flex items-center gap-5 rounded-[20px] border border-[#E4E9F2] bg-white p-7 text-[#101828] transition hover:border-[#C6D0E1]">
                  <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl" style={{ background: suite.soft, color: suite.accent }}>
                    <Glyph d={c.icon} size={22} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[15px] font-extrabold">{c.title}</span>
                    <span className="text-sm text-[#667085]">{c.text}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-[#98A2B3]">
                    <Glyph d="M5 12h14M13 6l6 6-6 6" size={16} stroke={2.2} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. DEMO */}
        <section id="demo" className="scroll-mt-24 bg-[#F3F6FB] py-20 sm:py-28" aria-labelledby="demo-title">
          <div className={container}>
            <div className={`${panel} flex flex-wrap gap-3 p-3`}>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5 rounded-[20px] bg-[#F6F3FF] p-10 sm:p-12">
                <span className={kicker} style={{ color: suite.accent }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" />
                  Book a demo
                </span>
                <h2 id="demo-title" className={`${h2} text-[clamp(30px,4vw,46px)]`}>
                  See the {suite.name} with your own team.
                </h2>
                <p className="text-base leading-relaxed text-[#475467]">
                  Tell us a little about your team and we’ll walk you through Uptrix with your own use cases — or jump straight into the live demo.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["30-minute walkthrough", "Setup help included", "1-click live demo, no sign-up"].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-[#101828]">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-white" style={{ background: suite.accent }}>
                        <Glyph d="M20 6 9 17l-5-5" size={12} stroke={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="mt-auto font-bold" style={{ color: suite.accent }}>
                  Or open the live demo →
                </a>
              </div>
              <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-8 sm:p-10">
                <HrmsDemoForm />
              </div>
            </div>

            <nav aria-label="Other suites" className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {otherSuites.map((s) => (
                <Link key={s.key} href={s.path} className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 text-sm font-bold text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] hover:shadow-[inset_0_0_0_1px_#101828]">
                  {s.name} →
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>

      <StickyDemoCta label="Book a demo" />
      <PulseFooter content={crmLayout.footer} />
    </div>
  );
}
