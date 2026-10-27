"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "uptrix-analytics-consent";
const CONSENT_CHANGE = "uptrix-analytics-consent-change";
const measurementId = process.env.NEXT_PUBLIC_GA4_ID;

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE, callback);
  };
}

function getConsentSnapshot(): Consent {
  const saved = window.localStorage.getItem(CONSENT_KEY);
  return saved === "accepted" || saved === "rejected" ? saved : null;
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (consent !== "accepted" || !measurementId) return;

    const trackSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      window.gtag?.("event", "form_submit", {
        form_id: form.id || form.getAttribute("name") || "website_form",
      });
    };
    const trackCta = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const cta = event.target.closest<HTMLElement>("[data-analytics-cta]");
      if (!cta) return;
      window.gtag?.("event", "cta_click", {
        cta_label: cta.getAttribute("aria-label") || cta.textContent?.trim().slice(0, 100) || "unnamed",
      });
    };

    document.addEventListener("submit", trackSubmit, true);
    document.addEventListener("click", trackCta);
    return () => {
      document.removeEventListener("submit", trackSubmit, true);
      document.removeEventListener("click", trackCta);
    };
  }, [consent]);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGE));
    if (value === "rejected") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0]?.trim();
        if (name === "_ga" || name?.startsWith("_ga_")) {
          document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        }
      }
    }
    setPreferencesOpen(false);
  };

  if (!measurementId) return null;

  return (
    <>
      {consent === "accepted" && measurementId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
          strategy="afterInteractive"
          onReady={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
            window.gtag("consent", "update", { analytics_storage: "granted" });
            window.gtag("js", new Date());
            window.gtag("config", measurementId);
          }}
        />
      )}
      {(consent === null || preferencesOpen) && (
        <aside
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:gap-5 sm:p-5"
        >
          <p className="flex-1 text-sm leading-relaxed text-slate-700">
            We use analytics only if you agree. Read our{" "}
            <Link href="/privacy" className="font-semibold text-indigo-700 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reject analytics
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="min-h-11 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800"
            >
              Accept analytics
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
