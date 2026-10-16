import Link from "next/link";
import { getSecurityAuditData } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  const { attempts, failedCount } = await getSecurityAuditData();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Security Audit & Login Logs
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitors authentication attempts from <code className="text-teal-400">login_attempts</code> table with Upstash rate limiting
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/upload"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              <span>← Back to Post Editor</span>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Failed Attempts
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={`text-3xl font-black ${
                  failedCount > 0 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {failedCount}
              </span>
              <span className="text-xs text-slate-500">recorded in database</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rate Limit Policy
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-400">10 / min</span>
              <span className="text-xs text-slate-500">per IP address</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Session Inactivity Timeout
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-indigo-400">30 min</span>
              <span className="text-xs text-slate-500">sliding JWT expiry</span>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 p-5 bg-white/[0.01]">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Last 50 Authentication Attempts
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {attempts.length} attempts retrieved
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-slate-900/40 text-slate-400 uppercase font-mono">
                <tr>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">IP Address</th>
                  <th className="py-3.5 px-5">Timestamp</th>
                  <th className="py-3.5 px-5">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                {attempts.length > 0 ? (
                  attempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-5">
                        {attempt.success ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            SUCCESS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-rose-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                            FAILED
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-5 font-semibold text-white">
                        {attempt.ip_address}
                      </td>
                      <td className="py-3 px-5 text-slate-400">
                        {new Date(attempt.attempted_at).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="py-3 px-5 text-slate-400">
                        {attempt.success
                          ? "Authenticated via bcrypt hash comparison"
                          : "Rejected — invalid username or password"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500 font-sans text-sm">
                      No authentication attempts logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
