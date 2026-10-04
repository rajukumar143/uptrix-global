import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Uptrix Pulse CRM | Turn Every Lead Into an Enrollment",
  description:
    "Uptrix Pulse is the CRM for admissions-led businesses. Capture every lead, automate WhatsApp, email and call follow-ups, track counselors and branches, and know what every enrollment costs.",
  openGraph: {
    title: "Uptrix Pulse CRM | Turn Every Lead Into an Enrollment",
    description: "One connected CRM for leads, follow-ups, counselors, admissions, fees and branches.",
    type: "website",
    images: ["/logo-dark.png"],
  },
};

export default function CrmLayout({ children }: LayoutProps<"/crm">) {
  return (
    <div className={`${manrope.variable} ${jetbrains.variable} bg-pulse-bg font-pulse text-pulse-ink antialiased`}>
      {children}
    </div>
  );
}
