import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './global.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from '@/components/common/Header';
import LeftSidebar from '@/components//common/LeftSidebar';
import { AuthGuard } from '@/components/common/AuthGuard';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const App = ({ Component, pageProps }: AppProps & { Component: {requireAuth?: boolean}}) => {
  // console.log(pageProps.session)
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {
          Component?.requireAuth ? 
          (<AuthGuard><Component {...pageProps}></Component></AuthGuard>) :
          (<Component {...pageProps}></Component>)
        }
      </SessionProvider>
    </QueryClientProvider>

    // <SessionProvider session={pageProps.session}>
    //   <Component {...pageProps} />
    // </SessionProvider>


  );
};

export default App;
