import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uptrix",
    short_name: "Uptrix",
    description: "HRMS and CRM software for growing Indian businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#171747",
    icons: [
      { src: "/logo-mark.png", sizes: "any", type: "image/png" },
    ],
  };
}
