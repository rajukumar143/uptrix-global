import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Upper limit for how long a CDN may show an older copy while it fetches the new one
  expireTime: 3600,
  // Shared hosting (e.g. Hostinger Business) limits how many processes a build may start.
  // Building on one core with the classic webpack builder (see "build" in package.json)
  // keeps the build within those limits.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
