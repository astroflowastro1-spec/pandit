import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force unique build ID on every deploy to prevent stale chunk 404s
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
