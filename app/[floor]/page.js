'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/floorMenu';
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import styles from "@/styles/ImageBackground.module.css";
import Loading from './Loading';
import { Suspense } from "react";
import AmenityGrid from '../component/Amenities/AmenityGrid';

const Floor = dynamic(() => import('../component/Floor/index'), {
  loading: () => <Loading />,
});


const Page = ({ amenityClicked, updateAmenityClicked }) => {
  const router = useRouter();
  const pathname = usePathname();
  const floor_text = pathname.split('/')[1];
  const floor = floor_text.toLowerCase();
  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const floorData = {
    basement1: { imageLink: "/Webpage/floors/basement1.webp", imageName: "basement1",  svgFile: "/svg/basement1/B1.1-01.svg" },
    basement3: { imageLink: "/Webpage/floors/basement3.webp", imageName: "basement3", },
    basement4: { imageLink: "/Webpage/floors/basement4.webp", imageName: "basement4" },
    basement5: { imageLink: "/Webpage/floors/basement5.webp", imageName: "basement5" },
    basement6: { imageLink: "/Webpage/floors/basement6.webp", imageName: "basement6" },
    groundfloor: { imageLink: "/Webpage/floors/groundfloor.webp", imageName: "groundFloor" },
    firstfloor: { imageLink: "/Webpage/floors/firstfloor.webp", imageName: "firstFloor" },
    secondfloor: { imageLink: "/Webpage/floors/secondfloor.webp", imageName: "secondFloor" },
    thirdfloor: { imageLink: "/Webpage/floors/thirdfloor.webp", imageName: "thirdFloor" },
  };



  const handleMenu = () => {
    setMenuBox(!menuBox);
    console.log("menu clicked");
  }
  
  const handleOverlay = () => {
    setOverlay(!overlay);
    console.log(overlay)
    console.log("overlay clicked");
  }
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      setFullScreen(!fullScreen);
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
              setFullScreen(!fullScreen);
      }
    }
  }
  
  const currentFloor = floorData[floor] || floorData.basement1; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (amenityClicked && !event.target.closest('.amenity-grid')) {
        updateAmenityClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [amenityClicked, updateAmenityClicked]);


  return (
    <>
     {/* <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }> */}

      <div style={{ height: '100vh' }}>
        <Floor imageLink={currentFloor.imageLink} imageName={currentFloor.imageName}  svgFile={currentFloor.svgFile} />
      </div>

      {/* <Loading /> */}
{/*  */}
      <FloorMenu />

      {/* </Suspense> */}
      {amenityClicked && (
        <div className="amenity-grid">
          <AmenityGrid amenityClicked={amenityClicked} updateAmenityClicked={updateAmenityClicked} />
        </div>
      )}

    </>
  );
};

export default Page;