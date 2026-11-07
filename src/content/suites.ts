// Copy for the three suite pages: /hr-suite, /it-suite and /finance-suite.
// Figures and module text come from the suite designs. Items marked "written for the page" were not in
// the designs and should be checked against the product before launch.
import { APP_URL } from "@/content/hrms";

export type Tone = "ok" | "wait" | "info" | "new";
export type Row = { a: string; b: string; t: string; tone: Tone };
export type Stat = { label: string; value: string; delta: string; up: boolean; series: number[] };
export type Mod = { title: string; short: string; text: string; points: string[]; screen: string; icon: string; rows: Row[] };
export type Step = { time: string; title: string; text: string; rows: Row[] };
export type Connection = { title: string; text: string; href: string; icon: string };
export type SuiteKey = "hr" | "it" | "finance";

export type Suite = {
  key: SuiteKey;
  name: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  lead: string;
  accent: string; // text and icon colour
  soft: string; // tinted background
  heroBg: string;
  icon: string;
  photo: { src: string; alt: string };
  statsCaption: string;
  modulesTitle: string;
  modulesLead: string;
  walkthroughTitle: string;
  minutesSaved: number;
  estimatorBasis: string;
  connections: Connection[];
  stats: Stat[];
  mods: Mod[];
  steps: Step[];
};

// Path data for the line icons, taken from the suite designs.
export const ICON = {
  people: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
  clock: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M12 6v6l4 2",
  calendar: "M3 6h18v15H3zM16 3v6M8 3v6M3 11h18",
  shift: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
  trend: "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8",
  gift: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8M19 8v6M22 11h-6",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
  ticket: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4zM13 5v14",
  laptop: "M4 5h16v11H4zM2 20h20",
  exit: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3",
  receipt: "M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2zM8 8h8M8 12h8M8 16h5",
  wallet: "M3 7h18v13H3zM16 13h2M3 7l3-4h12l3 4",
  building: "M3 21h18M6 21V3h12v18M14 12h.01",
} as const;

const hrStats: Stat[] = [
  { label: "Present today", value: "231", delta: "▲ 93% attendance", up: true, series: [88, 90, 89, 92, 91, 93, 93] },
  { label: "Leave requests", value: "4", delta: "2 waiting over a day", up: false, series: [2, 5, 3, 6, 4, 3, 4] },
  { label: "Reviews submitted", value: "186 / 248", delta: "▲ 75% complete", up: true, series: [20, 48, 80, 110, 140, 168, 186] },
];

const itStats: Stat[] = [
  { label: "Open tickets", value: "12", delta: "▼ 4 fewer than last week", up: true, series: [18, 16, 17, 15, 14, 13, 12] },
  { label: "Average fix time", value: "3.2 hrs", delta: "▲ faster than last month", up: true, series: [6.1, 5.4, 4.9, 4.2, 3.9, 3.5, 3.2] },
  { label: "Assets assigned", value: "548", delta: "3 returns due this week", up: false, series: [520, 526, 530, 536, 540, 545, 548] },
];

const financeStats: Stat[] = [
  { label: "November payroll", value: "₹ 1.42 Cr", delta: "▲ 2.2% vs October", up: false, series: [1.28, 1.31, 1.33, 1.36, 1.39, 1.42] },
  { label: "Loans outstanding", value: "₹ 18.4 L", delta: "23 active loans", up: true, series: [22.1, 21.4, 20.6, 19.9, 19.2, 18.4] },
  { label: "Settlements this quarter", value: "6", delta: "All paid on time", up: true, series: [1, 2, 2, 4, 5, 6] },
];

export const SUITES: Record<SuiteKey, Suite> = {
  hr: {
    key: "hr",
    name: "HR Suite",
    path: "/hr-suite",
    seoTitle: "Uptrix HR Suite | Records, Attendance, Leave and Policies",
    seoDescription:
      "Uptrix HR Suite keeps employee records, attendance, leave, shifts, performance, policies, referrals and an AI assistant on one record.",
    eyebrow: "HR Suite",
    h1: "Core HR that ",
    h1Accent: "runs itself.",
    lead: "Records, attendance, leave, shifts, performance, policies, referrals and an AI assistant — all on one employee record.",
    accent: "#3F289D",
    soft: "#EFEAFF",
    heroBg: "linear-gradient(180deg, #EFEAFF 0%, #F3F6FB 100%)",
    icon: ICON.people,
    photo: { src: "/images/suites/hr-suite.png", alt: "An HR manager shaking hands with a new employee" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Eight modules, one record.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "Riya’s first week at Demo Company.",
    minutesSaved: 25,
    estimatorBasis: "leave, attendance and HR questions",
    connections: [
      { title: "HR → Finance", text: "Attendance and approved leave flow straight into payslips.", href: "/finance-suite", icon: ICON.receipt },
      { title: "HR → IT", text: "A new joiner automatically starts the laptop and account checklist.", href: "/it-suite", icon: ICON.laptop },
    ],
    stats: hrStats,
    mods: [
      {
        title: "HRIS & employee records",
        short: "Profiles, documents, org view",
        text: "Every employee’s profile, documents, job details and history in one searchable record.",
        points: ["Personal, job and bank details", "Secure document storage", "Org view by manager"],
        screen: "Employee directory",
        icon: ICON.people,
        rows: [
          { a: "Anil Rao", b: "Engineering · Bengaluru", t: "Active", tone: "ok" },
          { a: "Sneha Kulkarni", b: "Sales · Pune", t: "Active", tone: "ok" },
          { a: "Manoj Patil", b: "Operations", t: "On notice", tone: "wait" },
        ],
      },
      {
        title: "Attendance",
        short: "Web and mobile check-in",
        text: "Check-in and check-out from web or mobile, with late marks and overtime worked out automatically.",
        points: ["Phone and web check-in", "Late and overtime flags", "Monthly report for payroll"],
        screen: "Today",
        icon: ICON.clock,
        rows: [
          { a: "Anil R.", b: "In at 09:02", t: "On time", tone: "ok" },
          { a: "Sneha K.", b: "In at 09:41", t: "Late", tone: "wait" },
          { a: "Riya S.", b: "In at 08:55", t: "On time", tone: "ok" },
        ],
      },
      {
        title: "Leave management",
        short: "Apply, approve, live balances",
        text: "Employees apply in seconds and managers approve in one tap. Balances update the moment leave is approved.",
        points: ["Custom leave types and quotas", "Manager and HR approvals", "Live balances"],
        screen: "Leave requests",
        icon: ICON.calendar,
        rows: [
          { a: "Sneha K.", b: "Casual · 12–13 Nov", t: "Pending", tone: "wait" },
          { a: "Anil R.", b: "Sick · 1 day", t: "Approved", tone: "ok" },
          { a: "Riya S.", b: "Earned · 5 days", t: "Approved", tone: "ok" },
        ],
      },
      {
        title: "Shifts & rosters",
        short: "Plan, publish, swap",
        text: "Plan shifts for every team and publish weekly rosters your employees can see on their phones.",
        points: ["Morning, evening and night shifts", "Weekly rosters", "Swaps with approval"],
        screen: "Roster · this week",
        icon: ICON.shift,
        rows: [
          { a: "Morning", b: "09:00–18:00", t: "42 people", tone: "info" },
          { a: "Evening", b: "14:00–23:00", t: "28 people", tone: "info" },
          { a: "Night", b: "22:00–07:00", t: "16 people", tone: "info" },
        ],
      },
      {
        title: "Performance tracking",
        short: "Goals, reviews, ratings",
        text: "Set goals, run review cycles and see how every team is doing.",
        points: ["Goals and KPIs", "Quarterly or annual cycles", "Self and manager ratings"],
        screen: "Q4 review cycle",
        icon: ICON.trend,
        rows: [
          { a: "Goals set", b: "248 of 248", t: "Done", tone: "ok" },
          { a: "Self reviews", b: "186 of 248", t: "In progress", tone: "wait" },
          { a: "Manager reviews", b: "Opens next", t: "Not started", tone: "info" },
        ],
      },
      {
        title: "HR policy management",
        short: "Versions and acknowledgements",
        text: "Publish policies in one place and see exactly who has read the latest version.",
        points: ["Version history", "Employee acknowledgement", "Powers AI answers"],
        screen: "Policies",
        icon: ICON.doc,
        rows: [
          { a: "Leave policy", b: "Version 3", t: "Published", tone: "ok" },
          { a: "Work from home", b: "Version 2", t: "Published", tone: "ok" },
          { a: "Code of conduct", b: "Version 1", t: "Published", tone: "ok" },
        ],
      },
      {
        title: "Referral bonus",
        short: "Refer, track, reward",
        text: "Employees refer candidates, and each bonus is tracked from hire to payout, then flows into payroll.",
        points: ["Referral tracking from application to hire", "Payout rules per role", "Bonus added to payroll"],
        screen: "Referrals",
        icon: ICON.gift,
        rows: [
          { a: "Rohan M. → Backend developer", b: "Joined 3 Nov", t: "In probation", tone: "info" },
          { a: "Meera J. → Sales lead", b: "Joined 20 Oct", t: "Bonus due", tone: "wait" },
          { a: "Kiran T. → Designer", b: "Joined 1 Sep", t: "Paid", tone: "ok" },
        ],
      },
      {
        title: "AI Assistant",
        short: "Instant answers for employees",
        text: "Employees ask everyday HR questions in plain language and get answers from your own policies and records.",
        points: ["Leave balances and shift questions", "Answers cite the policy they use", "Routes complex cases to HR"],
        screen: "Assistant",
        icon: ICON.spark,
        rows: [
          { a: "“How many leaves do I have?”", b: "Anil R.", t: "Answered", tone: "new" },
          { a: "“Which shift am I on next week?”", b: "Riya S.", t: "Answered", tone: "new" },
          { a: "“Can I carry over earned leave?”", b: "Sneha K.", t: "Sent to HR", tone: "wait" },
        ],
      },
    ],
    steps: [
      {
        time: "Mon 09:00",
        title: "Her profile is ready before she arrives.",
        text: "HR added Riya last week. Her documents, manager and leave balance are already set up.",
        rows: [
          { a: "Profile complete", b: "Engineering · reports to Arjun", t: "Done", tone: "ok" },
          { a: "Documents", b: "Offer letter, ID proof", t: "Verified", tone: "ok" },
          { a: "Leave balance", b: "12 casual · 8 sick", t: "Set", tone: "info" },
        ],
      },
      {
        time: "Mon 09:30",
        title: "She checks in from her phone.",
        text: "Attendance starts on her first morning, with her shift already assigned.",
        rows: [
          { a: "Shift", b: "Morning · 09:00–18:00", t: "Assigned", tone: "info" },
          { a: "Check-in", b: "09:04 from mobile", t: "On time", tone: "ok" },
          { a: "Late marks", b: "None", t: "Clear", tone: "ok" },
        ],
      },
      {
        time: "Wed 18:00",
        title: "Her leave balance is ready.",
        text: "Balances are set from her joining date and policy, so she can plan without asking HR.",
        rows: [
          { a: "Casual leave", b: "6 days", t: "Available", tone: "ok" },
          { a: "Earned leave", b: "Accrues monthly", t: "Active", tone: "info" },
          { a: "Policy acknowledged", b: "Leave policy v3", t: "Done", tone: "ok" },
        ],
      },
      {
        time: "Fri 11:00",
        title: "Her first goals are set.",
        text: "Her manager sets goals in Performance, and Riya sees them in her own view.",
        rows: [
          { a: "Goals set", b: "3 for Q4", t: "Done", tone: "ok" },
          { a: "Self review", b: "Opens in 60 days", t: "Scheduled", tone: "info" },
          { a: "Open items", b: "Documents", t: "Open", tone: "wait" },
        ],
      },
    ],
  },

  it: {
    key: "it",
    name: "IT Suite",
    path: "/it-suite",
    seoTitle: "Uptrix IT Suite | Helpdesk, Asset Management and Onboarding",
    seoDescription:
      "Uptrix IT Suite runs one helpdesk for IT and HR tickets, a register of every company asset, and day-one-to-last-day checklists.",
    eyebrow: "IT Suite",
    h1: "Every request, every device — ",
    h1Accent: "handled.",
    lead: "One helpdesk for IT and HR tickets, a register of every company asset, and day-one-to-last-day checklists.",
    accent: "#0058B0",
    soft: "#E3EFFC",
    heroBg: "linear-gradient(180deg, #E3EFFC 0%, #F3F6FB 100%)",
    icon: ICON.laptop,
    photo: { src: "/images/suites/it-suite.png", alt: "Two colleagues working through an issue on a laptop" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Three modules for IT teams.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "A broken charger, fixed before lunch.",
    minutesSaved: 10,
    estimatorBasis: "tickets, asset tracking and joiner/leaver setup",
    connections: [
      { title: "IT ← HR", text: "New joiners and leavers from HR start IT checklists automatically.", href: "/hr-suite", icon: ICON.people },
      { title: "IT → Finance", text: "Unreturned assets are flagged in the final settlement.", href: "/finance-suite", icon: ICON.receipt },
    ],
    stats: itStats,
    mods: [
      {
        title: "IT & HR ticket management",
        short: "One helpdesk for every request",
        text: "Employees raise IT and HR requests in one place; your teams assign, track and resolve them.",
        points: ["IT, HR and payroll categories", "Priority and due dates", "Live status for employees"],
        screen: "Helpdesk queue",
        icon: ICON.ticket,
        rows: [
          { a: "#1043 Laptop not charging", b: "IT · High", t: "Open", tone: "wait" },
          { a: "#1041 Payslip correction", b: "HR · Priya", t: "In progress", tone: "info" },
          { a: "#1039 VPN access", b: "IT", t: "Resolved", tone: "ok" },
        ],
      },
      {
        title: "Asset management",
        short: "Every laptop, phone and ID card",
        text: "A register of every company asset — who has it, since when, and what must come back at exit.",
        points: ["Serial numbers and warranties", "Assigned by employee", "Return linked to F&F"],
        screen: "Assets",
        icon: ICON.laptop,
        rows: [
          { a: "Dell Latitude 5440", b: "Anil R.", t: "Assigned", tone: "info" },
          { a: "iPhone 13", b: "Sneha K.", t: "Assigned", tone: "info" },
          { a: "ID card #0218", b: "Manoj P. · exit 15 Nov", t: "Return due", tone: "wait" },
        ],
      },
      {
        title: "Onboarding & offboarding",
        short: "Day one to last day",
        text: "Shared checklists so new joiners are ready on day one and leavers are signed off cleanly.",
        points: ["Email, laptop and ID on day one", "Access removal at exit", "HR, IT and managers aligned"],
        screen: "Riya S. · joins 10 Nov",
        icon: ICON.exit,
        rows: [
          { a: "Create email account", b: "IT", t: "Done", tone: "ok" },
          { a: "Issue laptop", b: "Dell Latitude 5440", t: "Done", tone: "ok" },
          { a: "Policy acknowledgement", b: "Employee", t: "Pending", tone: "wait" },
        ],
      },
    ],
    steps: [
      {
        time: "09:14",
        title: "Anil tells the AI his laptop won’t charge.",
        text: "No forms to find — the AI Assistant raises a high-priority IT ticket with his laptop already attached.",
        rows: [
          { a: "#1043 raised", b: "Via AI Assistant", t: "Open", tone: "wait" },
          { a: "Asset attached", b: "Dell Latitude 5440", t: "Linked", tone: "info" },
          { a: "Priority", b: "Set to High", t: "High", tone: "wait" },
        ],
      },
      {
        time: "09:15",
        title: "It lands with the right person.",
        text: "The ticket is routed to the IT helpdesk queue with everything they need.",
        rows: [
          { a: "Assigned to", b: "IT helpdesk", t: "Assigned", tone: "info" },
          { a: "SLA", b: "Same day", t: "On track", tone: "ok" },
          { a: "Employee notified", b: "Status visible in app", t: "Sent", tone: "ok" },
        ],
      },
      {
        time: "10:02",
        title: "A replacement is issued from Assets.",
        text: "IT issues a spare charger from the asset register — and the record updates itself.",
        rows: [
          { a: "Charger #C-118", b: "Issued to Anil R.", t: "Assigned", tone: "info" },
          { a: "Old charger", b: "Marked faulty", t: "Logged", tone: "ok" },
          { a: "Ticket note", b: "“Charger replaced”", t: "Updated", tone: "ok" },
        ],
      },
      {
        time: "10:06",
        title: "Closed with a 5-star rating.",
        text: "Anil confirms the fix and rates the help. Resolved in 51 minutes.",
        rows: [
          { a: "Status", b: "Resolved", t: "Done", tone: "ok" },
          { a: "Rating", b: "5 ★ “Quick and painless”", t: "Rated", tone: "new" },
          { a: "Time to fix", b: "51 minutes", t: "—", tone: "info" },
        ],
      },
    ],
  },

  finance: {
    key: "finance",
    name: "Finance Suite",
    path: "/finance-suite",
    seoTitle: "Uptrix Finance Suite | Payslips, Loans and Full-and-Final Settlements",
    seoDescription:
      "Uptrix Finance Suite builds payslips from real attendance and leave, recovers loans automatically, and calculates full-and-final settlements.",
    eyebrow: "Finance Suite",
    h1: "Payroll that is right ",
    h1Accent: "the first time.",
    lead: "Payslips built from real attendance and leave, loans recovered automatically, and full-and-final settlements calculated for you.",
    accent: "#2E6B1E",
    soft: "#E6F4E0",
    heroBg: "linear-gradient(180deg, #E6F4E0 0%, #F3F6FB 100%)",
    icon: ICON.receipt,
    photo: { src: "/images/suites/finance-suite.png", alt: "A person working out figures on a calculator" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Three modules for finance teams.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "Month-end payroll, in four calm steps.",
    minutesSaved: 15,
    estimatorBasis: "payroll checks, loan tracking and settlements",
    connections: [
      { title: "Finance ← HR", text: "Payslips use attendance, approved leave and referral bonuses.", href: "/hr-suite", icon: ICON.people },
      { title: "Finance ← IT", text: "Asset returns are confirmed before a settlement is paid.", href: "/it-suite", icon: ICON.laptop },
    ],
    stats: financeStats,
    mods: [
      {
        title: "Payslip generator",
        short: "Monthly payslips in a few clicks",
        text: "Set up salary structures once; Uptrix builds every payslip from attendance and approved leave.",
        points: ["Earnings and deductions", "Attendance and EMIs applied", "Self-service download"],
        screen: "Anil Rao · November",
        icon: ICON.receipt,
        rows: [
          { a: "Gross earnings", b: "Basic, HRA, allowances", t: "₹ 85,000", tone: "info" },
          { a: "Deductions", b: "PF, tax, loan EMI", t: "− ₹ 14,350", tone: "wait" },
          { a: "Net pay", b: "Credited 30 Nov", t: "₹ 70,650", tone: "ok" },
        ],
      },
      {
        title: "Loans & advances",
        short: "Requests, approvals, EMIs",
        text: "Employees request a loan or advance; approvers see the EMI plan; repayments come out of salary automatically.",
        points: ["Loan and advance requests", "EMI plan on approval", "Automatic recovery"],
        screen: "Sneha Kulkarni · loan",
        icon: ICON.wallet,
        rows: [
          { a: "Loan amount", b: "Approved 2 Sep", t: "₹ 1,20,000", tone: "info" },
          { a: "Monthly EMI", b: "From salary", t: "₹ 10,000", tone: "info" },
          { a: "Repayment", b: "3 of 12 paid", t: "Active", tone: "ok" },
        ],
      },
      {
        title: "Employee exit & F&F",
        short: "Settlement, calculated for you",
        text: "From resignation to final settlement — notice period, leave encashment, recoveries and asset return in one view.",
        points: ["Notice and last working day", "Encashment and recoveries", "Settlement statement"],
        screen: "Manoj Patil · exit 15 Nov",
        icon: ICON.building,
        rows: [
          { a: "Leave encashment", b: "8 days", t: "+ ₹ 22,600", tone: "ok" },
          { a: "Loan recovery", b: "Outstanding balance", t: "− ₹ 30,000", tone: "wait" },
          { a: "Net settlement", b: "Paid 20 Nov", t: "₹ 35,100", tone: "ok" },
        ],
      },
    ],
    steps: [
      {
        time: "25 Nov",
        title: "Attendance is locked.",
        text: "Paid days, approved leave and overtime for November are frozen — no more manual collection.",
        rows: [
          { a: "Paid days", b: "248 employees", t: "Locked", tone: "ok" },
          { a: "Approved leave", b: "61 days", t: "Applied", tone: "ok" },
          { a: "Overtime", b: "42 hours", t: "Applied", tone: "ok" },
        ],
      },
      {
        time: "26 Nov",
        title: "Only the exceptions need you.",
        text: "244 payslips are ready. Four need a quick look before approval.",
        rows: [
          { a: "2 new joiners", b: "Pro-rated salary", t: "₹ 61,200", tone: "info" },
          { a: "Unpaid leave · Anil R.", b: "1 day", t: "− ₹ 2,000", tone: "wait" },
          { a: "Bank details changed", b: "Riya S.", t: "Check", tone: "wait" },
        ],
      },
      {
        time: "28 Nov",
        title: "One approval releases the run.",
        text: "Finance approves the whole run with a full audit trail.",
        rows: [
          { a: "Payroll total", b: "₹ 1.42 Cr", t: "Approved", tone: "ok" },
          { a: "Loan EMIs", b: "23 recovered", t: "Applied", tone: "ok" },
          { a: "Audit trail", b: "Saved", t: "Logged", tone: "info" },
        ],
      },
      {
        time: "30 Nov",
        title: "Payslips land on payday.",
        text: "Every employee finds their payslip in their account — no PDFs to email.",
        rows: [
          { a: "Payslips published", b: "248 of 248", t: "Done", tone: "ok" },
          { a: "Downloads", b: "193 so far", t: "Live", tone: "info" },
          { a: "Queries", b: "2 tickets raised", t: "Open", tone: "wait" },
        ],
      },
    ],
  },
};

// Company size options for the time-back estimate, as shown in the PDF.
export const SIZE_BANDS = [
  { label: "50 people", people: 50 },
  { label: "100 people", people: 100 },
  { label: "250 people", people: 250 },
  { label: "500 people", people: 500 },
];

export const SUITE_CTA = { live: APP_URL };
