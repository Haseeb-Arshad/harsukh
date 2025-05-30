import { forwardRef, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from "@/styles/Bars/elevationBox.module.css";

const ElevationBox = forwardRef(({ isVisible, elevationArray, onClose }, ref) => {
  const [selectedElevation, setSelectedElevation] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const boxRef = useRef(null);

  useEffect(() => {
    const currentElevation = elevationArray.find(el => el.route === pathname);
    setSelectedElevation(currentElevation || null);
  }, [pathname, elevationArray]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleElevationClick = (elevation) => {
    setSelectedElevation(elevation);
    router.push(elevation.route);
  };

  return (

    // <div className={styles.overlay}>

      <div className={styles.elevationContainer}>

      <div 
        ref={boxRef}
        className={`${styles.elevationBox} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.elevationBoxInside}>
          <div className={styles.elevationGrid}>
            {elevationArray.map((elevation) => (
              <div
                key={elevation.route}
                className={`${styles.elevationButton} ${
                  selectedElevation?.route === elevation.route ? styles.elevationButtonSelected : ''
                }`}
                onClick={() => handleElevationClick(elevation)}
              >
                {elevation.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  // </div>

  );
});

ElevationBox.displayName = "ElevationBox";

export default ElevationBox;