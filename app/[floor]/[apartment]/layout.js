"use client";
import ContactBox from "@/app/component/Bars/contactBox";
import apartmentData from "@/app/component/data/floorData";
import en from "@/app/locales/en.json";
import ur from "@/app/locales/ur.json";
import { modifyLanguage } from "@/state/language/languageState";
import styles from "@/styles/apartment/apartmentLayout.module.css";
import ElevStyles from "@/styles/elevation.module.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavoriteApartment,
  removeFavoriteApartment,
} from "@/state/apartment/favApartment";
import ElevationBox from "@/app/component/Bars/elevationBox";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isContacted, setIsContacted] = useState(false);

  const params = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const [apartmentInfo, setApartmentInfo] = useState(null);
  const [apartmentNum, setApartmentNum] = useState(0);
  const [floor, setFloor] = useState("");

  const favoriteApartments = useSelector(
    (state) => state.favoriteApartments.favoriteApartments
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        (apt) => apt.Apartmentno.toString() === apartmentNumber
      );
      if (apartment) {
        foundApartment = apartment;
        foundFloor = floorName;
        break;
      }
    }

    if (foundApartment) {
      setApartmentInfo(foundApartment);
      setFloor(foundFloor);
    } else {
      // Redirect to apartment 1 if the apartment is not found
      router.push("/thirdFloor/Apartment1");
    }
  }, [params.apartment, router]);

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

  const handleIconClick = () => {
    if (apartmentInfo) {
      const isFavorite = favoriteApartments.some(
        (apt) => apt.Apartmentno === apartmentInfo.Apartmentno
      );
      if (isFavorite) {
        dispatch(removeFavoriteApartment(apartmentInfo.Apartmentno));
        setPopupMessage("Apartment has been removed from favorites.");
      } else {
        dispatch(addFavoriteApartment({ ...apartmentInfo, floor }));
        setPopupMessage("Apartment has been added to favorites.");
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
  }, [language, dispatch]);

  const elevationRef = useRef(null);

  const elevationDropdown = () => {
    setIsElevationOpen(!isElevationOpen);
  };

  const handleElevationItemClick = (route) => {
    router.push(route);
    setIsElevationOpen(false);
  };

  const totalFloor = [
    { id: "thirdFloor", label: translations.thirdfloor || "Third Floor" },
    { id: "secondFloor", label: translations.secondfloor || "Second Floor" },
    { id: "firstFloor", label: translations.firstfloor || "First Floor" },
    { id: "groundFloor", label: translations.groundfloor || "Ground Floor" },
    { id: "basement1", label: translations.basement1 || "Vallery Floor 1" },
    { id: "basement3", label: translations.basement3 || "Vallery Floor 3" },
    { id: "basement4", label: translations.basement4 || "Vallery Floor 4" },
    { id: "basement5", label: translations.basement5 || "Vallery Floor 5" },
    { id: "basement6", label: translations.basement6 || "Vallery Floor 6" },
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
      { id: "1", label: "Map View", route: "/mapview" },
      { id: "2", label: "Elevation", route: "/" },
      { id: "3", label: `${floorLabel}`, route: `/${floor}` },
      {
        id: "4",
        label: `Apartment ${apartmentNumber}`,
        route: `/${floor}/${apartment}`,
      },
    ]);
  }, [params]);


    const { isElevationClicked } = useSelector((state) => state.elevation);

  const handleBackClick = () => {
    // Extract the floor from the current URL
    const floor = params.floor;
    // Navigate to the floor route
    router.push(`/${floor}`);
  };

  const handleContactClose = () => {
    setIsContacted(false);
  };

  const handleCall = () => {
    dispatch(addFavoriteApartment({ ...apartmentInfo, floor }));

    setIsContacted(!isContacted);
    console.log("CALLED");
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



  return (
    <>
      <div>{children}</div>

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
                  {!isElevationOpen ? `Apartment ${apartmentNum}` : "Location"}
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
              Apartment no. {apartmentNum}
            </div>
            <div
              className={styles.apartmentInterestTitleIcon}
              onClick={handleIconClick}
            >
              <Image
                // src="/images/icons/favIconFilled.svg"
                src={
                  favoriteApartments.some(
                    (apt) => apt.Apartmentno === apartmentInfo?.Apartmentno
                  )
                    ? "/images/icons/favIconFilled.svg"
                    : "/images/icons/favIcon.svg"
                }
                quality={100}
                alt="Favorite"
                height={22}
                width={22}
              />
            </div>
          </div>
          <div className={styles.apartmentInterestList}>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>Floor</div>
              <div className={styles.apartmentInterestItemValue}>
                {floor || ""}
              </div>
            </div>

            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>Type</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Type || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>Bedrooms</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Bedrooms || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>Area</div>
              <div className={styles.apartmentInterestItemValue}>
                {apartmentInfo?.Area || ""}
              </div>
            </div>
          </div>
          <div
            className={styles.apartmentInterestButtonBox}
            onClick={handleCall}
          >
            <div className={styles.apartmentInterestButton}>Interested</div>
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
            <Image
              src="/images/icons/favIconFilled.svg"
              quality={100}
              alt="Favorite"
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
