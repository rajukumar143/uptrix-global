"use client";

import Link from "next/link";
import { useState } from "react";
import StoryCard from "@/components/site/StoryCard";
import CardsCarousel from "@/components/site/CardsCarousel";
import { liveStudies, youtubeId, caseStudiesDefaults, videoTestimonialsDefaults, reviewsDefaults } from "@/content/stories";

type Section = { eyebrow?: string; heading?: string; intro?: string; productFilter?: string };

const matches = (product: string, filter: string) => !filter.trim() || product.toLowerCase().includes(filter.trim().toLowerCase());

/** Video testimonials and customer reviews for one product, styled like the executive college case studies. */
export default function StoriesSection({
  section,
  content,
  className = "",
  showCaseStudies = false,
  caseStudies = caseStudiesDefaults,
  videoTestimonials = videoTestimonialsDefaults,
  reviews = reviewsDefaults,
}: {
  section?: Section;
  content?: Section;
  className?: string;
  showCaseStudies?: boolean;
  caseStudies?: any;
  videoTestimonials?: any;
  reviews?: any;
}) {
  const sec = section || content || { eyebrow: "", heading: "", intro: "", productFilter: "" };
  const filter = sec.productFilter || "";
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const studies = liveStudies(caseStudies.studies)
    .filter((s: any) => matches(s.product, filter))
    .slice(0, 4);

  const allVideos = videoTestimonials.videos
    .map((v: any, idx: number) => ({
      ...v,
      id: v.id || `video-${idx + 1}`,
      ytId: youtubeId(v.youtubeLink || ""),
      posterImage: v.posterImage || (idx % 3 === 0 ? "/college/video-thumb-arvind.jpg" : idx % 3 === 1 ? "/college/video-thumb-meenakshi.jpg" : "/college/video-thumb-rameshwar.jpg"),
      headline: v.headline || "BUILDING WORLD-CLASS ACADEMIC COMMUNITIES",
      tag: v.tag || v.product || "Autonomous Engineering",
      duration: v.duration || "3:45 mins",
      metric: v.metric || "+184% Enrollment Velocity",
      caseStudyType: v.caseStudyType || "EXECUTIVE LEADERSHIP CASE STUDY:",
      interviewTitle: v.interviewTitle || `${v.name} • ${v.company}`,
      episodeTitle: v.episodeTitle || v.headline || "Institutional Transformation & Scaled Growth",
      transcript: v.transcript || v.quote || "Our team achieved verifiable velocity within 30 days of implementation.",
    }))
    .filter((v: any) => matches(v.product, filter));

  const reviewList = reviews.items.filter((r: any) => r.quote && matches(r.product, filter)).slice(0, 12);

  if (!studies.length && !allVideos.length && !reviewList.length) return null;

  const vt = videoTestimonials.page;
  const cs = caseStudies.page;

  return (
    <section aria-labelledby="stories-h" className={`border-t border-pulse-line bg-pulse-bg ${className}`}>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-[clamp(20px,4vw,40px)] py-[clamp(64px,9vw,112px)]">
        <div className="flex flex-col gap-4">
          <p className="font-code text-xs tracking-[0.08em] text-pulse uppercase">{sec.eyebrow}</p>
          <h2 id="stories-h" className="max-w-[760px] text-[clamp(30px,3.8vw,44px)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance text-pulse-ink">
            {sec.heading}
          </h2>
          {sec.intro && <p className="max-w-[640px] text-[17px] leading-relaxed text-pulse-muted">{sec.intro}</p>}
        </div>

        {/* 1. Video testimonials carousel: matching the 4K executive layout of College page */}
        {allVideos.length > 0 && (
          <CardsCarousel
            title={vt.eyebrow || "Video testimonials"}
            viewAllLabel={vt.viewAllLabel || "View all videos"}
            viewAllLink="/video-testimonials"
          >
            {allVideos.map((card: any) => (
              <div
                key={card.id}
                onClick={() => {
                  setActiveVideo(card);
                  setShowVideoPopup(true);
                }}
                className="group cursor-pointer rounded-3xl border border-slate-200/90 p-4 bg-white shadow-2xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between w-[min(100%,380px)] min-w-[320px] shrink-0 snap-start"
              >
                {/* Executive Video Thumbnail Box */}
                <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner group-hover:border-emerald-500/60 transition-colors">
                  {/* High-res executive poster image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.posterImage}
                    alt={card.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                  />

                  {/* Gradient Overlay for high-contrast typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 group-hover:from-black/75 transition-colors pointer-events-none" />

                  {/* Top Golden Headline & 4K badge */}
                  <div className="absolute top-3 inset-x-3.5 flex items-start justify-between gap-2 z-10 pointer-events-none">
                    <span className="font-heading font-black text-amber-400 text-xs tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-1 pr-2">
                      {card.headline}
                    </span>
                    <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded bg-black/65 backdrop-blur-md border border-amber-400/40 text-[10px] font-black text-amber-400 shadow-sm">
                      <span>4K</span>
                      <span className="text-[8px] text-amber-300">▶</span>
                    </div>
                  </div>

                  {/* Central Emerald Play Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideo(card);
                      setShowVideoPopup(true);
                    }}
                    className="relative z-10 h-14 w-14 rounded-full bg-emerald-600/90 text-white backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-emerald-500 transition-all duration-300 cursor-pointer"
                    aria-label={`Play ${card.name} video interview`}
                  >
                    <svg className="w-5 h-5 ml-0.5 fill-white text-white" viewBox="0 0 24 24">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  </button>

                  {/* Bottom case study category */}
                  <div className="absolute bottom-9 right-3 z-10 pointer-events-none">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {card.caseStudyType}
                    </span>
                  </div>

                  {/* Bottom-left pill badge */}
                  <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/75 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{card.tag}</span>
                  </div>

                  {/* Bottom-right duration */}
                  <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/75 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[10px] font-mono text-slate-200 flex items-center gap-1">
                    <span className="text-[9px] font-bold text-emerald-300 font-sans">4K</span>
                    <span>•</span>
                    <span>{card.duration}</span>
                  </div>
                </div>

                {/* Card Info Below Thumbnail */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-800 border border-emerald-200">
                      {card.metric}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      Watch Story →
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {card.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {card.role} • <span className="text-slate-700 font-semibold">{card.company}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic border-t border-slate-100 pt-2">
                    &quot;{card.quote}&quot;
                  </p>
                </div>
              </div>
            ))}
          </CardsCarousel>
        )}

        {/* 2. Customer reviews carousel */}
        {reviewList.length > 0 && (
          <CardsCarousel title={reviews.heading}>
            {reviewList.map((r: any, i: number) => {
              const stars = Math.max(0, Math.min(5, Math.round(r.rating)));
              return (
                <div key={i} className="w-[min(100%,360px)] min-w-[300px] shrink-0 snap-start">
                  <figure className="flex h-full flex-col gap-4 rounded-3xl border border-pulse-line bg-white p-6 shadow-[0_18px_40px_-30px_rgba(14,19,48,0.3)] transition-transform duration-200 hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <span role="img" aria-label={`${stars} out of 5 stars`} className="flex gap-0.5 text-lg leading-none">
                        {[0, 1, 2, 3, 4].map((n: number) => (
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
                    <blockquote className="text-base leading-relaxed font-semibold text-pulse-ink">&quot;{r.quote}&quot;</blockquote>
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
                </div>
              );
            })}
          </CardsCarousel>
        )}

        {/* 3. Optional Case studies carousel */}
        {showCaseStudies && studies.length > 0 && (
          <CardsCarousel title={cs.eyebrow} viewAllLabel={cs.viewAllLabel} viewAllLink="/case-studies">
            {studies.map((s: any, i: number) => (
              <div key={s.slug} className="w-[min(100%,380px)] min-w-[320px] shrink-0 snap-start">
                <StoryCard study={s} index={i} text={cs} />
              </div>
            ))}
          </CardsCarousel>
        )}
      </div>

      {/* Interactive Video Modal Popup */}
      {showVideoPopup && activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowVideoPopup(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex flex-col gap-1">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                  <span>{activeVideo.tag} • {activeVideo.duration}</span>
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                  {activeVideo.interviewTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {activeVideo.ytId ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo.ytId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>Watch on YouTube</span>
                    <span>→</span>
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => setShowVideoPopup(false)}
                  className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition cursor-pointer"
                  aria-label="Close video player"
                >
                  <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Player */}
            {activeVideo.ytId ? (
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.ytId}?autoplay=1&rel=0`}
                  title={activeVideo.episodeTitle || "Video Interview"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center">
                <img src={activeVideo.posterImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="relative z-10 text-center text-white p-6">
                  <h4 className="text-xl font-bold mb-2">{activeVideo.episodeTitle}</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">{activeVideo.transcript}</p>
                </div>
              </div>
            )}

            {/* Video Story Takeaway */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Verified Commercial Impact: {activeVideo.metric}
              </span>
              <p className="text-sm leading-relaxed text-slate-700 italic">
                &quot;{activeVideo.quote}&quot;
              </p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                <strong>Executive Summary: </strong>
                {activeVideo.transcript}
              </div>
            </div>

            {/* Modal Footer Call to Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500">
                Explore how Uptrix transforms operations for organizations like {activeVideo.company}.
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href="/crm#demo"
                  onClick={() => setShowVideoPopup(false)}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 transition shadow-sm"
                >
                  Schedule 1-on-1 Demo
                </Link>
                <Link
                  href="/case-studies"
                  onClick={() => setShowVideoPopup(false)}
                  className="rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 transition"
                >
                  Read All Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
