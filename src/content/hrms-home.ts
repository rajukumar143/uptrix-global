// Copy for the HRMS home page, served on hrms.uptrixglobal.com (rewritten from "/" in src/middleware.ts).
// From the design: the orbit, the day, the role tabs for Employee, Manager, HR and IT, and the Finance intro.
// Written for the page (not in the paste, which was cut off): the Finance role rows, the questions, the principles
// and the setup checklist. Check them before launch.
import { ICON } from "@/content/suites";
import { HRMS_SUBDOMAIN_URL } from "@/content/hrms";

export type Tone = "ok" | "wait" | "info" | "new";
export type Accent = { bg: string; fg: string };

export const ACCENT = {
  hr: { bg: "#EFEAFF", fg: "#3F289D" },
  it: { bg: "#E3EFFC", fg: "#0058B0" },
  finance: { bg: "#E6F4E0", fg: "#2E6B1E" },
  ai: { bg: "#FFF1DC", fg: "#8A4600" },
} as const satisfies Record<string, Accent>;

export const TONE_STYLE: Record<Tone, Accent> = {
  ok: { bg: "#E6F4E0", fg: "#2E6B1E" },
  wait: { bg: "#FFF1DC", fg: "#8A4600" },
  info: { bg: "#E3EFFC", fg: "#0058B0" },
  new: { bg: "#EFEAFF", fg: "#3F289D" },
};

export const SUBMENU = [
  { label: "HR Suite", href: "/hr-suite", description: "People, time and policies", icon: ICON.people, accent: ACCENT.hr },
  { label: "IT Suite", href: "/it-suite", description: "Tickets, assets, joiners", icon: ICON.laptop, accent: ACCENT.it },
  { label: "Finance Suite", href: "/finance-suite", description: "Payslips, loans, F&F", icon: ICON.receipt, accent: ACCENT.finance },
];

export const ORBIT = [
  { name: "HR Suite", note: "Attendance · leave · shifts", icon: ICON.people, accent: ACCENT.hr, pos: "left-0 top-[6%]" },
  { name: "IT Suite", note: "Tickets · assets", icon: ICON.laptop, accent: ACCENT.it, pos: "right-[-2%] top-[14%]" },
  { name: "Finance Suite", note: "Payslips · loans · F&F", icon: ICON.receipt, accent: ACCENT.finance, pos: "left-[4%] bottom-[4%]" },
];

export const DAY = [
  { time: "09:02", init: "AR", who: "Anil R.", role: "Engineering", what: "Checks in from his phone on the way to his desk.", suite: "HR Suite", accent: ACCENT.hr, dot: "#3F289D" },
  { time: "10:15", init: "RS", who: "Riya S.", role: "New joiner", what: "Starts day one with her laptop, email and ID card ready.", suite: "IT Suite", accent: ACCENT.it, dot: "#0067CC" },
  { time: "11:30", init: "SK", who: "Sneha K.", role: "Sales", what: "Applies for Friday off — her manager approves in one tap.", suite: "HR Suite", accent: ACCENT.hr, dot: "#3F289D" },
  { time: "14:05", init: "MP", who: "Manoj P.", role: "Operations", what: "Raises a ticket: “VPN isn’t connecting.” IT picks it up in minutes.", suite: "IT Suite", accent: ACCENT.it, dot: "#0067CC" },
  { time: "16:40", init: "FT", who: "Finance team", role: "Payroll", what: "Reviews four payroll exceptions instead of 248 payslips.", suite: "Finance Suite", accent: ACCENT.finance, dot: "#51AD38" },
  { time: "18:30", init: "AR", who: "Anil R.", role: "Engineering", what: "Asks the AI how many leaves he has left. It answers instantly.", suite: "AI Assistant", accent: ACCENT.ai, dot: "#FF9609" },
];

export type RoleRow = { icon: string; accent: Accent; a: string; b: string; t: string; tone: Tone };
export type Role = { name: string; headline: string; screen: string; meta: string; points: string[]; rows: RoleRow[] };

export const ROLES: Role[] = [
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
      { icon: ICON.clock, accent: ACCENT.hr, a: "Checked in 09:02", b: "Morning shift · 09:00–18:00", t: "On time", tone: "ok" },
      { icon: ICON.calendar, accent: ACCENT.hr, a: "Leave balance", b: "14 days left this year", t: "View", tone: "info" },
      { icon: ICON.receipt, accent: ACCENT.finance, a: "Payslip · October", b: "Net ₹ 70,650", t: "Ready", tone: "ok" },
      { icon: ICON.spark, accent: ACCENT.ai, a: "Ask Uptrix AI", b: "“Which shift am I on next week?”", t: "New", tone: "new" },
    ],
  },
  {
    name: "Manager",
    headline: "Your team at a glance — and approvals in one tap.",
    screen: "My team · Sales",
    meta: "12 people",
    points: ["See who is in, late or out today", "Approve leave and shift swaps from anywhere", "Run reviews for your direct reports"],
    rows: [
      { icon: ICON.people, accent: ACCENT.hr, a: "11 of 12 in today", b: "1 on casual leave", t: "Live", tone: "info" },
      { icon: ICON.calendar, accent: ACCENT.hr, a: "Sneha K. · Friday off", b: "Casual leave · 1 day", t: "Approve", tone: "wait" },
      { icon: ICON.shift, accent: ACCENT.hr, a: "Shift swap request", b: "Arjun → morning, Thu", t: "Approve", tone: "wait" },
      { icon: ICON.trend, accent: ACCENT.hr, a: "Q4 reviews", b: "8 of 12 submitted", t: "On track", tone: "ok" },
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
      { icon: ICON.people, accent: ACCENT.hr, a: "3 new joiners this week", b: "Onboarding checklists running", t: "In progress", tone: "info" },
      { icon: ICON.calendar, accent: ACCENT.hr, a: "4 leave requests", b: "Waiting for managers", t: "Pending", tone: "wait" },
      { icon: ICON.doc, accent: ACCENT.hr, a: "WFH policy v2", b: "96% acknowledged", t: "Published", tone: "ok" },
      { icon: ICON.spark, accent: ACCENT.ai, a: "412 AI questions", b: "6 in 10 answered by AI", t: "This month", tone: "new" },
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
      { icon: ICON.ticket, accent: ACCENT.it, a: "#1043 Laptop not charging", b: "Anil R. · Dell Latitude 5440", t: "High", tone: "wait" },
      { icon: ICON.ticket, accent: ACCENT.it, a: "#1041 VPN access", b: "Manoj P.", t: "In progress", tone: "info" },
      { icon: ICON.laptop, accent: ACCENT.it, a: "Laptop for Riya S.", b: "Joins Monday", t: "Ready", tone: "ok" },
      { icon: ICON.laptop, accent: ACCENT.it, a: "ID card #0218", b: "Return due at exit", t: "Due", tone: "wait" },
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
      { icon: ICON.receipt, accent: ACCENT.finance, a: "Payroll run", b: "248 payslips ready", t: "Ready", tone: "ok" },
      { icon: ICON.wallet, accent: ACCENT.finance, a: "Loan EMIs", b: "23 recovered this month", t: "Applied", tone: "ok" },
      { icon: ICON.building, accent: ACCENT.finance, a: "Exit settlement", b: "Manoj P. · exit 15 Nov", t: "Review", tone: "wait" },
      { icon: ICON.doc, accent: ACCENT.finance, a: "Audit trail", b: "Every approval saved", t: "Logged", tone: "info" },
    ],
  },
];

// From the PDF: the six questions on the home page.
export const QUESTIONS = [
  { q: "Who’s on leave today?", a: "A live list for every manager, with the reason and return date.", who: "Manager", module: "Leave", accent: ACCENT.hr, top: "#3F289D" },
  { q: "Why is my salary lower this month?", a: "One unpaid leave day on 21 Oct — shown line by line on the payslip.", who: "Employee", module: "Payslips", accent: ACCENT.finance, top: "#51AD38" },
  { q: "Which laptop does Riya have?", a: "Dell Latitude 5440, assigned on day one, linked to her profile.", who: "IT", module: "Assets", accent: ACCENT.it, top: "#0067CC" },
  { q: "Has everyone read the new WFH policy?", a: "96% have acknowledged version 2 — reminders go to the rest.", who: "HR", module: "Policies", accent: ACCENT.hr, top: "#3F289D" },
  { q: "How much do we owe Manoj at exit?", a: "₹ 35,100 after leave encashment and loan recovery.", who: "Finance", module: "F&F", accent: ACCENT.finance, top: "#51AD38" },
  { q: "Which shift am I on next week?", a: "Morning, Monday to Friday — answered by the AI in a second.", who: "Employee", module: "AI Assistant", accent: ACCENT.ai, top: "#FF9609" },
];

// From the PDF: the three promises.
export const PRINCIPLES = [
  { n: "01", t: "One record for everyone", d: "An employee is entered once. HR, IT and Finance all work from that same record.", c: "#3F289D" },
  { n: "02", t: "Every role, its own view", d: "Employees, managers, HR, IT and Finance each see exactly what they need — and only that.", c: "#0067CC" },
  { n: "03", t: "Plain-language help", d: "The AI Assistant answers everyday questions in plain words, from your own data and policies.", c: "#FF9609" },
];

// From the PDF: the setup checklist. The first item starts ticked.
export const SETUP = [
  { t: "Add your people", d: "Employees, departments and managers", when: "Day 1" },
  { t: "Set your rules", d: "Leave types, shifts and holidays", when: "Day 1" },
  { t: "Publish your policies", d: "Employees acknowledge them in the app", when: "Day 2" },
  { t: "Invite your team", d: "Everyone signs in with Google", when: "Day 3" },
  { t: "Run your first payroll", d: "With the Finance Suite", when: "Month end" },
];

// From the PDF: the sample interview. Replace with a real customer before launch.
export const INTERVIEW = [
  { q: "What changed first?", a: "Leave. Requests used to live in email threads and a spreadsheet nobody trusted. Now balances update themselves." },
  { q: "How did employees react?", a: "They liked doing things themselves — checking in, downloading payslips, asking the assistant instead of us." },
  { q: "What about payroll?", a: "Attendance and approved leave flow straight in. We only look at the handful of exceptions each month." },
  { q: "Would you do anything differently?", a: "Start with the HR Suite, then add IT and Finance. That’s exactly how we rolled it out." },
];

export const HOME_LINKS = {
  app: "https://hrms.tarunkyadari.in/login",
  subdomain: HRMS_SUBDOMAIN_URL,
};
