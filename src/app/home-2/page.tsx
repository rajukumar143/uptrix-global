import type { Metadata } from "next";
import Header from "@/components/site/Header";
import LogoMarquee from "@/components/site/LogoMarquee";
import StoriesSection from "@/components/site/StoriesSection";
import CaseStudiesSection from "@/components/site/CaseStudiesSection";
import Home2CustomTools from "@/components/home/Home2CustomTools";
import Faq from "@/components/home/Faq";
import HeroCarousel from "@/components/home/HeroCarousel";
import { getPageContent, getContent } from "@/lib/content-store";
import { homeDefaults } from "@/content/home";

export const metadata: Metadata = {
  title: "Uptrix Global | Enterprise Business Software, CRM & HRMS",
  description: "Next-generation enterprise CRM, HRMS, and bespoke internal tools engineered for scaling businesses.",
};


const home2HeroSlides = [
  {
    eyebrow: "Bespoke Engineering & Custom Software",
    headingStart: "We Build ",
    headingHighlight: "Custom Tools",
    headingEnd: " for Your Business",
    body: "Tailor-made software, intelligent automations, and enterprise-grade internal systems built specifically to eliminate manual bottlenecks and scale operations.",
    primaryButtonLabel: "Request Custom Tool",
    primaryButtonLink: "#custom-tools",
    secondaryButtonLabel: "Talk to an Architect",
    secondaryButtonLink: "#consultation-form",
    photoDescription: "Custom business software and engineering team",
    image: "/images/hero/hero-team.jpg",
  },
  {
    eyebrow: "Executive BI & Telemetry",
    headingStart: "Real-Time Telemetry & ",
    headingHighlight: "Command",
    headingEnd: " Centers",
    body: "Consolidate multi-branch revenues, MRR trajectories, and live financial health into a single unified executive screen.",
    primaryButtonLabel: "View Live Dashboards",
    primaryButtonLink: "#custom-tools",
    secondaryButtonLabel: "Request Architecture",
    secondaryButtonLink: "#consultation-form",
    photoDescription: "Executive BI command center",
    image: "/images/hero/hero-crm.jpg",
  },
  {
    eyebrow: "Field Mobility & Offline Sync",
    headingStart: "GPS Geofenced ",
    headingHighlight: "Mobile",
    headingEnd: " Operational Suites",
    body: "Progressive mobile app tailored for ground executives, featuring GPS-verified visits, offline catalog order booking, and route tracking.",
    primaryButtonLabel: "Discover Mobile Suite",
    primaryButtonLink: "#custom-tools",
    secondaryButtonLabel: "Request Custom Tool",
    secondaryButtonLink: "#consultation-form",
    photoDescription: "Field force and mobile operations app",
    image: "/images/hero/hero-hrms.jpg",
  },
];

const home2HeroStats = [
  { stat: "100%", label: "IP Ownership" },
  { stat: "4 Sprints", label: "Idea to Launch" },
  { stat: "0 Code", label: "Bottlenecks" },
];

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
      <Header content={getPageContent("header")} overlay />
      
      <main>
        {/* Home Page Hero Section */}
        {c.heroSlides && c.heroStats && (
          <HeroCarousel slides={home2HeroSlides} stats={home2HeroStats} />
        )}

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
          <Home2CustomTools content={c.customToolsSection} />
        )}

        {/* Case Studies Section */}
        {c.stories && (
          <CaseStudiesSection
            productFilter={c.stories.productFilter || ""}
            theme="light"
            hideEyebrow
            heading="Results You Can Measure"
            intro="How growing companies use Uptrix to capture leads, close deals, and scale."
          />
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

        {/* FAQ Section */}
        {c.faq && (
          <section aria-labelledby="faq-heading" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-[1200px] px-6">
              <div className="flex flex-wrap gap-x-16 gap-y-10">
                <div className="flex flex-[1_1_320px] flex-col gap-4 self-start">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#1f5fd6]">
                    {c.faq.eyebrow || "FAQ"}
                  </span>
                  <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {c.faq.heading}
                  </h2>
                  <p className="max-w-[380px] text-sm text-slate-600 leading-relaxed">
                    {c.faq.body}
                  </p>
                  <div className="mt-4 flex max-w-[380px] flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
                    <strong className="text-base font-bold text-slate-900">{c.faq.helpBoxTitle}</strong>
                    <span className="text-xs text-slate-600 leading-relaxed">{c.faq.helpBoxText}</span>
                    <a
                      href={c.faq.helpBoxButtonLink || "#contact"}
                      className="inline-flex h-10 items-center justify-center self-start rounded-xl bg-[#1f5fd6] px-5 text-xs font-semibold text-white transition hover:bg-[#184cb0] hover:shadow-md"
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

      {/* Footer (Light Mode) */}
      {c.footer && (
        <footer className="border-t border-slate-200 bg-slate-50/80 pt-16 pb-8 text-slate-800">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="font-display text-xl font-black tracking-tight text-slate-900">Uptrix</span>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{c.footer.tagline}</p>
            </div>

            <nav className="flex flex-col gap-2.5 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-900">{c.footer.productsHeading}</h3>
              {(c.footer.productLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="text-slate-600 hover:text-[#1f5fd6] transition">
                  {l.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col gap-2.5 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-900">{c.footer.companyHeading}</h3>
              {(c.footer.companyLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="text-slate-600 hover:text-[#1f5fd6] transition">
                  {l.label}
                </a>
              ))}
            </nav>

            <address className="flex flex-col gap-2.5 text-xs not-italic text-slate-600">
              <h3 className="font-bold uppercase tracking-wider text-slate-900">{c.footer.contactHeading}</h3>
              {c.footer.email && <a href={`mailto:${c.footer.email}`} className="hover:text-[#1f5fd6]">{c.footer.email}</a>}
              {c.footer.phone && <a href={telHref(c.footer.phone)} className="hover:text-[#1f5fd6]">{c.footer.phone}</a>}
              {c.footer.address && <p>{c.footer.address}</p>}
            </address>
          </div>

          <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 pt-6 text-xs text-slate-500 sm:flex-row">
            <span>&copy; {year} {c.footer.copyrightText}</span>
            <div className="flex gap-4">
              {(c.footer.legalLinks || []).map((l: any, i: number) => (
                <a key={i} href={l.link} className="hover:text-[#1f5fd6] transition">
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
