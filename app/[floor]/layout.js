'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './Loading';
import styles from "@/styles/floorLayout.module.css";
import Image from 'next/image';
import FloorMenu from '../component/floorMenu';
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '../../state/language/languageState';

import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';
import MenuBox from '@/app/component/Bars/menuBox';

// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';

const Layout = ({children}) => 
{   

  const dispatch = useDispatch();

  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  // const [language, setLanguage] = useState(false);
  // const [translations, setTranslations] = useState(en);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const [language, setLanguage] = useState(languageState === 'ur');
  const [translations, setTranslations] = useState(languageState === 'ur' ? ur : en);

  const handleMenu = () => {
    setMenuBox(!menuBox);
  }
  
  const handleOverlay = () => {
    setOverlay(!overlay);
  }

  const handleCall = () => {
    setIsContacted(!isContacted);
    console.log("CALLED");
  }
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      setFullScreen(!fullScreen);
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(!fullScreen);
      }
    }
  }

  const handleBackgroundMode = () => {
    console.log("Background Mode clicked");
  }

  const handleFavorties = () => {
    console.log("Favorties clicked");
  }

  const handleAmenities = () => {
    console.log("Amenities clicked");
  }

  const toggleLanguage = () => {
    setLanguage(!language);
  }

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
  }, [language, dispatch]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (     
    <div style={{ position: 'relative', background: 'rgba(0, 29, 32, 1)' , height: '100vh', width: '100%'}}>

        <div className={`${styles.transitionContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {children}
        </div>

      <FloorMenu />


      <div className={styles.menuContainer}>
        <div className={styles.amenitiesButton} onClick={handleAmenities}>
          <div className={styles.amenitiesButtonLeft}>
            <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={20} width={20} />
          </div>
          <div className={styles.amenitiesButtonTitle}>
            Amenities
          </div>
        </div>
        <div className={styles.menuContainerInside}>
            <BackgroundMode handleMenu={handleBackgroundMode}/>
        </div>
        <div className={styles.menuContainerInside}>
          <FavButton handleMenu={handleFavorties}/>
        </div>
        <div className={styles.menuContainerInside} >
          <MenubarButton handleMenu={handleMenu}/>
        </div>
      </div>

      <MenuBox isActive={menuBox} handleOverlay={handleOverlay} translations={translations} toggleLanguage={toggleLanguage} overlay={overlay} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}/>
      <div className={styles.callContainer} onClick={handleCall}>
        <div className={styles.mapsViewBox}>
          <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
        </div>
      </div>

    </div>   
  )
}

export default Layout;