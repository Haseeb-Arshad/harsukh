import React, { useEffect, useRef, useState } from 'react';
import Header from './parts/header';
import Vision from './parts/vision';
import AboutUs from './parts/aboutus';
import CeoVision from './parts/ceoVision';
import Footer from './parts/footer';
import VideoContent from './parts/videoContent';
import Navbar from './parts/navbar';
import Developer from './parts/developer';
import Developer1 from './parts/developer1';
import Developer2 from './parts/developer2';
import RegisterRequestForm from '../../ui/Bars/contactBox';
import styles from '@/styles/home/main.module.css';
import { useRouter } from 'next/navigation';

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
  { id: 'header', component: Header, path: '/' },
  { id: 'video', component: VideoContent, path: '/' },
  { id: 'about', component: AboutUs, path: '/about' },
  { id: 'vision', component: Vision, path: '/about' },
  { id: 'ceo-vision', component: CeoVision, path: '/developer' },
  { id: 'footer', component: Footer, path: '/developer' },
];

export default function HomePage() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { width } = useWindowSize();

  const router = useRouter();

  // Contact Form State
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Refs for Large Screen Scroll Handling
  const lastScrollTime = useRef(0);
  const touchStartRefLarge = useRef(null);

  // Refs for Small Screen Scroll Handling
  const scrollTimeoutRefSmall = useRef(null);
  const lastScrollDeltaRefSmall = useRef(0);

  // Determine Developer Sections Based on Screen Width
  const developerSections =
  width <= 768
  ? [
      { id: 'developer', component: Developer1, path: '/developer' },
      { id: 'developer2', component: Developer2, path: '/developer2' },
    ]
  : [{ id: 'developer', component: Developer, path: '/developer' }];

  const allSections = [
    ...sections.slice(0, 4),
    ...developerSections,
    ...sections.slice(4),
  ];

  const [useGreenLogo, setUseGreenLogo] = useState(true);

  const updateLogoColor = (index) => {
    const currentSectionId = allSections[index].id;
    setUseGreenLogo(
      currentSectionId === 'header' ||
      currentSectionId === 'video' ||
      currentSectionId === 'vision'
    );
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= allSections.length || isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(index);
    updateLogoColor(index);
    const maxScroll = (allSections.length - 1) * 100 - 25;
    const scrollPercentage = Math.min(index * 100, maxScroll);

    containerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
    containerRef.current.style.transform = `translateY(-${scrollPercentage}vh)`;

    // Update URL without reloading the page
    const newPath = allSections[index].path;
    router.push(newPath, undefined, { shallow: true });

    setTimeout(() => {
      setIsScrolling(false);
      containerRef.current.style.transition = '';
    }, 800);
  };

  const toggleContactForm = () => {
    setIsContactFormOpen(!isContactFormOpen);
  };


  const handleNavClick = (sectionName) => {
    const sectionIndex = allSections.findIndex(section => 
      section.id.toLowerCase() === sectionName.toLowerCase() ||
      (sectionName === 'Home' && section.id === 'header')
    );
    if (sectionIndex !== -1) {
      scrollToSection(sectionIndex);
    }
  };

  // Updated handleWheelLarge function to prevent multiple scrolls
  const handleWheelLarge = (e) => {
    e.preventDefault();
    const now = Date.now();
    const deltaY = e.deltaY;

    // Ensure at least 1000ms (1 second) has passed since the last scroll
    if (now - lastScrollTime.current > 1500 && !isScrolling) {
      if (deltaY > 0 && currentSection < allSections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
      lastScrollTime.current = now;
    }
  };

  const handleTouchStartLarge = (e) => {
    touchStartRefLarge.current = e.touches[0].clientY;
  };

  const handleTouchMoveLarge = (e) => {
    e.preventDefault();
    const now = Date.now();
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartRefLarge.current - currentY;

    // Ensure at least 1000ms (1 second) has passed since the last scroll
    if (Math.abs(deltaY) > 100 && now - lastScrollTime.current > 1000 && !isScrolling) {
      if (deltaY > 0 && currentSection < allSections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
      lastScrollTime.current = now;
    }
  };

  const handleKeyDownLarge = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current > 1000 && !isScrolling) {
      if (e.key === 'ArrowDown' && currentSection < allSections.length - 1) {
        scrollToSection(currentSection + 1);
        lastScrollTime.current = now;
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        scrollToSection(currentSection - 1);
        lastScrollTime.current = now;
      }
    }
  };

  // Small Screen Scroll Handlers (unchanged)
  const handleScrollSmall = (delta) => {
    clearTimeout(scrollTimeoutRefSmall.current);
    lastScrollDeltaRefSmall.current += delta;

    scrollTimeoutRefSmall.current = setTimeout(() => {
      const totalDelta = lastScrollDeltaRefSmall.current;
      if (Math.abs(totalDelta) > 50 && !isScrolling) {
        if (totalDelta > 0 && currentSection < allSections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (totalDelta < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
      lastScrollDeltaRefSmall.current = 0;
    }, 100);
  };

  const handleWheelSmall = (e) => {
    e.preventDefault();
    handleScrollSmall(e.deltaY);
  };

  const handleTouchStartSmall = (e) => {
    touchStartRefLarge.current = e.touches[0].clientY;
  };

  const handleTouchMoveSmall = (e) => {
    e.preventDefault();
    const currentY = e.touches[0].clientY;
    const touchDelta = touchStartRefLarge.current - currentY;

    if (Math.abs(touchDelta) > 50) {
      handleScrollSmall(touchDelta);
      touchStartRefLarge.current = currentY;
    }
  };

  const handleKeyDownSmall = (e) => {
    if (!isScrolling) {
      if (e.key === 'ArrowDown') {
        handleScrollSmall(100);
      } else if (e.key === 'ArrowUp') {
        handleScrollSmall(-100);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (width > 768) {
      // Attach Large Screen Handlers
      container.addEventListener('wheel', handleWheelLarge, { passive: false });
      container.addEventListener('touchstart', handleTouchStartLarge, { passive: true });
      container.addEventListener('touchmove', handleTouchMoveLarge, { passive: false });
      window.addEventListener('keydown', handleKeyDownLarge);
    } else {
      // Attach Small Screen Handlers
      container.addEventListener('wheel', handleWheelSmall, { passive: false });
      container.addEventListener('touchstart', handleTouchStartSmall, { passive: true });
      container.addEventListener('touchmove', handleTouchMoveSmall, { passive: false });
      window.addEventListener('keydown', handleKeyDownSmall);
    }

    const path = router.asPath;
    const initialSectionIndex = allSections.findIndex(section => section.path === path);
    if (initialSectionIndex !== -1) {
      scrollToSection(initialSectionIndex);
    }

    // Cleanup function to remove the appropriate handlers
    return () => {
      if (width > 768) {
        container.removeEventListener('wheel', handleWheelLarge);
        container.removeEventListener('touchstart', handleTouchStartLarge);
        container.removeEventListener('touchmove', handleTouchMoveLarge);
        window.removeEventListener('keydown', handleKeyDownLarge);
      } else {
        container.removeEventListener('wheel', handleWheelSmall);
        container.removeEventListener('touchstart', handleTouchStartSmall);
        container.removeEventListener('touchmove', handleTouchMoveSmall);
        window.removeEventListener('keydown', handleKeyDownSmall);
      }
    };
  }, [width, currentSection, isScrolling, router.asPath]);

  return (
    <div className={styles.container}>
      <Navbar 
        currentSection={allSections[currentSection].id}
        toggleContactForm={toggleContactForm}
        useGreenLogo={!useGreenLogo}
        onNavClick={handleNavClick}
      />
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

      {isContactFormOpen && (
        <div className={styles.contactFormOverlay}>
          <RegisterRequestForm onClose={toggleContactForm} />
        </div>
      )}
    </div>
  );
}