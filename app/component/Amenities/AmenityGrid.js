import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "@/styles/amenity/amenityGrid.module.css"

const areas = [
  { name: 'Parking', image: '/images/Amenity/Parking.png', details: ['/images/gallery/Parking/Parking-1.png', '/images/gallery/Parking/Parking-1.png'] },
  { name: 'Restaurant', image: '/images/Amenity/Resturant.png', details: ['/images/gallery/Restaurant/Restaurant-1.png', '/images/gallery/Restaurant/Restaurant-2.png', '/images/gallery/Restaurant/Restaurant-3.png', '/images/gallery/Restaurant/Restaurant-4.png', '/images/gallery/Restaurant/Restaurant-5.png', '/images/gallery/Restaurant/Restaurant-6.png'] },
  { name: 'Lobby', image: '/images/Amenity/Lobby.png', details: ['/images/gallery/Lobby/Corridor.jpg', '/images/gallery/Lobby/lobby-1.png', '/images/gallery/Lobby/lobby-2.png', '/images/gallery/Lobby/lobby-3.png', '/images/gallery/Lobby/lobby-4.png', '/images/gallery/Lobby/lobby-5.png', '/images/gallery/Lobby/lobby-6.png', '/images/gallery/Lobby/lobby-7.png'] },
  { name: 'Gym', image: '/images/Amenity/Gym.png', details: ['/images/gallery/Lobby/lobby-1.png', '/images/gallery/Lobby/lobby-2.png'] },
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
    console.log("Next Image")
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % selectedArea.details.length
    );
    console.log(currentImageIndex)
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + selectedArea.details.length) % selectedArea.details.length
    );
  };

  useEffect(()=>
    {
      
    }, [currentImageIndex]
  )

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {areas.map((area, index) => (
          <div
            key={area.name}
            className={styles.gridItem}
            style={{ animationDelay: `${index * 0.1}s` }}
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
            <button className={styles.closeButton} onClick={closeImageBox}>
              &times;
            </button>

            {/* <h2>{selectedArea.name}</h2> */}
            <div className={styles.imageNavigation}>
              <div onClick={prevImage} className={styles.navButton}>
                  Prev
              </div>
              <div className={styles.singleImageWrapper}>
                <Image
                  src={selectedArea.details[currentImageIndex]}
                  alt={`${selectedArea.name} ${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div onClick={nextImage} className={styles.navButton}>NEXT</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenityGrid;