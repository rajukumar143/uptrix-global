"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      {state.error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-300"
        >
          <span className="text-base">⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      {/* Username Field */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Admin Username
        </label>
        <div className="relative mt-1.5">
          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            placeholder="e.g. admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/90 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">
            👤
          </span>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative mt-1.5">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/90 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-500 shadow-inner focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">
            🔒
          </span>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 text-xs"
            aria-label="Toggle password visibility"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Remember session pill */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            defaultChecked
            className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
          />
          <span>Remember for 7 days</span>
        </label>
        <span className="text-[11px] text-slate-500">256-bit encrypted</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 disabled:opacity-50 transition cursor-pointer"
      >
        {pending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Verifying Credentials…</span>
          </>
        ) : (
          <>
            <span>Authenticate &amp; Enter Console</span>
            <span>→</span>
          </>
        )}
      </button>

      {/* Security notice */}
      <div className="mt-2 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Brute-force protected • Server-side verification</span>
      </div>
    </form>
  );
}
