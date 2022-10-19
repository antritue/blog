/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com', 'localhost'],
  },
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
