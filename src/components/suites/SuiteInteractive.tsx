"use client";

import Image from "next/image";
import { useState } from "react";
import { SIZE_BANDS, type Mod, type Step, type Suite } from "@/content/suites";
import { Glyph, RowList } from "./parts";

const pill = "inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-bold transition";

// Module board: a preview of the selected module, with a tile for each one.
export function ModuleBoard({ suite }: { suite: Suite }) {
  const [index, setIndex] = useState(0);
  const mods: Mod[] = suite.mods;
  const cur = mods[index];
  const next = () => setIndex((i) => (i + 1) % mods.length);
  const prev = () => setIndex((i) => (i - 1 + mods.length) % mods.length);

  return (
    <>
      <div role="tabpanel" aria-live="polite" className="mb-4 flex flex-wrap gap-3 rounded-[28px] bg-white p-3 shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4 rounded-[20px] p-8 sm:p-9" style={{ background: suite.soft }}>
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white shadow-[0_10px_24px_-12px_rgba(16,24,40,0.35)]" style={{ color: suite.accent }}>
              <Glyph d={cur.icon} size={28} stroke={1.9} />
            </span>
            <span className="font-semibold" style={{ color: suite.accent }}>
              Module {index + 1} / {mods.length}
            </span>
          </div>
          <h3 className="font-semibold leading-[1.1] tracking-[-0.025em] text-[#101828]" style={{ fontSize: 30 }}>
            {cur.title}
          </h3>
          <p className="text-base leading-relaxed text-[#344054]">{cur.text}</p>
          <ul className="flex flex-col gap-3">
            {cur.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-[#101828]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white" style={{ color: suite.accent }}>
                  <Glyph d="M20 6 9 17l-5-5" size={13} stroke={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-2 pt-2">
            <button type="button" onClick={prev} aria-label="Previous module" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] hover:shadow-[inset_0_0_0_1px_#101828]">
              <Glyph d="M19 12H5M11 6l-6 6 6 6" size={16} stroke={2.4} />
            </button>
            <button type="button" onClick={next} className={`${pill} text-white`} style={{ background: suite.accent }}>
              Next: {mods[(index + 1) % mods.length].title} →
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="flex min-w-0 flex-[1.15_1_440px] flex-col justify-center p-2 sm:p-5">
          <div className="overflow-hidden rounded-[20px] border border-[#E4E9F2] bg-white shadow-[0_24px_48px_-28px_rgba(16,24,40,0.35)]">
            <div className="flex items-center gap-2 border-b border-[#EEF2F7] bg-[#F8FAFC] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F0206E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFB50D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#51AD38]" />
              <span className="ml-2 truncate text-[13px] font-extrabold text-[#101828]">Uptrix · {cur.title}</span>
            </div>
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center justify-between gap-2 pb-2">
                <span className="font-semibold text-[#101828]" style={{ fontSize: 18 }}>
                  {cur.screen}
                </span>
                <span className="rounded-lg px-2.5 py-1 text-xs font-extrabold" style={{ background: suite.soft, color: suite.accent }}>
                  Sample data
                </span>
              </div>
              <RowList rows={cur.rows} icon={cur.icon} accent={suite.accent} soft={suite.soft} />
            </div>
          </div>
        </div>
      </div>

      <div role="tablist" aria-label={`${suite.name} modules`} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-3">
        {mods.map((m, i) => {
          const selected = i === index;
          return (
            <button
              key={m.title}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setIndex(i)}
              className="flex flex-col items-start gap-2.5 rounded-[18px] border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#C6D0E1]"
              style={{
                borderColor: selected ? "transparent" : "#E4E9F2",
                boxShadow: selected ? `0 0 0 2px ${suite.accent}, 0 18px 36px -22px rgba(16,24,40,0.45)` : undefined,
              }}
            >
              <span className="flex w-full items-center justify-between">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: selected ? suite.accent : suite.soft, color: selected ? "#FFFFFF" : suite.accent }}
                >
                  <Glyph d={m.icon} size={19} />
                </span>
                <span className="font-semibold text-[#98A2B3]" style={{ fontSize: 13 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="font-semibold tracking-[-0.01em] text-[#101828]" style={{ fontSize: 17 }}>
                {m.title}
              </span>
              <span className="text-[13px] text-[#667085]">{m.short}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

// Walkthrough: steps through one scenario.
export function Walkthrough({ suite }: { suite: Suite }) {
  const [index, setIndex] = useState(0);
  const steps: Step[] = suite.steps;
  const step = steps[index];
  const last = index === steps.length - 1;

  return (
    <>
      <div role="tablist" aria-label="Walkthrough steps" className="inline-flex flex-wrap gap-1 rounded-2xl bg-[#E7ECF4] p-1">
        {steps.map((s, i) => (
          <button
            key={s.time}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className="min-h-10 rounded-xl px-4 text-sm font-bold text-[#475467] hover:text-[#101828]"
            style={i === index ? { background: "#FFFFFF", color: "#101828", boxShadow: "0 1px 2px rgba(16,24,40,0.08), 0 6px 16px -6px rgba(16,24,40,0.2)" } : undefined}
          >
            {s.time}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 flex flex-wrap gap-3 rounded-[28px] bg-white p-3 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.28)]">
        <div className="relative min-h-[320px] min-w-0 flex-[1_1_360px] overflow-hidden rounded-[20px]" style={{ background: suite.soft }}>
          <Image src={suite.photo.src} alt={suite.photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-extrabold text-[#101828] shadow-sm">
            Step {index + 1} of {steps.length} · {step.time}
          </span>
        </div>

        <div className="flex min-w-0 flex-[1.2_1_420px] flex-col gap-4 p-6 sm:p-8">
          <h3 className="font-semibold leading-[1.12] text-[#101828]" style={{ fontSize: 28 }}>
            {step.title}
          </h3>
          <p className="text-base leading-relaxed text-[#475467]">{step.text}</p>
          <div className="rounded-2xl bg-[#F3F6FB] px-4 py-1.5">
            <RowList rows={step.rows} icon={suite.icon} accent={suite.accent} soft="#FFFFFF" divider="#E4E9F2" />
          </div>
          <div className="mt-auto flex gap-2 pt-2">
            <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 text-sm font-bold text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] disabled:opacity-40">
              ← Back
            </button>
            <button type="button" onClick={() => setIndex(last ? 0 : index + 1)} className="inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-bold text-white" style={{ background: suite.accent }}>
              {last ? "Start again" : "Next step"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Time-back estimate: people in each size band times the minutes saved per person each month.
export function Estimator({ suite }: { suite: Suite }) {
  const [index, setIndex] = useState(1);
  const band = SIZE_BANDS[index];
  const hours = Math.round((band.people * suite.minutesSaved) / 60);

  return (
    <div className="flex flex-wrap items-center gap-12 rounded-[28px] bg-white p-8 shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)] sm:p-12">
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
        <span className="text-[13px] font-extrabold text-[#3F289D]" style={{ color: suite.accent }}>
          Time back
        </span>
        <h2 className="font-semibold leading-[1.06] tracking-[-0.03em] text-[#101828]" style={{ fontSize: 40 }}>
          How much time could your team get back?
        </h2>
        <span className="text-sm font-extrabold text-[#101828]">Your company size</span>
        <div role="group" aria-label="Company size" className="inline-flex flex-wrap gap-1 rounded-2xl bg-[#E7ECF4] p-1">
          {SIZE_BANDS.map((z, i) => (
            <button
              key={z.label}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="min-h-10 rounded-xl px-4 text-sm font-bold text-[#475467] hover:text-[#101828]"
              style={i === index ? { background: "#FFFFFF", color: "#101828", boxShadow: "0 1px 2px rgba(16,24,40,0.08), 0 6px 16px -6px rgba(16,24,40,0.2)" } : undefined}
            >
              {z.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#667085]">
          Rough illustration that assumes about {suite.minutesSaved} minutes saved per employee per month on {suite.estimatorBasis}. Your results will vary.
        </p>
      </div>
      <div aria-live="polite" className="flex min-w-0 flex-[1_1_340px] flex-col gap-2 rounded-[24px] p-6 sm:p-9" style={{ background: suite.soft }}>
        <span className="text-sm font-bold text-[#344054]">Estimated time back each month</span>
        <span className="font-semibold leading-none tracking-[-0.04em] text-[#101828]" style={{ fontSize: "clamp(56px, 14vw, 80px)" }}>
          {hours}
          <span className="text-[28px] text-[#475467]"> hrs</span>
        </span>
        <span className="text-[15px] leading-relaxed text-[#475467]">
          That’s roughly {Math.max(1, Math.round(hours / 8))} working {Math.max(1, Math.round(hours / 8)) === 1 ? "day" : "days"} a month for a team of {band.people}.
        </span>
      </div>
    </div>
  );
}
