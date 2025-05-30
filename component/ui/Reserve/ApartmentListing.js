import styles from "@/styles/reserve/apartmentListing.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
// import { removeFavoriteApartment } from '@/state/favoriteApartments/favoriteApartmentsSlice';
import { removeFavoriteApartment } from "@/state/apartment/favApartment";

import en from '@/component/locales/en.json';
import ur from '@/component/locales/ur.json';
import { useRouter, useState } from "next/navigation";


const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

  const floorNameMapping = {
    "3rd Floor": 'third-floor',
    "2nd Floor": 'second-floor',
    "1st Floor": 'first-floor',
    "Ground Floor": 'ground-floor',
    "Basement 1": 'valley-floor-1',
    "Basement 3": 'valley-floor-3',
    "Basement 4": 'valley-floor-4',
    "Basement 5": 'valley-floor-5',
    "Basement 6": 'valley-floor-6'
  };

  const getFloorName = (floor) => {
    // First, try to get the exact match
    if (floorNameMapping[floor]) {
      return floorNameMapping[floor];
    }

    // If no exact match, try to find a partial match
    const lowerFloor = floor.toLowerCase();
    for (const [key, value] of Object.entries(floorNameMapping)) {
      if (lowerFloor.includes(key.toLowerCase())) {
        return value;
      }
    }

    // If still no match, return a default value based on the input
    console.warn(`No exact or partial match found for floor: ${floor}. Using sanitized input.`);
    return floor.toLowerCase().replace(/\s+/g, '-');
  };

  const handleCardClick = () => {
    const floorName = getFloorName(apartment.floor);
    router.push(`/${floorName}/Apartment${apartment.Apartmentno}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(removeFavoriteApartment(apartment.Apartmentno));
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardHeader}>
        <h3>{translations["apartmentNo"]} {apartment.Apartmentno}</h3>
        <div className={styles.deleteButton} onClick={handleDelete}>
          <Image
            src="/images/icons/binIcon.svg"
            quality={100}
            alt="Delete Icon"
            height={16}
            width={16}
          />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          <span>{translations["Floor"]}</span>
          <span>
          {/* {translations[apartment.Floor]} */}
            {apartment.floor}
          </span>
        </div>
        <div className={styles.row}>
          <span>{translations["Type"]}</span>
          <span>
            {translations[apartment.Type]}
          </span>
        </div>
        <div className={styles.row}>
          <span>{translations["Bedrooms"]}</span>
          <span>
            {apartment.Bedrooms}
            {/* {translations[apartment.Bedrooms]} */}
          </span>
        </div>
        <div className={styles.row}>
          <span>{translations["Area"]}</span>
          <span>
          {apartment.Area}

          </span>
        </div>
        {apartment.price && (
          <div className={styles.row}>
            <span className={styles.price}>{translations["areaMeasure"]}</span>
            <span className={styles.price}>
              Rs. {apartment.price.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ApartmentListing = ({ apartments, onInterested }) => {

  const dispatch = useDispatch();


  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);



  if (!apartments || apartments.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>{translations["noFavPopup"]}</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        {translations["reserveHeader"]}
      </h2>
      <div className={styles.cardContainer}>
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.Apartmentno} apartment={apartment} />
        ))}
      </div>
      <button onClick={onInterested} className={styles.interestedButton}>
        {translations["Interested"]}
      </button>
    </div>
  );
};

export default ApartmentListing;
