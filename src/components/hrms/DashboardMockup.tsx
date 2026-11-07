// Pure CSS dashboard preview for the hero. No images, so nothing to load and no layout shift.
// Decorative: aria-hidden. Sample numbers are illustrative only.
const bars = [62, 74, 58, 81, 90, 68, 77, 88, 72, 95, 84, 79];

const approvals = [
  { who: "Rahul M.", what: "Casual leave, 2 days", tag: "Leave", tone: "bg-teal-50 text-teal-800" },
  { who: "Sneha K.", what: "Payroll review, November", tag: "Payroll", tone: "bg-indigo-50 text-indigo-800" },
  { who: "Arjun P.", what: "Laptop replacement request", tag: "Ticket", tone: "bg-amber-50 text-amber-800" },
];

export default function DashboardMockup() {
  return (
    <div aria-hidden className="relative select-none rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-20px_rgba(30,58,138,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 truncate rounded-md bg-slate-100 px-3 py-1 text-[11px] text-slate-500">hrms.yourcompany.com/dashboard</span>
      </div>

      <div className="grid grid-cols-[auto_1fr]">
        <aside className="hidden w-14 flex-col items-center gap-4 border-r border-slate-200 bg-[#0b1f4d] py-5 sm:flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-7 w-7 rounded-lg ${i === 0 ? "bg-white/90" : "bg-white/15"}`} />
          ))}
        </aside>

        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">Welcome back, Admin</p>
              <p className="text-[11px] text-slate-500">Attendance and leave for today</p>
            </div>
            <span className="shrink-0 rounded-full bg-[#ccfbf1] px-2.5 py-1 text-[10px] font-bold text-[#0f766e]">Payroll on track</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {[
              { label: "Present today", value: "92%", tone: "text-[#1e3a8a]" },
              { label: "On leave", value: "6", tone: "text-slate-900" },
              { label: "Late arrivals", value: "3", tone: "text-amber-700" },
              { label: "Open tickets", value: "4", tone: "text-slate-900" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-medium text-slate-500">{k.label}</p>
                <p className={`mt-1 text-lg font-extrabold ${k.tone}`}>{k.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
            <div className="rounded-xl border border-slate-200 p-3 md:col-span-3">
              <p className="text-[11px] font-bold text-slate-700">Monthly payroll cost (₹ lakh)</p>
              <div className="mt-3 flex h-28 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-[#0f766e]" : "bg-[#1e3a8a]/80"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 md:col-span-2">
              <p className="text-[11px] font-bold text-slate-700">Pending approvals</p>
              <ul className="mt-2 flex flex-col gap-2">
                {approvals.map((a) => (
                  <li key={a.who} className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 p-2">
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-slate-800">{a.who}</p>
                      <p className="truncate text-[10px] text-slate-500">{a.what}</p>
                    </div>
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${a.tone}`}>{a.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
