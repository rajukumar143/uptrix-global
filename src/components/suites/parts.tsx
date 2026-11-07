// Small shared pieces for the suite pages. No "use client" here, so server components can import it.
import type { Row, Tone } from "@/content/suites";

export const TONE: Record<Tone, { bg: string; fg: string }> = {
  ok: { bg: "#E6F4E0", fg: "#2E6B1E" },
  wait: { bg: "#FFF1DC", fg: "#8A4600" },
  info: { bg: "#E3EFFC", fg: "#0058B0" },
  new: { bg: "#EFEAFF", fg: "#3F289D" },
};

export function Glyph({ d, size = 16, stroke = 2 }: { d: string; size?: number; stroke?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d={d} />
    </svg>
  );
}

export function Tag({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-extrabold" style={{ background: TONE[tone].bg, color: TONE[tone].fg }}>
      {label}
    </span>
  );
}

export function RowList({ rows, icon, accent, soft, divider = "#EEF2F7" }: { rows: Row[]; icon: string; accent: string; soft: string; divider?: string }) {
  return (
    <ul className="flex flex-col">
      {rows.map((r) => (
        <li key={r.a + r.b} className="flex items-center gap-3 py-3.5" style={{ borderTop: `1px solid ${divider}` }}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: soft, color: accent }}>
            <Glyph d={icon} size={16} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-sm font-bold text-[#101828]">{r.a}</span>
            <span className="text-xs text-[#667085]">{r.b}</span>
          </span>
          <Tag tone={r.tone} label={r.t} />
        </li>
      ))}
    </ul>
  );
}

// Turns a series into SVG polyline points for a 120 x 40 box.
export function sparkPoints(series: number[]): string {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * 120;
      const y = 36 - ((v - min) / span) * 32;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
