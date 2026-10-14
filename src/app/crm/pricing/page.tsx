import type { Metadata } from "next";
import Link from "next/link";
import PulseFooter from "@/components/crm/PulseFooter";
import Header from "@/components/site/Header";
import { btnPrimary, container, eyebrow, h1, h2sm } from "@/components/crm/styles";
import { formatPrice } from "@/content/pricing";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().pricing;
  return { title: seo.pageTitle, description: seo.metaDescription, alternates: { canonical: "/crm/pricing" } };
}

type CellValue = { included: boolean; note: string };

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Cell({ v, yes, no }: { v: CellValue; yes: string; no: string }) {
  if (!v.included)
    return (
      <span className="text-[#c4c7d8]">
        <span aria-hidden>—</span>
        <span className="sr-only">{no}</span>
      </span>
    );
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-pulse-soft text-pulse">
        <Check />
        <span className="sr-only">{yes}</span>
      </span>
      {v.note && <span className="text-xs font-semibold text-pulse-subtle">{v.note}</span>}
    </span>
  );
}

export default function PricingPage() {
  const all = getContent();
  const c = all.pricing;
  const price = (n: number) => formatPrice(c.currencySymbol, n);
  // The comparison table has three plan columns, matched to the first three plans by position
  const columns = (["basic", "standard", "enterprise"] as const).slice(0, Math.min(3, c.plans.length));

  return (
    <>
      <Header content={all.header} />
      <main>
        {/* Hero */}
        <section aria-labelledby="pricing-h" className={`${container} flex flex-col items-center gap-5 pt-[clamp(48px,8vw,96px)] pb-[clamp(36px,5vw,56px)] text-center`}>
          <p className={eyebrow}>{c.hero.eyebrow}</p>
          <h1 id="pricing-h" className={`${h1} max-w-[760px]`}>
            {c.hero.heading}
          </h1>
          <p className="max-w-[560px] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{c.hero.body}</p>
        </section>

        {/* Plans */}
        <section aria-label="Plans" className={`${container} pb-[clamp(64px,9vw,112px)]`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-5">
            {c.plans.map((p, i) => {
              const dark = p.highlight;
              const technical = p.technicalFeatures.filter(Boolean);
              return (
                <article
                  key={i}
                  aria-labelledby={`plan-${i}`}
                  className={`flex flex-col gap-6 rounded-3xl border p-[clamp(24px,3vw,36px)] ${
                    dark ? "border-pulse-night bg-pulse-night text-white shadow-[0_40px_80px_-40px_rgba(15,18,64,0.6)]" : "border-pulse-line bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <h2 id={`plan-${i}`} className="text-2xl font-extrabold tracking-[-0.02em]">
                      {p.name}
                    </h2>
                    <p className={`text-[15px] leading-normal ${dark ? "text-[#cfd0f0]" : "text-pulse-subtle"}`}>{p.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="flex items-baseline gap-2">
                      <span className="text-[clamp(40px,4.4vw,52px)] leading-none font-extrabold tracking-[-0.04em]">{price(p.price)}</span>
                      <span className={`text-base font-semibold ${dark ? "text-[#cfd0f0]" : "text-pulse-subtle"}`}>{c.priceSuffix}</span>
                    </p>
                    <p className={`font-code text-xs tracking-[0.06em] uppercase ${dark ? "text-[#a9abff]" : "text-pulse"}`}>{p.usersNote}</p>
                  </div>
                  {p.buttonLabel && (
                    <Link
                      href={p.buttonLink || "#"}
                      className={`rounded-xl px-5 py-3.5 text-center text-base font-bold ${
                        dark ? "bg-white text-pulse-night hover:bg-pulse-soft" : "bg-pulse text-white hover:bg-pulse-hover"
                      }`}
                    >
                      {p.buttonLabel}
                    </Link>
                  )}
                  <div className="flex flex-col gap-3">
                    <h3 className={`text-[13px] font-extrabold tracking-[0.04em] uppercase ${dark ? "text-[#e3e4ff]" : ""}`}>{c.includedHeading}</h3>
                    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                      {p.features.map((f, j) => (
                        <li key={j} className={`flex items-start gap-2.5 text-[15px] font-semibold ${dark ? "text-[#e3e4ff]" : "text-[#2a2f4d]"}`}>
                          <Check className={`mt-0.5 shrink-0 ${dark ? "text-[#22b07d]" : "text-pulse"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {technical.length > 0 && (
                    <div
                      className={`flex flex-col gap-3 rounded-2xl border p-5 ${dark ? "border-white/10 bg-white/5" : "border-pulse-line bg-pulse-bg"}`}
                    >
                      <h3 className={`text-[13px] font-extrabold tracking-[0.04em] uppercase ${dark ? "text-[#e3e4ff]" : ""}`}>{p.technicalHeading}</h3>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0">
                        {technical.map((f, j) => (
                          <li key={j} className={`flex items-start gap-2.5 text-sm font-semibold ${dark ? "text-[#cfd0f0]" : "text-pulse-muted"}`}>
                            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#a9abff]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Comparison */}
        {c.comparison.rows.length > 0 && columns.length > 0 && (
          <section aria-labelledby="compare-h" className="border-y border-pulse-line bg-white">
            <div className={`${container} flex flex-col gap-10 py-[clamp(64px,9vw,112px)]`}>
              <div className="flex flex-col gap-3">
                <p className={eyebrow}>{c.comparison.eyebrow}</p>
                <h2 id="compare-h" className={h2sm}>
                  {c.comparison.heading}
                </h2>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-pulse-line">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <caption className="sr-only">{c.comparison.heading}</caption>
                  <thead>
                    <tr className="bg-pulse-bg">
                      <th scope="col" className="px-5 py-4 text-sm font-extrabold">
                        {c.comparison.featureColumnLabel}
                      </th>
                      {columns.map((_, i) => (
                        <th key={i} scope="col" className="w-[22%] px-4 py-4 text-center">
                          <span className="block text-base font-extrabold">{c.plans[i].name}</span>
                          <span className="block text-[13px] font-semibold text-pulse-subtle">
                            {price(c.plans[i].price)} {c.priceSuffix}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.comparison.rows.map((row, r) => (
                      <tr key={r} className="border-t border-[#eef0f5]">
                        <th scope="row" className="px-5 py-3.5 text-[15px] font-semibold text-[#2a2f4d]">
                          {row.feature}
                        </th>
                        {columns.map((col) => (
                          <td key={col} className="px-4 py-3.5 text-center">
                            <Cell v={row[col]} yes={c.comparison.includedText} no={c.comparison.notIncludedText} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section
          aria-labelledby="pfaq-h"
          className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(32px,5vw,72px)] py-[clamp(64px,9vw,112px)]`}
        >
          <div className="flex flex-col gap-4">
            <p className={eyebrow}>{c.faq.eyebrow}</p>
            <h2 id="pfaq-h" className={h2sm}>
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
          <div className="flex flex-col border-t border-pulse-line">
            {c.faq.questions.map((q, i) => (
              <details key={i} className="group border-b border-pulse-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-[18px] text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                  {q.question}
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d9dbe6] text-lg text-pulse transition-transform duration-250 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pr-12 pb-[22px] text-base leading-relaxed text-pulse-muted">{q.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="pcta-h" className="bg-pulse-night text-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-8 py-[clamp(56px,8vw,96px)]`}>
            <div className="flex max-w-[560px] flex-col gap-3">
              <h2 id="pcta-h" className="text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">
                {c.cta.heading}
              </h2>
              <p className="text-lg leading-relaxed text-[#cfd0f0]">{c.cta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {c.cta.primaryButtonLabel && (
                <Link href={c.cta.primaryButtonLink || "#"} className={btnPrimary}>
                  {c.cta.primaryButtonLabel}
                </Link>
              )}
              {c.cta.secondaryButtonLabel && (
                <Link
                  href={c.cta.secondaryButtonLink || "#"}
                  className="rounded-xl border border-white/25 px-6 py-4 text-base font-bold whitespace-nowrap text-white hover:border-white"
                >
                  {c.cta.secondaryButtonLabel}
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <PulseFooter content={all.crmLayout.footer} />
    </>
  );
}
