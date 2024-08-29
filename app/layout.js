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
          <meta name="description" content={metadata.verification} />
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
        </head>
        <body className={inter.className}>
          <GoogleTagManager />
          {children}
        </body>
      </html>
    </Providers>
  );
}
