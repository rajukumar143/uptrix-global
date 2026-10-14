"use client";

import { useState } from "react";
import { submitLead } from "@/app/actions/lead";
import TurnstileField from "@/components/site/TurnstileField";

export default function DemoForm() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await submitLead(new FormData(e.currentTarget));
      if (result.ok) setSent(true);
      else setError(result.error || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <p className="animate-word-in rounded-2xl border border-line bg-white/5 px-6 py-5 text-center text-lg font-semibold">
        Thank you. Our team will reach out within one business day.
      </p>
    );
  }

  const input =
    "w-full rounded-full border border-line bg-white/5 px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/30 focus:bg-white/10";

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
      <input required name="name" aria-label="Full name" placeholder="Full name" className={input} />
      <input required type="email" name="email" aria-label="Work email" placeholder="Work email" className={input} />
      <input required type="tel" name="phone" aria-label="Mobile number" placeholder="Mobile number" className={input} />
      <input type="hidden" name="source" value="Book a Demo" />
      {error && <p role="alert" className="text-sm text-red-300 sm:col-span-4">{error}</p>}
      <TurnstileField />
      <button
        type="submit"
        disabled={pending}
        className="bg-brand-gradient rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_40px_-8px_rgba(236,28,100,0.6)] transition hover:brightness-110"
      >
        {pending ? "Sending…" : "Book a demo →"}
      </button>
    </form>
  );
}
