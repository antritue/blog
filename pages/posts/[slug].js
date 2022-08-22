import { GraphQLClient, gql } from 'graphql-request';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import Header from '../../components/Header';
import Introduction from '../../components/Introduction';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';

const graphcms = new GraphQLClient(process.env.GRAPHQL_API);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      description
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
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
    <div id='top' className={`${themeName} app`}>
      <Header />
      <Introduction src={post.coverPhoto.url} />

      <main className='content'>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
      </main>
      {/* <main className={styles.blog}>
        <img
          className={styles.cover}
          src={post.coverPhoto.url}
          alt={post.title}
        />
        <div className={styles.title}>
          <div className={styles.authdetails}>
            <img src={post.author.avatar.url} alt={post.author.name} />
            <div className={styles.authtext}>
              <h6>By {post.author.name} </h6>
              <h6 className={styles.date}>
                {moment(post.datePublished).format('MMMM d, YYYY')}
              </h6>
            </div>
          </div>
          <h2>{post.title}</h2>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </main> */}
      <ScrollToTop />
      <Footer />
    </div>
  );
}
