import { HRMS_PAGE_DEFAULTS } from "./hrms-pages.generated";
// Editable copy for the HRMS subdomain: the home page and the HR, IT and Finance suite pages.
// The admin dashboard edits this under "HRMS subdomain" and saves it to content/site.json.
// Icons and accent colours are stored by name (for example "people" or "hr") and resolved to
// the real icon path and colours by resolveHome() and resolveSuite() below.
import { ICON, type Connection, type Mod, type Row, type Stat, type Step, type Suite, type SuiteKey } from "@/content/suites";
import { APP_URL } from "@/content/hrms";

export type Tone = "ok" | "wait" | "info" | "new";
export type Accent = { bg: string; fg: string };

const ACCENTS: Record<string, Accent> = {
  hr: { bg: "#EFEAFF", fg: "#3F289D" },
  it: { bg: "#E3EFFC", fg: "#0058B0" },
  finance: { bg: "#E6F4E0", fg: "#2E6B1E" },
  ai: { bg: "#FFF1DC", fg: "#8A4600" },
};

export const TONE_STYLE: Record<Tone, Accent> = {
  ok: { bg: "#E6F4E0", fg: "#2E6B1E" },
  wait: { bg: "#FFF1DC", fg: "#8A4600" },
  info: { bg: "#E3EFFC", fg: "#0058B0" },
  new: { bg: "#EFEAFF", fg: "#3F289D" },
};

// ----- Copy taken from the suite and home page designs (see the notes in each section) -----

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

const suiteDefaults = {
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
    icon: "people",
    photo: { src: "/images/suites/hr-suite.png", alt: "An HR manager shaking hands with a new employee" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Eight modules, one record.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "Riya’s first week at Demo Company.",
    minutesSaved: 25,
    estimatorBasis: "leave, attendance and HR questions",
    connections: [
      { title: "HR → Finance", text: "Attendance and approved leave flow straight into payslips.", href: "/finance-suite", icon: "receipt" },
      { title: "HR → IT", text: "A new joiner automatically starts the laptop and account checklist.", href: "/it-suite", icon: "laptop" },
    ],
    stats: hrStats,
    mods: [
      {
        title: "HRIS & employee records",
        short: "Profiles, documents, org view",
        text: "Every employee’s profile, documents, job details and history in one searchable record.",
        points: ["Personal, job and bank details", "Secure document storage", "Org view by manager"],
        screen: "Employee directory",
        icon: "people",
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
        icon: "clock",
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
        icon: "calendar",
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
        icon: "shift",
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
        icon: "trend",
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
        icon: "doc",
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
        icon: "gift",
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
        icon: "spark",
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
    icon: "laptop",
    photo: { src: "/images/suites/it-suite.png", alt: "Two colleagues working through an issue on a laptop" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Three modules for IT teams.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "A broken charger, fixed before lunch.",
    minutesSaved: 10,
    estimatorBasis: "tickets, asset tracking and joiner/leaver setup",
    connections: [
      { title: "IT ← HR", text: "New joiners and leavers from HR start IT checklists automatically.", href: "/hr-suite", icon: "people" },
      { title: "IT → Finance", text: "Unreturned assets are flagged in the final settlement.", href: "/finance-suite", icon: "receipt" },
    ],
    stats: itStats,
    mods: [
      {
        title: "IT & HR ticket management",
        short: "One helpdesk for every request",
        text: "Employees raise IT and HR requests in one place; your teams assign, track and resolve them.",
        points: ["IT, HR and payroll categories", "Priority and due dates", "Live status for employees"],
        screen: "Helpdesk queue",
        icon: "ticket",
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
        icon: "laptop",
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
        icon: "exit",
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
    icon: "receipt",
    photo: { src: "/images/suites/finance-suite.png", alt: "A person working out figures on a calculator" },
    statsCaption: "This month at Demo Company",
    modulesTitle: "Three modules for finance teams.",
    modulesLead: "Pick a module — the board shows what it does and how it looks inside Uptrix.",
    walkthroughTitle: "Month-end payroll, in four calm steps.",
    minutesSaved: 15,
    estimatorBasis: "payroll checks, loan tracking and settlements",
    connections: [
      { title: "Finance ← HR", text: "Payslips use attendance, approved leave and referral bonuses.", href: "/hr-suite", icon: "people" },
      { title: "Finance ← IT", text: "Asset returns are confirmed before a settlement is paid.", href: "/it-suite", icon: "laptop" },
    ],
    stats: financeStats,
    mods: [
      {
        title: "Payslip generator",
        short: "Monthly payslips in a few clicks",
        text: "Set up salary structures once; Uptrix builds every payslip from attendance and approved leave.",
        points: ["Earnings and deductions", "Attendance and EMIs applied", "Self-service download"],
        screen: "Anil Rao · November",
        icon: "receipt",
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
        icon: "wallet",
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
        icon: "building",
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

const SUBMENU = [
  { label: "HR Suite", href: "/hr-suite", description: "People, time and policies", icon: "people", accent: "hr" },
  { label: "IT Suite", href: "/it-suite", description: "Tickets, assets, joiners", icon: "laptop", accent: "it" },
  { label: "Finance Suite", href: "/finance-suite", description: "Payslips, loans, F&F", icon: "receipt", accent: "finance" },
];

const ORBIT = [
  { name: "HR Suite", note: "Attendance · leave · shifts", icon: "people", accent: "hr", pos: "left-0 top-[6%]" },
  { name: "IT Suite", note: "Tickets · assets", icon: "laptop", accent: "it", pos: "right-[-2%] top-[14%]" },
  { name: "Finance Suite", note: "Payslips · loans · F&F", icon: "receipt", accent: "finance", pos: "left-[4%] bottom-[4%]" },
];

const DAY = [
  { time: "09:02", init: "AR", who: "Anil R.", role: "Engineering", what: "Checks in from his phone on the way to his desk.", suite: "HR Suite", accent: "hr", dot: "#3F289D" },
  { time: "10:15", init: "RS", who: "Riya S.", role: "New joiner", what: "Starts day one with her laptop, email and ID card ready.", suite: "IT Suite", accent: "it", dot: "#0067CC" },
  { time: "11:30", init: "SK", who: "Sneha K.", role: "Sales", what: "Applies for Friday off — her manager approves in one tap.", suite: "HR Suite", accent: "hr", dot: "#3F289D" },
  { time: "14:05", init: "MP", who: "Manoj P.", role: "Operations", what: "Raises a ticket: “VPN isn’t connecting.” IT picks it up in minutes.", suite: "IT Suite", accent: "it", dot: "#0067CC" },
  { time: "16:40", init: "FT", who: "Finance team", role: "Payroll", what: "Reviews four payroll exceptions instead of 248 payslips.", suite: "Finance Suite", accent: "finance", dot: "#51AD38" },
  { time: "18:30", init: "AR", who: "Anil R.", role: "Engineering", what: "Asks the AI how many leaves he has left. It answers instantly.", suite: "AI Assistant", accent: "ai", dot: "#FF9609" },
];


const ROLES = [
  {
    name: "Employee",
    headline: "Everything you need from HR — without emailing HR.",
    screen: "My Uptrix",
    meta: "Anil Rao",
    points: [
      "Check in, see your shift and apply for leave from your phone",
      "Download payslips and see exactly what changed",
      "Ask the AI Assistant anything about leave, shifts or policies",
    ],
    rows: [
      { icon: "clock", accent: "hr", a: "Checked in 09:02", b: "Morning shift · 09:00–18:00", t: "On time", tone: "ok" },
      { icon: "calendar", accent: "hr", a: "Leave balance", b: "14 days left this year", t: "View", tone: "info" },
      { icon: "receipt", accent: "finance", a: "Payslip · October", b: "Net ₹ 70,650", t: "Ready", tone: "ok" },
      { icon: "spark", accent: "ai", a: "Ask Uptrix AI", b: "“Which shift am I on next week?”", t: "New", tone: "new" },
    ],
  },
  {
    name: "Manager",
    headline: "Your team at a glance — and approvals in one tap.",
    screen: "My team · Sales",
    meta: "12 people",
    points: ["See who is in, late or out today", "Approve leave and shift swaps from anywhere", "Run reviews for your direct reports"],
    rows: [
      { icon: "people", accent: "hr", a: "11 of 12 in today", b: "1 on casual leave", t: "Live", tone: "info" },
      { icon: "calendar", accent: "hr", a: "Sneha K. · Friday off", b: "Casual leave · 1 day", t: "Approve", tone: "wait" },
      { icon: "shift", accent: "hr", a: "Shift swap request", b: "Arjun → morning, Thu", t: "Approve", tone: "wait" },
      { icon: "trend", accent: "hr", a: "Q4 reviews", b: "8 of 12 submitted", t: "On track", tone: "ok" },
    ],
  },
  {
    name: "HR",
    headline: "Run every people process from one place.",
    screen: "HR overview",
    meta: "Demo Company · 248 people",
    points: [
      "Records, documents, policies and onboarding in one system",
      "Leave, attendance and shifts that update themselves",
      "Fewer “quick questions” thanks to the AI Assistant",
    ],
    rows: [
      { icon: "people", accent: "hr", a: "3 new joiners this week", b: "Onboarding checklists running", t: "In progress", tone: "info" },
      { icon: "calendar", accent: "hr", a: "4 leave requests", b: "Waiting for managers", t: "Pending", tone: "wait" },
      { icon: "doc", accent: "hr", a: "WFH policy v2", b: "96% acknowledged", t: "Published", tone: "ok" },
      { icon: "spark", accent: "ai", a: "412 AI questions", b: "6 in 10 answered by AI", t: "This month", tone: "new" },
    ],
  },
  {
    name: "IT",
    headline: "Every request and every device, accounted for.",
    screen: "IT helpdesk",
    meta: "12 open tickets",
    points: [
      "One queue for IT and HR tickets, with the employee’s assets attached",
      "A register of every laptop, phone and ID card",
      "Day-one setup and last-day sign-off on one checklist",
    ],
    rows: [
      { icon: "ticket", accent: "it", a: "#1043 Laptop not charging", b: "Anil R. · Dell Latitude 5440", t: "High", tone: "wait" },
      { icon: "ticket", accent: "it", a: "#1041 VPN access", b: "Manoj P.", t: "In progress", tone: "info" },
      { icon: "laptop", accent: "it", a: "Laptop for Riya S.", b: "Joins Monday", t: "Ready", tone: "ok" },
      { icon: "laptop", accent: "it", a: "ID card #0218", b: "Return due at exit", t: "Due", tone: "wait" },
    ],
  },
  {
    // Written for the page: the paste was cut off before the Finance rows.
    name: "Finance",
    headline: "Payroll that is right the first time.",
    screen: "November payroll",
    meta: "₹ 1.42 Cr · 248 people",
    points: [
      "Payslips built from real attendance and approved leave",
      "Loans and advances recovered automatically",
      "Full-and-final settlements calculated for you",
    ],
    rows: [
      { icon: "receipt", accent: "finance", a: "Payroll run", b: "248 payslips ready", t: "Ready", tone: "ok" },
      { icon: "wallet", accent: "finance", a: "Loan EMIs", b: "23 recovered this month", t: "Applied", tone: "ok" },
      { icon: "building", accent: "finance", a: "Exit settlement", b: "Manoj P. · exit 15 Nov", t: "Review", tone: "wait" },
      { icon: "doc", accent: "finance", a: "Audit trail", b: "Every approval saved", t: "Logged", tone: "info" },
    ],
  },
];

// From the PDF: the six questions on the home page.
const QUESTIONS = [
  { q: "Who’s on leave today?", a: "A live list for every manager, with the reason and return date.", who: "Manager", module: "Leave", accent: "hr", top: "#3F289D" },
  { q: "Why is my salary lower this month?", a: "One unpaid leave day on 21 Oct — shown line by line on the payslip.", who: "Employee", module: "Payslips", accent: "finance", top: "#51AD38" },
  { q: "Which laptop does Riya have?", a: "Dell Latitude 5440, assigned on day one, linked to her profile.", who: "IT", module: "Assets", accent: "it", top: "#0067CC" },
  { q: "Has everyone read the new WFH policy?", a: "96% have acknowledged version 2 — reminders go to the rest.", who: "HR", module: "Policies", accent: "hr", top: "#3F289D" },
  { q: "How much do we owe Manoj at exit?", a: "₹ 35,100 after leave encashment and loan recovery.", who: "Finance", module: "F&F", accent: "finance", top: "#51AD38" },
  { q: "Which shift am I on next week?", a: "Morning, Monday to Friday — answered by the AI in a second.", who: "Employee", module: "AI Assistant", accent: "ai", top: "#FF9609" },
];

// From the PDF: the three promises.
const PRINCIPLES = [
  { n: "01", t: "One record for everyone", d: "An employee is entered once. HR, IT and Finance all work from that same record.", c: "#3F289D" },
  { n: "02", t: "Every role, its own view", d: "Employees, managers, HR, IT and Finance each see exactly what they need — and only that.", c: "#0067CC" },
  { n: "03", t: "Plain-language help", d: "The AI Assistant answers everyday questions in plain words, from your own data and policies.", c: "#FF9609" },
];

// From the PDF: the setup checklist. The first item starts ticked.
const SETUP = [
  { t: "Add your people", d: "Employees, departments and managers", when: "Day 1" },
  { t: "Set your rules", d: "Leave types, shifts and holidays", when: "Day 1" },
  { t: "Publish your policies", d: "Employees acknowledge them in the app", when: "Day 2" },
  { t: "Invite your team", d: "Everyone signs in with Google", when: "Day 3" },
  { t: "Run your first payroll", d: "With the Finance Suite", when: "Month end" },
];

// From the PDF: the sample interview. Replace with a real customer before launch.
const INTERVIEW = [
  { q: "What changed first?", a: "Leave. Requests used to live in email threads and a spreadsheet nobody trusted. Now balances update themselves." },
  { q: "How did employees react?", a: "They liked doing things themselves — checking in, downloading payslips, asking the assistant instead of us." },
  { q: "What about payroll?", a: "Attendance and approved leave flow straight in. We only look at the handful of exceptions each month." },
  { q: "Would you do anything differently?", a: "Start with the HR Suite, then add IT and Finance. That’s exactly how we rolled it out." },
];


// Plain text for the home page sections. Edit these in the admin dashboard.
const HOME_TEXT = {
  nav: { suites: "Suites", day: "A day in Uptrix", roles: "For every role", setup: "Get started", login: "Log in", demo: "Book a demo" },
  hero: {
    eyebrow: "HR · IT · Finance — one platform",
    h1: "Everything about your people, ",
    h1Accent: "in one orbit.",
    lead: "Uptrix keeps every employee’s record at the centre — and lets HR, IT and Finance work from it together. No re-typing, no lost spreadsheets.",
    primaryCta: "Explore the live demo",
    secondaryCta: "Book a demo",
    diagramLabel: "Diagram: one employee record at the centre, connected to the HR, IT and Finance suites",
    recordLabel: "One employee record",
    aiLabel: "AI Assistant",
  },
  demo: {
    kicker: "Book a demo",
    title: "See Uptrix with",
    titleAccent: "your own team.",
    lead: "Tell us a little about your team and we’ll walk you through Uptrix with your own use cases — or jump straight into the live demo.",
    bullets: ["30-minute walkthrough", "Setup help included", "1-click live demo, no sign-up"],
    liveLink: "Or open the live demo →",
  },
  footer: {
    headline: "Bring HR, IT and Finance onto one record.",
    lead: "Explore every screen in the live demo — 1-click logins, no sign-up.",
    tagline: "HR, IT and Finance suites on one employee record — with an AI assistant that answers your team’s everyday questions.",
    email: "[YOUR EMAIL]",
    phone: "[YOUR PHONE]",
    address: "[YOUR OFFICE ADDRESS]",
    social: ["LinkedIn", "X", "YouTube", "Instagram"],
    hrModules: [
      { label: "Employee records (HRIS)", href: "/hr-suite" },
      { label: "Attendance", href: "/hr-suite" },
      { label: "Leave management", href: "/hr-suite" },
      { label: "Shifts & rosters", href: "/hr-suite" },
      { label: "Performance tracking", href: "/hr-suite" },
      { label: "HR policies", href: "/hr-suite" },
      { label: "Referral bonus", href: "/hr-suite" },
      { label: "AI Assistant", href: "/hr-suite" },
    ],
    itFinance: [
      { label: "IT & HR tickets", href: "/it-suite" },
      { label: "Asset management", href: "/it-suite" },
      { label: "Onboarding & offboarding", href: "/it-suite" },
      { label: "Payslip generator", href: "/finance-suite" },
      { label: "Loans & advances", href: "/finance-suite" },
      { label: "Exit & F&F", href: "/finance-suite" },
    ],
    copyright: "© 2026 Uptrix. All rights reserved.",
    madeFor: "Made for HR, IT and Finance teams",
  },
};

export const hrmsDefaults = {
  // Pages rendered from their templates (home now; HR and IT to follow).
  pages: HRMS_PAGE_DEFAULTS,
  ...HOME_TEXT,
  submenu: SUBMENU,
  orbit: ORBIT,
  dayHeading: { kicker: "A day in Uptrix", title: "One Tuesday at Demo Company.", lead: "Six moments, three teams, one record — scroll through a normal working day." },
  day: { items: DAY },
  rolesHeading: { kicker: "For every role", title: "See Uptrix through", titleAccent: "your eyes." },
  roles: { items: ROLES },
  questionsHeading: { kicker: "Questions it answers", title: "Questions, answered in seconds." },
  questions: { items: QUESTIONS },
  promisesHeading: { kicker: "How we build", title: "Three promises behind every screen.", lead: "Uptrix is built around a few simple ideas — so it stays easy as your company grows." },
  principles: { items: PRINCIPLES },
  interview: {
    kicker: "In conversation",
    heading: "“We stopped being the company’s help desk.”",
    banner: "Sample interview — replace with a real customer before launch",
    customerName: "[Customer name]",
    customerRole: "[Head of HR], [Company] · [City]",
    photoAlt: "A team in a meeting room listening to a colleague present",
    items: INTERVIEW,
  },
  setupHeading: { kicker: "Get started", title: "Your first week,", titleAccent: "checked off.", lead: "Tick through the setup the way our customers do. Most teams finish it in their first week." },
  setup: { items: SETUP },
  hrSuite: suiteDefaults.hr,
  itSuite: suiteDefaults.it,
  financeSuite: suiteDefaults.finance,
};

export type HrmsContent = typeof hrmsDefaults;
export type HomeContent = HrmsContent;
export type SuiteContent = HrmsContent["hrSuite"];

const SUITE_PATHS: Record<SuiteKey, string> = { hr: "/hr-suite", it: "/it-suite", finance: "/finance-suite" };

export function iconPath(name: string): string {
  return (ICON as Record<string, string>)[name] ?? ICON.doc;
}

export function accentOf(key: string): Accent {
  return ACCENTS[key] ?? ACCENTS.hr;
}

/** The home page content with icons and colours resolved, ready for the components. */
export function resolveHome(h: HomeContent) {
  return {
    ...h,
    submenu: h.submenu.map((s) => ({ ...s, icon: iconPath(s.icon), accent: accentOf(s.accent) })),
    orbit: h.orbit.map((o) => ({ ...o, icon: iconPath(o.icon), accent: accentOf(o.accent) })),
    day: { ...h.day, items: h.day.items.map((d) => ({ ...d, accent: accentOf(d.accent) })) },
    roles: {
      ...h.roles,
      items: h.roles.items.map((r) => ({
        ...r,
        rows: r.rows.map((x) => ({ ...x, icon: iconPath(x.icon), accent: accentOf(x.accent), tone: x.tone as Tone })),
      })),
    },
    questions: { ...h.questions, items: h.questions.items.map((q) => ({ ...q, accent: accentOf(q.accent) })) },
    setup: { ...h.setup, items: h.setup.items },
  };
}

/** One suite page's content with icons resolved and the page path added. */
export function resolveSuite(key: SuiteKey, s: SuiteContent): Suite {
  return {
    ...s,
    key,
    path: SUITE_PATHS[key],
    icon: iconPath(s.icon),
    mods: s.mods.map((m) => ({ ...m, icon: iconPath(m.icon), rows: m.rows.map((r) => ({ ...r, tone: r.tone as Tone })) })),
    connections: s.connections.map((c) => ({ ...c, icon: iconPath(c.icon) })),
    steps: s.steps.map((st) => ({ ...st, rows: st.rows.map((r) => ({ ...r, tone: r.tone as Tone })) })),
  } as unknown as Suite;
}
