"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function CardsCarousel({
  title,
  eyebrow,
  viewAllLabel,
  viewAllLink,
  children,
  theme = "light",
  autoPlay = true,
  autoPlayInterval = 3200,
  className = "",
}: {
  title: string | ReactNode;
  eyebrow?: string;
  viewAllLabel?: string;
  viewAllLink?: string;
  children: ReactNode;
  theme?: "light" | "dark";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Step forward or backward card by card, with smooth loop-around
  const stepCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (items.length === 0) return;

    const currentLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === 1) {
      // If at or close to end, wrap to start
      if (currentLeft >= maxScroll - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      const next = items.find((item) => item.offsetLeft > currentLeft + 20);
      if (next) {
        el.scrollTo({ left: Math.min(next.offsetLeft, maxScroll), behavior: "smooth" });
      } else {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    } else {
      // If at or close to start, wrap to end
      if (currentLeft <= 20) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }
      const prevItems = items.filter((item) => item.offsetLeft < currentLeft - 20);
      const prev = prevItems[prevItems.length - 1];
      if (prev) {
        el.scrollTo({ left: Math.max(0, prev.offsetLeft), behavior: "smooth" });
      } else {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      }
    }
  };

  // Automatic scrolling loop: steps card-by-card periodically
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = setInterval(() => {
      stepCard(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, autoPlayInterval]);

  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Header bar: Title on left, View All + Arrows on right */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          {eyebrow && (
            <p className={`font-code text-xs tracking-[0.08em] uppercase ${isDark ? "text-emerald-400" : "text-pulse"}`}>
              {eyebrow}
            </p>
          )}
          {typeof title === "string" ? (
            <h3 className={`text-xl font-extrabold sm:text-2xl ${isDark ? "text-white" : "text-pulse-ink"}`}>
              {title}
            </h3>
          ) : (
            title
          )}
        </div>

        <div className="flex items-center gap-3">
          {viewAllLabel && viewAllLink && (
            <Link
              href={viewAllLink}
              className={`mr-1 text-sm font-bold transition ${
                isDark ? "text-emerald-400 hover:text-emerald-300" : "text-pulse hover:text-pulse-hover"
              }`}
            >
              {viewAllLabel} →
            </Link>
          )}

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous items"
              onClick={() => stepCard(-1)}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isDark
                  ? "border-white/20 bg-white/5 text-white hover:border-white/60 hover:bg-white/15"
                  : "border-[#d9dbe6] bg-white text-pulse-ink hover:border-pulse hover:text-pulse shadow-2xs"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Next items"
              onClick={() => stepCard(1)}
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isDark
                  ? "border-white/20 bg-white/5 text-white hover:border-white/60 hover:bg-white/15"
                  : "border-[#d9dbe6] bg-white text-pulse-ink hover:border-pulse hover:text-pulse shadow-2xs"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track: Scrollbar strictly removed and hidden across all devices */}
      <div
        ref={scrollerRef}
        data-carousel="track"
        data-no-scrollbar="true"
        className="relative flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar sm:gap-6 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {children}
      </div>
    </div>
  );
}
