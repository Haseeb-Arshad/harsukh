
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '@/state/mapView/mapViewState'; // Adjust the import path as needed
import styles from '@/styles/maps/mapview.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MapView = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const svgVisibility = useSelector((state) => state.svgVisibility);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    const adjustVideoAndSVG = () => {
      const video = videoRef.current;
      const container = containerRef.current;
      const svg = svgRef.current;
      
      if (video && container && svg) {
        const aspectRatio = video.videoWidth / video.videoHeight;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let newWidth, newHeight;

        if (isMobile) {
          newHeight = containerHeight;
          newWidth = newHeight * aspectRatio;
        } else {
          if (containerWidth / containerHeight > aspectRatio) {
            newWidth = containerWidth;
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = containerHeight;
            newWidth = newHeight * aspectRatio;
          }
        }

        video.style.width = `${newWidth}px`;
        video.style.height = `${newHeight}px`;

        svg.style.width = `${newWidth}px`;
        svg.style.height = `${newHeight}px`;

        svg.setAttribute('viewBox', `0 0 ${video.videoWidth} ${video.videoHeight}`);

        if (isMobile) {
          container.scrollLeft = (newWidth - containerWidth) / 2;
        }
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', adjustVideoAndSVG);
    }

    window.addEventListener('resize', adjustVideoAndSVG);

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', adjustVideoAndSVG);
      }
      window.removeEventListener('resize', adjustVideoAndSVG);
    };
  }, [isMobile]);

  const handleSVGElementHover = (event) => {
    const hoveredElement = event.target.closest('[data-name]');
    if (hoveredElement) {
      const name = hoveredElement.getAttribute('data-name');
      const distance = hoveredElement.getAttribute('data-distance');
      const drivingTime = hoveredElement.getAttribute('data-driving-time');
      const walkingTime = hoveredElement.getAttribute('data-walking-time');
      
      const rect = hoveredElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setHoverInfo({
        name,
        distance,
        drivingTime,
        walkingTime,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top
      });
    } else {
      setHoverInfo(null);
    }
  };

  const handleHarsukhClick = () => {
    router.push('/'); // Replace with the actual route you want to navigate to
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${isMobile ? styles.scrollable : ''}`}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/mapVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <motion.svg
          ref={svgRef}
          className={styles.svgOverlay}
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={handleSVGElementHover}
          onMouseLeave={() => setHoverInfo(null)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: svgVisibility.landmarks || svgVisibility.roads ? 1 : 0, scale: svgVisibility.landmarks || svgVisibility.roads ? 1 : 0.95 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <use href="/svg/buildingwb.svg#buidling" />
          <use href="/svg/AYUBIA/AyubiaPlace.svg#ayubia" />
          <use 
            href="/svg/harsukhBuilding/harsukhBuilding.svg#harsukh" 
            onClick={handleHarsukhClick}
            className={styles.harsukhBuilding}
          />
          <use href="/svg/MURREE/murree.svg#murree" />
          <use href="/svg/NATHIA/nathia.svg#nathia" />

          {svgVisibility.landmarks && (
            <>
              <use href="/svg/ayubiabazar/ayubiaBazar.svg#ayubiabazar" data-name="Ayubia Bazar" data-distance="160 m" data-driving-time="1 min" data-walking-time="3 min" />
              <use href="/svg/chairlift/chairlift.svg#chairLift" data-name="Ayubia Chair Lift" data-distance="4.9 km" data-driving-time="7 min" data-walking-time="47 min" />
              <use href="/svg/chandatophill/chandaTopHill.svg#chandaTopHill" data-name="Chanda Top Hill" data-distance="900 m" data-driving-time="3 min" data-walking-time="12 min" />
              <use href="/svg/forestHouse/forestHouse.svg#forestHouse" data-name="Alnoor Waterfall" data-distance="230 m" data-driving-time="4 min" data-walking-time="8 min" />
              <use href="/svg/tunnel/tunnel.svg#tunnel" data-name="Ayubia Moto Tunnel" data-distance="2.9 km" data-driving-time="7 min" data-walking-time="45 min" />
              <use href="/svg/harsukhlogo/harsukhLogo.svg#harsukhLogo" />
              <use href="/svg/pinLocation/pinLocation.svg#pinLocation" />
            </>
          )}
          {svgVisibility.roads && (
            <use href="/svg/roadLabel/road.svg#road" />
          )}
        </motion.svg>
      </div>

      <AnimatePresence>
        {hoverInfo && (
          <motion.div
            className={styles.popupInfo}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: `${hoverInfo.x}px`,
              top: `${hoverInfo.y - 70}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className={styles.popupGrid}>
              <div className={styles.popupItems}>
                <div className={styles.popupItemIcon}>
                  <Image src="/images/icons/mapsIcon.svg" height={20} width={20} alt='Maps' />
                </div>
                <div className={styles.popupItemTitle}>
                  {hoverInfo.distance}
                </div>
              </div>
              <div className={styles.popupItems}>
                <div className={styles.popupItemIcon}>
                  <Image src="/images/icons/carIcon.svg" height={14} width={14} alt='Maps' />
                </div>
                <div className={styles.popupItemTitle}>
                  {hoverInfo.drivingTime}
                </div>
              </div>
              <div className={styles.popupItems}>
                <div className={styles.popupItemIcon}>
                  <Image src="/images/icons/walkIcon.svg" height={17} width={17} alt='Maps' />
                </div>
                <div className={styles.popupItemTitle}>
                  {hoverInfo.walkingTime}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
