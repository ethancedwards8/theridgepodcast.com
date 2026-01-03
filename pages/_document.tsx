import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/ethanandluke/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/ethanandluke/favicon.svg" />
        <link rel="shortcut icon" href="/ethanandluke/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ethanandluke/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="The Ridge Podcast" />
        <link rel="manifest" href="/ethanandluke/site.webmanifest" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
