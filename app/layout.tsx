import '../styles/global.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import type { Metadata } from 'next'

const description = "Interviews from the Blue Ridge/Appalachian area.";
const url = "https://theridgepodcast.com";

export const metadata: Metadata = {
  title: {
    template: "%s | The Ridge Podcast",
    default: "The Ridge Podcast",
  },
  description: description,
  alernates: { canonical: url },
  authors: [{ name: 'Ethan Carter Edwards' } ],
  creator: 'Ethan Carter Edwards',
  publisher: 'Ethan Carter Edwards',
  openGraph: {
    title: {
      template: "%s | The Ridge Podcast",
      default: "The Ridge Podcast",
    },
    type: "website",
    locale: "en_US",
    url,
    siteName: "The Ridge Podcast",
    description,
  },
  twitter: {
    creator: "@theridgepodcast",
    card: "summary_large_image",
    description,
  },
  icons: {
    icon: [
      { url: "/ethanandluke/favicon.svg", type: "image/svg+xml" },
      { url: "/ethanandluke/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/ethanandluke/favicon.ico",
    apple: "/ethanandluke/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "The Ridge Podcast",
  },
  manifest: "/ethanandluke/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>

      <div>
        <Header />

        <div className="body">
            {children}
        </div>

        <Footer />
      </div>

      </body>
    </html>
  )
}
