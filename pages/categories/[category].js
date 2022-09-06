import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';

import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { POSTS_IN_CATEGORY, CATEGORIES } from '../api';

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticPaths() {
  const { categories } = await graphcms.request(CATEGORIES);
  return {
    paths: categories.map((category) => ({
      params: { category: category.slug },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const slug = params.category;
  const {
    postsConnection: { edges, pageInfo },
  } = await graphcms.request(POSTS_IN_CATEGORY, { slug });
  return {
    props: {
      slug,
      edges,
      pageInfo,
    },
    revalidate: 30,
  };
}

export default function BlogsInCategory({ slug, edges, pageInfo }) {
  const [{ themeName }] = useContext(ThemeContext);

  const [skip, setSkip] = useState(3);
  const [newPosts, setNewPosts] = useState([]);
  const [hasNextPage, setHasNextpage] = useState(pageInfo.hasNextPage);

  // useEffect(() => {
  //   console.log(pageInfo.hasNextPage);
  // }, []);

  const loadMore = async () => {
    const {
      postsConnection: { edges, pageInfo },
    } = await graphcms.request(POSTS_IN_CATEGORY, { slug, skip });
    setNewPosts((prevValue) => [...prevValue, ...edges]);
    setSkip((prevValue) => prevValue + 3);
    setHasNextpage(pageInfo.hasNextPage);
  };

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
            {edges.map(({ node }) => (
              <BlogCard
                title={node.title}
                src={node.coverPhoto.url ? node.coverPhoto.url : ''}
                alt={node.alt}
                key={node.id}
                slug={node.slug}
              />
            ))}
            {newPosts?.map(({ node }) => (
              <BlogCard
                title={node.title}
                src={node.coverPhoto.url ? node.coverPhoto.url : ''}
                alt={node.alt}
                key={node.id}
                slug={node.slug}
              />
            ))}
          </div>

          {hasNextPage ? (
            <div className='load-more'>
              <button
                type='button'
                className='btn-load-more'
                onClick={loadMore}
              >
                Load more
              </button>
            </div>
          ) : null}
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
