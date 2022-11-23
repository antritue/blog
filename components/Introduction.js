import Image from 'next/image';

const Introduction = ({ src, alt }) => {
  return (
    <section className='introduction'>
      <div className='intro-cover'>
        <Image src={src} layout='fill' objectFit='cover' alt={alt} />
      </div>
    </section>
  );
};

export default Introduction;
