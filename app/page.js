import React from 'react';
import HomeClient from '@/component/modules/home/HomeClient';

export const metadata = {
  title: 'Harsukh Residencies | Luxury Apartments Ayubia | High ROI',
  description: 'Buy luxury apartments in Ayubia near Kuza Gali. Enjoy thermal pools, skywalks & high ROI. 1.5 hours from Islamabad. Book now.',
  keywords: 'Buy Apartment Nathiagali, Luxury Apartments Galyat, Best ROI Nathiagali, Nathiagali Property, Galyat Real Estate, Mountain View Apartments, High-rise Apartments Nathiagali, Investment Property Galyat',
  alternates: {
    canonical: 'https://theharsukh.com',
  },
  openGraph: {
    title: 'Harsukh Residencies - Luxury Apartments in Nathiagali Galyat',
    description: 'Discover Harsukh Residencies, the finest apartments in Nathiagali, with top-notch amenities and breathtaking mountain views.',
    images: ['/images/background/front-view-winter.webp'],
    url: 'https://theharsukh.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsukh Residencies | The Best Apartments in Nathiagali Galyat',
    description: 'Luxury living in the heart of Nathiagali, Pakistan. Explore Harsukh Residencies now!',
    images: ['/images/background/front-view-winter.webp'],
  },
};

export default function Home() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apartmentComplexLd) }}
      />
      <HomeClient />
    </>
  );
}

