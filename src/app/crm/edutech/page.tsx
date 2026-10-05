import type { Metadata } from "next";
import IndustryPage from "@/components/crm/IndustryPage";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().crmEdutech;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    alternates: { canonical: "/crm/edutech" },
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, type: "website", url: "/crm/edutech", images: ["/logo-dark.png"] },
  };
}

export default function EdutechPage() {
  const all = getContent();
  return <IndustryPage c={all.crmEdutech} header={all.header} footer={all.crmLayout.footer} />;
}
