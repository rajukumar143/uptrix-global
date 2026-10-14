import type { Metadata } from "next";
import Link from "next/link";
import PulseFooter from "@/components/crm/PulseFooter";
import Header from "@/components/site/Header";
import { btnGhost, btnPrimary, container, eyebrow, h1, h2, h2sm } from "@/components/crm/styles";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().about;
  return { title: seo.pageTitle, description: seo.metaDescription, alternates: { canonical: "/crm/about" } };
}

const audienceColors = ["#3b3fd4", "#22b07d", "#f08a24", "#8b4fd8"];
const n2 = (i: number) => String(i + 1).padStart(2, "0");

export default function AboutPage() {
  const all = getContent();
  const c = all.about;

  return (
    <>
      <Header content={all.header} />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="about-h"
          className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-[clamp(32px,5vw,64px)] pt-[clamp(48px,8vw,96px)] pb-[clamp(48px,7vw,88px)]`}
        >
          <div className="flex flex-col gap-5">
            <p className={eyebrow}>{c.hero.eyebrow}</p>
            <h1 id="about-h" className={h1}>
              {c.hero.heading}
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-pulse-muted">
            {c.hero.paragraphs.filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Beliefs */}
        <section aria-labelledby="beliefs-h" className="border-y border-pulse-line bg-white">
          <div className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,112px)]`}>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className={eyebrow}>{c.beliefs.eyebrow}</p>
              <h2 id="beliefs-h" className={h2}>
                {c.beliefs.heading}
              </h2>
            </div>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4 p-0">
              {c.beliefs.items.map((b, i) => (
                <li key={i} className="flex flex-col gap-3 rounded-[20px] border border-pulse-line bg-pulse-bg p-7">
                  <span className="font-code text-xs text-pulse">{n2(i)}</span>
                  <h3 className="text-xl font-extrabold tracking-[-0.01em]">{b.title}</h3>
                  <p className="text-[15px] leading-[1.55] text-pulse-subtle">{b.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Who we build for */}
        <section aria-labelledby="for-h" className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,112px)]`}>
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className={eyebrow}>{c.audiences.eyebrow}</p>
            <h2 id="for-h" className={h2}>
              {c.audiences.heading}
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            {c.audiences.items.map((a, i) => (
              <article
                key={i}
                className="flex flex-col gap-3 rounded-[20px] border border-t-4 border-pulse-line bg-white p-7"
                style={{ borderTopColor: audienceColors[i % audienceColors.length] }}
              >
                <h3 className="text-xl font-extrabold tracking-[-0.01em]">{a.title}</h3>
                <p className="text-[15px] leading-[1.55] text-pulse-subtle">{a.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section aria-labelledby="roadmap-h" className="bg-pulse-night text-white">
          <div className={`${container} flex flex-col gap-12 py-[clamp(64px,9vw,112px)]`}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-6">
              <div className="flex flex-col gap-4">
                <p className="font-code text-xs tracking-[0.08em] text-[#a9abff] uppercase">{c.roadmap.eyebrow}</p>
                <h2 id="roadmap-h" className={h2}>
                  {c.roadmap.heading}
                </h2>
              </div>
              <p className="max-w-[460px] text-[17px] leading-relaxed text-[#cfd0f0]">{c.roadmap.body}</p>
            </div>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-3 p-0">
              {c.roadmap.items.map((r, i) => (
                <li key={i} className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="flex items-center justify-between">
                    <span className="font-code text-xs text-[#a9abff]">{n2(i)}</span>
                    {c.roadmap.badge && (
                      <span className="rounded-full bg-[rgba(255,138,92,0.14)] px-2.5 py-1 text-[11px] font-bold text-[#ff9b75]">{c.roadmap.badge}</span>
                    )}
                  </span>
                  <h3 className="text-lg font-extrabold">{r.title}</h3>
                  <p className="text-sm leading-normal text-[#c9cbf0]">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Family + partners */}
        <section aria-labelledby="family-h" className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-5 py-[clamp(64px,9vw,112px)]`}>
          <div className="flex flex-col gap-5 rounded-3xl border border-pulse-line bg-white p-[clamp(24px,3.5vw,44px)]">
            <p className={eyebrow}>{c.family.eyebrow}</p>
            <h2 id="family-h" className={h2sm}>
              {c.family.heading}
            </h2>
            <p className="text-base leading-relaxed text-pulse-muted">{c.family.body}</p>
            {c.family.linkLabel && (
              <Link href={c.family.linkLink || "#"} className="mt-auto self-start font-bold text-pulse hover:text-pulse-hover">
                {c.family.linkLabel}
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-5 rounded-3xl border border-pulse-line bg-white p-[clamp(24px,3.5vw,44px)]">
            <p className={eyebrow}>{c.partners.eyebrow}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-[#3d4263]">
              {c.partners.names.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="acta-h" className="border-t border-pulse-line bg-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-8 py-[clamp(56px,8vw,96px)]`}>
            <div className="flex max-w-[560px] flex-col gap-3">
              <h2 id="acta-h" className="text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance">
                {c.cta.heading}
              </h2>
              <p className="text-lg leading-relaxed text-pulse-muted">{c.cta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {c.cta.primaryButtonLabel && (
                <Link href={c.cta.primaryButtonLink || "#"} className={btnPrimary}>
                  {c.cta.primaryButtonLabel}
                </Link>
              )}
              {c.cta.secondaryButtonLabel && (
                <Link href={c.cta.secondaryButtonLink || "#"} className={btnGhost}>
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
