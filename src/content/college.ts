// Default text for the college / education page. Everything here can be edited in the admin dashboard.
export const collegeDefaults = {
  seo: {
    pageTitle: "College CRM & ERP Operating System | Uptrix",
    metaDescription:
      "Run your entire education business from one powerful platform. Manage leads, admissions, students, academics, fees, communication, staff and operations.",
  },
  hero: {
    eyebrow: "EDUCATION CRM + ERP",
    headingStart: "The Intelligent AI-powered CRM",
    headingHighlight: "Platform for Education Businesses",
    headingEnd: "",
    body: "Manage leads, admissions, students, academics, fees, communication, staff and operations — all from one connected system.",
    primaryButtonLabel: "Book a Demo",
    primaryButtonLink: "#demo",
    secondaryButtonLabel: "See How It Works",
    secondaryButtonLink: "#how-it-works",
  },
  trustBar: {
    heading: "Trusted by education businesses across India",
    clientNames: ["Nexora", "Vistara", "BrightPath", "Kaveri Foods", "Sarthi", "Indus Fintech", "Tarang", "Meridian", "Orbit", "Saffron Labs"],
  },
  stats: [
    { value: "3x", label: "Faster admissions" },
    { value: "40%", label: "Lower admin effort" },
    { value: "99.9%", label: "System uptime" },
  ],
  featureHighlights: [
    { title: "Admissions pipeline", body: "Track every enquiry, follow-up and conversion from one dashboard." },
    { title: "Student 360", body: "See academic, fee and communication history for every student in one place." },
    { title: "Operations control", body: "Keep staff, attendance, finance and compliance connected across the campus." },
  ],
};

export type CollegeContent = typeof collegeDefaults;
