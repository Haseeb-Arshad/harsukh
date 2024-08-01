'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '@/state/mapView/mapViewState'; // Adjust the import path as needed
import styles from '@/styles/maps/mapview.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const MapView = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dispatch = useDispatch();
  const svgVisibility = useSelector((state) => state.svgVisibility);
  const [isMobile, setIsMobile] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const svgRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);




  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
      videoRef.current.play();
    }
  }, []);

  const handleSVGElementClick = (event) => {
    const clickedElement = event.target.closest('[data-name]');
    if (clickedElement) {
      const name = clickedElement.getAttribute('data-name');
      console.log(`Clicked on: ${name}`);
      // Add your click handling logic here
    }
  };



  useEffect(() => {
    const adjustImageAndSVG = () => {
      const img = videoRef.current;
      const container = containerRef.current;
      const svg = svgRef.current;
      
      if (img && container && svg) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let newWidth, newHeight, left, top;

        if (isMobile) {
          // On mobile, set the height to 100% and adjust width to maintain aspect ratio
          newHeight = containerHeight;
          newWidth = newHeight * aspectRatio;
          left = 0;
          top = 0;
          container.style.overflowX = 'auto';
          
          // Center the scroll position
          container.scrollLeft = (newWidth - containerWidth) / 2;
        } else {
          // On desktop, fit the image within the container while maintaining aspect ratio
          if (containerWidth / containerHeight > aspectRatio) {
            newWidth = containerWidth;
            newHeight = newWidth / aspectRatio;
          } else {
            newHeight = containerHeight;
            newWidth = newHeight * aspectRatio;
          }
          left = (containerWidth - newWidth) / 2;
          top = (containerHeight - newHeight) / 2;
          container.style.overflowX = 'hidden';
        }

        // Set image dimensions and position
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        // Adjust SVG to match image dimensions and position
        svg.style.width = `${newWidth}px`;
        svg.style.height = `${newHeight}px`;
        svg.style.left = `${left}px`;
        svg.style.top = `${top}px`;

        // Update SVG viewBox to match new dimensions
        svg.setAttribute('viewBox', `0 0 ${img.naturalWidth} ${img.naturalHeight}`);
      }
    };
        
    const img = videoRef.current;
    if (img) {
      if (img.complete) {
        adjustImageAndSVG();
        
      } else {
        img.onload = adjustImageAndSVG;
      }
    }

    window.addEventListener('resize', adjustImageAndSVG);

    return () => {
      window.removeEventListener('resize', adjustImageAndSVG);
    };
  }, [isMobile]);  


  const toggleSVGVisibility = (element) => {
    dispatch(toggleVisibility({ element }));
  };

    
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

  return (
    <div ref={containerRef} className={styles.container}>
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
        viewBox="0 0 5494.76 3090.8"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleSVGElementHover}
        onMouseLeave={() => setHoverInfo(null)}
      >

          <use href="/svg/buildingwb.svg#buidling"  />


        {svgVisibility.landmarks && (
          <>
            <use href="/svg/ayubiabazar/ayubiaBazar.svg#ayubiabazar" data-name="Ayubia Bazar" data-distance="160 m" data-driving-time="1 min" data-walking-time="3 min"  />
            <use href="/svg/chairlift/chairlift.svg#chairLift" data-name="Ayubia Chair Lift" data-distance="4.9 km" data-driving-time="7 min" data-walking-time="47 min"  />
            <use href="/svg/chandatophill/chandaTopHill.svg#chandaTopHill" data-name="Chanda Top Hill" data-distance="900 m" data-driving-time="3 min" data-walking-time="12 min"  />
            <use href="/svg/forestHouse/forestHouse.svg#forestHouse" data-name="Alnoor Waterfall" data-distance="230 m" data-driving-time="4 min" data-walking-time="8 min"  />
            <use href="/svg/tunnel/tunnel.svg#tunnel" data-name="Ayubia Moto Tunnel" data-distance="2.9 km" data-driving-time="7 min" data-walking-time="45 min"    />
          
            <use href="/svg/harsukhlogo/harsukhLogo.svg#harsukhLogo"   />
            <use href="/svg/pinLocation/pinLocation.svg#pinLocation"  />
          </>
        )}
        {svgVisibility.roads && (
          <use href="/svg/roadLabel/roadLabel.svg#roadLabel" />
        )}
        {/* Add radius SVG here when available */}
      </svg>
      {/* <div className={styles.controls}>
        <button onClick={() =>{ console.log("LandMarks"); toggleSVGVisibility('landmarks')}}>
          Toggle Landmarks
        </button>
        <button onClick={() => toggleSVGVisibility('roads')}>
          Toggle Roads
        </button>
        <button onClick={() => toggleSVGVisibility('radius')}>
          Toggle Radius
        </button>
      </div> */}

      <AnimatePresence>
        {hoverInfo && (
          <motion.div
            className={styles.popupInfo}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: `${hoverInfo.x}px`,
              top: `${hoverInfo.y - 70}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className={styles.popupGrid}>
              {/* <h3>{hoverInfo.name}</h3>
              <p>{hoverInfo.distance}</p>
              <div className={styles.timeInfo}>
                <span>🚗 {hoverInfo.drivingTime}</span>
                <span>🚶 {hoverInfo.walkingTime}</span>
              </div> */}

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