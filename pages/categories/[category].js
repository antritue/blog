import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { GraphQLClient } from 'graphql-request';

import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

import { blogListInCategory, categoriesList } from '../api';

const graphcms = new GraphQLClient(process.env.GRAPHQL_API);

export async function getStaticPaths() {
  const { categories } = await graphcms.request(categoriesList);
  return {
    paths: categories.map((category) => ({
      params: { category: category.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = params.category;
  const { posts } = await graphcms.request(blogListInCategory, { category });
  console.log(posts);
  const { categories } = await graphcms.request(categoriesList);
  return {
    props: {
      posts,
      categories,
    },
    revalidate: 30,
  };
}

export default function BlogsInCategory({ posts, categories }) {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <div id='top' className={`${themeName} app`}>
      <Header categories={categories} />
      <Introduction src='/blog-cover.jpg' />

      <main>
        <div className='intro-title'>
          <h1>Hi there</h1>
          <h2>Welcome to my blog</h2>
        </div>
        <div className='cards__grid'>
          {posts.map((post) => (
            // <BlogCard
            //   title={post.title}
            //   src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            //   alt={post.alt}
            //   key={post.id}
            //   slug={post.slug}
            // />
            <p>{post.title}</p>
          ))}
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
