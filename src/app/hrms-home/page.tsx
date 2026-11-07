import type { Metadata } from "next";
import HrmsHome from "@/components/hrms-home/HrmsHome";
import { HRMS_SUBDOMAIN_URL } from "@/content/hrms";

// Served on hrms.uptrixglobal.com at "/" (see src/middleware.ts). Not linked from the main site.
export const metadata: Metadata = {
  title: "Uptrix HRMS | HR, IT and Finance in one orbit",
  description: "Uptrix HRMS: HR, IT and Finance suites on one employee record, with an AI assistant for everyday questions.",
  alternates: { canonical: HRMS_SUBDOMAIN_URL },
  robots: { index: true, follow: true },
};

export default function HrmsHomeRoute() {
  return <HrmsHome />;
}
