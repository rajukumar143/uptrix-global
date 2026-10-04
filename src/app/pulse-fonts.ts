import { JetBrains_Mono, Manrope } from "next/font/google";

// Fonts for the Uptrix Pulse pages (/crm/* and /blog/*)
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
});

export const pulseFontClasses = `${manrope.variable} ${jetbrains.variable} bg-pulse-bg font-pulse text-pulse-ink antialiased`;
