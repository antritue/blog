import { ThemeProvider } from '../contexts/theme';
import { CategoryProvider } from '../contexts/categories';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/navbar.css';
import '../styles/introduction.css';
import '../styles/card.css';
import '../styles/footer.css';
import '../styles/scroll.css';
import '../styles/slug.css';
import '../styles/slide.css';
import GAScript from '../components/GAScript';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <GAScript />
        <Component {...pageProps} />
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default MyApp;
