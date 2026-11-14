// Repeated content for the HRMS pages (module cards, lifecycle stages, AI chat examples, IT ticket steps).
// The generator merges these into the editable defaults. Rows use a tone: ok, wait, info, new, hot.
const TONES = {
  ok: ["#E6F4E0", "#2E6B1E"],
  wait: ["#FFF1DC", "#8A4600"],
  info: ["#E3EFFC", "#0058B0"],
  new: ["#EFEAFF", "#3F289D"],
  hot: ["#FFE6EF", "#A3124A"],
};

const ICON = {
  rec: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  cal: "M3 6h18v15H3zM16 3v6M8 3v6M3 11h18",
  shift: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
  perf: "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8",
  ai: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
};

const row = ([a, b, t, tone]) => ({ a, b, t, tbg: TONES[tone][0], tfg: TONES[tone][1] });
const trow = ([a, t, tone]) => ({ a, t, tbg: TONES[tone][0], tfg: TONES[tone][1] });

const HR_MODULES = [
  { cn: "01", cat: "Employee Information & Management", t: "HRIS & Employee Records", d: "Employee profiles, documents, designations, departments and reporting structures.", pts: ["Employee profiles and documents", "Designations and departments", "Reporting structures"], screen: "Employee directory", rows: [["Anil Rao", "Senior Developer · Engineering", "Active", "ok"], ["Sneha Kulkarni", "Sales Executive · reports to Kavya", "Active", "ok"], ["Manoj Patil", "Operations Lead", "On notice", "wait"]], icon: ICON.rec },
  { cn: "02", cat: "Workforce & Time Management", t: "Attendance & Leave", d: "Attendance tracking, leave applications, approvals and leave balances.", pts: ["Attendance tracking", "Leave applications and approvals", "Live leave balances"], screen: "Today", rows: [["Anil R. · In at 09:02", "Attendance", "On time", "ok"], ["Sneha K. · Casual leave", "12–13 Nov", "Pending", "wait"], ["Riya S. · Earned leave", "5 days", "Approved", "ok"]], icon: ICON.cal },
  { cn: "02", cat: "Workforce & Time Management", t: "Shifts & Rosters", d: "Shift planning, employee schedules and roster management.", pts: ["Shift planning", "Employee schedules", "Roster management"], screen: "Roster · this week", rows: [["Morning", "09:00–18:00", "42 people", "info"], ["Evening", "14:00–23:00", "28 people", "info"], ["Night", "22:00–07:00", "16 people", "info"]], icon: ICON.shift },
  { cn: "03", cat: "Employee Growth & Engagement", t: "Performance Management", d: "Goals, employee reviews, ratings and performance tracking.", pts: ["Goals", "Employee reviews and ratings", "Performance tracking"], screen: "Q4 review cycle", rows: [["Goals set", "248 of 248", "Done", "ok"], ["Self reviews", "186 of 248", "In progress", "wait"], ["Manager reviews", "Opens next", "Not started", "info"]], icon: ICON.perf },
  { cn: "03", cat: "Employee Growth & Engagement", t: "HR Policies & Referrals", d: "Policy management, acknowledgements and employee referrals.", pts: ["Policy management", "Employee acknowledgements", "Employee referrals"], screen: "Policies & referrals", rows: [["Leave policy v3", "Published", "Live", "ok"], ["WFH policy v2", "Acknowledgements", "In progress", "wait"], ["Priya S. → Sales executive", "Referral", "Hired", "new"]], icon: ICON.doc },
  { cn: "04", cat: "AI-Powered Employee Experience", t: "AI Employee Assistant", d: "Conversational assistance for leave applications, employee queries and everyday HR activities.", pts: ["Leave applications by chat", "Answers to employee queries", "Everyday HR activities"], screen: "Asked this week", rows: [["“Apply leave for tomorrow”", "Leave", "Confirmed", "ok"], ["“Which shift am I on?”", "Shifts", "Answered", "ok"], ["“What is the WFH policy?”", "Policies", "Answered", "ok"]], icon: ICON.ai },
].map((m) => ({ ...m, rows: m.rows.map(row) }));

const HR_STAGES = [
  { short: "Joining", t: "Joining the Organisation", d: "Employee profile creation, document collection, onboarding tasks and department allocation.", img: "/images/onboarding.jpg", alt: "A new hire being welcomed by the team in an onboarding session", rows: [["Employee profile created", "Done", "ok"], ["Documents collected", "6 of 6", "ok"], ["Onboarding tasks", "In progress", "info"], ["Department allocated", "Engineering", "new"]] },
  { short: "Everyday", t: "Everyday Employee Activities", d: "Attendance, leave, shifts, HR queries and employee self-service.", img: "", alt: "", rows: [["Attendance check-in", "Web & mobile", "ok"], ["Leave applications", "Live balances", "info"], ["Shift schedule", "Published", "ok"], ["HR queries", "Self-service & AI", "new"]] },
  { short: "Performance", t: "Performance & Development", d: "Goals, reviews, feedback and employee growth.", img: "/images/performance-review.jpg", alt: "A manager and an employee in a one-to-one review meeting", rows: [["Goals set", "Q4 · 4 goals", "ok"], ["Self review", "Submitted", "ok"], ["Manager feedback", "Scheduled", "wait"], ["Growth plan", "Shared", "new"]] },
  { short: "Benefits & support", t: "Employee Benefits & Support", d: "Payroll information, claims, reimbursements and IT assistance.", img: "/images/payroll-team.jpg", alt: "An HR team reviewing payroll dashboards together", rows: [["Payroll information", "Payslips ready", "ok"], ["Expense claims", "In review", "wait"], ["Reimbursements", "Next payroll", "info"], ["IT assistance", "Ticket raised", "new"]] },
  { short: "Exit", t: "Employee Exit", d: "Offboarding tasks, clearances, asset returns and final settlement coordination.", img: "/images/employee-exit.jpg", alt: "An HR manager and an employee going through an exit handover", rows: [["Offboarding tasks", "Assigned", "info"], ["Department clearances", "3 of 4", "wait"], ["Asset returns", "Laptop returned", "ok"], ["Final settlement", "With Finance", "new"]] },
].map((s) => ({ ...s, rows: s.rows.map(trow) }));

const HR_CHATS = [
  { q: "Apply leave for tomorrow. I have a personal commitment.", a: "Sure! Here’s your leave request.", fields: [["Leave date", "Tomorrow"], ["Leave type", "Casual Leave"], ["Status", "Awaiting your confirmation"]], action: "Ready to submit" },
  { q: "Show my payslip.", a: "Here’s your latest payslip.", fields: [["Month", "October"], ["Earnings & deductions", "Line by line"], ["Status", "Ready to download"]], action: "Download payslip" },
  { q: "How many leaves do I have?", a: "Here’s your leave balance for this year.", fields: [["Annual", "12 days"], ["Casual", "6 days"], ["Sick", "8 days"]], action: "Apply for leave" },
  { q: "What is my attendance this month?", a: "Here’s your attendance summary.", fields: [["Present", "19 of 20 days"], ["Late check-ins", "1"], ["Pending issues", "None"]], action: "View attendance" },
  { q: "Submit my expense claim.", a: "I’ve drafted your expense claim.", fields: [["Claim type", "Travel"], ["Receipt", "Attach to continue"], ["Status", "Goes to your manager for approval"]], action: "Ready to submit" },
  { q: "Raise an IT support ticket.", a: "I’ve prepared an IT ticket for you.", fields: [["Category", "Choose: device, software or access"], ["Assigned to", "IT team"], ["Status", "Awaiting your confirmation"]], action: "Ready to submit" },
].map((c) => ({ ...c, fields: c.fields.map(([l, v]) => ({ l, v })) }));


const IT_TICKETS = [
  { t: "Employee raises a ticket", d: "An employee reports a laptop issue through the employee portal or AI assistant.", status: "Open", tone: "info", priority: "Not set yet", assigned: "Not assigned yet", who: "Anil Rao · Employee", note: "“My laptop stopped charging this morning.” Raised from the employee portal with the device already attached." },
  { t: "Ticket gets categorised and assigned", d: "The request is categorised, prioritised and assigned to the appropriate IT team member.", status: "Assigned", tone: "new", priority: "High", assigned: "IT Support", who: "Helpdesk", note: "Categorised as Hardware, priority set to High, and assigned to IT Support." },
  { t: "IT team resolves the issue", d: "The technician investigates the problem, updates the ticket and records the resolution.", status: "In Progress", tone: "wait", priority: "High", assigned: "IT Support", who: "IT Support · Technician", note: "Faulty charger confirmed. Replacement issued and the resolution is recorded on the ticket." },
  { t: "Employee gets notified", d: "The employee receives status updates and confirmation once the issue is resolved.", status: "Resolved", tone: "ok", priority: "High", assigned: "IT Support", who: "Notification to Anil Rao", note: "Your ticket IT-1043 has been resolved. Reply here if the issue comes back." },
].map((k) => ({
  t: k.t, d: k.d, status: k.status, who: k.who, note: k.note,
  tbg: TONES[k.tone][0], tfg: TONES[k.tone][1],
  fields: [["Ticket ID", "IT-1043"], ["Issue", "Laptop not charging"], ["Priority", k.priority], ["Assigned to", k.assigned], ["Asset", "Dell Latitude 5440"], ["Status", k.status]].map(([l, v]) => ({ l, v })),
}));

module.exports = {
  hr: {
    lists: {
      modules: { title: "Module cards", description: "The six module cards: the tile, its title, points and sample rows.", items: HR_MODULES },
      stages: { title: "Lifecycle stages", description: "The five lifecycle stages: tab name, title, text, image and sample rows.", items: HR_STAGES },
      chats: { title: "AI chat examples", description: "The example questions and the assistant's replies.", items: HR_CHATS },
    },
  },
  it: {
    lists: {
      tickets: { title: "Ticket workflow steps", description: "The four ticket steps and the example ticket shown for each.", items: IT_TICKETS },
    },
  },
};
