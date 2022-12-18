import Link from 'next/link';
import { useContext } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import { CategoryContext } from '../contexts/categories';

const Footer = () => {
  const category = useContext(CategoryContext);

  return (
    <footer className='footer'>
      <section className='page-info'>
        <section className='page-info-section'>
          <h3 className='footer-title'>Giới thiệu</h3>
          <Link href='/author'>
            <a className='link footer__link '>Kim Ngân</a>
          </Link>
        </section>
        <section className='page-info-section'>
          <h3 className='footer-title'>Khám phá</h3>
          {category.map((item, index) => (
            <div key={index}>
              <Link href={`/categories/${item.slug}`} key={item.slug}>
                <a className='link footer__link '>{item.name}</a>
              </Link>
              <br></br>
            </div>
          ))}
        </section>
        <section className='page-info-section social-icons'>
          <h3 className='footer-title'>Social</h3>
          <Link href='https://www.instagram.com/kimngann245/'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='instagram'
            >
              <InstagramIcon />
            </a>
          </Link>
          <Link href='https://www.youtube.com/channel/UChfs541LTPg-iiDPSFV-XnQ'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='youtube'
            >
              <YouTubeIcon />
            </a>
          </Link>
          <Link href='https://www.linkedin.com/in/kimngannnguyen/'>
            <a
              className='link footer__link social '
              target='_blank'
              aria-label='linkedin'
            >
              <LinkedInIcon />
            </a>
          </Link>
          <Link href='mailto:nguyenkimngan245@mail.com'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='email'
            >
              <EmailIcon />
            </a>
          </Link>
        </section>
      </section>
      <section className='hidden-social-icons'>
        <Link href='https://www.instagram.com/kimngann245/'>
          <a
            className='link footer__link'
            target='_blank'
            aria-label='instagram'
          >
            <InstagramIcon />
          </a>
        </Link>
        <Link href='https://www.youtube.com/channel/UChfs541LTPg-iiDPSFV-XnQ'>
          <a className='link footer__link' target='_blank' aria-label='youtube'>
            <YouTubeIcon />
          </a>
        </Link>
        <Link href='https://www.linkedin.com/in/kimngannnguyen/'>
          <a
            className='link footer__link '
            target='_blank'
            aria-label='linkedin'
          >
            <LinkedInIcon />
          </a>
        </Link>
        <Link href='mailto:nguyenkimngan245@mail.com'>
          <a className='link footer__link' target='_blank' aria-label='email'>
            <EmailIcon />
          </a>
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
