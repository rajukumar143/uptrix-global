// Copy for the three suite pages: /hr-suite, /it-suite and /finance-suite.
// Figures and module text come from the suite designs. Items marked "written for the page" were not in
// the designs and should be checked against the product before launch.

export type Tone = "ok" | "wait" | "info" | "new";
export type Row = { a: string; b: string; t: string; tone: Tone };
export type Stat = { label: string; value: string; delta: string; up: boolean; series: number[] };
export type Mod = { title: string; short: string; text: string; points: string[]; screen: string; icon: string; rows: Row[] };
export type Step = { time: string; title: string; text: string; rows: Row[] };
export type Connection = { title: string; text: string; href: string; icon: string };
export type SuiteKey = "hr" | "it" | "finance";

export type Suite = {
  key: SuiteKey;
  name: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  lead: string;
  accent: string; // text and icon colour
  soft: string; // tinted background
  heroBg: string;
  icon: string;
  photo: { src: string; alt: string };
  statsCaption: string;
  modulesTitle: string;
  modulesLead: string;
  walkthroughTitle: string;
  minutesSaved: number;
  estimatorBasis: string;
  connections: Connection[];
  stats: Stat[];
  mods: Mod[];
  steps: Step[];
};

// Path data for the line icons, taken from the suite designs.
export const ICON = {
  people: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
  clock: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M12 6v6l4 2",
  calendar: "M3 6h18v15H3zM16 3v6M8 3v6M3 11h18",
  shift: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
  trend: "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8",
  gift: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8M19 8v6M22 11h-6",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
  ticket: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4zM13 5v14",
  laptop: "M4 5h16v11H4zM2 20h20",
  exit: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  receipt: "M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2zM8 8h8M8 12h8M8 16h5",
  wallet: "M3 7h18v13H3zM16 13h2M3 7l3-4h12l3 4",
  building: "M3 21h18M6 21V3h12v18M14 12h.01",
} as const;

// Company size options for the time-back estimate, as shown in the PDF.
export const SIZE_BANDS = [
  { label: "50 people", people: 50 },
  { label: "100 people", people: 100 },
  { label: "250 people", people: 250 },
  { label: "500 people", people: 500 },
];

