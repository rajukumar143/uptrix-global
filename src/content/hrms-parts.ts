// The HRMS subdomain content is one page ("hrms") with four parts that the admin dashboard edits separately:
// the home page, the HR and IT suite pages (both under "pages") and the Finance suite page (its own object).
import { HRMS_PAGE_LAYOUTS } from "./hrms-pages.generated";

export type HrmsPart = "home" | "hr" | "it" | "finance";

export const HRMS_PART_TITLES: Record<HrmsPart, string> = {
  home: "HRMS home page",
  hr: "HRMS HR suite page",
  it: "HRMS IT suite page",
  finance: "HRMS Finance suite page",
};

// Parts that still live in the suite objects of the content.
const SUITE_KEY: Partial<Record<HrmsPart, string>> = {
  hr: "hrSuite",
  it: "itSuite",
  finance: "financeSuite",
};

// Parts that are generated from the static page designs and stored under "pages".
const PAGE_PARTS: HrmsPart[] = ["home", "hr", "it"];

export function isHrmsPart(value: unknown): value is HrmsPart {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(HRMS_PART_TITLES, value);
}

// The fields the editor shows for one part.
export function editablePart(obj: Record<string, unknown>, part: HrmsPart): Record<string, unknown> {
  if (PAGE_PARTS.includes(part)) {
    const pages = obj.pages as Record<string, unknown> | undefined;
    const value = pages?.[part];
    return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  }
  const inner = obj[SUITE_KEY[part] as string];
  return inner && typeof inner === "object" && !Array.isArray(inner) ? (inner as Record<string, unknown>) : {};
}

// Put the edited fields of one part back into the full HRMS content.
export function storePart(current: Record<string, unknown>, edited: Record<string, unknown>, part: HrmsPart): Record<string, unknown> {
  if (PAGE_PARTS.includes(part)) {
    const pages = (current.pages as Record<string, unknown> | undefined) ?? {};
    return { ...current, pages: { ...pages, [part]: edited } };
  }
  return { ...current, [SUITE_KEY[part] as string]: edited };
}

// Page sections for the editor, in the order they appear on the website.
export type LayoutSection = { id: string; title: string; description: string; keys: string[] };

const SUITE_LAYOUT: LayoutSection[] = [
  { id: "settings", title: "Page settings & SEO", description: "The page address, the title and description shown in Google.", keys: ["key", "name", "path", "seoTitle", "seoDescription"] },
  { id: "hero", title: "1. Hero (top of the page)", description: "The first screen: the headline, intro text and photo.", keys: ["eyebrow", "h1", "h1Accent", "lead", "photo", "icon", "accent", "soft", "heroBg"] },
  { id: "stats", title: "2. Dashboard summary", description: "The sample dashboard cards under the hero.", keys: ["statsCaption", "stats"] },
  { id: "modules", title: "3. Modules", description: "The title and the module cards that describe what the suite does.", keys: ["modulesTitle", "modulesLead", "mods"] },
  { id: "walkthrough", title: "4. Step-by-step walkthrough", description: "The title and the steps of the sample workflow.", keys: ["walkthroughTitle", "steps"] },
  { id: "connections", title: "5. Connected departments", description: "How this suite links to the other suites.", keys: ["connections"] },
  { id: "estimator", title: "6. Time-saved estimator", description: "The numbers and assumptions behind the time-saved estimate.", keys: ["minutesSaved", "estimatorBasis"] },
];

export const HRMS_LAYOUTS: Record<HrmsPart, LayoutSection[]> = {
  home: HRMS_PAGE_LAYOUTS.home as LayoutSection[],
  hr: HRMS_PAGE_LAYOUTS.hr as LayoutSection[],
  it: HRMS_PAGE_LAYOUTS.it as LayoutSection[],
  finance: SUITE_LAYOUT,
};
