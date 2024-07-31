'use client'
import React, { forwardRef, useEffect, useState } from 'react';
import styles from "@/styles/menubox.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MenuBox = forwardRef(({ handleOverlay, handleFilter, isActive, translations, toggleLanguage, overlay, fullScreen, toggleFullScreen }, ref) => {
 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const router = useRouter();
 
  return (
    <>
      {isActive && (
        !isMobile? (
          <>
        <div className={`${styles.menuOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
          <div className={styles.menuBox} onClick={toggleLanguage}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleOverlay}>
            <div className={styles.menuBoxIcon}>
              {overlay ? (
                <Image src="/images/icons/unhide.svg" quality={100} alt="Unhide" height={30} width={30} />
              ) : (
                <Image src="/images/icons/hide.svg" quality={100} alt="Hide" height={30} width={30} />
              )}
            </div>
            <div className={styles.menuBoxTitle}>
              {overlay ? translations.hideOverlays : translations.showOverlays}
            </div>
          </div>
          <div className={styles.menuBox} onClick={toggleFullScreen}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
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
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/youtube.svg" quality={100} alt="YouTube" height={19} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/LinkedInIcon.svg" quality={100} alt="LinkedIn" height={17} width={17} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/facebookIcon.svg" quality={100} alt="Facebook" height={17} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/InstaIcon.svg" quality={100} alt="Instagram" height={21} width={21} />
            </div>
          </div>
        </div>
        </> ):

            (
              <>
        <div className={`${styles.menuOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
          
          <div className={styles.menuBox} onClick={toggleLanguage}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/elevation.svg" quality={100} alt="Elevation" height={20} width={20} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.elevation}
            </div>
          </div>
          <div className={styles.menuBox} onClick={toggleLanguage}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Amenity" height={21} width={21} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.amenities}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleFilter}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/filterIcon.svg" quality={100} alt="Filter" height={20} width={20} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.filter}
            </div>
          </div>
          
          <div className={styles.menuBox} onClick={toggleLanguage}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleOverlay}>
            <div className={styles.menuBoxIcon}>
              {overlay ? (
                <Image src="/images/icons/unhide.svg" quality={100} alt="Unhide" height={30} width={30} />
              ) : (
                <Image src="/images/icons/hide.svg" quality={100} alt="Hide" height={30} width={30} />
              )}
            </div>
            <div className={styles.menuBoxTitle}>
              {overlay ? translations.hideOverlays : translations.showOverlays}
            </div>
          </div>
          <div className={styles.menuBox} onClick={toggleFullScreen}>
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
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/youtube.svg" quality={100} alt="YouTube" height={19} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/LinkedInIcon.svg" quality={100} alt="LinkedIn" height={17} width={17} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/facebookIcon.svg" quality={100} alt="Facebook" height={17} width={19} />
            </div>
            <div className={styles.menuBoxContactIconbox}>
              <Image src="/images/icons/InstaIcon.svg" quality={100} alt="Instagram" height={21} width={21} />
            </div>
          </div>
        </div>


              </>

            )

      )}
    </>
  );
});

MenuBox.displayName = 'MenuBox';

export default MenuBox;