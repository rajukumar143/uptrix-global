"use client";

import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { ROLES, SETUP, TONE_STYLE } from "@/content/hrms-home";
import { Glyph } from "@/components/suites/parts";

// Role switcher: one screen preview per role.
export function RoleSwitcher() {
  const [index, setIndex] = useState(0);
  const role = ROLES[index];

  return (
    <>
      <div role="tablist" aria-label="Choose a role" className="inline-flex flex-wrap gap-1 rounded-2xl bg-[#E7ECF4] p-1">
        {ROLES.map((r, i) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className="min-h-10 rounded-xl px-4 text-sm font-bold text-[#475467] hover:text-[#101828]"
            style={i === index ? { background: "#FFFFFF", color: "#101828", boxShadow: "0 1px 2px rgba(16,24,40,0.08), 0 6px 16px -6px rgba(16,24,40,0.2)" } : undefined}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="flex w-full flex-wrap gap-3 rounded-[28px] bg-white p-3 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.28)]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4 p-9">
          <span className="inline-flex w-fit rounded-lg bg-[#F6F3FF] px-2.5 py-1 text-xs font-extrabold text-[#3F289D]">{role.name}</span>
          <h3 className="font-semibold leading-[1.1] text-[#101828]" style={{ fontSize: 30 }}>
            {role.headline}
          </h3>
          <ul className="flex flex-col gap-3.5">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-[#344054]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F6F3FF] text-[#3F289D]">
                  <Glyph d="M20 6 9 17l-5-5" size={13} stroke={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="min-w-0 flex-[1.1_1_420px] rounded-[20px] bg-[#F3F6FB] p-6">
          <div className="rounded-[20px] border border-[#E4E9F2] bg-white px-5 py-4">
            <div className="flex items-center justify-between gap-2.5 pb-1.5">
              <span className="text-sm font-extrabold text-[#101828]">{role.screen}</span>
              <span className="text-xs text-[#667085]">{role.meta}</span>
            </div>
            <ul className="flex flex-col">
              {role.rows.map((x) => (
                <li key={x.a} className="flex items-center gap-3 border-t border-[#EEF2F7] py-3">
                  <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: x.accent.bg, color: x.accent.fg }}>
                    <Glyph d={x.icon} size={16} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-bold text-[#101828]">{x.a}</span>
                    <span className="text-xs text-[#667085]">{x.b}</span>
                  </span>
                  <span className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-extrabold" style={{ background: TONE_STYLE[x.tone].bg, color: TONE_STYLE[x.tone].fg }}>
                    {x.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

// Setup section: heading (children) and progress card on the left, checklist on the right. Shares the tick state.
export function SetupSection({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<Record<number, boolean>>({ 0: true });
  const count = Object.values(done).filter(Boolean).length;
  const pct = Math.round((count / SETUP.length) * 100);

  return (
    <div className="flex flex-wrap items-center gap-14">
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
        {children}
        <div className="mt-2 flex flex-col gap-3 rounded-[24px] bg-[#F3F6FB] px-7 py-6">
          <span className="flex items-baseline justify-between">
            <span className="text-[15px] font-extrabold text-[#101828]">{count} of {SETUP.length} done</span>
            <span className="font-semibold text-[#3F289D]" style={{ fontSize: 28 }}>
              {pct}%
            </span>
          </span>
          <span className="h-2 rounded bg-[#E4E9F2]">
            <span className="block h-2 rounded bg-[linear-gradient(90deg,#3F289D,#0067CC)] transition-all" style={{ width: `${pct}%` }} />
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-[1.2_1_460px]">
        <SetupList done={done} setDone={setDone} />
      </div>
    </div>
  );
}

function SetupList({ done, setDone }: { done: Record<number, boolean>; setDone: Dispatch<SetStateAction<Record<number, boolean>>> }) {
  return (
    <div role="group" aria-label="Setup checklist" className="flex flex-col gap-2.5">
        {SETUP.map((s, i) => {
          const on = !!done[i];
          return (
            <button
              key={s.t}
              type="button"
              aria-pressed={on}
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className="flex w-full items-center gap-3.5 rounded-2xl border border-[#E4E9F2] bg-white p-4 text-left text-[15px] font-semibold text-[#101828] aria-pressed:border-[#D9CFFF] aria-pressed:bg-[#F6F3FF]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg shadow-[inset_0_0_0_2px_#C6D0E1] aria-pressed:bg-[#3F289D]" aria-hidden="true">
                {on && <Glyph d="M20 6 9 17l-5-5" size={14} stroke={3} />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className={on ? "text-[#667085] line-through" : ""}>{s.t}</span>
                <span className="text-[13px] font-medium text-[#667085]">{s.d}</span>
              </span>
              <span className="shrink-0 rounded-lg bg-[#F3F6FB] px-2.5 py-1 text-xs font-extrabold text-[#475467]">{s.when}</span>
            </button>
          );
        })}
      </div>
  );
}
