import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAmenity, resetAmenities } from '@/state/Amenity/amenityState';
import styles from "@/styles/filterBox.module.css";
import en from '@/app/component/locales/en.json';
import ur from '@/app/component/locales/ur.json';

const FilterBox = React.forwardRef(({ Filterref, isMobile, isVisible, onClose }, ref) => {
  const dispatch = useDispatch();
  const { amenities, selectedAmenities } = useSelector((state) => state.amenities);

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const translations = useMemo(
    () => (languageState === "ur" ? ur : en),
    [languageState]
  );

  const handleAmenityClick = (amenity) => {
    dispatch(toggleAmenity(amenity));
  };

  const handleResetFilter = (event) => {
    event.stopPropagation();
    dispatch(resetAmenities());
  };

  return (
    <div
      ref={Filterref}
      className={`${styles.filterBox} ${isVisible ? styles.visible : ""}`}
    >
      {isVisible && (
        <div className={styles.filterBoxInside}>
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
        </div>
      )}
    </div>
  );
});

FilterBox.displayName = "FilterBox";

export default FilterBox;