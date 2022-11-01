import { useContext } from 'react';
import Head from 'next/head';
import { ThemeContext } from '../contexts/theme';
import { GraphQLClient } from 'graphql-request';

import Header from '../components/Header';
import CardContainer from '../components/CardContainer';
import Slide from '../components/Slide';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import GAScript from '../components/GAScript';

import {
  LATEST_POSTS,
  LATEST_POSTS_BY_CATEGORY,
  CATEGORIES,
} from '../utils/graphqlRequest';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticProps() {
  const { posts: latestPosts } = await graphClient.request(LATEST_POSTS);
  const { categories } = await graphClient.request(CATEGORIES);

  const latestPostsByCategory = await Promise.all(
    categories.map(async (item) => {
      const posts = await graphClient.request(LATEST_POSTS_BY_CATEGORY, {
        slug: item.slug,
      });
      return {
        posts,
        category: item.name,
        path: item.slug,
      };
    })
  );

  return {
    props: {
      latestPosts,
      latestPostsByCategory,
    },
    // revalidate: 7200,
  };
}

export default function Home({ latestPosts, latestPostsByCategory }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Kim Ngân</title>
        <meta
          name='description'
          content='Nơi chia sẻ về hai thứ mình yêu thích nhất, sáng tạo nội dung và chăm sóc bản thân. Cuộc sống tuổi 25 có gì vui?'
        />
      </Head>

      <GAScript />
      <div id='top' className={`${themeName} app`}>
        <Header />
        {/* <Introduction src='/blog-cover.jpg' /> */}

        <main>
          <div className='intro-title'>
            <h1>Người lớn tập sự</h1>
          </div>

          <Slide posts={latestPosts} title='Mới nhất' />

          {latestPostsByCategory.map((item) => (
            <CardContainer
              posts={item.posts.posts}
              title={item.category}
              path={item.path}
              key={item.path}
            />
          ))}
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
