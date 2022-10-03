import { useContext, useState } from 'react';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from '../contexts/theme';
import Link from 'next/link';
import { PATH } from '../constants';

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className='center nav'>
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        <li className='nav__list-item'>
          <Link href={`/categories/${PATH.career}`}>
            <a onClick={toggleNavList} className='link link--nav'>
              Sự nghiệp
            </a>
          </Link>
        </li>
        <li className='nav__list-item'>
          <Link href={`/categories/${PATH.life}`}>
            <a onClick={toggleNavList} className='link link--nav'>
              Cuộc sống
            </a>
          </Link>
        </li>
        <li className='nav__list-item'>
          <Link href={'/author'}>
            <a onClick={toggleNavList} className='link link--nav'>
              Kim Ngân là ai?
            </a>
          </Link>
        </li>
      </ul>

      <button
        type='button'
        onClick={toggleTheme}
        className='btn btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <LightModeIcon /> : <Brightness2Icon />}
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
