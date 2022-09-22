import BlogCard from './BlogCard';
import Link from 'next/link';

const CardContainer = ({ posts, title, path }) => {
  return (
    <div className='section'>
      {path ? (
        <Link href={`/categories/${path}`}>
          <a className='link link--nav'>
            <h2 className='section-title'>{title}</h2>
          </a>
        </Link>
      ) : (
        <h2 className='section-title'>{title}</h2>
      )}

      <div className='cards-grid-2'>
        {posts.slice(0, 2).map((post) => (
          <BlogCard
            title={post.title}
            src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            alt={post.alt}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </div>
      <div className='cards__grid'>
        {posts.slice(2).map((post) => (
          <BlogCard
            title={post.title}
            src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            alt={post.alt}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
