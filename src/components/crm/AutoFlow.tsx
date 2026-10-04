"use client";

import { useEffect, useState } from "react";

export default function AutoFlow({ flow }: { flow: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (flow.length < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % flow.length), 1400);
    return () => clearInterval(t);
  }, [flow.length]);

  return (
    <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,128px),1fr))] gap-2.5 p-0">
      {flow.map((label, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li
            key={i}
            className={`flex min-h-24 flex-col justify-between gap-3 rounded-[14px] border px-4 py-[18px] transition-[background-color,color,border-color] duration-400 ${
              on ? "border-pulse bg-pulse text-white" : done ? "border-[#d6d7f7] bg-pulse-soft text-pulse-ink" : "border-[#e1e3ee] bg-white text-pulse-ink"
            }`}
          >
            <span className="font-code text-[11px] opacity-75">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[15px] leading-tight font-extrabold">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
