export default function BlogAdminLoading() {
  return (
    <div className="mx-auto max-w-[1360px] space-y-6 animate-pulse" aria-busy="true" aria-label="Loading blog dashboard">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-48 rounded-full bg-slate-200" />
          <div className="h-8 w-64 rounded-lg bg-slate-200" />
          <div className="h-3 w-80 rounded bg-slate-100" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-32 rounded-xl bg-slate-200" />
          <div className="h-9 w-36 rounded-xl bg-slate-200" />
        </div>
      </div>

      {/* Metric Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-3">
            <div className="h-3 w-28 rounded bg-slate-200" />
            <div className="h-8 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Filter and Search Bar skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs">
        <div className="h-9 flex-1 min-w-[240px] rounded-xl bg-slate-100" />
        <div className="flex gap-1.5">
          <div className="h-8 w-20 rounded-lg bg-slate-200" />
          <div className="h-8 w-20 rounded-lg bg-slate-100" />
          <div className="h-8 w-16 rounded-lg bg-slate-100" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs p-4 space-y-4">
        <div className="h-6 w-full rounded bg-slate-100" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-2.5 w-1/5 rounded bg-slate-100" />
            </div>
            <div className="h-5 w-16 rounded bg-slate-100 mx-4" />
            <div className="h-5 w-20 rounded-full bg-slate-100 mx-4" />
            <div className="h-4 w-24 rounded bg-slate-100 mx-4" />
            <div className="h-6 w-14 rounded bg-slate-100 mx-4" />
            <div className="h-7 w-20 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
