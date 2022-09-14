import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { POSTS_IN_CATEGORY } from '../api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export default function BlogsInCategory() {
  const [{ themeName }] = useContext(ThemeContext);
  const router = useRouter();
  const { category } = router.query;

  const [skip, setSkip] = useState(3);
  const [hasNextPage, setHasNextpage] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        postsConnection: { edges, pageInfo },
      } = await graphClient.request(POSTS_IN_CATEGORY, { slug: category });
      setPosts(edges);
      setHasNextpage(pageInfo.hasNextPage);
      setSkip(3);
      console.log(skip);
    })();
  }, [category]);

  const loadMore = async () => {
    const {
      postsConnection: { edges, pageInfo },
    } = await graphClient.request(POSTS_IN_CATEGORY, {
      slug: category,
      skip,
    });
    setPosts((prevValue) => [...prevValue, ...edges]);
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
            {posts.map(({ node }) => (
              <BlogCard
                title={node.title}
                src={node.coverPhoto.url ? node.coverPhoto.url : ''}
                alt={node.alt}
                key={node.id}
                slug={node.slug}
              />
            ))}
            {/* {newPosts?.map(({ node }) => (
              <BlogCard
                title={node.title}
                src={node.coverPhoto.url ? node.coverPhoto.url : ''}
                alt={node.alt}
                key={node.id}
                slug={node.slug}
              />
            ))} */}
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
