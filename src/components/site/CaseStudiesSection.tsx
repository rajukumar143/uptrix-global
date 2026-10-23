import StoryCard from "@/components/site/StoryCard";
import CardsCarousel from "@/components/site/CardsCarousel";
import { liveStudies } from "@/content/stories";
import { getContent } from "@/lib/content-store";
import { container } from "@/components/crm/styles";

const matches = (product: string, filter: string) =>
  !filter.trim() || product.toLowerCase().includes(filter.trim().toLowerCase());

/**
 * Dedicated, highlighted Case Studies showcase section with dark theme and interactive carousel.
 */
export default function CaseStudiesSection({
  productFilter = "",
  className = "",
  theme = "dark",
  hideEyebrow = false,
  heading,
  intro,
}: {
  productFilter?: string;
  className?: string;
  theme?: "dark" | "light";
  hideEyebrow?: boolean;
  heading?: string;
  intro?: string;
}) {
  const { caseStudies } = getContent();
  const studies = liveStudies(caseStudies.studies).filter((s) =>
    matches(s.product, productFilter)
  );

  if (studies.length === 0) return null;

  const cs = caseStudies.page;
  const isLight = theme === "light";

  return (
    <section
      aria-labelledby="case-studies-h"
      className={`relative overflow-hidden border-y ${
        isLight
          ? "border-slate-200/80 bg-slate-50/70 text-slate-900"
          : "border-white/10 bg-pulse-night text-white"
      } py-[clamp(64px,9vw,120px)] ${className}`}
    >
      {/* Ambient background glows (dark mode only) */}
      {!isLight && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(91,95,240,0.22),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(34,176,125,0.18),transparent_70%)]"
          />
        </>
      )}

      <div className={`${container} relative flex flex-col gap-10`}>
        {/* Section Heading & Eyebrow */}
        <div className="flex flex-col gap-4">
          {!hideEyebrow && (
            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
                isLight
                  ? "border-emerald-500/25 bg-emerald-50 text-emerald-800"
                  : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#22b07d] animate-pulse" />
              Proven Customer Results
            </div>
          )}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <h2
                id="case-studies-h"
                className={`text-[clamp(32px,4.2vw,50px)] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                {heading || cs.heading}
              </h2>
              <p
                className={`text-[17px] leading-relaxed ${
                  isLight ? "text-slate-600" : "text-[#c9cbf0]"
                }`}
              >
                {intro || cs.intro}
              </p>
            </div>
          </div>
        </div>

        {/* Highlighted Case Studies Carousel */}
        <CardsCarousel
          title={
            <span
              className={`font-code text-xs font-bold uppercase tracking-[0.08em] ${
                isLight ? "text-[#1f5fd6]" : "text-[#a9abff]"
              }`}
            >
              Featured Customer Stories
            </span>
          }
          viewAllLabel={cs.viewAllLabel}
          viewAllLink="/case-studies"
          theme={isLight ? "light" : "dark"}
        >
          {studies.map((s, i) => (
            <div
              key={s.slug}
              className="w-[min(100%,380px)] min-w-[320px] shrink-0 snap-start sm:w-[420px]"
            >
              <StoryCard study={s} index={i} text={cs} dark={!isLight} />
            </div>
          ))}
        </CardsCarousel>
      </div>
    </section>
  );
}
