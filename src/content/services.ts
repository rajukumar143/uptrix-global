// Copy for the Services page at /services (main site). Taken from the services design.
// Placeholders to replace before launch: [YOUR EMAIL], [YOUR PHONE], [YOUR OFFICE ADDRESS],
// the [TIMELINE] values, and the [ADD …] answers in the FAQ.

export const SERVICES_PATH = "/services";

export const SERVICES_SEO = {
  title: "Software Services | Custom Apps, Integrations, Modernisation and Support | Uptrix",
  description:
    "Custom web applications, CRM/HRMS integrations, legacy application modernisation, and software maintenance and support from the Uptrix team.",
};

export type ServiceKey = "web" | "integrations" | "modernisation" | "support";

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  chip: string;
  icon: string;
  bg: string;
  fg: string;
  description: string;
  included: string[];
  fit: string[];
  plan: { step: string; text: string; when: string }[];
};

export const SERVICES: Service[] = [
  {
    key: "web",
    title: "Custom web applications",
    short: "Portals, dashboards and internal tools",
    chip: "Web apps",
    icon: "M4 4h16v16H4zM4 9h16M10 13l-2 2 2 2M14 13l2 2-2 2",
    bg: "#EEF2FF",
    fg: "#4f46e5",
    description:
      "Web apps designed and built for your exact workflow — from employee and customer portals to approval tools and reporting dashboards.",
    included: ["Requirements and UX design", "Responsive web front end", "Secure back end, APIs and database", "Cloud deployment and handover"],
    fit: [
      "Spreadsheets and email are running a key process",
      "Off-the-shelf tools don’t match how your team works",
      "You need a customer or employee portal with your branding",
    ],
    plan: [
      { step: "Discovery", text: "Goals, users and must-have features", when: "Week 1–2" },
      { step: "Design", text: "Clickable screens you can review", when: "Week 2–4" },
      { step: "Build", text: "Fortnightly releases you can test", when: "[TIMELINE]" },
      { step: "Launch", text: "Go-live, training and handover", when: "Final week" },
    ],
  },
  {
    key: "integrations",
    title: "CRM/HRMS integrations",
    short: "Connect the tools your teams already use",
    chip: "Integrations",
    icon: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8",
    bg: "#E8F1FF",
    fg: "#1f5fd6",
    description:
      "Connect your CRM, HRMS, payroll and accounting systems so data moves automatically — no more copying between screens.",
    included: ["CRM ↔ HRMS data sync", "Payroll and accounting connectors", "Single sign-on and user provisioning", "Error alerts and sync logs"],
    fit: [
      "Teams re-enter the same data in two or more systems",
      "New hires need accounts created by hand in every tool",
      "Reports don’t match because systems are out of sync",
    ],
    plan: [
      { step: "System audit", text: "Map each tool, field and data owner", when: "Week 1" },
      { step: "Data mapping", text: "Agree what syncs, when and which way", when: "Week 2" },
      { step: "Build & test", text: "Connectors tested on sample data", when: "[TIMELINE]" },
      { step: "Go live", text: "Monitoring and alerts switched on", when: "Final week" },
    ],
  },
  {
    key: "modernisation",
    title: "Legacy application modernisation",
    short: "Move older systems to modern tech",
    chip: "Modernisation",
    icon: "M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M3 21v-5h5",
    bg: "#E6F6F6",
    fg: "#0f8b8d",
    description:
      "Rebuild or migrate ageing desktop and on-premise apps to secure, cloud-ready web software — step by step, without stopping your business.",
    included: ["Code and architecture assessment", "Phased migration plan", "Data migration and validation", "Modern, mobile-friendly interface"],
    fit: [
      "Your system is hard to change and few people understand it",
      "It only runs on old servers or desktops",
      "Security updates or support for it have stopped",
    ],
    plan: [
      { step: "Assessment", text: "Review code, data and dependencies", when: "Week 1–3" },
      { step: "Roadmap", text: "Choose rebuild, refactor or move", when: "Week 3–4" },
      { step: "Migrate", text: "Module by module, old and new side by side", when: "[TIMELINE]" },
      { step: "Retire", text: "Final data check, old system switched off", when: "Final phase" },
    ],
  },
  {
    key: "support",
    title: "Software maintenance and support",
    short: "Keep your software secure and running",
    chip: "Support",
    icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    bg: "#FFF4E5",
    fg: "#c2410c",
    description:
      "Ongoing care for the software you rely on — bug fixes, security updates, performance tuning and small improvements, under a clear support plan.",
    included: ["Bug fixes and security patches", "Uptime and performance monitoring", "Small enhancements each month", "Agreed response times"],
    fit: [
      "Your original developer is no longer available",
      "Issues pile up with nobody owning them",
      "You want predictable monthly costs for upkeep",
    ],
    plan: [
      { step: "Onboarding", text: "Code access, docs and a health check", when: "Week 1" },
      { step: "Stabilise", text: "Fix urgent bugs and security gaps", when: "Month 1" },
      { step: "Monitor", text: "Alerts, backups and monthly reports", when: "Ongoing" },
      { step: "Improve", text: "Planned enhancements each month", when: "Ongoing" },
    ],
  },
];

export const PROCESS = [
  { title: "Discover", text: "A short call to understand your goals, users, current tools and constraints.", icon: "M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16M21 21l-4.3-4.3" },
  { title: "Plan", text: "A written scope, timeline and estimate — agreed before any work starts.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8" },
  { title: "Build", text: "Regular releases you can see and test, with one point of contact throughout.", icon: "M16 18l6-6-6-6M8 6l-6 6 6 6" },
  { title: "Support", text: "Launch, training and handover — then ongoing care if you want it.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
];

export const WHY = [
  { title: "HR & payroll know-how", text: "We already build HR, IT and Finance software, so we understand your data.", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { title: "Clear scope and pricing", text: "You see the plan and estimate in writing before we begin.", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { title: "You own the code", text: "Source code, documentation and access are handed over to you.", icon: "M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4" },
  { title: "Works with Uptrix", text: "Custom apps can plug straight into your Uptrix suites if you use them.", icon: "M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" },
];

export const FAQ = [
  { q: "Do I need to use Uptrix to work with you?", a: "No. Our services work with any software you already use. If you do use Uptrix, we can connect your custom work to it directly." },
  { q: "Which CRM and HRMS tools can you integrate?", a: "Most tools that offer an API or data export. Tell us which systems you use and we’ll confirm what’s possible in the first call." },
  { q: "How long does a typical project take?", a: "It depends on scope. After the discovery call you’ll get a written timeline for your project. [ADD TYPICAL TIMELINES]" },
  { q: "How do you price projects?", a: "Fixed-price for well-defined projects, or a monthly plan for ongoing support. [ADD PRICING DETAILS]" },
  { q: "Can you take over software another team built?", a: "Yes. We start with a code and health review, then propose a support plan or a modernisation roadmap." },
];

export const ENQUIRY_CHIPS = SERVICES.map((s) => ({ key: s.key, label: s.chip, title: s.title }));
