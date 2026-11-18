import type { Metadata } from "next";
import PulseFooter from "@/components/crm/PulseFooter";
import ServicesPage from "@/components/services/ServicesPage";
import Header from "@/components/site/Header";
import { SERVICES_PATH, SERVICES_SEO } from "@/content/services";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: SERVICES_SEO.title,
  description: SERVICES_SEO.description,
  alternates: { canonical: SERVICES_PATH },
  openGraph: {
    title: SERVICES_SEO.title,
    description: SERVICES_SEO.description,
    url: SERVICES_PATH,
    type: "website",
    images: ["/logo-dark.png"],
  },
};

export default function ServicesRoute() {
  const { header, crmLayout } = getContent();
  return (
    <>
      <Header content={header} />
      <main>
        <ServicesPage />
      </main>
      <PulseFooter content={crmLayout.footer} />
    </>
  );
}
