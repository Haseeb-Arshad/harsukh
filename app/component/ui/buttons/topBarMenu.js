'use client';
import React, { useState } from 'react'
import styles from "@/styles/ImageBackground.module.css";
import Image from "next/image";

import MenubarButton from '@/app/component/Icons/menuBarBtn';
import FavButton from '@/app/component/Icons/favButton';
import BackgroundMode from '@/app/component/Icons/BackgroundMode';


const TopbarMenu = () => {

    // const [menuBox, setMenuBox] = useState(false);

    const handleBackgroundMode = () => {
        // console.log("Background Mode clicked");
      }
    
      const handleFavorties = () => {
        // console.log("Favorties clicked");
      }
    
      const handleAmenities = () => {
        // console.log("Amenities clicked");
      }

  return (
    <>

            <div className={styles.bottomLogoContainer}>
              <Image src="https://cdn.theharsukh.com/Webpage/floors/ArtBoardLogo.png" quality={100} alt="bird" height={190} width={190} />
            </div>

            <div className={styles.mapsViewContainer}>
              <div className={styles.mapsViewBox}>
                <Image 
                  src="/images/icons/mapsViewIcon.svg" 
                  quality={100} 
                  alt="Maps View Icon" 
                  height={19} 
                  width={19} 
                />
              </div>
            </div>

            <div className={styles.callContainer}> 
              <div className={styles.mapsViewBox}>
                <Image src="/images/icons/callIcon.svg" quality={100} alt="Maps View Icon" height={19} width={19} />
              </div>
            </div>

            <div className={styles.menuContainer}>
              <div className={styles.amenitiesButton} onClick={handleAmenities}>
                <div className={styles.amenitiesButtonLeft}>
                  <Image src="/images/icons/amenitiesIcon.svg" quality={100} alt="Menu" height={22} width={22} />
                </div>
                <div className={styles.amenitiesButtonTitle}>
                  Amenities
                </div>
              </div>
              <div className={styles.menuContainerInside}>
                  <BackgroundMode handleMenu={handleBackgroundMode}/>
              </div>
              <div className={styles.menuContainerInside}>
                <FavButton handleMenu={handleFavorties}/>
              </div>
              <div className={styles.menuContainerInside} >
                <MenubarButton handleMenu={handleMenu}/>
              </div>
            </div>
        
    </>
  )
}

export default TopbarMenu