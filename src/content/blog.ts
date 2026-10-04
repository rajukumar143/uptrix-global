// Default text around the blog (the /blog list page, post pages and the sidebar call to action).
// The posts themselves are written in Admin → Blog posts.
export const blogDefaults = {
  seo: {
    pageTitle: "Blog | Uptrix — CRM, Admissions & HR Insights",
    metaDescription:
      "Guides and ideas on lead management, admissions, follow-ups, CRM and HR for growing Indian businesses, from the Uptrix team.",
  },
  hero: {
    eyebrow: "Blog",
    heading: "Ideas for teams that turn enquiries into enrollments.",
    body: "Practical guides on leads, follow-ups, counselors, admissions and running a growing business.",
  },
  listing: {
    allCategoriesLabel: "All posts",
    readMoreLabel: "Read article →",
    minuteReadLabel: "min read",
    emptyMessage: "New articles are on the way. Check back soon.",
    categoryHeadingPrefix: "Articles about",
  },
  post: {
    breadcrumbHome: "Home",
    breadcrumbBlog: "Blog",
    byLabel: "By",
    updatedLabel: "Updated",
    tableOfContentsLabel: "In this article",
    tagsLabel: "Tags",
    relatedHeading: "Related articles",
    shareLabel: "Share",
  },
  cta: {
    heading: "See Uptrix Pulse with your own process",
    body: "Book a 30-minute walkthrough and see how Pulse turns every lead into an enrollment.",
    buttonLabel: "Book a Demo",
    buttonLink: "/crm#demo",
  },
  organization: {
    name: "Uptrix",
    logoPath: "/logo-dark.png",
  },
};

export type BlogContent = typeof blogDefaults;
