import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Adicione o código do pixel do Google aqui */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-TE935BRHLJ"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TE935BRHLJ');
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
