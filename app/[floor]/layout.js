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
import Router from 'next/navigation';
import ContactBox from '../component/Bars/contactBox';


const Layout = ({children}) => 
{   
  const dispatch = useDispatch();
  const router = useRouter();
  const [isContacted, setIsContacted] = useState(false);

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

  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);

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
  const handleContactClose = () => {
    setIsContacted(false);
  };

  
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

  const handleGetDirections = () => {
    // Coordinates for HARSUKH
    const destination = '34.0162791,73.3928231';
    
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        window.open(url, '_blank');
      }, () => {
        // If user denies location access or any error occurs, just open with destination
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(url, '_blank');
      });
    } else {
      // Fallback for browsers that don't support geolocation
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
      window.open(url, '_blank');
    }
  };


  return (     

    <>
    

    <div style={{ position: 'relative', background: '#013A40' , height: '100vh', width: '100%'}}>

    {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}

        
        <div className={`${styles.transitionContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {React.cloneElement(children, { amenityClicked, updateAmenityClicked })}
        </div>

        {/* </Suspense> */}
       
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
      {/* <div className={styles.callContainer} onClick={handleCall}>
        <div className={styles.mapsViewBox}>
          <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
        </div>
      </div> */}

          <div className={styles.container}>
              <div
                className={`${styles.buttonss} ${styles.mapButton} ${isMapHovered ? styles.expanded : ''}`}
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
                onClick={handleGetDirections}

              >
                <Image 
                  src="/images/icons/mapsViewIcon.svg" 
                  quality={100} 
                  alt="Maps View Icon" 
                  height={17} 
                  width={17} 
                />
                <span className={styles.buttonText}>Get Directions</span>
              </div>

              <div
                className={`${styles.buttonss} ${styles.callButton} ${isCallHovered ? styles.expanded : ''}`}
                onMouseEnter={() => setIsCallHovered(true)}
                onMouseLeave={() => setIsCallHovered(false)}
                onClick={handleCall}
              >
                <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
                <span className={styles.buttonText}>Register Request</span>
              </div>
            </div>

          </div>   

          <div className={styles.bottomLogoContainer}>
            <div className={styles.bottomLogoContainerTitle}>
              A Project by
            </div>
            <div style={{left: '2.5rem', bottom:'8rem', position: 'relative', zIndex: 1}}onClick={() => window.open("https://almaymaar.com/", '_blank')}>
              <Image style={{cursor:'pointer'}} src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" height={28} width={210} />
            </div>
          </div>


          { isContacted &&
          <div className={styles.ContactedContainer}>
              <ContactBox onClose={handleContactClose}/>
          </div>
          }

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