import type { Metadata } from "next";
import Header from "@/components/site/Header";
import LogoMarquee from "@/components/site/LogoMarquee";
import StoriesSection from "@/components/site/StoriesSection";
import CaseStudiesSection from "@/components/site/CaseStudiesSection";
import ProductTour from "@/components/home/ProductTour";
import CustomToolsSection from "@/components/home/CustomToolsSection";
import Faq from "@/components/home/Faq";
import Home2Hero from "@/components/home/Home2Hero";
import { getPageContent, getContent } from "@/lib/content-store";
import { homeDefaults } from "@/content/home";

export const metadata: Metadata = {
  title: "Générateurs de sites pour associations | Uptrix Home 2",
  description: "Créez un site professionnel en quelques minutes, sans compétences techniques. Mobilisez, inspirez et faites grandir votre impact.",
};

function telHref(tel: string) {
  return `tel:${tel.replace(/[^0-9+]/g, "")}`;
}

export default function Home2() {
  const siteContent = getContent();
  const rawHome = getPageContent("home");
  const c = { ...homeDefaults, ...rawHome };
  const year = new Date().getFullYear();

  return (
    <div className="overflow-x-clip bg-white text-slate-900">
      <Header content={getPageContent("header")} overlay={false} />
      
      <main>
        {/* Modern Interactive Hero */}
        <Home2Hero />

        {/* Client Trust Marquee */}
        {c.trustBar && (
          <LogoMarquee 
            heading={c.trustBar.heading} 
            names={c.trustBar.clientNames} 
            clients={c.trustBar.clientLogos} 
          />
        )}

        {/* Custom Engineering • Bespoke Solutions */}
        {c.customToolsSection && (
          <CustomToolsSection content={c.customToolsSection} theme="light" />
        )}

        {/* Stories Section */}
        {c.stories && (
          <StoriesSection 
            section={c.stories} 
            caseStudies={siteContent?.caseStudies} 
            videoTestimonials={siteContent?.videoTestimonials} 
            reviews={siteContent?.reviews} 
          />
        )}

        {/* Case Studies Section */}
        {c.stories && (
          <CaseStudiesSection productFilter={c.stories.productFilter || ""} theme="light" />
        )}

        {/* Product Tour */}
        {c.productTour && (
          <section aria-labelledby="tour-heading" className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-[1200px] px-6">
              <ProductTour content={c.productTour} />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {c.faq && (
          <section aria-labelledby="faq-heading" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="flex flex-wrap gap-x-16 gap-y-10">
                <div className="flex flex-[1_1_320px] flex-col gap-4 self-start">
                  <span className="font-bold text-xs uppercase tracking-wider text-purple-600">
                    {c.faq.eyebrow || "FAQ"}
                  </span>
                  <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {c.faq.heading}
                  </h2>
                  <p className="max-w-[380px] text-sm text-slate-600 leading-relaxed">
                    {c.faq.body}
                  </p>
                  <div className="mt-4 flex max-w-[380px] flex-col gap-3 rounded-2xl border border-purple-100 bg-purple-50/50 p-6">
                    <strong className="text-base font-bold text-slate-900">{c.faq.helpBoxTitle}</strong>
                    <span className="text-xs text-slate-600 leading-relaxed">{c.faq.helpBoxText}</span>
                    <a
                      href={c.faq.helpBoxButtonLink || "#contact"}
                      className="inline-flex h-10 items-center justify-center self-start rounded-xl bg-purple-600 px-5 text-xs font-semibold text-white transition hover:bg-purple-700 hover:shadow-md"
                    >
                      {c.faq.helpBoxButtonLabel || "Contact Sales"}
                    </a>
                  </div>
                </div>

                <div className="min-w-0 flex-[1.5_1_460px]">
                  <Faq questions={c.faq.questions} />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      {c.footer && (
        <footer className="bg-slate-950 pt-16 pb-8 text-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="font-display text-xl font-black tracking-tight text-white">Uptrix</span>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{c.footer.tagline}</p>
            </div>

            <nav className="flex flex-col gap-2.5 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-200">{c.footer.productsHeading}</h3>
              {(c.footer.productLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="text-slate-400 hover:text-white transition">
                  {l.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-2.5 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-200">{c.footer.companyHeading}</h3>
              {(c.footer.companyLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="text-slate-400 hover:text-white transition">
                  {l.label}
                </a>
              ))}
            </nav>

            <address className="flex flex-col gap-2.5 text-xs not-italic text-slate-400">
              <h3 className="font-bold uppercase tracking-wider text-slate-200">{c.footer.contactHeading}</h3>
              {c.footer.email && <a href={`mailto:${c.footer.email}`} className="hover:text-white">{c.footer.email}</a>}
              {c.footer.phone && <a href={telHref(c.footer.phone)} className="hover:text-white">{c.footer.phone}</a>}
              {c.footer.address && <p>{c.footer.address}</p>}
            </address>
          </div>

          <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-slate-900 px-6 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>&copy; {year} {c.footer.copyrightText}</span>
            <div className="flex gap-4">
              {(c.footer.legalLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="hover:text-slate-400 transition">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
