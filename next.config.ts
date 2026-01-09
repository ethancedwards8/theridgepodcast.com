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
      },
      {
          source: '/episode/the-ridge-podcast',
          destination: '/podcast',
          permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/feed/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/xml'
          }
        ]
      },
      {
        source: '/podcast-download/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache'
          }
        ]
      }
    ];
  },
  // TODO: figure out how to take advantage of this
  // for stats
  async rewrites() {
    return [
      {
        source: '/podcast-download/:id/:slug',
        destination: 'https://media.theridgepodcast.com/:slug',
      }
    ];
  },
};

export default nextConfig;
