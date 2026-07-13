import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Force unique build ID on every deploy to prevent stale chunk 404s
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
