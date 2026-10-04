"use client";

import { useEffect, useState } from "react";

type Step = { title: string; body: string; tag: string };

export default function HowSteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (steps.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2400);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="flex flex-col gap-3.5">
      <div aria-hidden className="hidden h-1 overflow-hidden rounded-full bg-[#dcdef3] min-[1100px]:block">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pulse to-[#8b4fd8] transition-[width] duration-600"
          style={{ width: `${((Math.min(active, steps.length - 1) + 1) / Math.max(1, steps.length)) * 100}%` }}
        />
      </div>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5 p-0 min-[1100px]:grid-cols-6">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li
              key={i}
              onMouseEnter={() => setActive(i)}
              className={`flex min-h-[200px] flex-col gap-3.5 rounded-[18px] border px-[18px] py-5 transition-[background-color,color,box-shadow,border-color] duration-350 ${
                on
                  ? "border-pulse bg-pulse text-white shadow-[0_20px_40px_-20px_rgba(59,63,212,0.6)]"
                  : "border-[#e3e5f3] bg-white text-pulse-ink"
              }`}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-[10px] text-sm font-extrabold transition duration-350 ${
                  on ? "bg-white/[0.18] text-white" : "bg-pulse-soft text-pulse"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-extrabold tracking-[-0.01em]">{s.title}</h3>
                <p className={`text-sm leading-normal transition-colors duration-350 ${on ? "text-[#dfe0ff]" : "text-pulse-subtle"}`}>{s.body}</p>
              </div>
              <span className={`mt-auto font-code text-[11px] tracking-[0.04em] transition-colors duration-350 ${on ? "text-[#c9cbff]" : "text-[#8a8fa8]"}`}>
                {s.tag}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
