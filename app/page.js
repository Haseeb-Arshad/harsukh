'use client';

import React, { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";
import ImageBackground from "./background/page.jsx";
import Loading from './[floor]/Loading.js';
import FrontPage from './FrontPage.js';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showFrontPage, setShowFrontPage] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
      setShowFrontPage(false);
      setIsLoading(false);
    } else {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      const frontPageTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowFrontPage(false);
          localStorage.setItem('hasVisited', 'true');
        }, 1000); // Duration of fade out animation
      }, 6000);

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(frontPageTimer);
      };
    }
  }, []);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <Loading />
      ) : showFrontPage ? (
        <div className={`${styles.frontPageContainer} ${fadeOut ? styles.fadeOut : ''}`}>
          <FrontPage />
        </div>
      ) : (
        <ImageBackground />
      )}
    </main>
  );
}