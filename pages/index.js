import { useContext } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeContext } from '../contexts/theme';
import { GraphQLClient } from 'graphql-request';

import Header from '../components/Header';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import GAScript from '../components/GAScript';

import { PATH } from '../constants';

import { LATEST_POSTS, LATEST_POSTS_BY_CATEGORY } from './api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticProps() {
  const { posts: latestPosts } = await graphClient.request(LATEST_POSTS);
  const { posts: latestPostsCareer } = await graphClient.request(
    LATEST_POSTS_BY_CATEGORY,
    { slug: PATH.career }
  );
  const { posts: latestPostsLife } = await graphClient.request(
    LATEST_POSTS_BY_CATEGORY,
    { slug: PATH.life }
  );
  return {
    props: {
      latestPosts,
      latestPostsCareer,
      latestPostsLife,
    },
    revalidate: 7200,
  };
}

export default function Home({
  latestPosts,
  latestPostsCareer,
  latestPostsLife,
}) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Kim Ngân - Câu chuyện trưởng thành</title>
      </Head>

      <GAScript />
      <div id='top' className={`${themeName} app`}>
        <Header />
        {/* <Introduction src='/blog-cover.jpg' /> */}

        <main>
          <div className='intro-title'>
            <h1>Hi there</h1>
            <h2>Welcome to my blog</h2>
          </div>
          <CardContainer posts={latestPosts} title='Mới nhất' />
          <CardContainer
            posts={latestPostsCareer}
            title='Sự nghiệp'
            path={PATH.career}
          />
          <CardContainer
            posts={latestPostsLife}
            title='Cuộc sống'
            path={PATH.life}
          />
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
