'use client'
import React, { forwardRef, useEffect, useState } from 'react';
import styles from "@/styles/menubox.module.css";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const FloorMenuBox = forwardRef(({ 
  handleOverlay, 
  handleContact, 
  handleFloorMenu, 
  handleElevation, 
  handleAmenities, 
  handleFilter, 
  isActive, 
  translations, 
  toggleLanguage, 
  overlay, 
  fullScreen, 
  toggleFullScreen,
  onClose // New prop to handle closing the menu
}, ref) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [isFloorApartmentView, setIsFloorApartmentView] = useState(false);

  const params = useParams()
  const router = useRouter();
 

  useEffect(() => {
    setIsFloorApartmentView(Boolean(params.floor && params.apartment));
  }, [params]);

    // Wrapper function to handle menu item clicks
    const handleMenuItemClick = (handler) => {
      return () => {
        handler();
        if (typeof onClose === 'function') {
          onClose(); // Only call onClose if it's a function
        }
      };
    };

  return (
    <>
      {isActive && (
        !isMobile? (
          <>
        <div style={{zIndex:"100000"}} className={`${styles.menuOptionContainer} ${isActive ? styles.active : ''}`} ref={ref}>
            <div className={styles.menuBox} onClick={handleMenuItemClick(toggleLanguage)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleMenuItemClick(handleOverlay)}>
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
          <div className={styles.menuBox} onClick={handleMenuItemClick(toggleFullScreen)}>
          <div className={styles.menuBoxIcon}>
              {!fullScreen?
                <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
                  :
                <Image src="/images/icons/exitFullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
              }            </div>
            <div className={styles.menuBoxTitle}>
              {fullScreen ? translations.exitFullScreen : translations.fullScreen}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleMenuItemClick(handleContact)}>
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
        <div className={`${styles.menuOptionContainer} ${isFloorApartmentView? styles.apartmentView : ''} ${isActive ? styles.active : ''}`} ref={ref}>
          
          <div className={styles.menuBox} onClick={handleMenuItemClick(handleElevation)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/elevation.svg" quality={100} alt="Elevation" height={20} width={20} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.elevation}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleAmenities} >
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Amenity" height={21} width={21} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.amenities}
            </div>
          </div>
          {/* <div className={styles.menuBox} onClick={handleFloorMenu}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/filterIcon.svg" quality={100} alt="Filter" height={20} width={20} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.floor}
            </div>
          </div> */}



            {!isFloorApartmentView && (
              <div className={styles.menuBox} onClick={handleMenuItemClick(handleFloorMenu)}>
                <div className={styles.menuBoxIcon}>
                  <Image src="/images/icons/filterIcon.svg" quality={100} alt="Filter" height={20} width={20} />
                </div>
                <div className={styles.menuBoxTitle}>
                  {translations.floor}
                </div>
              </div>
            )}
          
          <div className={styles.menuBox} onClick={handleMenuItemClick(toggleLanguage)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={25} width={25} />
            </div>
            <div className={styles.menuBoxTitle}>
              {translations.changeLanguage}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleMenuItemClick(handleOverlay)}>
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
          <div className={styles.menuBox} onClick={handleMenuItemClick(toggleFullScreen)}>
            <div className={styles.menuBoxIcon}>
              <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
            </div>
            <div className={styles.menuBoxTitle}>
              {fullScreen ? translations.exitFullScreen : translations.fullScreen}
            </div>
          </div>
          <div className={styles.menuBox} onClick={handleMenuItemClick(handleContact)}>
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


              </>

            )

      )}
    </>
  );
});

FloorMenuBox.displayName = 'MenuBox';

export default FloorMenuBox;