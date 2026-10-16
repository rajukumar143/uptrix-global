"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/upload";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      // Success: cookie set by server; redirect to destination
      router.push(from);
      router.refresh();
    } catch {
      setError("Network connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-teal-400 font-extrabold text-white text-xl shadow-[0_0_24px_-4px_rgba(99,102,241,0.6)]">
            🔒
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-2">
            Admin Studio
          </h1>
          <p className="text-xs text-slate-400">
            Secure sliding session • 30-minute inactivity timeout
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 leading-relaxed"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              required
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 font-semibold text-sm text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.7)] transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Studio →"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500 flex items-center justify-between">
          <Link href="/" className="hover:text-slate-300 transition">
            ← Return to Blog
          </Link>
          <span>Rate limited (10/min/IP)</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center text-slate-400">
          Loading secure portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
