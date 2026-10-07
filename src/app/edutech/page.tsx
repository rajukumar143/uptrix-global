import type { Metadata } from "next";
import EducationInstituteLanding from "@/components/crm/edutech/EducationInstituteLanding";
import { getContent } from "@/lib/content-store";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = getContent().crmEdutech;
  return {
    title: seo.pageTitle,
    description: seo.metaDescription,
    alternates: { canonical: "/edutech" },
    openGraph: { title: seo.pageTitle, description: seo.metaDescription, type: "website", url: "/edutech", images: ["/logo-dark.png"] },
  };
}

export default function DirectEdutechPage() {
  const all = getContent();
  return <EducationInstituteLanding header={all.header} footer={all.crmLayout.footer} />;
}
