
// Client-side component
"use client";
import styles from "@/styles/Floor/floorLayout.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyLanguage } from "@/state/language/languageState";

import FavButton from "@/app/component/Icons/favButton";
import MenubarButton from "@/app/component/Icons/menuBarBtn";
import { useRouter } from "next/navigation";
import { useRegisterForm } from "@/app/component/hooks/useRegisterForm"

// Import translations
import AmenityGrid from "@/app/component/ui/Amenities/AmenityGrid";
import ContactBox from "@/app/component/ui/Bars/contactBox";
import FloorMenuBox from "@/app/component/ui/Bars/FloorMenuBox";
import AmenityBtn from "@/app/component/Icons/AmenityBtn";
import ApartmentListing from "@/app/component/ui/Reserve/ApartmentListing";
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
// import ElevationBox from "../component/ui/Bars/elevationBox";
import { toggleElevation  } from "@/state/Elevation/ElevationState";
import { toggleFloorMenu } from "@/state/floor/FloorMenu";
import { useParams } from 'next/navigation';
import ContactUsPopup from "@/app/component/modules/contactus/page";
// /component/modules/contactus/page";
import { toggleFullScreen } from '@/state/fullScreen/fullScreen';
// import FloorMenu from "../component/ui/floor/floorMenu";

const Layout = ({ children }) => {
  
  const dispatch = useDispatch();
  const router = useRouter();
  const [isContacted, setIsContacted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [apartmentType, setApartmentType] = useState(null);

  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const [reservedClicked, setReservedClicked] = useState(false);
  const [isContactusClicked, setContactUs]= useState(false);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isCallHovered, setIsCallHovered] = useState(false);

  const [language, setLanguage] = useState(languageState === "ur");
  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );
  const favoriteApartments = useSelector(
    (state) => state.favoriteApartments.favoriteApartments
  );
  const menuContainerRef = useRef(null);
  const menuBoxRef = useRef(null);
  const { isFormOpen, openForm, closeForm } = useRegisterForm();

 

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


  const closeMenu = () => {
    setMenuBox(false);
  };

  const handleContact = () => {
    closeMenu()
    setContactUs(!isContactusClicked)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, [handleMenuClickOutside]);

  const handleMenu = () => {

    setMenuBox((prev) => !prev);
  };

  const handleOverlay = () => {
    closeMenu();

    setOverlay(!overlay);
  };

  const handleCall = () => {
    openForm();
    setReservedClicked(false);
        // setIsContacted(!isContacted);
  };
  const handleContactClose = () => {
    closeMenu();

    setIsContacted(false);
  };
  
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
    document.addEventListener("mousedown", handleFavClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleFavClickOutside);
    };
  }, [handleFavClickOutside]);

  const handleFavorties = () => {
    setReservedClicked((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(!language);
        closeMenu();
  };

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? "ur" : "en" }));
  }, [language, dispatch]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const amenityButtonRef = useRef(null);
  const amenityGridRef = useRef(null);
  const [amenityClicked, setAmenityClicked] = useState(false);
  
  const handleAmenitiesCheck = useCallback(() => {
    setAmenityClicked(false);
  }, []);

  
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

  // const handleAmenitiesClickOutside = useCallback((event) => {
  //   if (
  //     amenityButtonRef.current &&
  //     !amenityButtonRef.current.contains(event.target) &&
  //     amenityGridRef.current &&
  //     !amenityGridRef.current.contains(event.target)
  //   ) {
  //     setAmenityClicked(false);
  //   }
  // }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleAmenitiesClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleAmenitiesClickOutside);
    };
  }, [handleAmenitiesClickOutside]);

  const handleAmenities = useCallback(() => {
    setAmenityClicked((prev) => !prev);
        closeMenu();

  }, []);
  
  const updateAmenityClicked = (value) => {
    setAmenityClicked(value);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleGetDirections = () => {
    // Coordinates for HARSUKH
    const destination = '34.0162791,73.3928231';
    
    // Create the URL for Google Maps directions with the destination
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
  };


  const [isElevationClicked, setElevationClicked] = useState(false);
  const [isFloorClicked, setFloorClicked] = useState(false);

  const handleElevationClicked = () => {
    dispatch(toggleElevation());
    closeMenu();
    setElevationClicked(!isElevationClicked);
  };

  const handleClickOutside = useCallback((event) => {
    if (
      (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) &&
      (menuBoxRef.current && !menuBoxRef.current.contains(event.target)) &&
      (favContainerRef.current && !favContainerRef.current.contains(event.target)) &&
      (apartmentListingRef.current && !apartmentListingRef.current.contains(event.target)) &&
      (amenityButtonRef.current && !amenityButtonRef.current.contains(event.target)) &&
      (amenityGridRef.current && !amenityGridRef.current.contains(event.target))
    ) {
      setMenuBox(false);
      setReservedClicked(false);
      setAmenityClicked(false);
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFloorMenuClicked = () => {
    dispatch(toggleFloorMenu());
    closeMenu();

    setFloorClicked(!isFloorClicked);
  };

  const params = useParams();


  const [elevationArray, setElevationArray] = useState([]);
  const [currentFloorLabel, setCurrentFloor ] = useState(null);

  const totalFloor = [
    { id: 'third-floor', label: translations.thirdfloor || 'Third Floor' },
    { id: 'second-floor', label: translations.secondfloor || 'Second Floor' },
    { id: 'first-floor', label: translations.firstfloor || 'First Floor' },
    { id: 'ground-floor', label: translations.groundfloor || 'Ground Floor' },
    { id: 'valley-floor-1', label: translations.basement1 || 'Valley Floor 1' },
    { id: 'valley-floor-3', label: translations.basement3 || 'Valley Floor 3' },
    { id: 'valley-floor-4', label: translations.basement4 || 'Valley Floor 4' },
    { id: 'valley-floor-5', label: translations.basement5 || 'Valley Floor 5' },
    { id: 'valley-floor-6', label: translations.basement6 || 'Valley Floor 6' },
  ];

  useEffect(() => {
    const { floor } = params;
    const currentFloor = totalFloor.find(item => item.id === floor);
    const floorLabel = currentFloor ? currentFloor.label : `Floor ${floor}`;
    setCurrentFloor(floorLabel)
    setElevationArray([
      { id: '1', label: translations["mapview"], route: '/map-view' },

      { id: '2', label: translations["elevation"], route: '/explore' },
      { id: '3', label: floorLabel, route: `/${floor}` },
    ]);
  }, [params, translations]);



  const [originalPath, setOriginalPath] = useState('');

  useEffect(() => {
    setOriginalPath(window.location.pathname);
  }, []);


  const updateURL = (params) => {
    const url = new URL(window.location.href);
    url.search = '';
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null) {
        url.searchParams.set(key, value);
      }
    });
    const newURL = `/${url.search}`;
    window.history.pushState({}, '', newURL);
  };

  const restoreOriginalPath = () => {
    window.history.pushState({}, '', originalPath);
  };

  const handleCallClick = useCallback(() => {
    updateURL({ callus: 'true' });
    window.location.href = 'tel:051-111-520-520';
    setTimeout(() => {
      restoreOriginalPath();
    }, 1000);
  }, [originalPath]);


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



  return (
    <>
      <div
        style={{
          position: "absolute",
          background: "#013A40",
          height: "100vh",
          width: "100%",
        }}
      >

        <div style={{

          position: "absolute",
          height: "100vh",
          width: "100%",
          display:'flex',
          justifyContent: "center",
          alignItems: "center"
        }}>

          <div style={{
            background: "#FCF7EB",
            height: "30vh",
            width: "25vw",
            borderRadius: "50%",
            opacity: '0.5',
            filter: 'blur(150px)',
          }}>

          </div>

        </div>

        {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}

        {/* <div
          className={`${styles.transitionContainer} ${
            isTransitioning ? styles.fadeOut : styles.fadeIn
          }`}
        > */}
        <div>

          {React.cloneElement(children, {
            amenityClicked,
            updateAmenityClicked,
          })}
        </div>

        {/* </Suspense> */}

        {/* <FloorMenu /> */}

        
          {/* <div style={{overflow:"none", zIndex: '10000'}}>
              <Gallery
                  apartmentType={apartmentType} 
                  isOpen={isGalleryPressed} 
                  onClose={closeGallery}
              />
            </div> */}

        {!isMobile ? (
          <>
            <div className={styles.menuContainer}>
              <div ref={amenityButtonRef}>
                <AmenityBtn
                  translations={translations}
                  ref={amenityButtonRef}
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
          </>
        ) : (
          <>
          <div className={styles.menuContainerOutside}>

            <div className={styles.menuContainer}>
              <div
                className={styles.menuContainerInside}
                ref={menuContainerRef}
              >
                <MenubarButton inActive={menuBox} handleMenu={handleMenu} />
              </div>

              <div className={styles.menuContainerInside} ref={favContainerRef}>
                <FavButton
                  inActive={reservedClicked}
                  handleMenu={handleFavorties}
                  count={favoriteApartments.length}
                />
              </div>
            </div>
          </div>

          </>
        )}

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
            alt="Maps View Icon"
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
            alt="Maps View Icon"
            height={18}
            width={18}
          />
          <div className={styles.buttonText}>{translations["reqRegister"]}</div>
        </div>
      </div>
    </div>

      <div className={styles.bottomLogoContainer}>
        <div className={styles.bottomLogoContainerTitle}>{translations["projectby"]}</div>
        <div
          style={{
            left: "2.5rem",
            bottom: "8rem",
            position: "relative",
            zIndex: 1,
          }}

        >
          <Image
            style={{ cursor: "pointer" }}
            src="https://cdn.theharsukh.com/Webpage/floors/MainLogo.png"
            quality={100}
            alt="Almaymar"
            height={isMobile? 22:24} 
            width={isMobile? 140: 190} 
            onClick={() => window.open("https://almaymaar.com/", "_blank")}
          />
        </div>
      </div>

      {isFormOpen && (
        <div style={{zIndex:'99999999999'}} className={styles.ContactedContainer}>
          <ContactBox onClose={closeForm} />
        </div>
      )}

      {isContactusClicked && (
          <div className={styles.ContactedContainer}>
              <ContactUsPopup onClose={handleContact} />
          </div>
      )}

        {amenityClicked && (
          <div className={styles.reserveContainerBox}>
            <div ref={amenityGridRef}>
              <AmenityGrid  Amenref={amenityGridRef} isMobile={isMobile} onClose={handleAmenitiesCheck} />
            </div>
          </div>
        )}

      {reservedClicked && (
          <div className={styles.reserveContainerBox}>
            <div className={styles.reservedContainer} ref={apartmentListingRef}>
              <ApartmentListing
                onInterested={handleCall}
                apartments={favoriteApartments}
              />
            </div>
          </div>

          )}
        {/* <div className={styles.reserveContainerBox}> */}

        <FloorMenuBox
          isActive={menuBox}
          ref={menuBoxRef}
          handleContact={handleContact}
          handleAmenities={handleAmenities}
          handleOverlay={handleOverlay}
          translations={translations}
          toggleLanguage={toggleLanguage}
          overlay={overlay}
          fullScreen={isFullScreen}
          toggleFullScreen={handleToggleFullScreen}
          handleElevation={handleElevationClicked}
          handleFloorMenu={handleFloorMenuClicked}
          onCLose={closeMenu}
        /> 
    </>
    
  );
};

export default Layout;
