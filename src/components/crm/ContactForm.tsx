"use client";

import { useState, type FormEvent } from "react";
import type { ContactContent } from "@/content/contact";

type Text = ContactContent["form"];
type Form = { name: string; email: string; phone: string; company: string; topic: string; message: string };
type Key = keyof Form;

function validate(f: Form, t: Text) {
  const e: Partial<Record<Key, string>> = {};
  if (!f.name.trim()) e.name = t.nameError;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = t.emailError;
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = t.phoneError;
  if (!f.message.trim()) e.message = t.messageError;
  return e;
}

const fill = (s: string, form: Form) => s.replace("{name}", form.name.trim().split(" ")[0]).replace("{email}", form.email);

const fieldCls = "min-h-12 rounded-[10px] border-[1.5px] bg-white px-3.5 text-base text-pulse-ink";

export default function ContactForm({ text }: { text: Text }) {
  const empty: Form = { name: "", email: "", phone: "", company: "", topic: text.topics[0] ?? "", message: "" };
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");

  const set = (k: Key) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form, text);
    if (Object.keys(e).length) {
      setErrors(e);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("loading");
    // PLACEHOLDER: send `form` to your email / CRM endpoint here. This currently only simulates a successful submit.
    setTimeout(() => setStatus("success"), 1200);
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-3.5 py-6">
        <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full bg-[#e7f7ef] text-[26px] font-extrabold text-[#11744f]">
          ✓
        </span>
        <h2 className="text-[26px] font-extrabold tracking-[-0.02em]">{fill(text.successHeading, form)}</h2>
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

  const field = (k: Key, label: string, type: string, autoComplete: string, optional = false) => (
    <label className="flex flex-col gap-1.5 text-sm font-bold">
      <span>
        {label} {optional && <span className="font-medium text-pulse-faint">{text.optionalLabel}</span>}
      </span>
      <input
        name={k}
        type={type}
        autoComplete={autoComplete}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `cerr-${k}` : undefined}
        className={`${fieldCls} ${errors[k] ? "border-[#d93a5b]" : "border-[#d9dbe6]"}`}
      />
      <span id={`cerr-${k}`} className="text-[13px] font-semibold text-[#c42a4f]">
        {errors[k]}
      </span>
    </label>
  );

  const loading = status === "loading";

  return (
    <form noValidate onSubmit={submit} aria-labelledby="contact-form-h" className="flex flex-col gap-4">
      <h2 id="contact-form-h" className="text-[22px] font-extrabold tracking-[-0.02em]">
        {text.heading}
      </h2>
      {status === "error" && Object.values(errors).some(Boolean) && (
        <div role="alert" className="rounded-[10px] bg-[#fdecef] px-3.5 py-3 text-sm font-semibold text-[#a3203f]">
          {text.errorSummary}
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        {field("name", text.nameLabel, "text", "name")}
        {field("email", text.emailLabel, "email", "email")}
        {field("phone", text.phoneLabel, "tel", "tel")}
        {field("company", text.companyLabel, "text", "organization", true)}
      </div>
      {text.topics.length > 0 && (
        <label className="flex flex-col gap-1.5 text-sm font-bold">
          {text.topicLabel}
          <select name="topic" value={form.topic} onChange={set("topic")} className={`${fieldCls} border-[#d9dbe6] px-3`}>
            {text.topics.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-bold">
        {text.messageLabel}
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cerr-message" : undefined}
          className={`resize-y rounded-[10px] border-[1.5px] bg-white px-3.5 py-3 text-base text-pulse-ink ${errors.message ? "border-[#d93a5b]" : "border-[#d9dbe6]"}`}
        />
        <span id="cerr-message" className="text-[13px] font-semibold text-[#c42a4f]">
          {errors.message}
        </span>
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
