import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { AUTHOR } from '../api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticProps() {
  const { author } = await graphClient.request(AUTHOR, {
    id: process.env.NEXT_PUBLIC_AUTHOR_ID,
  });
  return {
    props: {
      author,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ author }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{author.title}</title>
        <meta name='description' content={author.description} />
        <meta name='keywords' content={author.keywords} />
      </Head>
      <div id='top' className={`${themeName} app`}>
        <Header />
        {/* <Introduction src={author.coverPhoto.url} /> */}

        <main className='content'>
          <h1>{author.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: author.info.html }}></div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
