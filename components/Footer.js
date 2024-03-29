import Link from 'next/link';
import { useContext } from 'react';
import { FaInstagram, FaYoutube, FaLinkedin, FaEnvelope, FaTiktok } from "react-icons/fa";

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
              <FaInstagram size={20} />
            </a>
          </Link>
          <Link href='https://www.youtube.com/channel/UChfs541LTPg-iiDPSFV-XnQ'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='youtube'
            >
              <FaYoutube size={20} />
            </a>
          </Link>
          <Link href='https://www.linkedin.com/in/kimngannnguyen/'>
            <a
              className='link footer__link social '
              target='_blank'
              aria-label='linkedin'
            >
              <FaLinkedin size={20} />
            </a>
          </Link>
          <Link href='mailto:nguyenkimngan245@mail.com'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='email'
            >
              <FaEnvelope size={20} />
            </a>
          </Link>
          <Link href='https://www.tiktok.com/@kimngann_245'>
            <a
              className='link footer__link social'
              target='_blank'
              aria-label='tiktok'
            >
              <FaTiktok size={20} />
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
            <FaInstagram size={20} />
          </a>
        </Link>
        <Link href='https://www.youtube.com/channel/UChfs541LTPg-iiDPSFV-XnQ'>
          <a className='link footer__link' target='_blank' aria-label='youtube'>
            <FaYoutube size={20} />
          </a>
        </Link>
        <Link href='https://www.linkedin.com/in/kimngannnguyen/'>
          <a
            className='link footer__link '
            target='_blank'
            aria-label='linkedin'
          >
            <FaLinkedin size={20} />
          </a>
        </Link>
        <Link href='mailto:nguyenkimngan245@mail.com'>
          <a className='link footer__link' target='_blank' aria-label='email'>
            <FaEnvelope size={20} />
          </a>
        </Link>
        <Link href='https://www.tiktok.com/@kimngann_245'>
          <a className='link footer__link' target='_blank' aria-label='tiktok'>
            <FaTiktok size={20} />
          </a>
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
