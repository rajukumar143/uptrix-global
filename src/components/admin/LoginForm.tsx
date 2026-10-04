"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const input = "mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-indigo-600";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  // Controlled so the username stays filled in after a wrong password (React resets forms after an action)
  const [username, setUsername] = useState("");

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <label className="text-sm font-semibold text-slate-800">
        Username
        <input name="username" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
      </label>
      <label className="text-sm font-semibold text-slate-800">
        Password
        <input name="password" type="password" autoComplete="current-password" required className={input} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-11 cursor-pointer rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
