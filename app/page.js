'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from "@/app/page.module.css";
import Loading from './[floor]/Loading.js';
import FrontPage from './FrontPage.js';
// import MainPage from '@/app/component/Background/MainPage.js'
// './component/Background/MainPage.js';

const MainPage = lazy(() => import("@/app/component/Background/MainPage.js"));

import dynamic from 'next/dynamic';

const DynamicMainPage = dynamic(() => import("@/app/component/Background/MainPage.js"), {
  loading: () => <Loading />,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
      setShowFrontPage(false);
      setIsLoading(false);
    } else {
      const minDisplayTime = 2500; // 5 seconds minimum display time for FrontPage
      const startTime = Date.now();

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      // Preload ImageBackground
      import("@/app/component/Background/MainPage.js").then(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setShowFrontPage(false);
            localStorage.setItem('hasVisited', 'true');
            clearInterval(progressInterval);
          }, 1000); // Duration of fade out animation
        }, remainingTime);
      });

      return () => clearInterval(progressInterval);
    }
  }, []);

  return (
    <main className={styles.main}>
      {showFrontPage ? (
        <div className={`${styles.frontPageContainer} ${fadeOut ? styles.fadeOut : ''}`}>
          <FrontPage progress={loadingProgress} />
        </div>
      ) : (
        <DynamicMainPage />
      )}
    </main>
  );
}