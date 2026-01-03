import type { AppProps } from "next/app";
import Head from "next/head";
import Header from '../components/header';
import Footer from '../components/footer';
import { generateDefaultSeo } from "next-seo/pages";

import '../styles/global.scss';

const description = "Interviews from the Blue Ridge/Appalachian area.";

const DEFAULT_SEO = {
  titleTemplate: "%s | The Ridge Podcast",
  defaultTitle: "The Ridge Podcast",
  description: description,
  canonical: "https://theridgepodcast.com",
  openGraph: {
    title: '%s | The Ridge Podcast',
    defaultTitle: "The Ridge Podcast",
    type: "website",
    locale: "en_US",
    url: "https://theridgepodcast.com/",
    siteName: "The Ridge Podcast",
    description,
  },
  twitter: {
    handle: "@theridgepodcast",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/ethanandluke/favicon.svg",
      type: "image/svg",
      sizes: "any",
    },
  ],
};


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <Head>{generateDefaultSeo(DEFAULT_SEO)}</Head>

      <div>
        <Header />

        <div className="body">
            <Component {...pageProps} />
        </div>

        <Footer />
      </div>

    </>
  );

}
