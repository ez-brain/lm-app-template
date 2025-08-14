import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/lm-app/13000' : undefined,
  // basePath: process.env.NODE_ENV === 'production' ? '/lm-app/13000' : undefined,
};

export default nextConfig;
