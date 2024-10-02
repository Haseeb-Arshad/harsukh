import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { Providers } from "@/state/provider";
import { GoogleTagManager } from '@next/third-parties/google'
import Head from "next/head";
import dynamic from "next/dynamic";

// const SwupProvider = dynamic(() => import('./component/ui/Swup'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Harsukh',
  description: 'Experience luxury living at Harsukh Residences in Galyat, Pakistan. Modern apartments with stunning views and world-class amenities.',
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Head>
        <title>Luxury Apartments in Galyat | Harsukh Residences, Pakistan</title>
        <meta name="description" content="Discover luxury apartments at Harsukh Residences, Galyat, Pakistan. Modern amenities, breathtaking views, and the perfect location for serene living." />
        <meta name="keywords" content="Luxury Apartments, Harsukh Residences, Apartments in Galyat, Pakistan Properties, Galyat Real Estate, Modern Apartments in Galyat, Best Apartments in Pakistan" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="pdF67cKTIKSHMJM0IRkz4p7_4A2CZlKPQD22CDeK4Hs" />
        <link rel="canonical" href="https://theharsukh.com" />

        {/* Open Graph meta tags for social media */}
        <meta property="og:title" content="Luxury Apartments in Galyat | Harsukh Residences" />
        <meta property="og:description" content="Explore Harsukh Residences in Galyat, Pakistan—offering luxury living with stunning views and modern amenities." />
        <meta property="og:image" content="https://cdn.theharsukh.com/images/background/front-view-winter.webp" />
        <meta property="og:url" content="https://theharsukh.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Apartments in Galyat | Harsukh Residences" />
        <meta name="twitter:description" content="Luxury apartments in Galyat, Pakistan with breathtaking views and top-notch amenities. Discover Harsukh Residences today." />
        <meta name="twitter:image" content="https://cdn.theharsukh.com/images/background/front-view-winter.webp" />
      </Head>

      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MJDJH587"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>

        <Providers>
            {children}
        </Providers>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-tag" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7619137";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l) {
                window.lintrk = function(a,b) {
                  window.lintrk.q.push([a,b])
                };
                window.lintrk.q = []
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MJDJH587');
          `}
        </Script>

        {/* Google Analytics */}
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

        {/* Facebook Pixel */}
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

        {/* Google Tag Manager component */}
        <GoogleTagManager gtmId="GTM-MJDJH587" />

        {/* NoScript tags */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=7619137&fmt=gif" />
        </noscript>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=7384856538283539&ev=PageView&noscript=1" alt="" />
        </noscript>
      </body>
    </html>
  );
}