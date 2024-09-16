'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";
import FrontPage from './FrontPage.js';
import HomePage from './component/modules/home/homePage.js';
import CustomScrollbarContainer from './component/ui/customScroll.js';
import Image from 'next/image.js';

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
);
}