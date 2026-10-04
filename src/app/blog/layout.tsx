import PulseFooter from "@/components/crm/PulseFooter";
import PulseHeader from "@/components/crm/PulseHeader";
import { getContent } from "@/lib/content-store";
import { pulseFontClasses } from "../pulse-fonts";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  const { crmLayout } = getContent();
  return (
    <div className={pulseFontClasses}>
      <PulseHeader content={crmLayout.header} />
      {children}
      <PulseFooter content={crmLayout.footer} />
    </div>
  );
}
