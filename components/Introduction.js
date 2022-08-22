import Image from 'next/image';

const Introduction = ({ src }) => {
  return (
    <div className='introduction'>
      <div className='intro-cover'>
        <Image src={src} layout='fill' objectFit='cover' />
      </div>
    </div>
  );
};

export default Introduction;
