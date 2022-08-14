import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

export default function Home() {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <div id='top' className={`${themeName} app`}>
      <Header />

      {/* <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer /> */}
    </div>
  );
}
