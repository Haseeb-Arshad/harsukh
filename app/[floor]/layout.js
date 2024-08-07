"use client";
import styles from "@/styles/Floor/floorLayout.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyLanguage } from "../../state/language/languageState";

import FavButton from "@/app/component/Icons/favButton";
import MenubarButton from "@/app/component/Icons/menuBarBtn";
import { useRouter } from "next/navigation";

// Import translations
import AmenityGrid from "../component/Amenities/AmenityGrid";
import ContactBox from "../component/Bars/contactBox";
import FloorMenuBox from "../component/Bars/FloorMenuBox";
import AmenityBtn from "../component/Icons/AmenityBtn";
import ApartmentListing from "../component/Reserve/ApartmentListing";
import en from "../locales/en.json";
import ur from "../locales/ur.json";
import ElevationBox from "../component/Bars/elevationBox";
import { toggleElevation } from "@/state/Elevation/ElevationState";
import { toggleFloorMenu } from "@/state/floor/FloorMenu";
import { useParams } from 'next/navigation';


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isContacted, setIsContacted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [apartmentType, setApartmentType] = useState(null);

  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  // const [language, setLanguage] = useState(false);
  // const [translations, setTranslations] = useState(en);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const [reservedClicked, setReservedClicked] = useState(false);

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
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, [handleMenuClickOutside]);

  const handleMenu = () => {
    setMenuBox((prev) => !prev);
  };

  const handleOverlay = () => {
    setOverlay(!overlay);
  };

  const handleCall = () => {
    setIsContacted(!isContacted);
  };
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
  };

  const handleBackgroundMode = () => {
    console.log("Background Mode clicked");
  };

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

  const handleAmenitiesCheck = () => {
    setAmenityClicked(false);
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

  const handleAmenities = () => {
    setAmenityClicked((prev) => !prev);
  };

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
    console.log("Elevation Clicked")
    dispatch(toggleElevation());

    setElevationClicked(!isElevationClicked);
  };



  
  const handleFloorMenuClicked = () => {
    dispatch(toggleFloorMenu());
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
    { id: 'valley-floor-1', label: translations.basement1 || 'Vallery Floor 1' },
    { id: 'valley-floor-3', label: translations.basement3 || 'Vallery Floor 3' },
    { id: 'valley-floor-4', label: translations.basement4 || 'Vallery Floor 4' },
    { id: 'valley-floor-5', label: translations.basement5 || 'Vallery Floor 5' },
    { id: 'valley-floor-6', label: translations.basement6 || 'Vallery Floor 6' },
  ];

  useEffect(() => {
    const { floor } = params;
    const currentFloor = totalFloor.find(item => item.id === floor);
    const floorLabel = currentFloor ? currentFloor.label : `Floor ${floor}`;
    setCurrentFloor(floorLabel)
    console.log(floorLabel)
    setElevationArray([
      { id: '1', label: translations["mapview"], route: '/mapview' },
      { id: '2', label: translations["elevation"], route: '/' },
      { id: '3', label: floorLabel, route: `/${floor}` },
    ]);
  }, [params, translations]);

  return (
    <>
      <div
        style={{
          position: "relative",
          background: "#013A40",
          height: "100vh",
          width: "100%",
        }}
      >
        {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}

        <div
          className={`${styles.transitionContainer} ${
            isTransitioning ? styles.fadeOut : styles.fadeIn
          }`}
        >
          {React.cloneElement(children, {
            amenityClicked,
            updateAmenityClicked,
          })}
        </div>

        {/* </Suspense> */}

        {/* <FloorMenu /> */}

        {reservedClicked && (
          <div className={styles.reservedContainer}>
            <ApartmentListing
              onInterested={handleCall}
              apartments={favoriteApartments}
            />
          </div>
        )}

        
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
          </>
        )}

        <FloorMenuBox
          isActive={menuBox}
          ref={menuBoxRef}
          handleAmenities={handleAmenities}
          handleOverlay={handleOverlay}
          translations={translations}
          toggleLanguage={toggleLanguage}
          overlay={overlay}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreen}
          handleElevation={handleElevationClicked}
          handleFloorMenu={handleFloorMenuClicked}

        />
        {/* <div className={styles.callContainer} onClick={handleCall}>
        <div className={styles.mapsViewBox}>
          <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
        </div>
      </div> */}

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
              height={17}
              width={17}
            />
            <span className={styles.buttonText}>{translations["direction"]}</span>
          </div>

          <div
            className={`${styles.buttonss} ${styles.callButton} ${
              isCallHovered ? styles.expanded : ""
            }`}
            onMouseEnter={() => setIsCallHovered(true)}
            onMouseLeave={() => setIsCallHovered(false)}
            onClick={handleCall}
          >
            <Image
              src="/images/icons/callIcon.svg"
              quality={100}
              alt="Maps View Icon"
              height={19}
              width={19}
            />
            <span className={styles.buttonText}>{translations["reqRegister"]}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomLogoContainer}>
        <div className={styles.bottomLogoContainerTitle}>{translations["projectBy"]}</div>
        <div
          style={{
            left: "2.5rem",
            bottom: "8rem",
            position: "relative",
            zIndex: 1,
          }}
          onClick={() => window.open("https://almaymaar.com/", "_blank")}
        >
          <Image
            style={{ cursor: "pointer" }}
            src="/Webpage/floors/MainLogo.png"
            quality={100}
            alt="Almaymar"
            height={22}
            width={160}
          />
        </div>
      </div>

      {isContacted && (
        <div className={styles.ContactedContainer}>
          <ContactBox onClose={handleContactClose} />
        </div>
      )}

      {amenityClicked && (
        <div ref={amenityGridRef}>
          <AmenityGrid isMobile={isMobile} onClose={handleAmenitiesCheck} />
        </div>
      )}
    </>
  );
};

export default Layout;
