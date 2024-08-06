import { useSelector, useDispatch } from 'react-redux';
import { toggleAmenity, resetAmenities } from '@/state/Amenity/amenityState';
import styles from "@/styles/filterBox.module.css";
import { forwardRef, useEffect } from "react";

const FilterBox = forwardRef(({ isVisible }, ref) => {
  const dispatch = useDispatch();
  const { amenities, selectedAmenities } = useSelector((state) => state.amenities);

  const handleAmenityClick = (amenity) => {
    dispatch(toggleAmenity(amenity));
  };

  const handleResetFilter = () => {
    dispatch(resetAmenities());
  };

  return (
    <div
      ref={ref}
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
                  {amenity}
                </div>
              ))}
            </div>
            <div className={styles.resetButtonContainer}>
              <div onClick={handleResetFilter} className={styles.resetButton}>
                Reset Filter
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