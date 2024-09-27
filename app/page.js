'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";
import FrontPage from './FrontPage.js';
import HomePage from './component/modules/home/homePage.js';
import CustomScrollbarContainer from './component/ui/customScroll.js';
import Image from 'next/image.js';
import Head from 'next/head.js';

export default function Home() {
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [animationState, setAnimationState] = useState('initial'); // 'initial', 'exiting', 'completed'
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
      setShowFrontPage(false);
      console.log('User has visited before, skipping FrontPage');
    } else {
      console.log('First visit, showing FrontPage');
      const displayTime = 3000; // 2.5 seconds
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => Math.min(prev + 1, 100));
      }, 25);

      // Start exit animation after 2.5 seconds
      const exitTimer = setTimeout(() => {
        console.log('Starting exit animation');
        setAnimationState('exiting');
      }, displayTime);

      // Remove FrontPage after animation duration
      const removeTimer = setTimeout(() => {
        console.log('Removing FrontPage');
        setAnimationState('completed');
        setShowFrontPage(false);
        localStorage.setItem('hasVisited', 'true');
      }, displayTime + 1000); // 2.5 seconds delay + 1 second for animation

      return () => {
        clearInterval(progressInterval);
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  return (


<>
      
      <Head>
        <title>Harsukh Residences | The Best Apartment in Galyat, Pakistan</title>
        <meta name="description" content="Experience luxury living at Harsukh Residences, the best apartments in Galyat, Pakistan. Modern, spacious, and serene." />
        <meta name="keywords" content="Best Apartment, Luxury Apartments, Harsukh Residences, Galyat, Pakistan, Mountain Living, Real Estate, Property in Galyat" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Harsukh Residences - Luxury Apartments in Galyat" />
        <meta property="og:description" content="Discover Harsukh Residences, the finest apartments in Galyat, with top-notch amenities and breathtaking views." />
        <meta property="og:image" content="https://cdn.theharsukh.com/images/background/front-view-winter.webp" />
        <meta property="og:url" content="https://theharsukh.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harsukh Residences | The Best Apartments in Galyat" />
        <meta name="twitter:description" content="Luxury living in the heart of Galyat, Pakistan. Explore Harsukh Residences now!" />
        <meta name="twitter:image" content="https://cdn.theharsukh.com/images/background/front-view-winter.webp" />
        <link rel="canonical" href="https://theharsukh.com" />

        {/* Add your JSON-LD structured data here */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ApartmentComplex",
              "name": "Harsukh Residences",
              "description": "Luxury apartments in Galyat, Pakistan with modern amenities and breathtaking views.",
              "url": "https://theharsukh.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Galyat",
                "addressRegion": "KP",
                "addressCountry": "Pakistan"
              },
              "image": "https://cdn.theharsukh.com/images/background/front-view-winter.webp",
              "numberOfAvailableAccommodationUnitsTotal": 146,
              "offers": {
                "@type": "Offer",
                "url": "https://theharsukh.com"
              }
            })
          }}
        />
      </Head>

  
      <main className={styles.main}>
    {/* <CustomScrollbarContainer> */}
      {showFrontPage && (
        <div
          className={`${styles.frontPageContainer} ${
            animationState === 'exiting' ? styles.exitAnimation : ''
          }`}
        >

          <FrontPage progress={loadingProgress} />

        </div>
      )}
      {!showFrontPage && 
      
      <HomePage />
      
      }
    {/* </CustomScrollbarContainer> */}
  </main>
</>
  
);
}