import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './global.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from '@/components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <div style={{ overflowY: 'scroll', maxHeight: '100vh' }} className='bg-gray-200'>
        <div style={{ position: 'sticky', top: '0' }}>
          <Header />
        </div>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default App;
