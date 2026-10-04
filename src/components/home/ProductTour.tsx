"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { ArrowRight, Check } from "./icons";

// Look of each tab, by position. The text comes from the admin dashboard.
const looks = [
  { color: "#4F46E5", frame: "linear-gradient(160deg,#E0E7FF 0%,#EEF2FF 100%)" },
  { color: "#0F766E", frame: "linear-gradient(160deg,#CCFBF1 0%,#F0FDFA 100%)" },
];

export default function ProductTour({ content }: { content: HomeContent["productTour"] }) {
  const [tab, setTab] = useState(0);
  const tabs = content.tabs;
  const i = Math.min(tab, Math.max(0, tabs.length - 1));
  const t = tabs[i];
  const look = looks[i % looks.length];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-[13px] font-bold tracking-[.12em] text-indigo-700 uppercase">{content.eyebrow}</span>
        <h2 id="tour-heading" className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance text-slate-900">
          {content.heading}
        </h2>
        <p className="max-w-[520px] text-pretty">{content.body}</p>
        {tabs.length > 1 && (
          <div role="tablist" aria-label="Choose product" className="mt-2 flex flex-wrap justify-center gap-1 rounded-full border border-slate-200 bg-white p-[5px]">
            {tabs.map((k, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                id={`tour-tab-${n}`}
                aria-selected={i === n}
                aria-controls={`tour-panel-${n}`}
                onClick={() => setTab(n)}
                className={`h-11 cursor-pointer rounded-full px-6.5 text-[15px] font-semibold transition ${
                  i === n ? "bg-slate-900 text-white" : "bg-transparent text-slate-600"
                }`}
              >
                {k.tabLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {t && (
        <div id={`tour-panel-${i}`} role="tabpanel" aria-labelledby={`tour-tab-${i}`} className="flex flex-col gap-8">
          {/* PLACEHOLDER: replace with a real product screenshot */}
          <div className="overflow-hidden rounded-3xl px-[clamp(16px,3vw,40px)] pt-[clamp(16px,3vw,40px)]" style={{ background: look.frame }}>
            <div className="overflow-hidden rounded-t-[14px] border border-b-0 border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,.3)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-slate-100 px-3.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-[9px] w-[9px] rounded-full bg-slate-200" />
                ))}
              </div>
              <div role="img" aria-label={`Placeholder: ${t.screenshotLabel}`} className="placeholder-stripes-grey grid aspect-[16/7] place-items-center">
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-600">{t.screenshotLabel}</span>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-6 gap-y-4">
            {t.points.map((p, n) => (
              <li key={n} className="flex items-start gap-2.5 text-[15px] leading-normal text-slate-900">
                <span
                  className="-mt-px grid h-6 w-6 shrink-0 place-items-center rounded-full"
                  style={{ background: `${look.color}1A`, color: look.color }}
                >
                  <Check />
                </span>
                {p}
              </li>
            ))}
          </ul>
          {t.buttonLabel && (
            <a
              href={t.buttonLink || "#"}
              className="inline-flex h-12 shrink-0 items-center gap-2 self-center rounded-xl bg-indigo-brand px-5.5 text-base font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(79,70,229,.6)]"
            >
              {t.buttonLabel} <ArrowRight />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
