// /app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/home/main.module.css';
import FrontPage from '@/app/FrontPage';
import HomePage from '@/component/sections/home/HomePage';
// import stylesMain from '@/styles/home/main.module.css';

<meta name="description" content="Harsukh Residencies offers luxury apartments in Nathiagali with mountain views, premium amenities, and a high ROI real estate opportunity in Galiyat."></meta>




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
      const displayTime = 3000; // 3 seconds
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, 100));
      }, 30); // Adjusted for smoother progress

      // Start exit animation after 3 seconds
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
      }, displayTime + 1000); // 3 seconds delay + 1 second for animation

      return () => {
        clearInterval(progressInterval);
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  // Add SEO metadata via page-level components since 'use client' is required
  React.useEffect(() => {
    // Update document title
    document.title = "Buy Apartment in Nathiagali – Harsukh Residencies | Best ROI in Galyat";
    
    // Update meta tags
    const metaTags = [
      { name: "description", content: "Harsukh Residencies offers luxury apartments in Nathiagali with mountain views, premium amenities, and a high ROI real estate opportunity in Galiyat." },
      { name: "keywords", content: "Buy Apartment Nathiagali, Luxury Apartments Galyat, Best ROI Nathiagali, Nathiagali Property, Galyat Real Estate, Mountain View Apartments, High-rise Apartments Nathiagali, Investment Property Galyat" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Harsukh Residencies - Luxury Apartments in Nathiagali Galyat" },
      { property: "og:description", content: "Discover Harsukh Residencies, the finest apartments in Nathiagali, with top-notch amenities and breathtaking mountain views." },
      { property: "og:image", content: "/images/background/front-view-winter.webp" },
      { property: "og:url", content: "https://theharsukh.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Harsukh Residencies | The Best Apartments in Nathiagali Galyat" },
      { name: "twitter:description", content: "Luxury living in the heart of Nathiagali, Pakistan. Explore Harsukh Residencies now!" },
      { name: "twitter:image", content: "/images/background/front-view-winter.webp" }
    ];
    
    // Create or update meta tags
    metaTags.forEach(tag => {
      let meta = document.querySelector(tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (tag.name) meta.setAttribute('name', tag.name);
        if (tag.property) meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://theharsukh.com');
    
    // Add JSON-LD structured data
    const existingLdJsonScript = document.querySelector('script[type="application/ld+json"]');
    if (existingLdJsonScript) {
      existingLdJsonScript.remove();
    }

    const realEstateAgentLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Harsukh Residencies",
      "image": "/images/background/front-view-winter.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nathiagali",
        "addressRegion": "KPK",
        "addressCountry": "PK"
      },
      "url": "https://theharsukh.com",
      "telephone": "051111520520"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(realEstateAgentLd);
    document.head.appendChild(script);
    const apartmentComplexLd = {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "name": "Harsukh Residencies",
      "description": "Luxury apartments in Nathiagali, Galyat, Pakistan with modern amenities and breathtaking mountain views.",
      "url": "https://theharsukh.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nathiagali",
        "addressRegion": "KP",
        "addressCountry": "Pakistan"
      },
      "image": [
        "/images/background/front-view-winter.webp",
        "/images/home/harsukhImage1.webp",
        "/images/home/vision-bg.webp"
      ],
      "numberOfAvailableAccommodationUnitsTotal": 146,
      "offers": {
        "@type": "Offer",
        "url": "https://theharsukh.com"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Luxury Apartments",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Mountain Views",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "High-rise Building",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Investment Property",
          "value": true
        }
      ]
    };
    
    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.innerHTML = JSON.stringify(apartmentComplexLd);
    document.head.appendChild(script2);
  }, []);

  return (
    <main className={styles.main}>
      {showFrontPage && (
        <div
          className={`${styles.frontPageContainer} ${
            animationState === 'exiting' ? styles.exitAnimation : ''
          }`}
        >
          <FrontPage progress={loadingProgress} />
        </div>
      )}
      {!showFrontPage && <HomePage />}
    </main>
  );
}
