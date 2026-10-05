import type { Metadata } from "next";
import Link from "next/link";
import { btnPrimary, container, eyebrow, h1 } from "@/components/crm/styles";
import VideoCard from "@/components/site/VideoCard";
import { youtubeId } from "@/content/stories";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = getContent().videoTestimonials;
  return {
    title: page.pageTitle,
    description: page.metaDescription,
    alternates: { canonical: "/video-testimonials" },
    openGraph: { title: page.pageTitle, description: page.metaDescription, type: "website", url: "/video-testimonials", images: ["/logo-dark.png"] },
  };
}

export default function VideoTestimonialsPage() {
  const { page, videos } = getContent().videoTestimonials;
  // Only videos with a working YouTube link are shown
  const list = videos.map((v) => ({ ...v, id: youtubeId(v.youtubeLink) })).filter((v) => v.id);

  return (
    <main>
      <section aria-labelledby="vt-h" className={`${container} flex flex-col gap-5 pt-[clamp(48px,8vw,96px)] pb-[clamp(40px,6vw,64px)]`}>
        <p className={eyebrow}>{page.eyebrow}</p>
        <h1 id="vt-h" className={`${h1} max-w-[820px]`}>
          {page.heading}
        </h1>
        <p className="max-w-[680px] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{page.intro}</p>
      </section>

      <section aria-label="Videos" className={`${container} pb-[clamp(64px,9vw,112px)]`}>
        {list.length > 0 ? (
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,360px),1fr))] gap-6 p-0">
            {list.map((v, i) => (
              <li key={i} className="flex flex-col overflow-hidden rounded-3xl border border-pulse-line bg-white p-3 shadow-[0_18px_40px_-30px_rgba(14,19,48,0.35)]">
                <VideoCard id={v.id} title={[v.name, v.company].filter(Boolean).join(", ") || page.heading} playLabel={page.playLabel} />
                <div className="flex flex-1 flex-col gap-3 px-3 pt-5 pb-3">
                  {v.quote && <p className="text-[17px] leading-snug font-bold text-pulse-ink">“{v.quote}”</p>}
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-1">
                    <p className="text-sm leading-snug text-pulse-subtle">
                      <span className="block font-bold text-pulse-ink">{v.name}</span>
                      {[v.role, v.company].filter(Boolean).join(", ")}
                    </p>
                    {v.product && <span className="rounded-full bg-pulse-soft px-3 py-1 text-xs font-bold text-pulse">{v.product}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#d4d7e4] bg-white px-6 py-[clamp(48px,7vw,80px)] text-center">
            <span aria-hidden className="grid h-16 w-16 place-items-center rounded-full bg-pulse-soft text-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <h2 className="text-[clamp(24px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">{page.emptyHeading}</h2>
            <p className="max-w-[520px] text-base leading-relaxed text-pulse-muted">{page.emptyBody}</p>
            {page.emptyButtonLabel && (
              <Link href={page.emptyButtonLink || "#"} className={`${btnPrimary} mt-2`}>
                {page.emptyButtonLabel}
              </Link>
            )}
          </div>
        )}
      </section>

      {list.length > 0 && (
        <section aria-labelledby="vt-cta-h" className="bg-pulse-night text-white">
          <div className={`${container} flex flex-col items-center gap-4 py-[clamp(56px,8vw,96px)] text-center`}>
            <h2 id="vt-cta-h" className="text-[clamp(28px,3.4vw,40px)] leading-tight font-extrabold tracking-[-0.03em] text-balance">
              {page.ctaHeading}
            </h2>
            <p className="max-w-[540px] text-lg leading-relaxed text-[#cfd0f0]">{page.ctaBody}</p>
            {page.ctaButtonLabel && (
              <Link href={page.ctaButtonLink || "#"} className={`${btnPrimary} mt-2`}>
                {page.ctaButtonLabel}
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
