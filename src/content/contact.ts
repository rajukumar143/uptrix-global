// Default text for the Contact us page (/crm/contact).
export const contactDefaults = {
  seo: {
    pageTitle: "Contact Us | Uptrix Pulse CRM",
    metaDescription: "Talk to the Uptrix team about Pulse CRM: book a demo, ask about plans and pricing, or get help moving your data.",
  },
  hero: {
    eyebrow: "Contact us",
    heading: "Let's talk about your admissions.",
    body: "Questions about Pulse, plans or moving your data? Send us a message and our team will get back to you.",
  },
  details: {
    emailLabel: "Email",
    email: "hello@uptrixglobal.com",
    phoneLabel: "Phone",
    phone: "+91 00000 00000",
    officeLabel: "Office",
    office: "Office address, City, State, PIN",
  },
  cards: [
    { title: "See a demo", body: "A walkthrough of Pulse built around your lead journey.", linkLabel: "Book a demo →", link: "/crm#demo" },
    { title: "Compare plans", body: "Basic, Standard and Enterprise, feature by feature.", linkLabel: "View pricing →", link: "/crm/pricing" },
  ],
  form: {
    heading: "Send us a message",
    nameLabel: "Full name",
    emailLabel: "Work email",
    phoneLabel: "Phone",
    companyLabel: "Company",
    optionalLabel: "Optional",
    topicLabel: "What can we help with?",
    topics: [
      "Book a demo",
      "Basic plan",
      "Standard plan",
      "Enterprise plan",
      "Not sure which plan fits",
      "Migration from another CRM",
      "Support for an existing account",
      "Something else",
    ],
    messageLabel: "Message",
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    privacyNote: "We only use these details to reply to your message.",
    errorSummary: "Please check the highlighted fields.",
    nameError: "Please enter your name",
    emailError: "Enter a valid email",
    phoneError: "Enter a valid phone number",
    messageError: "Tell us a little about what you need",
    successHeading: "Thanks, {name}. We have your message.",
    successBody: "Our team will get back to you at {email}.",
    resetLabel: "Send another message",
  },
};

export type ContactContent = typeof contactDefaults;
