'use client';

import React from 'react';
import Head from 'next/head';
import styles from '@/styles/home/main.module.css';

export default function Location() {
  return (
    <>
      <Head>
        <title>Nathiagali&apos;s Prime Location – Harsukh Residencies</title>
        <meta 
          name="description" 
          content="Buy your dream apartment in Nathiagali's most prime location. Harsukh Residencies is set in the heart of Galyat with unbeatable scenic beauty." 
        />
        <meta 
          name="keywords" 
          content="Nathiagali location, Galyat real estate, prime property Nathiagali, Nathiagali Bazaar, mountain view apartments, pine forest property, hiking trails Nathiagali, panoramic views Galyat, Harsukh Residencies location" 
        />
        <meta property="og:title" content="Nathiagali's Prime Location – Harsukh Residencies" />
        <meta 
          property="og:description" 
          content="Located minutes from Nathiagali Bazaar, surrounded by lush pine forests, hiking trails, and panoramic mountain views. The ideal Galyat location." 
        />
        <meta property="og:image" content="/images/location-view.jpg" />
        <meta property="og:url" content="https://theharsukh.com/location" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://theharsukh.com/location" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Place",
              "name": "Harsukh Residencies Nathiagali",
              "description": "Luxury apartment complex located in the heart of Nathiagali, surrounded by pine forests and hiking trails",
              "geo": {
                "@type": "GeoCoordinates",
                "addressCountry": "Pakistan",
                "addressRegion": "KP",
                "addressLocality": "Nathiagali, Galyat"
              },
              "photo": "/images/location-view.jpg",
              "hasMap": "https://theharsukh.com/map-view",
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Proximity to Nathiagali Bazaar",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Surrounded by Pine Forests",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Access to Hiking Trails",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Panoramic Mountain Views",
                  "value": true
                }
              ]
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Luxury Living in the Heart of Nathiagali</h1>
        <p>Located just minutes from Nathiagali Bazaar, Harsukh Residencies is surrounded by lush pine forests, hiking trails, and panoramic mountain views. The most ideal location in Galyat for both vacation homes and investment.</p>
        
        <div className={styles.locationFeatures}>
          <div className={styles.locationFeature}>
            <h2>Strategic Location</h2>
            <p>Just minutes away from Nathiagali Bazaar with easy access to restaurants, shops, and local attractions</p>
          </div>
          
          <div className={styles.locationFeature}>
            <h2>Natural Surroundings</h2>
            <p>Nestled among tall pine trees and natural beauty that Galyat is famous for</p>
          </div>
          
          <div className={styles.locationFeature}>
            <h2>Panoramic Views</h2>
            <p>Breathtaking views of the surrounding mountains and valleys from your apartment</p>
          </div>
          
          <div className={styles.locationFeature}>
            <h2>Outdoor Activities</h2>
            <p>Close proximity to hiking trails, viewpoints, and other outdoor recreation options</p>
          </div>
          
          <div className={styles.locationFeature}>
            <h2>Accessibility</h2>
            <p>Well-connected to major cities with improved road infrastructure</p>
          </div>
        </div>
        
        <div className={styles.locationMap}>
          <h2>Our Location</h2>
          <p>Harsukh Residencies is located in the heart of Nathiagali, providing the perfect balance of convenience and natural beauty.</p>
          {/* Placeholder for map or image */}
          <img src="/images/location-map.jpg" alt="Map showing Harsukh Residencies location in Nathiagali" />
        </div>
      </main>
    </>
  );
}
