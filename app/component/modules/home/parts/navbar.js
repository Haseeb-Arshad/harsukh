import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/home/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import { useSelector } from 'react-redux';

const Navbar = ({ children, currentSection }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Home');
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

  return (
    <>
      <div>
        <div className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
          <img style={{cursor:"pointer"}} src="https://cdn.theharsukh.com/Webpage/floors/HarsukhLogo.webp" alt="menu" width={180} height={105} />
          <div ref={menuIconRef} className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
            <Menu size={24} />
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
        
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;