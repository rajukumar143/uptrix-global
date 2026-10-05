// Case studies (/case-studies) and video testimonials (/video-testimonials)

export const caseStudiesDefaults = {
  page: {
    pageTitle: "Customer Case Studies | Uptrix CRM & HRMS",
    metaDescription: "How education, real estate and growing Indian businesses use Uptrix CRM and HRMS to win more customers and run their teams.",
    eyebrow: "Case studies",
    heading: "Results our customers can measure",
    intro: "How schools, institutes, builders and growing companies use Uptrix to capture more leads, close more deals and run their teams.",
    readMoreLabel: "Read the story",
    backLabel: "All case studies",
    exampleLabel: "Example",
    exampleNote: "This is an example that shows how teams use Uptrix. Real customer stories are coming soon.",
    challengeHeading: "The challenge",
    solutionHeading: "What changed with Uptrix",
    resultsHeading: "The results",
    videoLabel: "Watch the video",
    ctaHeading: "Want results like these?",
    ctaBody: "Book a free demo and we'll show you how Uptrix fits the way your team works.",
    ctaButtonLabel: "Book a free demo",
    ctaButtonLink: "/crm#demo",
  },
  // Turn off "isExample" once a story is about a real customer. The slug is the web address: /case-studies/<slug>
  studies: [
    {
      slug: "coaching-institute-admissions",
      isExample: true,
      client: "Multi-branch coaching institute",
      industry: "Education",
      product: "EduTech CRM",
      location: "Hyderabad",
      title: "How a coaching institute stopped losing enquiries across 4 branches",
      summary: "Enquiries from ads, the website and walk-ins now reach a counsellor within minutes, and management sees admissions by branch every day.",
      metrics: [
        { value: "2x", label: "faster first response" },
        { value: "100%", label: "of enquiries assigned" },
        { value: "1", label: "dashboard for 4 branches" },
      ],
      challenge:
        "Enquiries arrived from Meta ads, the website, JustDial and walk-ins, and were shared between counsellors on Excel sheets and WhatsApp. Many were never called back, and the owners couldn't tell which branch or campaign brought admissions.",
      solution:
        "With Uptrix EduTech CRM every enquiry lands in one list and is assigned to a counsellor by course and branch. A WhatsApp with the brochure goes out automatically, and reminders make sure demo classes and call-backs happen on time.",
      results: [
        { text: "Every enquiry has an owner within seconds of arriving" },
        { text: "Counsellors follow a clear daily list of calls and visits" },
        { text: "Management compares branches and campaigns in one report" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "real-estate-site-visits",
      isExample: true,
      client: "Residential developer",
      industry: "Real estate",
      product: "Real Estate CRM",
      location: "Bengaluru",
      title: "How a developer turned more portal leads into site visits",
      summary: "Leads from property portals are called within minutes, and site visits are booked and reminded automatically.",
      metrics: [
        { value: "5 min", label: "average time to first call" },
        { value: "3", label: "projects in one pipeline" },
        { value: "0", label: "leads lost in spreadsheets" },
      ],
      challenge:
        "Leads from 99acres, MagicBricks and Meta ads reached the sales team by email hours later. Site visits were booked on calls and often forgotten, and channel partners sent the same buyers twice.",
      solution:
        "Uptrix Real Estate CRM pulls in every portal and ad lead, assigns it by project and alerts the executive straight away. Site visits are scheduled with WhatsApp reminders, and partners submit leads through their own login.",
      results: [
        { text: "Portal leads reach a sales executive within minutes" },
        { text: "Buyers get the location pin and a reminder before every visit" },
        { text: "Duplicate partner leads are caught automatically" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "hrms-payroll-attendance",
      isExample: true,
      client: "Growing services company",
      industry: "IT services",
      product: "Uptrix HRMS",
      location: "Pune",
      title: "How a 200-person company cut payroll from days to hours",
      summary: "Attendance, leave and payroll now run in one system, and employees handle their own requests from their phone.",
      metrics: [
        { value: "Hours", label: "not days, to run payroll" },
        { value: "200", label: "employees on self-service" },
        { value: "1", label: "system for HR and payroll" },
      ],
      challenge:
        "HR collected attendance from biometric exports, leave from emails and salary changes from spreadsheets. Every month-end meant days of manual checks and corrections.",
      solution:
        "Uptrix HRMS brings attendance, leave and payroll together. Employees apply for leave and download payslips themselves, and payroll uses the approved attendance automatically.",
      results: [
        { text: "Payroll runs from approved attendance without re-typing" },
        { text: "Employees apply for leave and download payslips on mobile" },
        { text: "HR spends month-end on people, not spreadsheets" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
  ],
};

export type CaseStudiesContent = typeof caseStudiesDefaults;
export type CaseStudy = CaseStudiesContent["studies"][number];

export const videoTestimonialsDefaults = {
  page: {
    pageTitle: "Video Testimonials | Uptrix Customers in Their Own Words",
    metaDescription: "Watch Uptrix customers explain how Uptrix CRM and HRMS help them win more customers and run their teams.",
    eyebrow: "Video testimonials",
    heading: "Hear it from our customers",
    intro: "Business owners, admissions heads and sales managers explain what changed after they moved to Uptrix.",
    playLabel: "Play video",
    emptyHeading: "Customer videos are coming soon",
    emptyBody: "We're recording stories with our customers. Meanwhile, read how teams use Uptrix in our case studies.",
    emptyButtonLabel: "Read case studies",
    emptyButtonLink: "/case-studies",
    ctaHeading: "Want to be our next success story?",
    ctaBody: "Book a free demo and see Uptrix with your own data.",
    ctaButtonLabel: "Book a free demo",
    ctaButtonLink: "/crm#demo",
  },
  // Paste a YouTube link (normal, youtu.be or Shorts). Videos without a link stay hidden from the website.
  videos: [
    { youtubeLink: "", name: "Customer name", role: "Director", company: "Company name", product: "EduTech CRM", quote: "A short line from the video." },
    { youtubeLink: "", name: "Customer name", role: "Sales head", company: "Company name", product: "Real Estate CRM", quote: "A short line from the video." },
    { youtubeLink: "", name: "Customer name", role: "HR manager", company: "Company name", product: "Uptrix HRMS", quote: "A short line from the video." },
  ],
};

export type VideoTestimonialsContent = typeof videoTestimonialsDefaults;

/** The YouTube video ID from any common YouTube link, or "" if it isn't one. */
export function youtubeId(link: string) {
  const m = link.trim().match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

/** The web address of a case study: its slug, or its title when the slug is empty. */
export function studySlug(s: Pick<CaseStudy, "slug" | "title">) {
  return (s.slug || s.title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Case studies with a usable address; if two share one, the first wins. */
export function liveStudies(studies: CaseStudy[]) {
  const seen = new Set<string>();
  return studies
    .map((s) => ({ ...s, slug: studySlug(s) }))
    .filter((s) => s.title && s.slug && !seen.has(s.slug) && seen.add(s.slug));
}
