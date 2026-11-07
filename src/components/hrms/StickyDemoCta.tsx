"use client";

import { useEffect, useState } from "react";

// Shows a "Book a Demo" button once the hero has scrolled away, and hides it while the demo form is on screen.
export default function StickyDemoCta({ label }: { label: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [atDemo, setAtDemo] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const demo = document.getElementById("demo");
    if (!hero || !demo || !("IntersectionObserver" in window)) {
      // Without IntersectionObserver, fall back to showing it after a short scroll.
      const onScroll = () => setPastHero(window.scrollY > 600);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const heroObs = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    const demoObs = new IntersectionObserver(([entry]) => setAtDemo(entry.isIntersecting));
    heroObs.observe(hero);
    demoObs.observe(demo);
    return () => {
      heroObs.disconnect();
      demoObs.disconnect();
    };
  }, []);

  const visible = pastHero && !atDemo;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur transition-transform duration-300 md:inset-x-auto md:right-6 md:bottom-6 md:rounded-2xl md:border md:px-3 md:py-3 ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full md:translate-y-[150%]"
      }`}
    >
      <a
        href="#demo"
        tabIndex={visible ? 0 : -1}
        className="flex min-h-12 items-center justify-center rounded-xl bg-[#c2410c] px-6 text-base font-bold text-white transition hover:bg-[#9a3412]"
      >
        {label}
      </a>
    </div>
  );
}
