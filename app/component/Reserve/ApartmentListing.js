import React from 'react';
import styles from '@/styles/reserve/apartmentListing.module.css';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
// import { removeFavoriteApartment } from '@/state/favoriteApartments/favoriteApartmentsSlice';
import { removeFavoriteApartment } from '@/state/apartment/favApartment';


const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();
  console.log('apartment', apartment);
  const handleDelete = () => {
    dispatch(removeFavoriteApartment(apartment.Apartmentno));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Apartment no. {apartment.Apartmentno}</h3>
        <div className={styles.deleteButton} onClick={handleDelete}>
          <Image src="/images/icons/binIcon.svg" quality={100} alt="Delete Icon" height={16} width={16} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          <span>Floor</span>
          <span>{apartment.floor}</span>
        </div>
        <div className={styles.row}>
          <span>Type</span>
          <span>{apartment.Type}</span>
        </div>
        <div className={styles.row}>
          <span>Bedrooms</span>
          <span>{apartment.Bedrooms}</span>
        </div>
        <div className={styles.row}>
          <span>Area</span>
          <span>{apartment.Area} sq.ft</span>
        </div>
        {apartment.price && (
          <div className={styles.row}>
            <span className={styles.price}>Price</span>
            <span className={styles.price}>Rs. {apartment.price.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ApartmentListing = ({ apartments }) => {
  console.log('apartments', apartments);
  if (!apartments || apartments.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>No favorite apartments selected yet.</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Register your Interest before the unit sells out.</h2>
      <div className={styles.cardContainer}>
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.Apartmentno} apartment={apartment} />
        ))}
      </div>
      <button className={styles.interestedButton}>Interested</button>
    </div>
  );
};

export default ApartmentListing;