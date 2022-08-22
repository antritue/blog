import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { GraphQLClient, gql } from 'graphql-request';

import Header from '../components/Header';
import Introduction from '../components/Introduction';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const graphcms = new GraphQLClient(process.env.GRAPHQL_API);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
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
              author={post.author}
              coverPhoto={post.coverPhoto}
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
            />
          ))}
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
