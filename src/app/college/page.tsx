import type { Metadata } from "next";
import College2LandingPage from "@/components/college/College2LandingPage";
import { getContent } from "@/lib/content-store";

export function generateMetadata(): Metadata {
  const { seo } = getContent().college;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    alternates: { canonical: "/college" },
    openGraph: {
      title: seo.pageTitle,
      description: seo.metaDescription,
      type: "website",
      url: "/college",
      images: ["/logo-dark.png"],
    },
  };
}

export default function CollegePage() {
  const all = getContent();
  return <College2LandingPage header={all.header} footer={all.crmLayout.footer} content={all.college} />;
}
