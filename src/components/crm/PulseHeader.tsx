"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CrmLayoutContent } from "@/content/crm";

export default function PulseHeader({ content }: { content: CrmLayoutContent["header"] }) {
  const links = content.menuLinks.map((l) => ({ label: l.label, href: l.link || "#" }));
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1000 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-pulse-line bg-[rgba(247,247,251,0.88)] backdrop-blur-md backdrop-saturate-[1.4]">
        <nav aria-label="Main" className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-[clamp(20px,4vw,40px)]">
          <Link href="/crm" aria-label="Uptrix Pulse home" className="flex items-center gap-2.5">
            <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} priority className="h-9 w-auto" />
            <span className="rounded-full border border-[#cfd0f5] px-2 py-1 font-code text-[11px] tracking-[0.08em] text-pulse uppercase">
              {content.badge}
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[15px] font-semibold min-[1000px]:flex">
            {links.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`hover:text-pulse ${pathname === l.href ? "text-pulse" : "text-[#2a2f4d]"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 min-[1000px]:flex">
            {/* PLACEHOLDER: point Login at the real Pulse app URL */}
            <Link href={content.loginLink || "#"} className="px-3.5 py-2.5 text-[15px] font-semibold text-[#2a2f4d] hover:text-pulse">
              {content.loginLabel}
            </Link>
            <Link href={content.demoButtonLink || "#"} className="flex min-h-11 items-center rounded-[10px] bg-pulse px-5 py-3 text-[15px] font-bold whitespace-nowrap text-white hover:bg-pulse-hover">
              {content.demoButtonLabel}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[10px] border border-[#d9dbe6] bg-white min-[1000px]:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-0.5 w-[18px] rounded-sm bg-pulse-ink" />
            ))}
          </button>
        </nav>
      </header>

      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[90] bg-[rgba(14,19,48,0.45)] transition-opacity duration-250 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(86vw,360px)] flex-col bg-white px-6 pt-5 pb-7 shadow-[-20px_0_60px_rgba(14,19,48,0.18)] transition-[transform,visibility] duration-300 ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex h-11 items-center justify-between">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="h-11 w-11 cursor-pointer rounded-[10px] border border-[#d9dbe6] bg-white text-[22px] leading-none text-pulse-ink"
          >
            ×
          </button>
        </div>
        <div className="mt-7 flex flex-col text-[19px] font-bold">
          {links.map((l, i) => (
            <Link key={i} href={l.href} onClick={close} className="border-b border-[#eef0f5] py-3.5 text-pulse-ink">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2.5">
          <Link href={content.demoButtonLink || "#"} onClick={close} className="rounded-xl bg-pulse p-[15px] text-center font-bold text-white">
            {content.demoButtonLabel}
          </Link>
          <Link href={content.loginLink || "#"} onClick={close} className="rounded-xl border border-[#d9dbe6] p-[15px] text-center font-bold text-pulse-ink">
            {content.loginLabel}
          </Link>
        </div>
      </aside>
    </>
  );
}
