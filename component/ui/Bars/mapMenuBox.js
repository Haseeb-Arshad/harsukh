'use client'
import React, { forwardRef, useEffect, useRef, useCallback, useState } from 'react';
import styles from "@/styles/menubox.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MapMenuBox = forwardRef(({ 
  handleOverlay, 
  handleElevation, 
  amenitiesBtn, 
  isActive, 
  translations, 
  handleContact,
  setMenuBox, 
  toggleLanguage, 
  overlay, 
  fullScreen, 
  toggleFullScreen 
}, ref) => {
 
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const menuContainerRef = useRef(null);

  const menuBoxRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuItemClick = useCallback((action) => {
    if (isMobile) {
      setMenuBox(false); // Close the menu on mobile
    }
    if (typeof action === 'function') {
      action(); // Execute the action if it's a function
    } else {
      console.error('Action is not a function:', action);
    }
  }, [isMobile, setMenuBox]);

  const handleClickOutside = useCallback((event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target) &&
      menuBoxRef.current &&
      !menuBoxRef.current.contains(event.target)
    ) {
      setMenuBox(false);
    }
  }, [setMenuBox, ref]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);

  const menuItems = [
    {
      icon: "/images/icons/elevation.svg",
      title: translations.elevation,
      action: handleElevation,
      showOnMobile: true,
      showOnDesktop: false,
      iconSize: { width: 20, height: 20 },
    },
    {
      icon: "/images/icons/amenitiesIcon.svg",
      title: translations.amenities,
      action: amenitiesBtn,
      showOnMobile: false,
      showOnDesktop: false,
      iconSize: { width: 21, height: 21 },
    },
    {
      icon: "/images/icons/translate.svg",
      title: translations.changeLanguage,
      action: toggleLanguage,
      showOnMobile: true,
      showOnDesktop: true,
      iconSize: { width: 25, height: 25 },
    },
    {
      icon: fullScreen ? "/images/icons/exitFullScreen.svg" : "/images/icons/fullScreen.svg",
      title: fullScreen ? translations.exitFullScreen : translations.fullScreen,
      action: toggleFullScreen,
      showOnMobile: true,
      showOnDesktop: true,
      iconSize: { width: 19, height: 19 },
    },
    {
      icon: "/images/icons/contactIcon.svg",
      title: translations.contactUs,
      action: handleContact,
      showOnMobile: true,
      showOnDesktop: true,
      iconSize: { width: 26, height: 26 },
    }
    
  ];

  const socialLinks = [
    { icon: "/images/icons/facebookIcon.svg", url: "https://www.facebook.com/people/Harsukh/61556868763411/?mibextid=ZbWKwL", iconSize: { width: 19, height: 17 } },
    { icon: "/images/icons/InstaIcon.svg", url: "https://www.instagram.com/theharsukh/?igsh=M3UzM2s4cXVza255", iconSize: { width: 21, height: 21 } },
    { icon: "/images/icons/LinkedInIcon.svg", url: "https://www.linkedin.com/company/harsukh-residencies/about/", iconSize: { width: 17, height: 17 } },
    { icon: "/images/icons/youtube.svg", url: "https://www.youtube.com/@theharsukh", iconSize: { width: 19, height: 19 } },
  ];

  return (
    <>
      {isActive && (
        <div className={`${styles.menumapOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
          {menuItems.map((item, index) => (
            ((isMobile && item.showOnMobile) || (!isMobile && item.showOnDesktop)) && (
              <div key={index} className={styles.menuBox} onClick={() => {
                handleMenuItemClick(item.action);
                if (!isMobile) setMenuBox(false); // Close the menu on desktop after action
              }}>
                <div className={styles.menuBoxIcon}>
                  <Image 
                    src={item.icon} 
                    quality={100} 
                    alt={item.title} 
                    width={item.iconSize.width} 
                    height={item.iconSize.height} 
                  />
                </div>
                <div className={styles.menuBoxTitle}>
                  {item.title}
                </div>
              </div>
            )
          ))}

          <div className={styles.menuBoxContactIcons}>
            {socialLinks.map((link, index) => (
              <div key={index} className={styles.menuBoxContactIconbox} onClick={() => window.open(link.url, "_blank")}>
                <Image 
                
                  src={link.icon} 
                  quality={100} 
                  alt="Social Icon" 
                  width={link.iconSize.width} 
                  height={link.iconSize.height} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

MapMenuBox.displayName = 'MapMenuBox';

export default MapMenuBox;