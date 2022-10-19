import { getServerSideSitemap } from 'next-sitemap';
import { GraphQLClient } from 'graphql-request';

import { SLUGS } from '../../utils/graphqlRequest';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export const getServerSideProps = async (ctx) => {
  const { posts } = await graphClient.request(SLUGS);
  const slugs = posts.map((post) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_URL}posts/${post.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    };
  });

  const fields = [
    {
      loc: process.env.NEXT_PUBLIC_URL,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}author`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}categories/phat-trien-ban-than`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}categories/content-hay-con-sen`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    },
    ...slugs,
  ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
