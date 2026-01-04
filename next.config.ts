import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/feed/podcast/the-ridge-podcast',
        destination: '/feed/podcast/',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
