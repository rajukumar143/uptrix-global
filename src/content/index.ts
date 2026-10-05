import { aboutDefaults } from "./about";
import { blogDefaults } from "./blog";
import { contactDefaults } from "./contact";
import { crmDefaults, crmLayoutDefaults } from "./crm";
import { headerDefaults } from "./header";
import { homeDefaults } from "./home";
import { edutechDefaults, realEstateDefaults } from "./industries";
import { pricingDefaults } from "./pricing";
import { caseStudiesDefaults, videoTestimonialsDefaults } from "./stories";

// Every editable page. The key is how the content is stored in content/site.json.
export const defaultContent = {
  header: headerDefaults,
  home: homeDefaults,
  crm: crmDefaults,
  crmEdutech: edutechDefaults,
  crmRealEstate: realEstateDefaults,
  caseStudies: caseStudiesDefaults,
  videoTestimonials: videoTestimonialsDefaults,
  pricing: pricingDefaults,
  about: aboutDefaults,
  contact: contactDefaults,
  blog: blogDefaults,
  crmLayout: crmLayoutDefaults,
};

export type SiteContent = typeof defaultContent;
export type PageKey = keyof SiteContent;

// How each page appears in the admin dashboard, and which public pages it affects.
export const pageInfo: Record<PageKey, { title: string; description: string; paths: string[] }> = {
  header: {
    title: "Top menu",
    description: "The menu at the top of every page: Home, the Products drop-down (CRM, EduTech, Real Estate, HRMS), other links and the demo button.",
    paths: ["/"],
  },
  home: { title: "Home page", description: "The main Uptrix page: hero slides, HRMS and CRM sections, FAQ and footer.", paths: ["/"] },
  crm: { title: "CRM landing page", description: "The Uptrix Pulse CRM page: hero, features, workflow, FAQ and demo form.", paths: ["/crm"] },
  crmEdutech: { title: "EduTech CRM page", description: "The CRM page for schools, colleges and coaching institutes.", paths: ["/crm/edutech"] },
  crmRealEstate: { title: "Real Estate CRM page", description: "The CRM page for builders, brokers and property teams.", paths: ["/crm/real-estate"] },
  caseStudies: {
    title: "Case studies",
    description: "Customer stories with results. Each story gets its own page. Turn off \"Is example\" once a story is about a real customer.",
    paths: ["/case-studies"],
  },
  videoTestimonials: {
    title: "Video testimonials",
    description: "Paste YouTube links of customer videos. Videos without a link stay hidden.",
    paths: ["/video-testimonials"],
  },
  pricing: { title: "Pricing page", description: "Plans, prices, the comparison table and pricing FAQ. Prices also show on the CRM landing page.", paths: ["/crm/pricing", "/crm"] },
  about: { title: "About us page", description: "Your story, beliefs, roadmap and partners.", paths: ["/crm/about"] },
  contact: { title: "Contact us page", description: "Contact details, quick links and the contact form text.", paths: ["/crm/contact"] },
  blog: { title: "Blog page text", description: "Headings, labels and the call to action around your blog posts. Write the posts in Blog posts.", paths: ["/blog"] },
  crmLayout: {
    title: "Footer (CRM, blog & stories)",
    description: "The footer on the CRM pages, blog, case studies and video testimonials. The home page footer is edited in Home page.",
    paths: ["/crm", "/blog", "/case-studies"],
  },
};

export const pageKeys = Object.keys(defaultContent) as PageKey[];

export function isPageKey(k: string): k is PageKey {
  return (pageKeys as string[]).includes(k);
}
