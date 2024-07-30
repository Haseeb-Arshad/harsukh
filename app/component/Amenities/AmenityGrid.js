import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "@/styles/amenity/amenityGrid.module.css"
import RightArrow from '../Icons/rightArrow';
import LeftArrow from '../Icons/leftArrow';

const areas = [
  { name: 'Parking', image: '/images/Amenity/Parking.png', details: ['/images/gallery/Parking/Parking-1.webp', '/images/gallery/Parking/Parking-2.webp'] },
  { name: 'Restaurant', image: '/images/Amenity/Resturant.png', details: ['/images/gallery/Restaurant/Restaurant-1.webp', '/images/gallery/Restaurant/Restaurant-2.webp', '/images/gallery/Restaurant/Restaurant-3.webp', '/images/gallery/Restaurant/Restaurant-4.webp', '/images/gallery/Restaurant/Restaurant-5.webp', '/images/gallery/Restaurant/Restaurant-6.webp'] },
  { name: 'Lobby', image: '/images/Amenity/Lobby.png', details: ['/images/gallery/Lobby/Corridor.webp', '/images/gallery/Lobby/lobby-1.webp', '/images/gallery/Lobby/lobby-2.webp', '/images/gallery/Lobby/lobby-3.webp', '/images/gallery/Lobby/lobby-4.webp', '/images/gallery/Lobby/lobby-5.webp', '/images/gallery/Lobby/lobby-6.webp', '/images/gallery/Lobby/lobby-7.webp'] },
  { name: 'Gym', image: '/images/Amenity/Gym.png', details: ['/images/gallery/Gym/Gym-1.webp', '/images/gallery/Gym/Gym-2.webp'] },
];

const AmenityGrid = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImageBox = (area) => {
    setSelectedArea(area);
    setCurrentImageIndex(0);
  };

  const closeImageBox = () => {
    setSelectedArea(null);
  };

  const nextImage = () => {
    if (currentImageIndex < selectedArea.details.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {areas.map((area, index) => (
          <div
            key={area.name}
            className={styles.gridItem}
            onClick={() => openImageBox(area)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={area.image}
                alt={area.name}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <div className={styles.areaName}>{area.name}</div>
          </div>
        ))}
      </div>

      {selectedArea && (
        <div className={styles.imageBoxOverlay} onClick={closeImageBox}>
          <div className={styles.imageBox} onClick={(e) => e.stopPropagation()}>
            {/* <button className={styles.closeButton} onClick={closeImageBox}>
              &times;
            </button> */}
            <div className={styles.imageNavigation}>
              <div 
                className={`${styles.navButton} ${currentImageIndex === 0 ? styles.hidden : ''}`} 
                onClick={prevImage}
                aria-label="Previous image"
              >
                <LeftArrow />
              </div>
              <div className={styles.singleImageWrapper}>
              {/* <button className={styles.closeButton} onClick={closeImageBox}>
              &times;
            </button> */}
                <Image
                  src={selectedArea.details[currentImageIndex]}
                  alt={`${selectedArea.name} ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </div>
              
              <div 
                className={`${styles.navButton} ${currentImageIndex === selectedArea.details.length - 1 ? styles.hidden : ''}`} 
                onClick={nextImage}
                aria-label="Next image"
              >
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenityGrid;