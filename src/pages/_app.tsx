import { store } from '@/store';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'react-redux';

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta
          name={'viewport'}
          content={
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
          }
        />
        <title>ImaginArt</title>
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZF6W0NFC96"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js',new Date());
           gtag('config','G-ZF6W0NFC96')
          `}
      </Script>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(MyApp);
