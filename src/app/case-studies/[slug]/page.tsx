import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { btnPrimary, container } from "@/components/crm/styles";
import VideoCard from "@/components/site/VideoCard";
import { liveStudies, youtubeId } from "@/content/stories";
import { getContent } from "@/lib/content-store";

export const dynamicParams = true;

export function generateStaticParams() {
  return liveStudies(getContent().caseStudies.studies).map((s) => ({ slug: s.slug }));
}

const findStudy = (slug: string) => liveStudies(getContent().caseStudies.studies).find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = findStudy(slug);
  if (!s) return { title: "Case study not found", robots: { index: false } };
  return {
    title: `${s.title} | Uptrix Case Study`,
    description: s.summary,
    alternates: { canonical: `/case-studies/${s.slug}` },
    // Example stories stay out of Google until they're about a real customer
    robots: s.isExample ? { index: false, follow: true } : undefined,
    openGraph: { title: s.title, description: s.summary, type: "article", url: `/case-studies/${s.slug}`, images: ["/logo-dark.png"] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const s = findStudy(slug);
  if (!s) notFound();
  const { page } = getContent().caseStudies;
  const video = youtubeId(s.videoLink);
  const results = s.results.map((r) => r.text).filter(Boolean);

  return (
    <main>
      <article>
        <header className="bg-pulse-night text-white">
          <div className={`${container} flex max-w-[1000px] flex-col gap-6 pt-[clamp(40px,7vw,80px)] pb-[clamp(48px,7vw,80px)]`}>
            <Link href="/case-studies" className="text-sm font-semibold text-[#b8baff] hover:text-white">
              ← {page.backLabel}
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/10 px-3 py-1">{s.product}</span>
              {s.industry && <span className="rounded-full bg-white/10 px-3 py-1">{s.industry}</span>}
              {s.location && <span className="rounded-full bg-white/10 px-3 py-1">{s.location}</span>}
              {s.isExample && <span className="rounded-full border border-white/25 px-3 py-1 text-[#cfd0f0]">{page.exampleLabel}</span>}
            </div>
            <h1 className="text-[clamp(32px,4.6vw,52px)] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">{s.title}</h1>
            <p className="max-w-[760px] text-[clamp(17px,1.7vw,20px)] leading-relaxed text-[#cfd0f0]">{s.summary}</p>
            {s.metrics.length > 0 && (
              <dl className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
                {s.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col-reverse gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <dt className="text-sm text-[#a9abd6]">{m.label}</dt>
                    <dd className="text-[clamp(28px,3vw,38px)] leading-none font-extrabold tracking-[-0.02em]">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>

        <div className={`${container} flex max-w-[1000px] flex-col gap-12 py-[clamp(48px,7vw,88px)]`}>
          {s.isExample && page.exampleNote && (
            <p className="rounded-2xl border border-dashed border-[#d4d7e4] bg-white px-5 py-4 text-[15px] text-pulse-subtle">{page.exampleNote}</p>
          )}

          <div className="grid gap-10 md:grid-cols-2">
            <section className="flex flex-col gap-3">
              <h2 className="font-code text-xs tracking-[0.08em] text-[#e0457b] uppercase">{page.challengeHeading}</h2>
              <p className="text-[17px] leading-[1.7] text-pulse-muted">{s.challenge}</p>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="font-code text-xs tracking-[0.08em] text-pulse uppercase">{page.solutionHeading}</h2>
              <p className="text-[17px] leading-[1.7] text-pulse-muted">{s.solution}</p>
            </section>
          </div>

          {results.length > 0 && (
            <section className="flex flex-col gap-5 rounded-3xl border border-pulse-line bg-white p-[clamp(24px,4vw,40px)]">
              <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">{page.resultsHeading}</h2>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[17px] leading-relaxed">
                    <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e7f7ef] text-xs text-[#11744f]">
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {s.quote && (
            <figure className="flex flex-col gap-4 border-l-4 border-pulse pl-6">
              <blockquote className="text-[clamp(20px,2.2vw,26px)] leading-snug font-bold tracking-[-0.01em] text-pulse-ink">“{s.quote}”</blockquote>
              {s.quoteName && (
                <figcaption className="text-[15px] text-pulse-subtle">
                  <span className="font-bold text-pulse-ink">{s.quoteName}</span>
                  {s.quoteRole && `, ${s.quoteRole}`}
                </figcaption>
              )}
            </figure>
          )}

          {video && (
            <section className="flex flex-col gap-4">
              <h2 className="text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em]">{page.videoLabel}</h2>
              <VideoCard id={video} title={s.title} playLabel={page.videoLabel} />
            </section>
          )}
        </div>
      </article>

      <section aria-labelledby="cs-cta-h" className="border-t border-pulse-line bg-white">
        <div className={`${container} flex flex-col items-center gap-4 py-[clamp(56px,8vw,96px)] text-center`}>
          <h2 id="cs-cta-h" className="text-[clamp(28px,3.4vw,40px)] leading-tight font-extrabold tracking-[-0.03em] text-balance">
            {page.ctaHeading}
          </h2>
          <p className="max-w-[540px] text-lg leading-relaxed text-pulse-muted">{page.ctaBody}</p>
          {page.ctaButtonLabel && (
            <Link href={page.ctaButtonLink || "#"} className={`${btnPrimary} mt-2`}>
              {page.ctaButtonLabel}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
