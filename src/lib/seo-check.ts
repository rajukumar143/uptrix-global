// On-page SEO checks for a blog post, shown live in the editor.
import { markdownToText, slugify } from "./markdown";

export type SeoInput = {
  title: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  slug: string;
  content: string;
  excerpt: string;
  coverSrc: string;
  coverAlt: string;
};

export type Check = { ok: boolean | "warn"; label: string; tip: string };

const has = (hay: string, needle: string) => needle !== "" && hay.toLowerCase().includes(needle.toLowerCase());

export function analyzeSeo(p: SeoInput): { checks: Check[]; score: number } {
  const kw = p.focusKeyword.trim();
  const title = (p.seoTitle || p.title).trim();
  const meta = p.metaDescription.trim();
  const text = markdownToText(p.content);
  const words = text ? text.split(" ").length : 0;
  const h2s = [...p.content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => m[1]);
  const firstPara = text.split(" ").slice(0, 100).join(" ");
  const links = [...p.content.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]);
  const internal = links.filter((l) => l.startsWith("/") || l.startsWith("#")).length;
  const external = links.filter((l) => /^https?:\/\//.test(l)).length;
  const images = [...p.content.matchAll(/!\[([^\]]*)\]\(/g)].map((m) => m[1]);
  const kwCount = kw ? (text.toLowerCase().match(new RegExp(kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length : 0;
  const density = words ? (kwCount * kw.split(/\s+/).length * 100) / words : 0;

  const checks: Check[] = [
    { ok: kw !== "", label: "Focus keyword is set", tip: "Pick the main phrase people would search for, e.g. “lead management for coaching institutes”." },
    {
      ok: title.length >= 30 && title.length <= 60 ? true : title.length > 0 ? "warn" : false,
      label: `SEO title length (${title.length} characters, aim for 30–60)`,
      tip: "Google shows about 60 characters. Shorter titles look empty; longer ones get cut off.",
    },
    { ok: has(title, kw), label: "Focus keyword in the SEO title", tip: "Put the keyword in the title, ideally near the start." },
    {
      ok: meta.length >= 120 && meta.length <= 160 ? true : meta.length > 0 ? "warn" : false,
      label: `Meta description length (${meta.length} characters, aim for 120–160)`,
      tip: "This is the grey text under your link on Google. Write it to make people click.",
    },
    { ok: has(meta, kw), label: "Focus keyword in the meta description", tip: "Google highlights the searched words in bold, which draws the eye." },
    { ok: kw !== "" && has(p.slug, slugify(kw)), label: "Focus keyword in the web address", tip: "Keep the address short and include the keyword, e.g. /blog/lead-management-tips." },
    { ok: has(firstPara, kw), label: "Focus keyword in the first paragraph", tip: "Mention the topic early so readers and Google know what the page is about." },
    {
      ok: h2s.length === 0 ? false : h2s.some((h) => has(h, kw)) ? true : "warn",
      label: h2s.length ? "Focus keyword in a subheading" : "Use subheadings (H2) to break up the article",
      tip: "Use ## Subheading for sections. Include the keyword (or a close variant) in at least one.",
    },
    {
      ok: words >= 800 ? true : words >= 300 ? "warn" : false,
      label: `Length: ${words} words (aim for 800+)`,
      tip: "Longer, complete answers tend to rank better. Aim for 800–2,000 words for guides.",
    },
    {
      ok: !kw || words === 0 ? false : density >= 0.5 && density <= 2.5 ? true : "warn",
      label: `Keyword used ${kwCount} time${kwCount === 1 ? "" : "s"} (${density.toFixed(1)}%, aim for 0.5–2.5%)`,
      tip: "Use the keyword naturally. Too few and Google may miss the topic; too many looks like spam.",
    },
    { ok: internal > 0, label: `Links to your own pages (${internal})`, tip: "Link to related pages, e.g. [our pricing](/crm/pricing) or another blog post." },
    { ok: external > 0 ? true : "warn", label: `Links to other trusted websites (${external})`, tip: "Linking to a good source for a fact or statistic builds trust." },
    { ok: p.coverSrc !== "" && p.coverAlt.trim() !== "", label: "Cover image with alt text", tip: "Add a cover image and describe it in the alt text. It shows when the post is shared." },
    {
      ok: images.every((a) => a.trim() !== ""),
      label: images.length ? "Every image in the article has alt text" : "Images in the article have alt text",
      tip: "Describe each image in the [square brackets]: ![Counselor dashboard](…).",
    },
    { ok: p.excerpt.trim().length > 0 ? true : "warn", label: "Short summary (excerpt) written", tip: "Shown on the blog list and under the title." },
  ];

  const score = Math.round((checks.reduce((s, c) => s + (c.ok === true ? 1 : c.ok === "warn" ? 0.5 : 0), 0) / checks.length) * 100);
  return { checks, score };
}
