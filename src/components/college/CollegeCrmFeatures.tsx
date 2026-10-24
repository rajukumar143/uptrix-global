"use client";

import React, { useState } from "react";

interface FeatureData {
  label: string;
  title: [string, string];
  description: string[];
  integration: string;
  brands: string;
  demo: string;
  kpis: [string, string, string][];
  chart: string;
  rows: [string, string, string, string][];
  insightTag: string;
  insight: string;
  benefits: [string, string, string][];
  steps: [string, string, string][];
  closing: [string, string];
}

const features: FeatureData[] = [
  {
    label: "Meta Conversation API",
    title: ["Turn Meta Conversations", "Into Revenue"],
    description: [
      "Your customers are already talking to you on WhatsApp. Pulse brings those conversations directly into your CRM through the Meta Conversation API.",
      "No switching between WhatsApp and CRM.",
      "Every conversation can be connected to the right customer record, giving your team the context they need to respond, follow up and convert.",
      "And because conversations become part of the CRM data, you can finally measure what your conversations are actually generating."
    ],
    integration: "Direct integration with Meta Conversation API",
    brands: "∞ Meta  ↔  ◉ WhatsApp",
    demo: "▣ College CRM",
    kpis: [
      ["WhatsApp leads this month", "1,248", "↗ 22% growth"],
      ["Conversations today", "186", "Active conversations"]
    ],
    chart: "Recent conversations",
    rows: [
      ["Priya Sharma", "Interested in Data Science", "New lead", ""],
      ["Rahul Mehta", "Asked about course fees", "Replied", ""],
      ["Sneha Reddy", "Requested a callback", "Follow-up", "warn"]
    ],
    insightTag: "CRM INSIGHT",
    insight: "Every conversation becomes useful customer context, helping your team follow up and measure results.",
    benefits: [
      ["ϟ", "All Conversations in One Place", "No switching between WhatsApp and CRM."],
      ["↗", "Connected to Customer Records", "Every chat is linked to the right customer profile."],
      ["▥", "Track Real Impact", "Measure how many conversations actually convert."],
      ["♟", "Respond Faster", "Give your team the full context to follow up and convert."]
    ],
    steps: [
      ["◉", "Capture", "Leads from WhatsApp via Meta API"],
      ["♟", "Assign", "Auto assign to the right counsellor"],
      ["☏", "Converse", "Respond and provide details"],
      ["▣", "Follow Up", "Track activities and reminders"],
      ["▥", "Convert", "Turn conversations into enrolments"]
    ],
    closing: ["Every conversation has potential.", "Make it count."]
  },
  {
    label: "Smart Lead Assignment",
    title: ["The Right Lead.", "The Right Person."],
    description: [
      "Stop manually distributing leads. Pulse automatically assigns incoming enquiries using your business rules.",
      "Set rules based on team availability, workload, location, product or course, lead source, round-robin and sales team.",
      "Every assignment can trigger an owner notification so your team knows who is responsible.",
      "No lead sitting in an inbox waiting to be noticed."
    ],
    integration: "Flexible routing rules for your sales team",
    brands: "⚙ Smart Rules  ↔  ♟ Counsellors",
    demo: "♟ Lead Assignment",
    kpis: [
      ["Incoming leads", "248", "Today's enquiries"],
      ["Assigned automatically", "96%", "Illustrative rate"]
    ],
    chart: "Assignment queue",
    rows: [
      ["Priya Sharma", "Website · Data Science", "Assigned", ""],
      ["Rahul Mehta", "Meta Ads · MBA", "Assigned", ""],
      ["Sneha Reddy", "Google Ads · B.Tech", "Pending", "warn"]
    ],
    insightTag: "ROUTING RULE",
    insight: "Route leads using your configured rules, team availability and workload limits.",
    benefits: [
      ["♟", "Availability-Based", "Route enquiries to available team members."],
      ["⇄", "Round-Robin Routing", "Distribute leads across your configured team."],
      ["⌖", "Business Rules", "Assign by location, source or product."],
      ["✓", "Clear Ownership", "Give every lead a responsible owner."]
    ],
    steps: [
      ["◉", "New Lead", "Capture incoming enquiry"],
      ["⚙", "Apply Rules", "Check your assignment criteria"],
      ["♟", "Select Owner", "Identify the right team member"],
      ["↗", "Notify", "Alert the assigned counsellor"],
      ["✓", "Follow Up", "Start the conversation"]
    ],
    closing: ["Every lead needs an owner.", "Make responsibility clear."]
  },
  {
    label: "Lead Cost Calculator",
    title: ["Know What Every Lead", "Really Costs You"],
    description: [
      "Your marketing team spends money generating leads. But do you know what each lead actually costs?",
      "Pulse connects ad spend and lead volume to calculate cost per lead.",
      "Go one step further by comparing enrolments, revenue generated and marketing spend.",
      "Stop optimizing for cheap leads. Optimize for profitable customers."
    ],
    integration: "Connect marketing spend with CRM outcomes",
    brands: "₹ Spend Tracking  ↔  📊 ROI Analysis",
    demo: "▦ Lead Cost Calculator",
    kpis: [
      ["Marketing spend", "₹2.4L", "Selected period"],
      ["Cost per lead", "₹480", "Spend ÷ leads"]
    ],
    chart: "Lead cost breakdown",
    rows: [
      ["Google Ads", "Spend / leads", "₹420", ""],
      ["Meta Ads", "Spend / leads", "₹510", ""],
      ["Other channels", "Spend / leads", "₹480", "warn"]
    ],
    insightTag: "COST INSIGHT",
    insight: "Compare cost per lead and cost per acquisition by channel using your actual spend and conversion data.",
    benefits: [
      ["₹", "Ad Spend Tracking", "Connect marketing costs to lead volume."],
      ["÷", "Cost Per Lead", "See the average cost of each lead."],
      ["▥", "Acquisition Cost", "Compare spend with enrolled customers."],
      ["↗", "Revenue Context", "Evaluate marketing efficiency against revenue."]
    ],
    steps: [
      ["₹", "Ad Spend", "Record marketing expenditure"],
      ["◉", "Lead Volume", "Count generated leads"],
      ["÷", "Calculate CPL", "Divide spend by leads"],
      ["✓", "Track Enrolments", "Connect leads with outcomes"],
      ["▥", "Calculate CPA", "Compare spend per acquisition"]
    ],
    closing: ["Cheap leads aren't the goal.", "Profitable growth is."]
  },
  {
    label: "Conversion Analytics",
    title: ["See Where Leads Convert", "And Where They Get Lost"],
    description: [
      "Pulse turns your sales activity into a visual conversion journey.",
      "Follow the funnel from leads to contacted prospects, engaged prospects, qualified leads and enrolled customers.",
      "Identify where prospects drop off, which channels convert best and which counsellors need support.",
      "Your funnel stops being a report and becomes a decision-making tool."
    ],
    integration: "Visualize your complete lead-to-enrolment funnel",
    brands: "▥ Funnel Stages  ↔  🎯 Conversions",
    demo: "▥ Conversion Analytics",
    kpis: [
      ["Total leads", "10,000", "Illustrative funnel"],
      ["Enrolled", "620", "6.2% of leads"]
    ],
    chart: "Conversion funnel",
    rows: [
      ["Contacted", "10,000 leads", "6,800", ""],
      ["Engaged", "Contacted leads", "3,200", ""],
      ["Qualified", "Engaged leads", "1,400", "warn"],
      ["Enrolled", "Qualified prospects", "620", ""]
    ],
    insightTag: "FUNNEL INSIGHT",
    insight: "Compare stage-by-stage conversion to identify where follow-up or qualification needs attention.",
    benefits: [
      ["▥", "Full Funnel Visibility", "Track every stage from lead to enrolment."],
      ["⌖", "Channel Performance", "Compare conversion rates by source."],
      ["♟", "Counsellor Insights", "Understand performance by team member."],
      ["↗", "Spot Drop-Offs", "Find where prospects leave the funnel."]
    ],
    steps: [
      ["◉", "10,000 Leads", "Capture enquiries"],
      ["☏", "6,800 Contacted", "Start conversations"],
      ["↗", "3,200 Engaged", "Track engagement"],
      ["✓", "1,400 Qualified", "Identify serious prospects"],
      ["▥", "620 Enrolled", "Measure final outcomes"]
    ],
    closing: ["Find the drop-off.", "Improve the conversion."]
  },
  {
    label: "Payment Analytics",
    title: ["Revenue Doesn't End", "At Enrollment"],
    description: [
      "Getting the customer is one thing. Getting paid is another.",
      "Pulse gives management a clear view of the money behind the pipeline, from total revenue and collections to pending and overdue payments.",
      "Understand which products generate the most revenue, which customers need follow-up and how revenue is trending.",
      "Connect sales with cash."
    ],
    integration: "Bring revenue, collections and pending payments into view",
    brands: "₹ Total Pipeline  ↔  💳 Collections",
    demo: "₹ Revenue Dashboard",
    kpis: [
      ["Total revenue", "₹12.4L", "Illustrative data"],
      ["Collected", "₹9.8L", "Selected period"]
    ],
    chart: "Payment status",
    rows: [
      ["Collected", "Payments received", "₹9.8L", ""],
      ["Pending", "Awaiting payment", "₹1.8L", "warn"],
      ["Overdue", "Past due date", "₹0.8L", "danger"],
      ["Refunded", "Payments refunded", "₹0.2L", ""]
    ],
    insightTag: "REVENUE INSIGHT",
    insight: "Review outstanding balances, overdue payments and expected revenue to prioritize collection follow-ups.",
    benefits: [
      ["₹", "Revenue Dashboard", "See revenue across products and courses."],
      ["✓", "Collections", "Track payments received."],
      ["!", "Overdue Payments", "Identify accounts needing attention."],
      ["↗", "Revenue Trends", "Review pending and expected revenue."]
    ],
    steps: [
      ["▥", "Total Revenue", "Review generated revenue"],
      ["₹", "Collected", "Track received payments"],
      ["◷", "Pending", "Identify outstanding balances"],
      ["!", "Overdue", "Prioritize collection follow-ups"],
      ["↗", "Forecast", "Review expected revenue"]
    ],
    closing: ["Sales create the opportunity.", "Collections complete the picture."]
  },
  {
    label: "AI Action Center",
    title: ["Pulse Doesn't Just Show Problems.", "It Shows What to Do Next."],
    description: [
      "Imagine opening your CRM in the morning and seeing a prioritized list of actions based on your business data.",
      "Surface leads that have not been contacted, overdue follow-ups, rising cost per lead and improving ad performance.",
      "Give your team a daily view of what needs attention first, with supporting context for each recommendation.",
      "Your dashboard becomes your daily action list."
    ],
    integration: "Turn CRM data into prioritized actions",
    brands: "✧ AI Signals  ↔  ⚡ Instant Action",
    demo: "✧ Today's AI Priorities",
    kpis: [
      ["Leads needing contact", "18", "Requires attention"],
      ["Overdue payments", "₹2.4L", "Review collection"]
    ],
    chart: "Priority action queue",
    rows: [
      ["Uncontacted leads", "18 leads", "High", "danger"],
      ["Overdue follow-ups", "7 tasks", "Medium", "warn"],
      ["Meta CPL change", "+21%", "Review", "warn"],
      ["Google conversion", "+14%", "Improving", ""]
    ],
    insightTag: "AI ACTION CENTER",
    insight: "Prioritize lead follow-ups, payment collections and marketing changes using available CRM data.",
    benefits: [
      ["!", "Missed Lead Alerts", "Highlight leads without a timely contact."],
      ["◷", "Follow-Up Reminders", "Surface overdue activities."],
      ["▥", "Marketing Signals", "Flag meaningful metric changes."],
      ["✧", "Action Priorities", "Organize the next steps for your team."]
    ],
    steps: [
      ["◉", "Collect Data", "Read available CRM metrics"],
      ["✧", "Detect Issues", "Identify notable patterns"],
      ["!", "Prioritize", "Rank items needing attention"],
      ["♟", "Assign Action", "Give tasks an owner"],
      ["✓", "Review Results", "Track progress and outcomes"]
    ],
    closing: ["Don't just see what happened.", "Know what to do next."]
  }
];

const tabIcons = ["◉", "♟", "▦", "▥", "₹", "✧"];

export default function CollegeCrmFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#f9faff] border-b border-slate-200/80 overflow-hidden font-sans">
      {/* Subtle radial ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_0%_0%,#e9f3ff_0,transparent_40%)] opacity-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_100%_10%,#f0eaff_0,transparent_40%)] opacity-80"
      />

      <div className="relative mx-auto max-w-[1450px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <header className="text-center mb-9 sm:mb-11">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#eee7ff] text-[#5927e8] text-[13px] font-extrabold tracking-wide mb-4">
            SECTION 03 · CRM PLATFORM
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-[#111536] tracking-tight leading-[1.12] m-0">
            <span className="text-[#6938ef]">Key Features</span> of Your CRM Tool
          </h2>
          <p className="text-[#535d80] text-sm sm:text-base leading-relaxed mt-3 max-w-[640px] mx-auto">
            Everything you need to capture, manage, convert and grow — all in one place.
          </p>
        </header>

        {/* Feature Tabs (6 Columns) */}
        <div
          role="tablist"
          aria-label="CRM features"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-5"
        >
          {features.map((feature, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={feature.label}
                type="button"
                role="tab"
                id={`crm-tab-${idx}`}
                aria-selected={isActive}
                aria-controls="crm-tabpanel"
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-[15px] p-3 sm:py-4 sm:px-3 min-h-[80px] sm:min-h-[88px] flex items-center gap-2.5 text-left cursor-pointer transition-all duration-200 border ${
                  isActive
                    ? "bg-gradient-to-r from-[#7044f5] to-[#5725e9] text-white border-transparent shadow-[0_10px_24px_rgba(112,68,245,0.22)] -translate-y-0.5"
                    : "bg-white/90 text-[#111536] border-transparent hover:border-[#cfc1ff] hover:-translate-y-0.5 shadow-[0_5px_20px_rgba(52,61,118,0.06)]"
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-lg transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : idx === 0
                      ? "bg-[#eee8ff] text-[#6635ed]"
                      : idx === 1
                      ? "bg-[#e3f2ff] text-[#1684e8]"
                      : idx === 2
                      ? "bg-[#f0e8ff] text-[#7846ee]"
                      : idx === 3
                      ? "bg-[#ffe9ed] text-[#f04460]"
                      : idx === 4
                      ? "bg-[#dcfbed] text-[#08a66a]"
                      : "bg-[#f0e8ff] text-[#7846ee]"
                  }`}
                >
                  {tabIcons[idx]}
                </div>
                <span className="text-xs font-bold leading-snug line-clamp-2">
                  {feature.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Feature Panel */}
        <div
          id="crm-tabpanel"
          role="tabpanel"
          aria-labelledby={`crm-tab-${activeIndex}`}
          className="rounded-[26px] bg-white/95 border border-[#e9edff] p-5 sm:p-8 lg:p-9 shadow-[0_20px_70px_rgba(56,75,150,0.08)] flex flex-col gap-7 sm:gap-9 transition-all"
        >
          {/* Panel Grid: Left Copy (1fr) + Middle Dashboard (1.25fr) + Right Benefits (.85fr) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
            
            {/* LEFT: Copy */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-[#6938ef] text-xs font-extrabold tracking-wider uppercase">
                  {activeFeature.label}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111536] tracking-tight leading-[1.13] my-3">
                  {activeFeature.title[0]} <span className="text-[#6938ef] block">{activeFeature.title[1]}</span>
                </h3>

                <div className="space-y-2 text-[#535d80] text-sm leading-relaxed">
                  {activeFeature.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Integration Box */}
              <div className="mt-5 p-4 rounded-[17px] border border-[#e6eafe] bg-gradient-to-r from-[#f2f5ff] to-[#f7f1ff] text-center">
                <div className="text-base sm:text-lg font-extrabold text-[#111536] mb-1">
                  {activeFeature.brands}
                </div>
                <small className="text-[#535d80] text-xs font-medium block">
                  {activeFeature.integration}
                </small>
              </div>
            </div>

            {/* MIDDLE: Interactive Dashboard Demo */}
            <div className="lg:col-span-5 rounded-[21px] border border-[#dfe5ff] p-4 sm:p-5 bg-gradient-to-br from-[#f7f9ff] to-white shadow-[0_15px_35px_rgba(82,99,163,0.1)]">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e6eafe] text-[13px] font-extrabold text-[#111536]">
                <span>{activeFeature.demo}</span>
                <small className="text-[10px] text-[#657092] font-medium">Live overview</small>
              </div>

              {/* 2 KPIs */}
              <div className="grid grid-cols-2 gap-2.5 my-3.5">
                {activeFeature.kpis.map(([label, val, em], i) => (
                  <div key={i} className="p-3 rounded-[14px] bg-white border border-[#e6eafe]">
                    <small className="block text-[#68718d] text-[10px] mb-1 font-medium">{label}</small>
                    <strong className="block text-xl sm:text-2xl font-extrabold text-[#111536] tracking-tight">{val}</strong>
                    <em className="block text-[#0b9d67] text-[10px] not-italic font-bold mt-1">{em}</em>
                  </div>
                ))}
              </div>

              {/* Activity Card */}
              <div className="rounded-[14px] bg-white border border-[#e6eafe] p-3.5 mt-2.5">
                <h4 className="text-xs font-extrabold text-[#111536] mb-2.5 m-0">{activeFeature.chart}</h4>
                <div className="divide-y divide-[#f0f2fa]">
                  {activeFeature.rows.map(([name, detail, status, statusType], i) => (
                    <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-2.5 py-2 text-xs">
                      <div>
                        <strong className="block font-bold text-[#111536] text-[11px] leading-tight">{name}</strong>
                        <small className="block text-[10px] text-[#7a829e] mt-0.5">{detail}</small>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold whitespace-nowrap ${
                          statusType === "warn"
                            ? "bg-[#fff0d9] text-[#b86b05]"
                            : statusType === "danger"
                            ? "bg-[#ffe5e9] text-[#d33351]"
                            : "bg-[#e0f9ed] text-[#07885b]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="p-3 rounded-[15px] bg-gradient-to-r from-[#f3edff] to-[#f5f8ff] border border-[#e9e0ff] mt-3">
                <span className="inline-block bg-[#6938ef] text-white rounded px-1.5 py-0.5 text-[9px] font-extrabold mb-1">
                  {activeFeature.insightTag}
                </span>
                <p className="text-xs text-[#333b66] leading-relaxed m-0 font-medium">
                  {activeFeature.insight}
                </p>
              </div>
            </div>

            {/* RIGHT: Benefits */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {activeFeature.benefits.map(([icon, title, desc], i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-lg font-bold ${
                      i === 0
                        ? "bg-[#eee8ff] text-[#6938ef]"
                        : i === 1
                        ? "bg-[#e3f2ff] text-[#1586e8]"
                        : i === 2
                        ? "bg-[#ffe9ed] text-[#f04460]"
                        : "bg-[#e3f9ed] text-[#08a66a]"
                    }`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111536] mb-1 leading-snug">{title}</h4>
                    <p className="text-xs text-[#535d80] leading-relaxed m-0">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Workflow Pipeline */}
          <div className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-r from-[#f2f5ff] to-[#f6f1ff] border border-[#e9edff]">
            <h3 className="text-center text-sm sm:text-base font-extrabold text-[#111536] mb-4 m-0">
              {activeFeature.steps.map((s, idx) => (
                <React.Fragment key={idx}>
                  <span>{s[1]}</span>
                  {idx < activeFeature.steps.length - 1 && (
                    <span className="text-[#6938ef] mx-1 sm:mx-1.5">→</span>
                  )}
                </React.Fragment>
              ))}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {activeFeature.steps.map(([icon, stepName, stepDesc], i) => (
                <div
                  key={i}
                  className="p-3 rounded-[15px] bg-white/90 border border-[#e8ebfa] shadow-2xs min-w-0"
                >
                  <div className="text-lg mb-1.5">{icon}</div>
                  <strong className="block text-xs font-bold text-[#111536] mb-1">
                    {i + 1}. {stepName}
                  </strong>
                  <p className="text-[11px] text-[#535d80] leading-snug m-0">
                    {stepDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Punchline */}
          <div className="text-center text-base sm:text-lg font-extrabold text-[#111536] tracking-tight">
            {activeFeature.closing[0]} <span className="text-[#6938ef]">{activeFeature.closing[1]}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
