import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';

import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { AUTHOR } from '../../utils/graphqlRequest';
import MetaTags from '../../components/MetaTags';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticProps() {
  const { author } = await graphClient.request(AUTHOR, {
    id: process.env.NEXT_PUBLIC_AUTHOR_ID,
  });
  return {
    props: {
      author,
    },
  };
}

export default function BlogPost({ author }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <MetaTags
        title={author.title}
        description={author.description}
        url={`${process.env.NEXT_PUBLIC_URL}author`}
      />
      <div id='top' className={`${themeName} app`}>
        <Header />

        <main className='content'>
          <h1>{author.title}</h1>
          <article
            dangerouslySetInnerHTML={{ __html: author.info.html }}
          ></article>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
