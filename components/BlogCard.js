// import moment from "moment";
import Link from 'next/link';
import Image from 'next/image';

function BlogPost({ title, coverPhoto, slug }) {
  return (
    <Link href={`/posts/${slug}`}>
      <a className='card'>
        <div className='img-card'>
          <Image src={coverPhoto.url} alt='' layout='fill' objectFit='cover' />
        </div>

        <div className='text-card'>
          <p>{title}</p>
        </div>
      </a>
    </Link>
  );
}

export default BlogPost;
