"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { deletePost, savePost } from "@/app/admin/blog-actions";
import type { Post } from "@/lib/blog-store";
import { readingMinutes, renderMarkdown, slugify, wordCount } from "@/lib/markdown";
import { analyzeSeo } from "@/lib/seo-check";

type Draft = Post;

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const label = "text-sm font-semibold text-slate-700";
const card = "flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4";

// ISO date ↔ the value a datetime-local input expects (in the admin's own time zone)
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
};
const fromLocalInput = (v: string) => (v ? new Date(v).toISOString() : new Date().toISOString());

async function uploadImage(file: File): Promise<{ url: string; width: number; height: number }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({ error: "Upload failed." }));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data;
}

const TOOLS = [
  { key: "h2", label: "H2", title: "Section heading" },
  { key: "h3", label: "H3", title: "Sub-heading" },
  { key: "bold", label: "B", title: "Bold" },
  { key: "italic", label: "I", title: "Italic" },
  { key: "link", label: "Link", title: "Link" },
  { key: "ul", label: "• List", title: "Bulleted list" },
  { key: "ol", label: "1. List", title: "Numbered list" },
  { key: "quote", label: "❝ Quote", title: "Quote" },
  { key: "table", label: "Table", title: "Table" },
] as const;

function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  const cls = n === 0 ? "text-slate-400" : n >= min && n <= max ? "text-emerald-600" : "text-amber-600";
  return <span className={`text-xs font-semibold ${cls}`}>{n} characters</span>;
}

export default function PostEditor({
  initial,
  categories,
  internalLinks,
}: {
  initial: Draft;
  categories: string[];
  internalLinks: { title: string; href: string }[];
}) {
  const [post, setPost] = useState<Draft>(initial);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [tagText, setTagText] = useState(initial.tags.join(", "));
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; text?: string }>({ kind: "idle" });
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [now] = useState(() => Date.now());
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const dirty = JSON.stringify(post) !== savedJson;
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setPost((p) => ({ ...p, [k]: v }));
    setStatus({ kind: "idle" });
  };

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const seo = useMemo(
    () =>
      analyzeSeo({
        title: post.title,
        seoTitle: post.seoTitle,
        metaDescription: post.metaDescription,
        focusKeyword: post.focusKeyword,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        coverSrc: post.coverImage.src,
        coverAlt: post.coverImage.alt,
      }),
    [post],
  );
  const preview = useMemo(() => (tab === "preview" ? renderMarkdown(post.content).html : ""), [tab, post.content]);
  const words = wordCount(post.content);

  const save = (nextStatus?: Draft["status"]) =>
    startTransition(async () => {
      const { id, createdAt, updatedAt, ...rest } = post;
      const toSave = {
        ...rest,
        ...(id ? { id } : {}),
        ...(createdAt ? { createdAt } : {}),
        ...(updatedAt ? { updatedAt } : {}),
        status: nextStatus ?? post.status,
      };
      const res = await savePost(toSave, post.id || undefined);
      if (!res.ok) {
        setStatus({ kind: "error", text: res.error });
        return;
      }
      const updated: Draft = { ...post, ...toSave, id: res.id, slug: res.slug, updatedAt: res.savedAt };
      setPost(updated);
      setSavedJson(JSON.stringify(updated));
      setSlugTouched(true);
      setStatus({
        kind: "ok",
        text: updated.status === "published" ? "Saved and published. It's live on your blog." : "Draft saved. It's not visible to visitors yet.",
      });
      // Give a new post its own address without reloading, so the message above stays visible
      if (!post.id) window.history.replaceState(null, "", `/admin/blog/${res.id}`);
    });

  // Ctrl/Cmd + S saves
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!pending) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ---- Markdown toolbar ----
  const wrap = (before: string, after = "", placeholder = "") => {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  };
  const linePrefix = (prefix: string, placeholder: string) => {
    const el = textRef.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const needsBreak = lineStart === s && s > 0 && value[s - 1] !== "\n" ? "\n" : "";
    if (value.slice(lineStart, s).trim() === "" || lineStart === s) {
      wrap(`${needsBreak}${prefix}`, "", placeholder);
    } else {
      set("content", value.slice(0, lineStart) + prefix + value.slice(lineStart));
    }
  };
  const insertImage = async (file: File) => {
    setUploading(true);
    try {
      const img = await uploadImage(file);
      const alt = window.prompt("Describe the image in a few words (alt text, helps SEO):", "") ?? "";
      wrap(`\n![${alt.replace(/[[\]]/g, "")}](${img.url})\n`);
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    } finally {
      setUploading(false);
    }
  };
  const setCover = async (file: File) => {
    setUploading(true);
    try {
      const img = await uploadImage(file);
      set("coverImage", { ...post.coverImage, src: img.url, width: img.width, height: img.height });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    } finally {
      setUploading(false);
    }
  };

  const runTool = (key: (typeof TOOLS)[number]["key"]) => {
    if (key === "h2") linePrefix("## ", "Section heading");
    else if (key === "h3") linePrefix("### ", "Sub-heading");
    else if (key === "bold") wrap("**", "**", "bold text");
    else if (key === "italic") wrap("_", "_", "italic text");
    else if (key === "link") {
      const url = window.prompt("Link to (e.g. /crm/pricing or https://…):", "https://");
      if (url) wrap("[", `](${url.trim()})`, "link text");
    } else if (key === "ul") linePrefix("- ", "List item");
    else if (key === "ol") linePrefix("1. ", "First step");
    else if (key === "quote") linePrefix("> ", "Quote");
    else if (key === "table") wrap("\n| Column | Column |\n| --- | --- |\n| ", " | Value |\n", "Value");
  };

  const googleTitle = (post.seoTitle || post.title || "Your post title").slice(0, 70);
  const googleDesc = post.metaDescription || post.excerpt || "Write a meta description to control the text Google shows under your link.";
  const scoreColor = seo.score >= 80 ? "bg-emerald-500" : seo.score >= 50 ? "bg-amber-500" : "bg-red-500";
  const isScheduled = post.status === "published" && new Date(post.publishedAt).getTime() > now;

  return (
    <div className="pb-24">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="text-sm font-semibold text-slate-500 hover:text-slate-800">
            ← All posts
          </Link>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              post.status === "draft" ? "bg-slate-100 text-slate-600" : isScheduled ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {post.status === "draft" ? "Draft" : isScheduled ? "Scheduled" : "Published"}
          </span>
        </div>
        <p role="status" className={`text-sm font-medium ${status.kind === "error" ? "text-red-600" : status.kind === "ok" ? "text-emerald-700" : "text-slate-500"}`}>
          {status.text ?? (dirty ? "Unsaved changes" : post.id ? "All changes saved" : "")}
        </p>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-6 px-5 py-6 md:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* ---- Main column ---- */}
        <div className="flex min-w-0 flex-col gap-4">
          <input
            aria-label="Post title"
            value={post.title}
            onChange={(e) => {
              const title = e.target.value;
              setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));
              setStatus({ kind: "idle" });
            }}
            placeholder="Post title"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-2xl font-bold text-slate-900 placeholder:text-slate-300 focus:border-indigo-600 focus:outline-none"
          />
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Web address: /blog/</span>
            <input
              aria-label="Web address (slug)"
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              className="min-w-[200px] flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 font-mono text-[13px] text-slate-800"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
              <div role="tablist" className="mr-2 flex rounded-lg bg-white p-0.5 ring-1 ring-slate-200">
                {(["write", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`cursor-pointer rounded-md px-3 py-1 text-sm font-semibold capitalize ${tab === t ? "bg-indigo-600 text-white" : "text-slate-600"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tab === "write" &&
                TOOLS.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    title={t.title}
                    onClick={() => runTool(t.key)}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-sm font-semibold text-slate-700 hover:bg-white hover:ring-1 hover:ring-slate-200"
                  >
                    {t.label}
                  </button>
                ))}
              {tab === "write" && (
                <>
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileRef.current?.click()}
                    className="cursor-pointer rounded-md px-2.5 py-1 text-sm font-semibold text-slate-700 hover:bg-white hover:ring-1 hover:ring-slate-200 disabled:opacity-50"
                  >
                    {uploading ? "Uploading…" : "🖼 Image"}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) insertImage(f);
                      e.target.value = "";
                    }}
                  />
                  {internalLinks.length > 0 && (
                    <select
                      aria-label="Link to one of your posts"
                      value=""
                      onChange={(e) => {
                        const l = internalLinks.find((x) => x.href === e.target.value);
                        if (l) wrap("[", `](${l.href})`, l.title);
                      }}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
                    >
                      <option value="">Link to a post…</option>
                      {internalLinks.map((l) => (
                        <option key={l.href} value={l.href}>
                          {l.title}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
            </div>
            {tab === "write" ? (
              <textarea
                ref={textRef}
                aria-label="Post content"
                value={post.content}
                onChange={(e) => set("content", e.target.value)}
                onPaste={(e) => {
                  const f = e.clipboardData.files?.[0];
                  if (f && f.type.startsWith("image/")) {
                    e.preventDefault();
                    insertImage(f);
                  }
                }}
                placeholder={"Start writing…\n\n## Use H2 for main sections\n\nWrite short paragraphs. **Bold** the key points.\n\n- Lists are easy to scan"}
                className="min-h-[560px] w-full resize-y p-5 font-mono text-[15px] leading-7 text-slate-800 focus:outline-none"
              />
            ) : (
              <div className="prose-blog min-h-[560px] p-6" dangerouslySetInnerHTML={{ __html: preview || "<p>Nothing to preview yet.</p>" }} />
            )}
            <div className="flex flex-wrap justify-between gap-2 border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
              <span>
                {words} words · {readingMinutes(post.content)} min read
              </span>
              <span>Tip: paste a screenshot straight into the text to upload it.</span>
            </div>
          </div>

          <details className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <summary className="cursor-pointer font-semibold text-slate-800">Formatting help</summary>
            <ul className="mt-3 grid gap-1.5 font-mono text-[13px] sm:grid-cols-2">
              <li>## Section heading</li>
              <li>### Sub-heading</li>
              <li>**bold** and _italic_</li>
              <li>[link text](/crm/pricing)</li>
              <li>- bullet point</li>
              <li>1. numbered step</li>
              <li>&gt; quote</li>
              <li>![image description](url)</li>
            </ul>
          </details>
        </div>

        {/* ---- Sidebar ---- */}
        <aside className="flex flex-col gap-4">
          <section className={card} aria-label="Publish">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => save("draft")}
                className="h-10 flex-1 cursor-pointer rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Save draft
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => save("published")}
                className="h-10 flex-1 cursor-pointer rounded-lg bg-indigo-600 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {pending ? "Saving…" : post.status === "published" ? "Update" : "Publish"}
              </button>
            </div>
            <label className={label}>
              Publish date
              <input
                type="datetime-local"
                value={toLocalInput(post.publishedAt)}
                onChange={(e) => set("publishedAt", fromLocalInput(e.target.value))}
                className={`${input} mt-1.5`}
              />
            </label>
            <p className="text-xs text-slate-500">Set a future date to schedule the post. It goes live within a minute or two of that time.</p>
            {post.id && post.status === "published" && !isScheduled && (
              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-indigo-700 hover:underline">
                View live post ↗
              </a>
            )}
          </section>

          <section className={card} aria-labelledby="seo-h">
            <div className="flex items-center justify-between">
              <h2 id="seo-h" className="font-bold text-slate-900">
                SEO
              </h2>
              <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className={`h-2.5 w-2.5 rounded-full ${scoreColor}`} />
                {seo.score}/100
              </span>
            </div>
            <label className={label}>
              Focus keyword
              <input
                value={post.focusKeyword}
                onChange={(e) => set("focusKeyword", e.target.value)}
                placeholder="e.g. admission CRM"
                className={`${input} mt-1.5`}
              />
            </label>
            <label className={label}>
              <span className="flex justify-between">
                SEO title <Counter n={(post.seoTitle || post.title).length} min={30} max={60} />
              </span>
              <input
                value={post.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
                placeholder={post.title || "Leave empty to use the post title"}
                className={`${input} mt-1.5`}
              />
            </label>
            <label className={label}>
              <span className="flex justify-between">
                Meta description <Counter n={post.metaDescription.length} min={120} max={160} />
              </span>
              <textarea
                rows={3}
                value={post.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                placeholder="One or two sentences that make people want to click."
                className={`${input} mt-1.5 resize-y`}
              />
            </label>

            <div className="rounded-xl border border-slate-200 p-3" aria-label="Google preview">
              <p className="text-[11px] font-bold tracking-wide text-slate-400 uppercase">Google preview</p>
              <p className="mt-1.5 truncate text-xs text-slate-600">yourdomain.com › blog › {post.slug || "post"}</p>
              <p className="truncate text-[17px] leading-snug text-[#1a0dab]">{googleTitle}</p>
              <p className="line-clamp-2 text-[13px] leading-snug text-slate-600">{googleDesc}</p>
            </div>

            <ul className="flex flex-col gap-1.5">
              {seo.checks.map((c) => (
                <li key={c.label} className="flex items-start gap-2 text-[13px] leading-snug">
                  <span
                    aria-hidden
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${c.ok === true ? "bg-emerald-500" : c.ok === "warn" ? "bg-amber-500" : "bg-red-500"}`}
                  />
                  <span title={c.tip} className="text-slate-700">
                    {c.label}
                    {c.ok !== true && <span className="block text-slate-400">{c.tip}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={card} aria-label="Cover image">
            <h2 className="font-bold text-slate-900">Cover image</h2>
            {post.coverImage.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImage.src} alt="" className="aspect-[16/9] w-full rounded-lg border border-slate-200 object-cover" />
            ) : (
              <p className="text-sm text-slate-500">Shown at the top of the post and when it&apos;s shared. 1600×900 works best.</p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                disabled={uploading}
                onClick={() => coverRef.current?.click()}
                className="cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
              >
                {uploading ? "Uploading…" : post.coverImage.src ? "Change" : "Upload"}
              </button>
              {post.coverImage.src && (
                <button
                  type="button"
                  onClick={() => set("coverImage", { src: "", alt: "", width: 0, height: 0 })}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              )}
              <input
                ref={coverRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setCover(f);
                  e.target.value = "";
                }}
              />
            </div>
            <label className={label}>
              Alt text (describe the image)
              <input
                value={post.coverImage.alt}
                onChange={(e) => set("coverImage", { ...post.coverImage, alt: e.target.value })}
                className={`${input} mt-1.5`}
              />
            </label>
          </section>

          <section className={card} aria-label="Details">
            <label className={label}>
              Summary (excerpt)
              <textarea
                rows={3}
                value={post.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Shown on the blog list and under the title."
                className={`${input} mt-1.5 resize-y`}
              />
            </label>
            <label className={label}>
              Category
              <input list="post-categories" value={post.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Admissions" className={`${input} mt-1.5`} />
              <datalist id="post-categories">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label className={label}>
              Tags (separate with commas)
              <input
                value={tagText}
                onChange={(e) => {
                  setTagText(e.target.value);
                  set(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  );
                }}
                placeholder="CRM, follow-ups, coaching"
                className={`${input} mt-1.5`}
              />
            </label>
            <label className={label}>
              Author
              <input value={post.author} onChange={(e) => set("author", e.target.value)} className={`${input} mt-1.5`} />
            </label>
          </section>

          <details className={card}>
            <summary className="cursor-pointer font-bold text-slate-900">Advanced SEO</summary>
            <label className={label}>
              Canonical URL (optional)
              <input
                value={post.canonicalUrl}
                onChange={(e) => set("canonicalUrl", e.target.value)}
                placeholder="Only if this article was first published elsewhere"
                className={`${input} mt-1.5`}
              />
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
              <input type="checkbox" checked={post.noindex} onChange={(e) => set("noindex", e.target.checked)} className="mt-0.5 h-4 w-4 accent-indigo-600" />
              <span>
                <span className="font-semibold">Hide from Google</span> (noindex). The post stays on your blog but won&apos;t appear in search results.
              </span>
            </label>
          </details>

          {post.id && (
            <form action={deletePost.bind(null, post.id)}>
              <button
                type="submit"
                onClick={(e) => {
                  if (!window.confirm("Delete this post permanently? This can't be undone.")) e.preventDefault();
                }}
                className="cursor-pointer text-sm font-semibold text-red-600 hover:underline"
              >
                Delete post
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
