"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

const tabDots = ["bg-[#ff8a5c]", "bg-[#22b07d]"];
const themes = {
  dark: {
    tabs: "border-white/12 bg-white/[0.05]",
    tabOn: "bg-white text-pulse-night",
    tabOff: "text-[#c9cbf0] hover:text-white",
    arrow: "border-white/20 text-white hover:border-white/60",
    dotOn: "bg-white",
    dotOff: "bg-white/30",
  },
  light: {
    tabs: "border-pulse-line bg-pulse-bg",
    tabOn: "bg-pulse-night text-white",
    tabOff: "text-pulse-muted hover:text-pulse-ink",
    arrow: "border-[#d9dbe6] bg-white text-pulse-ink hover:border-pulse",
    dotOn: "bg-pulse-ink",
    dotOff: "bg-[#d4d7e4]",
  },
};
const AUTOPLAY_MS = 9000;

/** Slides between "without Pulse" and "with Pulse" views. Moves on by itself until the visitor takes over. */
export default function PipelineCarousel({
  labels,
  children,
  theme = "dark",
  id = "pipe",
}: {
  labels: string[];
  children: ReactNode;
  theme?: keyof typeof themes;
  id?: string;
}) {
  const t = themes[theme];
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (i: number) => {
    setUserPicked(true);
    setIndex((i + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused || userPicked || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, userPicked, slides.length]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.join(" / ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      className="flex flex-col gap-[clamp(24px,3vw,36px)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Pipeline view" className={`flex rounded-full border p-1 ${t.tabs}`}>
          {labels.map((l, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={index === i}
              aria-controls={`${id}-slide-${i}`}
              onClick={() => go(i)}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                index === i ? t.tabOn : t.tabOff
              }`}
            >
              <span aria-hidden className={`h-2 w-2 rounded-full ${tabDots[i % tabDots.length]}`} />
              {l}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          {[-1, 1].map((d) => (
            <button
              key={d}
              type="button"
              aria-label={d < 0 ? "Previous" : "Next"}
              onClick={() => go(index + d)}
              className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition-colors ${t.arrow}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={d < 0 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-1 overflow-hidden">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.3,.6,.2,1)]" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div
              key={i}
              id={`${id}-slide-${i}`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${i}`}
              aria-hidden={index !== i}
              inert={index !== i}
              className="w-full shrink-0 px-1"
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2" aria-hidden>
        {slides.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? `w-8 ${t.dotOn}` : `w-1.5 ${t.dotOff}`}`} />
        ))}
      </div>
    </div>
  );
}
