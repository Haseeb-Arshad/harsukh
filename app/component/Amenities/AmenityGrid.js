import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import styles from "@/styles/amenity/amenityGrid.module.css"
import RightArrow from '../Icons/rightArrow';
import LeftArrow from '../Icons/leftArrow';
import Loader from '@/app/[floor]/Loading';

import { useSelector, useDispatch } from 'react-redux';

import en from '@/app/locales/en.json';
import ur from '@/app/locales/ur.json';

const areas = [
  { name: 'Parking', image: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/Amenity/Parking.png', details: [
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Parking/Parking-1.webp', caption: 'Dedicated floors for parking' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Parking/Parking-2.webp', caption: 'Dedicated floors for parking' }
  ]},
  { name: 'Restaurant', image: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/Amenity/Resturant.png', details: [
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-1.webp', caption: 'Experience the culinary luxury with our eateries floor' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-2.webp', caption: 'Experience the culinary luxury with our eateries floor' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-3.webp', caption: 'Experience the culinary luxury with our eateries floor' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-4.webp', caption: 'Experience the culinary luxury with our eateries floor' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-5.webp', caption: 'Experience the culinary luxury with our eateries floor' },
    { src: 'https://cdn.theharsukh.comhttps://cdn.theharsukh.com/images/gallery/Restaurant/Restaurant-6.webp', caption: 'Experience the culinary luxury with our eateries floor' }
  ]},
  { name: 'Lobby', image: 'https://cdn.theharsukh.com/images/Amenity/Lobby.png', details: [
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/Corridor.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-1.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-2.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-3.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-4.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-5.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-6.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Lobby/lobby-7.webp', caption: 'Welcoming & Luxurious. Our lobbies & corridors combing luxury & warmth' }
  ]},
  { name: 'Gym', image: 'https://cdn.theharsukh.com/images/Amenity/Gym.png', details: [
    { src: 'https://cdn.theharsukh.com/images/gallery/Gym/gym-1.webp', caption: 'Experience premier fitness with stunning mountain backdrops' },
    { src: 'https://cdn.theharsukh.com/images/gallery/Gym/gym-2.webp', caption: 'Experience premier fitness with stunning mountain backdrops' },
  ]},
];


const AmenityGrid = ({ isMobile, onClose, Amenref }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(null);
  const imageBoxRef = useRef(null);
  const autoPlayRef = useRef(null);
  const imageLoadingRef = useRef(false);
  const amenityGridRef = useRef(null);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

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
    if (imageLoadingRef.current) return;
    setDirection('next');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedArea.details.length);
    setIsLoading(true);
  }, [selectedArea]);

  const prevImage = useCallback(() => {
    if (imageLoadingRef.current) return;
    setDirection('prev');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedArea.details.length) % selectedArea.details.length);
    setIsLoading(true);
  }, [selectedArea]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    imageLoadingRef.current = false;
    
    // Start the autoplay timer after the image has loaded
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    autoPlayRef.current = setTimeout(() => {
      nextImage();
    }, 5000);
  }, [nextImage]);

  const handleOutsideClick = useCallback((event) => {
    if (amenityGridRef.current && !amenityGridRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageBoxRef.current && !imageBoxRef.current.contains(event.target)) {
        closeImageBox();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        if (selectedArea) {
          closeImageBox();
        } else {
          onClose();
        }
      }
    };
    

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedArea, closeImageBox, handleOutsideClick, onClose]);

  useEffect(() => {
    // Clear the autoplay timer when the component unmounts or when selectedArea changes
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [selectedArea]);

  
  return (
    <div className={styles.container} ref= {Amenref}>
      <div className={styles.closeContainer} onClick={onClose}>
          <Image src="https://cdn.theharsukh.com/images/icons/closeIcon.svg" height={10} width={10} alt='Close'/>
      </div>
      <div className={styles.gridContainer}>
        {areas.map((area) => (
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
            <div className={styles.areaName}>
              {translations[area.name]}
            </div>
          </div>
        ))}
      </div>

      {selectedArea && (
        <div className={`${styles.imageBoxOverlay} ${isOverlayActive ? styles.active : ''}`} onClick={closeImageBox}>
          <div className={styles.imageBox} ref={imageBoxRef} onClick={(e)=> e.stopPropagation()} >
            <div className={styles.singleImageWrapper}>
              {isLoading && <Loader />}
              <Image
              
                key={currentImageIndex}
                src={selectedArea.details[currentImageIndex].src}
                alt={`${selectedArea.name} ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                onLoadingComplete={handleImageLoad}
                className={`${styles.slideImage} ${styles[direction]}`}
              />
              <div className={styles.imageCaption}>
                {selectedArea.details[currentImageIndex].caption}
              </div>
            </div>
            <div 
              className={`${styles.navButtonLeft} ${styles.navButton}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <LeftArrow />
            </div>
            <div 
              className={`${styles.navButtonRight} ${styles.navButton}`}
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
                  onClick={() => {
                    if (index !== currentImageIndex) {
                      setDirection(index > currentImageIndex ? 'next' : 'prev');
                      setCurrentImageIndex(index);
                    }
                  }}
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