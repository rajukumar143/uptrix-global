import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s | NextBlog",
    default: "NextBlog — Modern Insights & Engineering",
  },
  description: "A fast, secure, modern engineering blog powered by Next.js, Supabase, and Server-Side Security.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090D16]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 text-white font-black text-lg shadow-[0_0_20px_-3px_rgba(99,102,241,0.6)] transition group-hover:scale-105">
                N
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                Next<span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">Blog</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Articles
              </Link>
              <Link
                href="/admin/upload"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:border-white/25 hover:text-white"
              >
                <span>Admin Studio</span>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#060910] py-10 text-slate-400 text-sm">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">NextBlog</span>
              <span>•</span>
              <span>Deployable on Hostinger Node.js & Powered by Supabase</span>
            </div>
            <div className="flex items-center gap-5 text-xs">
              <Link href="/blog" className="hover:text-slate-200 transition">
                Blog
              </Link>
              <Link href="/sitemap.xml" className="hover:text-slate-200 transition">
                Sitemap
              </Link>
              <Link href="/admin/login" className="hover:text-slate-200 transition">
                Admin Login
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
