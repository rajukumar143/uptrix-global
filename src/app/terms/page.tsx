import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Uptrix",
  description: "Terms for accessing and using the Uptrix website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-pulse-night">
      <Link href="/" className="text-sm font-semibold text-pulse hover:underline">Uptrix home</Link>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight">Terms of Use</h1>
      <p className="mt-4 leading-relaxed text-pulse-muted">By accessing this website, you agree to use it lawfully and in accordance with these terms.</p>
      <div className="mt-10 space-y-8 leading-relaxed text-pulse-muted">
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Website information</h2>
          <p className="mt-2">Website content describes Uptrix products and services for general information. Product details, availability, and features may change. A website enquiry or demo request is not a purchase agreement; any service engagement is governed by a separate agreement between the parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Acceptable use</h2>
          <p className="mt-2">Do not misuse the website, attempt unauthorized access, interfere with its operation, or submit unlawful, misleading, or harmful material through its forms.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Intellectual property</h2>
          <p className="mt-2">Unless otherwise noted, website text, branding, and design are owned by or used with permission by Uptrix. You may not reproduce or commercially exploit them without prior authorization, except where applicable law permits.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">External links and changes</h2>
          <p className="mt-2">Links to third-party websites are provided for convenience; Uptrix does not control their content or practices. These terms may be updated by publishing a revised version on this page.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Contact</h2>
          <p className="mt-2">Questions about these terms can be sent through our <Link href="/crm/contact" className="font-semibold text-pulse hover:underline">contact page</Link>.</p>
        </section>
      </div>
      <p className="mt-10 border-t border-pulse-line pt-5 text-sm text-pulse-faint">These terms are a website-use summary and should be reviewed by Uptrix&apos;s legal adviser before being relied on as a complete legal agreement.</p>
    </main>
  );
}
