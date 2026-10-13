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

function Field({ name, path, value, defaults, onChange, hideLabel }: FieldProps) {
  const label = humanize(name);
  const id = `f-${path.join("-")}`;

  if (typeof value === "string") {
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

  // Top-level lists and groups become sections; loose single fields go into "General"
  const sections = useMemo(() => {
    const obj = value as Obj;
    const general = Object.keys(obj).filter((k) => typeof obj[k] !== "object");
    const groups = Object.keys(obj).filter((k) => typeof obj[k] === "object");
    return { general, groups };
  }, [value]);

  const save = () =>
    startTransition(async () => {
      const res = await savePage(pageKey, value);
      if (res.ok) {
        setSaved(JSON.stringify(value));
        setStatus({ kind: "ok", text: "Saved. The website now shows your changes." });
      } else setStatus({ kind: "error", text: res.error });
    });

  const obj = value as Obj;

  return (
    <div className="pb-28">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 bg-white px-5 py-6 md:px-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 max-w-[640px] text-slate-500">{description}</p>
        </div>
        <a href={viewPath} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50">
          View page ↗
        </a>
      </header>

      <div className="mx-auto flex max-w-[960px] flex-col gap-4 px-5 py-6 md:px-10">
        {sections.general.length > 0 && (
          <details open className="rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer px-5 py-4 text-lg font-bold text-slate-900">General</summary>
            <div className="flex flex-col gap-4 border-t border-slate-100 p-5">
              {sections.general.map((k) => (
                <Field key={k} name={k} path={[k]} value={obj[k]} defaults={defaults} onChange={onChange} />
              ))}
            </div>
          </details>
        )}
        {sections.groups.map((k, i) => (
          <details key={k} open={i === 0} className="rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer px-5 py-4 text-lg font-bold text-slate-900">{humanize(k)}</summary>
            <div className="flex flex-col gap-4 border-t border-slate-100 p-5">
              {Array.isArray(obj[k]) ? (
                <Field name={k} path={[k]} value={obj[k]} defaults={defaults} onChange={onChange} />
              ) : (
                Object.entries(obj[k] as Obj).map(([ck, cv]) => (
                  <Field key={ck} name={ck} path={[k, ck]} value={cv} defaults={defaults} onChange={onChange} />
                ))
              )}
            </div>
          </details>
        ))}

        <form action={resetAction} className="mt-6 border-t border-slate-200 pt-6">
          <button
            type="submit"
            onClick={(e) => {
              if (!window.confirm("Put every field on this page back to the original text? Your edits to this page will be replaced.")) e.preventDefault();
            }}
            className="cursor-pointer text-sm font-semibold text-red-600 hover:underline"
          >
            Reset this page to the original text
          </button>
        </form>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur md:left-72 shadow-lg">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-10">
          <p
            role="status"
            className={`text-sm font-medium ${status.kind === "error" ? "text-red-600" : status.kind === "ok" ? "text-emerald-700" : "text-slate-500"}`}
          >
            {status.text ?? (dirty ? "You have unsaved changes." : "No unsaved changes.")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!dirty || pending}
              onClick={() => {
                setValue(JSON.parse(saved));
                setStatus({ kind: "idle" });
              }}
              className="h-10 cursor-pointer rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-default disabled:opacity-40"
            >
              Discard
            </button>
            <button
              type="button"
              disabled={!dirty || pending}
              onClick={save}
              className="h-10 cursor-pointer rounded-lg bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-default disabled:opacity-40"
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
