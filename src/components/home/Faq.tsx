"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { Icon } from "./icons";

export default function Faq({ questions }: { questions: HomeContent["faq"]["questions"] }) {
  const faqs = questions.map((f) => ({ q: f.question, a: f.answer }));
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col border-t border-slate-200">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-slate-200">
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-6 text-left font-display text-lg font-semibold text-slate-900"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition duration-300 ${
                    isOpen ? "rotate-45 bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <Icon size={16}>
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </Icon>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className="grid transition-[grid-template-rows] duration-350"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pr-[clamp(0px,5vw,56px)] pb-6 text-base">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
