import Image from "next/image";
import Link from "next/link";
import { Glyph } from "@/components/suites/parts";
import { HOME_LINKS, SUBMENU } from "@/content/hrms-home";

const panel = "rounded-[28px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_24px_48px_-24px_rgba(16,24,40,0.18)]";

// Header for every page on the HRMS subdomain: logo, Suites dropdown and the main actions.
export default function HrmsHeader() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-3.5">
      <div className={`${panel} mx-auto flex max-w-[1132px] items-center justify-between gap-3 rounded-[20px] bg-white/90 py-2 pr-2 pl-4 backdrop-blur`}>
        <Link href="/" className="flex items-center gap-2.5 text-[#101828]">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
        </Link>
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
          <Link href="/#day" className="inline-flex min-h-10 items-center px-3 text-sm font-semibold text-[#475467]">A day in Uptrix</Link>
          <Link href="/#roles" className="inline-flex min-h-10 items-center px-3 text-sm font-semibold text-[#475467]">For every role</Link>
          <Link href="/#setup" className="inline-flex min-h-10 items-center px-3 text-sm font-semibold text-[#475467]">Get started</Link>
        </nav>
        <div className="flex items-center gap-1.5">
          <a href={HOME_LINKS.app} target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center px-3 text-sm font-semibold text-[#475467] sm:inline-flex">
            Log in
          </a>
          <Link href="/#demo" className="inline-flex min-h-10 items-center rounded-xl bg-[#3F289D] px-4 text-sm font-bold text-white">
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
