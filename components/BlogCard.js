import Link from 'next/link';
import Image from 'next/image';

function BlogPost({ title, src, alt, slug }) {
  return (
    <Link href={`/posts/${slug}`}>
      <a className='card'>
        <article>
          <figure className='img-card'>
            <Image src={src} alt={alt} layout='fill' objectFit='cover' />
          </figure>

          <figcaption className='text-card'>
            <h3>{title}</h3>
          </figcaption>
        </article>
      </a>
    </Link>
  );
}

export default BlogPost;
