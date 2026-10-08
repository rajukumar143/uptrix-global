// Industry page under Products → CRM: /crm/real-estate
export const realEstateDefaults = {
  seo: {
    pageTitle: "Real Estate CRM for Builders, Brokers & Channel Partners | Uptrix",
    metaDescription:
      "Uptrix Real Estate CRM captures leads from property portals and ads, schedules site visits, tracks bookings and gives sales managers a live view of every project.",
  },
  hero: {
    eyebrow: "Real Estate CRM",
    heading: "Close more bookings from every property lead",
    body: "One CRM for builders, developers, brokers and channel partners. Pull in leads from portals and ads, follow up instantly, schedule site visits and track every deal until registration.",
    primaryButtonLabel: "Book a Demo",
    primaryButtonLink: "/crm#demo",
    secondaryButtonLabel: "See pricing",
    secondaryButtonLink: "/crm/pricing",
    points: ["99acres, MagicBricks, Housing and Meta leads", "Site visit scheduling and reminders", "Project, team and channel-partner reports"],
  },
  pipeline: {
    title: "Sales pipeline",
    stages: [
      { name: "New lead", count: "240" },
      { name: "Qualified", count: "112" },
      { name: "Site visit", count: "46" },
      { name: "Negotiation", count: "19" },
      { name: "Booked", count: "11" },
    ],
  },
  problems: {
    eyebrow: "The problem",
    heading: "Expensive leads are lost before the site visit",
    items: [
      { title: "Slow first response", body: "Portal leads call the next builder if no one calls back within minutes, and most teams take hours." },
      { title: "Site visits fall through", body: "Visits are booked on phone calls and forgotten, with no reminders for the buyer or the sales executive." },
      { title: "No view across projects", body: "Managers can't see which project, source or channel partner brings bookings, so marketing budgets are guesswork." },
    ],
  },
  features: {
    eyebrow: "Built for property sales",
    heading: "Everything your sales team needs to close faster",
    items: [
      { title: "Portal and ad leads", body: "Leads from 99acres, MagicBricks, Housing.com, Meta, Google and your website arrive in one list automatically." },
      { title: "Instant assignment", body: "Round-robin leads by project, location or budget so every buyer gets a call within minutes." },
      { title: "Site visit scheduler", body: "Book visits, send WhatsApp reminders with the location pin and record feedback after the visit." },
      { title: "Inventory and bookings", body: "Track units, tower and floor preferences, booking amounts and payment milestones." },
      { title: "Channel partners", body: "Give brokers their own login to submit leads and track their commissions." },
      { title: "Project-wise reports", body: "See cost per lead, visits and bookings for every project, source and sales executive." },
    ],
  },
  journey: {
    eyebrow: "How it works",
    heading: "From first enquiry to registration",
    steps: [
      { title: "Lead captured", body: "Every portal, ad and walk-in lead lands with its project and budget." },
      { title: "Called in minutes", body: "The right executive is alerted and a WhatsApp with the brochure goes out automatically." },
      { title: "Site visit done", body: "Visits are scheduled, reminded and followed up with the buyer's feedback." },
      { title: "Booking closed", body: "Negotiation, booking amount and payments are tracked until registration." },
    ],
  },
  stories: {
    eyebrow: "Customer stories",
    heading: "See how property teams sell more with Uptrix",
    intro: "Watch customers explain the difference and read how teams like yours use Uptrix.",
    // Shows case studies and videos whose product contains this word. Leave empty to show all.
    productFilter: "Real Estate",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Questions from real estate teams",
    questions: [
      { question: "Which property portals can it connect to?", answer: "99acres, MagicBricks, Housing.com, NoBroker, Meta lead ads, Google ads and your website forms. Ask us about any other source." },
      { question: "Can channel partners use it?", answer: "Yes. Partners get their own login to submit leads, avoid duplicates and see the status of their buyers." },
      { question: "Does it work for multiple projects?", answer: "Yes. Each project has its own pipeline, team and reports, and management sees everything together." },
      { question: "Can my team use it on mobile?", answer: "Yes. Sales executives can call, WhatsApp, log site visits and update deals from their phone." },
    ],
  },
  cta: {
    heading: "Ready to turn more leads into bookings?",
    body: "See Uptrix Real Estate CRM with your own projects in a free 30-minute demo.",
    buttonLabel: "Book a free demo",
    buttonLink: "/crm#demo",
  },
};

export type IndustryContent = typeof realEstateDefaults;
