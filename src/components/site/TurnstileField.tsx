"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type WidgetOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: WidgetOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export default function TurnstileField() {
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!scriptReady || !siteKey || !container.current || !window.turnstile) return;
    const widgetId = window.turnstile.render(container.current, {
      sitekey: siteKey,
      callback: () => {},
      "expired-callback": () => {},
      "error-callback": () => {},
    });
    return () => window.turnstile?.remove(widgetId);
  }, [scriptReady, siteKey]);

  if (!siteKey) {
    return process.env.NODE_ENV === "production" ? (
      <p role="status" className="text-sm text-amber-700">Form verification is not configured.</p>
    ) : null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={container} />
    </>
  );
}
