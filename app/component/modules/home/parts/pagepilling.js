import { useEffect } from 'react';
import Swup from 'swup';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';

export default function useSwup() {
  useEffect(() => {
    // Initialize Swup for page transitions
    const swup = new Swup();

    // Initialize LocomotiveScroll for smooth scrolling
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#scroll-container'), // The scrollable container
      smooth: true, // Enable smooth scroll
    });

    // GSAP animations when sections scroll into view
    scroll.on('scroll', (args) => {
      const sections = document.querySelectorAll('[data-scroll-section]');

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // If the section is in the viewport, animate it
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
        } else {
          gsap.to(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.in',
          });
        }
      });
    });

    // Cleanup when component unmounts
    return () => {
      swup.destroy();
      scroll.destroy();
    };
  }, []);
}