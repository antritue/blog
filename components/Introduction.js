import Image from 'next/image';

const Introduction = ({ src }) => {
  return (
    <section className='introduction'>
      <div className='intro-cover'>
        <Image src={src} layout='fill' objectFit='cover' />
      </div>
    </section>
  );
};

export default Introduction;
