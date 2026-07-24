import type { NextConfig } from "next";
import { unlinkSync, existsSync } from 'fs';
import path from 'path';

try {
  const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
  if (existsSync(middlewarePath)) {
    unlinkSync(middlewarePath);
    console.log('Deleted src/middleware.ts automatically to resolve proxy.ts conflict');
  }
} catch (e) {}

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
