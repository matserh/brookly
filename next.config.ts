import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Servir les fichiers uploadés statiquement
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/serve-file?path=:path*',
      },
    ];
  },
};

export default nextConfig;
