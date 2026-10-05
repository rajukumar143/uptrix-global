import Link from "next/link";
import PulseFaq from "@/components/crm/PulseFaq";
import PulseFooter from "@/components/crm/PulseFooter";
import { btnPrimary, container, eyebrow, h2 } from "@/components/crm/styles";
import Header from "@/components/site/Header";
import type { HeaderContent } from "@/content/header";
import type { IndustryContent } from "@/content/industries";
import type { CrmLayoutContent } from "@/content/crm";

const stageColors = ["#7c80ff", "#5b8cff", "#22b07d", "#f0a24a", "#e0457b"];
const n2 = (i: number) => String(i + 1).padStart(2, "0");

/** The EduTech and Real Estate CRM pages. Both share this layout; the text comes from the admin dashboard. */
export default function IndustryPage({ c, header, footer }: { c: IndustryContent; header: HeaderContent; footer: CrmLayoutContent["footer"] }) {
  const stages = c.pipeline.stages.filter((s) => s.name);
  const top = Math.max(1, ...stages.map((s) => Number(s.count.replace(/[^\d.]/g, "")) || 0));

  return (
    <>
      <Header content={header} />
      <main>
        {/* Hero */}
        <section aria-labelledby="ind-hero-h" className="relative overflow-hidden bg-pulse-night text-white">
          <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,128,255,0.35),transparent_65%)]" />
          <div
            className={`${container} relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,5vw,72px)] pt-[clamp(56px,8vw,104px)] pb-[clamp(64px,9vw,112px)]`}
          >
            <div className="flex max-w-[560px] flex-col gap-6">
              <p className="flex items-center gap-2.5 font-code text-xs tracking-[0.08em] text-[#b8baff] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#22b07d]" />
                {c.hero.eyebrow}
              </p>
              <h1 id="ind-hero-h" className="text-[clamp(38px,5.4vw,62px)] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance">
                {c.hero.heading}
              </h1>
              <p className="text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-[#cfd0f0]">{c.hero.body}</p>
              <div className="mt-1 flex flex-wrap gap-3">
                {c.hero.primaryButtonLabel && (
                  <Link href={c.hero.primaryButtonLink || "#"} className={`${btnPrimary} shadow-[0_12px_30px_-10px_rgba(124,128,255,0.8)]`}>
                    {c.hero.primaryButtonLabel}
                  </Link>
                )}
                {c.hero.secondaryButtonLabel && (
                  <Link
                    href={c.hero.secondaryButtonLink || "#"}
                    className="rounded-xl border border-white/25 px-6 py-4 text-base font-bold whitespace-nowrap text-white hover:border-white/60"
                  >
                    {c.hero.secondaryButtonLabel}
                  </Link>
                )}
              </div>
              <ul className="mt-2 flex flex-col gap-2.5 text-[15px] font-semibold text-[#e4e5fb]">
                {c.hero.points.filter(Boolean).map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#22b07d]/20 text-xs text-[#5fe0ad]">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {stages.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-[clamp(20px,3vw,32px)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-lg font-extrabold">{c.pipeline.title}</p>
                  <span className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    ))}
                  </span>
                </div>
                <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {stages.map((s, i) => {
                    const n = Number(s.count.replace(/[^\d.]/g, "")) || 0;
                    const color = stageColors[i % stageColors.length];
                    return (
                      <li key={i} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-[15px] font-semibold">
                          <span className="text-[#e4e5fb]">{s.name}</span>
                          <span className="font-code text-sm text-white">{s.count}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full" style={{ width: `${Math.max(6, (n / top) * 100)}%`, background: color }} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </section>

        {/* Problems */}
        <section aria-labelledby="ind-problems-h" className="border-b border-pulse-line bg-white">
          <div className={`${container} flex flex-col gap-10 py-[clamp(64px,9vw,104px)]`}>
            <div className="flex max-w-[720px] flex-col gap-4">
              <p className="font-code text-xs tracking-[0.08em] text-[#e0457b] uppercase">{c.problems.eyebrow}</p>
              <h2 id="ind-problems-h" className={h2}>
                {c.problems.heading}
              </h2>
            </div>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 p-0">
              {c.problems.items.map((p, i) => (
                <li key={i} className="flex flex-col gap-3 rounded-[20px] border border-pulse-line bg-pulse-bg p-7">
                  <span className="text-2xl font-extrabold tracking-[-0.03em] text-[#e8c5d2]">{n2(i)}</span>
                  <h3 className="text-xl font-extrabold tracking-[-0.01em]">{p.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-pulse-subtle">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="ind-features-h">
          <div className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,112px)]`}>
            <div className="flex max-w-[720px] flex-col gap-4">
              <p className={eyebrow}>{c.features.eyebrow}</p>
              <h2 id="ind-features-h" className={h2}>
                {c.features.heading}
              </h2>
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5 p-0">
              {c.features.items.map((f, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-3 rounded-[20px] border border-pulse-line bg-white p-7 shadow-[0_18px_40px_-30px_rgba(14,19,48,0.35)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span aria-hidden className="grid h-11 w-11 place-items-center rounded-xl text-sm font-extrabold text-white" style={{ background: stageColors[i % stageColors.length] }}>
                    {n2(i)}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-[-0.01em]">{f.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-pulse-subtle">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Journey */}
        <section aria-labelledby="ind-journey-h" className="border-y border-pulse-line bg-white">
          <div className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,104px)]`}>
            <div className="flex max-w-[720px] flex-col gap-4">
              <p className={eyebrow}>{c.journey.eyebrow}</p>
              <h2 id="ind-journey-h" className={h2}>
                {c.journey.heading}
              </h2>
            </div>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-6 p-0">
              {c.journey.steps.map((s, i) => (
                <li key={i} className="flex flex-col gap-3 border-t-2 border-pulse pt-5">
                  <span className="font-code text-xs text-pulse">STEP {n2(i)}</span>
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-pulse-subtle">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Proof */}
        {c.proof.heading && (
          <section aria-labelledby="ind-proof-h">
            <div className={`${container} py-[clamp(56px,8vw,96px)]`}>
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-pulse-soft p-[clamp(28px,4vw,48px)] md:flex-row md:items-center">
                <div className="flex max-w-[620px] flex-col gap-3">
                  <h2 id="ind-proof-h" className="text-[clamp(24px,2.6vw,32px)] leading-tight font-extrabold tracking-[-0.02em] text-balance">
                    {c.proof.heading}
                  </h2>
                  <p className="text-base leading-relaxed text-pulse-muted">{c.proof.body}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {c.proof.caseStudiesLabel && (
                    <Link href={c.proof.caseStudiesLink || "#"} className={btnPrimary}>
                      {c.proof.caseStudiesLabel}
                    </Link>
                  )}
                  {c.proof.videosLabel && (
                    <Link
                      href={c.proof.videosLink || "#"}
                      className="rounded-xl border border-[#c9cbf3] bg-white px-6 py-4 text-base font-bold whitespace-nowrap text-pulse-ink hover:border-pulse"
                    >
                      ▶ {c.proof.videosLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section aria-labelledby="ind-faq-h" className="border-t border-pulse-line bg-white">
          <div className={`${container} grid gap-[clamp(32px,5vw,72px)] py-[clamp(64px,9vw,104px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]`}>
            <div className="flex flex-col gap-4">
              <p className={eyebrow}>{c.faq.eyebrow}</p>
              <h2 id="ind-faq-h" className={h2}>
                {c.faq.heading}
              </h2>
            </div>
            <PulseFaq questions={c.faq.questions} />
          </div>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="ind-cta-h" className="bg-pulse-night text-white">
          <div className={`${container} flex flex-col items-center gap-5 py-[clamp(64px,9vw,104px)] text-center`}>
            <h2 id="ind-cta-h" className="max-w-[760px] text-[clamp(30px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">
              {c.cta.heading}
            </h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-[#cfd0f0]">{c.cta.body}</p>
            {c.cta.buttonLabel && (
              <Link href={c.cta.buttonLink || "#"} className={`${btnPrimary} mt-2`}>
                {c.cta.buttonLabel}
              </Link>
            )}
          </div>
        </section>
      </main>
      <PulseFooter content={footer} />
    </>
  );
}
