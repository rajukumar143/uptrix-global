import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uptrix Admin Console | Multi-Product CMS & CRM Management",
  description: "Enterprise administration console for Uptrix Global platform.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-slate-100 text-[15px] text-slate-800 antialiased">{children}</div>;
}
