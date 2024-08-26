'use client';
import React, { Suspense, useCallback, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/app/[floor]/Loading';
import styles2 from "@/styles/Floor/floorMenu.module.css";
import styles from "@/styles/maps/mapsLayout.module.css";
import ElevStyles from "@/styles/elevation.module.css";
import Image from 'next/image';
import FloorMenu from '../component/floorMenu';
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '../../state/language/languageState';
import { useRouter } from 'next/navigation';    
import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';
import MenuBox from '@/app/component/Bars/menuBox';
import { toggleFullScreen } from '@/state/fullScreen/fullScreen';

import { toggleVisibility } from '@/state/mapView/mapViewState'; 

// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import ContactBox from '../component/Bars/contactBox';
import MapMenuBox from '../component/Bars/mapMenuBox';
import { motion, AnimatePresence } from 'framer-motion';
import ElevationBox from '../component/Bars/elevationBox';
import ContactUsPopup from '../component/contactus/page';

const Layout = ({children}) => 
{   

  const router = useRouter();
  const dispatch = useDispatch();

  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  // const [language, setLanguage] = useState(false);
  // const [translations, setTranslations] = useState(en);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const svgVisibility = useSelector((state) => state.svgVisibility);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isContacted, setIsContacted] = useState(false);
  const [isElevationClicked, setElevationClicked] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isContactusClicked, setContactUs]= useState(false);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const [language, setLanguage] = useState(languageState === 'ur');
  const [translations, setTranslations] = useState(languageState === 'ur' ? ur : en);

  function handleElevationClicked ()  {
    setElevationClicked(!isElevationClicked);
  };


  const handleMenu = () => {
    setMenuBox((prev) => !prev); // Toggle the menuBox state
  };
  
  const handleOverlay = () => {
    setOverlay(!overlay);
  }

  const handleCall = () => {
    setIsContacted(!isContacted);
  }
  
  const isFullScreen = useSelector((state) => state.fullscreen.isFullScreen);
 
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        dispatch(toggleFullScreen());
      }).catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        dispatch(toggleFullScreen());
      }).catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && isFullScreen) {
        exitFullscreen();
        dispatch(toggleFullScreen());

      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullScreen]); // Dependency array includes isFullScreen


  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullScreen) {
        dispatch(toggleFullScreen());
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [dispatch, isFullScreen]);

  const handleContact = () => {
    setContactUs(!isContactusClicked)
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

  const elevationDropdown = () => {
    setIsElevationOpen(!isElevationOpen);
  };

  const handleElevationItemClick = (route) => {
    router.push(route);
    setIsElevationOpen(false);
  };

  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [elevationArray, setElevationArray] = 
  useState([
    {id:'2', label: translations['mapview'] , route:'/mapview'},
    {id:'1', label: translations['elevation'] , route:'/'},

  ]);


  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
    
    // Update elevationArray when translations change
    setElevationArray([
      {id:'2', label: language ? ur['mapview'] : en['mapview'], route:'/mapview'},
      {id:'1', label: language ? ur['elevation'] : en['elevation'], route:'/'},
    ]);
  }, [language, dispatch]);



  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


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
    document.addEventListener("mousedown", handleMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside); // Clean up
    };
  }, [handleMenuClickOutside]);


  const elevationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (elevationRef.current && !elevationRef.current.contains(event.target)) {
        setIsElevationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const toggleSVGVisibility = (element) => {
    dispatch(toggleVisibility({ element }));
  };

  const handleContactClose = () => {
    setIsContacted(false);
  };


  const handleGetDirections = () => {
    // Coordinates for HARSUKH
    const destination = '34.0162791,73.3928231';
    
    // Create the URL for Google Maps directions with the destination
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
  };


  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const [delayPassed, setDelayPassed] = useState(false); // New state for delay

  useEffect(() => {
    console.log(elevationArray)
  }, [translations]);


  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingOverlay}>
        <Loading />
      </div>
    );
  }

  return (     
    <div style={{ position: 'relative', background: 'rgba(0, 29, 32, 1)' , height: '100vh', width: '100%'}}>

      <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }>
        {children}
      </Suspense>



      <div className={styles.Harsukhlogo} style={{cursor:'pointer'}} onClick={()=>router.push("/") }>
      { isMobile?<Image style={{cursor:'pointer'}} src="/Webpage/floors/HarsukhLogo.webp" quality={100} alt="Harsukh Logo" height={85} width={150} />
      :<Image src="/Webpage/floors/HarsukhLogo.webp" quality={100} alt="Harsukh Logo" height={105} width={180} />
      }
      </div>
      
      {/* <div className={styles.AlyamarLogo}>
        <Image src="/Webpage/floors/MainLogo.png" quality={100} alt="ArtBoard Logo" height={300} width={300} />
      </div> */}

      <div className={styles.bottomLogoContainer}>
        <div className={styles.bottomLogoContainerTitle}>
          {/* A Project by */}
          {translations['projectby'] }
        </div>
        <div style={{left: '2.5rem', bottom:'8rem', position: 'relative', zIndex: 1}}onClick={() => window.open("https://almaymaar.com/", '_blank')}>
        <Image style={{cursor:'pointer'}} src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" 
        height={isMobile? 22:28} 
        width={isMobile? 140: 210} />
        </div>
      </div>


      { !isMobile? <div className={styles.menuContainer}>
        <div className={`${styles.longvideoTab}`} >
        
            <div className={`${styles.videosubTab}  ${svgVisibility.landmarks ? styles.active : ''} `}  onClick={() =>{ console.log("LandMarks"); toggleSVGVisibility('landmarks')}}>
                
                
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/landmarkIcon.svg" quality={100} alt="Menu" height={16} width={16} />
                </div>
                <div className={styles.videosubTabTitle} >
                    {/* Landmarks */}
                    {translations['landmarks'] }
                </div>
            </div>
            <div className={`${styles.videosubTab}  ${svgVisibility.roads? styles.active : ''} `}  onClick={() =>{ console.log("LandMarks"); toggleSVGVisibility('roads')}}>
                
                
                <div className={styles.videosubTabIcon}  >
                    <Image src="/images/icons/roadIcon.svg" color='#006d77' quality={100} alt="Menu" height={16} width={16} />
                </div>
                <div className={styles.videosubTabTitle}>
                     {/* Roads */}
                     {translations['roads'] }
                </div>
            </div>
  
            <div className={`${styles.videosubTab}  ${svgVisibility.radius? styles.active : ''} `} onClick={() =>{ console.log("LandMarks"); toggleSVGVisibility('radius')}}>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/radiusIcon.svg" quality={100} alt="Menu" height={20} width={20} />
                </div>
                <div className={styles.videosubTabTitle}>
                    {/* Radius */}
                    {translations['radius'] }
                </div>
                
            </div>

        </div>

     
        <div className={styles.menuContainerInside}                 
          ref={menuContainerRef}
        >
          <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
        </div>
      </div>
      : 

       <div className={styles.menuContainer}>
        
        <div className={styles.menuContainerInside} 
          ref={menuContainerRef}
        >
          <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
        </div>

        <div className={`${styles.longvideoTab}`}>
        
            <div className={`${styles.videosubTab}  ${svgVisibility.landmarks ? styles.active : ''} `}  onClick={() =>{ toggleSVGVisibility('landmarks')}}>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/landmarkIcon.svg" quality={100} alt="Menu" height={16} width={16} />
                </div>
                <div className={styles.videosubTabTitle} >
                {translations['landmarks'] }
                </div>
                
            </div>
            <div className={`${styles.videosubTab}  ${svgVisibility.roads? styles.active : ''} `}  onClick={() =>{  toggleSVGVisibility('roads')}}>
                <div className={styles.videosubTabIcon}  >
                    <Image src="/images/icons/roadIcon.svg" color='#006d77' quality={100} alt="Menu" height={16} width={16} />
                </div>
                <div className={styles.videosubTabTitle}>
                {translations['roads'] }
                </div>
                
            </div>

            <div className={`${styles.videosubTab}  ${svgVisibility.radius? styles.active : ''} `} onClick={() =>{ toggleSVGVisibility('radius')}}>
              <div className={styles.videosubTabIcon}>
                  <Image src="/images/icons/radiusIcon.svg" quality={100} alt="Menu" height={20} width={20} />
              </div>
              <div className={styles.videosubTabTitle}>
                {translations['radius'] }
              </div>
            </div>
          </div>
        </div>
      
      }

      <MapMenuBox 
        ref={menuBoxRef} 
        handleContact={handleContact}
        setMenuBox ={setMenuBox}
        handleElevation = {handleElevationClicked}
        isActive={menuBox} 
        handleOverlay={handleOverlay} 
        translations={translations} 
        toggleLanguage={toggleLanguage} 
        overlay={overlay} 
        fullScreen={isFullScreen} 
        toggleFullScreen={handleToggleFullScreen}
      />
      
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
          <span className={styles.buttonText}>{translations['direction'] }</span>
        </div>
        <div
          className={`${styles.buttonss} ${styles.callButton} ${isCallHovered ? styles.expanded : ''}`}
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          onClick={handleCall}
        > 
          <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
          <span className={styles.buttonText}>{translations['reqRegister'] }</span>
        </div>
      </div>

      {!isMobile && <div className={styles.elevationContainer}>
        <div className={ElevStyles.elevationButtonBox} ref={elevationRef}                
         onClick={elevationDropdown}
        >
          <div
              className={`${ElevStyles.elevationBtnGrid} ${isElevationOpen ? ElevStyles.open : ''}`}
            >
              <div className={ElevStyles.elevationMapBtnLeft}>
                {/* <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} /> */}
              </div>
              <div
                className={ElevStyles.elevationBtnRight}
              >
                <div className={ElevStyles.elevationMapBtnTitle}>
                  { !isElevationOpen?
                    translations['mapview'] || 'Map View'
                    : 
                    translations['location'] || "Location"
                  }
                </div>
                <div className={ElevStyles.elevationBtnDownArrow}>
                  <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
                </div>
              </div>
            </div>
            
            <div
              className={`${ElevStyles.dropDownElevationBox} ${isElevationOpen ? ElevStyles.open : ''}`}
            >
              {elevationArray.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleElevationItemClick(item.route)}
                  className={`${ElevStyles.dropDownfloorButton} ${item.label === translations['mapview'] ? ElevStyles.active : ''}`}
                >
                  { item.label}
                </div>
              ))}
            </div>
          </div>
      </div>}

       { isContacted &&
            <div className={styles.ContactedContainer}>
                <ContactBox onClose={handleContactClose}/>
            </div>
            }

      {isContactusClicked && (
          <div className={styles.ContactedContainer}>
              <ContactUsPopup onClose={handleContact} />
          </div>
      )}
    
      { isElevationClicked &&
        (
          <ElevationBox
              isVisible={isElevationClicked}
              onClose={handleElevationClicked}
              elevationArray={elevationArray}
          />      
        )
      }

    </div>   
  )
}

export default Layout;