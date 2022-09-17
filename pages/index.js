import { useContext } from 'react';
import Head from 'next/head';
import { ThemeContext } from '../contexts/theme';
import { GraphQLClient } from 'graphql-request';

import Header from '../components/Header';
import Introduction from '../components/Introduction';
import BlogCard from '../components/BlogCard';
import CardContainer from '../components/CardContainer';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

import { PATH } from '../constants';

import { LATEST_POSTS, LATEST_POSTS_BY_CATEGORY } from './api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticProps() {
  const { posts: latestPosts } = await graphClient.request(LATEST_POSTS);
  const { posts: latestPostsHealth } = await graphClient.request(
    LATEST_POSTS_BY_CATEGORY,
    { slug: PATH.health }
  );
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
      latestPostsHealth,
      latestPostsCareer,
      latestPostsLife,
    },
    revalidate: 30,
  };
}

export default function Home({
  latestPosts,
  latestPostsHealth,
  latestPostsCareer,
  latestPostsLife,
}) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Kim Ngân - Câu chuyện trưởng thành</title>
      </Head>
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
            posts={latestPostsHealth}
            title='Sức khỏe'
            path={PATH.health}
          />
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
