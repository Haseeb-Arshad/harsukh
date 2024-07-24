import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/floorMenu.module.css';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

// Import translations
import en from '../locales/en.json';
import ur from '../locales/ur.json';

const FloorMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState('');
  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });

  // Get the current language from Redux store
  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  // Set translations based on the current language
  const translations = languageState === 'ur' ? ur : en;

  const floors = [
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

  useEffect(() => {
    const currentFloor = pathname.split('/')[1];
    setSelectedFloor(currentFloor);
  }, [pathname]);

  const toggleDropdown = () => {
    if (isMediumScreen) {
      setIsOpen(!isOpen);
    }
  };

  const elevationDropdown = () => {
    
    setIsElevationOpen(!isElevationOpen);
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor.id);
    setIsOpen(false);
    router.push(`/${floor.id}`);
  };

  return (
    <>
      <div className={styles.Harsukhlogo}>
        <Image src="/Webpage/floors/HarsukhLogo.png" quality={100} alt="Harsukh Logo" height={105} width={180} />
      </div>
      
      <div className={styles.bottomLogoContainer}>
        <Image src="/Webpage/floors/MainLogo.png" quality={100} alt="ArtBoard Logo" height={200} width={200} />
      </div>

      {isMediumScreen && (
        <div className={styles.container}>
          <div className={`${styles.filtersButton} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
            {translations.floor || 'Floor'}
          </div>
          <div className={`${styles.floorBar} ${isOpen ? styles.open : ''}`}>
            {floors.map((floor, index) => (
              <div
                key={floor.id}
                onClick={() => handleFloorSelect(floor)}
                className={`${styles.floorButton} ${selectedFloor === floor.id ? styles.active : ''}`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {floor.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {!isMediumScreen && (
        <div className={styles.container}>
          <div className={styles.floorLabel} >Floor</div>
          <div className={`${styles.floorBar} ${styles.open}`}>
            {floors.map((floor, index) => (
              <div
                key={floor.id}
                onClick={() => handleFloorSelect(floor)}
                className={`${styles.floorButton} ${selectedFloor === floor.id ? styles.active : ''}`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {floor.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div 
        className={styles.elevationButton} 
      >
        
        <div className={`${styles.filtersButton} ${isElevationOpen ? styles.open : ''}`} onClick={elevationDropdown}>
          
        <div className={styles.elevationButtonLeft} onClick={() => router.push('/')}>
          <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
        </div>
        <div
            className={styles.elevationButtonRight}
            onMouseEnter={() => setIsElevationOpen(true)}
            onMouseLeave={() => setIsElevationOpen(false)}
          >
            <div className={styles.elevationButtonTitle}>{translations.elevation || 'Elevation'}</div>
            <div className={styles.elevationButtonDownArrow}>
              <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
            </div>
          </div>
         

        </div>
        
        <div className={`${styles.floorBar} ${isElevationOpen ? styles.open : ''}`} onMouseEnter={() => setIsElevationOpen(true)} 
        onMouseLeave={() => setIsElevationOpen(false)}>
          <div
            onClick={elevationDropdown}
            className={`${styles.dropDownfloorButton} ${selectedFloor === '' ? styles.active : ''}`}
          >
            {translations.elevation || 'Elevation'}
          </div>
          {selectedFloor && (
            <div
              onClick={() => handleFloorSelect(floors.find(f => f.id === selectedFloor))}
              className={`${styles.dropDownfloorButton} ${styles.active}`}
            >
              {floors.find(f => f.id === selectedFloor)?.label}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloorMenu;