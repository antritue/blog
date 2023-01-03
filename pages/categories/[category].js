import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import MetaTags from '../../components/MetaTags';

import thumbnail from '../../public/thumbnail.jpg'

import {
  POSTS_IN_CATEGORY,
  CATEGORIES,
  CATEGORY,
} from '../../utils/graphqlRequest';

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

  if (!edges || !pageInfo || !categoryInfo) {
    return { notFound: true };
  }

  return {
    props: {
      categoryInfo,
      edges,
      pageInfo,
    },
  };
}

export default function BlogsInCategory({ categoryInfo, edges, pageInfo }) {
  const [{ themeName }] = useContext(ThemeContext);
  const router = useRouter();
  const { category } = router.query;

  // const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [skip, setSkip] = useState(9);
  const [hasNextPage, setHasNextpage] = useState(pageInfo.hasNextPage);

  useEffect(() => {
    (() => {
      // reset when user change category
      setHasNextpage(pageInfo.hasNextPage);
      setSkip(9);
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
    setSkip((prevValue) => prevValue + 9);
    setHasNextpage(pageInfo.hasNextPage);
  };

  return (
    <>
      <MetaTags
        title={categoryInfo.name}
        description={categoryInfo.description}
        url={`${process.env.NEXT_PUBLIC_URL}categories/${categoryInfo.slug}`}
        thumbnail={thumbnail.src}
        alt={categoryInfo.description}
      />

      <div id='top' className={`${themeName} app`}>
        <Header />

        <main>
          <section className='intro-title'>
            <h1>{categoryInfo.name}</h1>
          </section>
          <section className='cards__grid'>
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
          </section>

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
