import { AppProps } from "next/app";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}
export default MyApp