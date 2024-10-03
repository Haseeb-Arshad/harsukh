

'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import FloorMenu from '@/app/component/ui/floor/floorMenu';
import styles from "@/styles/ImageBackground.module.css";
import Loading from '@/app/component/ui/Loading/Loading';
import Head from 'next/head';

const Floor = dynamic(() => import('@/app/component/modules/FloorLayout/floor'), {
  loading: () => <Loading />,
  ssr: false,
});

const floorData = {
  "valley-floor-1": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/fhedzbg4rbbwi1dxqvla.webp", floorname: 'Valley Floor 1', imageName: "valley-floor-1", svgFile: "/svg/basement1/B1.1-01.svg" },
  "valley-floor-3": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/oavkmlubaaeodqt1hybh.webp", floorname: 'Valley Floor 3', imageName: "valley-floor-3", svgFile: "/svg/basement3/B3-01.svg" },
  "valley-floor-4": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/zgraopgd026l39cmsqmj.webp", floorname: 'Valley Floor 4', imageName: "valley-floor-4", svgFile: "/svg/basement4/B4-01.svg" },
  "valley-floor-5": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/x7ft24yzvoia1gh9z6dp.webp", floorname: 'Valley Floor 5', imageName: "valley-floor-5", svgFile: "/svg/basement5/B5-01.svg" },
  "valley-floor-6": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/alkljqraarzk52u6atwt.webp", floorname: 'Valley Floor 6', imageName: "valley-floor-6", svgFile: "/svg/basement6/B6-01.svg" },
  "ground-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/sdgx8yr9x5m7fujgmkhz.webp", floorname: 'Ground Floor', imageName: "ground-floor", svgFile: "/svg/groundfloor/G-01.svg" },
  "first-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/dacaey47usruxqtaflbw.webp", floorname: 'First Floor', imageName: "first-floor", svgFile: "/svg/firstfloor/F1-01.svg" },
  "second-floor": { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/u0yuwj9hcksdyrfvt2v6.webp", floorname: 'Second Floor', imageName: "second-floor", svgFile: "/svg/secondfloor/F2-01.svg" },
  'third-floor': { imageLink: "https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/w93ebaknkhgdvho14dam.webp", floorname: 'Third Floor', imageName: "third-floor", svgFile: "/svg/thirdfloor/F3-01.svg" },
};

const FloorPage = ({ amenityClicked, updateAmenityClicked }) => {
  const pathname = usePathname();
  const floor = pathname.split('/')[1].toLowerCase();
  const currentFloor = floorData[floor] || floorData['valley-floor-1'];

  return (
    <>
      <Head>
        <title>{currentFloor.floorname} - Harsukh Residencies</title>
        <meta name="description" content={`Explore the ${currentFloor.imageName} at Harsukh Residencies.`} />
      </Head>

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

export default FloorPage;