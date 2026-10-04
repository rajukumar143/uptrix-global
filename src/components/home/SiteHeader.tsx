"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HomeContent } from "@/content/home";
import { Icon } from "./icons";

export default function SiteHeader({ content }: { content: HomeContent["header"] }) {
  const links = content.menuLinks.map((l) => ({ href: l.link || "#", label: l.label }));
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const solid = scrolled || menu;
  const close = () => setMenu(false);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-[10px] transition-[background,box-shadow] duration-250"
        style={{
          background: solid ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
          boxShadow: scrolled ? "0 1px 0 rgba(15,23,42,.06), 0 8px 24px -8px rgba(15,23,42,.10)" : "none",
        }}
      >
        <nav aria-label="Main" className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-6">
          <a href="#top" aria-label="Uptrix home" className="flex items-center">
            <Image
              src={solid ? "/logo-dark.png" : "/logo-light.png"}
              alt="Uptrix"
              width={756}
              height={235}
              priority
              className="h-9 w-auto"
            />
          </a>

          <ul className="hidden gap-9 text-[15px] font-medium lg:flex">
            {links.map((l, i) => (
              <li key={i}>
                <a
                  href={l.href}
                  aria-current={i === 0 ? "page" : undefined}
                  className={`transition-colors ${
                    solid
                      ? i === 0
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
                      : i === 0
                        ? "text-white"
                        : "text-slate-300 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={content.buttonLink || "#"}
            className="hidden h-11 shrink-0 items-center rounded-xl bg-indigo-brand px-5 text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_1px_2px_rgba(79,70,229,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(79,70,229,.55)] lg:inline-flex"
          >
            {content.buttonLabel}
          </a>

          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-xl border lg:hidden ${
              scrolled ? "border-slate-200 bg-white text-slate-900" : "border-white/30 bg-white/5 text-white"
            }`}
          >
            <Icon size={22}>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </Icon>
          </button>
        </nav>
      </header>

      {/* Mobile slide-in menu */}
      <div
        onClick={close}
        className="fixed inset-0 z-60 bg-slate-900/40 transition-opacity duration-300"
        style={{ opacity: menu ? 1 : 0, pointerEvents: menu ? "auto" : "none" }}
      />
      <aside
        id="mobile-menu"
        aria-label="Mobile menu"
        aria-hidden={!menu}
        className="fixed top-0 right-0 bottom-0 z-70 flex w-[min(320px,86vw)] flex-col gap-2 bg-white px-6 py-5 shadow-[-20px_0_40px_rgba(15,23,42,.12)] transition-transform duration-350"
        style={{ transform: menu ? "translateX(0)" : "translateX(100%)", visibility: menu ? "visible" : "hidden" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-900"
          >
            <Icon>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </Icon>
          </button>
        </div>
        {links.map((l, i) => (
          <a key={i} href={l.href} onClick={close} className="border-b border-slate-100 px-1 py-3.5 font-semibold text-slate-900">
            {l.label}
          </a>
        ))}
        <a
          href={content.buttonLink || "#"}
          onClick={close}
          className="mt-5 flex h-12 items-center justify-center rounded-xl bg-indigo-brand font-semibold text-white"
        >
          {content.buttonLabel}
        </a>
      </aside>
    </>
  );
}
