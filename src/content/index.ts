import { aboutDefaults } from "./about";
import { blogDefaults } from "./blog";
import { contactDefaults } from "./contact";
import { crmDefaults, crmLayoutDefaults } from "./crm";
import { homeDefaults } from "./home";
import { pricingDefaults } from "./pricing";

// Every editable page. The key is how the content is stored in content/site.json.
export const defaultContent = {
  home: homeDefaults,
  crm: crmDefaults,
  crmLayout: crmLayoutDefaults,
  pricing: pricingDefaults,
  about: aboutDefaults,
  contact: contactDefaults,
  blog: blogDefaults,
};

export type SiteContent = typeof defaultContent;
export type PageKey = keyof SiteContent;

// How each page appears in the admin dashboard, and which public pages it affects.
export const pageInfo: Record<PageKey, { title: string; description: string; paths: string[] }> = {
  home: { title: "Home page", description: "The main Uptrix page: hero slides, HRMS and CRM sections, FAQ and footer.", paths: ["/"] },
  crm: { title: "CRM landing page", description: "The Uptrix Pulse CRM page: hero, features, workflow, FAQ and demo form.", paths: ["/crm"] },
  crmLayout: {
    title: "CRM menu & footer",
    description: "The top menu and footer shared by every CRM page (landing, pricing, about, contact).",
    paths: ["/crm", "/crm/pricing", "/crm/about", "/crm/contact"],
  },
  pricing: { title: "Pricing page", description: "Plans, prices, the comparison table and pricing FAQ. Prices also show on the CRM landing page.", paths: ["/crm/pricing", "/crm"] },
  about: { title: "About us page", description: "Your story, beliefs, roadmap and partners.", paths: ["/crm/about"] },
  contact: { title: "Contact us page", description: "Contact details, quick links and the contact form text.", paths: ["/crm/contact"] },
  blog: { title: "Blog page text", description: "Headings, labels and the call to action around your blog posts. Write the posts in Blog posts.", paths: ["/blog"] },
};

export const pageKeys = Object.keys(defaultContent) as PageKey[];

export function isPageKey(k: string): k is PageKey {
  return (pageKeys as string[]).includes(k);
}
