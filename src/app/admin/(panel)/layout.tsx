import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { pageInfo, pageKeys } from "@/content";
import { requireAdmin } from "@/lib/admin-auth";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-r md:border-b-0">
        <div className="flex h-full flex-col gap-1 p-4">
          <Link href="/admin" className="mb-4 flex items-center gap-2 px-2">
            <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-7 w-auto" />
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-indigo-700 uppercase">Admin</span>
          </Link>
          <Link href="/admin" className="rounded-lg px-3 py-2 font-semibold text-slate-800 hover:bg-slate-100">
            Dashboard
          </Link>
          <Link href="/admin/blog" className="rounded-lg px-3 py-2 font-semibold text-slate-800 hover:bg-slate-100">
            Blog posts
          </Link>
          <Link href="/admin/leads" className="rounded-lg px-3 py-2 font-semibold text-slate-800 hover:bg-slate-100">
            Leads
          </Link>
          <p className="mt-3 px-3 text-xs font-bold tracking-wider text-slate-400 uppercase">Page text</p>
          <nav aria-label="Pages" className="flex flex-row flex-wrap gap-1 md:flex-col">
            {pageKeys.map((k) => (
              <Link key={k} href={`/admin/pages/${k}`} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                {pageInfo[k].title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1 pt-4">
            <a href="/" target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
              View website ↗
            </a>
            <form action={logout}>
              <button type="submit" className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-slate-600 hover:bg-slate-100">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
