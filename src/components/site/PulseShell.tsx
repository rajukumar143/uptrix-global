import type { ReactNode } from "react";
import { pulseFontClasses } from "@/app/pulse-fonts";
import PulseFooter from "@/components/crm/PulseFooter";
import Header from "@/components/site/Header";
import { getContent } from "@/lib/content-store";

/** Fonts, top menu and footer for the blog, case studies and video testimonials. */
export default function PulseShell({ children }: { children: ReactNode }) {
  const { header, crmLayout } = getContent();
  return (
    <div className={pulseFontClasses}>
      <Header content={header} />
      {children}
      <PulseFooter content={crmLayout.footer} />
    </div>
  );
}
