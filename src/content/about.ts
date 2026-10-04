// Default text for the About us page (/crm/about).
export const aboutDefaults = {
  seo: {
    pageTitle: "About Us | Uptrix Pulse CRM",
    metaDescription:
      "Uptrix builds Pulse, the CRM for admissions-led businesses. Learn what we believe, who we build for and what is coming next on the Pulse roadmap.",
  },
  hero: {
    eyebrow: "About us",
    heading: "We help admissions teams turn enquiries into enrollments.",
    paragraphs: [
      "Uptrix builds software for growing Indian businesses. Pulse is our CRM for admissions-led teams: institutes, academies and organizations where every enquiry is a student who could enroll.",
      "We saw the same problem again and again. Leads lived in spreadsheets, WhatsApp groups and personal phones, and good enquiries went cold because nobody owned the next step. Pulse puts leads, counselors, follow-ups, admissions, fees and branches into one connected system.",
    ],
  },
  beliefs: {
    eyebrow: "What we believe",
    heading: "Four ideas behind everything we build.",
    items: [
      { title: "One record per lead", body: "Every call, message, note and payment belongs on the same lead, not spread across sheets and phones." },
      { title: "Follow-ups should not rely on memory", body: "The system should tell counselors who needs attention next, so no enquiry waits." },
      { title: "Leaders should see without asking", body: "Branch, counselor and admission numbers should be one click away, not a weekly report." },
      { title: "Switching should be painless", body: "Moving your existing data into Pulse is work we do with you, not something you do alone." },
    ],
  },
  audiences: {
    eyebrow: "Who we build for",
    heading: "Teams that live and breathe admissions.",
    items: [
      { title: "Education & coaching", body: "Institutes managing enquiries, counseling and enrollments." },
      { title: "Admissions teams", body: "Counselor teams that need a shared queue and clear ownership." },
      { title: "Multi-branch organizations", body: "Leadership that needs one view across every location." },
      { title: "Growing sales teams", body: "Teams outgrowing spreadsheets as lead volume grows." },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    heading: "What we are building next.",
    body: "Pulse keeps growing with the teams that use it. These are the improvements on our roadmap.",
    badge: "Coming soon",
    items: [
      { title: "WhatsApp and email automation", body: "Automated message sequences across the lead journey." },
      { title: "Lead bookmarks with ribbons", body: "Mark priority leads so they stand out in every list." },
      { title: "Batch management upgrades", body: "More control over courses, batches and enrolled students." },
      { title: "Analytics", body: "Reports on sources, counselors, conversions and costs." },
      { title: "Clickable insight charts", body: "Charts that open the underlying data when you click them." },
      { title: "Telephone integration", body: "Make and log calls from inside the lead record." },
      { title: "Lead score", body: "A score that shows which leads are most likely to enroll." },
      { title: "AI call analysis", body: "Summaries and insights from counselor calls." },
    ],
  },
  family: {
    eyebrow: "The Uptrix family",
    heading: "Pulse CRM sits alongside Uptrix HRMS.",
    body: "Uptrix makes tools for running and growing a business: Pulse for leads and admissions, and Uptrix HRMS for your people, payroll and attendance.",
    linkLabel: "Visit Uptrix →",
    linkLink: "/",
  },
  partners: {
    eyebrow: "Our trusted partners",
    names: ["Whitescholars", "Catalyst", "Growth Intellilabs"],
  },
  cta: {
    heading: "Want to see Pulse with your process?",
    body: "Book a walkthrough or ask us anything.",
    primaryButtonLabel: "Book a Demo",
    primaryButtonLink: "/crm#demo",
    secondaryButtonLabel: "Contact us",
    secondaryButtonLink: "/crm/contact",
  },
};

export type AboutContent = typeof aboutDefaults;
