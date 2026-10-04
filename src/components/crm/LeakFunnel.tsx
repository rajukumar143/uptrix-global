"use client";

import { useEffect, useRef, useState } from "react";

type Stage = { name: string; leads: number; percent: number };

const H = 200;
const Y = 50;
const BW = 120;

function build(stages: Stage[]) {
  const step = stages.length > 1 ? (1000 - BW) / (stages.length - 1) : 0;
  const funnel = stages.map((st, i) => {
    const pct = Math.max(0, Math.min(100, st.percent));
    return { name: st.name, n: st.leads, pct, x: i * step, h: Math.max(Math.round((H * pct) / 100), 48), left: `${(i * step) / 10}%` };
  });
  const links = funnel.slice(0, -1).map((f, i) => {
    const g = funnel[i + 1];
    const x1 = f.x + BW;
    const x2 = g.x;
    const ya = Y + g.h;
    const yb = Y + f.h;
    return {
      kept: `M${x1} ${Y} L${x2} ${Y} L${x2} ${ya} L${x1} ${ya} Z`,
      leak: `M${x1} ${ya} C${x1 + 55} ${ya} ${x1 + 60} 250 ${x1 + 70} 290 L${x1 + 30} 290 C${x1 + 25} 260 ${x1 + 20} ${yb} ${x1} ${yb} Z`,
      lost: f.pct - g.pct,
      left: `${(x1 - 10) / 10}%`,
    };
  });
  return { funnel, links };
}

export default function LeakFunnel({ stages, leadsWord, lostLabel }: { stages: Stage[]; leadsWord: string; lostLabel: string }) {
  const { funnel, links } = build(stages);
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Wide: sankey-style flow */}
      <div className="hidden flex-col gap-1.5 min-[760px]:flex">
        <div className="relative h-14">
          {funnel.map((f, i) => (
            <div key={i} className="absolute top-0 flex w-[12%] flex-col gap-0.5" style={{ left: f.left }}>
              <span className="font-code text-[11px] tracking-[0.08em] whitespace-nowrap text-[#a9abff]">{f.name}</span>
              <span className="text-[15px] font-bold whitespace-nowrap text-white">
                {f.n} <span className="font-medium text-[#9a9ccc]">{leadsWord}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-[340px]">
          <svg viewBox="0 0 1000 340" preserveAspectRatio="none" width="100%" height="340" aria-hidden className="absolute inset-0 block">
            <defs>
              <linearGradient id="lkStage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a5a7ff" />
                <stop offset="1" stopColor="#5b5ff0" />
              </linearGradient>
              <linearGradient id="lkLeak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff8a5c" stopOpacity="0.75" />
                <stop offset="1" stopColor="#ff8a5c" stopOpacity="0" />
              </linearGradient>
            </defs>
            {links.map((k, i) => (
              <g key={i}>
                <path d={k.kept} fill="#5b5ff0" fillOpacity="0.28" />
                <path d={k.leak} fill="url(#lkLeak)" />
              </g>
            ))}
            {funnel.map((f, i) => (
              <rect key={i} x={f.x} y={Y} width={BW} height={f.h} rx="10" fill="url(#lkStage)" />
            ))}
          </svg>
          {funnel.map((f, i) => (
            <span key={i} className="absolute top-[60px] w-[12%] text-center text-lg font-extrabold text-pulse-night" style={{ left: f.left }}>
              {f.pct}%
            </span>
          ))}
          {links.map((k, i) => (
            <div key={i} className="absolute bottom-0 flex w-[12%] flex-col items-center gap-0.5 text-center" style={{ left: k.left }}>
              <span className="text-xl font-extrabold tracking-[-0.02em] text-[#ff9b75]">−{k.lost}%</span>
              <span className="text-xs whitespace-nowrap text-[#c9cbf0]">{lostLabel}</span>
            </div>
          ))}
          {/* Wipe-in: a section-coloured cover that shrinks away to the right */}
          <div
            aria-hidden
            className={`absolute -inset-1 origin-right bg-pulse-night transition-transform duration-[1600ms] ease-[cubic-bezier(.3,.6,.2,1)] ${
              on ? "scale-x-0" : "scale-x-100"
            }`}
          />
        </div>
      </div>

      {/* Narrow: stacked bars */}
      <ol className="m-0 flex list-none flex-col gap-1.5 p-0 min-[760px]:hidden">
        {funnel.map((f, i) => (
          <li key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between gap-3 text-[13px]">
              <span className="font-code tracking-[0.06em] whitespace-nowrap text-[#c9cbf0]">
                {f.name} <span className="text-[#8a8cc0]">· {f.n}</span>
              </span>
              <span className="font-extrabold text-white">{f.pct}%</span>
            </div>
            <div className="h-7 overflow-hidden rounded-lg bg-white/[0.06]">
              <div
                className="h-full rounded-lg bg-gradient-to-r from-[#5b5ff0] to-[#a5a7ff] transition-[width] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ width: on ? `${f.pct}%` : "0%", transitionDelay: `${i * 0.12}s` }}
              />
            </div>
            {i < funnel.length - 1 && (
              <span className="pt-0.5 pb-1.5 text-xs font-bold text-[#ff9b75]">↓ −{f.pct - funnel[i + 1].pct}% {lostLabel}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
