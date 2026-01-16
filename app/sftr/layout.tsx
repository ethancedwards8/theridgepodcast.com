import Script from "next/script";

export default function SFTRLayout({
    children,
}) {
    // things are expensive :(
    return (
        <>
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5292714556730341" crossOrigin="anonymous" strategy="afterInteractive" />

            <div>
                {children}
            </div>
        </>
    );
}
