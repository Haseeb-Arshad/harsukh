'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FloorMenu from '@/app/component/floorMenu';
import Floor from '../component/floor';
import styles from '@/styles/floorApartment.module.css';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const floor_text = pathname.split('/')[1];
  const floor = floor_text.toLowerCase();

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [floor]);

  const renderFloorContent = (floor) => {
    const floorData = {
      basement1: { imageLink: "/Webpage/floors/basement1.png", imageName: "Basement 1" },
      basement3: { imageLink: "/Webpage/floors/basement3.png", imageName: "Basement 3" },
      basement4: { imageLink: "/Webpage/floors/basement4.png", imageName: "Basement 4" },
      basement5: { imageLink: "/Webpage/floors/basement5.png", imageName: "Basement 5" },
      basement6: { imageLink: "/Webpage/floors/basement6.png", imageName: "Basement 6" },
      groundfloor: { imageLink: "/Webpage/floors/groundfloor.png", imageName: "Ground Floor" },
      secondfloor: { imageLink: "/Webpage/floors/secondfloor.png", imageName: "Second Floor" },
      thirdfloor: { imageLink: "/Webpage/floors/thirdfloor.png", imageName: "Second Floor" },
    };

    const { imageLink, imageName } = floorData[floor] || floorData.basement1;

    return (
      <div className={`${styles.floorContainer} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
        <Floor imageLink={imageLink} imageName={imageName} />
      </div>
    );
  };

  return (
    <>
      {renderFloorContent(floor)}
      <FloorMenu />
    </>
  );
};

export default Page;


{ imageName === 'thirdFloor' && <div style={{ position: 'absolute', top: '7%', left: '14.9%', width: '70%', height: '70%' }}>

<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs></defs>
<polygon className={styles.st0} points="1277.53 303.54 1402.95 362.7 1443.77 362.7 1443.77 345.96 1502.93 345.96 1502.93 362.7 1495.29 362.7 1495.29 375.24 1501.48 375.24 1501.48 408.33 1495.21 408.33 1495.21 420.94 1508.05 420.94 1508.05 412.61 1540.36 412.61 1540.36 473.97 1540.36 529.25 1444.69 529.25 1223.03 529.25 1223.03 440.43 1251.77 440.43 1251.77 425.76 1200.71 425.76 1200.71 329.15 1251.77 329.15 1251.77 375.92 1263.69 375.92 1263.69 368.89 1277.45 368.89 1277.53 303.54"/>
<polygon className={styles.st0} points="1223.18 575.26 1223.18 663.54 1251.85 663.54 1251.85 677.3 1200.71 677.3 1200.71 774.06 1251.85 774.06 1251.85 733.94 1276.84 733.94 1276.84 794.47 1404.56 733.94 1443.54 733.94 1443.54 750.22 1503.16 749.99 1503.16 733.94 1508.2 733.94 1508.2 684.87 1539.85 684.87 1539.85 574.34 1351.36 574.34 1252.31 574.34 1223.18 575.26"/>
</svg>             
</div>

}


  {/* <div className={styles.elevationButton}>
      <div className={styles.eventsButtoninside} onClick={elevationDropdown}>
        <div className={styles.elevationButtonTitle}>
          Elevation
        </div>
        <div className={styles.elevationButtonArrow}>
          <Image src="/images/icons/downArrow.svg" quality={100} alt="Down" height={20} width={20} />
        </div>
      </div>

      <div className={`${styles.elevationBar} ${isElevationOpen ? styles.open : ''}`}>
      {floors.map((floor, index) => (
        <div
          key={floor.id}
          // onClick={() => handleFloorSelect(floor)}
          className={`${styles.ElevationBtn} ${selectedFloor === floor.id ? styles.active : ''}`}
          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
          {floor.label}
        </div>
      ))}
      </div>

    </div> */}



{/*             
            <div className={styles.menuContainer}>
              <div className={styles.menuButton} onClick={handleMenu}>
                Menu
              </div>
            </div>

            { menuBox &&
              <div className={styles.menuOptionContainer}>
                <div className={styles.menuBox}>
                  <div className={styles.menuBoxIcon}>
                  
                  </div>
                  <div className={styles.menuBoxTitle}>
                      Change Langauge
                  </div>
                </div>
                <div className={styles.menuBox}>
                  <div className={styles.menuBoxIcon}>
                    { 
                      overlay ?
                      <Image src="/images/icons/unhide.svg" quality={100} alt="Unhide" height={30} width={30} />
                        :
                      <Image src="/images/icons/hide.svg" quality={100} alt="Unhide" height={30} width={30} />
                      }
                  </div>
                  <div className={styles.menuBoxTitle} onClick={handleOverlay}>
                    {overlay ? 'Hide Overlays' : 'Show Overlays'}
                  </div>
                </div>
                <div className={styles.menuBox}>
                  <div className={styles.menuBoxIcon}>
                    <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
                  </div>
                  <div className={styles.menuBoxTitle} onClick={toggleFullScreen}>
                     {fullScreen ? 'Exit Full Screen' : 'Full Screen'}
                  </div>
                </div>
                <div className={styles.menuBox}>
                  <div className={styles.menuBoxIcon}>
                    <Image src="/images/icons/contactIcon.svg" quality={100} alt="Contact" height={26} width={26} />

                  </div>
                  <div className={styles.menuBoxTitle}>
                      Contact Us
                  </div>
                </div>

                <div className={styles.menuBoxContactIcons}>
                  <div className={styles.menuBoxContactIconbox}>
                    JK
                  </div>
                  <div className={styles.menuBoxContactIconbox}>

                  </div>
                  <div className={styles.menuBoxContactIconbox}>

                  </div>
                  <div className={styles.menuBoxContactIconbox}>

                  </div>

                </div>

              </div>
            } */}


   {/* { filterbox && */}
   <>
   <div className={`${styles.filterBar} ${isFilterBarVisible ? styles.show : ''}`}>
     <div className={styles.filterBox}>
       <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={105} width={180} />
     </div>
    

   <div className={styles.buttonsfilterContainer}>
     <div className={styles.seasonsFilterButton}>
       <div className={styles.seasonButtonLeft}>
         <Image src="/images/icons/LeftArrow.svg" quality={100} alt="bird" height={14} width={14} />
       </div>
       <div className={styles.seasonButtonTitle}>Seasons</div>
       {/* <div className={styles.seasonButtonRight}>
         <Image src="/images/icons/downArrow.svg" quality={100} alt="bird" height={20} width={20} />

       </div> */}
     </div>
   </div>
   <div className={styles.filterFloorBox}>
       <div className={styles.filterFloorBoxInside}>
         <div className={styles.floorBoxTabTitle}>
           AMENITIES
         </div>
         <div className={styles.floorBoxTabTitle}>
           STUDIO APARTMENTS
         </div>
         <div className={styles.floorBoxTabTitle}>
           1 BED APARTMENTS
         </div>
         <div className={styles.floorBoxTabTitle}>
           2 BED APARTMENTS
         </div>
         <div className={styles.floorBoxTabTitle}>
           3 BED APARTMENTS
         </div>
         <div className={styles.floorBoxTabTitle}>
           PENT HOUSES
         </div>
         
       </div>
       <div className={styles.filterFloorBoxInside}>
       </div>
   </div>

  

 </div> 

  {!isMobile && <div className={`${styles.buttonPressedFilters} ${isFilterBarVisible ? styles.show : ''}`} onClick={handleFilter}>
     <div className={styles.filtersPressedButtonLeft}>
       <Image src="/images/icons/filterIcon.svg" quality={100} alt="bird" height={17} width={17} />
     </div>
   </div>}

 </>
 {/* } */}

  {/* <div className={`${styles.filterBars}`}>
           

              <div className={styles.buttonfilterContainer}>
                <div className={styles.btnFilter}>
                  <div className={styles.filterBtn}>
                    Amenities
                  </div>
                  <div className={styles.filterBtn}>
                    Booked
                  </div>
                  <div className={styles.filterBtn}>
                    Sold
                  </div>
    
                </div>
              </div>

              <div className={styles.filterFloorBox}>
                  <div className={styles.filterFloorBoxInside}>
                    <div className={styles.floorBoxTabTitle}>
                      AMENITIES
                    </div>
                    <div className={styles.floorBoxTabTitle}>
                      STUDIO APARTMENTS
                    </div>
                    <div className={styles.floorBoxTabTitle}>
                      1 BED APARTMENTS
                    </div>
                    <div className={styles.floorBoxTabTitle}>
                      2 BED APARTMENTS
                    </div>
                    <div className={styles.floorBoxTabTitle}>
                      3 BED APARTMENTS
                    </div>
                    <div className={styles.floorBoxTabTitle}>
                      PENT HOUSES
                    </div>
                    
                  </div>
                  <div className={styles.filterFloorBoxInside}>
                  </div>
              </div>

             

            </div>  */}


      {/* {menuBox &&
      <div className={`${styles.menuOptionContainer} ${styles.slideIn}`}>
        <div className={styles.menuBox} onClick={toggleLanguage}>
          <div className={styles.menuBoxIcon}>
            <Image src="/images/icons/translate.svg" quality={100} alt="Translate" height={30} width={30} />
          </div>
          <div className={styles.menuBoxTitle}>
            {translations.changeLanguage}
          </div>
        </div>
        <div className={styles.menuBox} onClick={handleOverlay}>
          <div className={styles.menuBoxIcon}>
            { 
              overlay ?
              <Image src="/images/icons/unhide.svg" quality={100} alt="Unhide" height={30} width={30} />
                :
              <Image src="/images/icons/hide.svg" quality={100} alt="Hide" height={30} width={30} />
            }
          </div>
          <div className={styles.menuBoxTitle}>
            {overlay ? translations.hideOverlays : translations.showOverlays}
          </div>
        </div>
        <div className={styles.menuBox} onClick={toggleFullScreen}>
          <div className={styles.menuBoxIcon}>
            <Image src="/images/icons/fullScreen.svg" quality={100} alt="Full Screen" height={19} width={19} />
          </div>
          <div className={styles.menuBoxTitle}>
            {fullScreen ? translations.exitFullScreen : translations.fullScreen}
          </div>
        </div>
        <div className={styles.menuBox}>
          <div className={styles.menuBoxIcon}>
            <Image src="/images/icons/contactIcon.svg" quality={100} alt="Contact" height={26} width={26} />
          </div>
          <div className={styles.menuBoxTitle}>
            {translations.contactUs}
          </div>
        </div>

        <div className={styles.menuBoxContactIcons}>
          <div className={styles.menuBoxContactIconbox}>
            <Image src="/images/icons/youtube.svg" quality={100} alt="YouTube" height={23} width={23} />
          </div>
          <div className={styles.menuBoxContactIconbox}>
            <Image src="/images/icons/LinkedInIcon.svg" quality={100} alt="LinkedIn" height={20} width={20} />
          </div>
          <div className={styles.menuBoxContactIconbox}>
            <Image src="/images/icons/facebookIcon.svg" quality={100} alt="Facebook" height={20} width={23} />
          </div>
          <div className={styles.menuBoxContactIconbox}>
            <Image src="/images/icons/InstaIcon.svg" quality={100} alt="Instagram" height={26} width={26} />
          </div>
        </div>
      </div>
      } */}


    
      {/* <div className={styles.menuContainer}>
        <div className={`${styles.menuButton} ${menuBox && styles.active}`} onClick={handleMenu}>
          {translations.menu}
        </div>
      </div> */}

        {/* <div className={`${styles.buttonsContainer} `}>
          <div className={`${styles.elevationBox  } ${isElevationOpen ? styles.open : ''}`} >
            <div className={`${styles.evelationButton} `} >
              <div className={styles.elevationButtonLeft}>
                <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
              </div>
              <div className={styles.elevationButtonTitle}>
                Elevation
              </div>
              <div className={styles.elevationButtonRight}  onClick={elevationDropdown} onMouseEnter={() => setIsElevationOpen(true)} onMouseLeave={() => setIsElevationOpen(false)}>
                <Image src="/images/icons/downArrow.svg" quality={100} alt="Elevation" height={20} width={20} />
              </div>
            </div>
          </div>
        </div> */}

               
             {/* {!isMobile && <div className={`${styles.buttonPressedFilters} ${isFilterBarVisible ? styles.show : ''}`} onClick={handleFilter}>
                <div className={styles.filtersPressedButtonLeft}>
                  <Image src="/images/icons/filterIcon.svg" quality={100} alt="bird" height={17} width={17} />
                </div>
              </div>} */}
   

