import Navbar from './Navbar';

const Header = ({ categories }) => {
  return (
    <>
      <header className='header center'>
        <h3>
          <a href='/' className='link'>
            Kim Ngân
          </a>
        </h3>
        <Navbar categories={categories} />
      </header>
    </>
  );
};

export default Header;
