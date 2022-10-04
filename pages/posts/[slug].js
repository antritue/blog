import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dayjs from 'dayjs';

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
    revalidate: 7200,
  };
}

export default function BlogPost({ post }) {
  const [{ themeName }] = useContext(ThemeContext);
  let date = dayjs(post.createdAt).format('DD/MM/YYYY');

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.description} />
        <meta name='keywords' content={post.keywords} />
      </Head>
      <div id='top' className={`${themeName} app`}>
        <Header />
        {post.coverPhoto.url ? (
          <Introduction src={post.coverPhoto.url} />
        ) : null}

        <main className='content'>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>

          <div className='post-info'>
            <div className='author'>
              <div className='avatar'>
                <Image
                  src={post.author.avatar.url}
                  layout='fill'
                  alt='tác giả'
                  objectFit='cover'
                />
              </div>
              <p className='author-name'>{post.author.name}</p>
            </div>
            <div className='date'>
              <p>{date}</p>
            </div>
          </div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
