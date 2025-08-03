'use client';

import React from 'react';
import Head from 'next/head';
import styles from '@/styles/home/main.module.css';

export default function Investment() {
  return (
    <>
      <Head>
        <title>Best ROI Apartments in Galyat – Harsukh Residencies</title>
        <meta 
          name="description" 
          content="Harsukh Residencies offers high-return luxury apartments in Nathiagali. Learn how our investors are seeing strong returns in real estate." 
        />
        <meta 
          name="keywords" 
          content="ROI Nathiagali, best investment Galyat, real estate investment Nathiagali, property ROI Pakistan, Galyat property investment, high return apartments, vacation rental investment, mountain property ROI, Harsukh investment opportunity" 
        />
        <meta property="og:title" content="Best ROI Apartments in Galyat – Harsukh Residencies" />
        <meta 
          property="og:description" 
          content="Invest in apartments with unmatched return on investment in Nathiagali. Limited supply and rising demand make this a smart investment choice." 
        />
        <meta property="og:image" content="/images/investment-chart.jpg" />
        <meta property="og:url" content="https://theharsukh.com/investment" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://theharsukh.com/investment" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": "Harsukh Residencies Investment Opportunity",
              "description": "High-return luxury apartments in Nathiagali with strong investment potential",
              "image": "/images/investment-chart.jpg",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "PKR"
              },
              "potentialAction": {
                "@type": "ViewAction",
                "target": "https://theharsukh.com/contact"
              },
              "mainContentOfPage": {
                "@type": "WebPageElement",
                "cssSelector": ".investmentBenefits"
              }
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Invest in Apartments with the Best ROI in Galyat</h1>
        <p>Whether you&apos;re buying to rent out or for capital appreciation, Harsukh Residencies offers unmatched return on investment (ROI) in the entire Nathiagali and Galyat region. With limited supply and rising demand, this is your chance to invest smartly.</p>
        
        <div className={styles.investmentBenefits}>
          <div className={styles.investmentBenefit}>
            <h2>Capital Appreciation</h2>
            <p>Property values in Nathiagali have consistently increased over the years, outperforming many other investment options</p>
          </div>
          
          <div className={styles.investmentBenefit}>
            <h2>Rental Income</h2>
            <p>Strong demand for vacation rentals in Nathiagali, especially during peak seasons, generates significant rental income</p>
          </div>
          
          <div className={styles.investmentBenefit}>
            <h2>Limited Supply</h2>
            <p>Strict zoning regulations and limited land availability in Nathiagali ensure your investment remains valuable</p>
          </div>
          
          <div className={styles.investmentBenefit}>
            <h2>Growing Tourism</h2>
            <p>Increasing domestic tourism in Galyat region drives demand for quality accommodation options</p>
          </div>
          
          <div className={styles.investmentBenefit}>
            <h2>Investment Security</h2>
            <p>Full legal documentation and transparent ownership process ensures your investment is secure</p>
          </div>
        </div>
        
        <div className={styles.investmentStats}>
          <h2>Investment Performance</h2>
          <p>Harsukh Residencies apartments have shown exceptional investment performance:</p>
          <ul>
            <li>Average annual capital appreciation: 15-20%</li>
            <li>Rental yield during peak season: 8-12%</li>
            <li>Break-even period: 7-10 years with rental income</li>
            <li>Demand growth rate: 25% annually for quality mountain properties</li>
          </ul>
        </div>
        
        <div className={styles.investmentCTA}>
          <h2>Ready to Invest?</h2>
          <p>Our investment advisors can help you select the best unit based on your investment goals and budget.</p>
          <a href="/contact" className={styles.ctaButton}>Contact Our Investment Team</a>
        </div>
      </main>
    </>
  );
}
