import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './global.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from '@/components/common/Header';
import LeftSidebar from '@/components//common/LeftSidebar';
import { AuthGuard } from '@/components/common/AuthGuard';

const App = ({ Component, pageProps }: AppProps & { Component: {requireAuth?: boolean}}) => {
  return (
    <SessionProvider session={pageProps.session}>
      {
        Component?.requireAuth ? 
        (<AuthGuard><Component {...pageProps}></Component></AuthGuard>) :
        (<Component {...pageProps}></Component>)
      }
    </SessionProvider>

    // <SessionProvider session={pageProps.session}>
    //   <Component {...pageProps} />
    // </SessionProvider>


  );
};

export default App;
