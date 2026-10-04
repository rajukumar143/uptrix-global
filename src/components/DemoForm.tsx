"use client";

import { useState } from "react";

export default function DemoForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send the form data to your backend, CRM or email service.
    setSent(true);
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
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <input required name="name" aria-label="Full name" placeholder="Full name" className={input} />
      <input required type="email" name="email" aria-label="Work email" placeholder="Work email" className={input} />
      <button
        type="submit"
        className="bg-brand-gradient rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_40px_-8px_rgba(236,28,100,0.6)] transition hover:brightness-110"
      >
        Book a demo →
      </button>
    </form>
  );
}
