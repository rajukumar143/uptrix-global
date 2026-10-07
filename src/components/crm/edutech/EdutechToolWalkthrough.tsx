"use client";

import { useState } from "react";
import Link from "next/link";
import { btnPrimary, container, h2 } from "@/components/crm/styles";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  group: string;
  headline: string;
  tagline: string;
  whyEdutechNeedsIt: string;
  keyCapabilities: string[];
  mockData: {
    title: string;
    metrics: { label: string; value: string; color?: string }[];
    rows: { col1: string; col2: string; col3: string; badge?: string }[];
  };
}

const MENU_SECTIONS: {
  groupId: string;
  title: string;
  icon: string;
  items: MenuItem[];
}[] = [
  {
    groupId: "dashboard",
    title: "DASHBOARD",
    icon: "📊",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "⚡",
        group: "Dashboard",
        headline: "Real-Time Admissions Command Center",
        tagline: "Track today's enquiries, counselor call volume, and confirmed fee collections at a glance.",
        whyEdutechNeedsIt:
          "Principals and Admissions Directors no longer have to wait for end-of-day Excel reports. See instant campus-wide admission health on one screen.",
        keyCapabilities: [
          "Live counter for today's new student inquiries across all campuses",
          "Conversion velocity by course (JEE, NEET, K-12, MBA)",
          "Immediate alerts on uncalled leads exceeding SLA (> 15 mins)",
          "Daily token fee collection summary and seat booking velocity",
        ],
        mockData: {
          title: "Admissions Command Center • Today",
          metrics: [
            { label: "Today's Enquiries", value: "148 Leads", color: "text-white" },
            { label: "Talk Time Today", value: "38.4 Hours", color: "text-emerald-400" },
            { label: "Fees Collected", value: "₹4.85 Lakh", color: "text-[#5fe0ad]" },
            { label: "Conversion Rate", value: "18.2%", color: "text-indigo-300" },
          ],
          rows: [
            { col1: "JEE Advanced 2026 Batch", col2: "42 enquiries • 12 demos booked", col3: "8 Confirmed", badge: "High Demand" },
            { col1: "NEET Medical Fast-Track", col2: "36 enquiries • 9 campus visits", col3: "6 Confirmed", badge: "85% Target" },
            { col1: "Grade 11 CBSE Science", col2: "28 enquiries • 14 counseling calls", col3: "5 Confirmed", badge: "Seats 92% Full" },
          ],
        },
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "📈",
        group: "Dashboard",
        headline: "Campaign-to-Fee Attribution & Performance Reports",
        tagline: "Know the exact cost-per-admission for Meta, Google, Shiksha, and education fair campaigns.",
        whyEdutechNeedsIt:
          "Institutes spend lakhs on digital ads and hoardings every season without knowing which source actually generated paid admissions. Uptrix links every rupee spent to student fee receipts.",
        keyCapabilities: [
          "Attribution breakdown: Meta Leads vs Google Search vs CollegeDunia vs Walk-ins",
          "Counselor performance league table (Talk-time vs Paid Conversions)",
          "Batch-wise conversion funnel leak analysis",
          "Historical admission season trend comparisons",
        ],
        mockData: {
          title: "Marketing Attribution & Cost Per Admission",
          metrics: [
            { label: "Avg Cost / Admission", value: "₹2,140", color: "text-emerald-400" },
            { label: "Top ROI Source", value: "Meta Ads (3.8x)", color: "text-white" },
            { label: "Walk-in Conversion", value: "44.6%", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Meta Lead Gen (Scholarship Exam)", col2: "340 Leads • ₹42k Spent", col3: "24 Admitted (₹1,750 / CPA)", badge: "Highest ROI" },
            { col1: "Google Search (Best Coaching Near Me)", col2: "180 Leads • ₹68k Spent", col3: "18 Admitted (₹3,770 / CPA)", badge: "High Intent" },
            { col1: "CollegeDunia & Shiksha Portals", col2: "115 Leads • ₹35k Spent", col3: "11 Admitted (₹3,180 / CPA)", badge: "Steady" },
          ],
        },
      },
    ],
  },
  {
    groupId: "lead_management",
    title: "LEAD MANAGEMENT",
    icon: "🎯",
    items: [
      {
        id: "leads",
        label: "Leads",
        icon: "👥",
        group: "Lead Management",
        headline: "Omnichannel Student Enquiry Repository",
        tagline: "Every website query, social ad lead, walk-in, and portal enquiry in one filterable roster.",
        whyEdutechNeedsIt:
          "No more lost sticky notes or messy WhatsApp exports. Every student record contains their complete interaction history, course preferences, and counselor notes.",
        keyCapabilities: [
          "Auto-deduplication by phone number and email across all sources",
          "Filter by Course, Academic Year, Preferred Campus, and Follow-up Status",
          "Bulk WhatsApp brochure dispatch with 1-click verified templates",
          "Instant export/import with field mapping for previous years' databases",
        ],
        mockData: {
          title: "Active Admissions Queue • Filtered: Unassigned + High Intent",
          metrics: [
            { label: "Active Pipeline", value: "842 Students", color: "text-white" },
            { label: "Uncontacted", value: "14 Leads", color: "text-amber-400" },
            { label: "Demo Scheduled", value: "68 Students", color: "text-emerald-400" },
          ],
          rows: [
            { col1: "Aarav Sharma • +91 98450...", col2: "JEE 2-Yr Prep • Meta Ad", col3: "WhatsApp Sent (12s ago)", badge: "New Lead" },
            { col1: "Ananya Deshmukh • +91 98211...", col2: "Grade 11 Commerce • Walk-in", col3: "Visit Scheduled: Tomorrow 4 PM", badge: "Warm" },
            { col1: "Karthik Iyer • +91 99002...", col2: "NEET Medical • Google Search", col3: "Counsellor Call in Progress", badge: "Calling" },
          ],
        },
      },
      {
        id: "counsellor_management",
        label: "Counsellor Management",
        icon: "👤",
        group: "Lead Management",
        headline: "Smart Counselor Routing & Lead Ownership",
        tagline: "Automated round-robin allocation by course expertise, branch location, and counselor availability.",
        whyEdutechNeedsIt:
          "Prevents counselor lead hoarding and ensures fair distribution. If a counselor doesn't call within 30 minutes, leads auto-escalate to the next available team member.",
        keyCapabilities: [
          "Course-wise assignment: Medical leads to biology counselors, engineering to maths counselors",
          "Workload balancing so top performers get prioritized flow",
          "Automated reassignment rules if initial follow-up is delayed",
          "Individual counselor performance targets and quota progress",
        ],
        mockData: {
          title: "Counselor Allocation Matrix & Live Availability",
          metrics: [
            { label: "Active Counselors", value: "14 On-Duty", color: "text-emerald-400" },
            { label: "Avg First Response", value: "1 min 18s", color: "text-white" },
            { label: "Lead Quota / Day", value: "35 Leads", color: "text-indigo-300" },
          ],
          rows: [
            { col1: "Priya Nair (Engineering Specialist)", col2: "24 leads handled today • 4 demos booked", col3: "94% On-Time", badge: "Top Performer" },
            { col1: "Rohan Varma (Medical Specialist)", col2: "22 leads handled today • 3 admissions", col3: "91% On-Time", badge: "Available" },
            { col1: "Kavita Rao (Foundation & K-12)", col2: "19 leads handled today • 5 visits", col3: "96% On-Time", badge: "In Call" },
          ],
        },
      },
      {
        id: "attendance",
        label: "Attendance",
        icon: "📅",
        group: "Lead Management",
        headline: "Counselor Attendance & Shift Punch-In Tracking",
        tagline: "Ensure counselors are on the floor and ready to receive calls during peak enquiry hours.",
        whyEdutechNeedsIt:
          "Admissions centers often face unannounced absenteeism during peak seasons. Uptrix ensures leads are only assigned to counselors currently punched in and active.",
        keyCapabilities: [
          "Geo-tagged and browser-based daily punch-in/punch-out",
          "Automatic pausing of lead allocation when a counselor is on leave or break",
          "Monthly attendance logs exportable for HR payroll processing",
          "Shift scheduling for morning and evening admissions counseling desks",
        ],
        mockData: {
          title: "Admissions Team Daily Attendance Roster",
          metrics: [
            { label: "Present Today", value: "14 / 15 Staff", color: "text-emerald-400" },
            { label: "On Shift", value: "9:00 AM - 6:30 PM", color: "text-white" },
            { label: "Late Punch-ins", value: "0 Today", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Priya Nair • Emp #104", col2: "Punch In: 08:54 AM • Desk Phone Active", col3: "Online (Lead Routing Active)", badge: "Present" },
            { col1: "Rohan Varma • Emp #108", col2: "Punch In: 08:58 AM • Desk Phone Active", col3: "Online (Lead Routing Active)", badge: "Present" },
            { col1: "Kavita Rao • Emp #112", col2: "Punch In: 09:02 AM • Desk Phone Active", col3: "Online (Lead Routing Active)", badge: "Present" },
          ],
        },
      },
      {
        id: "work_log",
        label: "Work Log / Activities",
        icon: "📝",
        group: "Lead Management",
        headline: "Complete Call History, Recordings & Disposition Notes",
        tagline: "Verify every interaction: see call durations, student objections, and scheduled callbacks.",
        whyEdutechNeedsIt:
          "Parents often call back asking for details discussed with another staff member. Complete interaction histories let any counselor pick up the conversation with full context.",
        keyCapabilities: [
          "1-click call disposition logging: Interested, Demo Booked, Fee Follow-up, Dropped",
          "Call recording attachments for quality assurance and training",
          "Timestamped notes on student grades, budget constraints, and sibling details",
          "Scheduled callback calendar with automated desktop and mobile alerts",
        ],
        mockData: {
          title: "Counseling Activity Log & Call Records",
          metrics: [
            { label: "Calls Logged Today", value: "184 Calls", color: "text-white" },
            { label: "Avg Call Duration", value: "4m 12s", color: "text-emerald-400" },
            { label: "Notes Recorded", value: "142 Entries", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Call with Parent (Student: Aarav S.)", col2: "Priya N. • 6m 40s • Discussed JEE 2026 Batch", col3: "Demo Lecture Booked for Saturday", badge: "Demo Booked" },
            { col1: "Call with Student (Meera N.)", col2: "Rohan V. • 3m 15s • Sent NEET Fee Structure", col3: "Parent Call Back at 7:30 PM", badge: "Callback Set" },
            { col1: "Walk-in Counseling (Rohan G.)", col2: "Kavita R. • 22m 00s • Campus Tour Completed", col3: "Token Fee Promised tomorrow", badge: "High Intent" },
          ],
        },
      },
      {
        id: "team_activity",
        label: "Today's Team Activity",
        icon: "⚡",
        group: "Lead Management",
        headline: "Live Real-Time Activity Feed for Admissions Managers",
        tagline: "Watch your admissions floor in real-time: calls happening right now, demos booked, and deals closing.",
        whyEdutechNeedsIt:
          "Management gets continuous pulse on team productivity throughout the day. Spot bottlenecks before the day ends.",
        keyCapabilities: [
          "Real-time stream of all calls, WhatsApp messages, and status updates as they happen",
          "Instant celebration alerts when student fee tokens are collected",
          "Real-time counselor talk-time leaderboards that motivate the team",
          "Flagging of stale inquiries untouched for more than 2 hours",
        ],
        mockData: {
          title: "Live Activity Ticker • Stream Updating Live",
          metrics: [
            { label: "Current Active Calls", value: "6 Live", color: "text-emerald-400" },
            { label: "Demos Booked Today", value: "24 Demos", color: "text-white" },
            { label: "Tokens Received", value: "8 Payments", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Just now • Counselor Priya N.", col2: "Logged enrollment payment for JEE Advanced", col3: "Token Fee: ₹25,000", badge: "Admission Won!" },
            { col1: "2m ago • Counselor Rohan V.", col2: "Scheduled Chemistry Demo Class for NEET candidate", col3: "Date: Friday 4:00 PM", badge: "Demo Class" },
            { col1: "4m ago • Counselor Kavita R.", col2: "Completed campus tour with parent of Grade 11 student", col3: "Form #CBSE-412", badge: "Visit Completed" },
          ],
        },
      },
    ],
  },
  {
    groupId: "finance",
    title: "FINANCE",
    icon: "💳",
    items: [
      {
        id: "payments",
        label: "Payments",
        icon: "💳",
        group: "Finance",
        headline: "Tuition Token Fees, Installments & Receipt Engine",
        tagline: "Track seat reservation tokens, installment plans, and scholarship fee concessions.",
        whyEdutechNeedsIt:
          "The biggest leak between 'admission confirmed' and 'actual revenue' is delayed fee follow-ups. Uptrix records payment links, cheques, and UPI tokens in sync with accounts.",
        keyCapabilities: [
          "Generate instant branded payment links and send to parents via WhatsApp",
          "Track multi-part installment schedules with automated upcoming due alerts",
          "Record offline cash, DD, and cheque payments with receipt upload",
          "Automated digital admission receipts sent instantly to parents upon payment",
        ],
        mockData: {
          title: "Student Fee Ledger & Token Collections",
          metrics: [
            { label: "Collected This Month", value: "₹48.2 Lakh", color: "text-emerald-400" },
            { label: "Pending Installments", value: "₹12.4 Lakh", color: "text-amber-400" },
            { label: "Payment Success Rate", value: "99.2%", color: "text-white" },
          ],
          rows: [
            { col1: "Aarav Sharma • Rec #UP-9021", col2: "Token Fee • JEE Advanced 2-Yr Batch", col3: "₹25,000 Paid via UPI", badge: "Verified" },
            { col1: "Ananya Deshmukh • Rec #UP-9022", col2: "Term 1 Tuition Fee • Grade 11 CBSE", col3: "₹45,000 Paid via NetBanking", badge: "Verified" },
            { col1: "Karthik Iyer • Rec #UP-9023", col2: "Seat Booking Deposit • NEET Dropper Batch", col3: "₹20,000 Paid at Cash Counter", badge: "Cash Receipt" },
          ],
        },
      },
      {
        id: "bank_accounts",
        label: "Bank Accounts",
        icon: "🏦",
        group: "Finance",
        headline: "Multi-Branch Bank Routing & Accounts Reconciliation",
        tagline: "Route payments from different campuses or courses into distinct institutional accounts.",
        whyEdutechNeedsIt:
          "Institutions with multiple branches or trust accounts need collections routed directly to the right bank account without manual bookkeeping confusion.",
        keyCapabilities: [
          "Map separate bank accounts and UPI IDs per campus branch",
          "Automated reconciliation between CRM receipts and bank settlements",
          "Separate account routing for School Trust vs Coaching Society",
          "Download ready-to-import ledger reports for Tally, Zoho Books, or ERPs",
        ],
        mockData: {
          title: "Institutional Accounts & Settlement Routing",
          metrics: [
            { label: "Connected Accounts", value: "4 Accounts", color: "text-white" },
            { label: "Today's Settlement", value: "₹4.85 Lakh", color: "text-emerald-400" },
            { label: "Pending Recon", value: "₹0 (100% Matched)", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "HDFC Bank • Main Campus Admissions (A/C ...4812)", col2: "Settled: ₹2.40 Lakh today", col3: "Branch: Central Campus", badge: "Active" },
            { col1: "ICICI Bank • South Branch Education Trust (A/C ...9104)", col2: "Settled: ₹1.65 Lakh today", col3: "Branch: South City", badge: "Active" },
            { col1: "Axis Bank • Online EdTech Operations (A/C ...3320)", col2: "Settled: ₹80,000 today", col3: "Online Programs", badge: "Active" },
          ],
        },
      },
    ],
  },
  {
    groupId: "administration",
    title: "ADMINISTRATION",
    icon: "⚙️",
    items: [
      {
        id: "manage_fields",
        label: "Manage Fields",
        icon: "🎛️",
        group: "Administration",
        headline: "Tailor Custom Fields for Any Academic Course",
        tagline: "Add custom dropdowns, text fields, and document requirements without writing a single line of code.",
        whyEdutechNeedsIt:
          "Every institute has unique data requirements: Entrance Exam Roll No, 10th Board Marks, Mother Tongue, Bus Route, Sibling Details. Uptrix lets you customize forms instantly.",
        keyCapabilities: [
          "Drag-and-drop form field builder for Student Inquiry and Admission forms",
          "Add Course Pickers, Batch Schedules, Scholarship Tiers, and School Board tags",
          "Mark fields mandatory for counselors before advancing stages",
          "Conditional fields that appear based on course selection (e.g., NEET vs JEE)",
        ],
        mockData: {
          title: "Custom Academic Fields Configuration",
          metrics: [
            { label: "Custom Fields Active", value: "24 Fields", color: "text-white" },
            { label: "Required Fields", value: "8 Enforced", color: "text-emerald-400" },
            { label: "Document Types", value: "6 Checklists", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Course Interest (Dropdown)", col2: "Options: JEE Advanced, NEET, Foundation, Olympiad", col3: "Appears on: Lead Form", badge: "Mandatory" },
            { col1: "Previous Board Percentage (Number)", col2: "Range: 40% - 100% with Marksheet Attachment", col3: "Appears on: Counseling", badge: "Mandatory" },
            { col1: "Scholarship Test Score / Discount Tier", col2: "Tier A (50%), Tier B (30%), Tier C (15%), None", col3: "Appears on: Fee Stage", badge: "Active" },
          ],
        },
      },
      {
        id: "users",
        label: "Users & Role Permissions",
        icon: "👤",
        group: "Administration",
        headline: "Granular Role-Based Access for Academic Staff",
        tagline: "Counselors see only their assigned students; Branch Heads see their campus; Directors see everything.",
        whyEdutechNeedsIt:
          "Student data privacy is paramount. Prevent counselors from exporting competitor lists or viewing other branches' financial data.",
        keyCapabilities: [
          "Role presets: Managing Director, Campus Principal, Head Counselor, Tele-caller, Accounts Executive",
          "Strict data masking: Mask parent phone numbers to prevent database theft",
          "Prevent unauthorized Excel/CSV exports with one-click security toggles",
          "Branch-level isolation ensuring counselors only see local campus students",
        ],
        mockData: {
          title: "Institutional User Roles & Data Security",
          metrics: [
            { label: "Total Staff Users", value: "28 Members", color: "text-white" },
            { label: "Campuses Managed", value: "4 Branches", color: "text-emerald-400" },
            { label: "Export Restrictions", value: "Enforced", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Director Role • Full Access", col2: "All 4 Campuses • Financial & Analytics Permissions", col3: "2 Admins Active", badge: "Super Admin" },
            { col1: "Campus Head Role • Branch Access", col2: "Local Branch Leads & Counselor Supervision", col3: "4 Branch Heads", badge: "Manager" },
            { col1: "Academic Counselor • Restricted Access", col2: "Assigned Leads Only • Phone Numbers Masked", col3: "18 Counselors", badge: "Restricted" },
          ],
        },
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: "🧩",
        group: "Administration",
        headline: "Plug into WhatsApp, Cloud Telephony, and Ad Channels",
        tagline: "Pre-built connectors for Official WhatsApp API, Exotel, Meta Lead Ads, Google Ads, and Shiksha.",
        whyEdutechNeedsIt:
          "Eliminate manual copy-pasting between ad platforms, calling SIMs, and WhatsApp web. Everything syncs natively in real-time.",
        keyCapabilities: [
          "Official Meta (Facebook & Instagram) Lead Ads instant webhook capture",
          "Cloud Telephony click-to-call integration (Exotel, Knowlarity, MCube)",
          "Official WhatsApp Business Cloud API with green-tick badge support",
          "Education portal sync with CollegeDunia, Shiksha, and JustDial",
        ],
        mockData: {
          title: "Active Academic Integrations & Webhook Sync",
          metrics: [
            { label: "Connected Channels", value: "7 Channels", color: "text-emerald-400" },
            { label: "Sync Latency", value: "< 2 seconds", color: "text-white" },
            { label: "API Health", value: "100% Uptime", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "WhatsApp Cloud API (Meta Official)", col2: "Template Messaging & 2-Way Chat Sync", col3: "Status: Connected", badge: "Active" },
            { col1: "Meta Lead Ads Webhook (Facebook / Insta)", col2: "Instant lead ingestion for 4 active campaigns", col3: "Status: Real-Time Sync", badge: "Active" },
            { col1: "Cloud Telephony (Exotel / MCube)", col2: "Browser Click-to-call & Call Recording Sync", col3: "Status: Connected", badge: "Active" },
          ],
        },
      },
      {
        id: "custom_branding",
        label: "Custom Branding",
        icon: "🎨",
        group: "Administration",
        headline: "White-Labeled Parent Experience in Your Institute's Brand",
        tagline: "Your logo, colors, and institute domain on student application forms and WhatsApp brochures.",
        whyEdutechNeedsIt:
          "Parents trust their chosen school or coaching institute, not third-party generic software. Present a seamless, elite institutional brand at every touchpoint.",
        keyCapabilities: [
          "Custom subdomain (e.g., admissions.yourinstitute.com)",
          "Branded digital application forms with custom colors and emblem",
          "Institutional logo on all auto-generated fee receipts and fee structures",
          "Custom sender ID for official WhatsApp and SMS notifications",
        ],
        mockData: {
          title: "Institutional Brand Identity Configuration",
          metrics: [
            { label: "Portal Domain", value: "admissions.apex...", color: "text-white" },
            { label: "Brand Primary", value: "#0c1240 Navy", color: "text-emerald-400" },
            { label: "Parent Receipts", value: "Institute Logo", color: "text-[#5fe0ad]" },
          ],
          rows: [
            { col1: "Custom Portal URL", col2: "admissions.apexacademy.com (SSL Active)", col3: "Status: Live", badge: "Verified" },
            { col1: "WhatsApp Sender Profile", col2: "Apex Coaching Academy (Green Tick Ready)", col3: "Official Meta Profile", badge: "Verified" },
            { col1: "Admission Receipt Template", col2: "Emblem + Signature + Fee Breakdown Table", col3: "Template: Academic v2", badge: "Active" },
          ],
        },
      },
    ],
  },
];

export default function EdutechToolWalkthrough() {
  const [selectedItemId, setSelectedItemId] = useState("leads");

  // Flatten items for easy lookup
  const allItems = MENU_SECTIONS.flatMap((g) => g.items);
  const currentItem = allItems.find((item) => item.id === selectedItemId) || allItems[0];

  return (
    <section aria-labelledby="features-walkthrough-h" className="border-b border-pulse-line bg-gradient-to-b from-white via-[#f7f8fd] to-white py-[clamp(64px,9vw,112px)]">
      <div className={`${container} flex flex-col gap-12`}>
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center max-w-[800px] mx-auto">
          <span className="inline-flex w-fit mx-auto items-center gap-2 rounded-full border border-pulse/20 bg-pulse-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-pulse font-code">
            🛠️ Full Feature Architecture
          </span>
          <h2 id="features-walkthrough-h" className={h2}>
            Inside Uptrix • The Modules Built for High-Converting Institutes
          </h2>
          <p className="text-[17px] leading-relaxed text-pulse-muted">
            Click any module from the Uptrix sidebar below to see how it solves the exact daily challenges faced by counseling, admissions, and campus leadership teams.
          </p>
        </div>

        {/* Interactive Workspace: Left Sidebar + Right Live Capability View */}
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-[#d9dcf0] bg-white shadow-[0_30px_70px_-30px_rgba(14,19,48,0.2)] overflow-hidden lg:grid-cols-12">
          {/* Left Column: Replicated Uptrix Light Sidebar */}
          <div className="bg-[#f8f9fd] p-4 text-pulse-ink sm:p-5 lg:col-span-4 lg:border-r border-[#e3e6f2] flex flex-col gap-6">
            {/* Sidebar Logo Header */}
            <div className="flex items-center gap-3 px-2 py-1 border-b border-[#e3e6f2] pb-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-pulse via-[#7c80ff] to-emerald-500 text-white font-extrabold text-sm shadow-md">
                U
              </span>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-pulse-ink leading-tight">Uptrix</span>
                <span className="text-[10px] font-code uppercase tracking-widest text-pulse-subtle">Admissions CRM</span>
              </div>
            </div>

            {/* Navigation Groups */}
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[640px] pr-1">
              {MENU_SECTIONS.map((section) => (
                <div key={section.groupId} className="flex flex-col gap-1.5">
                  <span className="px-3 font-code text-[11px] font-extrabold tracking-wider text-pulse-subtle uppercase">
                    {section.title}
                  </span>
                  <div className="flex flex-col gap-1">
                    {section.items.map((item) => {
                      const isActive = selectedItemId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedItemId(item.id)}
                          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-all cursor-pointer ${
                            isActive
                              ? "bg-pulse text-white shadow-sm font-bold"
                              : "text-pulse-muted hover:bg-white hover:text-pulse-ink hover:shadow-2xs"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-3 border-t border-[#e3e6f2] px-2 text-xs text-pulse-subtle flex items-center justify-between">
              <span>Interactive Navigation</span>
              <span className="font-code text-emerald-700 font-bold">● Live Preview</span>
            </div>
          </div>

          {/* Right Column: Live Module Capabilities & Educational Context */}
          <div className="p-6 sm:p-8 lg:col-span-8 flex flex-col gap-8 justify-between bg-white">
            {/* Top Bar for Selected Item */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pulse-line pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-pulse-soft px-3 py-1 font-code text-xs font-bold text-pulse uppercase">
                    {currentItem.group} Module
                  </span>
                  <span className="text-xs text-pulse-subtle">• Ready for 2026-27 Enrollment</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Included in Uptrix Core
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-pulse-ink tracking-tight">
                {currentItem.headline}
              </h3>
              <p className="text-base text-pulse-muted leading-relaxed">
                {currentItem.tagline}
              </p>
            </div>

            {/* Why EduTech Needs It Box */}
            <div className="rounded-2xl border border-indigo-100 bg-[#f6f7fd] p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-pulse">
                <span>🎯</span>
                <span>Why Education Clients Need This Most:</span>
              </div>
              <p className="text-sm leading-relaxed text-[#2a2f4d]">
                {currentItem.whyEdutechNeedsIt}
              </p>
            </div>

            {/* Simulated Live Product Screen / Data Table */}
            <div className="rounded-2xl border border-[#dfe3f2] bg-[#f8f9fd] text-pulse-ink p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#e3e6f2] pb-3 mb-4">
                <span className="font-code text-xs font-extrabold text-pulse-ink">
                  {currentItem.mockData.title}
                </span>
                <span className="text-[11px] text-emerald-700 font-code font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ● Real-Time Sync
                </span>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {currentItem.mockData.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col rounded-xl bg-white p-2.5 border border-[#e1e4f0] shadow-2xs">
                    <span className="text-[11px] text-pulse-subtle font-medium">{m.label}</span>
                    <span className={`text-lg font-extrabold ${m.color ? m.color.replace('text-white', 'text-pulse-ink').replace('text-indigo-300', 'text-pulse').replace('text-[#5fe0ad]', 'text-emerald-700') : 'text-pulse-ink'} font-code`}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rows List */}
              <div className="flex flex-col gap-2">
                {currentItem.mockData.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-3 text-xs border border-[#e1e4f0] shadow-2xs"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-pulse-ink">{row.col1}</span>
                      <span className="text-pulse-muted text-[11px]">{row.col2}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-code text-pulse-ink font-semibold">{row.col3}</span>
                      {row.badge && (
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          {row.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Capabilities Bullet Points */}
            <div className="flex flex-col gap-3">
              <h4 className="font-code text-xs font-bold text-pulse uppercase tracking-wider">
                Key Operational Advantages for Your Campus:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentItem.keyCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-pulse-ink font-semibold">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                      ✓
                    </span>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-pulse-line pt-5">
              <span className="text-xs text-pulse-subtle">
                Want to see <strong>{currentItem.label}</strong> with your own courses and counselors?
              </span>
              <Link
                href="/crm#demo"
                className={`${btnPrimary} py-2.5 px-5 text-sm`}
              >
                Book Live Walkthrough of {currentItem.label} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
