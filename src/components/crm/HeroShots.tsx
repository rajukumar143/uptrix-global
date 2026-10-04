"use client";

import { useEffect, useRef, useState } from "react";
import Shot from "./Shot";

export default function HeroShots({ tabs, address, labelPrefix }: { tabs: string[]; address: string; labelPrefix: string }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const count = tabs.length;

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % count);
    }, 5000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div id="product" className="flex min-w-0 scroll-mt-24 flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-[#e1e3ee] bg-white shadow-[0_40px_80px_-40px_rgba(30,34,120,0.35),0_2px_6px_rgba(14,19,48,0.05)]">
        <div className="flex h-[38px] items-center gap-[7px] border-b border-[#eceef5] bg-[#fafbfd] px-3.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#e4e5ee]" />
          ))}
          <span className="ml-3 flex h-[22px] max-w-[260px] flex-1 items-center overflow-hidden rounded-md bg-[#f0f1f6] px-2.5 font-code text-[11px] whitespace-nowrap text-pulse-faint">
            {address}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-[#f3f4f9]">
          {tabs.map((s, i) => (
            <div
              key={i}
              id={`hero-shot-${i}`}
              role="tabpanel"
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-600 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <Shot label={`${labelPrefix} ${s}`.trim()} />
            </div>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div role="tablist" aria-label="Product views" className="flex flex-wrap gap-2">
          {tabs.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`hero-shot-${i}`}
              onClick={() => {
                paused.current = true;
                setActive(i);
              }}
              className={`min-h-10 cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition ${
                i === active ? "border-pulse-ink bg-pulse-ink text-white" : "border-[#d9dbe6] bg-white text-[#2a2f4d]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
