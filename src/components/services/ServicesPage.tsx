"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { submitLead } from "@/app/actions/lead";
import { Glyph } from "@/components/suites/parts";
import TurnstileField from "@/components/site/TurnstileField";
import { ENQUIRY_CHIPS, FAQ, PROCESS, SERVICES, WHY, type Service } from "@/content/services";

// Styles follow the main site: navy hero, indigo buttons, Plus Jakarta Sans headings, Inter body text.
const container = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const sec = "scroll-mt-28 py-16 sm:py-24";
const kicker = "inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.12em] text-indigo-brand";
const h2 = "font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-900 text-balance";
const lead = "text-base leading-relaxed text-slate-600 sm:text-lg";
const card = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const btnPrimary = "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-brand px-6 text-base font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:bg-indigo-700";
const btnGhost = "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-base font-semibold whitespace-nowrap text-white transition hover:bg-white/10";
const field = "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-brand focus:outline-none focus:ring-2 focus:ring-indigo-brand/20";

export default function ServicesPage() {
  const [current, setCurrent] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const service: Service = SERVICES[current];
  const select = (i: number) => setCurrent((i + SERVICES.length) % SERVICES.length);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found: { name?: string; email?: string } = {};
    if (!name.trim()) found.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) found.email = "Please enter a valid work email.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    setServerError("");
    const chosen = ENQUIRY_CHIPS.filter((c) => picked[c.key]).map((c) => c.title);
    const fd = new FormData(ev.currentTarget);
    fd.set("name", name);
    fd.set("email", email);
    fd.set("businessType", "Services enquiry");
    fd.set("solveProblem", `Services: ${chosen.length ? chosen.join(", ") : "not chosen"}. ${message}`.slice(0, 600));
    fd.set("source", "Services Page Enquiry");
    fd.set("pageUrl", window.location.href);

    const res = await submitLead(fd).catch(() => ({ ok: false, error: "Network error. Please try again." }));
    if (!res.ok) {
      setStatus("error");
      setServerError(res.error || "Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
  };

  return (
    <div className="bg-white font-sans text-slate-600 antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(79,70,229,0.35),transparent_45%)]" aria-hidden="true" />
        <div className={`${container} relative flex flex-wrap items-center gap-10 lg:gap-14`}>
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <nav aria-label="Breadcrumb" className="flex gap-2 text-[13px] text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="font-bold text-white">Services</span>
            </nav>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" />
              Software services
            </span>
            <h1 className="font-display text-4xl leading-[1.14] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Software built around{" "}
              <span className="bg-linear-to-r from-[#ec1c64] via-[#ff8a00] to-[#1f5fd6] bg-clip-text text-transparent">how you work.</span>
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-white/75">
              Beyond our HR, IT and Finance suites, our team builds custom web apps, connects your CRM and HRMS, modernises older systems and keeps your software running smoothly.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className={btnPrimary}>
                Discuss your project <span aria-hidden="true">→</span>
              </a>
              <a href="#services" className={btnGhost}>
                See all services
              </a>
            </div>
          </div>

          <div className="flex min-w-0 max-w-[480px] flex-[1_1_400px] flex-col gap-1 rounded-2xl border border-white/10 bg-white p-5 shadow-2xl sm:p-6">
            <span className="px-1 pt-1 pb-2.5 font-display text-base font-extrabold text-slate-900">What we do</span>
            {SERVICES.map((s, i) => (
              <a key={s.key} href="#services" onClick={() => select(i)} className="flex items-center gap-3.5 border-t border-slate-100 px-1 py-3.5 first:border-t-0 hover:bg-slate-50">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: s.bg, color: s.fg }}>
                  <Glyph d={s.icon} size={20} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-slate-900">{s.title}</span>
                  <span className="text-[13px] text-slate-500">{s.short}</span>
                </span>
                <span className="shrink-0 text-slate-400">
                  <Glyph d="M5 12h14M13 6l6 6-6 6" size={16} stroke={2.2} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`${sec} bg-slate-50`}>
        <div className={container}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-3.5">
              <span className={kicker}>Our services</span>
              <h2 className={h2}>Four ways we can help.</h2>
            </div>
            <p className="max-w-[360px] text-[15px] leading-relaxed text-slate-500">Pick a service to see what’s included, who it suits and how a typical engagement runs.</p>
          </div>

          <div role="tablist" aria-label="Services" className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3">
            {SERVICES.map((s, i) => {
              const selected = i === current;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => select(i)}
                  className="flex flex-col items-start gap-2.5 rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-slate-300"
                  style={{ borderColor: selected ? "transparent" : "#E2E8F0", boxShadow: selected ? `0 0 0 2px ${s.fg}, 0 18px 36px -22px rgba(15,23,42,0.35)` : undefined }}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: s.bg, color: s.fg }}>
                      <Glyph d={s.icon} size={20} />
                    </span>
                    <span className="text-[13px] font-semibold text-slate-400">0{i + 1}</span>
                  </span>
                  <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-slate-900">{s.title}</span>
                  <span className="text-[13px] text-slate-500">{s.short}</span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" aria-live="polite" className={`${card} flex flex-wrap gap-3 p-3`}>
            <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 rounded-xl p-6 sm:p-9" style={{ background: service.bg }}>
              <span className="flex items-center justify-between gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md" style={{ color: service.fg }}>
                  <Glyph d={service.icon} size={28} stroke={1.9} />
                </span>
                <span className="text-sm font-bold" style={{ color: service.fg }}>Service 0{current + 1} / 0{SERVICES.length}</span>
              </span>
              <h3 className="font-display text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[30px]">{service.title}</h3>
              <p className="text-base leading-relaxed text-slate-700">{service.description}</p>
              <span className="pt-1 text-[13px] font-extrabold text-slate-900">What’s included</span>
              <ul className="flex flex-col gap-3">
                {service.included.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-slate-900">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white" style={{ color: service.fg }}>
                      <Glyph d="M20 6 9 17l-5-5" size={13} stroke={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <button type="button" onClick={() => select(current - 1)} aria-label="Previous service" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200">
                  <Glyph d="M19 12H5M11 6l-6 6 6 6" size={16} stroke={2.4} />
                </button>
                <button type="button" onClick={() => select(current + 1)} className="inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold text-white" style={{ background: service.fg }}>
                  {current === SERVICES.length - 1 ? "Back to the first service" : `Next: ${SERVICES[current + 1].title} →`}
                </button>
              </div>
            </div>

            <div className="flex min-w-0 flex-[1.1_1_420px] flex-col gap-5 p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-extrabold text-slate-900">A good fit if…</span>
                {service.fit.map((f) => (
                  <div key={f} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: service.fg }} />
                    <span className="text-[15px] leading-relaxed text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="text-[13px] font-extrabold text-slate-900">How a typical engagement runs</span>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-brand">Example plan</span>
                </div>
                <ol className="px-4">
                  {service.plan.map((r, i) => (
                    <li key={r.step} className="flex items-center gap-3 border-t border-slate-100 py-3.5 first:border-t-0">
                      <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold" style={{ background: service.bg, color: service.fg }}>
                        {i + 1}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-900">{r.step}</span>
                        <span className="text-xs text-slate-500">{r.text}</span>
                      </span>
                      <span className="shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{r.when}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <a href="#contact" onClick={() => setPicked({ [service.key]: true })} className="text-[15px] font-semibold text-indigo-brand underline underline-offset-4">
                Ask about {service.title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={`${sec} bg-white`}>
        <div className={container}>
          <div className="mb-10 flex max-w-[700px] flex-col gap-3.5">
            <span className={kicker}>How we work</span>
            <h2 className={h2}>One clear process, whatever you need.</h2>
            <p className={lead}>Every project — new build, integration, migration or support — follows the same four steps, so you always know what happens next.</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="flex flex-col gap-3.5 rounded-2xl bg-slate-50 p-7">
                <span className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-brand shadow-sm ring-1 ring-slate-200">
                    <Glyph d={p.icon} size={22} />
                  </span>
                  <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.03em] text-slate-300">0{i + 1}</span>
                </span>
                <h3 className="font-display text-[22px] font-bold text-slate-900">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className={`${sec} bg-slate-50`}>
        <div className={container}>
          <div className={`${card} flex flex-wrap items-start gap-10 p-6 sm:gap-12 sm:p-12`}>
            <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
              <span className={kicker}>Why Uptrix</span>
              <h2 className={h2}>We build software we run ourselves.</h2>
              <p className={lead}>
                The same team behind our HR, IT and Finance suites works on your project — so you get people who know employee data, approvals and payroll from the inside.
              </p>
            </div>
            <div className="grid min-w-0 flex-[1.3_1_440px] grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3">
              {WHY.map((w) => (
                <div key={w.title} className="flex flex-col gap-2 rounded-xl bg-slate-50 p-5">
                  <span className="text-indigo-brand">
                    <Glyph d={w.icon} size={22} />
                  </span>
                  <span className="text-base font-bold text-slate-900">{w.title}</span>
                  <span className="text-sm leading-relaxed text-slate-600">{w.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${sec} bg-white`}>
        <div className={`${container} flex flex-wrap gap-10 sm:gap-14`}>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5">
            <span className={kicker}>Questions</span>
            <h2 className={h2}>Before you get in touch.</h2>
            <p className={lead}>
              Can’t find your answer?{" "}
              <a href="#contact" className="font-semibold text-indigo-brand underline">
                Send us a note
              </a>{" "}
              and we’ll reply.
            </p>
          </div>
          <div className="min-w-0 flex-[1.6_1_520px] border-b border-slate-200">
            {FAQ.map((q, i) => {
              const open = i === faqOpen;
              return (
                <div key={q.q} className="border-t border-slate-200">
                  <button type="button" aria-expanded={open} aria-controls={`faq-${i}`} onClick={() => setFaqOpen(open ? -1 : i)} className="flex w-full items-center gap-5 py-6 text-left">
                    <span className="font-display text-lg font-bold tracking-[-0.01em] text-slate-900 sm:text-xl">{q.q}</span>
                    <span className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform ${open ? "rotate-180 bg-indigo-brand text-white" : "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"}`} aria-hidden="true">
                      <Glyph d="m6 9 6 6 6-6" size={16} stroke={2.4} />
                    </span>
                  </button>
                  {open && (
                    <p id={`faq-${i}`} className="pb-6 pr-12 text-base leading-relaxed text-slate-600">
                      {q.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-28 bg-slate-50 pt-16 pb-20 sm:pb-28">
        <div className={container}>
          <div className="flex flex-wrap overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5 bg-navy p-8 text-white sm:p-12">
              <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-white/70">Start a project</span>
              <h2 className="font-display text-[clamp(26px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-balance">
                Tell us what you{" "}
                <span className="bg-linear-to-r from-[#ec1c64] via-[#ff8a00] to-[#1f5fd6] bg-clip-text text-transparent">want to build.</span>
              </h2>
              <p className="text-base leading-relaxed text-white/75">Share a few details and we’ll come back with questions, a suggested approach and next steps.</p>
              <ul className="flex flex-col gap-2.5">
                {["Free first discovery call", "Written scope and estimate", "NDA available on request"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
                    <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-indigo-brand text-white">
                      <Glyph d="M20 6 9 17l-5-5" size={12} stroke={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <a href="mailto:[YOUR EMAIL]" className="mt-auto font-semibold text-white underline underline-offset-4">
                Or email us at [YOUR EMAIL] →
              </a>
            </div>

            <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-6 sm:p-10">
              {status === "success" ? (
                <div role="status" className="flex flex-col items-start gap-3 py-6">
                  <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-xl font-extrabold text-emerald-700">✓</span>
                  <p className="font-display text-xl font-bold text-slate-900">Thanks — we’ll be in touch.</p>
                  <p className="text-sm text-slate-600">We’ll review your note and reply with next steps.</p>
                </div>
              ) : (
                <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5" aria-label="Services enquiry">
                  {serverError && <div role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{serverError}</div>}
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-bold text-slate-900">Your name</span>
                    <input name="name" type="text" autoComplete="name" value={name} placeholder="Priya Raman" onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }} aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-rose-400" : ""}`} />
                    {errors.name && <span className="text-[13px] font-medium text-rose-700">{errors.name}</span>}
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-bold text-slate-900">Work email</span>
                    <input name="email" type="email" autoComplete="email" value={email} placeholder="priya@company.com" onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} aria-invalid={!!errors.email} className={`${field} ${errors.email ? "border-rose-400" : ""}`} />
                    {errors.email && <span className="text-[13px] font-medium text-rose-700">{errors.email}</span>}
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-bold text-slate-900">Services you need</span>
                    <div role="group" aria-label="Services you need" className="inline-flex flex-wrap gap-1.5">
                      {ENQUIRY_CHIPS.map((c) => {
                        const on = !!picked[c.key];
                        return (
                          <button
                            key={c.key}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setPicked((p) => ({ ...p, [c.key]: !p[c.key] }))}
                            className={`min-h-10 rounded-xl border px-3.5 text-sm font-semibold transition ${on ? "border-indigo-brand bg-indigo-50 text-indigo-brand" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}
                          >
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-bold text-slate-900">About your project</span>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you want to build, connect or fix?" className="min-h-[110px] w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-brand focus:outline-none focus:ring-2 focus:ring-indigo-brand/20" />
                  </label>
                  {/* Hidden from people, filled in by bots. Submissions with it filled are dropped by the server. */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <TurnstileField />
                  <button type="submit" disabled={status === "loading"} className={`${btnPrimary} w-full disabled:cursor-not-allowed disabled:opacity-70`}>
                    {status === "loading" ? "Sending..." : "Send my enquiry"} <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
