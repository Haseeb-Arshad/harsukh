import React from 'react';
import Image from 'next/image';
import styles from "@/styles/amenity/amenityGrid.module.css";

const areas = [
  { name: 'Parking', image: '/images/Amenity/Parking.png' },
  { name: 'Restaurant', image: '/images/Amenity/Resturant.png' },
  { name: 'Lobby', image: '/images/Amenity/Lobby.png' },
  { name: 'Gym', image: '/images/Amenity/Gym.png' },
];

const AmenityGrid = () => {
  return (
    <div className={styles.gridContainer}>
    {areas.map((area, index) => (
      <div key={area.name} className={`${styles.gridItem} ${styles.fadeIn}`} style={{animationDelay: `${index * 0.2}s`}}>
        <div className={styles.imageWrapper}>
          <Image 
            src={area.image} 
            alt={area.name} 
            width={250} 
            height={140} 
            layout="responsive" 
            objectFit="cover" 
            quality={100}
          />
        </div>
        <div className={styles.areaName}>{area.name}</div>
      </div>
    ))}
  </div>
  );
};

export default AmenityGrid;