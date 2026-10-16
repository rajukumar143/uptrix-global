import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col">
      {/* Admin Secondary Header */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-6 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-mono font-semibold text-teal-400">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              ADMIN STUDIO
            </span>
            <span className="text-white/20">|</span>
            <Link
              href="/admin/upload"
              className="text-slate-300 hover:text-white transition font-medium"
            >
              Upload & Publish
            </Link>
            <Link
              href="/admin/security"
              className="text-slate-300 hover:text-white transition font-medium"
            >
              Security & Audit
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/api/auth/logout"
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-rose-300 hover:bg-rose-500/20 transition font-medium"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
