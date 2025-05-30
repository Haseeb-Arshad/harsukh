// /components/sections/home/HomePage.js
'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/home/main.module.css';
import Header from './header';
import Vision from './vision';
import AboutUs from './aboutus';
import CeoVision from './ceoVision';
import FAQ from './FAQ';
import Footer from './footer';
import VideoContent from './videoContent';
import Navbar from './navbar';
import Developer from './developer';
import Developer1 from './developer1';
import Developer2 from './developer2';
// import RegisterRequestForm from '@/components/ui/RegisterRequestForm';
import PrivacyPolicy from './privacyPolicy';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import useWindowSize from '@/hooks/useWindowSize';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import RegisterRequestForm from '@/component/ui/Bars/contactBox';
// import CustomScrollbarContainer from '@/components/ui/CustomScrollbarContainer';

const HomePage = ({ initialSection }) => {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const { width } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const { isFormOpen, isSuccess, openForm, closeForm, handleSuccess } = useRegisterForm();

  // Contact Form State
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Refs for Scroll Handling
  const lastScrollTime = useRef(0);
  const touchStartRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollDeltaRef = useRef(0);

  // Define Sections
  const sections = [
    { id: 'header', component: Header, path: '/' },
    { id: 'video', component: VideoContent, path: '/' },
    { id: 'about', component: AboutUs, path: '/about' },
    { id: 'vision', component: Vision, path: '/about' },
    { id: 'ceo-vision', component: CeoVision, path: '/developer' },
    { id: 'faq', component: FAQ, path: '/developer' },
    { id: 'footer', component: Footer, path: '/developer' },
  ];

  // Determine Developer Sections Based on Screen Width
  const developerSections =
    width <= 768
      ? [{ id: 'developer', component: Developer1, path: '/developer' }]
      : [{ id: 'developer', component: Developer, path: '/developer' }];

  const allSections = [
    ...sections.slice(0, 4),
    ...developerSections,
    ...sections.slice(4),
  ];

  const [currentSection, setCurrentSection] = useState(
    initialSection
      ? allSections.findIndex((section) => section.id === initialSection)
      : pathname === '/about'
      ? allSections.findIndex((section) => section.id === 'about')
      : pathname === '/developer'
      ? allSections.findIndex((section) => section.id === 'developer')
      : 0
  );

  const [useGreenLogo, setUseGreenLogo] = useState(true);

  const updateLogoColor = (index) => {
    const currentSectionId = allSections[index].id;
    setUseGreenLogo(
      currentSectionId === 'header' ||
        currentSectionId === 'video' ||
        currentSectionId === 'vision'
    );
  };

  const updateURL = (index) => {
    const currentSection = allSections[index];
    if (currentSection.id === 'vision' || currentSection.id === 'about') {
      window.history.replaceState(null, '', '/about');
    } else if (
      currentSection.id === 'developer' ||
      currentSection.id === 'ceo-vision'
    ) {
      window.history.replaceState(null, '', '/developer');
    } else {
      window.history.replaceState(null, '', '/');
    }
  };

  const getScrollPosition = (index) => {
    let position = 0;
    for (let i = 0; i < index; i++) {
      const section = allSections[i];
      if (section.id === 'footer') {
        position += 70; // Footer height in vh
      } else {
        position += 100; // Other sections height in vh
      }
    }
    return position;
  };

  const scrollToSection = (index) => {
    if (index < 0 || index >= allSections.length || isScrolling) return;
    setIsScrolling(true);
    setCurrentSection(index);
    updateLogoColor(index);
    let scrollPercentage = getScrollPosition(index);
    const targetSectionDetails = allSections[index];

    if (targetSectionDetails.id === 'footer') {
      const footerHeightVh = width <= 768 ? 80 : 70; // Height of footer section from CSS
      // Adjust scrollPercentage so the footer is revealed at the bottom of the viewport.
      // The top of the footer should be at (100vh - footerHeightVh) from the viewport top.
      // scrollPercentage initially is the amount to bring the footer's top to viewport's top (0vh).
      // So, we need to scroll (100vh - footerHeightVh) less.
      scrollPercentage = scrollPercentage - (100 - footerHeightVh);
    }

    containerRef.current.style.transition =
      'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
    containerRef.current.style.transform = `translateY(-${scrollPercentage}vh)`;

    updateURL(index);

    setTimeout(() => {
      setIsScrolling(false);
      containerRef.current.style.transition = '';
    }, 800);
  };

  const handleNavClick = (sectionName) => {
    const sectionIndex = allSections.findIndex(
      (section) =>
        section.id.toLowerCase() === sectionName.toLowerCase() ||
        (sectionName === 'Home' && section.id === 'header')
    );
    if (sectionIndex !== -1) {
      scrollToSection(sectionIndex);
    }
  };

  useEffect(() => {
    // Handle initial routing and path changes
    const handleRouteChange = () => {
      if (pathname === '/about') {
        const aboutIndex = allSections.findIndex(
          (section) => section.id === 'about'
        );
        scrollToSection(aboutIndex);
      } else if (pathname === '/developer') {
        const developerIndex = allSections.findIndex(
          (section) => section.id === 'developer'
        );
        scrollToSection(developerIndex);
      }
    };

    handleRouteChange();

    // Handle browser back/forward navigation
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [pathname]);

  useEffect(() => {
    // Handle initial section based on prop
    if (initialSection) {
      const sectionIndex = allSections.findIndex(
        (section) => section.id === initialSection
      );
      if (sectionIndex !== -1) {
        scrollToSection(sectionIndex);
      }
    }
  }, [initialSection]);

  useEffect(() => {
    if (initialSection) {
      const sectionIndex = allSections.findIndex(
        (section) => section.id === initialSection
      );
      scrollToSection(sectionIndex);
    } else if (pathname === '/home') {
      const sectionIndex = allSections.findIndex(
        (section) => section.id === 'about'
      );
      scrollToSection(sectionIndex);
    } else if (pathname === '/about') {
      const sectionIndex = allSections.findIndex(
        (section) => section.id === 'about'
      );
      scrollToSection(sectionIndex);
    } else if (pathname === '/developer') {
      const sectionIndex = allSections.findIndex(
        (section) => section.id === 'developer'
      );
      scrollToSection(sectionIndex);
    }
  }, [initialSection, pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === '/about') {
        const aboutIndex = allSections.findIndex(
          (section) => section.id === 'about'
        );
        scrollToSection(aboutIndex);
      } else if (path === '/developer') {
        const developerIndex = allSections.findIndex(
          (section) => section.id === 'developer'
        );
        scrollToSection(developerIndex);
      } else if (path === '/') {
        scrollToSection(0);
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Scroll Handlers
  const handleWheelLarge = (e) => {
    e.preventDefault();
    const now = Date.now();
    const deltaY = e.deltaY;

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
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMoveLarge = (e) => {
    e.preventDefault();
    const now = Date.now();
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartRef.current - currentY;

    if (
      Math.abs(deltaY) > 100 &&
      now - lastScrollTime.current > 1000 &&
      !isScrolling
    ) {
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

  // Small Screen Scroll Handlers
  const handleScrollSmall = (delta) => {
    clearTimeout(scrollTimeoutRef.current);
    lastScrollDeltaRef.current += delta;

    scrollTimeoutRef.current = setTimeout(() => {
      const totalDelta = lastScrollDeltaRef.current;
      if (Math.abs(totalDelta) > 50 && !isScrolling) {
        if (totalDelta > 0 && currentSection < allSections.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (totalDelta < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
      lastScrollDeltaRef.current = 0;
    }, 100);
  };

  const handleWheelSmall = (e) => {
    e.preventDefault();
    handleScrollSmall(e.deltaY);
  };

  const handleTouchStartSmall = (e) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMoveSmall = (e) => {
    e.preventDefault();
    const currentY = e.touches[0].clientY;
    const touchDelta = touchStartRef.current - currentY;

    if (Math.abs(touchDelta) > 50) {
      handleScrollSmall(touchDelta);
      touchStartRef.current = currentY;
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
    const initialSectionIndex = allSections.findIndex((section) => section.path === path);
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
        toggleContactForm={openForm}
        successContactForm={isSuccess}
        handleSuccess={handleSuccess}
        useGreenLogo={useGreenLogo}
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
        {allSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`${styles.section} ${
              section.id === 'footer' ? styles['section-footer'] : ''
            }`}
          >
            {section.id === 'footer' ? (
              <Footer onPrivacyPolicyClick={() => setIsPrivacyPolicyOpen(true)} />
            ) : (
              <section.component />
            )}
          </section>
        ))}
      </div>

      {(isFormOpen || isSuccess) && (
        <div className={styles.contactFormOverlay}>
          <RegisterRequestForm onSuccess={handleSuccess} onClose={closeForm} />
        </div>
      )}

      {isPrivacyPolicyOpen && (
        <div className={styles.privacyPolicyOverlay}>
          <PrivacyPolicy
            isOpen={isPrivacyPolicyOpen}
            onClose={() => setIsPrivacyPolicyOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
