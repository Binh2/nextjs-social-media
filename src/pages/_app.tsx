import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import './global.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { AuthGuard } from '@/components/common/AuthGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Monkey patching: JSON not stringify BigInt
interface BigInt { toJSON: () => string; }
(BigInt.prototype as any).toJSON = function () { return this.toString(); };

const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       suspense: true
  //     }
  //   }
  // }
)
const App = ({ Component, pageProps }: AppProps & { Component: {requireAuth?: boolean, getLayout: any}}) => {
  const getLayout = Component.getLayout || ((page: any) => page);
  const component = <Component {...pageProps}></Component>;
  const authGuarded = Component?.requireAuth ? (<AuthGuard>{component}</AuthGuard>) : component;
  const withLayout = getLayout(authGuarded);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        { withLayout }
      </SessionProvider>
    </QueryClientProvider>
  );
};
export default App;
