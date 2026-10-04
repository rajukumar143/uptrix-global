// Default text for the pricing page (/crm/pricing). The plans are also shown on the CRM landing page.
// Source: "Uptrix CRM" pricing sheet.
const yes = { included: true, note: "" };
const no = { included: false, note: "" };

export const pricingDefaults = {
  seo: {
    pageTitle: "Pricing | Uptrix Pulse CRM",
    metaDescription:
      "Uptrix Pulse CRM plans: Basic at ₹399, Standard at ₹999 and Enterprise at ₹1,499 per user. Compare features and pick the plan for your team.",
  },
  hero: {
    eyebrow: "Pricing",
    heading: "Simple plans, priced per user.",
    body: "Start with the essentials or get the full Pulse CRM with integrations, SSO and your own branding.",
  },
  currencySymbol: "₹",
  priceSuffix: "per user",
  includedHeading: "What's included",
  plans: [
    {
      name: "Basic",
      description: "The essentials to start managing leads, fees and batches.",
      price: 399,
      usersNote: "5 users",
      buttonLabel: "Get Basic",
      buttonLink: "/crm/contact",
      highlight: false,
      features: ["Lead management", "Fee management", "Batch management"],
      technicalHeading: "",
      technicalFeatures: [] as string[],
    },
    {
      name: "Standard",
      description: "For admissions teams that need counselors, attendance and AI help.",
      price: 999,
      usersNote: "5 to 100 users",
      buttonLabel: "Get Standard",
      buttonLink: "/crm/contact",
      highlight: false,
      features: ["Lead management", "Fee management", "Batch management", "Attendance", "Counsellor management", "Manage fields", "AI Assistant"],
      technicalHeading: "",
      technicalFeatures: [] as string[],
    },
    {
      name: "Enterprise",
      description: "Everything in Pulse, with integrations, SSO and your own branding.",
      price: 1499,
      usersNote: "Full Pulse feature set",
      buttonLabel: "Get Enterprise",
      buttonLink: "/crm/contact",
      highlight: true,
      features: [
        "Lead management",
        "Integrations (WhatsApp, SMS, Email)",
        "Call and chat support",
        "Fee management",
        "Counsellor management",
        "Customised field values",
        "Employee work logs",
        "Employee attendance",
        "Bookmark lead",
        "Batch management",
        "Migration assistance",
        "AI Assistant",
        "SSO login (single sign-on)",
      ],
      technicalHeading: "Technical features",
      technicalFeatures: [
        "Customised logo in the application",
        "Choose your own colours",
        "Domain restrictions",
        "Customised email templates",
        "Flexible third-party integration",
      ],
    },
  ],
  comparison: {
    eyebrow: "Compare plans",
    heading: "Every feature, side by side.",
    featureColumnLabel: "Feature",
    includedText: "Included",
    notIncludedText: "Not included",
    rows: [
      { feature: "Lead management", basic: yes, standard: yes, enterprise: yes },
      { feature: "Fee management", basic: yes, standard: yes, enterprise: yes },
      { feature: "Batch management", basic: yes, standard: yes, enterprise: yes },
      { feature: "Attendance", basic: no, standard: yes, enterprise: { included: true, note: "Employee attendance" } },
      { feature: "Counsellor management", basic: no, standard: yes, enterprise: yes },
      { feature: "Custom fields", basic: no, standard: { included: true, note: "Manage fields" }, enterprise: { included: true, note: "Customised field values" } },
      { feature: "AI Assistant", basic: no, standard: yes, enterprise: yes },
      { feature: "Integrations (WhatsApp, SMS, Email)", basic: no, standard: no, enterprise: yes },
      { feature: "Call and chat support", basic: no, standard: no, enterprise: yes },
      { feature: "Employee work logs", basic: no, standard: no, enterprise: yes },
      { feature: "Bookmark lead", basic: no, standard: no, enterprise: yes },
      { feature: "Migration assistance", basic: no, standard: no, enterprise: yes },
      { feature: "SSO login (single sign-on)", basic: no, standard: no, enterprise: yes },
      { feature: "Custom logo and colours", basic: no, standard: no, enterprise: yes },
      { feature: "Domain restrictions", basic: no, standard: no, enterprise: yes },
      { feature: "Customised email templates", basic: no, standard: no, enterprise: yes },
      { feature: "Flexible third-party integration", basic: no, standard: no, enterprise: yes },
    ],
  },
  faq: {
    eyebrow: "Pricing FAQ",
    heading: "Questions about plans.",
    prompt: "Need something not listed here?",
    linkLabel: "Contact us.",
    linkLink: "/crm/contact",
    questions: [
      { question: "Do all plans include fee and batch management?", answer: "Yes. Lead management, fee management and batch management are part of every plan, including Basic." },
      { question: "Which plans include the AI Assistant?", answer: "The AI Assistant is included in Standard and Enterprise." },
      { question: "Which plan includes WhatsApp, SMS and email integrations?", answer: "Integrations with WhatsApp, SMS and email are part of the Enterprise plan, along with call and chat support." },
      { question: "Can Pulse use our own logo and colours?", answer: "Yes, on Enterprise. You can add your logo, choose your colours, set domain restrictions and customise email templates." },
      { question: "Is help moving our existing data included?", answer: "Migration assistance is included in the Enterprise plan. If you are on another plan, talk to us about your data and we will advise." },
      { question: "How do I get started?", answer: "Book a demo or send us a message. We will walk you through Pulse and help you choose the right plan." },
    ],
  },
  cta: {
    heading: "Not sure which plan fits?",
    body: "Tell us about your team and we will help you choose.",
    primaryButtonLabel: "Contact us",
    primaryButtonLink: "/crm/contact",
    secondaryButtonLabel: "Book a Demo",
    secondaryButtonLink: "/crm#demo",
  },
};

export type PricingContent = typeof pricingDefaults;
export type Plan = PricingContent["plans"][number];

export function formatPrice(currency: string, n: number) {
  return `${currency}${n.toLocaleString("en-IN")}`;
}
