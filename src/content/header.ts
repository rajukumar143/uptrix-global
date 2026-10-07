// The top menu shared by every public page
export const headerDefaults = {
  homeLabel: "Home",
  homeLink: "/",
  productsLabel: "Products",
  // Each product appears in the Products drop-down. Sub links show underneath it (e.g. CRM → EduTech CRM).
  products: [
    {
      label: "Uptrix CRM",
      link: "/crm",
      description: "Capture every lead and automate follow-ups",
      subLinks: [
        { label: "EduTech CRM", link: "/crm/edutech", description: "Schools, coaching and ed-tech" },
        { label: "College ERP & CRM", link: "/college", description: "Higher education, colleges & universities" },
        { label: "Real Estate CRM", link: "/crm/real-estate", description: "Builders, brokers and property teams" },
      ],
    },
    {
      label: "Uptrix HRMS",
      link: "/#hrms",
      description: "Payroll, attendance, leave and people records",
      subLinks: [],
    },
  ],
  menuLinks: [
    { label: "Blog", link: "/blog" },
    { label: "Contact", link: "/crm/contact" },
  ],
  loginLabel: "Login",
  loginLink: "/crm#demo",
  buttonLabel: "Book a Demo",
  buttonLink: "/crm#demo",
};

export type HeaderContent = typeof headerDefaults;
