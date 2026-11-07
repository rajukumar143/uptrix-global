import type { Metadata } from "next";
import SuitePage from "@/components/suites/SuitePage";
import { SUITES } from "@/content/suites";

const suite = SUITES.hr;

export const metadata: Metadata = {
  title: suite.seoTitle,
  description: suite.seoDescription,
  alternates: { canonical: suite.path },
  openGraph: {
    title: suite.seoTitle,
    description: suite.seoDescription,
    url: suite.path,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Uptrix" }],
  },
  twitter: { card: "summary_large_image", title: suite.seoTitle, description: suite.seoDescription },
};

export default function HrSuiteRoute() {
  return <SuitePage suite={suite} />;
}
