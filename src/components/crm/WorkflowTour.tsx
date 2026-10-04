"use client";

import { useState } from "react";
import type { CrmContent } from "@/content/crm";
import Shot from "./Shot";

export default function WorkflowTour({ content }: { content: CrmContent["workflowTour"] }) {
  const [tab, setTab] = useState(0);
  const tabs = content.tabs;
  const i = Math.min(tab, Math.max(0, tabs.length - 1));
  const cur = tabs[i];
  const stages = cur?.pipelineStages.filter(Boolean) ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 id="tour-h" className="max-w-[520px] text-[clamp(26px,3vw,34px)] leading-[1.15] font-extrabold tracking-[-0.02em]">
          {content.heading}
        </h2>
        {tabs.length > 1 && (
          <div role="tablist" aria-label="Product areas" className="flex flex-wrap gap-1.5 rounded-[14px] bg-[#f3f4f8] p-1.5">
            {tabs.map((t, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                id={`tour-tab-${n}`}
                aria-selected={n === i}
                aria-controls="tour-panel"
                onClick={() => setTab(n)}
                className={`min-h-11 cursor-pointer rounded-[10px] border-0 px-4 text-sm font-bold transition ${
                  n === i ? "bg-white text-pulse-ink shadow-[0_1px_3px_rgba(14,19,48,0.12)]" : "bg-transparent text-pulse-subtle"
                }`}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {cur && (
        <div
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tour-tab-${i}`}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-[clamp(28px,4vw,56px)] rounded-3xl border border-pulse-line bg-pulse-bg p-[clamp(20px,3.5vw,44px)]"
        >
          <div className="flex max-w-[440px] flex-col gap-4">
            <h3 className="text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-extrabold tracking-[-0.02em]">{cur.title}</h3>
            <p className="text-base leading-relaxed text-pulse-muted">{cur.body}</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {cur.points.map((p, n) => (
                <li key={n} className="flex items-start gap-2.5 text-[15px] font-semibold text-[#2a2f4d]">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-pulse" />
                  {p}
                </li>
              ))}
            </ul>
            {stages.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {stages.map((a, n) => {
                  const last = n === stages.length - 1;
                  const late = n >= stages.length / 2;
                  return (
                    <span
                      key={n}
                      className={`rounded-lg px-2.5 py-[7px] text-xs font-bold ${
                        last ? "bg-[#22b07d] text-white" : late ? "bg-pulse text-white" : "bg-[#e4e5f7] text-[#2a2f4d]"
                      }`}
                    >
                      {a}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div className="aspect-[16/10] min-w-0 overflow-hidden rounded-2xl border border-[#e1e3ee] bg-white shadow-[0_30px_60px_-40px_rgba(30,34,120,0.4)]">
            <Shot label={cur.screenshotLabel} />
          </div>
        </div>
      )}
    </div>
  );
}
