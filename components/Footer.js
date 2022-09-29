import Link from 'next/link';
import { PATH } from '../constants';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => (
  <footer className='footer'>
    <div className='page-info'>
      <div className='page-info-section'>
        <h3 className='footer-title'>Giới thiệu</h3>
        <Link href='/author'>
          <a className='link footer__link '>Kim Ngân</a>
        </Link>
      </div>
      <div className='page-info-section'>
        <h3 className='footer-title'>Khám phá</h3>
        <Link href={`/categories/${PATH.health}`}>
          <a className='link footer__link '>Sức khỏe</a>
        </Link>
        <br></br>
        <Link href={`/categories/${PATH.career}`}>
          <a className='link footer__link '>Sự nghiệp</a>
        </Link>
        <br></br>
        <Link href={`/categories/${PATH.life}`}>
          <a className='link footer__link '>Cuộc sống</a>
        </Link>
      </div>
      <div className='page-info-section'>
        <h3 className='footer-title'>Social</h3>
        <Link href='https://www.instagram.com/byngann.245/'>
          <a className='link footer__link social' target='_blank'>
            <InstagramIcon />
          </a>
        </Link>
        <Link href='https://www.youtube.com/channel/UChfs541LTPg-iiDPSFV-XnQ'>
          <a className='link footer__link social' target='_blank'>
            <YouTubeIcon />
          </a>
        </Link>
        <Link href='https://www.linkedin.com/in/kimngannnguyen/'>
          <a className='link footer__link social ' target='_blank'>
            <LinkedInIcon />
          </a>
        </Link>
        <Link href='mailto:nguyenkimngan245@mail.com'>
          <a className='link footer__link social' target='_blank'>
            <EmailIcon />
          </a>
        </Link>
      </div>
    </div>
    {/* <div className='creator'>
      <Link href='https://github.com/antritue/blog'>
        <a className='link footer__link ' target='_blank'>
          Created by Tue An
        </a>
      </Link>
    </div> */}
  </footer>
);

export default Footer;
