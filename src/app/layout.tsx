import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Hostinger CDN keeps copies of pages. Telling it to re-check every 60 seconds means changes saved
// in the admin dashboard appear on the live site within about a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  // Your live address (set SITE_URL in .env.local), so link previews on WhatsApp/LinkedIn use the right domain
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Uptrix — HRMS & CRM for Growing Indian Businesses",
  description:
    "Uptrix offers HRMS and CRM software built for growing Indian businesses. Manage your people and your customers in one place.",
  openGraph: {
    title: "Uptrix — HRMS & CRM for Growing Indian Businesses",
    description: "Manage your people and your customers in one place with Uptrix HRMS and Uptrix CRM.",
    images: ["/logo-dark.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
