import Introduction from './Introduction';
import Navbar from './Navbar';

const Header = () => {
  return (
    <>
      <header className='header center'>
        <h3>
          <a href='#' className='link'>
            Title
          </a>
        </h3>
        <Navbar />
      </header>
      <Introduction />
    </>
  );
};

export default Header;
