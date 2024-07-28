'use client';
import React, { Suspense,useRef, useCallback, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './Loading';
import styles from "@/styles/Floor/floorLayout.module.css";
import Image from 'next/image';
import FloorMenu from '../component/floorMenu';
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '../../state/language/languageState';

import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';
import MenuBox from '@/app/component/Bars/menuBox';
import { useRouter } from 'next/navigation';

// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import Apartment from '../component/apartment';
import ApartmentListing from '../component/Reserve/ApartmentListing';
import AmenityBtn from '../component/Icons/AmenityBtn';
import AmenityGrid from '../component/Amenities/AmenityGrid';

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
  const [reservedClicked, setReservedClicked] = useState(false);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const [language, setLanguage] = useState(languageState === 'ur');
  const [translations, setTranslations] = useState(languageState === 'ur' ? ur : en);
  const favoriteApartments = useSelector((state) => state.favoriteApartments.favoriteApartments);
  const menuContainerRef = useRef(null);
  const menuBoxRef = useRef(null);

  const handleMenuClickOutside = useCallback((event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target) &&
      menuBoxRef.current &&
      !menuBoxRef.current.contains(event.target)
    ) {
      setMenuBox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleMenuClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleMenuClickOutside);
    };
  }, [handleMenuClickOutside]);

  const handleMenu = () => {
    setMenuBox((prev) => !prev);
    console.log("menu clicked");
  };
  
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

 
  const favContainerRef = useRef(null);
  const apartmentListingRef = useRef(null);

  const handleFavClickOutside = useCallback((event) => {
    if (
      favContainerRef.current &&
      !favContainerRef.current.contains(event.target) &&
      apartmentListingRef.current &&
      !apartmentListingRef.current.contains(event.target)
    ) {
      setReservedClicked(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleFavClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleFavClickOutside);
    };
  }, [handleFavClickOutside]);

  const handleFavorties = () => {
    setReservedClicked((prev) => !prev);
    console.log("Favorites clicked");
  };


  const toggleLanguage = () => {
    setLanguage(!language);
  }

  useEffect(() => {

    console.log('Favorite Apartments:', favoriteApartments);
  }, [reservedClicked]);

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
  }, [language, dispatch]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const amenityButtonRef = useRef(null);
  const amenityGridRef = useRef(null);
  const [amenityClicked, setAmenityClicked] = useState(false);

  const handleAmenitiesClickOutside = useCallback((event) => {
    if (
      amenityButtonRef.current &&
      !amenityButtonRef.current.contains(event.target) &&
      amenityGridRef.current &&
      !amenityGridRef.current.contains(event.target)
    ) {
      setAmenityClicked(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleAmenitiesClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleAmenitiesClickOutside);
    };
  }, [handleAmenitiesClickOutside]);

  const handleAmenities = () => {
    setAmenityClicked((prev) => !prev);
    console.log("Amenities clicked");
  };


  const updateAmenityClicked = (value) => {
    setAmenityClicked(value);
  };
  return (     

    <>
    

    <div style={{ position: 'relative', background: 'rgba(0, 29, 32, 1)' , height: '100vh', width: '100%'}}>

    {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}

        
        <div className={`${styles.transitionContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {React.cloneElement(children, { amenityClicked, updateAmenityClicked })}
        </div>

        {/* </Suspense> */}
        <div className={styles.bottomLogoContainer}>
          <div className={styles.bottomLogoContainerTitle}>
            A Project by
          </div>
          <div style={{left: '-0.7rem', bottom:'-0.5rem', position: 'relative', zIndex: 10000}}>
            <Image src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" height={300} width={300} />
          </div>
        </div>

        {/* <FloorMenu /> */}

      {
        reservedClicked &&
        <div className={styles.reservedContainer}>

          <ApartmentListing  apartments={favoriteApartments}/>
        </div>
      
      }
        
      <div className={styles.menuContainer}>
        {/* <div className={styles.amenitiesButton} onClick={handleAmenities}>
          <div className={styles.amenitiesButtonLeft}>
            <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={20} width={20} />
          </div>
          <div className={styles.amenitiesButtonTitle}>
            Amenities
          </div>
        </div> */}

        <div ref={amenityButtonRef}>
          <AmenityBtn ref={amenityButtonRef} handleMenu={handleAmenities} inActive={amenityClicked}/>
        </div>

        {/* <div className={styles.menuContainerInside}>
            <BackgroundMode handleMenu={handleBackgroundMode}/>
        </div> */}
        <div className={styles.menuContainerInside} ref={favContainerRef}>
          <FavButton inActive={reservedClicked} handleMenu={handleFavorties} count={favoriteApartments.length}/>
        </div>
        
        <div className={styles.menuContainerInside} ref={menuContainerRef} >
          <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
        </div>
      </div>

      <MenuBox isActive={menuBox} handleOverlay={handleOverlay} translations={translations} toggleLanguage={toggleLanguage} overlay={overlay} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}/>
      <div className={styles.callContainer} onClick={handleCall}>
        <div className={styles.mapsViewBox}>
          <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
        </div>
      </div>

    </div>   

    {
        amenityClicked &&
        <div ref={amenityGridRef}>

          <AmenityGrid />
        </div>
      }

    </>

  )
}

export default Layout;