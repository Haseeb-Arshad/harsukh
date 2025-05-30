import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from "@/styles/gallery/gallery.module.css";
import RightArrow from '@/component/Icons/rightArrow';
import LeftArrow from '@/component/Icons/leftArrow';
import Loader from '@/app/[floor]/Loading';

const areas = {
  Studio: {
    name: "Studio",
    image: "https://cdn.theharsukh.com/images/Amenity/Studio.png",
    details: [
      { src: 'https://cdn.theharsukh.com/images/gallery/Studio/studio-1.webp', caption: 'Elegant Studio Apartments with a vallery view' },
      { src: 'https://cdn.theharsukh.com/images/gallery/studio/studio-2.webp', caption: 'Elegant Studio Apartments with a vallery view' },
      { src: 'https://cdn.theharsukh.com/images/gallery/studio/studio-3.webp', caption: 'Elegant Studio Apartments with a vallery view' },
    ]
  },
  "One Bed": {
    name: "One Bed",
    image: "https://cdn.theharsukh.com/images/Amenity/OneBed.png",
    details: [
      { src: 'https://cdn.theharsukh.com/images/gallery/OneBed/oneBed-1.webp', caption: 'Experience luxury Living with our 1 bed apartments' },
      { src: 'https://cdn.theharsukh.com/images/gallery/OneBed/oneBed-2.webp', caption: 'Experience luxury Living with our 1 bed apartments' },
      { src: 'https://cdn.theharsukh.com/images/gallery/OneBed/oneBed-3.webp', caption: 'Experience luxury Living with our 1 bed apartments' },
      { src: 'https://cdn.theharsukh.com/images/gallery/OneBed/oneBed-4.webp', caption: 'Experience luxury Living with our 1 bed apartments' },
    ]
  },
  "Two Bed": {
    name: "Two Bed",
    image: "https://cdn.theharsukh.com/images/Amenity/TwoBed.png",
    details: [
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-1.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-2.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-3.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-4.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-5.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/TwoBed/twoBed-6.webp', caption: 'Indulge in our spacious 2 bed apartments. Make your living luxury' },
    ]
  },
  "Three Bed": {
    name: "Three Bed",
    image: "https://cdn.theharsukh.com/images/Amenity/ThreeBed.png",
    details: [
      { src: 'https://cdn.theharsukh.com/images/gallery/ThreeBed/threeBed-1.webp', caption: 'Find comfort in our 3 bed apartments where your comfort is luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/ThreeBed/threeBed-2.webp', caption: 'Find comfort in our 3 bed apartments where your comfort is luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/ThreeBed/threeBed-3.webp', caption: 'Find comfort in our 3 bed apartments where your comfort is luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/ThreeBed/threeBed-4.webp', caption: 'Find comfort in our 3 bed apartments where your comfort is luxury' },
      { src: 'https://cdn.theharsukh.com/images/gallery/ThreeBed/threeBed-5.webp', caption: 'Find comfort in our 3 bed apartments where your comfort is luxury' },
    ]
  },
  Penthouse: {
    name: "Penthouse",
    image: "/images/Amenity/Penthouse.png",
    details: [
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-1.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-2.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-3.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-4.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-5.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-6.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-7.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
      { src: 'https://cdn.theharsukh.com/images/gallery/Penthouse/penthouse-8.webp', caption: 'Live in a breathtaking penthouse santuary, away from the hassle' },
    ]
  },
};

const Gallery = ({ apartmentType, isOpen, onClose }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(null);
  const imageBoxRef = useRef(null);
  const autoPlayRef = useRef(null);
  const imageLoadingRef = useRef(false);

  useEffect(() => {
    if (isOpen && apartmentType && areas[apartmentType]) {
      openImageBox(areas[apartmentType]);
    } else {
      closeImageBox();
    }
  }, [isOpen, apartmentType]);

  const openImageBox = (area) => {
    setSelectedArea(area);
    setCurrentImageIndex(0);
    setIsLoading(true);
    setTimeout(() => setIsOverlayActive(true), 50);
  };

  const closeImageBox = useCallback(() => {
    setIsOverlayActive(false);
    setTimeout(() => {
      setSelectedArea(null);
      onClose();
    }, 50);
  }, [onClose]);

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

  const startAutoPlayTimer = useCallback(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    autoPlayRef.current = setTimeout(() => {
      nextImage();
    }, 5000); // Changed to 5 seconds as per your previous request
  }, [nextImage]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    imageLoadingRef.current = false;
    startAutoPlayTimer();
  }, [startAutoPlayTimer]);

  useEffect(() => {
    if (selectedArea && !isLoading) {
      startAutoPlayTimer();
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [selectedArea, isLoading, startAutoPlayTimer]);

  if (!selectedArea) return null;

  return (
    <div style={{zIndex:"100000000"}} className={`${styles.imageBoxOverlay} ${isOverlayActive ? styles.active : ''}`} onClick={closeImageBox}>
      <div className={styles.imageBox} ref={imageBoxRef} onClick={(e) => e.stopPropagation()}>
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
          onClick={() => {
            prevImage();
            startAutoPlayTimer(); // Restart timer on manual navigation
          }}
          aria-label="Previous image"
        >
          <LeftArrow />
        </div>
        <div 
          className={`${styles.navButtonRight} ${styles.navButton}`}
          onClick={() => {
            nextImage();
            startAutoPlayTimer(); // Restart timer on manual navigation
          }}
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
                  setIsLoading(true);
                  startAutoPlayTimer(); // Restart timer on manual navigation
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;