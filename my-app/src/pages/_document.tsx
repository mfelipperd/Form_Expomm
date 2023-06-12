import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const googlePixelId = 'G-TE935BRHLJ';
  return (
    <Html lang="en">
      <Head>
        {/* Código do pixel do Google */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googlePixelId}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googlePixelId}');
              `,
            }}
          ></script>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
