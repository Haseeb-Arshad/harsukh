'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/component/ui/floor/floorMenu'
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import styles from "@/styles/ImageBackground.module.css";
import styles2 from "@/styles/apartment/apartmentLayout.module.css";
import Loading from '@/component/ui/Loading/Loading';
import { Suspense } from "react";
import Apartment from '@/component/modules/ApartmentLayout/apartment';
import ElevStyles from "@/styles/elevation.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '@/state/language/languageState';
import apartmentData from "@/component/data/floorData";

import en from '@/component/locales/en.json';
import ur from '@/component/locales/ur.json';

const ApartmentComponent = dynamic(() => import('@/component/modules/ApartmentLayout/apartment'), {
  loading: () => <Loading />,
});


const ApartmentPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const params = useParams();  
  
  const pathname = usePathname();
  const floor_text = pathname.split('/')[1];
  const floor = floor_text.toLowerCase();
  const [menuBox, setMenuBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  // const apartmentInfo = apartmentData[floorName].find(apt => apt.Apartmentno === apartmentNumber);
  const [apartmentNum, setApartmentNum] = useState(0);

  const [apartmentType, setApartmentType] = useState(null)

  useEffect(() => {
    let foundApartment = null;
    let foundFloor = "";

    const apartmentParam = params.apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? match[0] : null; // Gets the first match or null if no match
    setApartmentNum(apartmentNumber);
    // Search for the apartment in all floors
    for (const floorName in apartmentData) {
      const apartment = apartmentData[floorName].find(
        (apt) => apt.Apartmentno == apartmentNumber
      );

      if (apartment) {

        setApartmentType(apartment.Type)
      }
    }
  
  }, [params.apartment]);

  
  const floorData = {
    'Penthouse': { imageLink: "/api/proxy/Penthouse", imageName: "penthouse" },
    'One Bed': { imageLink: "/api/proxy/OneBed", imageName: "oneBed" },
    'Two Bed': { imageLink: "/api/proxy/TwoBed", imageName: "twoBed" },
    'Three Bed': { imageLink: "/api/proxy/ThreeBed", imageName: "threeBed" },
    'Studio': { imageLink: "/api/proxy/Studio", imageName: "studio" },
    // 'P': { imageLink: "/Webpage/apartments/penthouse.webp", imageName: "penthouse" },
    basement1: { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726498333/harsukh/apartment/snefqxcxhxfua9xwyyl7.webp", imageName: "penthouse" },
    // basement5: { imageLink: "/Webpage/apartments/penthouse.webp", imageName: "penthouse" },
    // basement: { imageLink: "/Webpage/apartments/penthouse.webp", imageName: "penthouse" },
  
  };

  const handleMenu = () => {
    setMenuBox(!menuBox);
  }
  
  const handleOverlay = () => {
    setOverlay(!overlay);

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
  
  const currentFloor = floorData[apartmentType] || floorData.basement1; 
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
        <ApartmentComponent imageLink={currentFloor.imageLink} imageName={currentFloor.imageName} />
      </div>

      </Suspense>
     
    </>
  );
};

export default ApartmentPage;