import React, { useState,  useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/Floor/floorMenu.module.css';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ElevStyles from "@/styles/elevation.module.css";

// import totalFloor from './data/TotalFloorData';
// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';

const FloorMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const isMediumScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const [isMobile, setIsMobile] = useState(false);
  const [harsukhHeight, setHarsukhHeight] = useState(105);
  const [harsukhWidth, setHarsukhWidth] = useState(180);
  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkLaptop = () => setIsLaptop(window.innerWidth > 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(()=>
  {
    if(isMobile)
    {
      setHarsukhHeight(85)
      setHarsukhWidth(150)
    }
    else{
      setHarsukhHeight(105);
      setHarsukhWidth(180);
    }
  }
    ,[isMobile])


  const params = useParams();

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

  const totalFloor = [
    { id: 'thirdFloor', label: translations.thirdfloor || 'Third Floor' },
    { id: 'secondFloor', label: translations.secondfloor || 'Second Floor' },
    { id: 'firstFloor', label: translations.firstfloor || 'First Floor' },
    { id: 'groundfloor', label: translations.groundfloor || 'Ground Floor' },
    { id: 'basement1', label: translations.basement1 || 'Vallery Floor 1' },
    { id: 'basement3', label: translations.basement3 || 'Vallery Floor 3' },
    { id: 'basement4', label: translations.basement4 || 'Vallery Floor 4' },
    { id: 'basement5', label: translations.basement5 || 'Vallery Floor 5' },
    { id: 'basement6', label: translations.basement6 || 'Vallery Floor 6' },
  ];

  const elevationRef = useRef(null);
  const [currentFloorLabel, setCurrentFloor ] = useState(null);

  const handleBackClick = () => {
    // Extract the floor from the current URL
    // Navigate to the floor route
    router.push(`/`);
};

  useEffect(() => {
    function handleClickOutside(event) {
      if (elevationRef.current && !elevationRef.current.contains(event.target)) {
        setIsElevationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  const floors = useMemo(() => [
    { id: 'thirdFloor', label: translations.thirdfloor || 'Third Floor' },
    { id: 'secondFloor', label: translations.secondfloor || 'Second Floor' },
    { id: 'firstFloor', label: translations.firstfloor || 'First Floor' },
    { id: 'groundfloor', label: translations.groundfloor || 'Ground Floor' },
    { id: 'basement1', label: translations.basement1 || 'Valley Floor 1' },
    { id: 'basement3', label: translations.basement3 || 'Valley Floor 3' },
    { id: 'basement4', label: translations.basement4 || 'Valley Floor 4' },
    { id: 'basement5', label: translations.basement5 || 'Valley Floor 5' },
    { id: 'basement6', label: translations.basement6 || 'Valley Floor 6' },
  ], [translations]);

  useEffect(() => {
    const currentFloor = pathname.split('/')[1];
    setSelectedFloor(currentFloor);
  }, [pathname]);

  const toggleDropdown = useCallback(() => {
    if (isMediumScreen) {
      setIsOpen(prevState => !prevState);
    }
  }, [isMediumScreen]);

  const elevationDropdown = useCallback(() => {
    setIsElevationOpen(prevState => !prevState);
  }, []);

  const handleFloorSelect = useCallback((floor) => {
    setSelectedFloor(floor.id);
    setIsOpen(false);
    router.push(`/${floor.id}`);
  }, [router]);

  const renderFloorButtons = useCallback(() => {
    return floors.map((floor, index) => (
      <div
        key={floor.id}
        onClick={() => handleFloorSelect(floor)}
        className={`${styles.floorButton} ${selectedFloor === floor.id ? styles.active : ''}`}
        style={{ 
          animationDelay: `${0.1 + index * 0.05}s`,
          transition: 'background-color 0.3s, color 0.3s'
        }}
      >
        {floor.label}
      </div>
    ));
  }, [floors, handleFloorSelect, selectedFloor]);
  const [elevationArray, setElevationArray] = useState([]);


  const handleElevationItemClick = useCallback((route) => {
    router.push(route); // Navigate to the selected route
}, [router]);

  useEffect(() => {
    const { floor } = params;
    const currentFloor = totalFloor.find(item => item.id === floor);
    const floorLabel = currentFloor ? currentFloor.label : `Floor ${floor}`;
    setCurrentFloor(floorLabel)
    setElevationArray([
      { id: '1', label: 'Map View', route: '/mapview' },
      { id: '2', label: 'Elevation', route: '/' },
      { id: '3', label: floorLabel, route: `/${floor}` },
    ]);
  }, [params, translations]);

  const getCurrentFloorLabel = () => {
    const currentFloor = totalFloor.find(item => item.id === params.floor);
    const currentFloorUpdate = currentFloor ? currentFloor.label : `Floor ${params.floor}`
    setCurrentFloor(currentFloorUpdate)
    return currentFloorUpdate;
  };



  
  return (
    <>
    
      <div className={styles.Harsukhlogo}>
        <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="Harsukh Logo" height={harsukhHeight} width={harsukhWidth} />
      </div>
      
      {/* <div className={styles.bottomLogoContainer}>
        <Image src="/Webpage/floors/MainLogo.png" quality={100} alt="ArtBoard Logo" height={300} width={300} />
      </div> */}


        {
          !isMediumScreen &&
          <>
        <div className={styles.container}>
          <div className={styles.floorLabel}>Floor</div>
          <div className={`${styles.floorBar} ${styles.open}`}>
            {renderFloorButtons()}
          </div>
        </div>
          </>
        }

      {/* {isMediumScreen ? (
        <div className={styles.container}>
          <div className={`${styles.floorLabel} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
            {translations.floor || 'Floor'}
          </div>
          <div className={`${styles.floorBar} ${isOpen ? styles.open : ''}`}>
            { isOpen &&
            <>
              {renderFloorButtons()}
            </>
            }
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.floorLabel}>Floor</div>
          <div className={`${styles.floorBar} ${styles.open}`}>
            {renderFloorButtons()}
          </div>
        </div>
      )} */}

      
{ !isMediumScreen &&
    <div className={ElevStyles.elevationApContainer}>
      <div className={ElevStyles.elevationButtonBox}  ref={elevationRef} >
          <div
              className={`${ElevStyles.elevationBtnGrid} ${isElevationOpen ? ElevStyles.open : ''}`}
            >
              <div className={ElevStyles.elevationBtnLeft} onClick={handleBackClick}>
                <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
              </div>
              <div
                className={ElevStyles.elevationBtnRight}
                onClick={elevationDropdown}

              >
                <div className={ElevStyles.elevationBtnTitle}>

                  
                  { !isElevationOpen?
                 currentFloorLabel
                  : 
                    "Location"
                  }
                </div>
                <div className={ElevStyles.elevationBtnDownArrow}>
                  <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
                </div>
              </div>
            </div>
            <div className={`${ElevStyles.dropDownElevationBox} ${isElevationOpen ? ElevStyles.open : ''}`}>
                {elevationArray.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.route !== router.asPath) { // Check if the route is different
                        handleElevationItemClick(item.route);
                      }
                    }}
                    className={`${ElevStyles.dropDownfloorButton} ${item.route === `/${params.floor}` ? ElevStyles.active : ''}`} // Set active based on current floor
                  >
                    {translations[item.label.toLowerCase()] || item.label}
                  </div>
                ))}
              </div>

          </div>
        </div>
}

    </>
  );
};

export default React.memo(FloorMenu);




// const svgContent = `
// <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10000 10000" preserveAspectRatio="none">
//   <polygon data-image="Penthouse 01" data-tip="penthouse01" class="${styles.st0}" points="333.05 190.04 458.47 136.61 458.47 195.31 471.31 195.31 471.31 190.96 483.69 190.96 483.69 173.99 586.19 173.99 586.19 226.96 598.8 226.96 598.8 223.29 612.1 223.29 612.1 226.96 663.47 226.96 663.47 351.92 611.64 351.92 611.64 439.98 640.76 439.98 640.76 528.25 611.99 528.25 611.87 529.52 605.57 529.52 477.96 529.52 348.98 529.52 348.98 190.73 333.05 190.04" />
//   <polygon data-image="Penthouse 02" data-tip="penthouse02" class="${styles.st0}" points="739.98 261.27 689.22 261.27 689.22 375.92 739.98 375.92 739.98 439.21 711.85 439.21 711.85 530.01 905.61 528.94 905.61 468.18 957.66 468.18 957.66 530.01 1064.28 528.71 1064.28 530.01 1087.67 530.01 1152.56 530.01 1152.56 439.52 1123.67 439.98 1123.67 374.39 1175.03 374.62 1175.03 263.41 1123.9 263.64 1120.23 263.64 1120.23 258.6 1079.18 258.6 1079.18 222.37 784.53 222.37 784.53 258.83 746.47 258.83 746.47 267.54 740.74 267.54 739.98 261.27" />
//   <polygon data-image="Penthouse 03" data-tip="penthouse03" class="${styles.st0}" points="1277.53 303.54 1402.95 362.7 1443.77 362.7 1443.77 345.96 1502.93 345.96 1502.93 362.7 1495.29 362.7 1495.29 375.24 1501.48 375.24 1501.48 408.33 1495.21 408.33 1495.21 420.94 1508.05 420.94 1508.05 412.61 1540.36 412.61 1540.36 473.97 1540.36 529.25 1444.69 529.25 1223.03 529.25 1223.03 440.43 1251.77 440.43 1251.77 425.76 1200.71 425.76 1200.71 329.15 1251.77 329.15 1251.77 375.92 1263.69 375.92 1263.69 368.89 1277.45 368.89 1277.53 303.54" />
//   <polygon data-image="Penthouse 04" data-tip="penthouse04" class="${styles.st0}" points="1223.18 575.26 1223.18 663.54 1251.85 663.54 1251.85 677.3 1200.71 677.3 1200.71 774.06 1251.85 774.06 1251.85 733.94 1276.84 733.94 1276.84 794.47 1404.56 733.94 1443.54 733.94 1443.54 750.22 1503.16 749.99 1503.16 733.94 1508.2 733.94 1508.2 684.87 1539.85 684.87 1539.85 574.34 1351.36 574.34 1252.31 574.34 1223.18 575.26" /> 
//   <polygon data-image="Penthouse 05" data-tip="penthouse05" class="${styles.st0}" points="711.16 575.95 711.16 663.54 740.28 663.54 740.28 722.01 688.92 722.01 688.92 835.98 740.28 835.98 740.28 846.06 784.53 846.06 784.53 868.08 1078.73 868.08 1078.73 840.79 1123.67 840.79 1123.67 835.75 1174.57 835.75 1174.57 724.53 1123.67 724.53 1123.67 663.77 1152.79 663.77 1152.79 574.34 1026.67 574.34 962.47 574.34 962.47 614.7 876.71 614.7 876.71 613.5 874.88 613.5 874.88 574.34 768.88 574.34 768.88 573.48 746.24 573.48 746.24 574.17 739.99 574.17 739.99 576.29 711.16 575.95" />
//   <polygon data-image="Penthouse 06" data-tip="penthouse06" class="${styles.st0}" points="348.79 574.5 357.96 574.5 435.62 574.5 612.33 574.5 612.33 575.87 640.76 575.87 640.76 663.62 611.87 663.62 611.87 752.13 662.32 752.13 662.32 862.8 611.57 862.8 611.57 867.85 599.03 867.85 599.03 863.11 586.34 863.11 586.34 917.07 483.77 917.07 483.77 912.94 470.93 912.94 470.93 907.75 458.09 907.75 458.09 966.75 332.13 912.79 352.76 912.79 352.76 900.02 349.25 900.02 349.25 844.31 349.25 680.51 348.79 574.5" />
// </svg>
// `;


