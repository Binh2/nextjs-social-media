import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './global.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { AuthGuard } from '@/components/common/AuthGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       suspense: true
  //     }
  //   }
  // }
)
const App = ({ Component, pageProps }: AppProps & { Component: {requireAuth?: boolean}}) => {
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


  );
};

export default App;
