import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import CookieConsent from "@/components/site/CookieConsent";
import MarketingTags from "@/components/site/MarketingTags";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-jakarta" });
const metadataBase = new URL(process.env.SITE_URL || (process.env.NODE_ENV === "production" ? "https://uptrixglobal.com" : "http://localhost:3000"));
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uptrix",
  url: metadataBase.origin,
  logo: new URL("/logo-dark.png", metadataBase).toString(),
};

// Hostinger CDN keeps copies of pages. Telling it to re-check every 60 seconds means changes saved
// in the admin dashboard appear on the live site within about a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  // Your live address (set SITE_URL in .env.local), so link previews on WhatsApp/LinkedIn use the right domain
  metadataBase,
  title: "Uptrix — HRMS & CRM for Growing Indian Businesses",
  description:
    "Uptrix offers HRMS and CRM software built for growing Indian businesses. Manage your people and your customers in one place.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Uptrix — HRMS & CRM for Growing Indian Businesses",
    description: "Manage your people and your customers in one place with Uptrix HRMS and Uptrix CRM.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Uptrix HRMS and CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${manrope.variable} ${jakarta.variable}`}>
      <body suppressHydrationWarning className="min-h-full font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
        {children}
        {process.env.APP_MODE !== "admin" && (
          <>
            <CookieConsent />
            <MarketingTags />
          </>
        )}
      </body>
    </html>
  );
}
