import type { Metadata } from "next";
import SuitePage from "@/components/suites/SuitePage";
import { resolveHome, resolveSuite } from "@/content/hrms-site";
import { getPageContent } from "@/lib/content-store";

export function generateMetadata(): Metadata {
  const content = getPageContent("hrms");
  const suite = content.financeSuite;
  return {
    title: suite.seoTitle,
    description: suite.seoDescription,
    alternates: { canonical: "/finance-suite" },
    openGraph: { title: suite.seoTitle, description: suite.seoDescription, url: "/finance-suite", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Uptrix" }] },
    twitter: { card: "summary_large_image", title: suite.seoTitle, description: suite.seoDescription },
  };
}

export default function FinanceSuiteRoute() {
  const content = getPageContent("hrms");
  const home = resolveHome(content);
  const suites = [resolveSuite("hr", content.hrSuite), resolveSuite("it", content.itSuite), resolveSuite("finance", content.financeSuite)];
  return <SuitePage suite={resolveSuite("finance", content.financeSuite)} suites={suites} shell={{ submenu: home.submenu, nav: home.nav, footer: home.footer }} />;
}
