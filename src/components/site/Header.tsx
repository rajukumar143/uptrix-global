"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderContent } from "@/content/header";

const path = (href: string) => href.split("#")[0] || "/";
// A link is "current" on its own page and on pages below it (e.g. Blog on /blog/my-post)
const isCurrent = (pathname: string, href: string) =>
  !href.includes("#") && (href === pathname || (href !== "/" && pathname.startsWith(`${href}/`)));

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * The menu at the top of every public page. `overlay` makes it see-through over the dark home hero
 * until the visitor scrolls.
 */
export default function Header({ content, overlay = false }: { content: HeaderContent; overlay?: boolean }) {
  const pathname = usePathname();
  const products = content.products.filter((p) => p.label);
  const productPaths = products.flatMap((p) => [p.link, ...p.subLinks.map((s) => s.link)]).map(path);
  const primaryPaths = new Set([path(content.homeLink || "/"), ...productPaths]);
  const links = content.menuLinks.filter((link) => link.label && !primaryPaths.has(path(link.link)));
  const productsActive = productPaths.some((p) => p !== "/" && p === pathname);

  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(false); // desktop Products panel
  const [menu, setMenu] = useState(false); // mobile drawer
  const [mobileProducts, setMobileProducts] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrop(false);
        setMenu(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false);
    };
    const onResize = () => window.innerWidth >= 1080 && setMenu(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (menu) setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const closeAll = () => {
    setDrop(false);
    setMenu(false);
  };
  const hoverOpen = () => {
    clearTimeout(hoverTimer.current);
    setDrop(true);
  };
  const hoverClose = () => {
    hoverTimer.current = setTimeout(() => setDrop(false), 150);
  };

  // See-through only on the home hero, before scrolling and while nothing is open
  const clear = overlay && !scrolled && !drop;
  const linkTone = (active: boolean) =>
    clear ? (active ? "text-white" : "text-slate-300 hover:text-white") : active ? "text-pulse" : "text-[#2a2f4d] hover:text-pulse";

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 font-sans transition-[background,box-shadow,border-color] duration-250 ${overlay ? "fixed" : "sticky"} ${
          clear ? "border-b border-transparent bg-transparent" : "border-b border-pulse-line bg-white/95 backdrop-blur-md backdrop-saturate-150"
        } ${scrolled ? "shadow-[0_8px_24px_-12px_rgba(15,23,42,0.14)]" : ""}`}
      >
        <nav aria-label="Main" className="mx-auto flex h-18 max-w-[1240px] items-center justify-between gap-6 px-[clamp(16px,4vw,40px)]">
          <Link href={content.homeLink || "/"} aria-label="Uptrix home" className="flex shrink-0 items-center">
            <Image src={clear ? "/logo-light.png" : "/logo-dark.png"} alt="Uptrix" width={756} height={235} className="h-9 w-auto" />
          </Link>

          <ul className="hidden items-center gap-[clamp(18px,2vw,30px)] text-[15px] font-semibold min-[1080px]:flex">
            {content.homeLabel && (
              <li>
                <Link href={content.homeLink || "/"} aria-current={pathname === "/" ? "page" : undefined} className={`transition-colors ${linkTone(pathname === "/")}`}>
                  {content.homeLabel}
                </Link>
              </li>
            )}

            {products.length > 0 && (
              <li ref={dropRef} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
                <button
                  type="button"
                  aria-expanded={drop}
                  aria-controls="products-menu"
                  onClick={() => setDrop((d) => !d)}
                  className={`flex cursor-pointer items-center gap-1.5 py-6 transition-colors ${linkTone(productsActive || drop)}`}
                >
                  {content.productsLabel}
                  <Chevron open={drop} />
                </button>

                <div
                  id="products-menu"
                  className={`absolute top-full left-1/2 w-[min(640px,90vw)] -translate-x-1/2 pt-1 transition-[opacity,transform,visibility] duration-200 ${
                    drop ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-pulse-line bg-white p-3 shadow-[0_24px_60px_-20px_rgba(14,19,48,0.35)]">
                    {products.map((p, i) => (
                      <div key={i} className="flex flex-col gap-1 rounded-xl p-2">
                        <Link
                          href={p.link || "#"}
                          onClick={closeAll}
                          aria-current={path(p.link) === pathname && !p.link.includes("#") ? "page" : undefined}
                          className="group flex flex-col gap-1 rounded-xl p-3 hover:bg-pulse-bg"
                        >
                          <span className="flex items-center gap-2 text-base font-extrabold text-pulse-ink group-hover:text-pulse">
                            <span aria-hidden className={`h-2 w-2 rounded-full ${i % 2 ? "bg-[#22b07d]" : "bg-pulse"}`} />
                            {p.label}
                          </span>
                          {p.description && <span className="text-[13px] leading-snug font-medium text-pulse-subtle">{p.description}</span>}
                        </Link>
                        {p.subLinks.filter((s) => s.label).length > 0 && (
                          <ul className="ml-3 flex flex-col gap-0.5 border-l border-pulse-line pl-2">
                            {p.subLinks
                              .filter((s) => s.label)
                              .map((s, j) => (
                                <li key={j}>
                                  <Link
                                    href={s.link || "#"}
                                    onClick={closeAll}
                                    aria-current={isCurrent(pathname, s.link) ? "page" : undefined}
                                    className={`flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-pulse-bg ${isCurrent(pathname, s.link) ? "bg-pulse-soft" : ""}`}
                                  >
                                    <span className="text-[15px] font-bold text-pulse-ink">{s.label}</span>
                                    {s.description && <span className="text-[13px] leading-snug font-medium text-pulse-faint">{s.description}</span>}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )}

            {links.map((l, i) => {
              const active = isCurrent(pathname, l.link);
              return (
                <li key={i}>
                  <Link href={l.link || "#"} aria-current={active ? "page" : undefined} className={`whitespace-nowrap transition-colors ${linkTone(active)}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 min-[1080px]:flex">
            {content.loginLabel && (
              <Link href={content.loginLink || "#"} className={`hidden px-3 py-2.5 text-[15px] font-semibold transition-colors min-[1240px]:block ${linkTone(false)}`}>
                {content.loginLabel}
              </Link>
            )}
            {content.buttonLabel && (
              <Link
                href={content.buttonLink || "#"}
                data-analytics-cta
                className="flex min-h-11 items-center rounded-xl bg-pulse px-5 text-[15px] font-bold whitespace-nowrap text-white shadow-[0_10px_24px_-12px_rgba(59,63,212,0.7)] transition hover:-translate-y-0.5 hover:bg-pulse-hover"
              >
                {content.buttonLabel}
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(true)}
            className={`flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border min-[1080px]:hidden ${
              clear ? "border-white/30 bg-white/5" : "border-[#d9dbe6] bg-white"
            }`}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-0.5 w-[18px] rounded-sm ${clear ? "bg-white" : "bg-pulse-ink"}`} />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile slide-in menu */}
      <div
        aria-hidden
        onClick={closeAll}
        className={`fixed inset-0 z-[90] bg-[rgba(14,19,48,0.45)] transition-opacity duration-250 ${menu ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menu}
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-white px-6 pt-5 pb-7 font-sans shadow-[-20px_0_60px_rgba(14,19,48,0.18)] transition-[transform,visibility] duration-300 ${
          menu ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex h-11 items-center justify-between">
          <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} className="h-8 w-auto" />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={closeAll}
            className="h-11 w-11 cursor-pointer rounded-xl border border-[#d9dbe6] bg-white text-[22px] leading-none text-pulse-ink"
          >
            ×
          </button>
        </div>

        <div className="mt-6 flex flex-col text-[18px] font-bold text-pulse-ink">
          {content.homeLabel && (
            <Link href={content.homeLink || "/"} onClick={closeAll} className="border-b border-[#eef0f5] py-3.5">
              {content.homeLabel}
            </Link>
          )}

          {products.length > 0 && (
            <div className="border-b border-[#eef0f5]">
              <button
                type="button"
                aria-expanded={mobileProducts}
                aria-controls="mobile-products"
                onClick={() => setMobileProducts((o) => !o)}
                className="flex w-full cursor-pointer items-center justify-between py-3.5 text-left"
              >
                {content.productsLabel}
                <Chevron open={mobileProducts} />
              </button>
              <div id="mobile-products" hidden={!mobileProducts} className="flex flex-col gap-1 pb-3">
                {products.map((p, i) => (
                  <div key={i} className="flex flex-col">
                    <Link href={p.link || "#"} onClick={closeAll} className="rounded-lg px-3 py-2.5 text-[16px] font-extrabold hover:bg-pulse-bg">
                      {p.label}
                    </Link>
                    {p.subLinks
                      .filter((s) => s.label)
                      .map((s, j) => (
                        <Link
                          key={j}
                          href={s.link || "#"}
                          onClick={closeAll}
                          className="ml-3 border-l border-pulse-line py-2 pl-4 text-[15px] font-semibold text-pulse-muted hover:text-pulse"
                        >
                          {s.label}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {links.map((l, i) => (
            <Link key={i} href={l.link || "#"} onClick={closeAll} className="border-b border-[#eef0f5] py-3.5">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-8">
          {content.buttonLabel && (
            <Link href={content.buttonLink || "#"} onClick={closeAll} data-analytics-cta className="rounded-xl bg-pulse p-[15px] text-center font-bold text-white">
              {content.buttonLabel}
            </Link>
          )}
          {content.loginLabel && (
            <Link href={content.loginLink || "#"} onClick={closeAll} className="rounded-xl border border-[#d9dbe6] p-[15px] text-center font-bold text-pulse-ink">
              {content.loginLabel}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
