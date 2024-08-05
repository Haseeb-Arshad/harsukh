import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from "@/styles/amenity/amenityGrid.module.css"
import RightArrow from '../Icons/rightArrow';
import LeftArrow from '../Icons/leftArrow';
import Loader from '@/app/[floor]/Loading';

const areas = [
  { name: 'Parking', image: '/images/Amenity/Parking.png', details: [
    { src: '/images/gallery/Parking/Parking-1.webp', caption: 'Spacious parking area' },
    { src: '/images/gallery/Parking/Parking-2.webp', caption: 'Well-lit and secure parking' }
  ]},
  { name: 'Restaurant', image: '/images/Amenity/Resturant.png', details: [
    { src: '/images/gallery/Restaurant/Restaurant-1.webp', caption: 'Elegant dining area' },
    { src: '/images/gallery/Restaurant/Restaurant-2.webp', caption: 'Cozy seating arrangements' },
    { src: '/images/gallery/Restaurant/Restaurant-3.webp', caption: 'Modern kitchen facilities' },
    { src: '/images/gallery/Restaurant/Restaurant-4.webp', caption: 'Outdoor dining option' },
    { src: '/images/gallery/Restaurant/Restaurant-5.webp', caption: 'Bar area' },
    { src: '/images/gallery/Restaurant/Restaurant-6.webp', caption: 'Private dining room' }
  ]},
  { name: 'Lobby', image: '/images/Amenity/Lobby.png', details: [
    { src: '/images/gallery/Lobby/Lobby-1.webp', caption: 'Grand entrance with luxurious decor' },
    { src: '/images/gallery/Lobby/Lobby-2.webp', caption: 'Comfortable seating area for guests' },
    { src: '/images/gallery/Lobby/Lobby-3.webp', caption: 'Modern reception desk' },
    { src: '/images/gallery/Lobby/Lobby-4.webp', caption: 'Stylish lobby lounge' },
    { src: '/images/gallery/Lobby/Lobby-5.webp', caption: 'Elegant lighting fixtures' },
    { src: '/images/gallery/Lobby/Lobby-6.webp', caption: 'Art-decorated lobby corridor' },
    { src: '/images/gallery/Lobby/Lobby-7.webp', caption: 'Welcoming lobby atmosphere' }
  ]},
  { name: 'Gym', image: '/images/Amenity/Gym.png', details: [
    { src: '/images/gallery/Gym/Gym-1.webp', caption: 'State-of-the-art fitness equipment' },
    { src: '/images/gallery/Gym/Gym-2.webp', caption: 'Spacious workout area with natural light' },
  ]},
];

const AmenityGrid = ({amenityRef}) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imageBoxRef = useRef(null);
  const autoPlayRef = useRef(null);

  const openImageBox = (area) => {
    setSelectedArea(area);
    setCurrentImageIndex(0);
    setIsLoading(true);
    setTimeout(() => setIsOverlayActive(true), 50);
  };

  const closeImageBox = useCallback(() => {
    setIsOverlayActive(false);
    setTimeout(() => setSelectedArea(null), 500);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedArea.details.length);
  }, [selectedArea]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedArea.details.length) % selectedArea.details.length);
  }, [selectedArea]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageBoxRef.current && !imageBoxRef.current.contains(event.target)) {
        closeImageBox();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeImageBox();
      }
    };

    if (selectedArea) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedArea, closeImageBox]);

  useEffect(() => {
    if (selectedArea) {
      autoPlayRef.current = setInterval(() => {
        nextImage();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [selectedArea, nextImage]);

  return (
    <div ref={amenityRef} className={styles.container}>
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
        <div className={`${styles.imageBoxOverlay} ${isOverlayActive ? styles.active : ''}`} onClick={closeImageBox}>
          <div className={styles.imageBox} ref={imageBoxRef} onClick={(e) => e.stopPropagation()}>
            <div className={styles.singleImageWrapper}>
              {isLoading && <Loader />}
              <Image
                src={selectedArea.details[currentImageIndex].src}
                alt={`${selectedArea.name} ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                onLoadingComplete={() => setIsLoading(false)}
              />
              <div className={styles.imageCaption}>
                {selectedArea.details[currentImageIndex].caption}
              </div>
            </div>
            <div 
              className={styles.navButton}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <LeftArrow />
            </div>
            <div 
              className={styles.navButton}
              onClick={nextImage}
              aria-label="Next image"
            >
              <RightArrow />
            </div>
            <div className={styles.navigationDots}>
              {selectedArea.details.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenityGrid;