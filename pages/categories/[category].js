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

import { POSTS_IN_CATEGORY, CATEGORIES, CATEGORY } from '../api';

const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API);

export async function getStaticPaths() {
  const { categories } = await graphClient.request(CATEGORIES);
  return {
    paths: categories.map((category) => ({
      // needs to name 'category' because [category].js
      params: { category: category.slug },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  // needs to name 'slug' because variable in query is '$slug'
  const slug = params.category;
  const {
    postsConnection: { edges, pageInfo },
  } = await graphClient.request(POSTS_IN_CATEGORY, { slug });

  const { category: categoryInfo } = await graphClient.request(CATEGORY, {
    slug,
  });

  return {
    props: {
      categoryInfo,
      edges,
      pageInfo,
    },
    revalidate: 30,
  };
}

export default function BlogsInCategory({ categoryInfo, edges, pageInfo }) {
  const [{ themeName }] = useContext(ThemeContext);
  const router = useRouter();
  const { category } = router.query;

  // const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [skip, setSkip] = useState(3);
  const [hasNextPage, setHasNextpage] = useState(pageInfo.hasNextPage);

  useEffect(() => {
    (() => {
      // reset when user change category
      setHasNextpage(pageInfo.hasNextPage);
      setSkip(3);
      setNewPosts([]);
    })();
  }, [category]);

  const loadMore = async () => {
    const {
      postsConnection: { edges, pageInfo },
    } = await graphClient.request(POSTS_IN_CATEGORY, {
      slug: category,
      skip,
    });
    setNewPosts((prevValue) => [...prevValue, ...edges]);
    setSkip((prevValue) => prevValue + 3);
    setHasNextpage(pageInfo.hasNextPage);
  };

  return (
    <>
      <Head>
        <title>{categoryInfo.name}</title>
        <meta name='description' content={categoryInfo.description} />
      </Head>
      <div id='top' className={`${themeName} app`}>
        <Header />
        {/* <Introduction src='/blog-cover.jpg' /> */}

        <main>
          <div className='intro-title'>
            <h1>{categoryInfo.name}</h1>
            {/* <div className='content'>
              <div
                dangerouslySetInnerHTML={{
                  __html: categoryInfo.description.html,
                }}
              ></div>
            </div> */}
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
                className='btn btn--outline'
                onClick={loadMore}
              >
                Xem thêm
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
