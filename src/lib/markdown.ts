// Markdown → HTML for blog posts. Used on the public blog pages and in the admin live preview.
// Raw HTML typed into a post is shown as text, never run, so a post can't inject scripts.
import { Marked, type Tokens } from "marked";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function safeHref(href: string) {
  const h = href.trim();
  return /^(https?:\/\/|\/|#|mailto:|tel:)/i.test(h) && !/^\/\//.test(h) ? h : "#";
}

export type TocItem = { id: string; text: string; depth: number };

/** Render a post. Returns the HTML plus the H2/H3 headings for a table of contents. */
export function renderMarkdown(md: string) {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const marked = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        // Posts already have the title as H1, so headings inside the post start at H2
        const level = Math.min(6, Math.max(2, depth));
        const plain = text.replace(/[*_`[\]()]/g, "");
        let id = slugify(plain) || "section";
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (level <= 3) toc.push({ id, text: plain, depth: level });
        return `<h${level} id="${id}">${this.parser.parseInline(tokens)}</h${level}>\n`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return esc(text);
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const url = safeHref(href);
        const external = /^https?:\/\//i.test(url);
        const t = title ? ` title="${esc(title)}"` : "";
        const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
        return `<a href="${esc(url)}"${t}${rel}>${this.parser.parseInline(tokens)}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const src = safeHref(href);
        const t = title ? ` title="${esc(title)}"` : "";
        const img = `<img src="${esc(src)}" alt="${esc(text)}"${t} loading="lazy" decoding="async">`;
        return title ? `<figure>${img}<figcaption>${esc(title)}</figcaption></figure>` : img;
      },
    },
  });

  const html = marked.parse(md || "", { async: false }) as string;
  return { html, toc };
}

/** Plain text of a post, for word counts, reading time and search snippets. */
export function markdownToText(md: string) {
  return (md || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(md: string) {
  const t = markdownToText(md);
  return t ? t.split(" ").length : 0;
}

export function readingMinutes(md: string) {
  return Math.max(1, Math.round(wordCount(md) / 200));
}
