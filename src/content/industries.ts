// Industry pages under Products → CRM: /crm/edutech and /crm/real-estate. Both share one layout.
export const edutechDefaults = {
  seo: {
    pageTitle: "EduTech CRM for Schools, Colleges & Coaching Institutes | Uptrix",
    metaDescription:
      "Uptrix EduTech CRM captures every enquiry, automates WhatsApp and call follow-ups, tracks counsellors and turns more enquiries into admissions across every branch.",
  },
  hero: {
    eyebrow: "EduTech CRM",
    heading: "Turn every enquiry into an admission",
    body: "One CRM for schools, colleges, coaching institutes and ed-tech teams. Capture enquiries from every source, follow up on WhatsApp in minutes and see exactly where each student is in the admission journey.",
    primaryButtonLabel: "Book a Demo",
    primaryButtonLink: "/crm#demo",
    secondaryButtonLabel: "See pricing",
    secondaryButtonLink: "/crm/pricing",
    points: ["Website, Meta, Google and walk-in enquiries", "WhatsApp, call and email follow-ups", "Counsellor and branch reports"],
  },
  pipeline: {
    title: "Admissions pipeline",
    stages: [
      { name: "New enquiry", count: "128" },
      { name: "Counselling", count: "64" },
      { name: "Campus visit", count: "31" },
      { name: "Application", count: "22" },
      { name: "Enrolled", count: "18" },
    ],
  },
  problems: {
    eyebrow: "The problem",
    heading: "Admissions slip away in spreadsheets and WhatsApp chats",
    items: [
      { title: "Enquiries go cold", body: "Leads from ads, the website and walk-ins sit unanswered for hours. By the time someone calls, the parent has chosen another institute." },
      { title: "No one owns the follow-up", body: "Counsellors share Excel sheets, forget call-backs and duplicate each other's work." },
      { title: "You can't see what works", body: "You spend on ads every month but can't tell which campaign actually brings admissions." },
    ],
  },
  features: {
    eyebrow: "Built for admissions",
    heading: "Everything your admissions team needs, in one place",
    items: [
      { title: "Capture every enquiry", body: "Website forms, Meta and Google ads, JustDial, missed calls and walk-ins land in one list automatically." },
      { title: "Auto-assign to counsellors", body: "Share leads by course, branch or language, so every enquiry has an owner within seconds." },
      { title: "WhatsApp follow-ups", body: "Send brochures, fee details and reminders on WhatsApp from the CRM, with every reply saved to the student's record." },
      { title: "Campus visits and demos", body: "Book visits and demo classes, send reminders and record the outcome in one click." },
      { title: "Fees and applications", body: "Track application status, documents and fee payments until the student is enrolled." },
      { title: "Branch and counsellor reports", body: "See enquiries, conversions and cost per admission for every counsellor, course and branch." },
    ],
  },
  journey: {
    eyebrow: "How it works",
    heading: "From first enquiry to enrolment",
    steps: [
      { title: "Enquiry arrives", body: "The lead is captured with its source and course interest." },
      { title: "Counsellor assigned", body: "The right counsellor is notified and the first WhatsApp goes out automatically." },
      { title: "Follow-ups on schedule", body: "Reminders make sure every call-back and visit happens on time." },
      { title: "Admission confirmed", body: "Fees, documents and the enrolment are tracked to the end." },
    ],
  },
  stories: {
    eyebrow: "Customer stories",
    heading: "See how institutes grow admissions with Uptrix",
    intro: "Watch customers explain the difference and read how teams like yours use Uptrix.",
    // Shows case studies and videos whose product contains this word. Leave empty to show all.
    productFilter: "EduTech",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Questions from education teams",
    questions: [
      { question: "Can it handle multiple branches?", answer: "Yes. Each branch has its own leads, counsellors and reports, and management sees everything in one dashboard." },
      { question: "Does it work with WhatsApp?", answer: "Yes. Send and receive WhatsApp messages from the CRM, use templates for brochures and fee details, and keep every chat on the student's record." },
      { question: "Can we import our existing enquiries?", answer: "Yes. Our team helps you import enquiries from Excel or your old CRM during onboarding at no extra cost." },
      { question: "How long does setup take?", answer: "Most institutes are live within a week, including lead sources, counsellors and WhatsApp templates." },
    ],
  },
  cta: {
    heading: "Ready for your best admission season?",
    body: "See Uptrix EduTech CRM with your own courses and branches in a free 30-minute demo.",
    buttonLabel: "Book a free demo",
    buttonLink: "/crm#demo",
  },
};

export type IndustryContent = typeof edutechDefaults;

export const realEstateDefaults: IndustryContent = {
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
