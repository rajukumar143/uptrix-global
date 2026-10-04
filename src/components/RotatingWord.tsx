"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Outer span animates in; inner span carries the gradient text (kept separate so the two animations don't clash).
  return (
    <span key={i} className="animate-word-in inline-block whitespace-nowrap">
      <span className="text-brand-gradient">{words[i]}</span>
    </span>
  );
}
