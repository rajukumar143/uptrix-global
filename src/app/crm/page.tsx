import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AutoFlow from "@/components/crm/AutoFlow";
import HeroShots from "@/components/crm/HeroShots";
import HowSteps from "@/components/crm/HowSteps";
import LeakFunnel from "@/components/crm/LeakFunnel";
import PipelineCarousel from "@/components/crm/PipelineCarousel";
import PulseDemoForm from "@/components/crm/PulseDemoForm";
import PulseFaq from "@/components/crm/PulseFaq";
import PulseFooter from "@/components/crm/PulseFooter";
import Header from "@/components/site/Header";
import StoriesSection from "@/components/site/StoriesSection";
import Shot from "@/components/crm/Shot";
import { btnGhost, btnPrimary, container, eyebrow, h2, h2sm } from "@/components/crm/styles";
import WorkflowTour from "@/components/crm/WorkflowTour";
import { formatPrice } from "@/content/pricing";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().crm;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, type: "website", images: ["/logo-dark.png"] },
  };
}

// Colours by position. The text for every card comes from the admin dashboard.
const leadPlaceColors = ["text-[#11744f]", "text-[#11744f]", "text-[#9a4f0b]", "text-pulse"];
const queueColors = [
  { tint: "#e7f7ef", ink: "#11744f" },
  { tint: "#fdf0e3", ink: "#9a4f0b" },
  { tint: "#ececfd", ink: "#3b3fd4" },
];
const channelChipColors = ["bg-[#e7f7ef] text-[#11744f]", "bg-pulse-soft text-pulse", "bg-[#fdf0e3] text-[#9a4f0b]", "bg-[#f3f4f8] text-pulse-muted"];
const featureDots = ["#22b07d", "#22b07d", "#3b3fd4", "#3b3fd4", "#3b3fd4", "#f08a24", "#f08a24", "#8b4fd8", "#8b4fd8", "#e0457b"];
const audienceColors = ["#3b3fd4", "#22b07d", "#f08a24", "#8b4fd8"];
const channelColors = ["#22b07d", "#f08a24", "#3b3fd4", "#8b4fd8"];

const pick = <T,>(list: T[], i: number) => list[i % list.length];
const n2 = (i: number) => String(i + 1).padStart(2, "0");

function Btn({ label, link, className }: { label: string; link: string; className: string }) {
  if (!label) return null;
  return (
    <Link href={link || "#"} className={className}>
      {label}
    </Link>
  );
}

export default function CrmPage() {
  const all = getContent();
  const c = all.crm;
  const p = all.pricing;
  const w = c.whyPulse;
  const costSteps = w.costCard.steps.filter(Boolean);

  return (
    <>
      <Header content={all.header} />

      <main id="top">
        {/* Hero */}
        <section
          aria-labelledby="hero-h"
          className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,64px)] pt-[clamp(48px,8vw,96px)] pb-[clamp(56px,8vw,100px)]`}
        >
          <div className="flex max-w-[540px] flex-col gap-6">
            <div className={`flex items-center gap-2.5 ${eyebrow}`}>
              <span className="h-2 w-2 rounded-full bg-[#22b07d]" />
              {c.hero.eyebrow}
            </div>
            <h1 id="hero-h" className="text-[clamp(40px,5.6vw,64px)] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance">
              {c.hero.heading}
            </h1>
            <p className="text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{c.hero.body}</p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Btn label={c.hero.primaryButtonLabel} link={c.hero.primaryButtonLink} className={`${btnPrimary} shadow-[0_10px_24px_-10px_rgba(59,63,212,0.6)]`} />
              <Btn label={c.hero.secondaryButtonLabel} link={c.hero.secondaryButtonLink} className={btnGhost} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-pulse-muted">
              {c.hero.highlights.map((h, i) => (
                <span key={i} className="flex gap-5">
                  {i > 0 && (
                    <span aria-hidden className="text-[#c4c7d8]">
                      /
                    </span>
                  )}
                  <span className="whitespace-nowrap">{h}</span>
                </span>
              ))}
            </div>
          </div>
          <HeroShots tabs={c.hero.screenshotTabs} address={c.hero.browserAddress} labelPrefix={c.hero.screenshotLabelPrefix} />
        </section>

        {/* Problem */}
        <section aria-labelledby="problem-h" className="border-t border-pulse-line bg-white">
          <div
            className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,4vw,56px)] py-[clamp(48px,6vw,80px)]`}
          >
            <div className="flex flex-col gap-[18px]">
              <p className="font-code text-xs tracking-[0.08em] text-[#e0457b] uppercase">{c.problem.eyebrow}</p>
              <h2 id="problem-h" className="text-[clamp(30px,3.4vw,42px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">
                {c.problem.heading}
              </h2>
              <p className="max-w-[440px] text-base leading-relaxed text-pretty text-pulse-muted">{c.problem.body}</p>
              <div className="mt-1.5 flex flex-col gap-3.5 rounded-[20px] border border-dashed border-[#d4d7e4] bg-pulse-bg p-[clamp(18px,2.4vw,24px)]">
                <span className="font-code text-[11px] tracking-[0.08em] text-pulse-faint uppercase">{c.problem.boxTitle}</span>
                <div className="grid grid-cols-2 gap-3.5">
                  {c.problem.leadPlaces.map((l, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 rounded-[14px] border border-pulse-line bg-white px-4 py-3.5 shadow-[0_12px_24px_-16px_rgba(14,19,48,0.25)]"
                    >
                      <span className={`text-sm font-extrabold ${pick(leadPlaceColors, i)}`}>{l.title}</span>
                      <span className="text-xs font-semibold text-pulse-faint">{l.detail}</span>
                    </div>
                  ))}
                </div>
                <span className="flex items-center gap-2 text-[13px] font-bold text-[#c42a62]">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-[#e0457b]" />
                  {c.problem.boxFooter}
                </span>
              </div>
            </div>
            <ol className="m-0 flex list-none flex-col border-t border-pulse-line p-0">
              {c.problem.problems.map((pr, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-3 border-b border-pulse-line py-[13px] pr-2 transition-[padding] duration-200 hover:pl-2"
                >
                  <span className="text-xl leading-[1.2] font-extrabold tracking-[-0.03em] text-[#e8c5d2]">{n2(i)}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[17px] font-extrabold tracking-[-0.01em]">{pr.title}</h3>
                    <p className="text-sm leading-[1.45] text-pulse-subtle">{pr.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pipeline without Pulse / with Pulse */}
        <section aria-label={`${c.leakage.tabLabel} / ${c.withPulse.tabLabel}`} className="overflow-hidden bg-pulse-night text-white">
          <div className={`${container} py-[clamp(48px,6vw,88px)]`}>
            <PipelineCarousel labels={[c.leakage.tabLabel, c.withPulse.tabLabel]}>
              <div className="flex flex-col gap-[clamp(28px,4vw,48px)]">
                <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                  <div className="flex max-w-[560px] flex-col gap-3">
                    <p className="font-code text-xs tracking-[0.08em] text-[#a9abff] uppercase">{c.leakage.eyebrow}</p>
                    <h2 id="leak-h" className={h2sm}>
                      {c.leakage.heading}
                    </h2>
                  </div>
                  {c.leakage.statValue && (
                    <div className="flex items-center gap-4 rounded-2xl border border-[rgba(255,138,92,0.28)] bg-[rgba(255,138,92,0.1)] px-5 py-3.5">
                      <span className="text-[clamp(40px,4.5vw,54px)] leading-none font-extrabold tracking-[-0.04em] text-[#ff8a5c]">{c.leakage.statValue}</span>
                      <span className="max-w-[180px] text-[15px] leading-[1.35] font-semibold text-[#e3e4ff]">{c.leakage.statLabel}</span>
                    </div>
                  )}
                </div>
                <LeakFunnel stages={c.leakage.stages} leadsWord={c.leakage.leadsWord} lostLabel={c.leakage.lostLabel} />
                <p className="text-[13px] text-[#9a9ccc]">{c.leakage.footnote}</p>
              </div>
              <div className="flex flex-col gap-[clamp(28px,4vw,48px)]">
                <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                  <div className="flex max-w-[560px] flex-col gap-3">
                    <p className="font-code text-xs tracking-[0.08em] text-[#5fe0ad] uppercase">{c.withPulse.eyebrow}</p>
                    <h2 id="win-h" className={h2sm}>
                      {c.withPulse.heading}
                    </h2>
                  </div>
                  {c.withPulse.statValue && (
                    <div className="flex items-center gap-4 rounded-2xl border border-[rgba(34,176,125,0.35)] bg-[rgba(34,176,125,0.12)] px-5 py-3.5">
                      <span className="text-[clamp(40px,4.5vw,54px)] leading-none font-extrabold tracking-[-0.04em] text-[#5fe0ad]">{c.withPulse.statValue}</span>
                      <span className="max-w-[180px] text-[15px] leading-[1.35] font-semibold text-[#e3e4ff]">{c.withPulse.statLabel}</span>
                    </div>
                  )}
                </div>
                <LeakFunnel stages={c.withPulse.stages} leadsWord={c.withPulse.leadsWord} lostLabel={c.withPulse.lostLabel} tone="win" />
                <p className="text-[13px] text-[#9a9ccc]">{c.withPulse.footnote}</p>
              </div>
            </PipelineCarousel>
          </div>
        </section>

        {/* Before / after */}
        <section
          aria-labelledby="fix-h"
          className={`${container} grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] py-[clamp(48px,6vw,80px)] min-[860px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
        >
          <div className="flex max-w-[420px] flex-col gap-4">
            <p className={eyebrow}>{c.beforeAfter.eyebrow}</p>
            <h2 id="fix-h" className="text-[clamp(28px,3vw,36px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance">
              {c.beforeAfter.heading}
            </h2>
            <p className="text-base leading-relaxed text-pulse-muted">{c.beforeAfter.body}</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-[20px] border border-[#e1e3ee] bg-white shadow-[0_30px_60px_-45px_rgba(30,34,120,0.4)]">
            <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] gap-3 border-b border-[#eceef5] bg-pulse-bg px-[clamp(16px,2.5vw,24px)] py-3.5 font-code text-[11px] tracking-[0.08em] uppercase">
              <span className="text-pulse-faint">{c.beforeAfter.beforeColumnLabel}</span>
              <span />
              <span className="text-pulse">{c.beforeAfter.afterColumnLabel}</span>
            </div>
            <ul className="m-0 list-none p-0">
              {c.beforeAfter.rows.map((r, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] items-center gap-3 border-b border-[#f0f1f6] px-[clamp(16px,2.5vw,24px)] py-[11px]"
                >
                  <span className="text-[15px] font-semibold text-pulse-faint line-through decoration-[#d0d3e0]">{r.before}</span>
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-pulse-soft text-sm font-extrabold text-pulse">
                    →
                  </span>
                  <span className="flex items-center gap-2 text-[15px] font-extrabold">
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[#22b07d]" />
                    {r.after}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Follow-up automation */}
        <section aria-labelledby="hot-h" className="border-y border-pulse-line bg-white">
          <div
            className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,6vw,80px)] py-[clamp(64px,9vw,120px)]`}
          >
            <div className="flex flex-col gap-5">
              <p className={eyebrow}>{c.followUps.eyebrow}</p>
              <h2 id="hot-h" className={h2}>
                {c.followUps.heading}
              </h2>
              <p className="text-[19px] leading-[1.55] font-semibold text-[#2a2f4d]">{c.followUps.lead}</p>
              <p className="text-[17px] leading-relaxed text-pretty text-pulse-muted">{c.followUps.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {c.followUps.journey.map((j, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="rounded-lg border border-[#e1e3f5] bg-[#f1f2fb] px-3 py-2 text-[13px] font-bold text-[#2a2f4d]">{j}</span>
                    {i < c.followUps.journey.length - 1 && <Arrow />}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] border border-[#e1e3ee] bg-pulse-bg p-[clamp(16px,2.5vw,28px)] shadow-[0_30px_60px_-40px_rgba(30,34,120,0.35)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="font-code text-xs tracking-[0.08em] text-[#2a2f4d] uppercase">{c.followUps.queueTitle}</span>
                {c.followUps.sampleDataLabel && (
                  <span className="rounded-full border border-[#d9dbe6] px-[9px] py-[3px] text-[11px] font-bold text-pulse-faint">{c.followUps.sampleDataLabel}</span>
                )}
              </div>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {c.followUps.queue.map((q, i) => {
                  const col = pick(queueColors, i);
                  return (
                    <li key={i} className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-[14px] border border-pulse-line bg-white p-4">
                      <span
                        aria-hidden
                        className="grid h-11 w-11 place-items-center rounded-xl text-[15px] font-extrabold"
                        style={{ background: col.tint, color: col.ink }}
                      >
                        {q.initials}
                      </span>
                      <div className="flex min-w-0 flex-col gap-[3px]">
                        <span className="truncate text-[15px] font-bold">
                          {q.name} {q.course && <span className="font-semibold text-pulse-faint">· {q.course}</span>}
                        </span>
                        <span className="text-sm text-pulse-muted">{q.action}</span>
                      </div>
                      <span className="rounded-full px-2.5 py-[5px] text-xs font-bold whitespace-nowrap" style={{ background: col.tint, color: col.ink }}>
                        {q.when}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3.5 flex flex-wrap justify-between gap-3 text-[13px] font-semibold text-pulse-faint">
                <span>{c.followUps.queueFooterLeft}</span>
                <span>{c.followUps.queueFooterRight}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Four promises */}
        <section aria-labelledby="promise-h" className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,120px)]`}>
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className={eyebrow}>{w.eyebrow}</p>
            <h2 id="promise-h" className={h2}>
              {w.heading}
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
            <PromiseCard title={w.channelsCard.title} body={w.channelsCard.body}>
              <div className="flex flex-wrap gap-2.5">
                {w.channelsCard.chips.map((ch, i) => (
                  <Chip key={i} cls={pick(channelChipColors, i)}>
                    {ch}
                  </Chip>
                ))}
              </div>
            </PromiseCard>
            <PromiseCard title={w.counselorCard.title} body={w.counselorCard.body}>
              <div className="flex flex-col gap-2.5">
                {w.counselorCard.rows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[110px_minmax(0,1fr)_36px] items-center gap-3 text-sm font-semibold">
                    <span className="text-[#2a2f4d]">{r.name}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-[#eef0f6]">
                      <span className="block h-full rounded-full bg-pulse" style={{ width: `${Math.max(0, Math.min(100, r.barPercent))}%` }} />
                    </span>
                    <span className="text-right text-pulse-muted">{r.admissions}</span>
                  </div>
                ))}
                {w.counselorCard.note && <span className="text-xs text-[#8a8fa8]">{w.counselorCard.note}</span>}
              </div>
            </PromiseCard>
            <PromiseCard title={w.branchCard.title} body={w.branchCard.body}>
              <div className="grid grid-cols-3 gap-2">
                {w.branchCard.branches.map((b, i) => (
                  <span key={i} className="rounded-xl bg-[#f3f4f8] px-3 py-3.5 text-[13px] font-bold text-[#2a2f4d]">
                    {b}
                  </span>
                ))}
                {w.branchCard.summary && (
                  <span className="col-span-full rounded-xl bg-pulse-night p-3.5 text-center text-[13px] font-bold text-white">{w.branchCard.summary}</span>
                )}
              </div>
            </PromiseCard>
            <PromiseCard title={w.costCard.title} body={w.costCard.body}>
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                {costSteps.map((st, i) => {
                  const last = i === costSteps.length - 1;
                  return (
                    <span key={i} className="flex items-center gap-2">
                      <Chip cls={last ? "bg-pulse text-white" : i === 0 ? "bg-[#fdf0e3] text-[#9a4f0b]" : "bg-[#f3f4f8] text-[#2a2f4d]"}>{st}</Chip>
                      {!last && <Arrow />}
                    </span>
                  );
                })}
              </div>
            </PromiseCard>
          </div>
        </section>

        {/* Partners */}
        <section aria-labelledby="partners-h" className="border-y border-pulse-line bg-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-[clamp(40px,6vw,64px)]`}>
            <h2 id="partners-h" className="font-code text-xs font-medium tracking-[0.08em] text-pulse-faint uppercase">
              {c.partners.heading}
            </h2>
            <div className="flex flex-wrap items-center gap-x-[clamp(32px,5vw,72px)] gap-y-5 text-[clamp(20px,2.2vw,26px)] font-extrabold tracking-[-0.02em] text-[#3d4263]">
              {c.partners.names.map((n, i) => (
                <span key={i}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-h" className="border-y border-[#e3e5f3] bg-[#f1f2fb]">
          <div className={`${container} flex flex-col gap-[clamp(28px,4vw,40px)] py-[clamp(48px,6vw,88px)]`}>
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <div className="flex flex-col gap-3">
                <p className={eyebrow}>{c.howItWorks.eyebrow}</p>
                <h2 id="how-h" className={h2sm}>
                  {c.howItWorks.heading}
                </h2>
              </div>
              <p className="max-w-[400px] text-base leading-relaxed text-pulse-muted">{c.howItWorks.body}</p>
            </div>
            <HowSteps steps={c.howItWorks.steps} />
          </div>
        </section>

        {/* Features */}
        <section id="features" aria-labelledby="features-h" className="scroll-mt-18 border-t border-pulse-line bg-white">
          <div className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,120px)]`}>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className={eyebrow}>{c.features.eyebrow}</p>
              <h2 id="features-h" className={h2}>
                {c.features.heading}
              </h2>
              <p className="text-lg leading-relaxed text-pulse-muted">{c.features.body}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-stretch gap-5">
              <article className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-pulse-night p-[clamp(24px,3vw,36px)] text-white">
                <span className="font-code text-xs text-[#a9abff] uppercase">{c.features.mainCardTag}</span>
                <h3 className="text-[clamp(26px,3vw,34px)] font-extrabold tracking-[-0.02em]">{c.features.mainCardTitle}</h3>
                <p className="max-w-[440px] text-base leading-[1.55] text-[#cfd0f0]">{c.features.mainCardBody}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.features.mainCardChips.map((l, i) => (
                    <span key={i} className="rounded-lg bg-white/[0.08] px-2.5 py-1.5 text-[13px] font-semibold text-[#e3e4ff]">
                      {l}
                    </span>
                  ))}
                </div>
                <div className="mt-auto aspect-[16/10] overflow-hidden rounded-[14px]">
                  <Shot label={c.features.mainCardScreenshotLabel} dark />
                </div>
              </article>
              <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3 p-0">
                {c.features.items.map((f, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-2 rounded-2xl border border-pulse-line bg-[#fafbfd] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#b9bbf5]"
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden className="h-2 w-2 rounded-[2px]" style={{ background: pick(featureDots, i) }} />
                      <span className="font-code text-[11px] text-[#8a8fa8]">{String(i + 2).padStart(2, "0")}</span>
                    </span>
                    <h3 className="text-base font-extrabold tracking-[-0.01em]">{f.title}</h3>
                    <p className="text-sm leading-[1.45] text-pulse-subtle">{f.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Workflow tour */}
        <section aria-labelledby="tour-h" className="border-b border-pulse-line bg-white">
          <div className={`${container} pb-[clamp(64px,9vw,120px)]`}>
            <WorkflowTour content={c.workflowTour} />
          </div>
        </section>

        {/* Automation */}
        <section aria-labelledby="auto-h" className={`${container} flex flex-col gap-10 py-[clamp(64px,9vw,120px)]`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-6">
            <div className="flex flex-col gap-4">
              <p className={eyebrow}>{c.automation.eyebrow}</p>
              <h2 id="auto-h" className={h2}>
                {c.automation.heading}
              </h2>
            </div>
            <p className="max-w-[460px] text-[17px] leading-relaxed text-pulse-muted">{c.automation.body}</p>
          </div>
          <AutoFlow flow={c.automation.steps} />
        </section>

        {/* Analytics */}
        <section id="solutions" aria-labelledby="analytics-h" className="scroll-mt-18 bg-pulse-night text-white">
          <div className={`${container} flex flex-col gap-14 py-[clamp(64px,9vw,120px)]`}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(36px,5vw,64px)]">
              <div className="flex flex-col gap-[18px]">
                <p className="font-code text-xs tracking-[0.08em] text-[#a9abff] uppercase">{c.analytics.eyebrow}</p>
                <h2 id="analytics-h" className={h2}>
                  {c.analytics.heading}
                </h2>
                <p className="max-w-[460px] text-[17px] leading-relaxed text-[#cfd0f0]">{c.analytics.body}</p>
              </div>
              <ol className="m-0 flex list-none flex-col gap-2 p-0">
                {c.analytics.chain.map((a, i) => (
                  <li
                    key={i}
                    className={`grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3.5 rounded-xl border border-white/[0.08] px-[18px] py-3.5 ${
                      i === c.analytics.chain.length - 1 ? "bg-pulse" : "bg-white/5"
                    }`}
                  >
                    <span className="font-code text-xs text-[#a9abff]">{n2(i)}</span>
                    <span className="text-base font-bold">{a}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
              {c.analytics.screenshots.map((s, i) => (
                <div key={i} className="flex flex-col gap-3.5">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                    <Shot label={s.screenshotLabel} dark />
                  </div>
                  <h3 className="text-lg font-extrabold">{s.caption}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section aria-labelledby="who-h" className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,120px)]`}>
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className={eyebrow}>{c.audiences.eyebrow}</p>
            <h2 id="who-h" className={h2}>
              {c.audiences.heading}
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            {c.audiences.items.map((a, i) => (
              <article
                key={i}
                className="flex flex-col gap-3 rounded-[20px] border border-t-4 border-pulse-line bg-white p-7"
                style={{ borderTopColor: pick(audienceColors, i) }}
              >
                <h3 className="text-xl font-extrabold tracking-[-0.01em]">{a.title}</h3>
                <p className="text-[15px] leading-[1.55] text-pulse-subtle">{a.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Integrations + migration */}
        <section aria-labelledby="int-h" className="border-y border-pulse-line bg-white">
          <div className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-5 py-[clamp(64px,9vw,120px)]`}>
            <div className="flex flex-col gap-5 rounded-3xl border border-pulse-line bg-pulse-bg p-[clamp(24px,3.5vw,44px)]">
              <p className={eyebrow}>{c.integrations.eyebrow}</p>
              <h2 id="int-h" className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-extrabold tracking-[-0.02em]">
                {c.integrations.heading}
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">{c.integrations.body}</p>
              <div className="mt-auto grid grid-cols-2 gap-2.5">
                {c.integrations.channels.map((ch, i) => (
                  <span key={i} className="flex items-center gap-2.5 rounded-[14px] border border-pulse-line bg-white p-[18px] font-extrabold">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: pick(channelColors, i) }} />
                    {ch}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-3xl bg-pulse p-[clamp(24px,3.5vw,44px)] text-white">
              <p className="font-code text-xs tracking-[0.08em] text-[#d6d7ff] uppercase">{c.migration.eyebrow}</p>
              <h3 className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-extrabold tracking-[-0.02em]">{c.migration.heading}</h3>
              <p className="text-base leading-relaxed text-[#e3e4ff]">{c.migration.body}</p>
              <ol className="mt-auto flex list-none flex-col gap-2.5 p-0">
                {c.migration.steps.map((s, i) => (
                  <li key={i} className="flex items-center gap-3.5 rounded-xl bg-white/10 px-4 py-3.5 font-bold">
                    <span className="font-code text-xs text-[#d6d7ff]">{n2(i)}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="pricing-h" className={`${container} scroll-mt-18 py-[clamp(64px,9vw,120px)]`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-[clamp(32px,5vw,64px)] rounded-[28px] border border-[#e1e3ee] bg-white p-[clamp(28px,5vw,64px)]">
            <div className="flex flex-col gap-4">
              <p className={eyebrow}>{c.pricingTeaser.eyebrow}</p>
              <h2 id="pricing-h" className={h2}>
                {c.pricingTeaser.heading}
              </h2>
              <p className="max-w-[440px] text-[17px] leading-relaxed text-pulse-muted">{c.pricingTeaser.body}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Btn label={c.pricingTeaser.primaryButtonLabel} link={c.pricingTeaser.primaryButtonLink} className={btnPrimary} />
                <Btn label={c.pricingTeaser.secondaryButtonLabel} link={c.pricingTeaser.secondaryButtonLink} className={btnGhost} />
              </div>
            </div>
            <ul className="m-0 flex list-none flex-col p-0">
              {p.plans.map((pl, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4 border-b border-[#eceef5] py-[18px] text-base">
                  <span className="flex flex-col">
                    <span className="font-bold">{pl.name}</span>
                    <span className="text-sm text-pulse-subtle">{pl.usersNote}</span>
                  </span>
                  <span className="text-right">
                    <span className="text-2xl font-extrabold tracking-[-0.02em]">{formatPrice(p.currencySymbol, pl.price)}</span>{" "}
                    <span className="text-sm text-pulse-subtle">{p.priceSuffix}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <StoriesSection section={c.stories} />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-h" className="scroll-mt-18 border-t border-pulse-line bg-white">
          <div
            className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(32px,5vw,72px)] py-[clamp(64px,9vw,120px)]`}
          >
            <div className="flex flex-col gap-4">
              <p className={eyebrow}>{c.faq.eyebrow}</p>
              <h2 id="faq-h" className={h2}>
                {c.faq.heading}
              </h2>
              <p className="text-base leading-relaxed text-pulse-muted">
                {c.faq.prompt}{" "}
                {c.faq.linkLabel && (
                  <Link href={c.faq.linkLink || "#"} className="font-bold text-pulse hover:text-pulse-hover">
                    {c.faq.linkLabel}
                  </Link>
                )}
              </p>
            </div>
            <PulseFaq questions={c.faq.questions} />
          </div>
        </section>

        {/* Demo */}
        <section id="demo" aria-labelledby="demo-h" className="scroll-mt-18 bg-pulse-night text-white">
          <div
            className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,6vw,80px)] py-[clamp(64px,9vw,120px)]`}
          >
            <div className="flex flex-col gap-5">
              <Image src="/logo-dark.png" alt="" width={756} height={235} className="h-11 w-auto self-start rounded-xl bg-white px-3.5 py-2" />
              <h2 id="demo-h" className="text-[clamp(36px,5vw,56px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
                {c.demo.heading}
              </h2>
              <p className="max-w-[460px] text-lg leading-relaxed text-[#cfd0f0]">{c.demo.body}</p>
              <ul className="mt-2 flex list-none flex-col gap-2.5 p-0 text-base font-semibold text-[#e3e4ff]">
                {c.demo.points.map((s, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span aria-hidden className="text-[#22b07d]">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-[clamp(22px,3.5vw,40px)] text-pulse-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
              <PulseDemoForm text={c.demo.form} />
            </div>
          </div>
        </section>
      </main>

      <PulseFooter content={all.crmLayout.footer} />
    </>
  );
}

function PromiseCard({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-pulse-line bg-white p-[clamp(24px,3vw,40px)]">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-extrabold tracking-[-0.02em]">{title}</h3>
        <p className="text-base leading-[1.55] text-pulse-muted">{body}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </article>
  );
}

function Chip({ cls, children }: { cls: string; children: ReactNode }) {
  return <span className={`rounded-[10px] px-3.5 py-2.5 text-sm font-bold ${cls}`}>{children}</span>;
}

function Arrow() {
  return (
    <span aria-hidden className="text-[#a3a6c4]">
      →
    </span>
  );
}
