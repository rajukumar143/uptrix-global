"use client";

import { useState } from "react";

export default function PulseFaq({ questions }: { questions: { question: string; answer: string }[] }) {
  const faqs = questions.map((q) => [q.question, q.answer]);
  const [open, setOpen] = useState(0);

  return (
    <div className="flex min-w-0 flex-col border-t border-pulse-line">
      {faqs.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-pulse-line">
            <h3>
              <button
                type="button"
                id={`pfaq-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`pfaq-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-[18px] text-left text-[17px] font-bold text-pulse-ink"
              >
                <span>{q}</span>
                <span
                  aria-hidden
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d9dbe6] text-lg text-pulse transition-transform duration-250 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`pfaq-p${i}`}
              role="region"
              aria-labelledby={`pfaq-b${i}`}
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pr-12 pb-[22px] text-base leading-relaxed text-pulse-muted">{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
