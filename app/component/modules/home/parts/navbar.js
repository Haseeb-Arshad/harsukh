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


const Navbar = ({ children, currentSection, toggleContactForm, useGreenLogo, onNavClick }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuIconRef = useRef(null);


  const [originalPath, setOriginalPath] = useState('');

  useEffect(() => {
    setOriginalPath(window.location.pathname);
  }, []);

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
      setActiveMenuItem('Home');
    } else if (['about', 'vision'].includes(currentSection)) {
      setActiveMenuItem('About');
    } else if (['developer', 'ceo-vision'].includes(currentSection)) {
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
  
    if (menuItem === 'Blogs') {
      router.push('/blog');
    } else if (menuItem === 'News Room') {
      router.push('/news-room');
    } else {
      onNavClick(menuItem);
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

  const harsukhGreenLogo = "https://cdn.theharsukh.com/media/harsukh-logo-green.svg";
  const harsukhWhiteLogo = "https://cdn.theharsukh.com/media/harsukh-logo-white.svg";

  return (
    <>
      <div>
        <div className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        
        <div className={styles.logo}>
          <img 
            style={{cursor:"pointer"}} 
            src={useGreenLogo ? harsukhGreenLogo : harsukhWhiteLogo} 
            alt="Harsukh Logo" 
            width={ 330} 
            height={ 115} 
          />

        </div>
       
                   
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
          className={`submit-class ${styles.buttonss} ${styles.whatsappButton} ${isWAHovered ? styles.expanded : ""}`}
          onMouseEnter={() => setIsWAHovered(true)}
          onMouseLeave={() => setIsWAHovered(false)}
          onClick={handleWhatsAppClick}
          data-gtm-click="submit-button"
          id="submit-button"
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
          // data-title="Get in Touch"
        >
          <span>Get in Touch</span>
        </div>
        
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;