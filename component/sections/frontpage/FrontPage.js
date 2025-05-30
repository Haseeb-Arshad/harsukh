// /components/sections/frontpage/FrontPage.js
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/frontpage.module.css';

const FrontPage = ({ progress }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <Image
        src="/images/front-page.webp"
        layout="fill"
        objectFit="cover"
        priority
        alt="Background"
        className={styles.backgroundImage}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>
          <Image
            src="/images/Logo/HarsukhLogo.webp"
            height={isMobile ? 45 : 65}
            width={isMobile ? 200 : 270}
            alt="Harsukh"
          />
        </h1>

        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default FrontPage;
