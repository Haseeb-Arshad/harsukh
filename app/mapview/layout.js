'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/app/[floor]/Loading';
import styles2 from "@/styles/floorMenu.module.css";
import styles from "@/styles/mapsLayout.module.css";
import Image from 'next/image';
import FloorMenu from '../component/floorMenu';
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '../../state/language/languageState';
import { useRouter } from 'next/navigation';    
import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';
import MenuBox from '@/app/component/Bars/menuBox';

// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';

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
    {id:'1', label: 'Elevation', route:'/'},
  ]);




  return (     
    <div style={{ position: 'relative', background: 'rgba(0, 29, 32, 1)' , height: '100vh', width: '100%'}}>
      {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}
      {/* <div style={{ position: 'absolute', blur:'300px', background: 'white' , opacity:'0.4', borderRadius: '50%', height: '30vh', width: '30vw'}}>

      </div> */}
      
        <div className={`${styles.transitionContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {children}
        </div>
      {/* </Suspense>      */}

      {/* <FloorMenu /> */}

      <div className={styles.Harsukhlogo}>
        <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="Harsukh Logo" height={105} width={180} />
      </div>
      
      <div className={styles.AlyamarLogo}>
        <Image src="/Webpage/floors/MainLogo.png" quality={100} alt="ArtBoard Logo" height={300} width={300} />
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.longvideoTab} onClick={handleAmenities}>
        
            <div className={styles.videosubTab}>
                
                <div className={styles.videosubTabTitle}>
                    Landmarks
                </div>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/landmarkIcon.svg" quality={100} alt="Menu" height={16} width={16} />
                </div>
            </div>
            <div className={styles.videosubTab}>
                
                <div className={styles.videosubTabTitle}>
                     Roads
                </div>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/roadIcon.svg" color='#006d77' quality={100} alt="Menu" height={16} width={16} />
                </div>
            </div>
            <div className={styles.videosubTab}>
                
                <div className={styles.videosubTabTitle}>
                    Retail
                </div>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/landmarkIcon.svg" quality={100} alt="Menu" height={16} width={16} />
                </div>
            </div>
            <div className={styles.videosubTab}>
                <div className={styles.videosubTabTitle}>
                    Radius
                </div>
                <div className={styles.videosubTabIcon}>
                    <Image src="/images/icons/radiusIcon.svg" quality={100} alt="Menu" height={20} width={20} />
                </div>
            </div>

        </div>
        <div className={styles.menuContainerInside}>
            <BackgroundMode handleMenu={handleBackgroundMode}/>
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

    

      <div className={styles2.elevationButton}>
        <div
          className={`${styles2.filtersButton} ${isElevationOpen ? styles2.open : ''}`}
          onClick={elevationDropdown}
        >
          <div className={styles2.elevationButtonLeft} onClick={() => router.push('/')}>
            <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
          </div>
          <div
            className={styles2.elevationButtonRight}
            onMouseEnter={() => setIsElevationOpen(true)}
            onMouseLeave={() => setIsElevationOpen(false)}
          >
            <div className={styles2.elevationButtonTitle}>{translations.elevation || 'Elevation'}</div>
            <div className={styles2.elevationButtonDownArrow}>
              <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
            </div>
          </div>
        </div>
        
        <div
          className={`${styles2.floorBar} ${isElevationOpen ? styles2.open : ''}`}
          onMouseEnter={() => setIsElevationOpen(true)}
          onMouseLeave={() => setIsElevationOpen(false)}
        >
          {elevationArray.map((item) => (
            <div
              key={item.id}
              onClick={() => handleElevationItemClick(item.route)}
              className={`${styles2.dropDownfloorButton} ${item.label === 'Elevation' ? styles2.active : ''}`}
            >
              {translations[item.label.toLowerCase()] || item.label}
            </div>
          ))}
        </div>
      </div>


    </div>   
  )
}

export default Layout;