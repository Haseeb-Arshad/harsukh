import React, { useEffect, useRef, forwardRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAmenity, resetAmenities } from '@/state/Amenity/amenityState';
import styles from "@/styles/filterBox.module.css";
import en from '@/app/locales/en.json';
import ur from '@/app/locales/ur.json';

const FilterBox = forwardRef(({ isMobile, isVisible, onClose }, ref) => {
  const dispatch = useDispatch();
  const { amenities, selectedAmenities } = useSelector((state) => state.amenities);
  const filterBoxRef = useRef(null);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const translations = useMemo(() => languageState === 'ur' ? ur : en, [languageState]);

  const handleAmenityClick = (amenity) => {
    dispatch(toggleAmenity(amenity));
  };

  const handleResetFilter = () => {
    dispatch(resetAmenities());
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isVisible, onClose]);

  return (
    <div
      ref={filterBoxRef}
      className={`${styles.filterBox} ${isVisible ? styles.visible : ""}`}
    >
      {isVisible && (
        <div className={styles.filterBoxInside}>
          <>
            <div className={styles.amenitiesList}>
              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className={`${styles.amenity} ${
                    selectedAmenities.includes(amenity)
                      ? styles.selectedAmenity
                      : ""
                  }`}
                  onClick={() => handleAmenityClick(amenity)}
                >
                  {translations[amenity]}
                </div>
              ))}
            </div>
            <div className={styles.resetButtonContainer}>
              <div onClick={handleResetFilter} className={styles.resetButton}>
                {translations["reset"]}
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
});

FilterBox.displayName = "FilterBox";

export default FilterBox;