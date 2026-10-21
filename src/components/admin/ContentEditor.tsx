"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { savePage } from "@/app/admin/actions";
import { arrayTemplate, blankOf, isLinkKey, type Json } from "@/content/merge";

type Path = (string | number)[];
type Obj = { [k: string]: Json };

// ---------- labels ----------
const LABELS: Record<string, string> = {
  seo: "Google & browser tab",
  pageTitle: "Page title (browser tab and Google result)",
  metaDescription: "Description shown in Google results",
  cta: "Call to action",
  finalCta: "Final call to action",
  faq: "FAQ",
  hrmsSection: "HRMS section",
  crmSection: "CRM section",
  customToolsSection: "Custom tools development section",
  processSteps: "Development process steps",
  usersNote: "Users note (shown under the price)",
  highlight: "Highlight this plan (dark card)",
  included: "Included",
  note: "Note (optional, shown under the tick)",
  basic: "Basic plan column",
  standard: "Standard plan column",
  enterprise: "Enterprise plan column",
  barPercent: "Bar length (%)",
  percent: "Percent of enquiries (%)",
  leads: "Number of leads",
  admissions: "Admissions (number)",
  headingStart: "Heading — start",
  headingHighlight: "Heading — highlighted words",
  headingEnd: "Heading — end",
  photoDescription: "Photo description (placeholder)",
  screenshotLabel: "Screenshot placeholder text",
  trustBar: "Trusted by logos bar",
  clientLogos: "Client logos",
  clientNames: "Client names",
  logoUrl: "Logo image URL",
};

const UPPER = new Set(["hrms", "crm", "faq", "seo", "cta", "url", "ai", "sso"]);

function humanize(key: string) {
  if (LABELS[key]) return LABELS[key];
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/\s+/)
    .map((w) => (UPPER.has(w.toLowerCase()) ? w.toUpperCase() : w.toLowerCase()));
  const s = words.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const LONG_KEYS = /^(body|intro|summary|challenge|solution|text|description|metaDescription|answer|quote|lead|detail|paragraphs|helpBoxText|mainCardBody|footnote|successBody|statLabel|tagline|address|office)$/;

function itemTitle(v: Json, i: number) {
  if (typeof v === "string") return v || `Item ${i + 1}`;
  if (v && typeof v === "object" && !Array.isArray(v)) {
    for (const k of ["title", "name", "question", "label", "feature", "tabLabel", "heading", "eyebrow", "quote", "before"]) {
      const s = (v as Obj)[k];
      if (typeof s === "string" && s.trim()) return s;
    }
  }
  return `Item ${i + 1}`;
}

function singular(key: string) {
  const l = humanize(key).toLowerCase();
  if (l.endsWith("ies")) return l.slice(0, -3) + "y";
  if (l.endsWith("ses")) return l.slice(0, -2);
  if (l.endsWith("s")) return l.slice(0, -1);
  return "item";
}

function countFields(value: Json): number {
  if (Array.isArray(value)) return value.reduce<number>((total, item) => total + countFields(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce<number>((total, item) => total + countFields(item), 0);
  }
  return 1;
}

const SECTION_DETAILS: Record<string, { icon: string; description: string }> = {
  seo: { icon: "⌕", description: "Search results, browser title and metadata" },
  hero: { icon: "✦", description: "The first section visitors see" },
  heroSlides: { icon: "✦", description: "Homepage headline slides and buttons" },
  trustBar: { icon: "◇", description: "Trusted-by heading and names" },
  insights: { icon: "◉", description: "Dashboard cards, filters and reports" },
  journey: { icon: "↗", description: "Lifecycle steps and details" },
  faq: { icon: "?", description: "Frequently asked questions" },
  finalCta: { icon: "→", description: "Closing call to action" },
  footer: { icon: "⌄", description: "Footer links and contact details" },
};

// ---------- immutable update ----------
function setIn(root: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = root.slice();
    copy[head as number] = setIn(root[head as number], rest, value);
    return copy;
  }
  const obj = root as Obj;
  return { ...obj, [head]: setIn(obj[head as string], rest, value) };
}

// Find the default for a path, using the first item of every list as the template
function defaultAt(defaults: Json, path: Path): Json | undefined {
  let cur: Json | undefined = defaults;
  for (const p of path) {
    if (cur === undefined) return undefined;
    if (Array.isArray(cur)) cur = arrayTemplate(cur);
    else if (typeof cur === "object") cur = (cur as Obj)[p as string];
    else return undefined;
  }
  return cur;
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const iconBtn =
  "grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:cursor-default disabled:opacity-30";

type FieldProps = {
  name: string;
  path: Path;
  value: Json;
  defaults: Json;
  onChange: (path: Path, v: Json) => void;
  hideLabel?: boolean;
};

function isImageKey(name: string, value: string) {
  if (/^(logoUrl|logo|image|posterImage|photoUrl|iconUrl|coverImage)$/i.test(name)) return true;
  if (/logo/i.test(name)) return true;
  if (typeof value === "string" && /\.(png|jpe?g|webp|svg|gif)(\?.*)?$/i.test(value)) return true;
  return false;
}

function ImageUploadField({
  id,
  label,
  value,
  onChange,
  hideLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  hideLabel?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({ error: "Upload failed." }));
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {!hideLabel && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image path, URL or upload"
          className={`${inputCls} flex-1`}
        />
        <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer transition shrink-0 select-none shadow-xs">
          <span>{uploading ? "Uploading…" : "Upload"}</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg bg-white shrink-0 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {value && (
        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-lg w-fit mt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-7 max-w-[120px] object-contain rounded"
          />
          <span className="text-xs text-slate-500 font-mono truncate max-w-[200px]">{value}</span>
        </div>
      )}
    </div>
  );
}

function Field({ name, path, value, defaults, onChange, hideLabel }: FieldProps) {
  const label = humanize(name);
  const id = `f-${path.join("-")}`;

  if (typeof value === "string") {
    if (isImageKey(name, value)) {
      return (
        <ImageUploadField
          id={id}
          label={label}
          value={value}
          onChange={(v) => onChange(path, v)}
          hideLabel={hideLabel}
        />
      );
    }
    const long = LONG_KEYS.test(name) || value.length > 90;
    const link = isLinkKey(name);
    const hasToken = /\{(name|email)\}/.test(value);
    return (
      <div className="flex flex-col gap-1.5">
        {!hideLabel && (
          <label htmlFor={id} className="text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        {long ? (
          <textarea
            id={id}
            aria-label={hideLabel ? label : undefined}
            value={value}
            rows={Math.min(8, Math.max(2, Math.ceil(value.length / 80)))}
            onChange={(e) => onChange(path, e.target.value)}
            className={`${inputCls} resize-y leading-relaxed`}
          />
        ) : (
          <input
            id={id}
            aria-label={hideLabel ? label : undefined}
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            placeholder={link ? "e.g. /crm/contact, #demo or https://…" : undefined}
            className={inputCls}
          />
        )}
        {link && <p className="text-xs text-slate-500">A page on this site (/crm/pricing), a section (#demo), a full web address, mailto: or tel:.</p>}
        {hasToken && <p className="text-xs text-slate-500">Keep the words in {"{curly brackets}"} — they are replaced with what the visitor typed.</p>}
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(path, e.target.value === "" ? 0 : Number(e.target.value))}
          className={`${inputCls} max-w-[220px]`}
        />
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-slate-700">
        <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} className="h-4 w-4 accent-indigo-600" />
        {label}
      </label>
    );
  }

  if (Array.isArray(value)) {
    let fixedSize: number | undefined;
    if (path.length === 2 && path[0] === "caseStudies" && path[1] === "cards") fixedSize = 3;
    else if (path.length === 1 && path[0] === "erpFeatures") fixedSize = 3;
    else if (path.length === 2 && path[0] === "journey" && path[1] === "steps") fixedSize = 10;
    else if (path.length === 2 && path[0] === "journey" && path[1] === "stepDetails") fixedSize = 10;
    else if (path.length === 2 && path[0] === "insights" && path[1] === "filters") fixedSize = 4;
    else if (path.length === 2 && path[0] === "insights" && path[1] === "signalGroups") fixedSize = 4;
    else if (path.length === 4 && path[0] === "insights" && path[1] === "signalGroups" && path[3] === "cards") fixedSize = 4;
    else if (path.length === 3 && path[0] === "insights" && path[1] === "reportModal" && path[2] === "metrics") fixedSize = 4;
    else if (path.length === 3 && path[0] === "insights" && path[1] === "reportModal" && path[2] === "details") fixedSize = 4;
    return (
      <ListField
        name={name}
        path={path}
        value={value}
        defaults={defaults}
        onChange={onChange}
        minItems={fixedSize}
        maxItems={fixedSize}
      />
    );
  }

  // object
  const entries = Object.entries(value as Obj);
  return (
    <fieldset className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      {!hideLabel && <legend className="px-1 text-sm font-bold text-slate-800">{label}</legend>}
      {entries.map(([k, v]) => (
        <Field key={k} name={k} path={[...path, k]} value={v} defaults={defaults} onChange={onChange} />
      ))}
    </fieldset>
  );
}

function ListField({
  name,
  path,
  value,
  defaults,
  onChange,
  minItems = 0,
  maxItems = Number.POSITIVE_INFINITY,
}: Omit<FieldProps, "value"> & { value: Json[]; minItems?: number; maxItems?: number }) {
  const tplDefault = defaultAt(defaults, [...path, 0]);
  const template = tplDefault === undefined ? "" : tplDefault;
  const simple = typeof template === "string" || typeof template === "number";
  const move = (from: number, to: number) => {
    const copy = value.slice();
    const [it] = copy.splice(from, 1);
    copy.splice(to, 0, it);
    onChange(path, copy);
  };
  const remove = (i: number) => {
    if (value.length <= minItems) return;
    if (!simple && !window.confirm(`Remove “${itemTitle(value[i], i)}”?`)) return;
    onChange(
      path,
      value.filter((_, j) => j !== i),
    );
  };
  const add = () => onChange(path, [...value, blankOf(template)]);

  const controls = (i: number) => (
    <div className="flex shrink-0 gap-1">
      <button type="button" className={iconBtn} onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Move up" title="Move up">
        ↑
      </button>
      <button type="button" className={iconBtn} onClick={() => move(i, i + 1)} disabled={i === value.length - 1} aria-label="Move down" title="Move down">
        ↓
      </button>
      <button type="button" className={`${iconBtn} hover:border-red-200 hover:text-red-600`} onClick={() => remove(i)} disabled={value.length <= minItems} aria-label="Remove" title="Remove">
        ✕
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-slate-700">
        {humanize(name)} <span className="font-normal text-slate-400">({value.length})</span>
      </p>
      {simple ? (
        <ul className="flex flex-col gap-2">
          {value.map((v, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <Field name={`${name} ${i + 1}`} path={[...path, i]} value={v} defaults={defaults} onChange={onChange} hideLabel />
              </div>
              {controls(i)}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-2">
          {value.map((v, i) => (
            <li key={i}>
              <details open={value.length <= 3} className="group rounded-xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden className="text-slate-400 transition-transform group-open:rotate-90">
                      ▸
                    </span>
                    <span className="truncate font-semibold text-slate-800">
                      {i + 1}. {itemTitle(v, i)}
                    </span>
                  </span>
                  {controls(i)}
                </summary>
                <div className="flex flex-col gap-4 border-t border-slate-100 p-4">
                  {Object.entries(v as Obj).map(([k, child]) => (
                    <Field key={k} name={k} path={[...path, i, k]} value={child} defaults={defaults} onChange={onChange} />
                  ))}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
      {value.length < maxItems && <button
        type="button"
        onClick={add}
        className="self-start cursor-pointer rounded-lg border border-dashed border-indigo-300 px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
      >
        + Add {singular(name)}
      </button>}
    </div>
  );
}

export default function ContentEditor({
  pageKey,
  title,
  description,
  viewPath,
  initial,
  defaults,
  resetAction,
  wasReset,
}: {
  pageKey: string;
  title: string;
  description: string;
  viewPath: string;
  initial: Json;
  defaults: Json;
  resetAction: () => Promise<void>;
  wasReset: boolean;
}) {
  const [value, setValue] = useState<Json>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; text?: string }>(
    wasReset ? { kind: "ok", text: "This page is back to its original text." } : { kind: "idle" },
  );
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== saved;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const onChange = (path: Path, v: Json) => {
    setValue((cur) => setIn(cur, path, v));
    setStatus({ kind: "idle" });
  };

  const sections = useMemo(() => {
    const obj = value as Obj;
    const general = Object.keys(obj).filter((k) => typeof obj[k] !== "object");
    const groups = Object.keys(obj).filter((k) => typeof obj[k] === "object");
    return { general, groups };
  }, [value]);
  const sectionKeys = sections.general.length > 0 ? ["__general", ...sections.groups] : sections.groups;
  const [activeSection, setActiveSection] = useState(() => {
    const obj = initial as Obj;
    return Object.keys(obj).find((key) => typeof obj[key] === "object") ?? "__general";
  });
  const currentSection = sectionKeys.includes(activeSection) ? activeSection : sectionKeys[0] ?? "__general";

  const save = () =>
    startTransition(async () => {
      const res = await savePage(pageKey, value);
      if (res.ok) {
        setSaved(JSON.stringify(value));
        setStatus({ kind: "ok", text: "Saved. The website now shows your changes." });
      } else setStatus({ kind: "error", text: res.error });
    });

  const obj = value as Obj;

  const sectionValue = currentSection === "__general"
    ? undefined
    : obj[currentSection] as Json;
  const detail = SECTION_DETAILS[currentSection] ?? {
    icon: "✳",
    description: `Manage the ${humanize(currentSection).toLowerCase()} content on this page`,
  };
  const fieldCount = currentSection === "__general"
    ? sections.general.reduce((total, key) => total + countFields(obj[key]), 0)
    : countFields(sectionValue ?? "");

  return (
    <div className="mx-auto max-w-[1440px] pb-32">
      <header className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-5 px-6 py-6 sm:px-8">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-xl font-bold text-white shadow-lg shadow-indigo-200">
              ✎
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
                <span>WEBSITE CONTENT</span><span>/</span><span className="text-indigo-600">EDITOR</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          </div>
          <a
            href={viewPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Preview page <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 bg-slate-50/80 px-6 py-3 text-xs font-semibold text-slate-500 sm:px-8">
          <span><strong className="text-slate-900">{sectionKeys.length}</strong> content sections</span>
          <span><strong className="text-slate-900">{Object.keys(obj).length}</strong> editable groups</span>
          <span className={`inline-flex items-center gap-1.5 ${dirty ? "text-amber-700" : "text-emerald-700"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dirty ? "bg-amber-500" : "bg-emerald-500"}`} />
            {dirty ? "Unsaved edits" : "All changes saved"}
          </span>
        </div>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Editor sections" className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-20">
          <div className="px-3 pb-2 pt-1 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-400">
            Sections
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {sectionKeys.map((key, index) => {
              const label = key === "__general" ? "General" : humanize(key);
              const selected = key === currentSection;
              const valueForCount = key === "__general" ? undefined : obj[key];
              const fields = key === "__general"
                ? sections.general.reduce<number>((total, field) => total + countFields(obj[field]), 0)
                : valueForCount === undefined ? 0 : countFields(valueForCount);
              const itemDetail = SECTION_DETAILS[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  aria-current={selected ? "step" : undefined}
                  className={`group flex min-w-[190px] items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:min-w-0 ${
                    selected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-bold ${
                    selected ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                  }`}>
                    {itemDetail?.icon ?? (key === "__general" ? "⚙" : String(index).padStart(2, "0"))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{label}</span>
                    <span className={`mt-0.5 block text-[11px] ${selected ? "text-indigo-100" : "text-slate-400"}`}>
                      {fields} fields
                    </span>
                  </span>
                  <span className={`text-xs ${selected ? "text-white/70" : "text-slate-300"}`}>›</span>
                </button>
              );
            })}
          </div>
          <form action={resetAction} className="mt-3 border-t border-slate-100 pt-3">
            <button
              type="submit"
              onClick={(e) => {
                if (!window.confirm("Put every field on this page back to the original text? Your edits to this page will be replaced.")) e.preventDefault();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-rose-600 transition hover:bg-rose-50"
            >
              <span aria-hidden>↺</span> Reset page content
            </button>
          </form>
        </nav>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                {detail.icon}
              </span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  {currentSection === "__general" ? "General" : humanize(currentSection)}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">{detail.description}</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              {fieldCount} editable fields
            </span>
          </div>
          <div className="flex flex-col gap-5 p-5 sm:p-7">
            {currentSection === "__general"
              ? sections.general.map((key) => (
                  <Field key={key} name={key} path={[key]} value={obj[key]} defaults={defaults} onChange={onChange} />
                ))
              : Array.isArray(sectionValue)
                ? <Field name={currentSection} path={[currentSection]} value={sectionValue} defaults={defaults} onChange={onChange} />
                : Object.entries(sectionValue as Obj).map(([key, child]) => (
                    <Field key={key} name={key} path={[currentSection, key]} value={child} defaults={defaults} onChange={onChange} />
                  ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_-18px_rgba(15,23,42,.25)] backdrop-blur md:left-72">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <p
            role="status"
            className={`flex items-center gap-2 text-sm font-semibold ${status.kind === "error" ? "text-rose-700" : status.kind === "ok" ? "text-emerald-700" : dirty ? "text-amber-700" : "text-slate-500"}`}
          >
            <span className={`h-2 w-2 rounded-full ${status.kind === "error" ? "bg-rose-500" : status.kind === "ok" || !dirty ? "bg-emerald-500" : "bg-amber-500"}`} />
            {status.text ?? (dirty ? "You have unsaved changes." : "All changes are saved.")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!dirty || pending}
              onClick={() => {
                setValue(JSON.parse(saved));
                setStatus({ kind: "idle" });
              }}
              className="h-10 cursor-pointer rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-default disabled:opacity-40"
            >
              Discard
            </button>
            <button
              type="button"
              disabled={!dirty || pending}
              onClick={save}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-default disabled:bg-slate-300 disabled:shadow-none"
            >
              {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
