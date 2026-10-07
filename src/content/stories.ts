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
    viewAllLabel: "View all case studies",
    // The pop-up form that opens when a visitor clicks "Read the story". Answers appear in Admin → Leads.
    popupEyebrow: "Free case study",
    popupHeading: "Read the full story",
    popupBody: "Tell us where to reach you and the story opens straight away.",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    emailLabel: "Work email (optional)",
    companyLabel: "Company (optional)",
    submitLabel: "Read the story",
    sendingLabel: "Opening…",
    privacyNote: "We only use this to share relevant Uptrix updates. No spam.",
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
      slug: "test-prep-multi-branch-growth",
      isExample: true,
      client: "Premier Test Prep Academy",
      industry: "Education",
      product: "EduTech CRM",
      location: "Delhi NCR",
      title: "How a test prep academy scaled to 8 centers with automated counseling",
      summary: "Counselors respond to student inquiries in under 60 seconds and auto-schedule demo lectures across multiple cities.",
      metrics: [
        { value: "3.2x", label: "enrollment increase" },
        { value: "94%", label: "on-time follow-ups" },
        { value: "8", label: "centers unified" },
      ],
      challenge:
        "High digital ad spend delivered thousands of inquiries, but counselors were overwhelmed, resulting in cold leads and missed enrollments.",
      solution:
        "Uptrix Pulse connected Google and Meta ads with automated WhatsApp sequences, counselor round-robin assignments, and instant exam brochure delivery.",
      results: [
        { text: "94% of student follow-ups completed on schedule" },
        { text: "Ad spend linked directly to course batch enrollments" },
        { text: "Seamless multi-branch performance reporting" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "luxury-realty-lead-response",
      isExample: true,
      client: "Luxury Villa Developer",
      industry: "Real estate",
      product: "Real Estate CRM",
      location: "Mumbai",
      title: "How a luxury developer cut response time from 4 hours to 90 seconds",
      summary: "High-ticket property enquiries are qualified instantly and routed to specialist relationship managers.",
      metrics: [
        { value: "90 sec", label: "average lead response" },
        { value: "48%", label: "higher site visit rate" },
        { value: "₹14 Cr", label: "recovered pipeline" },
      ],
      challenge:
        "High-net-worth buyers needed white-glove responses, but inquiries languished in email inboxes for hours before assignment.",
      solution:
        "Uptrix automated instant WhatsApp greeting with project lookbook and assigned leads to on-duty relationship managers in seconds.",
      results: [
        { text: "Rapid first response boosted buyer visit booking by 48%" },
        { text: "Zero lead collision between channel partners and in-house teams" },
        { text: "Full visibility over site visit completion and feedback" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "k12-schools-admissions-pipeline",
      isExample: true,
      client: "Progressive School Group",
      industry: "Education",
      product: "EduTech CRM",
      location: "Pune",
      title: "How a chain of 5 schools filled 100% of seats before the academic year",
      summary: "Parents receive automated tour reminders, interview schedule links, and fee tracking on one dashboard.",
      metrics: [
        { value: "100%", label: "seats filled early" },
        { value: "15k+", label: "enquiries processed" },
        { value: "0", label: "dropped callbacks" },
      ],
      challenge:
        "Managing seasonal enrollment spikes across 5 campuses without missing a single parent callback or application form.",
      solution:
        "One unified admission pipeline tracking campus walk-ins, entrance tests, documentation, and fee payments.",
      results: [
        { text: "All 5 campuses met enrollment targets 2 months early" },
        { text: "Admissions officers track student status without paper forms" },
        { text: "Automated fee reminders reduced late submissions" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "commercial-property-broker-network",
      isExample: true,
      client: "Commercial Real Estate Firm",
      industry: "Real estate",
      product: "Real Estate CRM",
      location: "Gurugram",
      title: "How a commercial developer automated 400+ brokers and doubled site visits",
      summary: "Brokers submit leads via mobile app with instant duplicate checking and real-time commission tracking.",
      metrics: [
        { value: "400+", label: "active brokers" },
        { value: "2.4x", label: "closed commercial deals" },
        { value: "100%", label: "commission transparency" },
      ],
      challenge:
        "Managing hundreds of external channel partners without duplicate submissions and commission disputes.",
      solution:
        "Partner portal for instant lead logging, project collaterals, and transparent stage tracking.",
      results: [
        { text: "Eliminated duplicate lead claims across partner firms" },
        { text: "Commercial leasing turnaround reduced by 35%" },
        { text: "Broker network engagement increased twofold" },
      ],
      quote: "",
      quoteName: "",
      quoteRole: "",
      videoLink: "",
    },
    {
      slug: "medical-coaching-admissions",
      isExample: true,
      client: "NEET & JEE Medical Academy",
      industry: "Education",
      product: "EduTech CRM",
      location: "Kota",
      title: "How a medical academy doubled student admissions from digital campaigns",
      summary: "Counselors use personalized communication history and parent counseling logs to close admissions faster.",
      metrics: [
        { value: "2.8x", label: "conversion from ad leads" },
        { value: "62%", label: "lower cost per enrollment" },
        { value: "1", label: "source of truth for counseling" },
      ],
      challenge:
        "High cost-per-lead on digital ads resulted in low conversions due to fragmented counselor follow-ups.",
      solution:
        "Uptrix Pulse connected Meta and Google campaigns directly to counselor schedules with automated SMS and WhatsApp sequences.",
      results: [
        { text: "CPA decreased by 62% through timely follow-ups" },
        { text: "Parents received instant test score results and counseling invites" },
        { text: "Executive dashboard tracks revenue per marketing channel" },
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
    viewAllLabel: "View all videos",
    comingSoonLabel: "Video coming soon",
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
    { youtubeLink: "", name: "Rohit Verma", role: "Founder & Director", company: "Apex Coaching Institute", product: "EduTech CRM", quote: "Our counsellors converted 38% more leads in the first month itself." },
    { youtubeLink: "", name: "Shalini Iyer", role: "Admissions Head", company: "Resonance Academy", product: "EduTech CRM", quote: "Zero leads slipping through WhatsApp groups now. Everything is tracked." },
    { youtubeLink: "", name: "Vikramaditya Rao", role: "VP Sales", company: "Prestige Estates", product: "Real Estate CRM", quote: "Site visit follow-ups are automated. Site visits went up 45% in 60 days." },
    { youtubeLink: "", name: "Meenakshi Sundaram", role: "Operations Lead", company: "Elite IAS Academy", product: "EduTech CRM", quote: "We manage 5 branches from one single dashboard without spreadsheet chaos." },
    { youtubeLink: "", name: "Anand Singhania", role: "Managing Director", company: "UrbanNest Realty", product: "Real Estate CRM", quote: "Every portal lead gets called in under 3 minutes. Conversion has doubled." },
    { youtubeLink: "", name: "Priya Nair", role: "Director of Admissions", company: "Global Edutech Group", product: "EduTech CRM", quote: "Parents love the instant WhatsApp brochures and counseling reminders." },
    { youtubeLink: "", name: "Gaurav Kulkarni", role: "Sales Head", company: "Skyline Developers", product: "Real Estate CRM", quote: "Channel partner lead duplicates are caught in seconds. Total visibility." },
    { youtubeLink: "", name: "Sunil Shenoy", role: "Managing Partner", company: "CareerPoint Classes", product: "EduTech CRM", quote: "Admissions increased by 40% across all branches with the same team size." },
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

// Written reviews (star rating + quote), shown in the "Customer stories" section on product pages
export const reviewsDefaults = {
  heading: "What customers say",
  exampleLabel: "Example",
  // Turn off "isExample" once a review is from a real customer. Product decides which pages show it.
  items: [
    {
      isExample: true,
      rating: 5,
      quote: "Every enquiry now reaches a counsellor in minutes. We finally know which campaign brings admissions.",
      name: "Rohit Verma",
      role: "Admissions Head",
      company: "Coaching institute, Hyderabad",
      product: "EduTech CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "Portal leads get a call before they reach the next builder, and site visits don't get forgotten any more.",
      name: "Vikram Rao",
      role: "Sales Manager",
      company: "Residential developer, Bengaluru",
      product: "Real Estate CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "WhatsApp follow-ups and reminders run on their own. Our counsellors spend their time talking to parents.",
      name: "Dr. K. Swaminathan",
      role: "Director",
      company: "School group, Pune",
      product: "EduTech CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "Channel partners submit leads in the app now, so duplicate buyers are caught straight away.",
      name: "Karan Johar",
      role: "Head of Sales",
      company: "Real estate brokerage, Mumbai",
      product: "Real Estate CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "Admissions went up by 32% across 6 branches without adding a single extra sales person.",
      name: "Meenakshi Sundaram",
      role: "Managing Director",
      company: "Test Prep Academy, Delhi NCR",
      product: "EduTech CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "We connected Meta and 99acres ad spend directly to bookings. Complete ROI transparency across all campaigns.",
      name: "Anand Singhania",
      role: "Marketing Head",
      company: "PropTech Realty, Gurugram",
      product: "Real Estate CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "Fees, batches, and counseling history are all connected on one clean student timeline.",
      name: "Priya Nair",
      role: "Principal",
      company: "STEM International School, Chennai",
      product: "EduTech CRM",
    },
    {
      isExample: true,
      rating: 5,
      quote: "Counselor performance tracking and daily task queues keep our 50-person team aligned and accountable.",
      name: "Siddharth Bose",
      role: "VP Operations",
      company: "Pan-India Coaching Network, Kolkata",
      product: "EduTech CRM",
    },
  ],
};

export type ReviewsContent = typeof reviewsDefaults;
