'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/floorMenu';
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import styles from "@/styles/ImageBackground.module.css";
import Loading from './Loading';
import { Suspense } from "react";

const Floor = dynamic(() => import('../component/floor'), {
  loading: () => <Loading />,
});


const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const floor_text = pathname.split('/')[1];
  const floor = floor_text.toLowerCase();
  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const floorData = {
    basement1: { imageLink: "/Webpage/floors/basement1.webp", imageName: "Basement 1" },
    basement3: { imageLink: "/Webpage/floors/basement3.webp", imageName: "Basement 3" },
    basement4: { imageLink: "/Webpage/floors/basement4.webp", imageName: "Basement 4" },
    basement5: { imageLink: "/Webpage/floors/basement5.webp", imageName: "Basement 5" },
    basement6: { imageLink: "/Webpage/floors/basement6.webp", imageName: "Basement 6" },
    groundfloor: { imageLink: "/Webpage/floors/groundfloor.webp", imageName: "Ground Floor" },
    firstfloor: { imageLink: "/Webpage/floors/firstfloor.webp", imageName: "First Floor" },
    secondfloor: { imageLink: "/Webpage/floors/secondfloor.webp", imageName: "secondfloor" },
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

  return (
    <>
     <Suspense fallback={
        <div className={styles.loadingOverlay}>
          <Loading />
        </div>
      }>

      <div style={{ height: '100vh' }}>
        <Floor imageLink={currentFloor.imageLink} imageName={currentFloor.imageName} />
      </div>

      {/* <Loading /> */}
{/*  */}
      {/* <FloorMenu /> */}

      </Suspense>
     
    </>
  );
};

export default Page;