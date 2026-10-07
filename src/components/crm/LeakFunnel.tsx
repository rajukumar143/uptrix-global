"use client";

import { useEffect, useRef, useState } from "react";

type Stage = { name: string; leads: number; percent: number; fix?: string };

const H = 135;
const Y = 26;
const BW = 110;
const DROP_Y = 186;
const SVG_H = 230;

function build(stages: Stage[]) {
  const step = stages.length > 1 ? (1000 - BW) / (stages.length - 1) : 0;
  const funnel = stages.map((st, i) => {
    const pct = Math.max(0, Math.min(100, st.percent));
    return { name: st.name, n: st.leads, pct, x: i * step, h: Math.max(Math.round((H * pct) / 100), 34), left: `${(i * step) / 10}%` };
  });
  const links = funnel.slice(0, -1).map((f, i) => {
    const g = funnel[i + 1];
    const x1 = f.x + BW;
    const x2 = g.x;
    const ya = Y + g.h;
    const yb = Y + f.h;
    return {
      kept: `M${x1} ${Y} L${x2} ${Y} L${x2} ${ya} L${x1} ${ya} Z`,
      leak: `M${x1} ${ya} C${x1 + 45} ${ya} ${x1 + 52} 155 ${x1 + 62} ${DROP_Y} L${x1 + 28} ${DROP_Y} C${x1 + 22} 160 ${x1 + 16} ${yb} ${x1} ${yb} Z`,
      lost: f.pct - g.pct,
      fix: stages[i + 1].fix || "",
      left: `${(x1 - 6) / 10}%`,
    };
  });
  return { funnel, links };
}

// "leak" shows the pipeline without Pulse (orange drop-offs); "win" shows it with Pulse (green, with what fixed each step)
const tones = {
  leak: { top: "#a5a7ff", bottom: "#5b5ff0", kept: "#5b5ff0", drop: "#ff8a5c", dropOpacity: 0.75 },
  win: { top: "#7ff0c2", bottom: "#1f9d6c", kept: "#22b07d", drop: "#9a9ccc", dropOpacity: 0.3 },
};

export default function LeakFunnel({
  stages,
  leadsWord,
  lostLabel,
  tone = "leak",
}: {
  stages: Stage[];
  leadsWord: string;
  lostLabel: string;
  tone?: keyof typeof tones;
}) {
  const { funnel, links } = build(stages);
  const t = tones[tone];
  const win = tone === "win";
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
      <div className="hidden flex-col gap-1 min-[760px]:flex">
        <div className="relative h-11">
          {funnel.map((f, i) => (
            <div key={i} className="absolute top-0 flex flex-col gap-0.5" style={{ left: f.left, width: `${BW / 10}%` }}>
              <span className="font-code text-[10px] tracking-[0.08em] whitespace-nowrap text-[#a9abff]">{f.name}</span>
              <span className="text-[13px] font-bold whitespace-nowrap text-white">
                {f.n} <span className="font-normal text-[#9a9ccc]">{leadsWord}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-[230px]">
          <svg viewBox="0 0 1000 230" preserveAspectRatio="none" width="100%" height="230" aria-hidden className="absolute inset-0 block">
            <defs>
              <linearGradient id={`${tone}Stage`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={t.top} />
                <stop offset="1" stopColor={t.bottom} />
              </linearGradient>
              <linearGradient id={`${tone}Leak`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={t.drop} stopOpacity={t.dropOpacity} />
                <stop offset="1" stopColor={t.drop} stopOpacity="0" />
              </linearGradient>
            </defs>
            {links.map((k, i) => (
              <g key={i}>
                <path d={k.kept} fill={t.kept} fillOpacity="0.28" />
                <path d={k.leak} fill={`url(#${tone}Leak)`} />
              </g>
            ))}
            {funnel.map((f, i) => (
              <rect key={i} x={f.x} y={Y} width={BW} height={f.h} rx="8" fill={`url(#${tone}Stage)`} />
            ))}
          </svg>
          {funnel.map((f, i) => (
            <span
              key={i}
              className="absolute top-[34px] text-center text-sm font-extrabold text-pulse-night"
              style={{ left: f.left, width: `${BW / 10}%` }}
            >
              {f.pct}%
            </span>
          ))}
          {links.map((k, i) => (
            <div
              key={i}
              className={`absolute bottom-0 flex flex-col items-center gap-0.5 text-center ${
                win ? "w-[16%] -translate-x-[15%]" : "w-[12%] -translate-x-[4%]"
              }`}
              style={{ left: k.left }}
            >
              {win && k.fix && <span className="text-xs leading-tight font-bold text-[#7ff0c2]">✓ {k.fix}</span>}
              <span className={win ? "text-[11px] whitespace-nowrap text-[#9a9ccc]" : "text-base font-extrabold tracking-[-0.02em] text-[#ff9b75]"}>
                −{k.lost}%{win && ` ${lostLabel}`}
              </span>
              {!win && <span className="text-[11px] whitespace-nowrap text-[#c9cbf0]">{lostLabel}</span>}
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
          <li key={i} className="flex flex-col gap-1">
            <div className="flex justify-between gap-3 text-xs">
              <span className="font-code tracking-[0.06em] whitespace-nowrap text-[#c9cbf0]">
                {f.name} <span className="text-[#8a8cc0]">· {f.n}</span>
              </span>
              <span className="font-extrabold text-white">{f.pct}%</span>
            </div>
            <div className="h-5.5 overflow-hidden rounded-md bg-white/[0.06]">
              <div
                className="h-full rounded-md transition-[width] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ width: on ? `${f.pct}%` : "0%", transitionDelay: `${i * 0.12}s`, background: `linear-gradient(to right, ${t.bottom}, ${t.top})` }}
              />
            </div>
            {i < funnel.length - 1 && (
              <span className={`pt-0.5 pb-1 text-[11px] font-bold ${win ? "text-[#7ff0c2]" : "text-[#ff9b75]"}`}>
                ↓ −{f.pct - funnel[i + 1].pct}% {lostLabel}
                {win && links[i].fix && <span className="font-semibold text-[#c9cbf0]"> · {links[i].fix}</span>}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
