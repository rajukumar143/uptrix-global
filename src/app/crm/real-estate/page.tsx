import type { Metadata } from "next";
import IndustryPage from "@/components/crm/IndustryPage";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().crmRealEstate;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    alternates: { canonical: "/crm/real-estate" },
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, type: "website", url: "/crm/real-estate", images: ["/logo-dark.png"] },
  };
}

export default function RealEstatePage() {
  const all = getContent();
  return <IndustryPage c={all.crmRealEstate} header={all.header} footer={all.crmLayout.footer} />;
}
