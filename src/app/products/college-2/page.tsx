import type { Metadata } from "next";
import College2LandingPage from "@/components/college/College2LandingPage";
import { getContent } from "@/lib/content-store";

export function generateMetadata(): Metadata {
  const { seo } = getContent().college;
  return {
    title: `College ERP & CRM 2.0 | ${seo.pageTitle}`,
    description: seo.metaDescription,
    alternates: { canonical: "/college-2" },
    openGraph: {
      title: `College ERP & CRM 2.0 | ${seo.pageTitle}`,
      description: seo.metaDescription,
      type: "website",
      url: "/college-2",
      images: ["/logo-dark.png"],
    },
  };
}

export default function College2Page() {
  const all = getContent();
  return <College2LandingPage header={all.header} footer={all.crmLayout.footer} content={all.college} />;
}
