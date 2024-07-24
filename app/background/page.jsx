'use client';
import React, { useEffect, useRef, useState } from 'react';
// import styles from "../page.module.css";
import styles from "@/styles/ImageBackground.module.css";
import styles2 from "@/styles/floorMenu.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import MenuBox from '../component/Bars/menuBox';
import { useSelector, useDispatch } from 'react-redux';
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import { modifyLanguage } from '@/state/language/languageState';
import TopbarMenu from '../component/buttons/topBarMenu';
import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';
import FilterBox from '../component/Bars/filterBox';
import ContactBox from '../component/Bars/contactBox';


export default function BackgroundImage() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('AVAILABLE');
  const [fullScreen, setFullScreen] = useState(false);
  const [menuBox, setMenuBox] = useState(false);
  const [filterbox, setFilterBox] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isContacted, setIsContacted] = useState(false);
  const [backView, setBackView] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  useEffect(() => {
    if (isMobile) {
      setShowNavbar(true);
    }
  }, [isMobile]);
  useEffect(() => {
    const adjustImageAndSVG = () => {
      const img = imageRef.current;
      const container = containerRef.current;
      const svg = svgRef.current;
      
      if (img && container && svg) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let newWidth, newHeight, left, top;

        if (isMobile) {
          // On mobile, set the height to 100% and adjust width to maintain aspect ratio
          newHeight = containerHeight;
          newWidth = newHeight * aspectRatio;
          left = 0;
          top = 0;
          container.style.overflowX = 'auto';
          
          // Center the scroll position
          container.scrollLeft = (newWidth - containerWidth) / 2;
        } else {
          // On desktop, fit the image within the container while maintaining aspect ratio
          if (containerWidth / containerHeight > aspectRatio) {
            newWidth = containerWidth;
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = containerHeight;
            newWidth = newHeight * aspectRatio;
          }
          left = (containerWidth - newWidth) / 2;
          top = (containerHeight - newHeight) / 2;
          container.style.overflowX = 'hidden';
        }

        // Set image dimensions and position
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        // Adjust SVG to match image dimensions and position
        svg.style.width = `${newWidth}px`;
        svg.style.height = `${newHeight}px`;
        svg.style.left = `${left}px`;
        svg.style.top = `${top}px`;

        // Update SVG viewBox to match new dimensions
        svg.setAttribute('viewBox', `0 0 ${img.naturalWidth} ${img.naturalHeight}`);
      }
    };


    
    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        adjustImageAndSVG();
        
      } else {
        img.onload = adjustImageAndSVG;
      }
    }

    window.addEventListener('resize', adjustImageAndSVG);

    return () => {
      window.removeEventListener('resize', adjustImageAndSVG);
    };
  }, [isMobile, overlay]);  

  const handleSVGElementClick = (event) => {
    const element = event.target;
    const floorName = element.getAttribute('data-tip');
    if (floorName) {
      const slug = floorName.toLowerCase().replace(/\s+/g, '-');
      router.push(`/${slug}`);
    }
  };

  const handleContactClose = () => {
    setIsContacted(false);
  };


  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });
  
  const ismediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });
  const ismediumbigScreen = useMediaQuery({ query: '(max-width: 900px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
  const verysmallScreen = useMediaQuery({ query: '(max-width: 500px)' });


  const handleCall = () => {
    setIsContacted(!isContacted);
    console.log("CALLED");
  }


  useEffect(() => {
    console.log("SCREENL:", ismediumScreen)
  }
,[ismediumScreen, ismediumbigScreen, isSmallScreen, verysmallScreen])

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const elements = svg.querySelectorAll('polygon, polyline, path');
      elements.forEach(element => {
        element.addEventListener('click', handleSVGElementClick);
      });

      return () => {
        elements.forEach(element => {
          element.removeEventListener('click', handleSVGElementClick);
        });
      };
    }
  }, [overlay]);


  const handleMenu = () => {
    setMenuBox(!menuBox);
    console.log("menu clicked");
  }

  const handleFilter = () => {
    setFilterBox(!filterbox);
    setIsFilterBarVisible(!isFilterBarVisible);
    console.log("Filter clicked");
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

  const handleBackView = () => {
    setBackView(!backView);
    setOverlay(!overlay);

    console.log("BackView clicked : ", backView);
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

  const handleOverlay = () => {
    setOverlay(!overlay);

  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  
 

  const elevationDropdown = () => {
    setIsElevationOpen(!isElevationOpen);
  };

  const handleElevationItemClick = (route) => {
    router.push(route);
    setIsElevationOpen(false);
  };


  const [selectedPath, setSelectedPath] = useState(false);

  // const handlePathClick = (event) => {
  //   const clickedPath = event.target;
  //   setSelectedPath(clickedPath);
  // };


  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // ... (keep all other existing state variables and useEffect hooks)

  
  const handlePolygonHover = (event) => {
    const element = event.target;
    const floorName = element.getAttribute('data-image');
    const units = element.getAttribute('data-units') || '0';
    console.log("Floor Name", floorName)
    if (floorName) {
      setTooltipContent({ floorName, units });
      setTooltipPosition({
        x: event.clientX + 15,
        y: event.clientY + 15
      });
    }
  };

  const handlePolygonMove = (event) => {
    if (tooltipContent) {
      setTooltipPosition({
        x: event.clientX + 15,
        y: event.clientY + 15
      });
    }
  };

  const handlePolygonLeave = () => {
    setTooltipContent(null);
  };


  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const elements = svg.querySelectorAll('polygon, polyline, path');
      elements.forEach(element => {
        element.addEventListener('mouseenter', handlePolygonHover);
        element.addEventListener('mousemove', handlePolygonMove);
        element.addEventListener('mouseleave', handlePolygonLeave);
      });

      return () => {
        elements.forEach(element => {
          element.removeEventListener('mouseenter', handlePolygonHover);
          element.removeEventListener('mousemove', handlePolygonMove);
          element.removeEventListener('mouseleave', handlePolygonLeave);
        });
      };
    }
  }, [overlay]);

  const dispatch = useDispatch();


  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);
  const [language, setLanguage] = useState(languageState === 'ur');
  const [translations, setTranslations] = useState(languageState === 'ur' ? ur : en);

  const [selectedFloor, setSelectedFloor] = useState('');
  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [elevationArray, setElevationArray] = 
  useState([
    {id:'1', label: 'Elevation', route:'/'},
    {id:'2', label: 'Map View', route:'/mapview'},
  ]);

  useEffect(() => {

  }, [backView]);

const toggleLanguage = () => {
    setLanguage(!language);
  }

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
  }, [language, dispatch]);

  

  // const elevationDropdown = () => {
  //   // console.log('elevationDropdown');
  //     router.push('/');
  //     setIsElevationOpen(!isElevationOpen);
  // };


  return (
    <>
    <div ref={containerRef} className={`${styles.backgroundImageContainer} ${isContacted ? styles.blur : ''}`}>
      <div className={styles.imageWrapper}>
       { !backView? <img
          ref={imageRef}
          src="/Webpage/image-low.webp"
          alt="Background"
          className={styles.backgroundImage}/>
          :

          <img
          ref={imageRef}
          src="/Webpage/BackView.webp"
          alt="Background"
          className={styles.backgroundImage}
        />
        }

        { overlay &&
            <svg
              ref={svgRef}
              version="1.1" 
              id={styles.masker} 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px" 
              y="0px" 
              xmlSpace="preserve"
            >
              <polyline data-image="Vallery Floor 6" data-tip="basement6" className={styles.st0} points="428.82 874.84 428.82 924.18 687.17 922.66 944.59 917.15 1182.1 917.15 1182.1 867.93 824.98 871.37 680.44 873.59 625.87 873.43 428.82 874.84" />
              <polygon data-image="Vallery Floor 5" data-tip="basement5" className={styles.st0} points="428.82 814.12 428.82 866.55 596.18 865.48 699.52 863.34 750.12 862.73 830.77 860.59 946.99 859.98 1182.15 860.9 1182.1 810.83 853.77 812.29 733.87 813.51 621.94 814.12 428.82 814.12" />
              <polygon data-image="Vallery Floor 4" data-tip="basement4" className={styles.st0} points="1362.91 754.5 1362.91 803.11 822.18 804.64 428.82 804.64 428.82 754.5 1362.91 754.5" />
              <path className={styles.st0} data-image="Vallery Floor 3" data-tip="basement3" d="M1512.8,698v44.71l-78.35-.69-370.09,4.51H872.44l-171.52-1.22-104.25,1.22-167.39.16V695.19H701.54l119.75.48,33,2.28,253.23.3h97.53Z"/>
              <path className={styles.st0}  d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"/>
              <path className={styles.st0} data-image="Vallery Floor 1" data-tip="basement1" d="M429,575.19q.16,25.3.31,50.6l182.37-.31h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l157.61,1.83V589.71l-150.88.92-17.74-5.2-139.1.92L1169,584.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,575.34l-43.72,1.53H624.18l-30-1.53Z"/>
              <path className={styles.st0} data-image="Ground Floor" data-tip="groundfloor"  d="M782.78,522.83V560.9H719.84l.12,5H621.43l-27.82-2.14-40.36,1.52-124,.62V516c54.37.1,110-1.63,164.33-1.53L625.56,517l98-.61Z M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z"/>
              <path data-image="First Floor" data-tip="firstfloor" className={styles.st0} d="M783.06,476.44l-.28,28.44H737.15l-13.6.31h-100l-31.33-3.75-67.42,5.27L429.13,505q-.08-24.45-.16-48.91l163.27.38,34.39,1.6h96.92s49.44,12.32,59.51,12.55C782.9,472.49,783.21,474.6,783.06,476.44Z M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-4.13V472.85L1343.65,474l21.55,7.57,147.75-.15Z"/>

              <path data-image="Second Floor" data-tip="secondfloor"  onMouseEnter={() => setSelectedPath(true)}
                  onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} d="M783.15,428.18,783,457l-59.49-13.15H620l-28.66-5.2-82.09,7.8-80.26-2q.16-20,.31-39.9l162-.07,28.59-6.27,103.64,1.6Z"/>
              <path  data-image="Second Floor" data-tip="secondfloor"  onMouseEnter={() => setSelectedPath(true)}
                  onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z"/>
              <polygon  data-image="Second Floor" data-tip="secondfloor"  onMouseEnter={() => setSelectedPath(true)}
                  onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} points="1143.32 416.82 1210.12 416.82 1348.46 416.82 1431.47 416.82 1512.34 468.64 1512.34 473.38 1430.1 473.99 1364.67 473.99 1347.55 465.59 1294.81 465.13 1207.06 458.4 1143.32 458.4 1143.32 416.82"/>
              

              <polygon data-image="Third Floor" data-tip="thirdfloor" className={styles.st0} points="1420.24 409.94 1206.3 409.94 1182.61 408.11 1170.53 408.11 1170.53 404.75 1143.32 404.29 1143.32 368.67 1189.79 262.58 1365.89 375.39 1390.96 391.9 1420.24 409.94 783.06 365.95 782.94 405.89 752.75 405.89 743.11 393.97 722.94 393.97 714.68 383.65 618.96 382.47 590.86 395.57 429.43 396.95 429.43 381.89 607.37 263.8 621.13 279.09 709.79 221 711.24 221 783.06 365.95 820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"/>
              {/* <polygon className={styles.st0} points="783.06 365.95 782.94 405.89 752.75 405.89 743.11 393.97 722.94 393.97 714.68 383.65 618.96 382.47 590.86 395.57 429.43 396.95 429.43 381.89 607.37 263.8 621.13 279.09 709.79 221 711.24 221 783.06 365.95"/>
              <polygon className={styles.st0} points="820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"/> */}
            </svg>
        }

        {tooltipContent && !backView && (
          <div 
            className={styles.tooltip}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipLetter}>
                <Image src="/images/icons/apartmentLogo.svg" quality={100} alt="tooltip" height={22} width={22} />
              </div>
              <div className={styles.tooltipInfo}>
                <div className={styles.tooltipFloor}>{tooltipContent.floorName}</div>
                <div className={styles.tooltipUnits}>{tooltipContent.units} Units</div>
              </div>
            </div>
          </div>
        )}
    
      </div>

      {/* { !filterbox && */}
        <>



        <div className={`${styles.filterContainer} `}>
          <div className={`${styles.filtersBox}`} onClick={handleFilter}>
            <div className={styles.filtersButtonLeft}>
              <Image src="/images/icons/filterIcon.svg" quality={100} alt="Filter Icon" height={17} width={17} />
            </div>
            <div className={styles.filtersButtonTitle}>
              Filter
            </div>
          </div>
        </div>

        <div className={styles.topLogoContainer}>
          <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={105} width={180} />
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

       
      
        </>

        <div className={styles.backViewButton} onClick={handleBackView}>
          <div className={styles.backViewButtonLeft}>
            <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={20} width={20} />
          </div>
          <div className={styles.backViewButtonTitle}>
            Rotate View
          </div>
        </div>


            
      {isMobile && (

        <div className={`${styles.bottomNavbar} ${showNavbar ? 'show' : ''}`}>
          <div className={styles.navbarItem} onClick={handleFilter}>
            <Image src="/images/icons/filterIcon.svg" alt="Filter" width={24} height={24} className={styles.navbarIcon} />
            <span>Filter</span>
          </div>
          <div className={styles.navbarItem}>
            <Image src="/images/icons/floorIcon.svg" alt="Seasons" width={24} height={24} className={styles.navbarIcon} />
            <span>Seasons</span>
          </div>
          <div className={styles.navbarItem} onClick={handleMenu}>
            <Image src="/images/icons/menuIcon.svg" alt="Menu" width={20} height={20} className={styles.navbarIcon} />
            <span>Menu</span>
          </div>
        </div>
      )}



      {/* <TopbarMenu/> */}

            <div className={styles.bottomLogoContainer}>
              <Image src="/Webpage/floors/MainLogo.png" quality={100} alt="bird" height={190} width={190} />
            </div>

            <div className={styles.mapsViewContainer}>
              <div className={styles.mapsViewBox}>
                <Image 
                  src="/images/icons/mapsViewIcon.svg" 
                  quality={100} 
                  alt="Maps View Icon" 
                  height={19} 
                  width={19} 
                />
              </div>
            </div>

            <div className={styles.callContainer} onClick={handleCall}>
              <div className={styles.mapsViewBox}>
                <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
              </div>
            </div>

            <div className={styles.menuContainer}>
              <div className={styles.amenitiesButton} onClick={handleAmenities}>
                <div className={styles.amenitiesButtonLeft}>
                  <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={22} width={22} />
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

            <>
            
            {            
              <FilterBox isVisible={isFilterBarVisible} />
            }
            </>

    </div>
    { isContacted &&
      <div className={styles.ContactedContainer}>
          <ContactBox onClose={handleContactClose}/>
      </div>
      }
    </>
  );
}