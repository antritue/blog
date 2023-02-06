/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com', 'localhost'],
  },
  i18n: {
    locales: ['vi'],
    defaultLocale: 'vi',
  }
};

module.exports = nextConfig;
