'use client';

import React from 'react';
import Head from 'next/head';
import styles from '@/styles/home/main.module.css';

export default function Apartments() {
  return (
    <>
      <Head>
        <title>Luxury Apartments in Galyat – Harsukh Residencies</title>
        <meta 
          name="description" 
          content="Discover luxury apartments in Galyat with premium amenities, scenic views, and modern designs. Book your unit at Harsukh Residencies today." 
        />
        <meta 
          name="keywords" 
          content="Luxury Apartments Nathiagali, Galyat Luxury Real Estate, Premium Apartments Galyat, Mountain View Apartments, 1 Bedroom Apartment Nathiagali, 2 Bedroom Apartment Nathiagali, 3 Bedroom Apartment Nathiagali, Penthouse Nathiagali, Studio Apartment Galyat" 
        />
        <meta property="og:title" content="Luxury Apartments in Galyat – Harsukh Residencies" />
        <meta 
          property="og:description" 
          content="Choose from 1, 2, and 3-bedroom luxury apartments at Harsukh. Each unit offers the perfect blend of comfort, design, and mountain views." 
        />
        <meta property="og:image" content="/images/apartment.jpg" />
        <meta property="og:url" content="https://theharsukh.com/apartments" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://theharsukh.com/apartments" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Harsukh Residencies Luxury Apartments",
              "description": "Luxury apartments in Nathiagali, Galyat with options of 1, 2, and 3-bedroom layouts and premium amenities",
              "image": "/images/apartment.jpg",
              "offers": {
                "@type": "AggregateOffer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "PKR",
                "offerCount": "146"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "57"
              }
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Our Luxury Apartments in Galyat</h1>
        <p>Choose from 1, 2, and 3-bedroom luxury apartments at Harsukh. Each unit is designed to offer the perfect blend of comfort, design, and mountain views in Galyat&apos;s most premium location — Nathiagali.</p>

        <div className={styles.apartmentTypes}>
          <div className={styles.apartmentType}>
            <h2>Studio Apartments</h2>
            <p>Cozy and efficient spaces perfect for individuals or couples seeking a mountain retreat.</p>
            <p>Size Range: 309-488 sqft</p>
          </div>
          
          <div className={styles.apartmentType}>
            <h2>One Bedroom Apartments</h2>
            <p>Comfortable living spaces with breathtaking mountain views and modern amenities.</p>
            <p>Size Range: 451-899 sqft</p>
          </div>
          
          <div className={styles.apartmentType}>
            <h2>Two Bedroom Apartments</h2>
            <p>Spacious units ideal for families, featuring premium finishes and panoramic vistas.</p>
            <p>Size Range: 815-1339 sqft</p>
          </div>
          
          <div className={styles.apartmentType}>
            <h2>Three Bedroom Apartments</h2>
            <p>Luxurious residences offering the ultimate mountain living experience with ample space.</p>
            <p>Size Range: 1568-1796 sqft</p>
          </div>
          
          <div className={styles.apartmentType}>
            <h2>Penthouses</h2>
            <p>Exclusive top-floor apartments with premium finishes and unmatched panoramic views.</p>
            <p>Size Range: 1108-1665 sqft</p>
          </div>
        </div>

        <img src="/images/apartment.jpg" alt="Luxury apartment interior in Harsukh Residencies Nathiagali" />
      </main>
    </>
  );
}
