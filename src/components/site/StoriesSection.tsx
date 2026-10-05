import Link from "next/link";
import StoryCard from "@/components/site/StoryCard";
import VideoCard from "@/components/site/VideoCard";
import { liveStudies, youtubeId } from "@/content/stories";
import { getContent } from "@/lib/content-store";

type Section = { eyebrow: string; heading: string; intro: string; productFilter: string };

const matches = (product: string, filter: string) => !filter.trim() || product.toLowerCase().includes(filter.trim().toLowerCase());

/** Video testimonials and case studies for one product, shown as a section on a product page. */
export default function StoriesSection({ section, className = "" }: { section: Section; className?: string }) {
  const { caseStudies, videoTestimonials } = getContent();
  const studies = liveStudies(caseStudies.studies)
    .filter((s) => matches(s.product, section.productFilter))
    .slice(0, 3);
  const videos = videoTestimonials.videos
    .map((v) => ({ ...v, id: youtubeId(v.youtubeLink) }))
    .filter((v) => v.id && matches(v.product, section.productFilter))
    .slice(0, 3);
  if (!studies.length && !videos.length) return null;

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

        {videos.length > 0 && (
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
