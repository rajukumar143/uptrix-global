import type { Metadata } from "next";
import CollegeLandingPage from "@/components/college/CollegeLandingPage";
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
  return <CollegeLandingPage header={all.header} footer={all.crmLayout.footer} content={all.college} />;
}
