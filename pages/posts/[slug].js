import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';
import Head from 'next/head';
import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { slugList, postDetail } from '../api';

const graphcms = new GraphQLClient(process.env.GRAPHQL_API);

export async function getStaticPaths() {
  const { posts } = await graphcms.request(slugList);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(postDetail, { slug });
  const post = data.post;
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