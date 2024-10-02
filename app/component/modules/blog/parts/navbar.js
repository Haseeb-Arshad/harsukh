'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import { useSelector } from 'react-redux';

const Navbar = ({ children, currentSection, toggleContactForm, useGreenLogo, onNavClick }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Blogs');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const router = useRouter();
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const translations = languageState === "ur" ? ur : en;

  const [originalPath, setOriginalPath] = useState('');

  useEffect(() => {
    setOriginalPath(window.location.pathname);
  }, []);


  const updateURL = (params) => {
    const url = new URL(window.location.href);
    url.search = '';
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null) {
        url.searchParams.set(key, value);
      }
    });
    const newURL = `/${url.search}`;
    window.history.pushState({}, '', newURL);
  };

  const restoreOriginalPath = () => {
    window.history.pushState({}, '', originalPath);
  };

  const handleCallClick = useCallback(() => {
    updateURL({ callus: 'true' });
    window.location.href = 'tel:051-111-520-520';
    setTimeout(() => {
      restoreOriginalPath();
    }, 1000);
  }, [originalPath]);


  const handleWhatsAppClick = useCallback(() => {
    const whatsappNumber = '+923300111166';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }, []);

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
        router.push('/');
        break;
      case 'Developer':
        router.push('/developer');
        break;

      case 'About':
        router.push('/about');
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
        <div className={styles.logo}>
          <img 
            style={{ cursor: "pointer" }} 
            onClick={() => router.push('/')}
            src="https://res.cloudinary.com/dykglphpa/image/upload/v1727174238/harsukh/Logo/ljvd3ds9mwks0lh65zab.svg"
            alt="Harsukh Logo" 
            width={ 330} 
            height={ 115}
          />
        </div>
        
        <div ref={menuIconRef} className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          <Menu color={ '#006D77' } size={24} />
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



      <div
          className={`${styles.buttonss} ${styles.callButton} ${isCallHovered ? styles.expanded : ""}`}
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          onClick={handleCallClick}
        >
          <Image
            src="/images/icons/callIcon.svg"
            quality={100}
            alt="Maps View Icon"
            height={16}
            width={16}
          />
          <div className={styles.buttonText}>{translations["callus"]}</div>
        </div>

        <div
          className={`${styles.buttonss} ${styles.whatsappButton} ${isWAHovered ? styles.expanded : ""}`}
          onMouseEnter={() => setIsWAHovered(true)}
          onMouseLeave={() => setIsWAHovered(false)}
          onClick={handleWhatsAppClick}
        >
          <Image
            src="/images/icons/homePage/whatsapp-icon.svg"
            quality={100}
            alt="Maps View Icon"
            height={19}
            width={19}
          />
          <div className={styles.buttonText}>WhatsApp us</div>
       
        
        </div>
          
        <div
          className={`${styles.ctaBtn}`}
          onClick={toggleContactForm}
        >
          Get in Touch
        </div>


      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
