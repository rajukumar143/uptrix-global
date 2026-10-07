"use client";

import { useState } from "react";
import type { CrmContent } from "@/content/crm";
import TourVideoPlayer from "./TourVideoPlayer";

export default function WorkflowTour({ content }: { content: CrmContent["workflowTour"] }) {
  const [tab, setTab] = useState(0);
  const tabs = content.tabs;
  const i = Math.min(tab, Math.max(0, tabs.length - 1));
  const cur = tabs[i];
  const stages = cur?.pipelineStages?.filter(Boolean) ?? [];

  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      {/* Section Header with Eyebrow and Tabs */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[620px] flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pulse/20 bg-pulse-soft/70 px-3.5 py-1 text-xs font-bold tracking-[0.06em] uppercase text-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
            Interactive Product Tour
          </div>
          <h2 id="tour-h" className="text-[clamp(28px,3.4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-pulse-night">
            {content.heading}
          </h2>
        </div>

        {tabs.length > 1 && (
          <div
            role="tablist"
            aria-label="Product areas"
            className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-[#eff1f7] p-1.5 shadow-xs"
          >
            {tabs.map((t, n) => {
              const active = n === i;
              return (
                <button
                  key={n}
                  type="button"
                  role="tab"
                  id={`tour-tab-${n}`}
                  aria-selected={active}
                  aria-controls="tour-panel"
                  onClick={() => setTab(n)}
                  className={`min-h-[44px] cursor-pointer rounded-xl px-4 text-sm font-bold transition-all duration-200 sm:px-5 ${
                    active
                      ? "bg-white text-pulse-night shadow-[0_4px_14px_rgba(14,19,48,0.08)] ring-1 ring-black/[0.04]"
                      : "bg-transparent text-pulse-subtle hover:bg-white/60 hover:text-pulse-ink"
                  }`}
                >
                  {t.tabLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Expansive Full-Screen Tour Panel */}
      {cur && (
        <div
          id="tour-panel"
          role="tabpanel"
          aria-labelledby={`tour-tab-${i}`}
          className="relative w-full rounded-[32px] border border-[#e1e4f2] bg-white p-[clamp(20px,3.5vw,52px)] shadow-[0_30px_70px_-30px_rgba(20,28,90,0.12)] ring-1 ring-black/[0.02]"
        >
          {/* Subtle soft gradient background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-pulse/5 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-[clamp(28px,4vw,60px)] min-[1040px]:grid-cols-[minmax(320px,440px)_minmax(0,1fr)] xl:grid-cols-[minmax(360px,480px)_minmax(0,1fr)]">
            {/* Left Column: Details & Capabilities */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <span className="font-code text-xs font-bold tracking-wider uppercase text-pulse">
                  Step {i + 1} of {tabs.length} · {cur.tabLabel}
                </span>
                <h3 className="text-[clamp(24px,2.6vw,34px)] leading-[1.18] font-extrabold tracking-[-0.025em] text-pulse-night">
                  {cur.title}
                </h3>
              </div>

              <p className="text-base leading-relaxed text-pretty text-pulse-muted">
                {cur.body}
              </p>

              {/* Bullet points with emerald check icons */}
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {cur.points.map((p, n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-[#eaedf8] hover:bg-slate-50/70"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#22b07d]/15 text-xs font-extrabold text-[#11744f]"
                    >
                      ✓
                    </span>
                    <span className="text-[15px] font-semibold text-[#2a2f4d]">{p}</span>
                  </li>
                ))}
              </ul>

              {/* Optional Pipeline stage pills */}
              {stages.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-pulse-line/60 bg-pulse-bg p-3.5">
                  <span className="font-code text-[11px] font-bold tracking-[0.08em] uppercase text-pulse-subtle">
                    Live Pipeline Stage Progression
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {stages.map((a, n) => {
                      const last = n === stages.length - 1;
                      const late = n >= stages.length / 2;
                      return (
                        <span key={n} className="flex items-center gap-1.5">
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                              last
                                ? "bg-[#22b07d] text-white shadow-xs"
                                : late
                                ? "bg-pulse text-white shadow-xs"
                                : "bg-white text-[#2a2f4d] border border-slate-200"
                            }`}
                          >
                            {a}
                          </span>
                          {n < stages.length - 1 && (
                            <span className="text-xs font-bold text-slate-400">→</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Full-Screen Interactive Video Player */}
            <div className="w-full min-w-0">
              <TourVideoPlayer
                tabLabel={cur.tabLabel}
                title={cur.title}
                videoUrl={cur.videoUrl}
                youtubeId={cur.youtubeId}
                screenshotLabel={cur.screenshotLabel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
