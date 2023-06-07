import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (<Html>
    <Head>
      <link rel="shortcut icon" href="/logo-icon.svg" />
      {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet"/> */}
      {/* <link
        rel="stylesheet"
        type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>);
}