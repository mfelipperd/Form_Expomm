import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  const googlePixelId = 'G-TE935BRHLJ';
  return (
    <Html lang="en">
      <Head>
  {/* Suas outras tags no head */}
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-TE935BRHLJ"
    strategy="afterInteractive"
  />
  <Script
    id="gtag-init"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TE935BRHLJ');
      `,
    }}
  />
</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
