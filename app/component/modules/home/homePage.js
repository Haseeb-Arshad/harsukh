import React, { useEffect, useRef, useState } from 'react';
import Header from './parts/header';
import Vision from './parts/vision';
import AboutUs from './parts/aboutus';
import CeoVision from './parts/ceoVision';
import Footer from './parts/footer';
import VideoContent from './parts/videoContent';
import Navbar from './parts/navbar';
import Developer from './parts/developer';
import styles from '@/styles/home/main.module.css';
import Developer1 from './parts/developer1';
import Developer2 from './parts/developer2';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth });
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};

const sections = [
  { id: 'header', component: Header },
  { id: 'video', component: VideoContent },
  { id: 'about', component: AboutUs },
  { id: 'vision', component: Vision },
  { id: 'ceo-vision', component: CeoVision },
  { id: 'footer', component: Footer },
];

export default function HomePage() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { width } = useWindowSize();

  const developerSections = width <= 768
    ? [
        { id: 'developer1', component: Developer1 },
        { id: 'developer2', component: Developer2 },
      ]
    : [{ id: 'developer', component: Developer }];

  const allSections = [
    ...sections.slice(0, 4),
    ...developerSections,
    ...sections.slice(4),
  ];

  const scrollToSection = (index) => {
    if (index < 0 || index >= allSections.length || isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(index);
    const maxScroll = (allSections.length - 1) * 100 - 25;
    const scrollPercentage = Math.min(index * 100, maxScroll);
    containerRef.current.style.transform = `translateY(-${scrollPercentage}vh)`;
    setTimeout(() => setIsScrolling(false), 500); // Reduced from 1500ms to 500ms for faster response
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentSection > 0) {
      scrollToSection(currentSection - 1);
    } else if (direction === 'down' && currentSection < allSections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let lastScrollTime = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      const now = new Date().getTime();
      if (now - lastScrollTime > 500) { // Reduced from 1500ms to 500ms
        if (e.deltaY > 0) {
          handleScroll('down');
        } else if (e.deltaY < 0) {
          handleScroll('up');
        }
        lastScrollTime = now;
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const now = new Date().getTime();
      if (now - lastScrollTime > 300) { // Reduced from 1500ms to 300ms for more responsive touch
        if (touchStartY - touchEndY > 30) { // Reduced threshold from 50 to 30
          handleScroll('down');
        } else if (touchEndY - touchStartY > 30) { // Reduced threshold from 50 to 30
          handleScroll('up');
        }
        lastScrollTime = now;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        handleScroll('down');
      } else if (e.key === 'ArrowUp') {
        handleScroll('up');
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isScrolling]);

  return (
    <div className={styles.container}>
      <Navbar currentSection={allSections[currentSection].id} />
      <nav className={styles.nav}>
        {allSections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`${styles.navButton} ${index === currentSection ? styles.active : ''}`}
            aria-label={`Scroll to ${section.id}`}
          >
            <span className={styles.navDot}></span>
          </button>
        ))}
      </nav>
      <div ref={containerRef} className={styles.sectionContainer}>
        {allSections.map((Section, index) => (
          <section key={Section.id} id={Section.id} className={styles.section}>
            <Section.component />
          </section>
        ))}
      </div>
    </div>
  );
}