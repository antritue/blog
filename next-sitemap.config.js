/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // siteUrl: 'http://localhost:3000',
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_URL}server-sitemap.xml`],
  },
};
