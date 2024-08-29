import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { Providers } from "@/state/provider";
import GoogleTagManager from "./component/analytics/GoogleTagManager";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Harsukh Residences",
//   description: "Harsukh Residences - Powered by AlMAYMAAR",
// };

export const metadata = {
  title: 'HARSUKH',
  description: 'HARSUKH',
  verification: {
    google: 'pdF67cKTIKSHMJM0IRkz4p7_4A2CZlKPQD22CDeK4Hs',
    
  }
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="google-site-verification" content={metadata.verification.google} />
          {/* <meta name="google-site-verification" content="pdF67cKTIKSHMJM0IRkz4p7_4A2CZlKPQD22CDeK4Hs" /> */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-16682968635"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16682968635');
            `}
          </Script>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '7384856538283539');
              fbq('track', 'PageView');
            `}
          </Script>
        </head>
        <body className={inter.className}>
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=7384856538283539&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          <GoogleTagManager />
          {children}
        </body>
      </html>
    </Providers>
  );
}
