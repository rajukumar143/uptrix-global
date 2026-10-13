import type { Metadata } from "next";
import CollegeLandingPage from "@/components/college/CollegeLandingPage";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "College CRM & ERP Operating System | Uptrix",
  description:
    "Unified Admissions CRM and Campus ERP for higher education institutes, universities, and colleges.",
  alternates: { canonical: "/crm/college" },
};

export default function CrmCollegePage() {
  const all = getContent();
  return <CollegeLandingPage header={all.header} footer={all.crmLayout.footer} content={all.college} />;
}
