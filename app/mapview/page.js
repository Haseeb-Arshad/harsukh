'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '@/state/mapView/mapViewState'; // Adjust the import path as needed
import styles from '@/styles/maps/mapview.module.css';

const MapView = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dispatch = useDispatch();
  const svgVisibility = useSelector((state) => state.svgVisibility);

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

  const toggleSVGVisibility = (element) => {
    dispatch(toggleVisibility({ element }));
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
        className={styles.svgOverlay}
        viewBox="0 0 5494.76 3090.8"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleSVGElementClick}
      >
        {svgVisibility.landmarks && (
          <>
            <use href="/svg/alnoor-waterfall/alnoorwaterfall.svg#alnoor-waterfall" />
            <use href="/svg/ayubiabazar/ayubiaBazar.svg#ayubiabazar" />
            <use href="/svg/chairlift/chairlift.svg#chairLift" />
            <use href="/svg/chandatophill/chandaTopHill.svg#chandaTopHill" />
            <use href="/svg/forestHouse/forestHouse.svg#forestHouse" />
            <use href="/svg/tunnel/tunnel.svg#tunnel" />
            <use href="/svg/harsukhlogo/harsukhLogo.svg#harsukhLogo" />
            <use href="/svg/pinLocation/pinLocation.svg#pinLocation" />
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
    </div>
  );
};

export default MapView;