"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home";
import { ChevronLeft, ChevronRight, Star } from "./icons";

const avatars = [
  ["#EEF2FF", "#4338CA"],
  ["#CCFBF1", "#115E59"],
  ["#FEF3C7", "#92400E"],
];

export default function Testimonials({ content }: { content: HomeContent["testimonials"] }) {
  const testimonials = content.items;
  const [start, setStart] = useState(0);
  const [perView, setPerView] = useState(3);
  const touchX = useRef(0);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setPerView(w < 720 ? 1 : w < 1100 ? 2 : 3);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxStart = Math.max(0, testimonials.length - perView);
  const ti = Math.min(start, maxStart);
  const setT = (n: number) => setStart(Math.max(0, Math.min(maxStart, n)));

  const navBtn =
    "grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-900";

  return (
    <div aria-roledescription="carousel">
      <div className="mb-[clamp(28px,5vw,48px)] flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-bold tracking-[.12em] text-indigo-700 uppercase">{content.eyebrow}</span>
          <h2 id="testi-heading" className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-slate-900">
            {content.heading}
          </h2>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setT(ti - 1)} disabled={ti === 0} aria-label="Previous testimonials" className={navBtn}>
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => setT(ti + 1)} disabled={ti === maxStart} aria-label="Next testimonials" className={navBtn}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        className="-mx-2.5 overflow-hidden"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) setT(ti + (dx < 0 ? 1 : -1));
        }}
      >
        <ul
          className="flex transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ transform: `translateX(-${(ti * 100) / perView}%)` }}
        >
          {testimonials.map((t, i) => (
            <li
              key={i}
              aria-hidden={i < ti || i >= ti + perView}
              className="flex p-2.5"
              style={{ flex: `0 0 ${100 / perView}%` }}
            >
              <figure className="relative flex flex-1 flex-col gap-6 overflow-hidden rounded-[20px] bg-white px-8 pt-9 pb-7 shadow-[0_1px_2px_rgba(15,23,42,.04),0_20px_40px_-32px_rgba(15,23,42,.3)] transition hover:-translate-y-1">
                <span aria-hidden className="absolute -top-[18px] right-5 font-serif text-[140px] leading-none text-indigo-50">
                  “
                </span>
                <div role="img" aria-label="5 out of 5 stars" className="relative flex gap-[3px] text-amber-500">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} />
                  ))}
                </div>
                <blockquote className="relative flex-1 font-display text-[19px] leading-normal font-semibold text-pretty text-slate-900">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {/* PLACEHOLDER: replace with avatar photo */}
                  <span
                    aria-hidden
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-semibold"
                    style={{ background: avatars[i % 3][0], color: avatars[i % 3][1] }}
                  >
                    {t.name
                      .split(" ")
                      .filter(Boolean)
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="flex min-w-0 flex-col leading-snug">
                    <strong className="text-[15px] font-semibold text-slate-900">{t.name}</strong>
                    <span className="text-sm">
                      {[[t.role, t.company].filter(Boolean).join(", "), t.city].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-1">
        {Array.from({ length: maxStart + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setT(i)}
            aria-label={`Show testimonials ${i + 1}`}
            aria-current={i === ti}
            className="grid h-11 w-7 cursor-pointer place-items-center border-0 bg-transparent p-0"
          >
            <span
              className="block h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === ti ? 24 : 8, background: i === ti ? "#0F172A" : "#CBD5E1" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
