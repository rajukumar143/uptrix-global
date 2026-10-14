"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Uptrix" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Uptrix Global home">
          <Image src="/logo.png" alt="Uptrix Global" width={756} height={235} className="h-9 w-auto" />
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-white/60 transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          data-analytics-cta
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/85"
        >
          Book a demo
        </a>
      </nav>
    </header>
  );
}
