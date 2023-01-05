import { GraphQLClient } from 'graphql-request';
import { useContext } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import MetaTags from '../../components/MetaTags';

import { SLUGS, POST_DETAIL } from '../../utils/graphqlRequest';

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

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
}

export default function BlogPost({ post }) {
  const [{ themeName }] = useContext(ThemeContext);
  let date = dayjs(post.createdAt).format('DD/MM/YYYY');

  return (
    <>
      <MetaTags
        title={post.title}
        description={post.description}
        keywords={post.keywords}
        url={`${process.env.NEXT_PUBLIC_URL}posts/${post.slug}`}
        thumbnail={post.coverPhoto.url}
        alt={post.alt}
      />
      <div id='top' className={`${themeName} app`}>
        <Header />
        {post.coverPhoto.url ? (
          <Introduction src={post.coverPhoto.url} alt={post.alt} />
        ) : null}

        <main className='content'>
          <h1>{post.title}</h1>
          <article
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></article>

          <section className='post-info'>
            <section className='author'>
              <figure className='avatar'>
                <Image
                  src={post.author.avatar.url}
                  layout='fill'
                  alt='tác giả'
                  objectFit='cover'
                />
              </figure>
              <figcaption className='author-name'>
                {post.author.name}
              </figcaption>
            </section>
            <section className='date'>
              <date>{date}</date>
            </section>
          </section>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
