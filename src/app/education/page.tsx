import type { Metadata } from "next";
import EducationInstituteLanding from "@/components/crm/edutech/EducationInstituteLanding";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Education Institute CRM & ERP Platform | Uptrix",
  description:
    "All-in-one operating system for coaching institutes, schools, and colleges. Automate student inquiry follow-up, track counselor attendance, and eliminate fee leakages.",
  alternates: { canonical: "/education" },
  openGraph: {
    title: "Education Institute CRM & ERP Platform | Uptrix",
    description:
      "All-in-one operating system for coaching institutes, schools, and colleges. Automate student inquiry follow-up, track counselor attendance, and eliminate fee leakages.",
    type: "website",
    url: "/education",
    images: ["/logo-dark.png"],
  },
};

export default function EducationLandingPage() {
  const all = getContent();
  return <EducationInstituteLanding header={all.header} footer={all.crmLayout.footer} />;
}
