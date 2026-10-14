import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Uptrix",
  description: "How Uptrix handles information submitted through its website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-pulse-night">
      <Link href="/" className="text-sm font-semibold text-pulse hover:underline">Uptrix home</Link>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 leading-relaxed text-pulse-muted">
        This page describes how information submitted through the Uptrix website is used. Please contact us through our{" "}
        <Link href="/crm/contact" className="font-semibold text-pulse hover:underline">contact page</Link> with privacy questions.
      </p>
      <div className="mt-10 space-y-8 leading-relaxed text-pulse-muted">
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Information we receive</h2>
          <p className="mt-2">When you request a demo or send an enquiry, we receive the details you submit, such as your name, phone number, email address, company or institution, and message. The page where the form was submitted may also be recorded to help us respond in context.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">How we use it</h2>
          <p className="mt-2">We use enquiry details to respond to your request, arrange product demonstrations, and follow up about the products or services you asked about. Website form submissions are stored on the website host and made available to authorized administrators.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Storage and retention</h2>
          <p className="mt-2">Enquiry records are stored in the website&apos;s server-side content directory. The site does not currently apply an automatic deletion schedule to these records; authorized administrators manage them. Hosting providers may process technical request information as part of operating the website.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Analytics and cookies</h2>
          <p className="mt-2">Optional Google Analytics is loaded only after you accept analytics in the cookie notice. You can change your choice using the Cookie settings control. If you reject analytics, the site does not load the analytics script.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Your choices</h2>
          <p className="mt-2">You can choose not to submit an enquiry. To ask about access, correction, or deletion of information you have submitted, contact us through the contact page and include enough detail for us to locate the enquiry.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-pulse-night">Updates</h2>
          <p className="mt-2">This policy may be updated as website features and data practices change. Please review it periodically.</p>
        </section>
      </div>
      <p className="mt-10 border-t border-pulse-line pt-5 text-sm text-pulse-faint">This website privacy notice should be reviewed against Uptrix&apos;s actual business practices and applicable law.</p>
    </main>
  );
}
