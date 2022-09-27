import Link from 'next/link';
import { PATH } from '../constants';
import FacebookIcon from '@mui/icons-material/Facebook';
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
        <Link href='#'>
          <a className='link footer__link social'>
            <FacebookIcon />
          </a>
        </Link>
        <Link href='#'>
          <a className='link footer__link  social'>
            <InstagramIcon />
          </a>
        </Link>
        <Link href='#'>
          <a className='link footer__link  social'>
            <YouTubeIcon />
          </a>
        </Link>
        <Link href='#'>
          <a className='link footer__link social '>
            <LinkedInIcon />
          </a>
        </Link>
        <Link href='#'>
          <a className='link footer__link  social'>
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
