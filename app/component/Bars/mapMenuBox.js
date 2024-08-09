'use client'
import React, { forwardRef, useEffect, useRef, useCallback, useState } from 'react';
import styles from "@/styles/menubox.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AmenityGrid from '../Amenities/AmenityGrid';

const MapMenuBox = forwardRef(({ handleOverlay, handleElevation, amenitiesBtn, handleFilter, isActive, translations, setMenuBox, toggleLanguage, overlay, fullScreen, toggleFullScreen }, ref) => {
 
  const [isMobile, setIsMobile] = useState(false);
  const menuBoxRef = useRef(null);
  const menuContainerRef = useRef(null);
  const [isElevationClicked, setElevationClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const handleMenuItemClick = useCallback((action) => {
    if (isMobile) {
      setMenuBox(false);
    }
    if (typeof action === 'function') {
      action();
    } else {
      console.error('Action is not a function:', action);
    }
  }, [isMobile, setMenuBox]);


  

  const handleElevationClick = useCallback(() => {
    setElevationClicked(prevState => !prevState);
    if (typeof handleElevation === 'function') {
      handleElevation();
    }
  }, [handleElevation]);

  
  
  const handleClickOutside = useCallback((event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target) &&
      menuBoxRef.current &&
      !menuBoxRef.current.contains(event.target)
    ) {
      setMenuBox(false);
    }
  }, [setMenuBox]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleAmenitiesCheck = () => {
    setAmenityClicked(false);
  };



 
  
  return (
    <>
      {isActive && (
        !isMobile? (
          <>
        <div className={`${styles.menumapOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
          <div className={styles.menuBox} onClick={ handleMenuItemClick(toggleLanguage)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
     
          <div className={styles.menuBox} onClick={ handleMenuItemClick(toggleFullScreen)}>
            <div className={styles.menuBoxIcon}>
              {!fullScreen?
                <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
                  :
                <Image src="/images/icons/exitFullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
              }
            </div>
            <div className={styles.menuBoxTitle}>
              {fullScreen ? translations.exitFullScreen : translations.fullScreen}
            </div>
          </div>
          <div className={styles.menuBox}  onClick={()=>router.push("/contactus")}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/contactIcon.svg" quality={100} alt="Contact" height={26} width={26} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.contactUs}
            </div>
          </div>

          <div className={styles.menuBoxContactIcons}>
          <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.facebook.com/people/Harsukh/61556868763411/?mibextid=ZbWKwL", "_blank")}>
              <Image src="/images/icons/facebookIcon.svg" quality={100} alt="Facebook" height={17} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.instagram.com/theharsukh/?igsh=M3UzM2s4cXVza255", "_blank")} >
              <Image src="/images/icons/InstaIcon.svg" quality={100} alt="Instagram" height={21} width={21} />
            </div>
            
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.linkedin.com/company/harsukh-residencies/about/", "_blank")} >
              <Image src="/images/icons/LinkedInIcon.svg" quality={100} alt="LinkedIn" height={17} width={17} />
            </div>
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.youtube.com/@theharsukh", "_blank")} >
              <Image src="/images/icons/youtube.svg" quality={100} alt="YouTube" height={19} width={19} />
            </div>
          </div>
        </div>
        </> ):

            (
              <>
        <div className={`${styles.menumapOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
          
        <div className={styles.menuBox} onClick={() => handleMenuItemClick(handleElevation)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/elevation.svg" quality={100} alt="Elevation" height={20} width={20} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.elevation}
            </div>
          </div>
          <div className={styles.menuBox} onClick={()=>handleMenuItemClick(amenitiesBtn) }>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Amenity" height={21} width={21} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.amenities}
            </div>
          </div>
    
          <div className={styles.menuBox} onClick={()=>handleMenuItemClick(toggleLanguage) }>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
 
          <div className={styles.menuBox} onClick={()=>handleMenuItemClick(toggleFullScreen) }>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
            </div>
            <div className={styles.menuBoxTitle}>
              {fullScreen ? translations.exitFullScreen : translations.fullScreen}
            </div>
          </div>
          <div className={styles.menuBox} onClick={()=>router.push("/contactus")}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/contactIcon.svg" quality={100} alt="Contact" height={26} width={26} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.contactUs}
            </div>
          </div>
          
          <div className={styles.menuBoxContactIcons}>
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.facebook.com/people/Harsukh/61556868763411/?mibextid=ZbWKwL", "_blank")}>
              <Image src="/images/icons/facebookIcon.svg" quality={100} alt="Facebook" height={17} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.instagram.com/theharsukh/?igsh=M3UzM2s4cXVza255", "_blank")} >
              <Image src="/images/icons/InstaIcon.svg" quality={100} alt="Instagram" height={21} width={21} />
            </div>
            
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.linkedin.com/company/harsukh-residencies/about/", "_blank")}>
              <Image src="/images/icons/LinkedInIcon.svg" quality={100} alt="LinkedIn" height={17} width={17} />
            </div>
            <div className={styles.menuBoxContactIconbox} onClick={() => window.open("https://www.youtube.com/@theharsukh", "_blank")}>
              <Image src="/images/icons/youtube.svg" quality={100} alt="YouTube" height={19} width={19} />
            </div>
          </div>
        </div>

              </>
            )

      )}

      
      

    {/* {amenityClicked && (
        <div ref={amenityGridRef}>
          <AmenityGrid isMobile={isMobile} onClose={handleAmenitiesCheck} />
        </div>
      )} */}

    </>
  );
});

MapMenuBox.displayName = 'MenuBox';

export default MapMenuBox;