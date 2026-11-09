import Image from "next/image";
import Link from "next/link";
import { Glyph } from "@/components/suites/parts";
import { HOME_LINKS, SUBMENU } from "@/content/hrms-home";

const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";
const anchors = [
  { label: "A day in Uptrix", href: "/#day" },
  { label: "For every role", href: "/#roles" },
  { label: "Get started", href: "/#setup" },
];

// Header for every page on the HRMS subdomain: logo, Suites dropdown and the main actions.
// Below the md breakpoint the links move into a menu button, so phones can still reach every page.
export default function HrmsHeader({ tint = "#F3F6FB" }: { tint?: string }) {
  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-4 sm:pt-3.5" style={{ background: tint }}>
      <div className={`${panel} mx-auto flex max-w-[1132px] items-center justify-between gap-2 rounded-[20px] bg-white/90 py-2 pr-2 pl-3 backdrop-blur sm:gap-3 sm:pl-4`}>
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[#101828]">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-7 w-auto sm:h-8" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <details className="relative">
            <summary className="flex min-h-10 cursor-pointer list-none items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-[#101828] [&::-webkit-details-marker]:hidden">
              Suites
              <Glyph d="m6 9 6 6 6-6" size={14} stroke={2.2} />
            </summary>
            <div className={`${panel} absolute top-[calc(100%+12px)] left-1/2 z-40 flex w-[320px] -translate-x-1/2 flex-col gap-0.5 p-2`}>
              {SUBMENU.map((s) => (
                <Link key={s.href} href={s.href} className="flex items-center gap-3 rounded-[14px] p-3 hover:bg-[#F3F6FB]">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl" style={{ background: s.accent.bg, color: s.accent.fg }}>
                    <Glyph d={s.icon} size={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-[#101828]">{s.label}</span>
                    <span className="text-[13px] text-[#667085]">{s.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </details>
          {anchors.map((a) => (
            <Link key={a.href} href={a.href} className="inline-flex min-h-10 items-center px-3 text-sm font-semibold text-[#475467]">
              {a.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center px-3 text-sm font-semibold text-[#475467] sm:inline-flex">
            Log in
          </a>
          <Link href="/#demo" className="inline-flex min-h-10 items-center rounded-xl bg-[#3F289D] px-3.5 text-sm font-bold whitespace-nowrap text-white sm:px-4">
            Book a demo
          </Link>

          {/* Phone menu */}
          <details className="relative md:hidden">
            <summary aria-label="Open menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl text-[#101828] hover:bg-[#F3F6FB] [&::-webkit-details-marker]:hidden">
              <Glyph d="M4 7h16M4 12h16M4 17h16" size={20} stroke={2.2} />
            </summary>
            <div className={`${panel} absolute top-[calc(100%+12px)] right-0 z-40 flex w-[280px] max-w-[calc(100vw-2rem)] flex-col gap-0.5 p-2`}>
              {SUBMENU.map((s) => (
                <Link key={s.href} href={s.href} className="flex items-center gap-3 rounded-[14px] p-3 hover:bg-[#F3F6FB]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: s.accent.bg, color: s.accent.fg }}>
                    <Glyph d={s.icon} size={17} />
                  </span>
                  <span className="text-sm font-bold text-[#101828]">{s.label}</span>
                </Link>
              ))}
              <div className="my-1 h-px bg-[#EEF2F7]" />
              {anchors.map((a) => (
                <Link key={a.href} href={a.href} className="rounded-[14px] p-3 text-sm font-semibold text-[#344054] hover:bg-[#F3F6FB]">
                  {a.label}
                </Link>
              ))}
              <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className="rounded-[14px] p-3 text-sm font-semibold text-[#344054] hover:bg-[#F3F6FB]">
                Log in
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
