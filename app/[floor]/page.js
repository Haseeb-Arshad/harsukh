'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/floorMenu';
import styles from "@/styles/ImageBackground.module.css";
import Loading from './Loading';

const Floor = dynamic(() => import('../component/floor'), {
  loading: () => <Loading />,
  ssr: false,
});

const floorData = {
  "valley-floor-1": { imageLink: "/Webpage/floors/basement1.webp", imageName: "valley-floor-1", svgFile: "/svg/basement1/B1.1-01.svg" },
  "valley-floor-3": { imageLink: "/Webpage/floors/basement3.webp", imageName: "valley-floor-3", svgFile: "/svg/basement3/B3-01.svg" },
  "valley-floor-4": { imageLink: "/Webpage/floors/basement4.webp", imageName: "valley-floor-4", svgFile: "/svg/basement4/B4-01.svg" },
  "valley-floor-5": { imageLink: "/Webpage/floors/basement5.webp", imageName: "valley-floor-5", svgFile: "/svg/basement5/B5-01.svg" },
  "valley-floor-6": { imageLink: "/Webpage/floors/basement6.webp", imageName: "valley-floor-6", svgFile: "/svg/basement6/B6-01.svg" },
  "ground-floor": { imageLink: "/Webpage/floors/groundfloor.webp", imageName: "ground-floor", svgFile: "/svg/groundfloor/G-01.svg" },
  "first-floor": { imageLink: "/Webpage/floors/firstfloor.webp", imageName: "first-floor", svgFile: "/svg/firstfloor/F1-01.svg" },
  "second-floor": { imageLink: "/Webpage/floors/secondfloor.webp", imageName: "second-floor", svgFile: "/svg/secondfloor/F2-01.svg" },
  'third-floor': { imageLink: "/Webpage/floors/thirdfloor.webp", imageName: "third-floor", svgFile: "/svg/thirdfloor/F3-01.svg" },
};

const Page = ({ amenityClicked, updateAmenityClicked }) => {
  const pathname = usePathname();
  const floor = pathname.split('/')[1].toLowerCase();
  const currentFloor = floorData[floor] || floorData['valley-floor-1'];

  return (
    <>
      <div style={{ height: '100vh' }}>
        <Floor
          imageLink={currentFloor.imageLink}
          imageName={currentFloor.imageName}
          svgFile={currentFloor.svgFile}
        />
      </div>
      <FloorMenu />
    </>
  );
};

export default Page;