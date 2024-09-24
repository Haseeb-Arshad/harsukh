'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/home/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import { useSelector } from 'react-redux';

const Navbar = ({ children, currentSection, toggleContactForm, useGreenLogo }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Blogs');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const router = useRouter();

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const translations = languageState === "ur" ? ur : en;

  useEffect(() => {
    const updateActiveMenuItem = () => {
      const path = window.location.pathname;

      if (path.includes('/blog')) {
        setActiveMenuItem('Blogs');
      } else if (path.includes('/news-room')) {
        setActiveMenuItem('News Room');
      } else if (path === '/') {
        setActiveMenuItem('Home');
      } else if (path.includes('/about')) {
        setActiveMenuItem('About');
      } else if (path.includes('/developer')) {
        setActiveMenuItem('Developer');
      }
    };

    updateActiveMenuItem(); // Initial check
    window.addEventListener('popstate', updateActiveMenuItem); // Listen for back/forward navigation

    return () => {
      window.removeEventListener('popstate', updateActiveMenuItem);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setIsMobileMenuOpen(false);

    const sectionId = menuItem.toLowerCase();
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    switch (menuItem) {
      case 'Blogs':
        router.push('/blog');
        break;
      case 'News Room':
        router.push('/news-room');
        break;
      case 'Home':
      case 'Developer':
        router.push('/');
        break;
      default:
        router.push('/');
    }
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const greenLogo = useGreenLogo ? 
    "https://cdn.theharsukh.com/images/blog/harsukhLogo.svg" : 
    "https://cdn.theharsukh.com/Webpage/floors/HarsukhLogo.webp";

  return (
    <div>
      <div className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        <img 
          style={{ cursor: "pointer" }} 
          src={greenLogo} 
          alt="Harsukh Logo" 
          width={useGreenLogo ? 200 : 180} 
          height={useGreenLogo ? 115 : 105} 
        />
        
        <div ref={menuIconRef} className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          <Menu color={useGreenLogo ? '#006D77' : '#FCF7EB'} size={24} />
        </div>
        
        <ul ref={mobileMenuRef} className={`${styles.menu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {['Home', 'About', 'Developer', 'Blogs', 'News Room'].map((item) => (
            <li
              key={item}
              className={`${styles.menuitems} ${activeMenuItem === item ? styles.activeMenuItem : ''}`}
              onClick={() => handleMenuItemClick(item)}
            >
              <div className={`${activeMenuItem === item ? styles.menuItemUnderline : ''}`}>
                {item}
              </div>
            </li>
          ))}
          <li className={styles.mobileExploreBtn}>
            <Link href="/explore">
              <div className={styles.explorebtnOutside}>
                <button className={styles.exploreBtn}>Explore Building</button>
              </div>
            </Link>
          </li>
        </ul>
        
        <Link href="/explore" className={styles.desktopExploreBtn}>
          <button className={styles.exploreBtn}>Explore Building</button>
        </Link>
      </div>

      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
