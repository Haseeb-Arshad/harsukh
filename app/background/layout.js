'use client';
import React from 'react';
import Image from "next/image";
import styles from "@/styles/ImageBackground.module.css";

import en from '../locales/en.json';
import ur from '../locales/ur.json';
import Loading from '../[floor]/Loading';


export default function Layout({ children }) {
  const [menuBox, setMenuBox] = React.useState(false);
  const [filterbox, setFilterBox] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [overlay, setOverlay] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('AVAILABLE');
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    console.log(language === 'en' ? ur : en)
    setTranslations(language === 'en' ? ur : en);
  }, [language]);


  const toggleLanguage = () => {
    console.log(language)
    console.log("TRANSLATIONS", translations)
    setLanguage(prevLang => prevLang === 'en' ? 'ur' : 'en');
  }

  const handleMenu = () => {
    setMenuBox(!menuBox);
    console.log("menu clicked");
  }

  const handleFilter = () => {
    setFilterBox(!filterbox);
    console.log("Filter clicked");
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

  const handleOverlay = () => {
    setOverlay(!overlay);
    console.log(overlay);
    console.log("overlay clicked");
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (

    // <Suspense fallback={<Loading />}>
    <div className={`${styles.mainContainer} ${language === 'ur' ? styles.rtl : ''}`}>
            {children}
          {/* <div className={styles.topLogoContainer}>
            <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={105} width={180} />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.seasonsButton}>
              <div className={styles.seasonButtonLeft}>
                <Image src="/images/icons/LeftArrow.svg" quality={100} alt="bird" height={18} width={18} />
              </div>
              <div className={styles.seasonButtonTitle}>Seasons</div>
              <div className={styles.seasonButtonRight}>
                <Image src="/images/icons/downArrow.svg" quality={100} alt="bird" height={22} width={22} />

              </div>
            </div>
            <div className={styles.buttonFilters} onClick={handleFilter}>
              <div className={styles.filtersButtonLeft}>
                <Image src="/images/icons/filterIcon.svg" quality={100} alt="bird" height={17} width={17} />
              </div>
              <div className={styles.filtersButtonTitle}>Filters</div>
            </div>
          </div>
          <div className={styles.bottomLogoContainer}>
            <Image src="/Webpage/floors/ArtBoardLogo.png" quality={100} alt="bird" height={220} width={220} />
          </div>
          <div className={styles.menuContainer}>
            <div className={`${styles.menuButton} ${menuBox && styles.active}`} onClick={handleMenu}>
              {translations.menu}
            </div>
          </div> */}

          {/* { menuBox &&
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
          }

            { filterbox &&

              <div className={styles.filterBar}>
                <div className={styles.filterBox}>
                  <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="bird" height={105} width={180} />
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
            } */}
          </div>

);
}