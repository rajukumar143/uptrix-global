import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/crm/ContactForm";
import PulseFooter from "@/components/crm/PulseFooter";
import Header from "@/components/site/Header";
import { container, eyebrow, h1 } from "@/components/crm/styles";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().contact;
  return { title: seo.pageTitle, description: seo.metaDescription, alternates: { canonical: "/crm/contact" } };
}

export default function ContactPage() {
  const all = getContent();
  const c = all.contact;
  const d = c.details;
  const details = [
    { label: d.emailLabel, value: d.email, href: d.email ? `mailto:${d.email}` : "" },
    { label: d.phoneLabel, value: d.phone, href: d.phone ? `tel:${d.phone.replace(/[^\d+]/g, "")}` : "" },
    { label: d.officeLabel, value: d.office, href: "" },
  ].filter((x) => x.value);

  return (
    <>
      <Header content={all.header} />
      <main>
        <section
          aria-labelledby="contact-h"
          className={`${container} grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(40px,6vw,80px)] pt-[clamp(48px,8vw,96px)] pb-[clamp(64px,9vw,112px)]`}
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className={eyebrow}>{c.hero.eyebrow}</p>
              <h1 id="contact-h" className={h1}>
                {c.hero.heading}
              </h1>
              <p className="max-w-[480px] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-pretty text-pulse-muted">{c.hero.body}</p>
            </div>

            {details.length > 0 && (
              <dl className="m-0 flex flex-col overflow-hidden rounded-2xl border border-pulse-line bg-white">
                {details.map((x, i) => (
                  <div key={i} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 border-b border-[#eef0f5] px-5 py-4 last:border-b-0">
                    <dt className="font-code text-xs tracking-[0.06em] text-pulse-faint uppercase">{x.label}</dt>
                    <dd className="m-0 text-base font-bold break-words">
                      {x.href ? (
                        <a href={x.href} className="text-pulse-ink hover:text-pulse">
                          {x.value}
                        </a>
                      ) : (
                        x.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
              {c.cards.map((r, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-2xl border border-pulse-line bg-pulse-bg p-5">
                  <h2 className="text-lg font-extrabold">{r.title}</h2>
                  <p className="text-sm leading-normal text-pulse-subtle">{r.body}</p>
                  {r.linkLabel && (
                    <Link href={r.link || "#"} className="mt-1 text-sm font-bold text-pulse hover:text-pulse-hover">
                      {r.linkLabel}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e1e3ee] bg-white p-[clamp(22px,3.5vw,40px)] shadow-[0_40px_80px_-50px_rgba(30,34,120,0.45)]">
            <ContactForm text={c.form} />
          </div>
        </section>
      </main>
      <PulseFooter content={all.crmLayout.footer} />
    </>
  );
}
