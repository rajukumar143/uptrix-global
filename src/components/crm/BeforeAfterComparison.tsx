"use client";

import { useState } from "react";

type Row = {
  before: string;
  after: string;
};

export default function BeforeAfterComparison({
  beforeLabel,
  afterLabel,
  rows,
}: {
  beforeLabel: string;
  afterLabel: string;
  rows: Row[];
}) {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Soft ambient decorative glow behind card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#5b5ff0]/10 via-[#22b07d]/8 to-transparent blur-2xl"
      />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#e1e4f2] bg-white shadow-[0_24px_50px_-20px_rgba(20,28,90,0.14),0_2px_8px_rgba(20,28,90,0.04)] ring-1 ring-black/[0.02]">
        {/* Card Header */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-[#edf0f8] bg-gradient-to-r from-slate-50 via-white to-emerald-50/50 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100/90 text-[10px] font-extrabold text-red-600"
            >
              ✕
            </span>
            <span className="font-code text-[11px] font-bold tracking-[0.08em] uppercase text-slate-500">
              {beforeLabel}
            </span>
          </div>

          <span
            aria-hidden
            className="rounded-full bg-slate-100 px-2 py-0.5 font-code text-[10px] font-bold tracking-wider uppercase text-slate-400"
          >
            vs
          </span>

          <div className="flex items-center justify-end gap-2 sm:justify-start">
            <span
              aria-hidden
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-extrabold text-emerald-700"
            >
              ✓
            </span>
            <span className="font-code text-[11px] font-bold tracking-[0.08em] uppercase text-emerald-700">
              {afterLabel}
            </span>
          </div>
        </div>

        {/* Comparison Rows */}
        <ul className="m-0 flex list-none flex-col gap-1 p-2 sm:p-3">
          {rows.map((r, i) => {
            const isHovered = activeRow === i;
            return (
              <li
                key={i}
                onMouseEnter={() => setActiveRow(i)}
                onMouseLeave={() => setActiveRow(null)}
                className={`group grid grid-cols-[1fr_30px_1fr] items-center gap-2 rounded-xl border px-3 py-2.5 transition-all duration-200 sm:gap-3 sm:px-4 sm:py-3 ${
                  isHovered
                    ? "border-[#d8dcf2] bg-gradient-to-r from-red-50/30 via-white to-emerald-50/40 shadow-xs"
                    : "border-transparent bg-transparent hover:border-[#eaedf8] hover:bg-slate-50/50"
                }`}
              >
                {/* Before side */}
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    aria-hidden
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-50 text-[10px] font-bold text-red-500 transition-colors group-hover:bg-red-100"
                  >
                    ✕
                  </span>
                  <span className="text-[13px] font-semibold leading-snug text-slate-500 line-through decoration-slate-300 transition-colors group-hover:text-slate-700 group-hover:decoration-red-300 sm:text-sm">
                    {r.before}
                  </span>
                </div>

                {/* Transition Arrow */}
                <div className="flex justify-center">
                  <span
                    aria-hidden
                    className={`grid h-6 w-6 place-items-center rounded-full border text-xs font-bold transition-all duration-200 ${
                      isHovered
                        ? "scale-110 border-pulse bg-pulse text-white shadow-xs"
                        : "border-slate-200 bg-white text-pulse group-hover:border-pulse/60"
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* With Pulse side */}
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200 ${
                      isHovered
                        ? "bg-[#22b07d] text-white shadow-2xs"
                        : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-[13px] font-extrabold leading-snug text-pulse-night transition-colors group-hover:text-emerald-950 sm:text-sm">
                    {r.after}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Card Footer Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf0f8] bg-gradient-to-r from-slate-50/80 via-white to-emerald-50/50 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22b07d]" />
            </span>
            <span className="text-xs font-bold text-emerald-900">
              Zero lost enquiries from first touch to enrollment
            </span>
          </div>

          <span className="rounded-full border border-emerald-200/90 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800 shadow-2xs">
            100% Attribution
          </span>
        </div>
      </div>
    </div>
  );
}
