"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { submitLead } from "@/app/actions/lead";
import type { CaseStudiesContent, CaseStudy } from "@/content/stories";

const accents = ["#3b3fd4", "#22b07d", "#f08a24", "#8b4fd8", "#e0457b"];
const DONE_KEY = "uptrix_story_form";

function alreadyFilled() {
  try {
    return localStorage.getItem(DONE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * A case study card. "Read the story" opens a short form in a pop-up; once it's sent the story opens.
 * Visitors who filled it in before go straight to the story.
 */
export default function StoryCard({
  study: s,
  index,
  text,
  dark = false,
}: {
  study: CaseStudy;
  index: number;
  text: CaseStudiesContent["page"];
  dark?: boolean;
}) {
  const href = `/case-studies/${s.slug}`;
  const accent = accents[index % accents.length];
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  const open = (e: React.MouseEvent) => {
    if (alreadyFilled()) return; // let the link open the story
    e.preventDefault();
    setError("");
    dialog.current?.showModal();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const res = await submitLead(new FormData(e.currentTarget)).catch(() => ({ ok: false, error: "Something went wrong. Please try again." }));
    if (!res.ok) {
      setSending(false);
      setError(res.error || "Something went wrong. Please try again.");
      return;
    }
    try {
      localStorage.setItem(DONE_KEY, "1");
    } catch {}
    router.push(href);
  };

  const field = "h-12 w-full rounded-xl border border-[#d9dbe6] bg-white px-4 text-base text-pulse-ink outline-none focus:border-pulse focus:ring-3 focus:ring-pulse/15";

  return (
    <>
      <Link
        href={href}
        onClick={open}
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
          dark
            ? "border-white/12 bg-[#12163b] text-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] hover:border-pulse/70 hover:shadow-[0_25px_60px_-15px_rgba(91,95,240,0.35)] ring-1 ring-white/5"
            : "border-pulse-line bg-white shadow-[0_18px_40px_-30px_rgba(14,19,48,0.35)]"
        }`}
      >
        <div className={`relative flex flex-col gap-5 p-7 ${dark ? "bg-[#0a0d24] border-b border-white/10" : "bg-pulse-night text-white"}`}>
          <div aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className={`rounded-full px-3 py-1 ${dark ? "bg-white/15 text-white" : "bg-white/10 text-white"}`}>{s.product}</span>
            {s.isExample && <span className="rounded-full border border-white/25 px-3 py-1 text-[#cfd0f0]">{text.exampleLabel}</span>}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {s.metrics.slice(0, 3).map((m, j) => (
              <div key={j} className="flex flex-col gap-1">
                <span className="text-[clamp(22px,2.4vw,28px)] leading-none font-extrabold tracking-[-0.02em]" style={{ color: j === 0 ? (dark ? "#7ff0c2" : "#fff") : "#cfd0f0" }}>
                  {m.value}
                </span>
                <span className="text-xs leading-snug text-[#a9abd6]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-7">
          <p className={`text-sm font-semibold ${dark ? "text-[#9a9ccc]" : "text-pulse-faint"}`}>
            {s.client}
            {s.location && ` · ${s.location}`}
          </p>
          <h3 className={`text-xl leading-snug font-extrabold tracking-[-0.01em] text-balance transition-colors ${dark ? "text-white group-hover:text-[#a5a7ff]" : "text-pulse-ink group-hover:text-pulse"}`}>{s.title}</h3>
          <p className={`text-[15px] leading-[1.6] ${dark ? "text-[#c9cbf0]" : "text-pulse-subtle"}`}>{s.summary}</p>
          <span className={`mt-auto pt-2 text-[15px] font-bold ${dark ? "text-[#7ff0c2] group-hover:text-[#a5ffd4]" : "text-pulse"}`}>{text.readMoreLabel} →</span>
        </div>
      </Link>

      <dialog
        ref={dialog}
        aria-labelledby={`gate-h-${s.slug}`}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(480px,calc(100vw-32px))] rounded-3xl border-0 bg-white p-0 text-pulse-ink shadow-[0_40px_100px_-30px_rgba(14,19,48,0.6)] backdrop:bg-[rgba(14,19,48,0.55)] backdrop:backdrop-blur-sm"
      >
        <div className="relative flex flex-col gap-5 p-[clamp(22px,5vw,32px)]">
          <button
            type="button"
            aria-label="Close"
            onClick={() => dialog.current?.close()}
            className="absolute top-4 right-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#d9dbe6] text-xl leading-none hover:border-pulse"
          >
            ×
          </button>
          <div className="flex flex-col gap-2 pr-10">
            <p className="font-code text-xs tracking-[0.08em] text-pulse uppercase">{text.popupEyebrow}</p>
            <h2 id={`gate-h-${s.slug}`} className="text-2xl leading-tight font-extrabold tracking-[-0.02em]">
              {text.popupHeading}
            </h2>
            <p className="text-[15px] leading-relaxed text-pulse-subtle">{text.popupBody}</p>
          </div>
          <p className="rounded-xl bg-pulse-bg px-4 py-3 text-sm font-bold">{s.title}</p>

          <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
            <input type="hidden" name="source" value={`Case study: ${s.slug}`} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              {text.nameLabel}
              <input name="name" required maxLength={100} autoComplete="name" className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              {text.phoneLabel}
              <input name="phone" type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              {text.emailLabel}
              <input name="email" type="email" maxLength={150} autoComplete="email" className={field} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              {text.companyLabel}
              <input name="company" maxLength={120} autoComplete="organization" className={field} />
            </label>
            {error && (
              <p role="alert" className="rounded-lg bg-[#fdecef] px-3 py-2 text-sm font-semibold text-[#b4234f]">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="mt-1 h-13 cursor-pointer rounded-xl bg-pulse text-base font-bold text-white hover:bg-pulse-hover disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? text.sendingLabel : text.submitLabel}
            </button>
            {text.privacyNote && <p className="text-center text-xs text-pulse-faint">{text.privacyNote}</p>}
          </form>
        </div>
      </dialog>
    </>
  );
}
