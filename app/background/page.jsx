'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
// import styles from "../page.module.css";
import styles from "@/styles/ImageBackground.module.css";
import styles2 from "@/styles/Floor/floorMenu.module.css";
import ElevStyles from "@/styles/elevation.module.css";
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
import ApartmentListing from '../component/Reserve/ApartmentListing';
import AmenityGrid from '../component/Amenities/AmenityGrid';
import AmenityBtn from '../component/Icons/AmenityBtn';
import { motion } from 'framer-motion';


const floorData = {
  "Third Floor": {
    "Penthouse": 10,
    "Three Beds": 0,
    "Two Beds": 0,
    "One Beds": 0,
    "Studio Apartments": 0
  },
  "Second Floor": {
    "Penthouse": 4,
    "Three Beds": 4,
    "Two Beds": 4,
    "One Beds": 6,
    "Studio Apartments": 0
  },
  "First Floor": {
    "Penthouse": 0,
    "Three Beds": 4,
    "Two Beds": 7,
    "One Beds": 5,
    "Studio Apartments": 0
  },
  "Ground Floor": {
    "Penthouse": 0,
    "Three Beds": 4,
    "Two Beds": 7,
    "One Beds": 4,
    "Studio Apartments": 0
  },
  "Valley Floor 1": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 8,
    "Studio Apartments": 0
  },
  "Valley Floor 2": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 10,
    "Studio Apartments": 0
  },
  "Valley Floor 3": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 10,
    "Studio Apartments": 0
  },
  "Valley Floor 4": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 5,
    "Studio Apartments": 0
  },
  "Valley Floor 5": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 5,
    "One Beds": 6,
    "Studio Apartments": 0
  },
  "Valley Floor 6": {
    "Penthouse": 0,
    "Three Beds": 0,
    "Two Beds": 6,
    "One Beds": 5,
    "Studio Apartments": 0
  }
};


export default function BackgroundImage() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('AVAILABLE');
  const [fullScreen, setFullScreen] = useState(false);
  const [menuBox, setMenuBox] = useState(false);
  const [filterbox, setFilterBox] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isContacted, setIsContacted] = useState(false);
  const [backView, setBackView] = useState(false);
  const [reservedClicked, setReservedClicked] = useState(false);

  const router = useRouter();
  const favoriteApartments = useSelector((state) => state.favoriteApartments.favoriteApartments);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const filterContainerRef = useRef(null);
  const filterBoxRef = useRef(null);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  const handleClickOutside = useCallback((event) => {
    if (
      filterContainerRef.current &&
      !filterContainerRef.current.contains(event.target) &&
      filterBoxRef.current &&
      !filterBoxRef.current.contains(event.target)
    ) {
      setIsFilterBoxVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFilter = useCallback((event) => {
    event.stopPropagation();
    setIsFilterBoxVisible((prev) => !prev);
  }, []);

  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);

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
  }, [handleClickOutside]);

  const handleFavorties = () => {
    setReservedClicked((prev) => !prev);
    console.log("Favorites clicked");
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
      const slug = floorName.replace(/\s+/g, '-');
      console.log("Floor Name", slug)
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


  const handleBackgroundMode = () => {
    console.log("Background Mode clicked");
  }


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
  }, [handleClickOutside]);

  const handleAmenities = () => {
    setAmenityClicked((prev) => !prev);
    console.log("Amenities clicked");
  };


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
    console.log("Elevation Opened");
    console.log(isElevationOpen);
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

  

  

  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handlePolygonHover = (event) => {
    const element = event.target;
    const floorName = element.getAttribute('data-image');
    if (floorName) {
      const floorKey = Object.keys(floorData).find(key => {
        const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
        const normalizedFloorName = floorName.toLowerCase().replace(/\s+/g, '');
        return normalizedKey.includes(normalizedFloorName) || normalizedFloorName.includes(normalizedKey);
      });
      
      const floorInfo = floorData[floorKey];
      const totalUnits = floorInfo ? Object.values(floorInfo).reduce((a, b) => a + b, 0) : 0;
  
      setTooltipContent({ 
        floorName, 
        totalUnits,
        details: floorInfo
      });
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
    {id:'2', label: 'Map View', route:'/mapview'},
    {id:'1', label: 'Elevation', route:'/'},

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

        (
          filterbox ? 
          (
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
              <polygon className={styles.st0} data-image="Vallery Floor 6" data-tip="basement6" points="446.78 393.2 591.57 298.53 589.86 396.41 446.78 396.41 446.78 393.2"/>
              <polygon className={styles.st0} data-image="Vallery Floor 6" data-tip="basement6" points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"/>
              <rect className={styles.st0} data-image="Vallery Floor 6" data-tip="basement6" x="854.93" y="361.55" width="110.52" height="45.86"/>
              <rect className={styles.st0} x="965.45" y="361.55" width="100.89" height="45.86"/>
              <polygon className={styles.st0} data-image="Vallery Floor 6" data-tip="basement6" points="1207.59 296.89 1207.59 409.25 1347.92 409.25 1347.92 384.48 1207.59 296.89"/>
            </svg>
          ) 
          :
          (
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

            <polygon className={styles.st0} data-image="Valley Floor 6" data-tip="basement6" points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"/>

            <polyline data-image="Valley Floor 6" data-tip="basement6" className={styles.st0} points="428.82 874.84 428.82 924.18 687.17 922.66 944.59 917.15 1182.1 917.15 1182.1 867.93 824.98 871.37 680.44 873.59 625.87 873.43 428.82 874.84" />
          
            <polygon data-image="Valley Floor 5" data-tip="basement5" className={styles.st0} points="428.82 814.12 428.82 866.55 596.18 865.48 699.52 863.34 750.12 862.73 830.77 860.59 946.99 859.98 1182.15 860.9 1182.1 810.83 853.77 812.29 733.87 813.51 621.94 814.12 428.82 814.12" />
            <polygon data-image="Valley Floor 4" data-tip="basement4" className={styles.st0} points="1362.91 754.5 1362.91 803.11 822.18 804.64 428.82 804.64 428.82 754.5 1362.91 754.5" />
            <path className={styles.st0} data-image="Valley Floor 3" data-tip="basement3" d="M1512.8,698v44.71l-78.35-.69-370.09,4.51H872.44l-171.52-1.22-104.25,1.22-167.39.16V695.19H701.54l119.75.48,33,2.28,253.23.3h97.53Z"/>
            <path className={styles.st0} data-image="Valley Floor 2" data-tip="basement2" d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"/>
            <path className={styles.st0} data-image="Valley Floor 1" data-tip="basement1" d="M429,575.19q.16,25.3.31,50.6l182.37-.31h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l157.61,1.83V589.71l-150.88.92-17.74-5.2-139.1.92L1169,584.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,575.34l-43.72,1.53H624.18l-30-1.53Z"/>
            <path className={styles.st0} data-image="Ground Floor" data-tip="groundFloor"  d="M782.78,522.83V560.9H719.84l.12,5H621.43l-27.82-2.14-40.36,1.52-124,.62V516c54.37.1,110-1.63,164.33-1.53L625.56,517l98-.61Z M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z"/>
            <path data-image="First Floor" data-tip="firstFloor" className={styles.st0} d="M783.06,476.44l-.28,28.44H737.15l-13.6.31h-100l-31.33-3.75-67.42,5.27L429.13,505q-.08-24.45-.16-48.91l163.27.38,34.39,1.6h96.92s49.44,12.32,59.51,12.55C782.9,472.49,783.21,474.6,783.06,476.44Z M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-4.13V472.85L1343.65,474l21.55,7.57,147.75-.15Z"/>

            <path data-image="Second Floor" data-tip="secondFloor"  onMouseEnter={() => setSelectedPath(true)}
                onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} d="M783.15,428.18,783,457l-59.49-13.15H620l-28.66-5.2-82.09,7.8-80.26-2q.16-20,.31-39.9l162-.07,28.59-6.27,103.64,1.6Z"/>
            <path  data-image="Second Floor" data-tip="secondFloor"  onMouseEnter={() => setSelectedPath(true)}
                onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z"/>
            <polygon  data-image="Second Floor" data-tip="secondFloor"  onMouseEnter={() => setSelectedPath(true)}
                onMouseLeave={() => setSelectedPath(false)} className={!selectedPath ? styles.st0 : styles.st1Hovers} points="1143.32 416.82 1210.12 416.82 1348.46 416.82 1431.47 416.82 1512.34 468.64 1512.34 473.38 1430.1 473.99 1364.67 473.99 1347.55 465.59 1294.81 465.13 1207.06 458.4 1143.32 458.4 1143.32 416.82"/>
            
            <polygon data-image="Third Floor" data-tip="thirdFloor" className={styles.st0} points="1420.24 409.94 1206.3 409.94 1182.61 408.11 1170.53 408.11 1170.53 404.75 1143.32 404.29 1143.32 368.67 1189.79 262.58 1365.89 375.39 1390.96 391.9 1420.24 409.94 783.06 365.95 782.94 405.89 752.75 405.89 743.11 393.97 722.94 393.97 714.68 383.65 618.96 382.47 590.86 395.57 429.43 396.95 429.43 381.89 607.37 263.8 621.13 279.09 709.79 221 711.24 221 783.06 365.95 820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"/>
           
          </svg>)

              )
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
                    { tooltipContent.floorName === 'Valley Floor 2'?
                      <span className={styles.tooltipUnits}>Parking Lot</span>
                      :
                      <div className={styles.tooltipUnits}>{tooltipContent.totalUnits} Units</div>

                    }
                  </div>
                </div>
              </div>
            )}
    
          </div>



         

          { !isMobile && <>

          {
            reservedClicked &&
            <div className={styles.reservedContainer} ref={apartmentListingRef}>

              <ApartmentListing  apartments={favoriteApartments}/>
            </div>
          
          }

          <div className={styles.topLogoContainer}>
            <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={120} width={190} />
          </div>

          <div className={styles.filterElevationContainer}>

            <div className={ElevStyles.elevationButtonBox}  ref={elevationRef} >
              <div
                  className={`${ElevStyles.elevationBtnGrid} ${isElevationOpen ? ElevStyles.open : ''}`}
                >
                <div className={ElevStyles.elevationBtnLeft} onClick={() => router.push('/mapview')}>
                  <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
                </div>
                  <div
                    className={ElevStyles.elevationBtnRight}
                    // onMouseEnter={() => setIsElevationOpen(true)}
                    // onMouseLeave={() => setIsElevationOpen(false)}
                    onClick={elevationDropdown}

                  >
                    <div className={ElevStyles.elevationBtnTitle}>
                      { !isElevationOpen?
                      translations.elevation || 'Elevation'
                      : 
                        "Location"
                      }
                    </div>
                    <div className={ElevStyles.elevationBtnDownArrow}>
                      <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
                    </div>
                  </div>
                </div>
            
                <div
                  className={`${ElevStyles.dropDownElevationBox} ${isElevationOpen ? ElevStyles.open : ''}`}
                  // onMouseEnter={() => setIsElevationOpen(true)}
                >
                  {elevationArray.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleElevationItemClick(item.route)}
                      className={`${ElevStyles.dropDownfloorButton} ${item.label === 'Elevation' ? ElevStyles.active : ''}`}
                    >
                      {translations[item.label.toLowerCase()] || item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`${styles.filterContainer}`}
                onClick={handleFilter}
                ref={filterContainerRef}
              >
                <div className={`${styles.filtersBox}`}>
                  <div className={styles.filtersButtonLeft}>
                    <Image
                      src="/images/icons/filterIcon.svg"
                      quality={100}
                      alt="Filter Icon"
                      height={17}
                      width={17}
                    />
                  </div>
                  <div className={styles.filtersButtonTitle}>
                    Filter
                  </div>
                </div>
              </div>
            </div>


            
            <div className={styles.backViewButton} onClick={handleBackView}>
              <div className={styles.backViewButtonLeft}>
                <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={20} width={20} />
              </div>
              <div className={styles.backViewButtonTitle}>
                Rotate View
              </div>
            </div>

            <div className={styles.bottomLogoContainer}>
              <div className={styles.bottomLogoContainerTitle}>
                A Project by
              </div>
              <div style={{left: '-0.7rem', bottom:'-0.5rem', position: 'relative'}}>
                <Image src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" height={300} width={300} />
              </div>
            </div>


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

            <div className={styles.menuContainer}>

              <div ref={amenityButtonRef}>
              <AmenityBtn ref={amenityButtonRef} handleMenu={handleAmenities} inActive={amenityClicked}/>

              </div>

              <div className={styles.menuContainerInside} ref={favContainerRef}>
                <FavButton inActive={reservedClicked} handleMenu={handleFavorties}/>
              </div>
              <div className={styles.menuContainerInside} ref={menuContainerRef} >
                <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
              </div>
            </div>
              <MenuBox
                ref={menuBoxRef}
                isActive={menuBox} handleOverlay={handleOverlay} translations={translations} toggleLanguage={toggleLanguage} overlay={overlay} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}/>

                {
                  amenityClicked &&
                  <div ref={amenityGridRef}>

                    <AmenityGrid />
                  </div>
                }

            {isFilterBoxVisible && (
              <FilterBox ref={filterBoxRef} isVisible={isFilterBoxVisible} />
            )}

        </>}


          </div>


          { isContacted &&
            <div className={styles.ContactedContainer}>
                <ContactBox onClose={handleContactClose}/>
            </div>
            }





                    
      {isMobile && 
        (

          <>
          
          <div className={styles.topLogoContainer}>
            <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={120} width={190} />
          </div>


          <div className={styles.menuContainerInside} ref={menuContainerRef} >
                <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
              </div>


            <div className={styles.backViewButton} onClick={handleBackView}>
              <div className={styles.backViewButtonLeft}>
                <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={20} width={20} />
              </div>
              <div className={styles.backViewButtonTitle}>
                Rotate View
              </div>
            </div>

            <div className={styles.bottomLogoContainer}>
              <div className={styles.bottomLogoContainerTitle}>
                A Project by
              </div>
              <div style={{left: '-0.7rem', bottom:'-0.5rem', position: 'relative'}}>
                <Image src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" height={300} width={300} />
              </div>
            </div>

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



{/* 
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
        </div> */}

          
          </>

        )
      }




    </>
  );
}