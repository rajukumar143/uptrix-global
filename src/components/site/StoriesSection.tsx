import Link from "next/link";
import StoryCard from "@/components/site/StoryCard";
import VideoCard from "@/components/site/VideoCard";
import { liveStudies, youtubeId } from "@/content/stories";
import { getContent } from "@/lib/content-store";

type Section = { eyebrow: string; heading: string; intro: string; productFilter: string };

const matches = (product: string, filter: string) => !filter.trim() || product.toLowerCase().includes(filter.trim().toLowerCase());

/** Video testimonials and case studies for one product, shown as a section on a product page. */
export default function StoriesSection({ section, className = "" }: { section: Section; className?: string }) {
  const { caseStudies, videoTestimonials, reviews } = getContent();
  const studies = liveStudies(caseStudies.studies)
    .filter((s) => matches(s.product, section.productFilter))
    .slice(0, 3);
  const productVideos = videoTestimonials.videos.map((v) => ({ ...v, id: youtubeId(v.youtubeLink) })).filter((v) => matches(v.product, section.productFilter));
  const videos = productVideos.filter((v) => v.id).slice(0, 3);
  // Until a video link is added, show "coming soon" cards so the section is ready for them
  const upcoming = videos.length ? [] : productVideos.slice(0, 3);
  const reviewList = reviews.items.filter((r) => r.quote && matches(r.product, section.productFilter)).slice(0, 6);
  if (!studies.length && !videos.length && !upcoming.length && !reviewList.length) return null;

  const vt = videoTestimonials.page;
  const cs = caseStudies.page;

  return (
    <section aria-labelledby="stories-h" className={`border-t border-pulse-line bg-pulse-bg ${className}`}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-[clamp(20px,4vw,40px)] py-[clamp(64px,9vw,112px)]">
        <div className="flex flex-col gap-4">
          <p className="font-code text-xs tracking-[0.08em] text-pulse uppercase">{section.eyebrow}</p>
          <h2 id="stories-h" className="max-w-[760px] text-[clamp(30px,3.8vw,44px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance text-pulse-ink">
            {section.heading}
          </h2>
          {section.intro && <p className="max-w-[640px] text-[17px] leading-relaxed text-pulse-muted">{section.intro}</p>}
        </div>

        {(videos.length > 0 || upcoming.length > 0) && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-extrabold text-pulse-ink">{vt.eyebrow}</h3>
              <Link href="/video-testimonials" className="text-[15px] font-bold text-pulse hover:text-pulse-hover">
                {vt.viewAllLabel} →
              </Link>
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6 p-0">
              {videos.map((v, i) => (
                <li key={i} className="flex flex-col gap-4 rounded-3xl border border-pulse-line bg-white p-3">
                  <VideoCard id={v.id} title={[v.name, v.company].filter(Boolean).join(", ") || vt.heading} playLabel={vt.playLabel} />
                  <div className="flex flex-col gap-2 px-2 pb-2">
                    {v.quote && <p className="text-base leading-snug font-bold text-pulse-ink">“{v.quote}”</p>}
                    <p className="text-sm text-pulse-subtle">
                      <span className="font-bold text-pulse-ink">{v.name}</span>
                      {[v.role, v.company].filter(Boolean).length > 0 && `, ${[v.role, v.company].filter(Boolean).join(", ")}`}
                    </p>
                  </div>
                </li>
              ))}
              {upcoming.map((v, i) => (
                <li key={`soon-${i}`} className="flex flex-col gap-4 rounded-3xl border border-pulse-line bg-white p-3">
                  <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-pulse-night">
                    <div aria-hidden className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,128,255,0.45),transparent_65%)]" />
                    <span aria-hidden className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                      </svg>
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">{v.product}</span>
                  </div>
                  <p className="px-2 pb-2 text-sm font-bold text-pulse-subtle">{vt.comingSoonLabel}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reviewList.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-extrabold text-pulse-ink">{reviews.heading}</h3>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5 p-0">
              {reviewList.map((r, i) => {
                const stars = Math.max(0, Math.min(5, Math.round(r.rating)));
                return (
                  <li key={i}>
                    <figure className="flex h-full flex-col gap-4 rounded-3xl border border-pulse-line bg-white p-6 shadow-[0_18px_40px_-30px_rgba(14,19,48,0.35)]">
                      <div className="flex items-center justify-between gap-3">
                        <span role="img" aria-label={`${stars} out of 5 stars`} className="flex gap-0.5 text-lg leading-none">
                          {[0, 1, 2, 3, 4].map((n) => (
                            <span key={n} aria-hidden className={n < stars ? "text-[#f5a524]" : "text-[#dfe1ea]"}>
                              ★
                            </span>
                          ))}
                        </span>
                        <span className="flex flex-wrap justify-end gap-1.5">
                          {r.product && <span className="rounded-full bg-pulse-soft px-2.5 py-0.5 text-[11px] font-bold text-pulse">{r.product}</span>}
                          {r.isExample && <span className="rounded-full border border-[#d9dbe6] px-2.5 py-0.5 text-[11px] font-bold text-pulse-faint">{reviews.exampleLabel}</span>}
                        </span>
                      </div>
                      <blockquote className="text-base leading-relaxed font-semibold text-pulse-ink">“{r.quote}”</blockquote>
                      <figcaption className="mt-auto flex items-center gap-3 border-t border-pulse-line pt-4">
                        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pulse-soft text-sm font-extrabold text-pulse">
                          {(r.name || r.company || "?").trim()[0]?.toUpperCase()}
                        </span>
                        <span className="flex min-w-0 flex-col text-sm leading-snug">
                          <span className="font-bold text-pulse-ink">{[r.name, r.role].filter(Boolean).join(", ")}</span>
                          <span className="text-pulse-subtle">{r.company}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {studies.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-extrabold text-pulse-ink">{cs.eyebrow}</h3>
              <Link href="/case-studies" className="text-[15px] font-bold text-pulse hover:text-pulse-hover">
                {cs.viewAllLabel} →
              </Link>
            </div>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-6 p-0">
              {studies.map((s, i) => (
                <li key={s.slug}>
                  <StoryCard study={s} index={i} text={cs} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
