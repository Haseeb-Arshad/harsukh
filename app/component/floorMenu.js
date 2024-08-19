import React, { useState,  useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/Floor/floorMenu.module.css';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ElevStyles from "@/styles/elevation.module.css";
import { toggleElevation } from "@/state/Elevation/ElevationState";
import { toggleFloorMenu } from '@/state/floor/FloorMenu';


// import totalFloor from './data/TotalFloorData';
// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import ElevationBox from './Bars/elevationBox';

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
    console.log(languageState, " --- Language State")
    return languageState ? languageState.language : 'en';
  });

  const { isElevationClicked } = useSelector((state) => state.elevation);
  const { isFloorClicked } = useSelector((state) => state.floorMenu); // Corrected selector

  const floorMenuRef = useRef(null);

  
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
  const dispatch = useDispatch();

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

  const totalFloor = [
    { id: 'third-floor', label: translations.thirdfloor || 'Third Floor' },
    { id: 'second-floor', label: translations.secondfloor || 'Second Floor' },
    { id: 'first-floor', label: translations.firstfloor || 'First Floor' },
    { id: 'ground-floor', label: translations.groundfloor || 'Ground Floor' },
    { id: 'valley-floor-1', label: translations.basement1 || 'Valley Floor 1' },
    { id: 'valley-floor-3', label: translations.basement3 || 'Valley Floor 3' },
    { id: 'valley-floor-4', label: translations.basement4 || 'Valley Floor 4' },
    { id: 'valley-floor-5', label: translations.basement5 || 'Valley Floor 5' },
    { id: 'valley-floor-6', label: translations.basement6 || 'Valley Floor 6' },
  ];

  const elevationRef = useRef(null);
  const [currentFloorLabel, setCurrentFloor ] = useState(null);

  const handleBackClick = () => {

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


  
  useEffect(() => {
    setIsOpen(isFloorClicked);
  }, [isFloorClicked]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floorMenuRef.current && !floorMenuRef.current.contains(event.target)) {
        setIsOpen(false);
        dispatch(toggleFloorMenu());
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);
  

  const floors = useMemo(() => [
    { id: 'third-floor', label: translations.thirdfloor || 'Third Floor' },
    { id: 'second-floor', label: translations.secondfloor || 'Second Floor' },
    { id: 'first-floor', label: translations.firstfloor || 'First Floor' },
    { id: 'ground-floor', label: translations.groundfloor || 'Ground Floor' },
    { id: 'valley-floor-1', label: translations.basement1 || 'Valley Floor 1' },
    { id: 'valley-floor-3', label: translations.basement3 || 'Valley Floor 3' },
    { id: 'valley-floor-4', label: translations.basement4 || 'Valley Floor 4' },
    { id: 'valley-floor-5', label: translations.basement5 || 'Valley Floor 5' },
    { id: 'valley-floor-6', label: translations.basement6 || 'Valley Floor 6' },
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


  const handleElevationClicked = () => {
    dispatch(toggleElevation());
  };
  
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
      { id: '1', label: translations["mapview"], route: '/mapview' },
      { id: '2', label: translations["elevation"], route: '/' },
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
    
      <div className={styles.Harsukhlogo} style={{cursor:'pointer', }}  onClick={()=>router.push("/")} >
      <Image  src="/Webpage/floors/HarsukhLogo.webp" quality={100} alt="Harsukh Logo" height={harsukhHeight} width={harsukhWidth} />
      </div>
      
        {
          !isMediumScreen?
          <>
        <div className={styles.container}>
          <div className={styles.floorLabel}>{translations["Floor"]}</div>
          <div className={`${styles.floorBar} ${styles.open}`}>
            {renderFloorButtons()}
          </div>
        </div>
          </>

          :
          <>

     {isFloorClicked && 
     
     <div className={styles.containerOutside}>
      <div className={styles.containerMob} ref={floorMenuRef}>
    
        <div className={styles.floorLabel}>{translations["Floor"]}</div>
          <div className={`${styles.floorBar}  ${styles.open}`} >
            {renderFloorButtons()}
          </div>
        </div>
      </div>
    }

          </>
        }
          { isElevationClicked &&
              (
              <ElevationBox
                isVisible={isElevationClicked}
                // onElevationChange={handleElevationClicked}
                onClose ={handleElevationClicked}
                elevationArray={elevationArray}
              />              
              )
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

<>



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
                    // "Location"
                    translations["location"]
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

    </>
    }

    </>
  );
};

export default React.memo(FloorMenu);
