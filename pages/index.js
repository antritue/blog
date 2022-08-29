import { useContext } from 'react';
import Head from 'next/head';
import { ThemeContext } from '../contexts/theme';
import { GraphQLClient } from 'graphql-request';

import Header from '../components/Header';
import Introduction from '../components/Introduction';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

import { blogList } from './api';

const graphcms = new GraphQLClient(process.env.GRAPHQL_API);

export async function getStaticProps() {
  const { posts } = await graphcms.request(blogList);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Kim Ngân - Câu chuyện trưởng thành</title>
      </Head>
      <div id='top' className={`${themeName} app`}>
        <Header />
        <Introduction src='/blog-cover.jpg' />

        <main>
          <div className='intro-title'>
            <h1>Hi there</h1>
            <h2>Welcome to my blog</h2>
          </div>
          <div className='cards__grid'>
            {posts.map((post) => (
              <BlogCard
                title={post.title}
                src={post.coverPhoto.url ? post.coverPhoto.url : ''}
                alt={post.alt}
                key={post.id}
                slug={post.slug}
              />
            ))}
          </div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
