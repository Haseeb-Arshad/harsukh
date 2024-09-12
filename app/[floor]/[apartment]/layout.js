"use client";
import ContactBox from "@/app/component/ui/Bars/contactBox";
import apartmentData from "@/app/component/data/floorData";
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import { modifyLanguage } from "@/state/language/languageState";
import styles from "@/styles/apartment/apartmentLayout.module.css";
import ElevStyles from "@/styles/elevation.module.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarAnimate from "@/public/json/StarAnimate.json"
import Lottie from "react-lottie";

import {
  addFavoriteApartment,
  removeFavoriteApartment,
} from "@/state/apartment/favApartment";
import ElevationBox from "@/app/component/ui/Bars/elevationBox";
import Gallery from "@/app/component/ui/Gallery/Gallery";
import { setGalleryPressed } from "@/state/gallery/GalleryState";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isContacted, setIsContacted] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [apartmentNum, setApartmentNum] = useState(0);
  const [floor, setFloor] = useState("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { isElevationClicked } = useSelector((state) => state.elevation);

  const favoriteApartments = useSelector(
    (state) => state.favoriteApartments.favoriteApartments
  );

  const [apartmentType, setApartmentType] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const isGalleryPressed = useSelector(state => state.gallery.isGalleryPressed);

  useEffect(() => {
    const apartmentParam = params.apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? parseInt(match[0]) : null; // Gets the first match or null if no match
    const floorName = floorNameMapping[params.floor];
    // setApartmentType(apartmentInfo.Type);  
    setFloor(floorNameDisplay[params.floor]);

    if (floorName && apartmentNumber) {
      // console.log("FLOOR NAME-- " , floorName);
      // console.log("APART NAME-- " , apartmentNumber);
      // console.log("APARTMENT: " , apartmentData[floorName]);
      const apartmentInfo = apartmentData[floorName].find(apt => apt.Apartmentno == apartmentNumber);
      if (apartmentInfo) {
        setApartmentType(apartmentInfo.Type);
      }
    }
  }, [params, isGalleryPressed]);

  useEffect(() => {
    let foundApartment = null;
    let foundFloor = "";

    const apartmentParam = params.apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? match[0] : null; // Gets the first match or null if no match
    setApartmentNum(apartmentNumber);
    // Search for the apartment in all floors
    for (const floorName in apartmentData) {
      const apartment = apartmentData[floorName].find(
        (apt) => apt.Apartmentno.toString() == apartmentNumber.toString()
      );

      if (apartment) {
        console.log("FLOOOR selected :", apartment);

        foundApartment = apartment;
        foundFloor = floorName;
        break;
      }
    }

    // console.log("FLOOOR NAMEEEE :", foundFloor);


    if (foundApartment) {
      setApartmentInfo(foundApartment);
      // setFloor(foundFloor);
    } else {
      // Redirect to apartment 1 if the apartment is not found
      router.push("/third-floor/Apartment1");
    }
  }, [params.apartment]);

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const [language, setLanguage] = useState(languageState === "ur");
  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [apartmentNo, setApartmentNo] = useState(false);

  useEffect(() => {
    const apartmentParam = params.apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? parseInt(match[0]) : null; // Gets the first match or null if no match
    const floorName = floorNameMapping[params.floor];

    if (floorName && apartmentNumber) {
      const apartmentInfo = apartmentData[floorName].find(apt => apt.Apartmentno === apartmentNumber);
      if (apartmentInfo) {
        setApartmentNo(apartmentNumber);
        setApartmentType(apartmentInfo.Type);
      }
    }
  }, [params]);


  
  const floorNameDisplay = {
    'third-floor': "3rd Floor",
    'second-floor': "2nd Floor",
    'first-floor': "1st Floor",
    'ground-floor': "Ground Floor",
    'valley-floor-1': "Valley Floor 1",
    'valley-floor-3': "Valley Floor 3",
    'valley-floor-4': "Valley Floor 4",
    'valley-floor-5': "Valley Floor 5",
    'valley-floor-6': "Valley Floor 6"
  };
 
  
  const floorNameMapping = {
    'third-floor': "3rd Floor",
    'second-floor': "2nd Floor",
    'first-floor': "1st Floor",
    'ground-floor': "Ground Floor",
    'valley-floor-1': "Basement 1",
    'valley-floor-3': "Basement 3",
    'valley-floor-4': "Basement 4",
    'valley-floor-5': "Basement 5",
    'valley-floor-6': "Basement 6"
  };

  const handleIconClick = () => {
    if (apartmentInfo) {
      const isFavorite = favoriteApartments.some(
        (apt) => apt.Apartmentno == apartmentNo.toString()
      );

      if (isFavorite) {
        dispatch(removeFavoriteApartment(apartmentNo.toString()));
        setPopupMessage(translations.favDelPopup );
      } else {

        const apartmentData =
        {
          Apartmentno: apartmentInfo.Apartmentno.toString() ,
          floor: floor ,
          Type: apartmentInfo.Type,
          Bedrooms: apartmentInfo.Bedrooms,
          Area: apartmentInfo.Area,
        }
        dispatch(addFavoriteApartment(apartmentData));
        setPopupMessage(translations.favAddPopup);
      }
      setShowPopup(true);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 5000); // Start fade out slightly before hiding
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  };

  const toggleLanguage = () => {
    setLanguage(!language);
  };

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? "ur" : "en" }));
  }, [languageState, dispatch]);

  const elevationRef = useRef(null);

  const elevationDropdown = () => {
    setIsElevationOpen(!isElevationOpen);
  };

  const handleElevationItemClick = (route) => {
    router.push(route);
    setIsElevationOpen(false);
  };

  const totalFloor = [
    { id: "third-floor", label: translations.thirdfloor || "Third Floor" },
    { id: "second-floor", label: translations.secondfloor || "Second Floor" },
    { id: "first-floor", label: translations.firstfloor || "First Floor" },
    { id: "ground-floor", label: translations.groundfloor || "Ground Floor" },
    { id: "valley-floor-1", label: translations.basement1 || "Vallery Floor 1" },
    { id: "valley-floor-3", label: translations.basement3 || "Vallery Floor 3" },
    { id: "valley-floor-4", label: translations.basement4 || "Vallery Floor 4" },
    { id: "valley-floor-5", label: translations.basement5 || "Vallery Floor 5" },
    { id: "valley-floor-6", label: translations.basement6 || "Vallery Floor 6" },
  ];

  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [elevationArray, setElevationArray] = useState([]);
  const [currentFloorLabel, setCurrentFloor] = useState(null);

  useEffect(() => {
    const { floor, apartment } = params;

    const apartmentParam = apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? match[0] : null;
    // const { floor } = params;
    const currentFloor = totalFloor.find((item) => item.id === floor);
    const floorLabel = currentFloor ? currentFloor.label : `Floor ${floor}`;

    setCurrentFloor(floorLabel);

    setElevationArray([
      { id: "1", label: `${translations.mapview}`, route: "/map-view" },
      { id: "2", label: `${translations.elevation}`, route: "/explore" },
      { id: "3", label: `${floorLabel}`, route: `/${floor}` },
      {
        id: "4",
        label: `${translations.apartment} ${apartmentNumber}`,
        route: `/${floor}/${apartment}`,
      },
    ]);
  }, [params, translations]);



  const handleBackClick = () => {
    // Extract the floor from the current URL
    const floor = params.floor;
    // Navigate to the floor route
    router.push(`/${floor}`);
  };

  const closeGallery = () => {
    // setIsGalleryOpen(false);
    dispatch(setGalleryPressed(false));

  };

  const handleContactClose = () => {
    setIsContacted(false);
  };

  const handleCall = () => {
    dispatch(addFavoriteApartment({ ...apartmentInfo, floor }));
    setIsContacted(!isContacted);
  };

   const [harsukhHeight, setHarsukhHeight] = useState(105);
  const [harsukhWidth, setHarsukhWidth] = useState(180);

  useEffect(()=>
    {
      if(isMobile)
      {
        setHarsukhHeight(85)
        setHarsukhWidth(150)
      }
      else{
        setHarsukhHeight(105);
        setHarsukhWidth(180);
      }
    }
      ,[isMobile])


      const defaultOptions = 
      {
        loop: true,
        autoplay: true, 
        animationData: StarAnimate,
        rendererSettings: 
        {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <>
    

      <div>{children}</div>
    

      <div style={{overflow:"none", zIndex: '10000'}}>
        <Gallery
            apartmentType={apartmentType} 
            isOpen={isGalleryPressed} 
            onClose={closeGallery}
        />
      </div>

      {!isMobile && (

        <div className={ElevStyles.elevationApContainer}>
          <div className={ElevStyles.elevationButtonBox} ref={elevationRef}>
            <div
              className={`${ElevStyles.elevationBtnGrid} ${
                isElevationOpen ? ElevStyles.open : ""
              }`}
            >
              <div
                className={ElevStyles.elevationBtnLeft}
                onClick={handleBackClick}
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
                onClick={elevationDropdown}
              >
                <div className={ElevStyles.elevationBtnTitle}>
                  {!isElevationOpen ? `${translations.apartment} ${apartmentNum}` : `${translations.location}`}
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
            >
              {elevationArray.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleElevationItemClick(item.route)}
                  className={`${ElevStyles.dropDownfloorButton} ${
                    item.label.startsWith("Apartment") ? ElevStyles.active : ""
                  }`}
                >
                  {translations[item.label.toLowerCase()] || item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.Harsukhlogo}>
        <Image onClick={()=>router.push("/")} src="/Webpage/floors/HarsukhLogo.webp" quality={100} alt="Harsukh Logo" height={harsukhHeight} width={harsukhWidth} />
      </div>

      <div className={styles.apartmentInterestBox}>
        <div className={styles.apartmentInterestInside}>
          <div className={styles.apartmentInterestTitle}>
            <div className={styles.apartmentInterestTitleText}>
              {/* {translations.apartmentInterest || 'Apartment Interest'} */}
              {translations.apartmentNo} {apartmentNum}
            </div>
            <div
              className={styles.apartmentInterestTitleIcon}
              onClick={handleIconClick}
            >


              
              <Image
                src={
                  favoriteApartments.some(
                    (apt) => apt.Apartmentno == apartmentNo
                  )
                    ? "/images/icons/favIconFilled.svg"
                    : "/images/icons/favIcon.svg"
                }
                style={{color:"#006d77"}}
                quality={100}
                alt="Favorite"
                height={22}
                width={22}
              />
            </div>
          </div>
          <div className={styles.apartmentInterestList}>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>{translations.floor}</div>
              <div className={styles.apartmentInterestItemValue}>
                {floor || ""}
              </div>
            </div>

            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>{translations.Type}</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Type || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>{translations.Bedrooms}</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Bedrooms || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>{translations.Area}</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Area || ""}
              </div>
            </div>
          </div>
          <div
            className={styles.apartmentInterestButtonBox}
            onClick={handleCall}
          >
            <div className={styles.apartmentInterestButton}>{translations.Interested}</div>
          </div>
        </div>
      </div>

      { isElevationClicked &&
          (
          <ElevationBox
            isVisible={isElevationClicked}
            // onElevationChange={handleElevationClicked}
            elevationArray={elevationArray}
          />              
          )
        }

      {isContacted && (
        <div className={styles.ContactedContainer}>
          <ContactBox onClose={handleContactClose} />
        </div>
      )}

      {showPopup && (
        <div
          className={`${styles.popupMenu} ${
            isPopupVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.popupMenuIcon}>

            <Lottie 
              options={defaultOptions}
              height={30}
              width={30}
            />
            
          </div>
          <div className={styles.popupMenuContent}>{popupMessage}</div>
        </div>
      )}
      
    </>
  );
};

export default Layout;
