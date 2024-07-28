'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/floorMenu';
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import styles from "@/styles/ImageBackground.module.css";
import styles2 from "@/styles/apartment/apartmentLayout.module.css";
import Loading from '../Loading';
import { Suspense } from "react";
import Apartment from '@/app/component/apartment';
import ElevStyles from "@/styles/elevation.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '@/state/language/languageState';


import en from '@/app/locales/en.json';
import ur from '@/app/locales/ur.json';

const ApartmentPage = dynamic(() => import('../../component/apartment'), {
  loading: () => <Loading />,
});


const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const pathname = usePathname();
  const floor_text = pathname.split('/')[1];
  const floor = floor_text.toLowerCase();
  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const floorData = {
    basement1: { imageLink: "/Webpage/apartments/penthouse01.webp", imageName: "penthouse" },
  
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
    console.log(currentFloor)
  }, [currentFloor])

  const handleResetZoom = () => {
    if (viewer) {
      viewer.viewport.goHome();
    }
  };

  return (
    <>
     <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }>

      <div style={{ height: '100vh' }}>
        <ApartmentPage imageLink={currentFloor.imageLink} imageName={currentFloor.imageName} />
      </div>

      {/* <Loading /> */}
{/*  */}
      {/* <FloorMenu /> */}
        {/* <div className={styles2.GalleryBox}>
          <div className={styles2.GalleryBoxTitle}>
            Gallery
          </div>

        </div> */}

   

      </Suspense>
     
    </>
  );
};

export default Page;