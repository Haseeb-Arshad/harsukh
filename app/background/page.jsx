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

  const [filterselection, setFilterSelection] = useState(false);

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
      setFilterBox(false);

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
    console.log("CLICKED")
    setFilterBox(prevState => !prevState);
    setIsFilterBoxVisible((prev) => !prev);
    setTooltipContent(null); // Reset tooltip content when filter is toggled
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


  const [selectedAmenities, setSelectedAmenities] = useState([]);

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
    if(floorName=="basement2")
      return;
    else
    if (floorName) {
      const slug = floorName.replace(/\s+/g, '-');
      console.log("Floor Name", slug)
      router.push(`/${slug}`);
    }
  };

  const handleContactClose = () => {
    setIsContacted(false);
  };

  useEffect(()=>
    {
      
      console.log(selectedAmenities.length);

      if(selectedAmenities.length==0)
      {
        setFilterSelection(false);
      }
      else 
      setFilterSelection(true);
  
    }, [filterbox, selectedAmenities.length ]
    )


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


  const handlePolygonHoverFiltered = (event) => {
    const element = event.target;
    const floorName = element.getAttribute('data-image');
    const apartmentNum = element.getAttribute('ApartmentNum');
    const bedroomCount = element.getAttribute('bedroomCount');
    const apartmentType = element.getAttribute('apartmentType');
  
    if (floorName) {
      setTooltipContent({ 
        floorName, 
        apartmentNum,
        bedroomCount,
        apartmentType
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
      const elements = svg.querySelectorAll('polygon, polyline, path, rect');
      
      const hoverHandler = filterbox ? handlePolygonHoverFiltered : handlePolygonHover;
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', hoverHandler);
        element.addEventListener('mousemove', handlePolygonMove);
        element.addEventListener('mouseleave', handlePolygonLeave);
      });
  
      return () => {
        elements.forEach(element => {
          element.removeEventListener('mouseenter', hoverHandler);
          element.removeEventListener('mousemove', handlePolygonMove);
          element.removeEventListener('mouseleave', handlePolygonLeave);
        });
      };
    }
  }, [overlay, filterbox]);


  const handleFilterChange = (amenities) => {
    setSelectedAmenities(amenities);
  };


  useEffect(() => {
    if (svgRef.current) {
      const svgElements = svgRef.current.querySelectorAll('polygon, polyline, path, rect');
      
      svgElements.forEach(element => {
        const bedroomCount = element.getAttribute('bedroomCount');
        const apartmentType = element.getAttribute('apartmentType');
        
        const shouldShow = selectedAmenities.length === 0 || selectedAmenities.some(amenity => {
          if (amenity === 'Studio') return bedroomCount === '0';
          if (amenity === '1 Bed Apartments') return bedroomCount === '1';
          if (amenity === '2 Bed Apartments') return bedroomCount === '2';
          if (amenity === '3 Bed Apartments') return bedroomCount === '3';
          if (amenity === 'Pent Houses') return apartmentType === 'Penthouse';
          return false;
        });

        element.style.display = shouldShow ? 'block' : 'none';
      });
    }
  }, [selectedAmenities]);

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

  useEffect(()=>
  {
    console.log("KJ")
  }

  ,[isFilterBarVisible])

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
        
        { overlay && (
          filterbox ? 
          (    
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
          
              <polygon  data-image="Third Floor" data-tip="thirdFloor" ApartmentNum="10" bedroomCount="2" apartmentType="Penthouse" className={styles.st2} points="446.78 393.2 591.57 298.53 589.86 396.41 446.78 396.41 446.78 393.2"/>
              <polygon data-image="Third Floor" data-tip="thirdFloor"  ApartmentNum="9" bedroomCount="2" apartmentType="Penthouse" className={styles.st2} points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"/>
              <rect data-image="Third Floor" data-tip="thirdFloor"  ApartmentNum="8" bedroomCount="3" apartmentType="Penthouse" className={styles.st2} x="854.93" y="361.55" width="110.52" height="45.86"/>
              <rect data-image="Third Floor" data-tip="thirdFloor"  ApartmentNum="7" bedroomCount="3" apartmentType="Penthouse" className={styles.st2} x="965.45" y="361.55" width="100.89" height="45.86"/>
              <polygon  data-image="Third Floor" data-tip="thirdFloor"  ApartmentNum="6" bedroomCount="3" apartmentType="Penthouse" className={styles.st2} points="1207.59 296.89 1207.59 409.25 1347.92 409.25 1347.92 384.48 1207.59 296.89"/>


              <polygon  data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="28" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} points="446.78 407.41 446.78 456.25 528.87 456.25 528.87 404.66 446.78 404.66 446.78 407.41"/>
              <rect data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="27" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="404.66" width="62.7" height="51.59"/>
              <polygon  data-image="Second Floor" data-tip="secondFloor" ApartmentNum="26" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} points="626.78 398.93 626.78 443.87 695.34 443.87 695.34 398.01 626.78 398.93"/>
              <rect  data-image="Second Floor" data-tip="secondFloor" ApartmentNum="25" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="854.93" y="411.08" width="110.52" height="49.22"/>
              <rect  data-image="Second Floor" data-tip="secondFloor" ApartmentNum="24" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="965.45" y="411.08" width="100.89" height="49.22"/>
              <polygon data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="23" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} points="1207.59 416.59 1285.1 416.59 1285.1 465.5 1206.52 465.5 1207.59 416.59"/>
              <rect data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="22" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1285.1" y="416.59" width="62.83" height="48.92"/>
              <polygon data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="21" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} points="1365.2 397.32 1365.2 473.76 1408.61 473.76 1408.61 424.23 1365.2 397.32"/>
              <polygon data-image="Second Floor" data-tip="secondFloor"  ApartmentNum="20" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} points="1487.49 473.76 1408.61 473.76 1408.61 424.23 1487.49 473.76"/>


              <rect data-image="First Floor" data-tip="firstFloor"  ApartmentNum="44" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="446.78" y="463.67" width="82.09" height="51.97"/>
              <rect data-image="First Floor" data-tip="firstFloor"    ApartmentNum="43" bedroomCount="2"  apartmentType="Bedroom" className={styles.st2} x="528.87" y="463.67" width="64.36" height="51.97"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="42" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="626.78" y="457.86" width="68.56" height="47.46"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="41" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="854.93" y="468.64" width="110.52" height="47.01"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="40" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="965.45" y="468.64" width="100.89" height="47.01"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="39" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1206.52" y="473.76" width="78.57" height="48"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="38" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1285.1" y="473.76" width="62.83" height="48"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="37" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1421.76" y="481.1" width="74.9" height="40.66"/>
              <rect data-image="First Floor" data-tip="firstFloor"   ApartmentNum="36" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1363.97" y="481.1" width="57.78" height="40.66"/>


              <rect data-image="Ground Floor" data-tip="groundFloor"   ApartmentNum="59" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="446.78" y="521.15" width="82.09" height="45.86"/>
              <rect data-image="Ground Floor" data-tip="groundFloor" ApartmentNum="58" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="521.15" width="64.36" height="45.86"/>
              <path data-image="Ground Floor" data-tip="groundFloor"  ApartmentNum="57" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} d="M625.63,517.25h70.62V567H625.63C626.32,567,625.63,517.25,625.63,517.25Z"/>
              <rect data-image="Ground Floor" data-tip="groundFloor" ApartmentNum="56" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="854.93" y="526.19" width="110.52" height="48.15"/>
              <rect data-image="Ground Floor" data-tip="groundFloor"  ApartmentNum="55" bedroomCount="3" apartmentType="Bedroom" className={styles.st2} x="965.45" y="526.19" width="100.89" height="48.15"/>
              <rect data-image="Ground Floor" data-tip="groundFloor"  ApartmentNum="54" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1206.52" y="528.48" width="78.57" height="49.53"/>
              <rect data-image="Ground Floor" data-tip="groundFloor"  ApartmentNum="53" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1285.1" y="528.48" width="62.83" height="49.53"/>
              <rect data-image="Ground Floor" data-tip="groundFloor"  ApartmentNum="52" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1363.97" y="536.28" width="63.06" height="46.32"/>
              <rect data-image="Ground Floor" data-tip="groundFloor"   ApartmentNum="51" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1427.03" y="536.28" width="69.63" height="46.32"/>
            
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="81" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="446.78" y="575.26" width="82.09" height="50.75"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="80" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="575.26" width="65.89" height="50.75"/>
              <rect data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="79" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="625.63" y="575.26" width="70.63" height="50.75"/>
              <rect data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="78" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="732.94" y="575.26" width="88.66" height="50.75"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1" ApartmentNum="77" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="854.93" y="584.74" width="88.66" height="48.31"/>
              <rect data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="76" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="977.53" y="584.74" width="88.82" height="48.31"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="75" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="1107.16" y="584.74" width="76.43" height="48.31"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="74" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1205.64" y="584.74" width="73.95" height="48.31"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="73" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1279.59" y="584.74" width="68.33" height="48.31"/>
              <polygon data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="72" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} points="1362.97 588.41 1364.04 633.04 1431.39 633.04 1431.39 588.41 1362.97 588.41"/>
              <rect  data-image="Valley Floor 1" data-tip="basement1"  ApartmentNum="71" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1431.39" y="588.41" width="65.27" height="44.64"/>

              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="105" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="446.78" y="694.96" width="82.09" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="104" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="694.96" width="65.89" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="103" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="625.63" y="694.96" width="73.84" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="102" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="732.94" y="694.96" width="88.66" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3" ApartmentNum="101" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="997.1" y="694.96" width="69.25" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="100" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="926.93" y="694.96" width="70.17" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="99" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="854.93" y="694.96" width="72" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="98" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1107.16" y="694.96" width="76.43" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="97" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1205.64" y="694.96" width="73.95" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="96" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1279.59" y="694.96" width="68.33" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="95" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1363.97" y="694.96" width="67.41" height="50.9"/>
              <rect data-image="Valley Floor 3" data-tip="basement3"  ApartmentNum="94" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1431.39" y="694.96" width="65.27" height="50.9"/>
           
              <rect data-image="Valley Floor 4" data-tip="basement4"   ApartmentNum="124" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="446.78" y="755.03" width="82.09" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="123" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="755.03" width="67.72" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="122" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="625.63" y="755.03" width="73.84" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="121" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="732.94" y="755.03" width="88.66" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="120" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="854.93" y="755.03" width="72" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="119" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="926.93" y="755.03" width="69.71" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="118" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="996.64" y="755.03" width="69.71" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="117" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1107.16" y="755.03" width="76.43" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="116" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1205.64" y="755.03" width="47.04" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="115" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1252.69" y="755.03" width="47.04" height="51.36"/>
              <rect data-image="Valley Floor 4" data-tip="basement4" ApartmentNum="114" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1299.73" y="755.03" width="48.19" height="51.36"/>
            

              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="127" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="446.78" y="814.65" width="82.09" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="128" bedroomCount="2" apartmentType="Bedroom" className={styles.st2} x="528.87" y="814.65" width="67.72" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="129" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="625.63" y="814.65" width="73.84" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="130" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="732.94" y="814.65" width="88.66" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="131" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="854.93" y="814.65" width="72" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="132" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="926.93" y="814.65" width="72" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="133" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="998.93" y="814.65" width="67.41" height="50.9"/>
              <rect data-image="Valley Floor 5" data-tip="basement5"  ApartmentNum="134" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1107.16" y="814.65" width="76.43" height="50.9"/>
      
              <rect data-image="Valley Floor 6" data-tip="basement6"   ApartmentNum="138" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="446.78" y="873.81" width="82.09" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="139" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="528.87" y="873.81" width="67.72" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="140" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="625.63" y="873.81" width="73.84" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="141" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="732.94" y="873.81" width="88.66" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="142" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="854.93" y="873.81" width="72" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="143" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="926.93" y="873.81" width="72" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="144" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="998.93" y="873.81" width="67.41" height="50.9"/>
              <rect data-image="Valley Floor 6" data-tip="basement6" ApartmentNum="145" bedroomCount="1" apartmentType="Bedroom" className={styles.st2} x="1107.16" y="873.81" width="76.43" height="50.9"/>
              

              <path className={styles.st0} data-image="Valley Floor 2" data-tip="basement2" d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"/>


            </svg>)
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

            <path className={styles.st0} data-image="Ground Floor" data-tip="groundFloor"  d="M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z M783.06,519.38v50.14l-21.14-.5-63.14-1.46H611.65l-182.37.31q-.15-25.3-.31-50.6l165.25.15,30,1.53h29.05L697,517.42Z"/>

            <path className={styles.st0} data-image="First Floor" data-tip="firstFloor" d="M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-1.61V472.85L1343.65,474l21.55,7.57,147.75-.15Z M783.06,461v50.14l-21.14-.49-63.14-1.47H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"/>


            <path className={styles.st0} data-image="Second Floor" data-tip="secondFloor" d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z M1143.32,416.82h205.14l16.51,3.52,72,0,75.32,48.27v4.74l-82.24.61h-65.43l-17.12-8.4-204.31.38Z M783.06,403.58v47.89l-21.14-.5-62,.78H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"/>


            <path  onMouseEnter={() => setSelectedPath(true)}
                onMouseLeave={() => setSelectedPath(false)} data-image="Third Floor" data-tip="thirdFloor" className={!selectedPath ? styles.st0 : styles.st1Hovers} d="M1420.24,409.94H1206.3L1143,410q.16-20.67.31-41.35l46.47-106.09,176.1,112.81L1391,391.9Z M783.06,366c0,9.36,0,20,0,29.35-13.29,0-29.29-.52-42.58-.54H720.32c-44,.53-85.62-1.37-129.65-.84l-161.43,1.38.19-13.42L607.37,263.8l13.76,15.29L709.79,221h1.45Z"/>
            <polygon  onMouseEnter={() => setSelectedPath(true)}
                onMouseLeave={() => setSelectedPath(false)} data-image="Third Floor" data-tip="thirdFloor" className={!selectedPath ? styles.st0 : styles.st1Hovers} points="820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"/>

           
          </svg>)

              )}

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
                    <Image src="/svg/buildingw.svg" quality={100} alt="tooltip" height={60} width={60} />
                  </div>
                  <div className={styles.tooltipInfo}>
                    <div className={styles.tooltipFloor}>{tooltipContent.floorName}</div>
                    {tooltipContent.floorName === 'Valley Floor 2' ? (
                      <span className={styles.tooltipUnits}>Parking Lot</span>
                    ) : (
                      filterbox ? (
                        <>
                          <div className={styles.tooltipFloor}>Apartment: {tooltipContent.apartmentNum}</div>
                          <div className={styles.tooltipFloor}>{tooltipContent.bedroomCount} {tooltipContent.apartmentType}</div>
                          {/* <div className={styles.tooltipType}>{tooltipContent.apartmentType}</div> */}
                        </>
                      ) : (
                        <div className={styles.tooltipUnits}>{tooltipContent.totalUnits} Units</div>
                      )
                    )}
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
              <div style={{left: '2.5rem', bottom:'8rem', position: 'relative', zIndex: 1}}onClick={() => window.open("https://almaymaar.com/", '_blank')}>
              <Image style={{cursor:'pointer'}} src="/Webpage/floors/MainLogo.png"  quality={100} alt="Almaymar" height={28} width={210} />
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
             <FilterBox
                ref={filterBoxRef}
                isVisible={isFilterBoxVisible}
                onFilterChange={handleFilterChange}
              />        
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


              <div className={styles.menuContainer}>
                <div className={styles.menuContainerInside} ref={menuContainerRef} >
                  <MenubarButton inActive={menuBox} handleMenu={handleMenu}/>
                </div>
              </div>

              <MenuBox isMobile={isMobile} ref={menuBoxRef} isActive={menuBox} 
                handleOverlay={handleOverlay} handleFilter={handleFilter} translations={translations} toggleLanguage={toggleLanguage} overlay={overlay} fullScreen={fullScreen} toggleFullScreen={toggleFullScreen}/>

              {isFilterBoxVisible && (
                <FilterBox ref={filterBoxRef} isVisible={isFilterBoxVisible} />
              )}

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
              <div style={{left: '-0.7rem', bottom:'-0.5rem', position: 'relative'}} onClick={()=> router.push("https://almaymaar.com/")}>
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
          
          </>

        )
      }
    </>
  );
}