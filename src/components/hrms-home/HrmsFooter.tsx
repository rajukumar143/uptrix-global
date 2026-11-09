import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { HOME_LINKS, SUBMENU } from "@/content/hrms-home";

const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";
const btnPrimary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3F289D] px-6 font-bold text-white hover:bg-[#2F1E7A]";
const btnOutline = "inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 font-bold text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] hover:shadow-[inset_0_0_0_1px_#101828]";

const HR_MODULES = ["Employee records (HRIS)", "Attendance", "Leave management", "Shifts & rosters", "Performance tracking", "HR policies", "Referral bonus", "AI Assistant"];
const IT_FINANCE = [
  { label: "IT & HR tickets", href: "/it-suite" },
  { label: "Asset management", href: "/it-suite" },
  { label: "Onboarding & offboarding", href: "/it-suite" },
  { label: "Payslip generator", href: "/finance-suite" },
  { label: "Loans & advances", href: "/finance-suite" },
  { label: "Exit & F&F", href: "/finance-suite" },
];
const SOCIAL = ["LinkedIn", "X", "YouTube", "Instagram"];

// Footer for every page on the HRMS subdomain.
export default function HrmsFooter() {
  return (
    <footer className="px-4 pt-6 pb-8">
      <div className={`${panel} mx-auto max-w-[1180px] overflow-hidden`}>
        <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,#F0206E,#FF9609,#FFB50D,#51AD38,#0C898D,#0067CC)]" />

        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#EEF2F7] bg-[#F8F6FF] px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex max-w-[560px] flex-col gap-1.5">
            <span className="font-semibold tracking-[-0.02em] text-[#101828]" style={{ fontSize: 26 }}>
              Bring HR, IT and Finance onto one record.
            </span>
            <span className="text-[15px] text-[#667085]">Explore every screen in the live demo — 1-click logins, no sign-up.</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Open the live demo <span aria-hidden="true">→</span>
            </a>
            <a href="#demo" className={btnOutline}>
              Book a demo
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12">
          <div className="flex max-w-[340px] flex-[1.4_1_280px] flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 text-[#101828]">
              <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
            </Link>
            <p className="text-[15px] leading-relaxed text-[#667085]">
              HR, IT and Finance suites on one employee record — with an AI assistant that answers your team’s everyday questions.
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#344054]">
              <li>[YOUR EMAIL]</li>
              <li>[YOUR PHONE]</li>
              <li>[YOUR OFFICE ADDRESS]</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a key={s} href="#" aria-label={`Uptrix on ${s} (add link)`} className="inline-flex min-h-9 items-center rounded-[10px] bg-white px-3 text-[13px] font-bold text-[#344054] shadow-[inset_0_0_0_1px_#E4E9F2]">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Suites">
            {SUBMENU.map((s) => (
              <Link key={s.href} href={s.href}>
                {s.label}
              </Link>
            ))}
            <a href="#roles">For every role</a>
          </FooterColumn>

          <FooterColumn title="HR modules">
            {HR_MODULES.map((m) => (
              <a key={m} href="/hr-suite">
                {m}
                {m === "AI Assistant" && <span className="ml-1.5 rounded-md bg-[#EFEAFF] px-1.5 py-0.5 text-[11px] font-extrabold text-[#3F289D]">New</span>}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="IT & Finance">
            {IT_FINANCE.map((m) => (
              <Link key={m.label} href={m.href}>
                {m.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            <a href="#">About Uptrix</a>
            <a href="#">Careers</a>
            <a href="#day">A day in Uptrix</a>
            <a href="#setup">Getting started</a>
            <a href="#demo">Contact us</a>
            <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer">
              Log in
            </a>
          </FooterColumn>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F7] bg-[#FBFCFE] px-6 py-5 text-[13px] sm:px-10">
          <span className="text-[#667085]">© 2026 Uptrix. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5 text-[#667085]">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Security</a>
            <a href="#">Cookie settings</a>
          </span>
          <span className="inline-flex items-center gap-2 font-bold text-[#344054]">
            <span className="h-1 w-7 rounded-sm bg-[linear-gradient(90deg,#F0206E,#FF9609,#0067CC)]" aria-hidden="true" />
            Made for HR, IT and Finance teams
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-[140px] flex-[1_1_150px] flex-col gap-3.5">
      <span className="text-[13px] font-extrabold text-[#101828]">{title}</span>
      <div className="flex flex-col gap-2.5 text-sm text-[#475467] [&_a]:text-[#475467] [&_a:hover]:text-[#101828]">{children}</div>
    </div>
  );
}
