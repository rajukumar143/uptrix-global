import type { Metadata } from "next";
import CollegeLandingPage from "@/components/college/CollegeLandingPage";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "College & University CRM + ERP Operating System | Uptrix",
  description:
    "Run your entire education business from one powerful platform. Manage leads, admissions, students, academics, fees, communication, staff and operations.",
  alternates: { canonical: "/college" },
};

export default function CollagePageAlias() {
  const all = getContent();
  return <CollegeLandingPage header={all.header} footer={all.crmLayout.footer} />;
}
