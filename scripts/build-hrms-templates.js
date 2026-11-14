// Builds the editable HRMS page templates from the approved static designs.
//   node scripts/build-hrms-templates.js
// It writes:
//   src/hrms-templates/<page>.html          the page with {{section.field}} placeholders
//   src/content/hrms-pages.generated.ts     the default text, SEO fields and admin layout for each section
// Edit the text in the admin dashboard, not in these generated files.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const PAGES = [
  { key: "home", source: "scripts/designs/hrms-home.html" },
  { key: "hr", source: "scripts/designs/hr-suite.html" },
  { key: "it", source: "scripts/designs/it-suite.html" },
];
const LISTS = { ...require("./designs/hrms-lists.js"), ...require("./designs/home-lists.js") };

const TITLES = {
  menu: "Top menu",
  hero: "Hero (top of the page)",
  ai_assistant: "AI assistant",
  challenges: "Challenges",
  five_experiences: "Five experiences",
  connect: "Connect departments",
  benefits: "Benefits",
  demo: "Book a demo",
  footer: "Footer",
  top: "Hero (top of the page)",
  ai: "AI assistant",
  modules: "Modules",
  lifecycle: "Lifecycle stages",
  estimator: "Time-saved estimator",
  connected: "Connected departments",
};

const BLURBS = {
  menu: "The menu at the top of the page.",
  hero: "The first screen: headline, intro and the diagram beside it.",
  ai_assistant: "The AI assistant section and its example chat.",
  challenges: "The problems section and its cards.",
  five_experiences: "The five role cards (employees, HR, finance, IT, managers).",
  connect: "The connected-workflow section.",
  benefits: "The benefits list.",
  demo: "The book-a-demo section.",
  footer: "The footer links and contact details.",
};

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function slugFrom(text) {
  const words = decode(text).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).slice(0, 6);
  return words.join("_").slice(0, 40).replace(/_+$/g, "") || "text";
}

function buildPage(page) {
  const src = fs.readFileSync(path.join(root, page.source), "utf8");
  const headEnd = src.indexOf("<body>");
  const scriptStart = src.indexOf("\n<script>");
  const head = src.slice(0, headEnd);
  const body = src.slice(headEnd, scriptStart);
  const script = src.slice(scriptStart);

  // Head: title, description and keywords come from the SEO section.
  const title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const description = (head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const keywords = "Uptrix HRMS, HR software, employee attendance, leave and payroll, employee records, IT asset management, employee onboarding";
  const newHead = head
    .replace(/<title>[\s\S]*?<\/title>/, "<title>{{seo.title}}</title>")
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="{{seo.description}}">\n<meta name="keywords" content="{{seo.keywords}}">');

  // Markers: comments, header, footer and sections without a comment.
  const markers = [];
  const re = /<!-- ([A-Z &]+) -->|<header[\s>]|<footer[\s>]|<section id="([\w-]+)"/g;
  let m;
  while ((m = re.exec(body))) {
    if (m[1]) markers.push({ at: m.index, name: m[1].toLowerCase().replace(/&/g, "").replace(/\s+/g, "_") });
    else if (m[0].startsWith("<header")) markers.push({ at: m.index, name: "menu" });
    else if (m[0].startsWith("<footer")) markers.push({ at: m.index, name: "footer" });
    else {
      // A section with a comment right before it already started a section.
      const before = body.slice(Math.max(0, m.index - 60), m.index);
      if (!/-->\s*$/.test(before)) markers.push({ at: m.index, name: m[2] });
    }
  }

  const content = {};
  const layout = [];
  let out = body.slice(0, markers.length ? markers[0].at : body.length);
  markers.forEach((marker, i) => {
    const end = i + 1 < markers.length ? markers[i + 1].at : body.length;
    const segment = body.slice(marker.at, end);
    const section = marker.name;
    content[section] = content[section] || {};
    let n = 0;
    const field = (value) => {
      n += 1;
      const key = `${String(n).padStart(2, "0")}_${slugFrom(value)}`;
      content[section][key] = value;
      return `${section}.${key}`;
    };
    // Visible text between tags.
    let replaced = segment.replace(/>([^<]+)</g, (whole, text) => {
      if (!text.trim() || text.includes("{{")) return whole;
      const lead = text.match(/^\s*/)[0];
      const trail = text.match(/\s*$/)[0];
      const core = text.trim();
      return `>${lead}{{{${field(core)}}}}${trail}<`;
    });
    // Attributes a visitor or search engine reads.
    replaced = replaced.replace(/\b(alt|aria-label|placeholder|title)="([^"]+)"/g, (whole, attr, value) => {
      if (value.includes("{{")) return whole;
      return `${attr}="{{${field(decode(value))}}}"`;
    });
    out += replaced;
    if (!layout.some((l) => l.id === section)) {
      layout.push({ id: section, title: TITLES[section] || section.replace(/_/g, " "), description: BLURBS[section] || "Text shown in this section.", keys: [section] });
    }
  });

  content.seo = { title: decode(title), description: decode(description), keywords };
  layout.unshift({ id: "seo", title: "Page settings & SEO", description: "The page title, description and keywords that search engines show.", keys: ["seo"] });

  fs.mkdirSync(path.join(root, "src", "hrms-templates"), { recursive: true });
  fs.writeFileSync(path.join(root, "src", "hrms-templates", `${page.key}.html`), newHead + out + script);
  return { content, layout };
}

const defaults = {};
const layouts = {};
for (const page of PAGES) {
  const { content, layout } = buildPage(page);
  for (const [key, def] of Object.entries((LISTS[page.key] && LISTS[page.key].lists) || {})) {
    content[key] = def.items;
    // The "list-" prefix keeps the id unique: a list can share its name with a page section (e.g. "modules").
    layout.push({ id: `list-${key}`, title: def.title, description: def.description, keys: [key] });
  }
  defaults[page.key] = content;
  layouts[page.key] = layout;
  console.log(page.key, "sections:", layout.length, "fields:", Object.values(content).reduce((t, s) => t + Object.keys(s).length, 0));
}

const file = `// Generated by scripts/build-hrms-templates.js. Edit the text in the admin dashboard instead.
export const HRMS_PAGE_DEFAULTS: Record<string, Record<string, unknown>> = ${JSON.stringify(defaults, null, 2)};

export const HRMS_PAGE_LAYOUTS: Record<string, { id: string; title: string; description: string; keys: string[] }[]> = ${JSON.stringify(layouts, null, 2)};
`;
fs.writeFileSync(path.join(root, "src", "content", "hrms-pages.generated.ts"), file);
console.log("wrote src/content/hrms-pages.generated.ts");
