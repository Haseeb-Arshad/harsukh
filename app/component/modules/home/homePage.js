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

const sections = [
  { id: 'header', component: Header },
  { id: 'video', component: VideoContent },
  { id: 'about', component: AboutUs },
  { id: 'vision', component: Vision },
  { id: 'developer', component: Developer },
  { id: 'ceo-vision', component: CeoVision },
];

export default function HomePage() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [footerScrollPosition, setFooterScrollPosition] = useState(0);

  const scrollToSection = (index) => {
    if (index < 0 || index > sections.length || isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(index);
    
    if (index === sections.length) {
      // Scroll to footer
      setShowFooter(true);
      containerRef.current.style.transform = `translateY(-${(sections.length - 1) * 100}vh)`;
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setShowFooter(false);
      containerRef.current.style.transform = `translateY(-${index * 100}vh)`;
    }
    
    setTimeout(() => setIsScrolling(false), 1500);
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentSection > 0) {
      scrollToSection(currentSection - 1);
    } else if (direction === 'down' && currentSection < sections.length) {
      scrollToSection(currentSection + 1);
    }
  };

  const handleFooterScroll = (e) => {
    setFooterScrollPosition(e.target.scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    const footer = footerRef.current;
    if (!container || !footer) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      if (showFooter) {
        if (e.deltaY > 0 && footerScrollPosition < footer.scrollHeight - footer.clientHeight) {
          // Scroll footer
          footer.scrollTop += 30;
        } else if (e.deltaY < 0 && footerScrollPosition === 0) {
          // Go back to last section
          scrollToSection(sections.length - 1);
        }
      } else {
        if (e.deltaY > 0) {
          handleScroll('down');
        } else if (e.deltaY < 0) {
          handleScroll('up');
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (showFooter) {
        if (touchStartY - touchEndY > 50 && footerScrollPosition < footer.scrollHeight - footer.clientHeight) {
          // Scroll footer down
          footer.scrollTop += 30;
        } else if (touchEndY - touchStartY > 50 && footerScrollPosition === 0) {
          // Go back to last section
          scrollToSection(sections.length - 1);
        }
      } else {
        if (touchStartY - touchEndY > 50) {
          handleScroll('down');
        } else if (touchEndY - touchStartY > 50) {
          handleScroll('up');
        }
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
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);
    footer.addEventListener('scroll', handleFooterScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      footer.removeEventListener('scroll', handleFooterScroll);
    };
  }, [currentSection, isScrolling, showFooter, footerScrollPosition]);

  return (
    <div className={styles.container}>
      <Navbar currentSection={showFooter ? 'footer' : sections[currentSection].id} />
      <nav className={styles.nav}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`${styles.navButton} ${index === currentSection && !showFooter ? styles.active : ''}`}
            aria-label={`Scroll to ${section.id}`}
          >
            <span className={styles.navDot}></span>
          </button>
        ))}
        <button
          onClick={() => scrollToSection(sections.length)}
          className={`${styles.navButton} ${showFooter ? styles.active : ''}`}
          aria-label="Scroll to footer"
        >
          <span className={styles.navDot}></span>
        </button>
      </nav>
      <div ref={containerRef} className={styles.sectionContainer}>
        {sections.map((Section, index) => (
          <section key={Section.id} id={Section.id} className={styles.section}>
            <Section.component />
          </section>
        ))}
      </div>
      <footer ref={footerRef} className={`${styles.footer} ${showFooter ? styles.show : ''}`}>
        <Footer />
      </footer>
    </div>
  );
}