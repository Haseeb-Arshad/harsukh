'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '@/state/mapView/mapViewState';
import styles from '@/styles/maps/mapview.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from '../[floor]/Loading';

const MapView = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const svgVisibility = useSelector((state) => state.svgVisibility);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const router = useRouter();

  const adjustVideoAndSVG = useCallback(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const svg = svgRef.current;
    
    if (video && container && svg && videoLoaded) {
      const aspectRatio = video.videoWidth / video.videoHeight;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      let newWidth, newHeight, left, top;

      if (isMobile) {
        newHeight = containerHeight;
        newWidth = newHeight * aspectRatio;
        left = 0;
        top = 0;
        container.style.overflowX = "auto";
        container.scrollLeft = (newWidth - containerWidth) / 2;
      } else {
        if (containerWidth / containerHeight > aspectRatio) {
          newWidth = containerWidth;
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = containerHeight;
          newWidth = newHeight * aspectRatio;
        }
        left = (containerWidth - newWidth) / 2;
        top = (containerHeight - newHeight) / 2;
        container.style.overflowX = "hidden";
      }

      video.style.width = `${newWidth}px`;
      video.style.height = `${newHeight}px`;
      video.style.left = `${left}px`;
      video.style.top = `${top}px`;

      svg.style.width = `${newWidth}px`;
      svg.style.height = `${newHeight}px`;
      svg.style.left = `${left}px`;
      svg.style.top = `${top}px`;

      svg.setAttribute("viewBox", `0 0 ${video.videoWidth} ${video.videoHeight}`);
      
      setIsLoading(false);
    }
  }, [isMobile, videoLoaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoad = () => {
        setVideoLoaded(true);
        adjustVideoAndSVG();
        video.play().catch(error => console.error('Error playing video:', error));
      };

      if (video.readyState >= 2) {
        handleLoad();
      } else {
        video.onloadeddata = handleLoad;
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      adjustVideoAndSVG();
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (video) {
        video.onloadeddata = null;
      }
    };
  }, [adjustVideoAndSVG]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play().catch(error => console.error('Error playing video:', error));
    }
  }, [videoLoaded]);

  const handleSVGElementHover = (event) => {
    const hoveredElement = event.target.closest('[data-name]');
    if (hoveredElement) {
      const name = hoveredElement.getAttribute('data-name');
      const distance = hoveredElement.getAttribute('data-distance');
      const drivingTime = hoveredElement.getAttribute('data-driving-time');
      const walkingTime = hoveredElement.getAttribute('data-walking-time');
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollLeft = containerRef.current.scrollLeft;
      const x = event.clientX - containerRect.left + scrollLeft;
      const y = event.clientY - containerRect.top;
  
      setHoverInfo({
        name,
        distance,
        drivingTime,
        walkingTime,
        x,
        y
      });
    } else {
      setHoverInfo(null);
    }
  };

  const handleHarsukhClick = () => {
    router.push('/');
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${isMobile ? styles.scrollable : ''}`}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Loader />
        </div>
      )}
      <div className={styles.videoWrapper} style={{ opacity: isLoading ? 0 : 1 }}>
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
        <svg
          ref={svgRef}
          className={styles.svgOverlay}
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={handleSVGElementHover}
          onMouseLeave={() => setHoverInfo(null)}
        >
          <use href="/svg/AYUBIA/AyubiaPlace.svg#ayubia" style={{cursor: "pointer"}}/>
          <use 
            href="/svg/harsukhBuilding/building1.svg#harsukh" 
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
              <use href="/svg/harsukhlogo/logo.svg#harsukhLogo" />
            </>
          )}
          {svgVisibility.roads && (
            <use href="/svg/roadLabel/road1.svg#road" />
          )}
          {svgVisibility.radius && (
            <use href="/svg/radius/radius1.svg#radius" />
          )}
        </svg>
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
              top: isMobile ? `${hoverInfo.y + 20}px` : `${hoverInfo.y - 70}px`,
              transform: isMobile ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
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