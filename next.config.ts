import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared hosting (e.g. Hostinger Business) limits how many processes a build may start.
  // Building on one core with the classic webpack builder (see "build" in package.json)
  // keeps the build within those limits.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
