import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Header from "@/components/site/Header";
import LogoMarquee from "@/components/site/LogoMarquee";
import StoriesSection from "@/components/site/StoriesSection";
import CaseStudiesSection from "@/components/site/CaseStudiesSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ProductTour from "@/components/home/ProductTour";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import { ArrowRight, Icon } from "@/components/home/icons";
import { getPageContent } from "@/lib/content-store";

// Client logo colours, by position. Names come from the admin dashboard.

// Icons for each card, by position (they repeat if more cards are added in the admin dashboard)
const hrmsIcons = [
  (
      <>
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </>
  ),
  (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </>
  ),
  (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </>
  ),
  (
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </>
  ),
];

const crmIcons = [
  (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
  ),
  (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 7v7" />
        <path d="M12 7v4" />
        <path d="M16 7v9" />
      </>
  ),
  (
      <>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </>
  ),
  (
      <>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </>
  ),
];

const reasonIcons = [
  (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
  ),
  (
      <>
        <path d="m12 2 10 5-10 5L2 7z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </>
  ),
  (
      <>
        <path d="m9 9 5 12 1.8-5.2L21 14Z" />
        <path d="M7.2 2.2 8 5.1" />
        <path d="m5.1 8-2.9-.8" />
        <path d="M14 4.1 12 6" />
        <path d="m6 12-1.9 2" />
      </>
  ),
  (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
  ),
];

const industryIcons = [
  (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
  ),
  (
      <>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </>
  ),
  (
      <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </>
  ),
  (
      <>
        <path d="m22 10-10-5-10 5 10 5z" />
        <path d="M22 10v6" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
  ),
  (
      <>
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
  ),
];

// Social icons by network name (lower case). Unknown names get a plain link icon.
const socialIcons: Record<string, ReactNode> = {
  "linkedin": (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </>
  ),
  "x": (
                    <>
                      <path d="M4 4l16 16" />
                      <path d="M20 4 4 20" />
                    </>
  ),
  "instagram": (
                    <>
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <path d="M17.5 6.5h.01" />
                    </>
  ),
  "youtube": (
                    <>
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </>
  ),
};
const linkIcon = (
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>
);

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

const stepColors = ["#4F46E5", "#4F46E5", "#3B5BDB", "#0F766E", "#0F766E", "#0F766E"];

const pick = <T,>(list: T[], i: number) => list[i % list.length];

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getPageContent("home");
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, images: ["/logo-dark.png"] },
  };
}

const eyebrow = "text-[13px] font-bold tracking-[.12em] text-indigo-700 uppercase";
const h2 = "font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-slate-900";
const sectionPad = "py-[clamp(64px,12vw,112px)]";
const container = "mx-auto max-w-[1200px] px-6";

function FeatureCard({ f, icon, color, tint }: { f: { title: string; body: string }; icon: ReactNode; color: string; tint: string }) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition duration-250 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,.28)]">
      <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: tint, color }}>
        <Icon>{icon}</Icon>
      </span>
      <h3 className="mt-1 font-display text-[17px] font-bold text-slate-900">{f.title}</h3>
      <p className="text-[15px] leading-[1.55]">{f.body}</p>
    </li>
  );
}

function ProductCard({
  id,
  tag,
  title,
  body,
  cta,
  href,
  bg,
  shot,
  stripes,
}: {
  id: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  bg: string;
  shot: string;
  stripes: string;
}) {
  return (
    <div
      className="relative flex min-w-0 flex-[1_1_520px] flex-col gap-4.5 overflow-hidden rounded-3xl px-[clamp(24px,4vw,48px)] pt-[clamp(28px,4vw,48px)]"
      style={{ background: bg }}
    >
      <span className="self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-[.12em] text-white">{tag}</span>
      <h2 id={id} className="font-display text-[clamp(26px,3.2vw,40px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-balance text-white">
        {title}
      </h2>
      <p className="max-w-[480px] text-pretty text-slate-300">{body}</p>
      {cta && (
      <a
        href={href || "#"}
        className="mt-1.5 inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-xl bg-white px-5.5 text-base font-semibold whitespace-nowrap text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,.5)]"
      >
        {cta} <ArrowRight />
      </a>
      )}
      {/* PLACEHOLDER: replace with a real product screenshot */}
      <div className="mt-5 overflow-hidden rounded-t-[14px] bg-white shadow-[0_-10px_40px_-10px_rgba(0,0,0,.4)]">
        <div className="flex h-[34px] items-center gap-1.5 border-b border-slate-100 px-3.5">
          {[0, 1, 2].map((d) => (
            <span key={d} className="h-[9px] w-[9px] rounded-full bg-slate-200" />
          ))}
        </div>
        <div role="img" aria-label={`Placeholder: ${shot}`} className={`${stripes} grid aspect-[16/8] place-items-center`}>
          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-600">{shot}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const c = getPageContent("home");
  const year = new Date().getFullYear();

  return (
    <div className="overflow-x-clip">
      <Header content={getPageContent("header")} overlay />
      <main>
        <HeroCarousel slides={c.heroSlides} stats={c.heroStats} />

        <LogoMarquee heading={c.trustBar.heading} names={c.trustBar.clientNames} />

        {/* HRMS overview */}
        <section id="hrms" aria-labelledby="hrms-heading" className="scroll-mt-18 bg-slate-50 pt-[clamp(64px,12vw,112px)] pb-4">
          <div className={`${container} flex flex-wrap items-stretch gap-4`}>
            <Reveal className="flex min-w-0 flex-[1_1_520px]">
              <ProductCard
                id="hrms-heading"
                tag={c.hrmsSection.tag}
                title={c.hrmsSection.heading}
                body={c.hrmsSection.body}
                cta={c.hrmsSection.buttonLabel}
                href={c.hrmsSection.buttonLink}
                bg="radial-gradient(600px 300px at 100% 0%, rgba(129,140,248,.35), transparent 60%), linear-gradient(160deg,#1E1B4B 0%,#0B1433 100%)"
                shot={c.hrmsSection.screenshotLabel}
                stripes="placeholder-stripes"
              />
            </Reveal>
            <Reveal className="min-w-0 flex-[1_1_400px]">
              <ul className="grid h-full grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
                {c.hrmsSection.features.map((f, i) => (
                  <FeatureCard key={i} f={f} icon={pick(hrmsIcons, i)} color="#4F46E5" tint="#EEF2FF" />
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* CRM overview */}
        <section id="crm" aria-labelledby="crm-heading" className="scroll-mt-18 bg-slate-50 pb-[clamp(64px,12vw,112px)]">
          <div className={`${container} flex flex-wrap-reverse items-stretch gap-4`}>
            <Reveal className="min-w-0 flex-[1_1_400px]">
              <ul className="grid h-full grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
                {c.crmSection.features.map((f, i) => (
                  <FeatureCard key={i} f={f} icon={pick(crmIcons, i)} color="#0F766E" tint="#F0FDFA" />
                ))}
              </ul>
            </Reveal>
            <Reveal className="flex min-w-0 flex-[1_1_520px]">
              <ProductCard
                id="crm-heading"
                tag={c.crmSection.tag}
                title={c.crmSection.heading}
                body={c.crmSection.body}
                cta={c.crmSection.buttonLabel}
                href={c.crmSection.buttonLink}
                bg="radial-gradient(600px 300px at 100% 0%, rgba(45,212,191,.28), transparent 60%), linear-gradient(160deg,#083B3A 0%,#0B1433 100%)"
                shot={c.crmSection.screenshotLabel}
                stripes="placeholder-stripes-teal"
              />
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section aria-labelledby="stats-heading" className={`bg-white ${sectionPad}`}>
          <div className={`${container} flex flex-col gap-12`}>
            <Reveal className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex flex-col gap-3">
                <span className={eyebrow}>{c.numbers.eyebrow}</span>
                <h2 id="stats-heading" className={h2}>
                  {c.numbers.heading}
                </h2>
              </div>
              <p className="max-w-[400px] text-pretty">{c.numbers.body}</p>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px overflow-hidden rounded-[20px] border border-slate-200 bg-slate-200">
                {c.numbers.items.map((s, i) => (
                  <div key={i} className="flex flex-col gap-2 bg-white px-[clamp(20px,3vw,28px)] py-[clamp(22px,4vw,32px)]">
                    <strong className="text-gradient-stat font-display text-[clamp(34px,3.6vw,44px)] leading-none font-extrabold tracking-[-0.03em]">
                      {s.value}
                    </strong>
                    <span className="text-[15px] text-slate-600">{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Product tour */}
        <section id="tour" aria-labelledby="tour-heading" className={`scroll-mt-18 bg-slate-50 ${sectionPad}`}>
          <Reveal className={container}>
            <ProductTour content={c.productTour} />
          </Reveal>
        </section>

        {/* Why Uptrix */}
        <section id="about" aria-labelledby="why-heading" className={`scroll-mt-18 bg-white ${sectionPad}`}>
          <div className={`${container} flex flex-wrap gap-x-[clamp(40px,6vw,80px)] gap-y-9`}>
            <Reveal className="flex flex-[1_1_320px] flex-col gap-4.5 self-start">
              <span className={eyebrow}>{c.whyUptrix.eyebrow}</span>
              <h2 id="why-heading" className={h2}>
                {c.whyUptrix.heading}
              </h2>
              <p className="max-w-[400px] text-pretty">{c.whyUptrix.body}</p>
              <a
                href={c.whyUptrix.buttonLink || "#"}
                className="mt-2 inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-xl border-[1.5px] border-slate-300 px-5.5 text-base font-semibold whitespace-nowrap text-slate-900 transition hover:border-indigo-brand hover:text-indigo-brand"
              >
                {c.whyUptrix.buttonLabel} <ArrowRight />
              </a>
            </Reveal>
            <Reveal className="min-w-0 flex-[2_1_520px]">
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-10 gap-y-12">
                {c.whyUptrix.reasons.map((r, i) => (
                  <li key={i} className="flex flex-col gap-3.5 border-t border-slate-200 pt-7">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[linear-gradient(140deg,#EEF2FF,#F0FDFA)] text-indigo-brand">
                        <Icon size={22}>{pick(reasonIcons, i)}</Icon>
                      </span>
                      <span className="font-display text-sm font-bold text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold text-slate-900">{r.title}</h3>
                    <p className="text-base text-pretty">{r.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section
          aria-labelledby="ind-heading"
          className={sectionPad}
          style={{
            background:
              "radial-gradient(700px 380px at 100% 0%, rgba(20,184,166,.14), transparent 60%), radial-gradient(700px 380px at 0% 100%, rgba(79,70,229,.24), transparent 60%), #0B1433",
          }}
        >
          <div className={`${container} flex flex-col gap-14`}>
            <Reveal className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-bold tracking-[.12em] text-indigo-300 uppercase">{c.industries.eyebrow}</span>
                <h2 id="ind-heading" className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-white">
                  {c.industries.heading}
                </h2>
              </div>
              <p className="max-w-[400px] text-pretty text-slate-300">{c.industries.body}</p>
            </Reveal>
            <Reveal>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
                {c.industries.items.map((ind, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-3.5 rounded-[18px] border border-white/10 bg-white/[.04] px-6 py-7 transition duration-250 hover:-translate-y-1 hover:border-indigo-300/45 hover:bg-white/[.08]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-teal-400/12 text-teal-300">
                      <Icon size={22}>{pick(industryIcons, i)}</Icon>
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-white">{ind.title}</h3>
                    <p className="text-[15px] text-pretty text-slate-300">{ind.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="steps-heading" className={`bg-white ${sectionPad}`}>
          <div className={`${container} flex flex-wrap gap-x-[clamp(40px,6vw,80px)] gap-y-9`}>
            <div className="flex flex-[1_1_320px] flex-col gap-4.5 self-start lg:sticky lg:top-28">
              <span className={eyebrow}>{c.howItWorks.eyebrow}</span>
              <h2 id="steps-heading" className={h2}>
                {c.howItWorks.heading}
              </h2>
              <p className="max-w-[400px] text-pretty">{c.howItWorks.body}</p>
            </div>
            <Reveal className="min-w-0 flex-[1.4_1_460px]">
              <ol className="flex flex-col">
                {c.howItWorks.steps.map((s, i) => {
                  const last = i === c.howItWorks.steps.length - 1;
                  const color = pick(stepColors, i);
                  return (
                    <li key={i} className={`relative flex gap-6 ${last ? "" : "pb-7"}`}>
                      {!last && (
                        <span aria-hidden className="absolute top-13 bottom-1 left-[23px] w-0.5 rounded-sm bg-[linear-gradient(180deg,#C7D2FE,#99F6E4)]" />
                      )}
                      <span
                        className="relative grid h-12 w-12 flex-none place-items-center rounded-full font-display text-base font-extrabold text-white"
                        style={{ background: color, boxShadow: `0 0 0 6px #fff, 0 10px 24px -10px ${color}` }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5 rounded-2xl px-5 pt-2.5 pb-5 transition-colors duration-250 hover:bg-slate-50">
                        <h3 className="font-display text-[19px] font-bold text-slate-900">{s.title}</h3>
                        <p className="text-base text-pretty">{s.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby="testi-heading" className={`bg-slate-50 ${sectionPad}`}>
          <Reveal className={container}>
            <Testimonials content={c.testimonials} />
          </Reveal>
        </section>

        <StoriesSection section={c.stories} />

        {/* Case Studies: Highlighted Standalone Section */}
        <CaseStudiesSection productFilter={c.stories.productFilter} />

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className={`bg-white ${sectionPad}`}>
          <div className={`${container} flex flex-wrap gap-x-[clamp(40px,6vw,80px)] gap-y-9`}>
            <Reveal className="flex flex-[1_1_300px] flex-col gap-4.5 self-start">
              <span className={eyebrow}>{c.faq.eyebrow}</span>
              <h2 id="faq-heading" className={h2}>
                {c.faq.heading}
              </h2>
              <p className="max-w-[380px] text-pretty">{c.faq.body}</p>
              <div className="mt-3 flex max-w-[380px] flex-col gap-3.5 rounded-[18px] border border-[#EEF1F6] bg-slate-50 p-6">
                <strong className="font-display text-[17px] text-slate-900">{c.faq.helpBoxTitle}</strong>
                <span className="text-[15px]">{c.faq.helpBoxText}</span>
                <a
                  href={c.faq.helpBoxButtonLink || "#"}
                  className="inline-flex h-11 shrink-0 items-center self-start rounded-xl bg-indigo-brand px-5 text-[15px] font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(79,70,229,.6)]"
                >
                  {c.faq.helpBoxButtonLabel}
                </a>
              </div>
            </Reveal>
            <Reveal className="min-w-0 flex-[1.5_1_460px]">
              <Faq questions={c.faq.questions} />
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="cta-heading"
          className="relative overflow-hidden py-[clamp(80px,10vw,128px)]"
          style={{
            background:
              "radial-gradient(800px 420px at 85% 0%, rgba(20,184,166,.28), transparent 60%), radial-gradient(800px 460px at 10% 100%, rgba(79,70,229,.45), transparent 60%), #0B1433",
          }}
        >
          <Reveal className={`${container} flex flex-wrap items-center justify-between gap-10`}>
            <div className="flex flex-[1_1_520px] flex-col gap-4.5">
              <h2
                id="cta-heading"
                className="max-w-[640px] font-display text-[clamp(30px,4.2vw,52px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance text-white"
              >
                {c.finalCta.heading}
              </h2>
              <p className="max-w-[520px] text-[clamp(16px,1.4vw,18px)] text-pretty text-slate-300">{c.finalCta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {c.finalCta.primaryButtonLabel && (
                <a
                  href={c.finalCta.primaryButtonLink || "#"}
                  className="inline-flex h-14 shrink-0 items-center rounded-[14px] bg-white px-7 text-base font-semibold whitespace-nowrap text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,.6)]"
                >
                  {c.finalCta.primaryButtonLabel}
                </a>
              )}
              {c.finalCta.secondaryButtonLabel && (
                <a
                  href={c.finalCta.secondaryButtonLink || "#"}
                  className="inline-flex h-14 shrink-0 items-center rounded-[14px] border-[1.5px] border-white/50 px-7 text-base font-semibold whitespace-nowrap text-white transition hover:border-white hover:bg-white/10"
                >
                  {c.finalCta.secondaryButtonLabel}
                </a>
              )}
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="scroll-mt-18 border-t border-white/5 bg-navy-deep pt-20 text-slate-300">
        <div className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-12`}>
          <div className="flex flex-col gap-4.5">
            <Image src="/logo-light.png" alt="Uptrix" width={756} height={235} className="h-9 w-auto self-start" />
            <p className="max-w-[280px] text-[15px]">{c.footer.tagline}</p>
            <div className="flex gap-2.5">
              {c.footer.socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.link || "#"}
                  aria-label={`Uptrix on ${s.name}`}
                  className="grid h-10 w-10 place-items-center rounded-[10px] border border-slate-700 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <Icon size={18}>{socialIcons[s.name.trim().toLowerCase()] ?? linkIcon}</Icon>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={c.footer.productsHeading} className="flex flex-col gap-3.5">
            <h3 className="mb-1 font-display text-sm font-bold tracking-[.08em] text-white uppercase">{c.footer.productsHeading}</h3>
            {c.footer.productLinks.map((l, i) => (
              <a key={i} href={l.link || "#"} className="text-[15px] text-slate-300 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <nav aria-label={c.footer.companyHeading} className="flex flex-col gap-3.5">
            <h3 className="mb-1 font-display text-sm font-bold tracking-[.08em] text-white uppercase">{c.footer.companyHeading}</h3>
            {c.footer.companyLinks.map((l, i) => (
              <a key={i} href={l.link || "#"} className="text-[15px] text-slate-300 hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>

          <address className="flex flex-col gap-3.5 text-[15px] not-italic">
            <h3 className="mb-1 font-display text-sm font-bold tracking-[.08em] text-white uppercase">{c.footer.contactHeading}</h3>
            {c.footer.email && (
              <a href={`mailto:${c.footer.email}`} className="flex items-center gap-2.5 text-slate-300 hover:text-white">
                <Icon size={16}>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </Icon>
                {c.footer.email}
              </a>
            )}
            {c.footer.phone && (
              <a href={telHref(c.footer.phone)} className="flex items-center gap-2.5 text-slate-300 hover:text-white">
                <Icon size={16}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </Icon>
                {c.footer.phone}
              </a>
            )}
            {c.footer.address && (
              <span className="flex items-start gap-2.5">
                <span className="mt-1 flex-none">
                  <Icon size={16}>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </Icon>
                </span>
                {c.footer.address}
              </span>
            )}
          </address>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1200px] flex-wrap justify-between gap-4 border-t border-slate-800 p-6 text-sm text-slate-400">
          <span>
            © {year} {c.footer.copyrightText}
          </span>
          <span className="flex gap-3">
            {c.footer.legalLinks.map((l, i) => (
              <span key={i} className="flex gap-3">
                {i > 0 && <span aria-hidden>|</span>}
                <a href={l.link || "#"} className="text-slate-400 hover:text-white">
                  {l.label}
                </a>
              </span>
            ))}
          </span>
        </div>
      </footer>
    </div>
  );
}
