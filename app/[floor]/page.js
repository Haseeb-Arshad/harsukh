'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/ui/floor/floorMenu';
import styles from "@/styles/ImageBackground.module.css";
import Loading from '../component/ui/Loading/Loading';

const Floor = dynamic(() => import('../component/modules/FloorLayout/floor'), {
  loading: () => <Loading />,
  ssr: false,
});

const floorData = {
  "valley-floor-1": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/fhedzbg4rbbwi1dxqvla.webp", imageName: "valley-floor-1", svgFile: "/svg/basement1/B1.1-01.svg" },
  "valley-floor-3": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/oavkmlubaaeodqt1hybh.webp", imageName: "valley-floor-3", svgFile: "/svg/basement3/B3-01.svg" },
  "valley-floor-4": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/zgraopgd026l39cmsqmj.webp", imageName: "valley-floor-4", svgFile: "/svg/basement4/B4-01.svg" },
  "valley-floor-5": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/x7ft24yzvoia1gh9z6dp.webp", imageName: "valley-floor-5", svgFile: "/svg/basement5/B5-01.svg" },
  "valley-floor-6": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/alkljqraarzk52u6atwt.webp", imageName: "valley-floor-6", svgFile: "/svg/basement6/B6-01.svg" },
  "ground-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/sdgx8yr9x5m7fujgmkhz.webp", imageName: "ground-floor", svgFile: "/svg/groundfloor/G-01.svg" },
  "first-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/dacaey47usruxqtaflbw.webp", imageName: "first-floor", svgFile: "/svg/firstfloor/F1-01.svg" },
  "second-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/u0yuwj9hcksdyrfvt2v6.webp", imageName: "second-floor", svgFile: "/svg/secondfloor/F2-01.svg" },
  'third-floor': { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/w93ebaknkhgdvho14dam.webp", imageName: "third-floor", svgFile: "/svg/thirdfloor/F3-01.svg" },
};

const Page = ({ amenityClicked, updateAmenityClicked }) => {
  const pathname = usePathname();
  const floor = pathname.split('/')[1].toLowerCase();
  const currentFloor = floorData[floor] || floorData['valley-floor-1'];

  return (
    <>
      <div style={{ height: '100vh', width: '100vw', position: 'fixed' }}>
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