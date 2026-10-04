import Image from "next/image";

const nav = [
  { label: "Dashboard", active: true },
  { label: "Leads" },
  { label: "Follow-ups" },
  { label: "Payments" },
  { label: "Attendance" },
  { label: "Work log" },
  { label: "Team activity" },
];

const kpis = [
  { label: "Total leads", value: "428", bar: "from-brand-pink to-brand-orange", w: "w-[86%]" },
  { label: "Converted", value: "31", bar: "from-brand-orange to-brand-yellow", w: "w-[48%]" },
  { label: "Fee paid", value: "₹4.2L", bar: "from-brand-green to-brand-teal", w: "w-[70%]" },
  { label: "Avg hours", value: "7.6h", bar: "from-brand-teal to-brand-blue", w: "w-[95%]" },
];

const pipeline = [
  { stage: "New lead", count: 78, color: "bg-brand-pink" },
  { stage: "No response", count: 42, color: "bg-brand-orange" },
  { stage: "Call back", count: 28, color: "bg-brand-yellow" },
  { stage: "Visited", count: 18, color: "bg-brand-teal" },
  { stage: "Converted", count: 12, color: "bg-brand-blue" },
];

export default function HeroDashboard() {
  return (
    <div className="relative">
      <div className="animate-glow bg-brand-gradient absolute -inset-x-10 -top-10 bottom-10 rounded-[3rem] opacity-60 blur-[90px]" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/90 shadow-2xl shadow-black/60 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="mx-auto rounded-md bg-white/5 px-10 py-1 text-[11px] text-white/40">uptrixglobal.com</span>
        </div>
        <div className="flex">
          <aside className="hidden w-48 shrink-0 border-r border-line p-4 sm:block">
            <div className="mb-6 flex items-center gap-2">
              <Image src="/logo-mark.png" alt="" width={24} height={24} />
              <span className="text-sm font-bold">Uptrix</span>
            </div>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li
                  key={n.label}
                  className={`rounded-lg px-3 py-2 text-xs font-medium ${n.active ? "bg-white/10 text-white" : "text-white/45"}`}
                >
                  {n.label}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex-1 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-white/45">Today · team view</div>
                <div className="text-base font-bold">Dashboard</div>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-[11px] text-white/60">This month</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-line bg-white/[0.03] p-3.5">
                  <div className="text-[11px] text-white/45">{k.label}</div>
                  <div className="mt-1 text-xl font-extrabold">{k.value}</div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${k.bar} ${k.w}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-line bg-white/[0.03] p-4">
              <div className="mb-3 text-[11px] text-white/45">Lead stage pipeline</div>
              <ul className="space-y-2.5">
                {pipeline.map((p) => (
                  <li key={p.stage} className="flex items-center gap-3 text-[11px]">
                    <span className="w-20 shrink-0 text-white/55">{p.stage}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                      <span className={`block h-full rounded-full ${p.color}`} style={{ width: `${(p.count / 78) * 100}%` }} />
                    </span>
                    <span className="w-6 text-right font-semibold text-white/80">{p.count}</span>
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
