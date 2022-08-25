import Navbar from './Navbar';

const Header = () => {
  return (
    <>
      <header className='header center'>
        <h3>
          <a href='/' className='link'>
            Kim Ngân
          </a>
        </h3>
        <Navbar />
      </header>
    </>
  );
};

export default Header;
