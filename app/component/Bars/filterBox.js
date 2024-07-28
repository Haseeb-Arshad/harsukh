'use client';
import React, { useState, forwardRef } from 'react';
import styles from '@/styles/filterBox.module.css';

const FilterBox = forwardRef(({ isVisible }, ref) => {
  const [activeTab, setActiveTab] = useState('Amenities');
  const [selectedAmenities, setSelectedAmenities] = useState(['2 Bed Apartments']);

  const tabs = ['Amenities', 'Booked', 'Sold'];
  const amenities = [
    'Studio',
    '1 Bed Apartments',
    '2 Bed Apartments',
    '3 Bed Apartments',
    'Pent Houses'
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAmenityClick = (amenity) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenity)) {
        return prev.filter((a) => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const handleResetFilter = () => {
    setSelectedAmenities([]);
  };

  return (
    <div ref={ref} className={`${styles.filterBox} ${isVisible ? styles.visible : ''}`}>
      {isVisible && (
        <div className={styles.filterBoxInside}>
          <>
            <div className={styles.amenitiesList}>
              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className={`${styles.amenity} ${selectedAmenities.includes(amenity) ? styles.selectedAmenity : ''}`}
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

FilterBox.displayName = 'FilterBox'; // Add display name

export default FilterBox;