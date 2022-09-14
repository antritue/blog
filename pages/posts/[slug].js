import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';
import Head from 'next/head';

import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { SLUGS, POST_DETAIL } from '../api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticPaths() {
  const { posts } = await graphClient.request(SLUGS);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const { post } = await graphClient.request(POST_DETAIL, { slug });
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.description} />
      </Head>
      <div id='top' className={`${themeName} app`}>
        <Header />
        <Introduction src={post.coverPhoto.url} />

        <main className='content'>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
