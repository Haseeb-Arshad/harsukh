'use client';
import React, { useRef, useEffect, useState } from 'react';
import styles from '@/styles/mapview.module.css';

const MapView = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
        <use href="/svg/alnoor-waterfall/alnoorwaterfall.svg#alnoor-waterfall" />
        <use href="/svg/ayubiabazar/ayubiaBazar.svg#ayubiabazar" />
        {/* <use href="/svg/building/building.svg#Layer_9" /> */}
        <use href="/svg/chairlift/chairlift.svg#chairLift" />
        <use href="/svg/flattees/flattees.svg#flattees" />
        <use href="/svg/chandatophill/chandaTopHill.svg#chandaTopHill" />
        <use href="/svg/forestHouse/forestHouse.svg#forestHouse" />
        <use href="/svg/harsukhlogo/harsukhLogo.svg#harsukhLogo" />
        <use href="/svg/pinLocation/pinLocation.svg#pinLocation" />
        <use href="/svg/roadLabel/roadLabel.svg#roadLabel" />
        <use href="/svg/tunnel/tunnel.svg#tunnel" /> 

        {/* 
        <use href="/svg/tunnel/tunnel.svg#tunnel" /> */}
      </svg>
    </div>
  );
};

export default MapView;