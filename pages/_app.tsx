import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Header from '../components/header.tsx';

export default function App({ Component, pageProps }: AppProps) {
    let description = "Interviews from the Blue Ridge/Appalachian area.";

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | The Ridge Podcast"
        defaultTitle="The Ridge Podcast"
        description={description}
        canonical="https://theridgepodcast.com"
        openGraph={{
          title: "%s | The Ridge Podcast",
          type: "website",
          locale: "en_US",
          url: "https://theridgepodcast.com",
          siteName: "The Ridge Podcast",
          description,
        }}
        twitter={{
          handle: "@theridgepodcast",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.png",
            type: "image/png",
            sizes: "any",
          },
        ]}
      />

      <div>
        <Header />

        <Component {...pageProps} />
      </div>

    </>
  );

}
