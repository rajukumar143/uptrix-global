// Copy for the Uptrix HRMS product landing page (/hrms).
// Facts come from the live product at https://hrms.tarunkyadari.in: its marketing text, its six feature names,
// its five roles and seven departments, and its sign-in options. Role responsibilities are a plain-language
// summary and should be checked against the product before launch.
// PLACEHOLDERS to replace before launch: PHONE_*, EMAIL, and the proof figures in PROOF.

export const HRMS_PATH = "/hrms";
export const APP_URL = "https://hrms.tarunkyadari.in/login";

export const PHONE_DISPLAY = "+91 00000 00000"; // placeholder
export const PHONE_HREF = "tel:+910000000000"; // placeholder
export const EMAIL = "sales@example.com"; // placeholder

export const SEO = {
  title: "Uptrix HRMS | Employee, Attendance, Leave & Payroll Software",
  description:
    "Uptrix HRMS is multi-tenant HR software for employees, attendance, leave, payroll and reports, with role-based access for every team.",
  keywords: [
    "HRMS software India",
    "attendance and payroll software India",
    "employee management system India",
    "multi-tenant HRMS",
    "role based HR software",
  ],
};

export const HERO = {
  eyebrow: "Uptrix HRMS  ·  Multi-tenant SaaS",
  h1: "Simplify HR management for a smarter workplace",
  subheadline:
    "Manage employees, attendance, leave, payroll and reports in one platform. Role-based access gives each person the right view, from super admin to employee.",
  primaryCta: "Try the live demo",
  secondaryCta: "Book a demo",
  note: "Sign in with a demo account to explore every role. No setup needed.",
};

// Figures the product itself shows. Change them if the demo data changes.
export const PROOF = [
  { value: "11", label: "Demo accounts to explore" },
  { value: "5", label: "Roles, from super admin to employee" },
  { value: "7", label: "Departments in the demo" },
  { value: "6", label: "Core modules in one platform" },
];

export type Feature = { icon: string; name: string; text: string };

export const FEATURES: Feature[] = [
  {
    icon: "users",
    name: "Employee Management",
    text: "One directory for every employee, with department, role and reporting details on each profile.",
  },
  {
    icon: "clock",
    name: "Attendance & Leave",
    text: "Track attendance and manage leave requests and balances, with approvals routed to the right manager.",
  },
  {
    icon: "wallet",
    name: "Payroll & Billing",
    text: "Run payroll and billing from the same employee records that attendance and leave feed into.",
  },
  {
    icon: "chart",
    name: "Reports & Analytics",
    text: "See headcount, attendance, leave and payroll trends in reports that each role can open.",
  },
  {
    icon: "shield",
    name: "Role Based Access",
    text: "Each person sees only what their role allows. Access is set by role, not by sharing one login.",
  },
  {
    icon: "building",
    name: "Multi-Tenant SaaS Control",
    text: "Run many companies on one platform, each with its own employees, while the platform owner keeps control.",
  },
];

export type Role = { name: string; scope: string; points: string[]; badge: string };

// Roles as they appear in the product's demo list, with a plain-language summary of each.
export const ROLES: Role[] = [
  {
    name: "Super Admin",
    badge: "Platform",
    scope: "Owns the whole platform and every company on it.",
    points: ["Sees all departments and companies", "Controls platform-wide settings", "Manages access for admins"],
  },
  {
    name: "Admin",
    badge: "Company",
    scope: "Runs one company's setup and day-to-day administration.",
    points: ["Manages company settings and departments", "Oversees employee records", "Reviews company-wide reports"],
  },
  {
    name: "HR",
    badge: "People",
    scope: "Looks after employee records, leave and HR processes.",
    points: ["Maintains employee profiles", "Handles leave and attendance follow-up", "Prepares payroll inputs"],
  },
  {
    name: "Manager",
    badge: "Team lead",
    scope: "Leads a team and approves its work.",
    points: ["Approves team leave requests", "Views team attendance", "Follows up on team tickets and tasks"],
  },
  {
    name: "Employee",
    badge: "Self-service",
    scope: "Manages their own work and records.",
    points: ["Checks attendance and leave balance", "Applies for leave", "Views their own details and reports"],
  },
];

export const DEPARTMENTS = [
  { name: "Administration", note: "Company setup and admin" },
  { name: "Human Resources", note: "Records, leave and HR process" },
  { name: "IT Team", note: "Internal technology work" },
  { name: "IT Tickets", note: "Request queue for IT support" },
  { name: "Digital Marketing", note: "Campaign and content team" },
  { name: "Finance", note: "Payroll and billing" },
  { name: "Platform", note: "Super admin and platform owners" },
];

export const HOW_IT_WORKS = [
  {
    step: "Set up the company",
    text: "Create the company workspace, add departments and assign roles to the people who will run it.",
  },
  {
    step: "Add employees",
    text: "Bring in employee records with their department, manager and role so every module starts from one directory.",
  },
  {
    step: "Run the work",
    text: "Record attendance, approve leave, process payroll and review reports, all from the same records.",
  },
];

export const TENANT = {
  heading: "One platform, many companies",
  body:
    "Each company gets its own workspace and employee records. The platform owner sees across every company from one place, and each company's admins see only their own.",
  points: [
    "Separate workspace for every company",
    "Platform-wide control for the super admin",
    "Company admins manage only their own people",
  ],
};

export const SECURITY = {
  heading: "Sign in your way, with access that matches the role",
  body:
    "Employees sign in with their username or email and password, or with Google. Forgotten passwords can be reset from the sign-in page. Role-based access decides what each person can see and change.",
  points: [
    "Username or email with password sign-in",
    "Continue with Google",
    "Password reset from the sign-in page",
    "Access decided by role, for every module",
  ],
};

export const FAQS = [
  {
    q: "What is Uptrix HRMS?",
    a: "Uptrix HRMS is a web-based HR platform. It brings employee management, attendance, leave, payroll and reports into one system, with role-based access for each team.",
  },
  {
    q: "Who uses it?",
    a: "Super admins run the platform, company admins set up each company, HR manages employee records, managers approve their team's work, and employees manage their own details, attendance and leave.",
  },
  {
    q: "Can one platform serve several companies?",
    a: "Yes. The product is multi-tenant. Each company has its own workspace, and the platform owner controls the whole system.",
  },
  {
    q: "How do I try it before buying?",
    a: "Open the live demo and use one of the demo accounts. Each account is set to a different role and department, so you can see what each person in your company would see.",
  },
  {
    q: "Can employees sign in with Google?",
    a: "Yes. The sign-in page offers Continue with Google alongside username or email and password.",
  },
  {
    q: "How is access controlled?",
    a: "Access is set by role. Each person sees only what their role allows, so a manager does not see the admin's company settings and an employee sees only their own records.",
  },
  {
    q: "What if I forget my password?",
    a: "Use Forgot Password on the sign-in page to reset it. If you have no account yet, contact your company administrator.",
  },
  {
    q: "How do I get a demo or pricing?",
    a: "Book a demo from this page and our team will confirm a time. Pricing depends on company size and modules, and we will share it on the call.",
  },
];

export const DEMO_FORM = {
  heading: "Book a demo for your company",
  intro: "We will walk through the roles and modules your team needs and set up a trial workspace for you.",
  companySizes: ["1 to 50 employees", "51 to 200 employees", "201 to 500 employees", "501 to 2,000 employees", "More than 2,000"],
  suites: ["All modules", "Employee management", "Attendance and leave", "Payroll and billing", "Reports and access control"],
  submit: "Book a Demo",
  sending: "Sending...",
  success: "Thanks. We will confirm your demo time shortly.",
  privacy: "We use your details only to arrange your demo. We do not share them with third parties.",
};

// Public address of the HRMS subdomain. The main site's "Uptrix HRMS" link points here.
export const HRMS_SUBDOMAIN_URL = process.env.HRMS_SITE_URL || "https://hrms.uptrixglobal.com";
