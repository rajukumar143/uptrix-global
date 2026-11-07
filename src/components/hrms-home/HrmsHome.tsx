import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HrmsDemoForm from "@/components/hrms/HrmsDemoForm";
import HrmsHeader from "./HrmsHeader";
import { Glyph } from "@/components/suites/parts";
import { DAY, HOME_LINKS, INTERVIEW, ORBIT, PRINCIPLES, QUESTIONS, SUBMENU } from "@/content/hrms-home";
import { RoleSwitcher, SetupSection } from "./HomeInteractive";

const container = "mx-auto w-full max-w-[1180px] px-6";
const sec = "scroll-mt-24 py-20 sm:py-28";
const kicker = "inline-flex items-center gap-2 text-[13px] font-extrabold text-[#3F289D]";
const h2 = "font-semibold leading-[1.06] tracking-[-0.03em] text-[#101828] text-[clamp(30px,4vw,46px)] text-balance";
const dot = <span className="h-1.5 w-1.5 rounded-full bg-[#F0206E]" aria-hidden="true" />;
const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";
const grad = "bg-[linear-gradient(90deg,#F0206E_0%,#FF9609_40%,#0067CC_100%)] bg-clip-text text-transparent";
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

export default function HrmsHome() {
  return (
    <div className="bg-[#F3F6FB] font-sans text-[#475467] antialiased">
      <HrmsHeader />


      <main>
        {/* Hero */}
        <section id="top" className="relative overflow-hidden bg-[radial-gradient(#D3DBE8_1px,transparent_1px)] pt-16 pb-24 [background-size:22px_22px] sm:pt-20">
          <div className={`${container} flex flex-wrap items-center gap-14`}>
            <div className="flex min-w-0 flex-[1_1_500px] flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold text-[#101828] shadow-[inset_0_0_0_1px_#E4E9F2]">
                <span className="h-2 w-2 rounded-full bg-[#51AD38]" />
                HR · IT · Finance — one platform
              </span>
              <h1 className="font-semibold leading-[1] tracking-[-0.035em] text-[#101828] text-[clamp(44px,6vw,74px)] text-balance">
                Everything about your people, <span className={grad}>in one orbit.</span>
              </h1>
              <p className="max-w-[520px] text-lg leading-relaxed text-[#475467] sm:text-[19px]">
                Uptrix keeps every employee’s record at the centre — and lets HR, IT and Finance work from it together. No re-typing, no lost spreadsheets.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  Explore the live demo <span aria-hidden="true">→</span>
                </a>
                <a href="#demo" className={btnOutline}>
                  Book a demo
                </a>
              </div>
            </div>

            {/* Orbit diagram */}
            <div role="img" aria-label="Diagram: one employee record at the centre, connected to the HR, IT and Finance suites" className="relative aspect-square w-full max-w-[520px] flex-[1_1_440px]">
              <span className="absolute inset-0 rounded-full border border-dashed border-[#C6D0E1]" />
              <span className="absolute inset-[13%] rounded-full border border-dashed border-[#C6D0E1]" />
              <span className="absolute inset-[26%] rounded-full border border-[#E4E9F2]" />
              <div className={`${panel} absolute top-1/2 left-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-[32px] text-center`}>
                <img src="/logo-mark.png" alt="" className="h-10 w-auto" />
                <span className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>
                  One employee
                  <br />
                  record
                </span>
              </div>
              {ORBIT.map((o) => (
                <div key={o.name} className={`${panel} absolute flex max-w-[220px] items-center gap-2.5 rounded-[18px] py-3 pr-3.5 pl-3 ${o.pos}`}>
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl" style={{ background: o.accent.bg, color: o.accent.fg }}>
                    <Glyph d={o.icon} size={18} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-extrabold text-[#101828]">{o.name}</span>
                    <span className="text-xs text-[#667085]">{o.note}</span>
                  </span>
                </div>
              ))}
              <div className={`${panel} absolute top-[44%] right-[2%] flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold text-[#101828]`}>
                <span className="flex text-[#FF9609]">
                  <Glyph d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" size={14} stroke={2.4} />
                </span>
                AI Assistant
              </div>
            </div>
          </div>
        </section>

        {/* A day */}
        <section id="day" className={`${sec} pt-12`}>
          <div className={container}>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <div className="flex max-w-[640px] flex-col gap-3.5">
                <span className={kicker}>
                  {dot}A day in Uptrix
                </span>
                <h2 className={h2}>One Tuesday at Demo Company.</h2>
              </div>
              <p className="max-w-[360px] text-[15px] text-[#667085]">Six moments, three teams, one record — scroll through a normal working day.</p>
            </div>
            <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-2 pb-6">
              {DAY.map((d) => (
                <li key={d.time + d.who} className="flex w-[260px] shrink-0 snap-start flex-col gap-3.5">
                  <span className="flex items-center gap-2.5">
                    <span className="bg-[#F3F6FB] pr-2 font-semibold text-[#101828]" style={{ fontSize: 22 }}>
                      {d.time}
                    </span>
                    <span className="h-3.5 w-3.5 rounded-full ring-4 ring-[#F3F6FB]" style={{ background: d.dot }} />
                  </span>
                  <div className={`${panel} flex min-h-[190px] flex-col gap-3 p-5`}>
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold" style={{ background: d.accent.bg, color: d.accent.fg }}>
                        {d.init}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-extrabold text-[#101828]">{d.who}</span>
                        <span className="text-xs text-[#667085]">{d.role}</span>
                      </span>
                    </span>
                    <p className="text-base leading-snug font-semibold text-[#101828]">{d.what}</p>
                    <span className="mt-auto inline-flex w-fit rounded-lg px-2.5 py-1 text-xs font-extrabold" style={{ background: d.accent.bg, color: d.accent.fg }}>
                      {d.suite}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className={`${sec} bg-white`}>
          <div className={`${container} flex flex-col items-center gap-7`}>
            <div className="flex max-w-[720px] flex-col items-center gap-3.5 text-center">
              <span className={kicker}>
                {dot}For every role
              </span>
              <h2 className={h2}>
                See Uptrix through <span className={grad}>your eyes.</span>
              </h2>
            </div>
            <RoleSwitcher />
          </div>
        </section>

        {/* Questions */}
        <section className={sec}>
          <div className={container}>
            <div className="mb-10 flex max-w-[760px] flex-col gap-3.5">
              <span className={kicker}>
                {dot}Questions it answers
              </span>
              <h2 className={h2}>Questions, answered in seconds.</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
              {QUESTIONS.map((q) => (
                <article key={q.q} className={`${panel} flex flex-col gap-4 border-t-4 p-7`} style={{ borderTopColor: q.top }}>
                  <p className="font-semibold leading-snug tracking-[-0.01em] text-[#101828]" style={{ fontSize: 18 }}>
                    “{q.q}”
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#475467]">{q.a}</p>
                  <span className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#667085]">Asked by {q.who}</span>
                    <span className="rounded-lg px-2.5 py-1 text-xs font-extrabold" style={{ background: q.accent.bg, color: q.accent.fg }}>
                      {q.module}
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className={`${sec} bg-white`}>
          <div className={`${container} flex flex-wrap gap-14`}>
            <div className="sticky top-32 flex flex-[1_1_340px] flex-col gap-4 self-start">
              <span className={kicker}>
                {dot}How we build
              </span>
              <h2 className={h2}>Three promises behind every screen.</h2>
              <p className="text-[17px] leading-relaxed text-[#475467]">Uptrix is built around a few simple ideas — so it stays easy as your company grows.</p>
            </div>
            <ol className="flex min-w-0 flex-[1.4_1_520px] flex-col gap-4">
              {PRINCIPLES.map((p) => (
                <li key={p.n} className="flex gap-6 rounded-[24px] bg-[#F3F6FB] p-8">
                  <span className="font-semibold leading-[0.9]" style={{ fontSize: 56, color: p.c }}>
                    {p.n}
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="font-semibold text-[#101828]" style={{ fontSize: 24 }}>
                      {p.t}
                    </span>
                    <span className="text-base leading-relaxed text-[#475467]">{p.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Interview (sample) */}
        <section className={`${sec} bg-[#F3F6FB]`}>
          <div className={`${container} flex flex-wrap items-start gap-12`}>
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image src="/images/suites/team-meeting.png" alt="A team in a meeting room listening to a colleague present" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFEAFF] text-[13px] font-extrabold text-[#3F289D]">HR</span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-extrabold text-[#101828]">[Customer name]</span>
                  <span className="text-sm text-[#667085]">[Head of HR], [Company] · [City]</span>
                </span>
              </span>
            </div>
            <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-3.5">
              <span className={kicker}>
                {dot}In conversation
              </span>
              <h2 className={h2}>“We stopped being the company’s help desk.”</h2>
              <span className="inline-flex w-fit rounded-lg bg-[#FFF4E5] px-2.5 py-1.5 text-xs font-extrabold text-[#8A4600]">
                Sample interview — replace with a real customer before launch
              </span>
              <div className="mt-3 flex flex-col">
                {INTERVIEW.map((x) => (
                  <div key={x.q} className="flex flex-col gap-2 border-t border-[#DDE4EF] py-5">
                    <span className="text-sm font-extrabold text-[#3F289D]">{x.q}</span>
                    <span className="text-base leading-relaxed text-[#101828]">{x.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Setup */}
        <section id="setup" className={`${sec} bg-white`}>
          <div className={container}>
            <SetupSection>
              <span className={kicker}>
                {dot}Get started
              </span>
              <h2 className={h2}>
                Your first week, <span className={grad}>checked off.</span>
              </h2>
              <p className="text-[17px] leading-relaxed text-[#475467]">Tick through the setup the way our customers do. Most teams finish it in their first week.</p>
            </SetupSection>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className={`${sec} bg-[#F3F6FB] pt-10`}>
          <div className={container}>
            <div className={`${panel} flex flex-wrap gap-3 p-3`}>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5 rounded-[20px] bg-[#F6F3FF] bg-[radial-gradient(#D3DBE8_1px,transparent_1px)] p-10 [background-size:22px_22px] sm:p-12">
                <span className={kicker}>
                  {dot}Book a demo
                </span>
                <h2 className={h2}>
                  See Uptrix with <span className={grad}>your own team.</span>
                </h2>
                <p className="text-base leading-relaxed text-[#475467]">
                  Tell us a little about your team and we’ll walk you through Uptrix with your own use cases — or jump straight into the live demo.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {["30-minute walkthrough", "Setup help included", "1-click live demo, no sign-up"].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[15px] font-semibold text-[#101828]">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#3F289D] text-white">
                        <Glyph d="M20 6 9 17l-5-5" size={12} stroke={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className="mt-auto font-bold text-[#3F289D] underline underline-offset-4">
                  Or open the live demo →
                </a>
              </div>
              <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-4 p-8 sm:p-10">
                <HrmsDemoForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 pt-6 pb-8">
        <div className={`${panel} mx-auto max-w-[1180px] overflow-hidden`}>
          <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,#F0206E,#FF9609,#FFB50D,#51AD38,#0C898D,#0067CC)]" />

          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#EEF2F7] bg-[#F8F6FF] px-10 py-9">
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

          <div className="flex flex-wrap gap-12 px-10 py-12">
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

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F7] bg-[#FBFCFE] px-10 py-5 text-[13px]">
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
    </div>
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
