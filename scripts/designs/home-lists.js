// Repeated content for the home page: the AI chat examples and the four connect flows.
const TEAM = {
  P: ["#EFEAFF", "#3F289D"],
  B: ["#E3EFFC", "#0058B0"],
  G: ["#E6F4E0", "#2E6B1E"],
  O: ["#FFF1DC", "#8A4600"],
};

const ICON = {
  hr: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  employee: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8",
  it: "M4 5h16v11H4zM2 20h20",
  finance: "M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7M16 14h.01",
  manager: "M3 3v18h18M7 15l4-4 3 3 5-6",
  calendar: "M3 6h18v15H3zM16 3v6M8 3v6M3 11h18",
  payslip: "M4 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2zM8 8h8M8 12h8M8 16h5",
  claim: "M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7M16 14h.01",
  clock: "M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20M12 6v6l4 2",
  ticket: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4zM13 5v14",
};

const CHATS = [
  { q: "I need leave for two days next week. Please apply for it.", a: "Sure! I found your leave balance and prepared a two-day leave request. Please confirm the dates before I submit it.", action: "Leave request ready for confirmation", icon: ICON.calendar },
  { q: "How many leaves do I have?", a: "You have 12 annual, 6 casual and 8 sick leaves left this year. Would you like to apply for one?", action: "Leave balance checked", icon: ICON.calendar },
  { q: "Show my latest payslip.", a: "Here’s your October payslip. Your net pay and deductions are listed line by line — would you like to download it?", action: "Payslip ready to download", icon: ICON.payslip },
  { q: "Submit my travel reimbursement.", a: "I’ve drafted a travel claim for you. Attach your receipt and confirm — it will then go to your manager for approval.", action: "Claim ready for confirmation", icon: ICON.claim },
  { q: "What is my attendance this month?", a: "You’ve been present 19 of 20 working days this month, with one late check-in. No attendance issues are pending.", action: "Attendance summary", icon: ICON.clock },
  { q: "Raise an IT support request.", a: "I can do that. Tell me what’s wrong — device, software or access — and I’ll send the ticket to the IT team.", action: "IT ticket ready to submit", icon: ICON.ticket },
];

// Each step: the team (icon and colour), the step text and the tag shown under it.
const step = (team, icon, tone, text, tag) => ({ team, icon, bg: TEAM[tone][0], fg: TEAM[tone][1], text, tag });

const RAW_FLOWS = [
  {
    name: "New joiner",
    summary: "One record starts every task",
    before: "HR emails IT for a laptop, Finance for bank details and the manager for a start plan — then chases each one.",
    after: "HR adds the joiner once. IT, Finance and the manager each get their task automatically, with the same details.",
    steps: [
      step("HR", ICON.hr, "P", "Adds the new joiner’s profile and documents", "Profile created"),
      step("IT", ICON.it, "B", "Gets a task to prepare the laptop and accounts", "Task assigned"),
      step("Finance", ICON.finance, "G", "Sets up salary and bank details for payroll", "Ready for payroll"),
      step("Manager", ICON.manager, "O", "Sees the joiner on the team with a day-one plan", "Ready for day one"),
    ],
  },
  {
    name: "Leave request",
    summary: "Approved once, updated everywhere",
    before: "A leave email to the manager, a note to HR and a spreadsheet update before payroll.",
    after: "The employee applies in the app. Approval updates the balance and payroll on its own.",
    steps: [
      step("Employee", ICON.employee, "P", "Applies for leave from web or mobile", "Requested"),
      step("Manager", ICON.manager, "O", "Approves in one tap with the team calendar in view", "Approved"),
      step("HR", ICON.hr, "P", "Leave balance and attendance update instantly", "Balance updated"),
      step("Finance", ICON.finance, "G", "Payroll picks up any unpaid days automatically", "Synced to payroll"),
    ],
  },
  {
    name: "Expense claim",
    summary: "From receipt to reimbursement",
    before: "Receipts sent by email, approvals lost in inboxes and employees asking when they’ll be paid.",
    after: "One claim with the receipt attached — approved, paid and visible to the employee at every step.",
    steps: [
      step("Employee", ICON.employee, "P", "Submits a claim with the receipt attached", "Submitted"),
      step("Manager", ICON.manager, "O", "Reviews and approves the claim", "Approved"),
      step("Finance", ICON.finance, "G", "Adds the reimbursement to the next payroll", "Scheduled"),
      step("Employee", ICON.employee, "P", "Sees the status and the amount on the payslip", "Paid"),
    ],
  },
  {
    name: "Employee exit",
    summary: "Every team signs off on one checklist",
    before: "Separate emails for device returns, access removal and final settlement — easy to miss a step.",
    after: "One exit checklist that HR, IT, Finance and the manager all complete together.",
    steps: [
      step("HR", ICON.hr, "P", "Records the resignation and last working day", "Exit started"),
      step("IT", ICON.it, "B", "Recovers devices and revokes software access", "Access removed"),
      step("Finance", ICON.finance, "G", "Calculates the full-and-final settlement", "F&F ready"),
      step("Manager", ICON.manager, "O", "Plans the handover and signs off", "Closed"),
    ],
  },
];

const FLOWS = RAW_FLOWS.map((f) => ({
  ...f,
  steps: f.steps.map((s, i) => ({ ...s, arrow: i < f.steps.length - 1 })),
}));

module.exports = {
  home: {
    lists: {
      chats: { title: "AI chat examples", description: "The example questions in the AI assistant and the replies shown for each.", items: CHATS },
      flows: { title: "Connected workflows", description: "The four request flows: the tab name, the summary, the before and after text, and each step.", items: FLOWS },
    },
  },
};
