import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/styles/Floor/floorMenu.module.css';
import ElevStyles from "@/styles/elevation.module.css";
import { toggleElevation } from "@/state/Elevation/ElevationState";
import { toggleFloorMenu } from '@/state/floor/FloorMenu';
import en from '@/app/component/locales/en.json';
import ur from '@/app/component/locales/ur.json';
import ElevationBox from '@/app/component/ui/Bars/elevationBox';

// Constants
const MOBILE_BREAKPOINT = 768;

// Utility functions
const checkMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

const FloorMenu = () => {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();
  const isMediumScreen = useMediaQuery({ query: `(max-width: ${MOBILE_BREAKPOINT}px)` });

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentFloorLabel, setCurrentFloor] = useState(null);
  const [elevationArray, setElevationArray] = useState([]);

  // Refs
  const floorMenuRef = useRef(null);
  const elevationRef = useRef(null);

  // Selectors
  const languageState = useSelector((state) => {
    const langState = state.language.lang.find((site) => site.id === '1');
    return langState ? langState.language : 'en';
  });
  const { isElevationClicked } = useSelector((state) => state.elevation);
  const { isFloorClicked } = useSelector((state) => state.floorMenu);

  // Memoized values
  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

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

  // Effects
  useEffect(() => {
    const handleResize = () => setIsMobile(checkMobile());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  useEffect(() => {
    const currentFloor = pathname.split('/')[1];
    setSelectedFloor(currentFloor);
  }, [pathname]);

  useEffect(() => {
    const { floor } = params;
    const currentFloor = floors.find(item => item.id === floor);
    const floorLabel = currentFloor ? currentFloor.label : `Floor ${floor}`;
    setCurrentFloor(floorLabel);
    setElevationArray([
      { id: '1', label: translations["mapview"], route: '/map-view' },
      { id: '2', label: translations["elevation"], route: '/explore' },
      { id: '3', label: floorLabel, route: `/${floor}` },
    ]);
  }, [params, translations, floors]);

  // Callbacks
  const toggleDropdown = useCallback(() => {
    if (isMediumScreen) {
      setIsOpen(prevState => !prevState);
    }
  }, [isMediumScreen]);

  const elevationDropdown = useCallback(() => {
    setIsElevationOpen(prevState => !prevState);
  }, []);

  const handleElevationClicked = useCallback(() => {
    dispatch(toggleElevation());
  }, [dispatch]);

  const handleFloorSelect = useCallback((floor) => {
    setSelectedFloor(floor.id);
    setIsOpen(false);
    router.push(`/${floor.id}`);
  }, [router]);

  const handleElevationItemClick = useCallback((route) => {
    router.push(route);
  }, [router]);

  const handleBackClick = useCallback(() => {
    router.push('/explore');
  }, [router]);

  // Render functions
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

  const renderLogo = () => (
    <div 
      className={styles.Harsukhlogo} 
      style={{cursor:'pointer'}} 
      onClick={() => router.push("/")}
    >
      <Image 
        src="https://cdn.theharsukh.com/Webpage/floors/HarsukhLogo.webp" 
        quality={100} 
        alt="Harsukh Logo" 
        height={isMobile ? 85 : 105} 
        width={isMobile ? 150 : 180} 
      />
    </div>
  );

  const renderFloorMenu = () => (
    <>
      {!isMediumScreen ? (
        <div className={styles.container}>
          <div className={styles.floorLabel}>{translations["Floor"]}</div>
          <div className={`${styles.floorBar} ${styles.open}`}>
            {renderFloorButtons()}
          </div>
        </div>
      ) : (
        isFloorClicked && (
          <div className={styles.containerOutside}>
            <div className={styles.containerMob} ref={floorMenuRef}>
              <div className={styles.floorLabel}>
                {translations["Floor"]}
              </div>
              <div className={`${styles.floorBar} ${styles.open}`}>
                {renderFloorButtons()}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );

  const renderElevationBox = () => (
    isElevationClicked && (
      <ElevationBox
        isVisible={isElevationClicked}
        onClose={handleElevationClicked}
        elevationArray={elevationArray}
      />
    )
  );

  const renderElevationButton = () => (
    !isMediumScreen && (
      <div className={ElevStyles.elevationApContainer}>
        <div className={ElevStyles.elevationButtonBox} ref={elevationRef}>
          <div className={`${ElevStyles.elevationBtnGrid} ${isElevationOpen ? ElevStyles.open : ''}`}>
            <div className={ElevStyles.elevationBtnLeft} onClick={handleBackClick}>
              <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
            </div>
            <div className={ElevStyles.elevationBtnRight} onClick={elevationDropdown}>
              <div className={ElevStyles.elevationBtnTitle}>
                {!isElevationOpen ? currentFloorLabel : translations["location"]}
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
                  if (item.route !== router.asPath) {
                    handleElevationItemClick(item.route);
                  }
                }}
                className={`${ElevStyles.dropDownfloorButton} ${item.route === `/${params.floor}` ? ElevStyles.active : ''}`}
              >
                {translations[item.label.toLowerCase()] || item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );

  // Main render
  return (
    <>
      {renderLogo()}
      {renderFloorMenu()}
      {renderElevationBox()}
      {renderElevationButton()}
    </>
  );
};

export default React.memo(FloorMenu);