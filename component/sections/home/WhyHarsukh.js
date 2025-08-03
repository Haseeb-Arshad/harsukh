'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/whyHarsukh.module.css';

// AnimatedText Component for text staggering animation
const AnimatedText = ({ text, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={`${className} ${styles.animatedText} ${inView ? styles.isInview : ''}`}>
      <span className={styles.textInner}>{text}</span>
    </div>
  );
};

const WhyHarsukh = () => {
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    { id: 1, title: '', subtitle: 'GDA APPROVED', icon: '/images/icons/gda-approved-new.svg' },
    { id: 2, title: '', subtitle: 'FLEXIBLE PAYMENT PLANS', icon: '/images/icons/payment-plans-new.svg' },
    { id: 3, title: '25%', subtitle: 'ROI', icon: '/images/icons/roi-clean.svg' },
    { id: 4, title: '15%', subtitle: 'INITIAL DOWNPAYMENT', icon: '/images/icons/downpayment-new.svg' },
    { id: 5, title: '', subtitle: 'APPROVED BY FORESTRY AND WILDLIFE DEPARTMENTS', icon: '/images/icons/forestry-approved-new.svg' },
    { id: 6, title: '', subtitle: 'EASY 4-YEAR INSTALLMENT PLAN', icon: '/images/icons/installment-new.svg' },
    { id: 7, title: '10 MIN', subtitle: 'DRIVE FROM NATHIA GALI', icon: '/images/icons/location-new.svg' },
    { id: 8, title: '', subtitle: 'LIMITED TIME DISCOUNTS', icon: '/images/icons/discount-clean.svg' }
  ];

  return (
    <div className={styles.whyHarsukhContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.titleContainer}>
          <AnimatedText text="WHY" className={styles.titleWhy} />
          <AnimatedText text="HARSUKH Residencies?" className={styles.titleName} />
        </div>
        
        <div ref={gridRef} className={`${styles.featuresGrid} ${gridInView ? styles.gridVisible : ''}`}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureItem}>
              <div className={styles.iconContainer}>
                <img 
                  src={feature.icon} 
                  alt={feature.subtitle} 
                  className={styles.featureIcon} 
                />
              </div>
              {feature.title && <div className={styles.featureTitle}>{feature.title}</div>}
              <div className={styles.featureSubtitle}>{feature.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyHarsukh;
