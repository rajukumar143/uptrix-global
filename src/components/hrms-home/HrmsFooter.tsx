import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_URL } from "@/content/hrms";

const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";
const btnPrimary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3F289D] px-6 font-bold text-white hover:bg-[#2F1E7A]";
const btnOutline = "inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 font-bold text-[#101828] shadow-[inset_0_0_0_1px_#D5DCE8] hover:shadow-[inset_0_0_0_1px_#101828]";

export type FooterContent = {
  headline: string;
  lead: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  social: string[];
  hrModules: { label: string; href: string }[];
  itFinance: { label: string; href: string }[];
  copyright: string;
  madeFor: string;
};
type SubItem = { label: string; href: string };

// Footer for every page on the HRMS subdomain.
export default function HrmsFooter({ submenu, footer }: { submenu: SubItem[]; footer: FooterContent }) {
  return (
    <footer className="px-4 pt-6 pb-8">
      <div className={`${panel} mx-auto max-w-[1180px] overflow-hidden`}>
        <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,#F0206E,#FF9609,#FFB50D,#51AD38,#0C898D,#0067CC)]" />

        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#EEF2F7] bg-[#F8F6FF] px-6 py-7 sm:px-10 sm:py-9">
          <div className="flex max-w-[560px] flex-col gap-1.5">
            <span className="font-semibold tracking-[-0.02em] text-[#101828]" style={{ fontSize: 26 }}>
              {footer.headline}
            </span>
            <span className="text-[15px] text-[#667085]">{footer.lead}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Open the live demo <span aria-hidden="true">→</span>
            </a>
            <Link href="/#demo" className={btnOutline}>
              Book a demo
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12">
          <div className="flex max-w-[340px] flex-[1.4_1_280px] flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 text-[#101828]">
              <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
            </Link>
            <p className="text-[15px] leading-relaxed text-[#667085]">{footer.tagline}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#344054]">
              <li>{footer.email}</li>
              <li>{footer.phone}</li>
              <li>{footer.address}</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {footer.social.map((s) => (
                <a key={s} href="#" aria-label={`Uptrix on ${s} (add link)`} className="inline-flex min-h-9 items-center rounded-[10px] bg-white px-3 text-[13px] font-bold text-[#344054] shadow-[inset_0_0_0_1px_#E4E9F2]">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Suites">
            {submenu.map((s) => (
              <Link key={s.href} href={s.href}>
                {s.label}
              </Link>
            ))}
            <Link href="/#roles">For every role</Link>
          </FooterColumn>

          <FooterColumn title="HR modules">
            {footer.hrModules.map((m) => (
              <Link key={m.label} href={m.href}>
                {m.label}
                {m.label === "AI Assistant" && <span className="ml-1.5 rounded-md bg-[#EFEAFF] px-1.5 py-0.5 text-[11px] font-extrabold text-[#3F289D]">New</span>}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="IT & Finance">
            {footer.itFinance.map((m) => (
              <Link key={m.label} href={m.href}>
                {m.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            <a href="#">About Uptrix</a>
            <a href="#">Careers</a>
            <Link href="/#day">A day in Uptrix</Link>
            <Link href="/#setup">Getting started</Link>
            <Link href="/#demo">Contact us</Link>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer">
              Log in
            </a>
          </FooterColumn>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F7] bg-[#FBFCFE] px-6 py-5 text-[13px] sm:px-10">
          <span className="text-[#667085]">{footer.copyright}</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5 text-[#667085]">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Security</a>
            <a href="#">Cookie settings</a>
          </span>
          <span className="inline-flex items-center gap-2 font-bold text-[#344054]">
            <span className="h-1 w-7 rounded-sm bg-[linear-gradient(90deg,#F0206E,#FF9609,#0067CC)]" aria-hidden="true" />
            {footer.madeFor}
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
