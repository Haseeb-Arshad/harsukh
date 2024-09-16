"use client";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import styles from "@/styles/ImageBackground.module.css";
import { modifyLanguage } from "@/state/language/languageState";
import { toggleFullScreen } from '@/state/fullScreen/fullScreen';
import en from "@/app/locales/en.json";
import ur from "@/app/locales/ur.json";
import ElevStyles from "@/styles/elevation.module.css";

import MenuBox from "@/app/component/Bars/menuBox";
// import FrontViewSvgs from "@/app/component/Background/Svg/Filters/FrontViewSvgs";
// import BackViewSvgs from "@/app/component/Background/Svg/Filters/BackViewSvgs";
// import FrontSvgs from "@/app/component/Background/Svg/Floors/FrontSvgs";
// import BackSvgs from "@/app/component/Background/Svg/Floors/BackSvgs";
// const MenuBox = dynamic(() => import("@/app/component/Bars/menuBox"), { ssr: false });

// Dynamically import heavy components
const FavButton = dynamic(() => import("@/app/component/Icons/favButton"), { ssr: false });
const MenubarButton = dynamic(() => import("@/app/component/Icons/menuBarBtn"), { ssr: false });
const AmenityGrid = dynamic(() => import("@/app/component/Amenities/AmenityGrid"), { ssr: false });
const ContactBox = dynamic(() => import("@/app/component/Bars/contactBox"), { ssr: false });
const FilterBox = dynamic(() => import("@/app/component/Bars/filterBox"), { ssr: false });
// const MenuBox = dynamic(() => import("@/app/component/Bars/menuBox"), { ssr: false });
const AmenityBtn = dynamic(() => import("@/app/component/Icons/AmenityBtn"), { ssr: false });
const ApartmentListing = dynamic(() => import("@/app/component/Reserve/ApartmentListing"), { ssr: false });
const ElevationBox = dynamic(() => import("@/app/component/Bars/elevationBox"), { ssr: false });
const Loader = dynamic(() => import("@/app/[floor]/Loading"), { ssr: false });
const ContactUsPopup = dynamic(() => import("@/app/component/contactus/page"), { ssr: false });
const SnowButton = dynamic(() => import("@/app/component/Icons/snowBtn"), { ssr: false });


const floorData = {
  "Third Floor": {
    Penthouse: 10,
    "Three Beds": 0,
    "Two Beds": 0,
    "One Beds": 0,
    "Studio Apartments": 0,
  },
  "Second Floor": {
    Penthouse: 4,
    "Three Beds": 4,
    "Two Beds": 4,
    "One Beds": 6,
    "Studio Apartments": 0,
  },
  "First Floor": {
    Penthouse: 0,
    "Three Beds": 4,
    "Two Beds": 7,
    "One Beds": 5,
    "Studio Apartments": 0,
  },
  "Ground Floor": {
    Penthouse: 0,
    "Three Beds": 4,
    "Two Beds": 7,
    "One Beds": 4,
    "Studio Apartments": 0,
  },
  "Valley Floor 1": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 8,
    "Studio Apartments": 0,
  },
  "Valley Floor 2": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 10,
    "Studio Apartments": 0,
  },
  "Valley Floor 3": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 10,
    "Studio Apartments": 0,
  },
  "Valley Floor 4": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 14,
    "One Beds": 5,
    "Studio Apartments": 0,
  },
  "Valley Floor 5": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 5,
    "One Beds": 6,
    "Studio Apartments": 0,
  },
  "Valley Floor 6": {
    Penthouse: 0,
    "Three Beds": 0,
    "Two Beds": 6,
    "One Beds": 5,
    "Studio Apartments": 0,
  },
};



export default function MainPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState("AVAILABLE");
  const [fullScreen, setFullScreen] = useState(false);
  const [menuBox, setMenuBox] = useState(false);
  const [filterbox, setFilterBox] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isContacted, setIsContacted] = useState(false);
  const [backView, setBackView] = useState(false);
  const [reservedClicked, setReservedClicked] = useState(false);
  const [selectedPath, setSelectedPath] = useState(false);
  const [filterselection, setFilterSelection] = useState(false);
  const filterContainerRef = useRef(null);
  const filterBoxRef = useRef(null);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const favContainerRef = useRef(null);
  const apartmentListingRef = useRef(null);
  const [filterFloorMenu, setFilterFloorMenu] = useState(true);
  const amenityButtonRef = useRef(null);
  const amenityGridRef = useRef(null);
  const [amenityClicked, setAmenityClicked] = useState(false);
  const [isContactusClicked, setContactUs] = useState(false);
  const [snowMode, setSnowMode] = useState(false);
  const params = useParams();
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipLeave, setToolTipLeave] = useState(false);
  const hideTimeout = useRef(null);
  const [svgReloadTrigger, setSvgReloadTrigger] = useState(0);


  
  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });
  const { amenities, selectedAmenities } = useSelector((state) => state.amenities);

  const favoriteApartments = useSelector(
    (state) => state.favoriteApartments.favoriteApartments
  );

  const handleContact = () => {
    setMenuBox(false);
    setContactUs(!isContactusClicked);
  };

  const memoizedFloorData = useMemo(() => {
    return floorData;
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up resize listener
      window.removeEventListener("resize", checkLaptop); // Clean up laptop check listener
    };
  }, []);

  const filterButtonRef = useRef(null);

  const handleFilter = useCallback((event) => {
    setIsFilterBoxVisible((prev) => !prev);
    setSvgReloadTrigger(prev => prev + 1);
  }, []);

  const handleAmenities = useCallback((event) => {
    // event.stopPropagation();
    setAmenityClicked((prev) => !prev);
  }, []);

  const closeFilterBox = useCallback(() => {
    setIsFilterBoxVisible(false);
  }, []);

  const handleAmenitiesCheck = useCallback(() => {
    setAmenityClicked(false);
  }, []);

  const handleSnowMode = useCallback((event) => {
    setSnowMode((prev) => !prev);
  }, []);

  const handleOutsideClick = useCallback((event) => {
    if (
      isFilterBoxVisible &&
      !filterBoxRef.current?.contains(event.target) &&
      !filterButtonRef.current?.contains(event.target)
    ) {
      closeFilterBox();
    }

  }, [isFilterBoxVisible, amenityClicked, closeFilterBox]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // Clean up
      document.removeEventListener('touchstart', handleOutsideClick); // Clean up
    };
  }, [handleOutsideClick]);

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
    document.addEventListener("mousedown", handleFavClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleFavClickOutside); // Clean up
    };
  }, [handleFavClickOutside]);

  const handleFavorties = () => {
    setReservedClicked((prev) => !prev);
  };

  const handleGetDirections = () => {
    // Coordinates for HARSUKH
    const destination = '34.0162791,73.3928231';
    
    // Create the URL for Google Maps directions with the destination
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
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
          container.style.overflowX = "auto";

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
          container.style.overflowX = "hidden";
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
        svg.setAttribute(
          "viewBox",
          `0 0 ${img.naturalWidth} ${img.naturalHeight}`
        );
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

    window.addEventListener("resize", adjustImageAndSVG);

    return () => {
      window.removeEventListener("resize", adjustImageAndSVG);
    };
  }, [isMobile, overlay, params]);

  const handleSVGElementClick = useCallback((event) => {
    const floorName = event.target.getAttribute("data-tip");
    if (floorName && floorName !== "valley-floor-2") {
      const slug = floorName.replace(/\s+/g, "-");
      router.prefetch(`/${slug}`);
      requestAnimationFrame(() => {
        router.push(`/${slug}`);
      });
    }
  }, [router]);

  const handleContactClose = () => {
    setIsContacted(false);
  };

  useEffect(() => {
    if (selectedAmenities.length == 0) {
      setFilterSelection(false);
    } else setFilterSelection(true);
  }, [filterbox, selectedAmenities.length, filterFloorMenu, params]);

  const handleCall = () => {
    setIsContacted(!isContacted);
  };

  const [svgHover, setSvgHover] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const handleClick = (event) => {
        if (event.target.tagName === 'polygon' || 
            event.target.tagName === 'polyline' || 
            event.target.tagName === 'path' || 
            event.target.tagName === 'rect' || 
            event.target.tagName === 'g') {
          handleSVGElementClick(event);
        }
      };

      svg.addEventListener("click", handleClick);

      return () => {
        svg.removeEventListener("click", handleClick);
      };
    }
  }, [handleSVGElementClick, overlay, filterbox, svgHover, params, filterBoxRef, isFilterBoxVisible, backView, snowMode]);
  
  
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const newImageUrl = !backView
      ? (snowMode ? "/images/background/frontViewWinter.webp" : "/images/background/frontViewSummer.webp")
      : "/images/background/backView.webp";
  
    if (newImageUrl !== imageUrl) {
      setLoading(true);
      setImageUrl(newImageUrl);
    } else {
      // If the image URL hasn't changed, we assume it's already loaded
      setLoading(false);
    }
  }, [backView, snowMode, params, imageUrl]);

  

  const getImageSrc = useCallback(() => {
    if (!backView) {
      return snowMode ? "/images/background/frontViewWinter.webp" : "/images/background/frontViewSummer.webp";
    }
    return "/images/background/backView.webp";
  }, [backView, snowMode]);

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

  const handleMenu = () => {
    setMenuBox((prev) => !prev);
  };

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
    document.addEventListener("mousedown", handleAmenitiesClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleAmenitiesClickOutside);
    };
  }, [handleAmenitiesClickOutside]);

  useEffect(() => {
    if(!filterbox)
    {
      if( selectedAmenities.length!= 0 )
      setFilterFloorMenu(true);
      else
      setFilterFloorMenu(false);
    }
  }, [filterbox]);

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

  const handleOverlay = () => {
    setOverlay(!overlay);
  };

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

  const elevationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        elevationRef.current &&
        !elevationRef.current.contains(event.target)
      ) {
        setIsElevationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, []);

  const handlePolygonHover = (event) => {
    setToolTipLeave(true);
    const element = event.target;
    const floorName = element.getAttribute("data-image");
    if (floorName) {
      const floorKey = Object.keys(memoizedFloorData).find((key) => {
        const normalizedKey = key.toLowerCase().replace(/\s+/g, "");
        const normalizedFloorName = floorName.toLowerCase().replace(/\s+/g, "");
        return (
          normalizedKey.includes(normalizedFloorName) ||
          normalizedFloorName.includes(normalizedKey)
        );
      });
  
      const floorInfo = memoizedFloorData[floorKey];
      const totalUnits = floorInfo
        ? Object.values(floorInfo).reduce((a, b) => a + b, 0)
        : 0;
  
      setTooltipContent({
        floorName,
        totalUnits, 
        details: floorInfo,
      });
  
      setTooltipPosition({
        x: event.clientX - 220, // Adjust this value to position tooltip to the left of the cursor
        y: event.clientY - 25, // Adjust this value to position tooltip above the cursor
      });
  
      clearTimeout(hideTimeout.current);
      setTooltipVisible(true);
    }
  };
  
  const handlePolygonHoverFiltered = (event) => {
    setToolTipLeave(true);

    const element = event.target;
    const floorName = element.getAttribute("data-image");
    const apartmentNum = element.getAttribute("ApartmentNum");
    const bedroomCount = element.getAttribute("bedroomCount");
    const apartmentType = element.getAttribute("apartmentType");
  
    if (floorName) {
      setTooltipContent({
        floorName,
        apartmentNum,
        bedroomCount,
        apartmentType,
      });
      setTooltipPosition({
        x: event.clientX - 220, // Adjust this value to position tooltip to the left of the cursor
        y: event.clientY - 30, // Adjust this value to position tooltip above the cursor
      });
  
      clearTimeout(hideTimeout.current);
      setTooltipVisible(true);
    }
  };
  
  const handlePolygonMove = (event) => {
    if (tooltipContent) {
      setTooltipPosition({
        x: event.clientX - 220, // Adjust this value to position tooltip to the left of the cursor
        y: event.clientY - 40, // Adjust this value to position tooltip above the cursor
      });
    }
  };
  
  const handlePolygonLeave = () => {
    // Set a timeout to hide the tooltip
    hideTimeout.current = setTimeout(() => {
      setTooltipVisible(false);
    }, 500); // 1-second delay
  };
  
  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      const elements = svg.querySelectorAll("polygon, polyline, path, rect");
      const hoverHandler =
        (filterbox && selectedAmenities.length !== 0) ||
        (filterFloorMenu && selectedAmenities.length !== 0)
          ? handlePolygonHoverFiltered
          : handlePolygonHover;
  
      elements.forEach((element) => {
        element.addEventListener("mouseenter", hoverHandler);
        element.addEventListener("mousemove", handlePolygonMove);
        element.addEventListener("mouseleave", handlePolygonLeave);
      });
  
      return () => {
        elements.forEach((element) => {
          element.removeEventListener("mouseenter", hoverHandler);
          element.removeEventListener("mousemove", handlePolygonMove);
          element.removeEventListener("mouseleave", handlePolygonLeave);
        });
      };
    }
  }, [overlay, filterbox, selectedAmenities.length, filterFloorMenu, params, filterBoxRef, svgHover, backView, snowMode, svgReloadTrigger]);

  const handleCallClick = useCallback(() => {
    // Add "/callus" to the URL without navigating
    const newUrl = `${window.location.origin}${window.location.pathname}${window.location.pathname.endsWith('/') ? '' : '/'}callus`;
    window.history.pushState({}, '', newUrl);

    // Attempt to open the phone dialer
    window.location.href = 'tel:051-111-520-520';

    // Set a timeout to remove "/callus" from the URL
    setTimeout(() => {
      if (window.location.pathname.endsWith('/callus')) {
        const cleanUrl = window.location.href.replace('/callus', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }, 1000); // Short delay to ensure the call attempt has been made
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && window.location.pathname.endsWith('/callus')) {
        const cleanUrl = window.location.href.replace('/callus', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    };

    const handleFocus = () => {
      if (window.location.pathname.endsWith('/callus')) {
        const cleanUrl = window.location.href.replace('/callus', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const svgElements = svgRef.current.querySelectorAll(
        "polygon, polyline, path, rect"
      );
  
      svgElements.forEach((element) => {
        const bedroomCount = element.getAttribute("bedroomCount");
        const apartmentType = element.getAttribute("apartmentType");
  
        const shouldShow =
          selectedAmenities.length === 0 ||
          selectedAmenities.some((amenity) => {
            if (amenity === "Studio") return apartmentType === "Studio";
            if (amenity === "1 Bed Apartments") return bedroomCount === "1";
            if (amenity === "2 Bed Apartments") return bedroomCount === "2";
            if (amenity === "3 Bed Apartments") return bedroomCount === "3";
            if (amenity === "Pent Houses") return apartmentType === "Penthouse";
            return false;
          });
  
        element.style.display = shouldShow ? "block" : "none";
      });
    }
  }, [selectedAmenities, filterbox, filterFloorMenu, backView, params, svgHover, snowMode, svgReloadTrigger]);

  const [language, setLanguage] = useState(languageState === "ur");
  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );

  const [selectedFloor, setSelectedFloor] = useState("");
  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [isElevationClicked, setElevationClicked] = useState(false);
  const [elevationArray, setElevationArray] = useState([
    { id: "2", label: translations["mapview"], route: "/mapview" },
    { id: "1", label: translations["elevation"], route: "/explore" },
  ]);

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
    
    // Update elevationArray when translations change
    setElevationArray([
      {id:'2', label: language ? ur['mapview'] : en['mapview'], route:'/mapview'},
      {id:'1', label: language ? ur['elevation'] : en['elevation'], route:'/explore'},
    ]);
  }, [language, dispatch]);

  const toggleLanguage = () => {
    setLanguage(!language);
  };
  const handleElevationClicked = () => {
    setElevationClicked(!isElevationClicked);
  };

  useEffect(() => {
    if(selectedAmenities.length != 0)
    {
      setFilterBox(true);
    }
  }, [selectedAmenities.length]);

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? "ur" : "en" }));
  }, [language, dispatch]);

  const handleBackView = () => {
    setLoading(true);
    setBackView((prev) => !prev);
  };

  const [hoveredGroup, setHoveredGroup] = useState(null);

  const handleBackMouseEnter = (group) => {
    setHoveredGroup(group);
  };

  const handleBackMouseLeave = () => {
    setHoveredGroup(null);
  };


  const [showPopup, setShowPopup] = useState(true);


  useEffect(() => {

    console.log("POPUP")

    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 4000); // Show popup for 4 seconds

    // return () => clearTimeout(timer);
  }, [0]);


  return (
    <>
      {loading && (
        <div className={styles.loadingWrapper}>
          <Loader />
        </div>
      )}

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.cursorIcon}>
              <Image src="/images/icons/pointerIcon.svg" width={55} height={55} alt="Pointer" />
            </div>
            <p>Choose a floor</p>
          </div>
        </div>
      )}



      <div
        ref={containerRef}
        className={`${styles.backgroundImageContainer} ${
          isContacted ? styles.blur : ""
        }`}
      >
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}

            // https://cdn.theharsukh.com/images/background/back-view.webp
            src={!backView ? (snowMode ? 
                "https://cdn.theharsukh.com/images/background/front-view-summer.webp" : "https://cdn.theharsukh.com/images/background/front-view-winter.webp") : "https://cdn.theharsukh.com/images/background/back-view.webp"}
          
            // src={!backView ? (snowMode ? 
            //   "/images/background/front-view-summer.webp" : "/images/background/front-view-winter.webp") : "/images/background/back-view.webp"}
        
        
              alt="Background"
            className={`${styles.backgroundImage} ${loading ? styles.loading : ''}`}
            onLoad={handleImageLoad}
          />

          {overlay &&
            ((filterbox && selectedAmenities.length != 0) || (filterFloorMenu && selectedAmenities.length != 0) ? 
          
            (
             ( !backView ?
             
             
             (snowMode?
              
              (
              // <>

              
              // </>

                // <FrontViewSvgs svgRef={svgRef} setSvgHover={setSvgHover}  />

             <svg
                ref={svgRef}
                version="1.1"
                id={styles.masker}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1920 1080"
                xmlSpace="preserve"
                onMouseEnter={() =>setSvgHover(true)}
                onMouseLeave={() =>setSvgHover(false)}

              >
                <polygon
                  data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="10"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  points="446.78 393.2 591.57 298.53 589.86 396.41 446.78 396.41 446.78 393.2"
                />
                <polygon
                  data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="9"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
                />
                <rect
                  data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="8"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  x="854.93"
                  y="361.55"
                  width="110.52"
                  height="45.86"
                />
                <rect
                  data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="7"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  x="965.45"
                  y="361.55"
                  width="100.89"
                  height="45.86"
                />
                <polygon
                  data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="6"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  points="1207.59 296.89 1207.59 409.25 1347.92 409.25 1347.92 384.48 1207.59 296.89"
                />

                <polygon
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="28"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  points="446.78 407.41 446.78 456.25 528.87 456.25 528.87 404.66 446.78 404.66 446.78 407.41"
                />
                <rect
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="27"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="404.66"
                  width="62.7"
                  height="51.59"
                />
                <polygon
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="26"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  points="626.78 398.93 626.78 443.87 695.34 443.87 695.34 398.01 626.78 398.93"
                />
                <rect
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="25"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="411.08"
                  width="110.52"
                  height="49.22"
                />
                <rect
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="24"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="965.45"
                  y="411.08"
                  width="100.89"
                  height="49.22"
                />
                <polygon
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="23"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  points="1207.59 416.59 1285.1 416.59 1285.1 465.5 1206.52 465.5 1207.59 416.59"
                />
                <rect
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="22"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1285.1"
                  y="416.59"
                  width="62.83"
                  height="48.92"
                />
                <polygon
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="21"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  points="1365.2 397.32 1365.2 473.76 1408.61 473.76 1408.61 424.23 1365.2 397.32"
                />
                <polygon
                  data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="20"
                  bedroomCount="1"
                  apartmentType="Penthouse"
                  className={styles.st2}
                  points="1487.49 473.76 1408.61 473.76 1408.61 424.23 1487.49 473.76"
                />

                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="44"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="463.67"
                  width="82.09"
                  height="51.97"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="43"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="463.67"
                  width="64.36"
                  height="51.97"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="42"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="626.78"
                  y="457.86"
                  width="68.56"
                  height="47.46"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="41"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="468.64"
                  width="110.52"
                  height="47.01"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="40"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="965.45"
                  y="468.64"
                  width="100.89"
                  height="47.01"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="39"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1206.52"
                  y="473.76"
                  width="78.57"
                  height="48"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="38"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1285.1"
                  y="473.76"
                  width="62.83"
                  height="48"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="37"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1363.97"
                  y="481.1"
                  width="57.78"
                  height="40.66"
                />
                <rect
                  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="36"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1421.76"
                  y="481.1"
                  width="74.9"
                  height="40.66"
                />
                

                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="59"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="521.15"
                  width="82.09"
                  height="45.86"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="58"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="521.15"
                  width="64.36"
                  height="45.86"
                />
                <path
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="57"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  d="M625.63,517.25h70.62V567H625.63C626.32,567,625.63,517.25,625.63,517.25Z"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="56"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="526.19"
                  width="110.52"
                  height="48.15"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="55"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="965.45"
                  y="526.19"
                  width="100.89"
                  height="48.15"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="54"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1206.52"
                  y="528.48"
                  width="78.57"
                  height="49.53"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="53"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1285.1"
                  y="528.48"
                  width="62.83"
                  height="49.53"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="52"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1363.97"
                  y="536.28"
                  width="63.06"
                  height="46.32"
                />
                <rect
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="51"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1427.03"
                  y="536.28"
                  width="69.63"
                  height="46.32"
                />

                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="81"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="575.26"
                  width="82.09"
                  height="50.75"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="80"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="575.26"
                  width="65.89"
                  height="50.75"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="79"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="625.63"
                  y="575.26"
                  width="70.63"
                  height="50.75"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="78"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="732.94"
                  y="575.26"
                  width="88.66"
                  height="50.75"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="77"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="584.74"
                  width="88.66"
                  height="48.31"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="76"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="977.53"
                  y="584.74"
                  width="88.82"
                  height="48.31"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="75"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1107.16"
                  y="584.74"
                  width="76.43"
                  height="48.31"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="74"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1205.64"
                  y="584.74"
                  width="73.95"
                  height="48.31"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="73"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1279.59"
                  y="584.74"
                  width="68.33"
                  height="48.31"
                />
                <polygon
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="72"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  points="1362.97 588.41 1364.04 633.04 1431.39 633.04 1431.39 588.41 1362.97 588.41"
                />
                <rect
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="71"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1431.39"
                  y="588.41"
                  width="65.27"
                  height="44.64"
                />

                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="105"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="694.96"
                  width="82.09"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="104"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="694.96"
                  width="65.89"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="103"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="625.63"
                  y="694.96"
                  width="73.84"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="102"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="732.94"
                  y="694.96"
                  width="88.66"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="101"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="997.1"
                  y="694.96"
                  width="69.25"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="100"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="926.93"
                  y="694.96"
                  width="70.17"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="99"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="694.96"
                  width="72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="98"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1107.16"
                  y="694.96"
                  width="76.43"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="97"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1205.64"
                  y="694.96"
                  width="73.95"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="96"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1279.59"
                  y="694.96"
                  width="68.33"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="95"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1363.97"
                  y="694.96"
                  width="67.41"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  ApartmentNum="94"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1431.39"
                  y="694.96"
                  width="65.27"
                  height="50.9"
                />

                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="124"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="755.03"
                  width="82.09"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="123"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="755.03"
                  width="67.72"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="122"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="625.63"
                  y="755.03"
                  width="73.84"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="121"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="732.94"
                  y="755.03"
                  width="88.66"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="120"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="755.03"
                  width="72"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="119"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="926.93"
                  y="755.03"
                  width="69.71"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="118"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="996.64"
                  y="755.03"
                  width="69.71"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="117"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1107.16"
                  y="755.03"
                  width="76.43"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="116"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1205.64"
                  y="755.03"
                  width="47.04"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="115"
                  bedroomCount="0"
                  apartmentType="Studio"
                  className={styles.st2}
                  x="1252.69"
                  y="755.03"
                  width="47.04"
                  height="51.36"
                />
                <rect
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  ApartmentNum="114"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1299.73"
                  y="755.03"
                  width="48.19"
                  height="51.36"
                />

                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="127"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="446.78"
                  y="814.65"
                  width="82.09"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="128"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="814.65"
                  width="67.72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="129"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="625.63"
                  y="814.65"
                  width="73.84"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="130"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="732.94"
                  y="814.65"
                  width="88.66"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="131"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="814.65"
                  width="72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="132"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="926.93"
                  y="814.65"
                  width="72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="133"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="998.93"
                  y="814.65"
                  width="67.41"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  ApartmentNum="134"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1107.16"
                  y="814.65"
                  width="76.43"
                  height="50.9"
                />

                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="138"
                  bedroomCount="0"
                  apartmentType="Studio"
                  className={styles.st2}
                  x="446.78"
                  y="873.81"
                  width="82.09"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="139"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="528.87"
                  y="873.81"
                  width="67.72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="140"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="625.63"
                  y="873.81"
                  width="73.84"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="141"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="732.94"
                  y="873.81"
                  width="88.66"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="142"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="854.93"
                  y="873.81"
                  width="72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="143"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="926.93"
                  y="873.81"
                  width="72"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="144"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="998.93"
                  y="873.81"
                  width="67.41"
                  height="50.9"
                />
                <rect
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  ApartmentNum="145"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2}
                  x="1107.16"
                  y="873.81"
                  width="76.43"
                  height="50.9"
                />

                <path
                  className={styles.st0}
                  data-image="Valley Floor 2"
                  data-tip="valley-floor-2"
                  d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
                />

                
              </svg>


              ):


              (

                // <FrontViewSvgs svgRef={svgRef} setSvgHover={setSvgHover} />

                <svg
                   ref={svgRef}
                   version="1.1"
                   id={styles.masker}
                   xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink"
                   x="0px"
                   y="0px"
                   viewBox="0 0 1920 1080"
                   xmlSpace="preserve"
                   onMouseEnter={() =>setSvgHover(true)}
                   onMouseLeave={() =>setSvgHover(false)}
   
                 >
                   <polygon
                     data-image="Third Floor"
                     data-tip="third-floor"
                     ApartmentNum="10"
                     bedroomCount="2"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     points="446.78 393.2 591.57 298.53 589.86 396.41 446.78 396.41 446.78 393.2"
                   />
                   <polygon
                     data-image="Third Floor"
                     data-tip="third-floor"
                     ApartmentNum="9"
                     bedroomCount="2"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
                   />
                   <rect
                     data-image="Third Floor"
                     data-tip="third-floor"
                     ApartmentNum="8"
                     bedroomCount="3"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     x="854.93"
                     y="361.55"
                     width="110.52"
                     height="45.86"
                   />
                   <rect
                     data-image="Third Floor"
                     data-tip="third-floor"
                     ApartmentNum="7"
                     bedroomCount="3"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     x="965.45"
                     y="361.55"
                     width="100.89"
                     height="45.86"
                   />
                   <polygon
                     data-image="Third Floor"
                     data-tip="third-floor"
                     ApartmentNum="6"
                     bedroomCount="3"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     points="1207.59 296.89 1207.59 409.25 1347.92 409.25 1347.92 384.48 1207.59 296.89"
                   />
   
                   <polygon
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="28"
                     bedroomCount="2"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     points="446.78 407.41 446.78 456.25 528.87 456.25 528.87 404.66 446.78 404.66 446.78 407.41"
                   />
                   <rect
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="27"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="404.66"
                     width="62.7"
                     height="51.59"
                   />
                   <polygon
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="26"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     points="626.78 398.93 626.78 443.87 695.34 443.87 695.34 398.01 626.78 398.93"
                   />
                   <rect
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="25"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="411.08"
                     width="110.52"
                     height="49.22"
                   />
                   <rect
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="24"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="965.45"
                     y="411.08"
                     width="100.89"
                     height="49.22"
                   />
                   <polygon
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="23"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     points="1207.59 416.59 1285.1 416.59 1285.1 465.5 1206.52 465.5 1207.59 416.59"
                   />
                   <rect
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="22"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1285.1"
                     y="416.59"
                     width="62.83"
                     height="48.92"
                   />
                   <polygon
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="21"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     points="1365.2 397.32 1365.2 473.76 1408.61 473.76 1408.61 424.23 1365.2 397.32"
                   />
                   <polygon
                     data-image="Second Floor"
                     data-tip="second-floor"
                     ApartmentNum="20"
                     bedroomCount="1"
                     apartmentType="Penthouse"
                     className={styles.st2}
                     points="1487.49 473.76 1408.61 473.76 1408.61 424.23 1487.49 473.76"
                   />
   
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="44"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="463.67"
                     width="82.09"
                     height="51.97"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="43"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="463.67"
                     width="64.36"
                     height="51.97"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="42"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="626.78"
                     y="457.86"
                     width="68.56"
                     height="47.46"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="41"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="468.64"
                     width="110.52"
                     height="47.01"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="40"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="965.45"
                     y="468.64"
                     width="100.89"
                     height="47.01"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="39"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1206.52"
                     y="473.76"
                     width="78.57"
                     height="48"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="38"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1285.1"
                     y="473.76"
                     width="62.83"
                     height="48"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="37"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1363.97"
                     y="481.1"
                     width="57.78"
                     height="40.66"
                   />
                   <rect
                     data-image="First Floor"
                     data-tip="first-floor"
                     ApartmentNum="36"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1421.76"
                     y="481.1"
                     width="74.9"
                     height="40.66"
                   />
                   
   
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="59"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="521.15"
                     width="82.09"
                     height="45.86"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="58"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="521.15"
                     width="64.36"
                     height="45.86"
                   />
                   <path
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="57"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     d="M625.63,517.25h70.62V567H625.63C626.32,567,625.63,517.25,625.63,517.25Z"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="56"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="526.19"
                     width="110.52"
                     height="48.15"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="55"
                     bedroomCount="3"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="965.45"
                     y="526.19"
                     width="100.89"
                     height="48.15"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="54"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1206.52"
                     y="528.48"
                     width="78.57"
                     height="49.53"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="53"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1285.1"
                     y="528.48"
                     width="62.83"
                     height="49.53"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="52"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1363.97"
                     y="536.28"
                     width="63.06"
                     height="46.32"
                   />
                   <rect
                     data-image="Ground Floor"
                     data-tip="ground-floor"
                     ApartmentNum="51"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1427.03"
                     y="536.28"
                     width="69.63"
                     height="46.32"
                   />
   
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="81"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="575.26"
                     width="82.09"
                     height="50.75"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="80"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="575.26"
                     width="65.89"
                     height="50.75"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="79"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="625.63"
                     y="575.26"
                     width="70.63"
                     height="50.75"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="78"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="732.94"
                     y="575.26"
                     width="88.66"
                     height="50.75"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="77"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="584.74"
                     width="88.66"
                     height="48.31"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="76"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="977.53"
                     y="584.74"
                     width="88.82"
                     height="48.31"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="75"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1107.16"
                     y="584.74"
                     width="76.43"
                     height="48.31"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="74"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1205.64"
                     y="584.74"
                     width="73.95"
                     height="48.31"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="73"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1279.59"
                     y="584.74"
                     width="68.33"
                     height="48.31"
                   />
                   <polygon
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="72"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     points="1362.97 588.41 1364.04 633.04 1431.39 633.04 1431.39 588.41 1362.97 588.41"
                   />
                   <rect
                     data-image="Valley Floor 1"
                     data-tip="valley-floor-1"
                     ApartmentNum="71"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1431.39"
                     y="588.41"
                     width="65.27"
                     height="44.64"
                   />
   
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="105"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="694.96"
                     width="82.09"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="104"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="694.96"
                     width="65.89"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="103"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="625.63"
                     y="694.96"
                     width="73.84"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="102"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="732.94"
                     y="694.96"
                     width="88.66"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="101"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="997.1"
                     y="694.96"
                     width="69.25"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="100"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="926.93"
                     y="694.96"
                     width="70.17"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="99"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="694.96"
                     width="72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="98"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1107.16"
                     y="694.96"
                     width="76.43"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="97"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1205.64"
                     y="694.96"
                     width="73.95"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="96"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1279.59"
                     y="694.96"
                     width="68.33"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="95"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1363.97"
                     y="694.96"
                     width="67.41"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 3"
                     data-tip="valley-floor-3"
                     ApartmentNum="94"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1431.39"
                     y="694.96"
                     width="65.27"
                     height="50.9"
                   />
   
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="124"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="755.03"
                     width="82.09"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="123"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="755.03"
                     width="67.72"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="122"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="625.63"
                     y="755.03"
                     width="73.84"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="121"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="732.94"
                     y="755.03"
                     width="88.66"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="120"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="755.03"
                     width="72"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="119"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="926.93"
                     y="755.03"
                     width="69.71"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="118"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="996.64"
                     y="755.03"
                     width="69.71"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="117"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1107.16"
                     y="755.03"
                     width="76.43"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="116"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1205.64"
                     y="755.03"
                     width="47.04"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="115"
                     bedroomCount="0"
                     apartmentType="Studio"
                     className={styles.st2}
                     x="1252.69"
                     y="755.03"
                     width="47.04"
                     height="51.36"
                   />
                   <rect
                     data-image="Valley Floor 4"
                     data-tip="valley-floor-4"
                     ApartmentNum="114"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1299.73"
                     y="755.03"
                     width="48.19"
                     height="51.36"
                   />
   
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="127"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="446.78"
                     y="814.65"
                     width="82.09"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="128"
                     bedroomCount="2"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="814.65"
                     width="67.72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="129"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="625.63"
                     y="814.65"
                     width="73.84"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="130"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="732.94"
                     y="814.65"
                     width="88.66"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="131"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="814.65"
                     width="72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="132"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="926.93"
                     y="814.65"
                     width="72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="133"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="998.93"
                     y="814.65"
                     width="67.41"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 5"
                     data-tip="valley-floor-5"
                     ApartmentNum="134"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1107.16"
                     y="814.65"
                     width="76.43"
                     height="50.9"
                   />
   
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="138"
                     bedroomCount="0"
                     apartmentType="Studio"
                     className={styles.st2}
                     x="446.78"
                     y="873.81"
                     width="82.09"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="139"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="528.87"
                     y="873.81"
                     width="67.72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="140"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="625.63"
                     y="873.81"
                     width="73.84"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="141"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="732.94"
                     y="873.81"
                     width="88.66"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="142"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="854.93"
                     y="873.81"
                     width="72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="143"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="926.93"
                     y="873.81"
                     width="72"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="144"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="998.93"
                     y="873.81"
                     width="67.41"
                     height="50.9"
                   />
                   <rect
                     data-image="Valley Floor 6"
                     data-tip="valley-floor-6"
                     ApartmentNum="145"
                     bedroomCount="1"
                     apartmentType="Bedroom"
                     className={styles.st2}
                     x="1107.16"
                     y="873.81"
                     width="76.43"
                     height="50.9"
                   />
   
                   <path
                     className={styles.st0}
                     data-image="Valley Floor 2"
                     data-tip="valley-floor-2"
                     d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
                   />
   
                 </svg>

                 )

              ):
              (

                // <BackViewSvgs svgRef={svgRef} setSvgHover={setSvgHover}  />

                <svg
                ref={svgRef}
                version="1.1"
                id={styles.masker}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 1920 1080"
                xmlSpace="preserve"
                onMouseEnter={() =>setSvgHover(true)}
                onMouseLeave={() =>setSvgHover(false)}
              >
            
                <polygon data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="5"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2} points="450.45 458.32 450.45 484.46 628.84 484.46 628.84 349.17 450.45 458.32"/>
                <rect data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="4"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2} x="812.28" y="353.76" width="142.62" height="130.7"/>
                <rect data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="3"
                  bedroomCount="3"
                  apartmentType="Penthouse"
                  className={styles.st2} x="954.9" y="353.76" width="136.2" height="130.7"/>
                <polygon data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="2"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2} points="1292.43 484.46 1391.49 484.46 1391.49 368.89 1292.43 312.48 1292.43 484.46"/>
                <polygon data-image="Third Floor"
                  data-tip="third-floor"
                  ApartmentNum="1"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2} points="1430.7 484.46 1612.99 484.46 1430.7 373.02 1430.7 484.46"/>

                <polygon data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="11"
                  bedroomCount="2"
                  apartmentType="Penthouse"
                  className={styles.st2} points="285.35 557.53 383.19 557.53 383.19 498.83 285.35 557.53"/>
                <polygon data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="12"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} points="429.96 470.09 383.19 498.83 383.19 557.53 431.49 557.53 429.96 470.09"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="13"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="450.45" y="494.85" width="92.03" height="61.15"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="14"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="542.47" y="494.85" width="86.37" height="61.15"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="15"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="812.28" y="494.85" width="142.62" height="61.15"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="16"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="954.9" y="494.85" width="136.2" height="61.15"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="17"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1293.66" y="494.85" width="96" height="61.15"/>
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="18"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1429.4" y="494.85" width="85.3" height="61.15"/>
                  
                <rect data-image="Second Floor"
                  data-tip="second-floor"
                  ApartmentNum="19"
                  bedroomCount="1"
                  apartmentType="Penthouse"
                  className={styles.st2} x="1514.7" y="494.85" width="98.29" height="61.15"/>

                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="29"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="266.55" y="568.38" width="164.94" height="62.83"/>
                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="30"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="570.14" y="568.38" width="58.7" height="62.83"/>
                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="31"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="812.28" y="568.38" width="142.62" height="64.66"/>
                <rect  data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="32"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="954.9" y="568.38" width="136.2" height="64.66"/>
                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="33"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1292.43" y="568.38" width="97.22" height="64.66"/>
                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="34"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1429.4" y="568.38" width="92.45" height="64.66"/>
                <rect data-image="First Floor"
                  data-tip="first-floor"
                  ApartmentNum="35"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1521.85" y="568.38" width="91.15" height="64.66"/>

                <rect data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="45"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="266.55" y="638.09" width="164.94" height="66.04"/>
                <rect data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="46"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="812.28" y="640.38" width="147.72" height="63.75"/>
                <rect data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="47"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="960" y="640.38" width="131.11" height="63.75"/>
                <rect data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="48"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1292.43" y="640.38" width="97.22" height="63.75"/>
                <rect  data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="49"
                  bedroomCount="3"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1429.4" y="640.38" width="92.45" height="63.75"/>
                <rect data-image="Ground Floor"
                  data-tip="ground-floor"
                  ApartmentNum="50"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}  x="1521.85" y="640.38" width="91.15" height="63.75"/>

                <polygon data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="60"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} points="431.49 711.01 361.02 711.01 361.02 724.4 431.49 734.39 431.49 711.01"/>

                <polygon data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="61"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} points="664.15 711.01 758.62 711.01 756.79 774.29 664.15 761.45 664.15 711.01"/>
                <polygon data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="62"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2}  points="266.55 711.01 361.02 724.4 361.02 711.01 266.55 711.01"/>

                <polygon data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="63"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} points="628.84 711.01 628.84 757.33 551.8 749.99 551.8 712.38 628.84 711.01"/>

                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="64"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="812.28" y="711.01" width="121.07" height="74.75"/>
                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="65"
                  bedroomCount="2"
                  apartmentType="Bedroom"
                  className={styles.st2} x="970.04" y="711.01" width="121.07" height="74.75"/>
                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="66"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1128.71" y="711.01" width="119.69" height="74.75"/>
                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="67"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1292.43" y="711.01" width="97.22" height="74.75"/>
                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="68"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1429.4" y="711.01" width="91.8" height="74.75"/>
                <rect data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  ApartmentNum="69"
                  bedroomCount="1"
                  apartmentType="Bedroom"
                  className={styles.st2} x="1521.2" y="711.01" width="91.8" height="74.75"/>

              </svg>

              )

            )

            ) : (

              backView ?
              (

                // <BackSvgs  />

              <svg
                ref={svgRef}
                version="1.1"
                id={styles.masker}
                viewBox="0 0 1920 1080"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                xmlSpace="preserve"
              >
            

                <g
                    onMouseEnter={() => handleBackMouseEnter('third-floor')}
                    onMouseLeave={handleBackMouseLeave}
                    data-image="Third Floor"
                    data-tip="third-floor"
                  >
                    <polygon
                      className={hoveredGroup === 'third-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Third Floor"
                      data-tip="third-floor"
                      points="1132.38 418.42 1132.38 419.64 1132.36 418.42 1132.38 418.42 737.04 386.21 736.15 452.59 736.15 500.05 630.52 483.24 364.53 482.82 461.85 423.36 652 306.98 737.04 386.21"/>
                    <polygon
                    data-image="Third Floor"
                    data-tip="third-floor"
                      className={hoveredGroup === 'third-floor' ? styles.st1Hovers : styles.st0}
                      points="1132.38 419.64 1132.38 478.96 770.24 480.79 768.71 418.42 771.16 418.45 777.5 418.45 768.71 418.42 771.24 319.36 797.83 230.62 1110.83 226.73 1130.55 319.02 1132.36 418.42 1132.38 419.64 1639.13 469.32 1639.13 487.21 1173.66 489.21 1173.5 458.17 1172.81 379.98 1269.04 266.17 1388.51 338.85 1407.25 326.66 1533.2 404.66 1639.13 469.32"/>
                </g>

                <g
                    onMouseEnter={() => handleBackMouseEnter('second-floor')}
                    onMouseLeave={handleBackMouseLeave}
                    data-image="Second Floor"
                    data-tip="second-floor"
                  >
                    <polygon  className={hoveredGroup === 'second-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Second Floor"
                      data-tip="second-floor" points="248.2 558.75 665.53 558.75 733.25 560.59 733.25 509.68 629.3 495.46 431.64 493.63 346.8 493.63 248.37 554.48 248.2 558.75"/>
                    <polygon  className={hoveredGroup === 'second-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Second Floor"
                      data-tip="second-floor" points="768.71 489.21 768.71 553.87 1132.38 553.87 1132.38 491.5 768.71 489.21 1175.95 508.31 1175.95 557.83 1640.27 551.89 1639.13 494.56 1175.95 497.3 1175.95 508.31"/>
                </g>

                <g
                    onMouseEnter={() => handleBackMouseEnter('first-floor')}
                    onMouseLeave={handleBackMouseLeave}
                    data-image="First Floor"
                    data-tip="first-floor"
                  >
                    <polygon  className={hoveredGroup === 'first-floor' ? styles.st1Hovers : styles.st0}
                      data-image="First Floor"
                      data-tip="first-floor" points="246.94 626.01 662.62 626.62 733.25 622.34 733.25 570.37 662.93 569.15 247.63 569.64 246.94 626.01 768.71 569.15 770.55 569.14 1132.38 567.01 1132.38 626.62 768.71 626.62 768.71 569.15"/>
                    <polygon  className={hoveredGroup === 'first-floor' ? styles.st1Hovers : styles.st0}
                      data-image="First Floor"
                      data-tip="first-floor" points="1175.95 570.67 1175.95 625.4 1255.13 626.62 1430.62 629.38 1641.58 629.38 1640.51 564.87 1292.43 564.87 1175.95 570.67"/>
                </g>

                <g
                    onMouseEnter={() => handleBackMouseEnter('ground-floor')}
                    onMouseLeave={handleBackMouseLeave}
                    data-image="Ground Floor"
                    data-tip="ground-floor"
                  >
                    <polygon className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Ground Floor"
                      data-tip="ground-floor" points="245.49 695.11 447.58 698.78 629.49 700.46 732.83 681.2 732.83 636.41 677.8 636.41 630.71 639.47 246.71 637.94 245.49 695.11"/>
                    <path className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Ground Floor"
                      data-tip="ground-floor" d="M1643,706.88l-388.28,1.83-81.17-5,1.83-66.5,79.34,3.21h387.51Z"/>
                    <rect className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
                      data-image="Ground Floor"
                      data-tip="ground-floor" x="768.71" y="638.76" width="363.67" height="66.95"/>
                </g>

                <polygon className={styles.st0}
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1" points="245.91 700.46 288.56 713.76 427.75 731.87 430.5 731.87 430.5 708.94 245.91 700.46 1644.03 717.12 1644.03 785.45 1136.2 785.45 1131.16 777.81 1090.65 777.81 886.27 772 863.34 785.45 563.87 749.53 550.73 747.92 550.73 713.76 756.79 713.76 811.21 717.12 1130.09 717.12 1138.34 722.12 1231.59 722.12 1644.03 717.12"/>

                <polygon className={styles.st0}
                  data-image="Valley Floor 2"
                  data-tip="valley-floor-2" points="1031.95 789.88 1137.43 797.22 1644.03 799.06 1644.03 867.85 1031.95 803.64 1031.95 789.88"/>

            </svg>
              
            )
            :
            (

          !snowMode?
          (
                      

          <svg
            ref={svgRef}
            version="1.1"
            id={styles.masker}
            viewBox="0 0 1920 1080"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            xmlSpace="preserve"
          >

            <polygon
              className={styles.st0}
              data-image="Valley Floor 6"
              data-tip="valley-floor-6"
              points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
            />

            <polyline
              data-image="Valley Floor 6"
              data-tip="valley-floor-6"
              className={styles.st0}
              points="428.82 874.84 428.82 924.18 687.17 922.66 944.59 917.15 1182.1 917.15 1182.1 867.93 824.98 871.37 680.44 873.59 625.87 873.43 428.82 874.84"
            />

            <polygon
              data-image="Valley Floor 5"
              data-tip="valley-floor-5"
              className={styles.st0}
              points="428.82 814.12 428.82 866.55 596.18 865.48 699.52 863.34 750.12 862.73 830.77 860.59 946.99 859.98 1182.15 860.9 1182.1 810.83 853.77 812.29 733.87 813.51 621.94 814.12 428.82 814.12"
            />
            <polygon
              data-image="Valley Floor 4"
              data-tip="valley-floor-4"
              className={styles.st0}
              points="1362.91 754.5 1362.91 803.11 822.18 804.64 428.82 804.64 428.82 754.5 1362.91 754.5"
            />
            <path
              className={styles.st0}
              data-image="Valley Floor 3"
              data-tip="valley-floor-3"
              d="M1512.8,698v44.71l-78.35-.69-370.09,4.51H872.44l-171.52-1.22-104.25,1.22-167.39.16V695.19H701.54l119.75.48,33,2.28,253.23.3h97.53Z"
            />
            <path
              className={styles.st0}
              data-image="Valley Floor 2"
              data-tip="valley-floor-2"
              d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
            />
            <path
              className={styles.st0}
              data-image="Valley Floor 1"
              data-tip="valley-floor-1"
              d="M429,575.19q.16,25.3.31,50.6l182.37-.31h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l157.61,1.83V589.71l-150.88.92-17.74-5.2-139.1.92L1169,584.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,575.34l-43.72,1.53H624.18l-30-1.53Z"
            />

            <path
              className={styles.st0}
              data-image="Ground Floor"
              data-tip="ground-floor"
              d="M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z M783.06,519.38v50.14l-21.14-.5-63.14-1.46H611.65l-182.37.31q-.15-25.3-.31-50.6l165.25.15,30,1.53h29.05L697,517.42Z"
            />

            <path
              className={styles.st0}
              data-image="First Floor"
              data-tip="first-floor"
              d="M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-1.61V472.85L1343.65,474l21.55,7.57,147.75-.15Z M783.06,461v50.14l-21.14-.49-63.14-1.47H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
            />

            <path
              className={styles.st0}
              data-image="Second Floor"
              data-tip="second-floor"
              d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z M1143.32,416.82h205.14l16.51,3.52,72,0,75.32,48.27v4.74l-82.24.61h-65.43l-17.12-8.4-204.31.38Z M783.06,403.58v47.89l-21.14-.5-62,.78H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
            />

            <path
              onMouseEnter={() => setSelectedPath(true)}
              onMouseLeave={() => setSelectedPath(false)}
              data-image="Third Floor"
              data-tip="third-floor"
              className={!selectedPath ? styles.st0 : styles.st1Hovers}
              d="M1420.24,409.94H1206.3L1143,410q.16-20.67.31-41.35l46.47-106.09,176.1,112.81L1391,391.9Z M783.06,366c0,9.36,0,20,0,29.35-13.29,0-29.29-.52-42.58-.54H720.32c-44,.53-85.62-1.37-129.65-.84l-161.43,1.38.19-13.42L607.37,263.8l13.76,15.29L709.79,221h1.45Z"
            />
            <polygon
              onMouseEnter={() => setSelectedPath(true)}
              onMouseLeave={() => setSelectedPath(false)}
              data-image="Third Floor"
              data-tip="third-floor"
              className={!selectedPath ? styles.st0 : styles.st1Hovers}
              points="820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"
            />

          </svg>

            // <FrontSvgs selectedPath ={selectedPath} svgRef={svgRef} setSelectedPath={setSelectedPath} />

            )
            :
            (
                    
              <svg
                ref={svgRef}
                version="1.1"
                id={styles.masker}
                viewBox="0 0 1920 1080"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                xmlSpace="preserve"
              >

                <polygon
                  className={styles.st0}
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
                />

                <polyline
                  data-image="Valley Floor 6"
                  data-tip="valley-floor-6"
                  className={styles.st0}
                  points="428.82 874.84 428.82 924.18 687.17 922.66 944.59 917.15 1182.1 917.15 1182.1 867.93 824.98 871.37 680.44 873.59 625.87 873.43 428.82 874.84"
                />

                <polygon
                  data-image="Valley Floor 5"
                  data-tip="valley-floor-5"
                  className={styles.st0}
                  points="428.82 814.12 428.82 866.55 596.18 865.48 699.52 863.34 750.12 862.73 830.77 860.59 946.99 859.98 1182.15 860.9 1182.1 810.83 853.77 812.29 733.87 813.51 621.94 814.12 428.82 814.12"
                />
                <polygon
                  data-image="Valley Floor 4"
                  data-tip="valley-floor-4"
                  className={styles.st0}
                  points="1362.91 754.5 1362.91 803.11 822.18 804.64 428.82 804.64 428.82 754.5 1362.91 754.5"
                />
                <path
                  className={styles.st0}
                  data-image="Valley Floor 3"
                  data-tip="valley-floor-3"
                  d="M1512.8,698v44.71l-78.35-.69-370.09,4.51H872.44l-171.52-1.22-104.25,1.22-167.39.16V695.19H701.54l119.75.48,33,2.28,253.23.3h97.53Z"
                />
                <path
                  className={styles.st0}
                  data-image="Valley Floor 2"
                  data-tip="valley-floor-2"
                  d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
                />
                <path
                  className={styles.st0}
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1"
                  d="M429,575.19q.16,25.3.31,50.6l182.37-.31h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l157.61,1.83V589.71l-150.88.92-17.74-5.2-139.1.92L1169,584.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,575.34l-43.72,1.53H624.18l-30-1.53Z"
                />

                <path
                  className={styles.st0}
                  data-image="Ground Floor"
                  data-tip="ground-floor"
                  d="M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z M783.06,519.38v50.14l-21.14-.5-63.14-1.46H611.65l-182.37.31q-.15-25.3-.31-50.6l165.25.15,30,1.53h29.05L697,517.42Z"
                />

                <path
                  className={styles.st0}
                  data-image="First Floor"
                  data-tip="first-floor"
                  d="M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-1.61V472.85L1343.65,474l21.55,7.57,147.75-.15Z M783.06,461v50.14l-21.14-.49-63.14-1.47H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
                />

                <path
                  className={styles.st0}
                  data-image="Second Floor"
                  data-tip="second-floor"
                  d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z M1143.32,416.82h205.14l16.51,3.52,72,0,75.32,48.27v4.74l-82.24.61h-65.43l-17.12-8.4-204.31.38Z M783.06,403.58v47.89l-21.14-.5-62,.78H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
                />

                <path
                  onMouseEnter={() => setSelectedPath(true)}
                  onMouseLeave={() => setSelectedPath(false)}
                  data-image="Third Floor"
                  data-tip="third-floor"
                  className={!selectedPath ? styles.st0 : styles.st1Hovers}
                  d="M1420.24,409.94H1206.3L1143,410q.16-20.67.31-41.35l46.47-106.09,176.1,112.81L1391,391.9Z M783.06,366c0,9.36,0,20,0,29.35-13.29,0-29.29-.52-42.58-.54H720.32c-44,.53-85.62-1.37-129.65-.84l-161.43,1.38.19-13.42L607.37,263.8l13.76,15.29L709.79,221h1.45Z"
                />
                <polygon
                  onMouseEnter={() => setSelectedPath(true)}
                  onMouseLeave={() => setSelectedPath(false)}
                  data-image="Third Floor"
                  data-tip="third-floor"
                  className={!selectedPath ? styles.st0 : styles.st1Hovers}
                  points="820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"
                />

                {/* <polygon data-image="Third Floor"
                  data-tip="third-floor"
                  className={!selectedPath ? styles.st0 : styles.st1Hovers} points="820.92 401.99 1099.29 401.99 1097.15 338.02 1084.16 264.06 838.68 264.06 823.37 337.56 820.92 401.99 435.62 391.22 613.33 281.15 625.02 291.47 716.06 235.75 784.62 336.19 783.06 396.72 623.42 393.74 435.62 391.22 1416.64 409.79 1360.62 409.79 1138.89 407.5 1138.89 341.69 1186.81 271.75 1360.62 376.54 1416.64 409.79"/>

                <path  className={styles.st0}
                  data-image="Second Floor"
                  data-tip="second-floor" d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z M1143.32,416.82h205.14l16.51,3.52,72,0c25.1,16.09,43.87,27.67,69,43.76v9.25l-75.89.61h-65.43l-17.12-8.4-204.31.38Z M783.06,404.58v47.89l-21.14-.5-62,.78H611.65l-175.87.31q-.15-25.31-.31-50.6l158.75.15,30,1.53"/>
                <polygon  className={styles.st0}
                  data-image="Second Floor"
                  data-tip="second-floor" points="783.06 451.72 783.06 458.99 761.92 459.07 761.92 451.23 783.06 451.72"/> */}

              {/* <path class="cls-1" d="M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z" transform="translate(-435.31 -451.23)"/><path class="cls-1" d="M1507.06,526.27h-99.21l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-1.61V472.85L1343.65,474l21.55,7.57,141.94-.15Z" transform="translate(-435.31 -451.23)"/><polygon class="cls-2" points="347.75 57.9 347.75 66.15 326.61 66.22 326.61 57.41 347.75 57.9"/><polygon class="cls-2" points="347.75 0.49 347.75 7.76 326.61 7.84 326.61 0 347.75 0.49"/><line class="cls-1" x1="261.64" y1="7.8" x2="297.41" y2="9.94"/><path class="cls-1" d="M783.06,464v50.14l-21.14-.49-63.14-1.47H611.65c-60.79.1-115.24-.67-176-.57q-.15-25.31-.31-50.6c55.09.05,103.83,1,158.91,1l30,1.53" transform="translate(-435.31 -451.23)"/> */}

                {/* <path className={styles.st0}
                  data-image="Valley Floor 1"
                  data-tip="valley-floor-1" d="M432.18,579.19c.1,16.87-.1,33.4,0,50.27,60.79-.1,118.68.13,179.47,0h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l153.1,1.83V593.71l-146.37.92-17.74-5.2-139.1.92L1169,588.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,579.34l-43.72,1.53H624.18l-30-1.53Z"/>

                <path className={styles.st0}
                  data-image="Ground Floor"
                  data-tip="ground-floor" d="M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1507.22,534.93q-.08,23-.16,46c-50-.51-94.39-1-144.38-1.53l-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z M783.06,521.38v50.14l-21.14-.5-63.14-1.46H611.65c-60.79.1-118.71-1.21-179.49-1.1-.11-16.87.11-32.21,0-49.07,55.09.05,107,0,162.06,0l30,1.53h29.05L697,519.42"/>
                <polygon className={styles.st0}
                  data-image="Ground Floor"
                  data-tip="ground-floor" points="783.06 509.13 783.06 517.38 761.92 517.45 761.92 508.64 783.06 509.13"/> */}

              </svg>


                  )
                
              )
            ))}


        {tooltipContent && backView && (
           <div
           className={`${styles.tooltip} ${!tooltipVisible ? styles.fadeOut : ''}`}
           style={{
             left: `${tooltipPosition.x}px`,
             top: `${tooltipPosition.y}px`,
           }}
         >
              <div className={styles.tooltipContent}>
                <div className={styles.tooltipLetter}>
                  <Image
                    src="/svg/buildingw.svg"
                    quality={100}
                    alt="tooltip"
                    height={60}
                    width={60}
                  />
                </div>
                <div className={styles.tooltipInfo}>
                  <div className={styles.tooltipFloor}>
                    {tooltipContent.floorName}
                  </div>
                  {tooltipContent.floorName === "Valley Floor 2" ? (
                      <span className={styles.tooltipUnits}>{translations["parkinglot"]}</span>
                    ) : (filterbox && selectedAmenities.length !== 0) || (filterFloorMenu && selectedAmenities.length !== 0) ? (
                      <>
                        <div className={styles.tooltipFloor}>
                          {translations["apartment"]}: <span className={styles.tooltipUnits}> {tooltipContent.apartmentNum} </span>
                        </div>
                        <div className={styles.tooltipFloor}>
                          {tooltipContent.apartmentType === "Penthouse" || tooltipContent.apartmentType === "Studio" 
                            ? tooltipContent.apartmentType
                            : `${tooltipContent.bedroomCount} ${tooltipContent.apartmentType}`}
                        </div>
                      </>
                    ) : (
                      <div className={styles.tooltipUnits}>
                        {tooltipContent.totalUnits} Units
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {tooltipContent && !backView && (
           <div
           className={`${styles.tooltip} ${!tooltipVisible ? styles.fadeOut : ''}`}
           style={{
             left: `${tooltipPosition.x}px`,
             top: `${tooltipPosition.y}px`,
           }}
         >
              <div className={styles.tooltipContent}>
                <div className={styles.tooltipLetter}>
                  <Image
                    src="/svg/buildingw.svg"
                    quality={100}
                    alt="tooltip"
                    height={60}
                    width={60}
                  />
                </div>
                <div className={styles.tooltipInfo}>
                  <div className={styles.tooltipFloor}>
                    {tooltipContent.floorName}
                  </div>
                  {tooltipContent.floorName === "Valley Floor 2" ? (
                      <span className={styles.tooltipUnits}>{translations["parkinglot"]}</span>
                    ) : (filterbox && selectedAmenities.length !== 0) || (filterFloorMenu && selectedAmenities.length !== 0) ? (
                      <>
                        <div className={styles.tooltipFloor}>
                          {translations["apartment"]}: <span className={styles.tooltipUnits}> {tooltipContent.apartmentNum} </span>
                        </div>
                        <div className={styles.tooltipFloor}>
                          {tooltipContent.apartmentType === "Penthouse" || tooltipContent.apartmentType === "Studio" 
                            ? tooltipContent.apartmentType
                            : `${tooltipContent.bedroomCount} ${tooltipContent.apartmentType}`}
                        </div>
                      </>
                    ) : (
                      <div className={styles.tooltipUnits}>
                        {tooltipContent.totalUnits} Units
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>

        {!isMobile && (
          <>
            {reservedClicked && (
              <div
                className={styles.reservedContainer}
                ref={apartmentListingRef}
              >
                <ApartmentListing
                  onInterested={handleCall}
                  apartments={favoriteApartments}
                />
              </div>
            )}

            <div className={styles.topLogoContainer}>
              <Image
                src="/Webpage/floors/HarsukhLogo.webp"
                quality={100}
                alt="bird"
                height={105}
                width={180}
                style={{cursor: "pointer"}}
              />
            </div>
           
          <div className={styles.backviewOutside}>
            <div className={styles.backViewButton} onClick={handleBackView}>
              <div className={styles.backViewButtonLeft}>
                <Image
                  src="/images/icons/amenitiesIcon.svg"
                  quality={100}
                  alt="Menu"
                  height={20}
                  width={20}
                />
              </div>
              <div className={styles.backViewButtonTitle}>{translations["rotate"]}</div>
            </div>
          </div>

            {/* <div className={styles.filterElevationContainer}> */}

            <div className={styles.filterElevationContainer}>
              <div className={ElevStyles.elevationButtonBox} ref={elevationRef}>
                <div
                  className={`${ElevStyles.elevationBtnGrid} ${
                    isElevationOpen ? ElevStyles.open : ""
                  }`}
                >
                  <div
                    className={ElevStyles.elevationBtnLeft}
                    onClick={() => router.push("/mapview")}
                  >
                    <Image
                      src="/images/icons/LeftArrow.svg"
                      quality={100}
                      alt="Elevation"
                      height={16}
                      width={16}
                    />
                  </div>
                  <div
                    className={ElevStyles.elevationBtnRight}
                    // onMouseEnter={() => setIsElevationOpen(true)}
                    // onMouseLeave={() => setIsElevationOpen(false)}
                    onClick={elevationDropdown}
                  >
                    <div className={ElevStyles.elevationBtnTitle}>
                      {!isElevationOpen
                        ? translations.elevation || "Elevation"
                        : translations.location || "Location"}
                    </div>
                    <div className={ElevStyles.elevationBtnDownArrow}>
                      <Image
                        src="/images/icons/downFillArrow.svg"
                        quality={100}
                        alt="Elevation"
                        height={7}
                        width={7}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`${ElevStyles.dropDownElevationBox} ${
                    isElevationOpen ? ElevStyles.open : ""
                  }`}
                  // onMouseEnter={() => setIsElevationOpen(true)}
                >
                  {elevationArray.map((item) => (
                  <div
                  key={item.id}
                  onClick={() => handleElevationItemClick(item.route)}
                  className={`${ElevStyles.dropDownfloorButton} ${item.label === translations['elevation'] ? ElevStyles.active : ''}`}
                >
                  { item.label}
                </div>
                  ))}
                </div>
              </div>


              <div
                className={`${styles.filterContainer}`}
                onClick={handleFilter}
                ref={filterButtonRef}
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
                  <div className={styles.filtersButtonTitle}>{translations["filter"]}</div>
                </div>
              </div>
            </div>

            <div className={styles.bottomLogoContainer}>
              <div className={styles.bottomLogoContainerTitle}>
                  {translations["projectby"]}
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  cursor: 'pointer'
                }}
                onClick={() => window.open("https://almaymaar.com/", "_blank")}
              >
                <Image
                  className={styles.bottomLogoIcon}
                  style={{ cursor: "pointer" }}
                  src="/Webpage/floors/MainLogo.png"
                  quality={100}
                  alt="Almaymar"
                  height={24}
                  width={190}
                />
              </div>
            </div>

            <div className={styles.container}>
              
              <div
                className={`${styles.buttonss} ${styles.mapButton} ${
                  isMapHovered ? styles.expanded : ""
                }`}
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
                onClick={handleGetDirections}
              >
                <Image
                  src="/images/icons/mapsViewIcon.svg"
                  quality={100}
                  alt="Maps View Icon"
                  height={15}
                  width={15}
                />
                <div className={styles.buttonText}>{translations["direction"]}</div>
              </div>

              <div
                className={`${styles.buttonss} ${styles.callButton} ${
                  isCallHovered ? styles.expanded : ""
                }`}
                onMouseEnter={() => setIsCallHovered(true)}
                onMouseLeave={() => setIsCallHovered(false)}
                onClick={handleCallClick}
              >
                <Image
                  src="/images/icons/callIcon.svg"
                  quality={100}
                  alt="Call Us Icon"
                  height={16}
                  width={16}
                />
                <div className={styles.buttonText}>{translations["callus"]}</div>
              </div>
            
              <div
                className={`${styles.buttonss} ${styles.formButton} ${
                  isFormHovered ? styles.expanded : ""
                }`}
                onMouseEnter={() => setIsFormHovered(true)}
                onMouseLeave={() => setIsFormHovered(false)}
                onClick={handleCall}
              >
                <Image
                  src="/images/icons/formIcon.svg"
                  quality={100}
                  alt="Request Register Icon"
                  height={18}
                  width={18}
                />
                <div className={styles.buttonText}>{translations["reqRegister"]}</div>
              </div>
            </div>

            <div className={styles.menuContainer}>
              <div ref={amenityButtonRef}>
                <AmenityBtn
                  translations={translations}
                  // ref={amenityButtonRef}
                  handleMenu={handleAmenities}
                  inActive={amenityClicked}
                />
              </div>

              <div className={styles.menuContainerInside} ref={favContainerRef}>
                <FavButton
                  inActive={reservedClicked}
                  handleMenu={handleFavorties}
                  count={favoriteApartments.length}

                />
              </div>
              <div
                className={styles.menuContainerInside}
                ref={menuContainerRef}
              >
                <MenubarButton inActive={menuBox} handleMenu={handleMenu} />
              </div>

            </div>

            <div styles={{zIndex:'100000', position:'absolute', top:'0', left:'0', right:'0', bottom:'0'}} >
              <MenuBox
                ref={menuBoxRef}
                refAmen ={amenityButtonRef}
                isActive={menuBox}
                handleContact={handleContact}
                handleOverlay={handleOverlay}
                translations={translations}
                toggleLanguage={toggleLanguage}
                overlay={overlay}
                fullScreen={isFullScreen}
                toggleFullScreen={handleToggleFullScreen}
              />
            </div>

            { !backView &&
              <div className={styles.snowContainer}>
                <SnowButton
                  inActive={snowMode}
                  handleMenu={handleSnowMode}

                />
              </div>
            }
            
            { amenityClicked && (
              <div >
                <AmenityGrid Amenref={amenityGridRef} onClose={handleAmenitiesCheck} isMobile={isMobile} />
              </div>
            )}
            {isFilterBoxVisible && (
              <FilterBox
                isMobile={isMobile}
                onClose={closeFilterBox}
                Filterref={filterBoxRef}
                isVisible={isFilterBoxVisible}
              />
            )}
          </>
        )}
      </div>

      {isContacted && (
        <div className={styles.ContactedContainer}>
          <ContactBox onClose={handleContactClose} />
        </div>
      )}

      
    {isContactusClicked && (
          <div className={styles.ContactedContainer}>
              <ContactUsPopup onClose={handleContact} />
          </div>
      )}

      {isMobile && (
        <>

          {/* {isContactusClicked && (
            <div className={styles.ContactedContainer}>
                <ContactUsPopup onClose={handleContact} />
            </div>
          )} */}

          <div className={styles.topLogoContainer}>
            <Image
              style={{cursor: 'pointer'}}
              src="/Webpage/floors/HarsukhLogo.webp"
              quality={100}
              alt="bird"
              height={85}
              width={150}
            />
          </div>         

          <div className={styles.bottomLogoContainer}>
            <div className={styles.bottomLogoContainerTitle}>{translations["projectby"]}</div>
            <div
              onClick={() => router.push("https://almaymaar.com/")}
            >
              <Image
                style={{cursor:"pointer"}}
                src="/Webpage/floors/MainLogo.png"
                quality={100}
                alt="Almaymar"
                height={22}
                
                width={140}
              />
            </div>
          </div>

          
          {amenityClicked && (
              <div>
                <AmenityGrid Amenref={amenityGridRef} onClose={handleAmenitiesCheck} isMobile={isMobile} />
              </div>
            )}


          <div className={styles.menuContainer}>
            <div className={styles.menuContainerInside} ref={menuContainerRef}>
              <MenubarButton inActive={menuBox} handleMenu={handleMenu} />
            </div>
          </div>


          <div styles={{zIndex:'100000', position:'absolute'}} >

            <MenuBox
              isMobile={isMobile}
              ref={menuBoxRef}
              refAmen ={amenityButtonRef}
              setMenuBox={setMenuBox}
              isActive={menuBox}
              handleOverlay={handleOverlay}
              handleFilter={handleFilter}
              translations={translations}
              toggleLanguage={toggleLanguage}
              overlay={overlay}
              fullScreen={isFullScreen}
              toggleFullScreen={handleToggleFullScreen}
              amenitiesBtn={handleAmenities}
              handleElevation={handleElevationClicked}

            />
          </div>

          { !backView &&
            <div className={styles.snowContainer}>
              <SnowButton
                inActive={snowMode}
                handleMenu={handleSnowMode}

              />
            </div>
          }

          {isFilterBoxVisible && (
              <FilterBox
                isMobile={isMobile}
                onClose={closeFilterBox}
                Filterref={filterBoxRef}
                isVisible={isFilterBoxVisible}
              />
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

          <div className={styles.backviewOutside}>
            <div className={styles.backViewButton} onClick={handleBackView}>
              <div className={styles.backViewButtonLeft}>
                <Image
                  src="/images/icons/amenitiesIcon.svg"
                  quality={100}
                  alt="Menu"
                  height={20}
                  width={20}
                />
              </div>
              <div className={styles.backViewButtonTitle}>{translations["rotate"]}</div>
            </div>
          </div>
        
          <div className={styles.container}>

             <div
              className={`${styles.buttonss} ${styles.callButton} ${
                isCallHovered ? styles.expanded : ""
              }`}
              onMouseEnter={() => setIsCallHovered(true)}
              onMouseLeave={() => setIsCallHovered(false)}
              onClick={handleCallClick}
            >
              <Image
                src="/images/icons/callIcon.svg"
                quality={100}
                alt="Maps View Icon"
                height={15}
                width={15}
              />
              <div className={styles.buttonText}>{translations["callus"]}</div>
            </div>

            <div
              className={`${styles.buttonss} ${styles.formButton} ${
                isFormHovered ? styles.expanded : ""
              }`}
              onMouseEnter={() => setIsFormHovered(true)}
              onMouseLeave={() => setIsFormHovered(false)}
              onClick={handleCall}
            >
              <Image
                src="/images/icons/formIcon.svg"
                quality={100}
                alt="Maps View Icon"
                height={15}
                width={15}
              />
              <div className={styles.buttonText}>{translations["reqRegister"]}</div>
            </div>

          <div
              className={`${styles.buttonss} ${styles.mapButton} ${
                isMapHovered ? styles.expanded : ""
              }`}
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
              <div className={styles.buttonText}>{translations["direction"]}</div>
            </div>

          </div>
         
        </>
      )}

    </>
  );
}