import type { NextConfig } from "next";

const developmentScriptSource = process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'";
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; " +
      `script-src 'self' 'unsafe-inline'${developmentScriptSource} https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com https://www.googletagmanager.com; ` +
      "style-src 'self' 'unsafe-inline'; font-src 'self' data:; " +
      "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://www.google-analytics.com https://*.supabase.co; " +
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://challenges.cloudflare.com; " +
      "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.supabase.co;",
  },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.push({ key: "Strict-Transport-Security", value: "max-age=31536000" });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Upper limit for how long a CDN may show an older copy while it fetches the new one
  expireTime: 3600,
  // Shared hosting (e.g. Hostinger Business) limits how many processes a build may start.
  // Building on one core with the classic webpack builder (see "build" in package.json)
  // keeps the build within those limits.
  experimental: {
    cpus: 1,
    workerThreads: false,
    optimizePackageImports: ["@supabase/supabase-js", "marked", "zod"],
  },
  async redirects() {
    return [
      { source: "/edutech", destination: "/college", permanent: true },
      { source: "/education", destination: "/college", permanent: true },
      { source: "/crm/edutech", destination: "/college", permanent: true },
      { source: "/collage", destination: "/college", permanent: true },
      { source: "/collage-2", destination: "/college-2", permanent: true },
      { source: "/college2", destination: "/college-2", permanent: true },
      { source: "/collage2", destination: "/college-2", permanent: true },
      { source: "/home2", destination: "/home-2", permanent: true },
      { source: "/robot.txt", destination: "/robots.txt", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
