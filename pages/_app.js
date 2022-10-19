import { ThemeProvider } from '../contexts/theme';
import { CategoryProvider } from '../contexts/categories';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <Component {...pageProps} />
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default MyApp;
