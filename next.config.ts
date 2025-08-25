import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: Ez csak a buildet engedi át, a hibák attól még ott lesznek
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
