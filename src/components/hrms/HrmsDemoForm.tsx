"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/app/actions/lead";
import TurnstileField from "@/components/site/TurnstileField";
import { DEMO_FORM, EMAIL } from "@/content/hrms";

// Matches the design: name, work email, company size and the suites of interest.
const SIZES = ["1–50 employees", "51–200 employees", "201–1,000 employees", "1,000+ employees"];
const SUITES = ["HR", "IT", "Finance"] as const;

type Errors = Partial<Record<"name" | "email", string>>;

function validate(name: string, email: string): Errors {
  const e: Errors = {};
  if (!name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid work email.";
  return e;
}

const field =
  "min-h-12 w-full rounded-xl border bg-white px-3.5 text-[15px] text-[#101828] placeholder:text-[#98A2B3] focus:border-[#3F289D] focus:outline-none focus:ring-2 focus:ring-[#3F289D]/20";
const label = "text-[13px] font-extrabold text-[#101828]";

export default function HrmsDemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState(SIZES[0]);
  const [picked, setPicked] = useState<Record<string, boolean>>({ HR: true });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(name, email);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    setServerError("");

    const interested = SUITES.filter((s) => picked[s]);
    const fd = new FormData(ev.currentTarget);
    fd.set("name", name);
    fd.set("email", email);
    fd.set("businessType", size);
    fd.set("solveProblem", `Interested in: ${interested.length ? interested.join(", ") : "not chosen"}`);
    fd.set("source", "HRMS Product Page Demo");
    fd.set("pageUrl", window.location.href);

    const res = await submitLead(fd).catch(() => ({ ok: false, error: "Network error. Please try again." }));
    if (!res.ok) {
      setStatus("error");
      setServerError(res.error || "Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 py-6">
        <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-[#E6F4E0] text-xl font-extrabold text-[#2E6B1E]">
          ✓
        </span>
        <p className="text-lg font-bold text-[#101828]">{DEMO_FORM.success}</p>
        <p className="text-sm text-[#667085]">
          Need it sooner? Email <a className="font-semibold text-[#3F289D] underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5" aria-label={DEMO_FORM.heading}>
      {serverError && (
        <div role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          {serverError}
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className={label}>Your name</span>
        <input name="name" type="text" autoComplete="name" value={name} placeholder="Priya Raman" onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }} aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-rose-400" : "border-[#D5DCE8]"}`} />
        {errors.name && <span className="text-[13px] font-medium text-rose-700">{errors.name}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={label}>Work email</span>
        <input name="email" type="email" autoComplete="email" value={email} placeholder="priya@company.com" onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }} aria-invalid={!!errors.email} className={`${field} ${errors.email ? "border-rose-400" : "border-[#D5DCE8]"}`} />
        {errors.email && <span className="text-[13px] font-medium text-rose-700">{errors.email}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={label}>Company size</span>
        <select name="companySize" value={size} onChange={(e) => setSize(e.target.value)} className={`${field} border-[#D5DCE8]`}>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-1.5">
        <span className={label}>Interested in</span>
        <div role="group" aria-label="Suites of interest" className="inline-flex flex-wrap gap-1 rounded-2xl bg-[#E7ECF4] p-1">
          {SUITES.map((s) => {
            const on = !!picked[s];
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked((p) => ({ ...p, [s]: !p[s] }))}
                className="min-h-10 rounded-xl px-4 text-sm font-bold text-[#475467] hover:text-[#101828]"
                style={on ? { background: "#FFFFFF", color: "#101828", boxShadow: "0 1px 2px rgba(16,24,40,0.08), 0 6px 16px -6px rgba(16,24,40,0.2)" } : undefined}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden from people, filled in by bots. Submissions with it filled are dropped by the server. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <TurnstileField />

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3F289D] px-6 font-bold text-white transition hover:bg-[#2F1E7A] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? DEMO_FORM.sending : "Request my demo"} <span aria-hidden>→</span>
      </button>
      <p className="text-xs leading-relaxed text-[#667085]">{DEMO_FORM.privacy}</p>
    </form>
  );
}
