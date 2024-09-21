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
import { motion } from 'framer-motion';


const Navbar = ({ children, currentSection, toggleContactForm, useGreenLogo }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Blogs');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const [language, setLanguage] = useState(languageState === "ur");
 
  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );

  const router = useRouter();

  useEffect(() => {
    if (['header', 'video'].includes(currentSection)) {
      console.log(currentSection);
      setActiveMenuItem('Home');
    } else if (['about', 'vision'].includes(currentSection)) {
      router.push('/');

      setActiveMenuItem('About');
    } else if (['developer', 'ceo-vision'].includes(currentSection)) {
      router.push('/');

      setActiveMenuItem('Developer');
    }
  }, [currentSection]);

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
  
    if (menuItem === 'Blogs') {
      router.push('/blog');
    } else if (menuItem === 'News Room') {
      router.push('/news-room');
    }
    else if (menuItem === 'News Room') {
      router.push('/news-room');
    }
    else if (menuItem === 'Home') {
      router.push('/');
    }
    else if (menuItem === 'Developer') {
      router.push('/');
    }
    else
    {
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

  const handleCallClick = useCallback(() => {
    const newUrl = `${window.location.origin}${window.location.pathname}${window.location.pathname.endsWith('/') ? '' : '/'}callus`;
    window.history.pushState({}, '', newUrl);
    window.location.href = 'tel:051-111-520-520';
    setTimeout(() => {
      if (window.location.pathname.endsWith('/callus')) {
        const cleanUrl = window.location.href.replace('/callus', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }, 1000);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const whatsappNumber = '+923300111166';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }, []);

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

  const buttonVariants = {
    hidden: { y: 5, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.4, ease: [0.49, 0.23, 0, 1] }
    }
  };

  const harsukhGreenLogo = "https://cdn.theharsukh.com/images/blog/harsukhLogo.svg";
  const harsukhWhiteLogo = "https://cdn.theharsukh.com/Webpage/floors/HarsukhLogo.webp";

  const greenLogo = true;

  return (
    <>
      <div>
        <div className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        <img 
            style={{cursor:"pointer"}} 
            src={greenLogo ? harsukhGreenLogo : harsukhWhiteLogo} 
            alt="Harsukh Logo" 
            width={greenLogo? 200:180} 
            height={greenLogo? 115:105} 
          />
                   
          <div ref={menuIconRef} className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
            <Menu color={greenLogo ? '#006D77' : '#FCF7EB'} size={24} />
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

                <button className={styles.exploreBtn}>
                  Explore Building
                </button>
                </div>
              </Link>
            </li>
          </ul>
          
          <Link href="/explore" className={styles.desktopExploreBtn}>
              <button className={styles.exploreBtn}>
                Explore Building
              </button>
          </Link>
        </div>

        {/* <div
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
        */}
       


        <div className={styles.main}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;