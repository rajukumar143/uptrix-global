"use client";

import { useState, type FormEvent } from "react";
import type { CrmContent } from "@/content/crm";
import { submitLead } from "@/app/actions/lead";

type Text = CrmContent["demo"]["form"];
type Form = { name: string; company: string; email: string; phone: string; type: string; req: string };
type Key = keyof Form;

function validate(f: Form, t: Text) {
  const e: Partial<Record<Key, string>> = {};
  if (!f.name.trim()) e.name = t.nameError;
  if (!f.company.trim()) e.company = t.companyError;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = t.emailError;
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = t.phoneError;
  return e;
}

const fill = (s: string, form: Form) => s.replace("{name}", form.name.trim().split(" ")[0]).replace("{email}", form.email);

const fieldCls = "min-h-12 rounded-[10px] border-[1.5px] bg-white px-3.5 text-base text-pulse-ink";

export default function PulseDemoForm({ text }: { text: Text }) {
  const empty: Form = { name: "", company: "", email: "", phone: "", type: text.businessTypes[0] ?? "", req: "" };
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const [submitError, setSubmitError] = useState<string>("");

  const set = (k: Key) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
    setSubmitError("");
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form, text);
    if (Object.keys(e).length) {
      setErrors(e);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("loading");
    setSubmitError("");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("company", form.company);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("businessType", form.type);
    fd.append("solveProblem", form.req);
    fd.append("source", "Pulse CRM Demo Form");
    fd.append("pageUrl", typeof window !== "undefined" ? window.location.href : "/crm");

    const res = await submitLead(fd).catch(() => ({ ok: false, error: "Network error. Please try again." }));
    if (!res.ok) {
      setStatus("error");
      setSubmitError(res.error || "Submission failed. Please try again.");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3.5 py-6">
        <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-[#e7f7ef] text-[26px] font-extrabold text-[#11744f]">
          ✓
        </span>
        <h3 className="text-[26px] font-extrabold tracking-[-0.02em]">{fill(text.successHeading, form)}</h3>
        <p className="text-base leading-relaxed text-pulse-muted">{fill(text.successBody, form)}</p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setStatus("idle");
          }}
          className="mt-2 min-h-11 cursor-pointer rounded-[10px] border border-[#d9dbe6] bg-white px-[18px] font-bold text-pulse-ink"
        >
          {text.resetLabel}
        </button>
      </div>
    );
  }

  const input = (k: Key, label: string, type: string, autoComplete: string) => (
    <label className="flex flex-col gap-1.5 text-sm font-bold">
      {label}
      <input
        name={k}
        type={type}
        autoComplete={autoComplete}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `err-${k}` : undefined}
        className={`${fieldCls} ${errors[k] ? "border-[#d93a5b]" : "border-[#d9dbe6]"}`}
      />
      <span id={`err-${k}`} className="text-[13px] font-semibold text-[#c42a4f]">
        {errors[k]}
      </span>
    </label>
  );

  const loading = status === "loading";

  return (
    <form noValidate onSubmit={submit} aria-label={text.heading} className="flex flex-col gap-4">
      <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{text.heading}</h3>
      {submitError && (
        <div role="alert" className="rounded-[10px] bg-[#fdecef] px-3.5 py-3 text-sm font-semibold text-[#a3203f]">
          {submitError}
        </div>
      )}
      {status === "error" && Object.values(errors).some(Boolean) && (
        <div role="alert" className="rounded-[10px] bg-[#fdecef] px-3.5 py-3 text-sm font-semibold text-[#a3203f]">
          {text.errorSummary}
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        {input("name", text.nameLabel, "text", "name")}
        {input("company", text.companyLabel, "text", "organization")}
        {input("email", text.emailLabel, "email", "email")}
        {input("phone", text.phoneLabel, "tel", "tel")}
      </div>
      {text.businessTypes.length > 0 && (
        <label className="flex flex-col gap-1.5 text-sm font-bold">
          {text.businessTypeLabel}
          <select name="type" value={form.type} onChange={set("type")} className={`${fieldCls} border-[#d9dbe6] px-3`}>
            {text.businessTypes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-bold">
        <span>
          {text.messageLabel} <span className="font-medium text-pulse-faint">{text.optionalLabel}</span>
        </span>
        <textarea
          name="req"
          rows={3}
          value={form.req}
          onChange={set("req")}
          placeholder="Tell us what bottlenecks, pipeline leakages, or workflows you would like to solve..."
          className="resize-y rounded-[10px] border-[1.5px] border-[#d9dbe6] bg-white px-3.5 py-3 text-base text-pulse-ink"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="min-h-[52px] cursor-pointer rounded-xl border-0 bg-pulse text-base font-extrabold text-white hover:bg-pulse-hover disabled:opacity-70"
      >
        {loading ? text.sendingLabel : text.submitLabel}
      </button>
      <p className="text-[13px] text-pulse-faint">{text.privacyNote}</p>
    </form>
  );
}
