'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/home/main.module.css';
import FrontPage from '@/app/FrontPage';
import HomePage from '@/component/sections/home/HomePage';

export default function HomeClient() {
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

    return (
        <main className={styles.main}>
            {showFrontPage && (
                <div
                    className={`${styles.frontPageContainer} ${animationState === 'exiting' ? styles.exitAnimation : ''
                        }`}
                >
                    <FrontPage progress={loadingProgress} />
                </div>
            )}
            {!showFrontPage && <HomePage />}
        </main>
    );
}
