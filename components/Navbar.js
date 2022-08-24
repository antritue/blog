import { useContext, useState } from 'react';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeContext } from '../contexts/theme';
import Link from 'next/link';

const Navbar = ({ categories }) => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className='center nav'>
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        {categories.map((category) => (
          <li className='nav__list-item'>
            <Link href={`/categories/${category.slug}`}>
              <a onClick={toggleNavList} className='link link--nav'>
                {category.name}
              </a>
            </Link>
          </li>
        ))}
        {/* <li className='nav__list-item'>
          <a href='#' onClick={toggleNavList} className='link link--nav'>
            Sức khỏe tinh thần
          </a>
        </li>

        <li className='nav__list-item'>
          <a href='#' onClick={toggleNavList} className='link link--nav'>
            Hành trình sự nghiệp
          </a>
        </li>

        <li className='nav__list-item'>
          <a href='#' onClick={toggleNavList} className='link link--nav'>
            Cuộc sống trưởng thành
          </a>
        </li> */}
      </ul>

      <button
        type='button'
        onClick={toggleTheme}
        className='btn btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>

      <button
        type='button'
        onClick={toggleNavList}
        className='btn btn--icon nav__hamburger'
        aria-label='toggle navigation'
      >
        {showNavList ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
