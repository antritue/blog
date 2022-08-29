import Navbar from './Navbar';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className='header center'>
        <h3>
          <Link href='/'>
            <a className='link'>Kim Ngân</a>
          </Link>
        </h3>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
