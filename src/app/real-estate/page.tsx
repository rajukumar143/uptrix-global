import type { Metadata } from "next";
import RealEstateLandingPage from "@/components/real-estate/RealEstateLandingPage";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Real Estate CRM & Developer ERP Operating System | Uptrix",
  description:
    "Unified pre-sales CRM, live 3D inventory matrix, construction-linked milestone demands, and channel partner portal for real estate builders and developers.",
  alternates: { canonical: "/real-estate" },
  openGraph: {
    title: "Real Estate CRM & Developer ERP Operating System | Uptrix",
    description:
      "Unified pre-sales CRM, live 3D inventory matrix, construction-linked milestone demands, and channel partner portal for real estate builders and developers.",
    type: "website",
    url: "/real-estate",
    images: ["/logo-dark.png"],
  },
};

export default function DirectRealEstatePage() {
  const all = getContent();
  return <RealEstateLandingPage header={all.header} footer={all.crmLayout.footer} />;
}
