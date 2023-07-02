import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (<Html>
    <Head>
      <link rel="shortcut icon" href="/logo-icon.svg" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>);
}