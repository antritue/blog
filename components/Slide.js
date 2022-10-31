import Carousel from 'react-elastic-carousel';
import BlogCard from './BlogCard';

const Slide = ({ posts, title }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  ];
  return (
    <div className='section'>
      <h2 className='section-title'>{title}</h2>
      <Carousel breakPoints={breakPoints} className='slide'>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            src={post.coverPhoto.url ? post.coverPhoto.url : ''}
            alt={post.alt}
            key={post.id}
            slug={post.slug}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
