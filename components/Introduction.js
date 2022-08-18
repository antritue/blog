import Image from 'next/image';

const Introduction = () => {
  return (
    <div className='introduction'>
      <div className='intro-cover'>
        <Image src='/blog-cover.jpg' layout='fill' objectFit='cover' />
      </div>
      <div className='intro-title'>
        <h1>Hi there</h1>
        <h2>Welcome to my blog</h2>
      </div>
    </div>
  );
};

export default Introduction;
