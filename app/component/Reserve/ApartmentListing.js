import styles from "@/styles/reserve/apartmentListing.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
// import { removeFavoriteApartment } from '@/state/favoriteApartments/favoriteApartmentsSlice';
import { removeFavoriteApartment } from "@/state/apartment/favApartment";

import en from '@/app/locales/en.json';
import ur from '@/app/locales/ur.json';


const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();


  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);


  console.log("apartment", apartment);
  const handleDelete = () => {
    dispatch(removeFavoriteApartment(apartment.Apartmentno));
  };

  return (
    <div className={styles.card}>
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
            {apartment.Floor}
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
