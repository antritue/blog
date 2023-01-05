import BlogCard from './BlogCard';
import Link from 'next/link';

const CardContainer = ({ posts, title, path }) => {
  return (
    <section className='section'>
      <Link href={`/categories/${path}`}>
        <a className='link link--nav'>
          <h2 className='section-title'>{title}</h2>
        </a>
      </Link>

      <article className='cards-grid-2'>
        {posts.slice(0, 2).map((post) => (
          <BlogCard
            title={post.title}
            src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            alt={post.alt}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </article>
      <article className='cards__grid'>
        {posts.slice(2).map((post) => (
          <BlogCard
            title={post.title}
            src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            alt={post.alt}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </article>

      <Link href={`/categories/${path}`}>
        <a>
          <div className='load-more'>
            <button type='button' className='btn btn--outline'>
              Xem thêm
            </button>
          </div>
        </a>
      </Link>
    </section>
  );
};

export default CardContainer;
