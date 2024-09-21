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

  // Contact Form State
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Refs for Large Screen Scroll Handling
  const lastWheelEventTime = useRef(0);
  const wheelEventCount = useRef(0);
  const wheelAccumulator = useRef(0);
  const touchStartRefLarge = useRef(null);

  // Refs for Small Screen Scroll Handling
  const scrollTimeoutRefSmall = useRef(null);
  const lastScrollDeltaRefSmall = useRef(0);

  // Determine Developer Sections Based on Screen Width
  const developerSections =
    width <= 768
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

    setTimeout(() => {
      setIsScrolling(false);
      containerRef.current.style.transition = '';
    }, 800); // Increased from 500ms to 800ms to match the transition duration
  };

  const toggleContactForm = () => {
    setIsContactFormOpen(!isContactFormOpen);
  };

  // Updated handleWheelLarge function
  const handleWheelLarge = (e) => {
    e.preventDefault();
    const now = Date.now();
    const deltaY = e.deltaY;

    // Reset counters if it's been a while since the last wheel event
    if (now - lastWheelEventTime.current > 300) {
      wheelEventCount.current = 0;
      wheelAccumulator.current = 0;
    }

    wheelEventCount.current++;
    wheelAccumulator.current += deltaY;

    // Only trigger a scroll after we've accumulated enough delta
    // and we've received at least 2 wheel events
    if (Math.abs(wheelAccumulator.current) > 100 && wheelEventCount.current >= 2) {
      if (wheelAccumulator.current > 0 && currentSection < allSections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (wheelAccumulator.current < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
      wheelAccumulator.current = 0;
      wheelEventCount.current = 0;
    }

    lastWheelEventTime.current = now;
  };

  const handleTouchStartLarge = (e) => {
    touchStartRefLarge.current = e.touches[0].clientY;
  };

  const handleTouchMoveLarge = (e) => {
    e.preventDefault();
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartRefLarge.current;

    if (Math.abs(deltaY) > 50) {
      const direction = deltaY > 0 ? 'up' : 'down';
      if (direction === 'up' && currentSection > 0) {
        scrollToSection(currentSection - 1);
      } else if (direction === 'down' && currentSection < allSections.length - 1) {
        scrollToSection(currentSection + 1);
      }
      touchStartRefLarge.current = currentY;
    }
  };

  const handleKeyDownLarge = (e) => {
    if (e.key === 'ArrowDown' && currentSection < allSections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  };

  // Small Screen Scroll Handlers
  const handleScrollSmall = (delta) => {
    clearTimeout(scrollTimeoutRefSmall.current);

    lastScrollDeltaRefSmall.current += delta;

    scrollTimeoutRefSmall.current = setTimeout(() => {
      const totalDelta = lastScrollDeltaRefSmall.current;
      if (Math.abs(totalDelta) > 50) {
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
    if (e.key === 'ArrowDown') {
      handleScrollSmall(100);
    } else if (e.key === 'ArrowUp') {
      handleScrollSmall(-100);
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
  }, [width, currentSection, isScrolling]);

  return (
    <div className={styles.container}>
      <Navbar 
        currentSection={allSections[currentSection].id}
        toggleContactForm={toggleContactForm}
        useGreenLogo={!useGreenLogo}
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