import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const ready = adminConfigured();

  return (
    <main className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        
        {/* Card */}
        <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/80">
          
          {/* Logo & Brand Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>UPTRIX CONSOLE ACCESS</span>
            </div>

            <div className="relative mb-2">
              <Image
                src="/logo-dark.png"
                alt="Uptrix"
                width={756}
                height={235}
                priority
                className="h-9 w-auto brightness-0 invert"
              />
            </div>

            <h1 className="mt-4 text-2xl font-black text-white font-display tracking-tight">
              Enterprise Sign In
            </h1>
            <p className="mt-1.5 text-xs text-slate-400 max-w-xs leading-relaxed">
              Authenticate with your administrative credentials to manage the platform, leads, and live content.
            </p>
          </div>

          {/* Login Form or Environment Setup Alert */}
          {ready ? (
            <LoginForm />
          ) : (
            <div role="alert" className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-xs text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <span>⚠️</span>
                <span>Admin Environment Required</span>
              </div>
              <p className="leading-relaxed">
                Configure your environment variables in <code className="bg-amber-950/60 px-1.5 py-0.5 rounded font-mono text-amber-200">.env.local</code>:
              </p>
              <pre className="mt-2 rounded-xl bg-slate-950/90 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
ADMIN_USERNAME=admin&#10;ADMIN_PASSWORD=your-secure-password&#10;ADMIN_SESSION_SECRET=32-plus-character-secret-key-string
              </pre>
            </div>
          )}

          {/* Back to Home Link */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1.5"
            >
              <span>← Return to Public Website</span>
            </Link>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-[11px] text-slate-600">
          Uptrix Global Technologies • Protected Enterprise Area
        </div>

      </div>
    </main>
  );
}
