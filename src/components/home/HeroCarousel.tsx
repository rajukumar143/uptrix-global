"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";

type Slide = HomeContent["heroSlides"][number];
type Stat = HomeContent["heroStats"][number];

// Look of the three stat cards (position and colour). Placed in open background/table areas to avoid covering people.
const statStyles = [
  { color: "#4F46E5", pos: { top: "18%", left: "50%" }, dur: "6s", delay: "0s" },
  { color: "#14B8A6", pos: { top: "14%", right: "5%" }, dur: "7s", delay: "-2s" },
  { color: "#F59E0B", pos: { bottom: "14%", left: "56%" }, dur: "6.5s", delay: "-4s" },
];

export default function HeroCarousel({ slides, stats: statText }: { slides: Slide[]; stats: Stat[] }) {
  const stats = statText.slice(0, statStyles.length).map((s, i) => ({ ...s, ...statStyles[i] }));

  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused && !document.hidden) setSlide((s) => (s + 1) % Math.max(1, slides.length));
    }, 6000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const go = (i: number) => setSlide((i + slides.length) % Math.max(1, slides.length));

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Uptrix products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(slide + (dx < 0 ? 1 : -1));
      }}
      className="relative overflow-hidden bg-navy"
    >
      <div
        aria-live="polite"
        className="flex transition-transform duration-800 ease-[cubic-bezier(.65,0,.35,1)]"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {slides.map((s, i) => {
          const on = i === slide;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!on}
              className="relative flex min-h-[clamp(600px,88vh,760px)] min-w-0 flex-[0_0_100%] items-center"
              style={{ visibility: on ? "visible" : "hidden", transition: "visibility .8s" }}
            >
              {/* Real slide photo */}
              <div className="absolute inset-y-0 right-0 w-full overflow-hidden bg-[#16224A] lg:w-[62%]">
                <Image
                  src={
                    ("image" in s && typeof s.image === "string" && s.image)
                      ? s.image
                      : ["/images/hero/hero-team.jpg", "/images/hero/hero-hrms.jpg", "/images/hero/hero-crm.jpg"][i % 3]
                  }
                  alt={s.photoDescription || "Uptrix business platform"}
                  fill
                  priority={i === 0}
                  className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 62vw"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,20,51,.55)_0%,rgba(11,20,51,.92)_55%,#0B1433_100%)] lg:hidden"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(90deg, #0B1433 0%, #0B1433 36%, rgba(11,20,51,.75) 50%, rgba(11,20,51,.15) 72%, rgba(11,20,51,0) 100%), linear-gradient(0deg, rgba(11,20,51,.6) 0%, rgba(11,20,51,0) 30%)",
                }}
              />

              <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pt-24 pb-26 sm:px-6 sm:pt-26 sm:pb-30">
                <div className="flex max-w-[600px] flex-col gap-6">
                  <span className="text-[13px] font-semibold tracking-[.12em] text-indigo-300 uppercase">{s.eyebrow}</span>
                  <Heading className="m-0 font-display text-[clamp(32px,4.6vw,56px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance text-white">
                    {s.headingStart}
                    <span className="text-indigo-300">{s.headingHighlight}</span>
                    {s.headingEnd}
                  </Heading>
                  <p className="m-0 max-w-[540px] text-[clamp(16px,1.4vw,18px)] text-pretty text-slate-300">{s.body}</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href={s.primaryButtonLink}
                      tabIndex={on ? 0 : -1}
                      className="inline-flex h-13 shrink-0 items-center gap-2 rounded-xl bg-indigo-brand px-6 text-base font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(99,102,241,.8)]"
                    >
                      {s.primaryButtonLabel} <ArrowRight />
                    </a>
                    {s.secondaryButtonLabel && (
                      <a
                        href={s.secondaryButtonLink || "#"}
                        tabIndex={on ? 0 : -1}
                        className="inline-flex h-13 shrink-0 items-center rounded-xl border-[1.5px] border-white/40 bg-white/5 px-6 text-base font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                      >
                        {s.secondaryButtonLabel}
                      </a>
                    )}
                  </div>
                  {/* Mobile stat row */}
                  <div className="mt-2 grid grid-cols-3 gap-2 lg:hidden">
                    {stats.map((st) => (
                      <div
                        key={st.color}
                        className="flex flex-col gap-0.5 rounded-xl border border-white/15 bg-slate-900/55 px-3 py-2.5"
                        style={{ borderTop: `3px solid ${st.color}` }}
                      >
                        <strong className="font-display text-base leading-tight text-white">{st.value}</strong>
                        <span className="text-[11.5px] leading-snug text-slate-300">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat cards (desktop) */}
              {stats.map((st) => (
                <div
                  key={st.color}
                  className="animate-float pointer-events-none absolute z-20 hidden items-center gap-3 rounded-[14px] border border-white/15 bg-slate-900/55 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,.5)] backdrop-blur-[14px] lg:flex"
                  style={{ ...st.pos, animationDuration: st.dur, animationDelay: st.delay }}
                >
                  <span className="h-[34px] w-1 rounded-full" style={{ background: st.color }} />
                  <span className="flex flex-col leading-tight">
                    <strong className="font-display text-lg text-white">{st.value}</strong>
                    <span className="text-[13px] text-slate-300">{st.label}</span>
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6">
          <button
            type="button"
            onClick={() => go(slide - 1)}
            aria-label="Previous slide"
            className="pointer-events-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/30 bg-slate-900/40 text-white transition hover:border-white hover:bg-white/15"
          >
            <ChevronLeft />
          </button>
          <div role="tablist" aria-label="Choose slide" className="pointer-events-auto flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === slide}
                className="grid h-11 cursor-pointer place-items-center border-0 bg-transparent p-0 transition-[width] duration-300"
                style={{ width: i === slide ? 36 : 20 }}
              >
                <span
                  className="block h-2 rounded-full transition-all duration-300"
                  style={{ width: i === slide ? 28 : 8, background: i === slide ? "#fff" : "rgba(255,255,255,.35)" }}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(slide + 1)}
            aria-label="Next slide"
            className="pointer-events-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/30 bg-slate-900/40 text-white transition hover:border-white hover:bg-white/15"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
