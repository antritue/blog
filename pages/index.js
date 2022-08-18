import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import BlogCard from '../components/BlogCard';

import { GraphQLClient, gql } from 'graphql-request';
import Footer from '../components/Footer';

const graphcms = new GraphQLClient(
  'https://api-ap-northeast-1.hygraph.com/v2/ckwattc122q3g01w37o2ceapa/master'
);

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

      <main>
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

      {/* <ScrollToTop /> */}
      <Footer />
    </div>
  );
}
