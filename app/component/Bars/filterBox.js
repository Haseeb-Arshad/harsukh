import React, { useState, useEffect } from 'react';
import styles from '@/styles/filterBox.module.css';

const FilterBox = ({isVisible}) => {
  const [activeTab, setActiveTab] = useState('Amenities');
  const [selectedAmenities, setSelectedAmenities] = useState(['2 Bed Apartments']);
  // const [isVisible, setIsVisible] = useState(false);

  const tabs = ['Amenities', 'Booked', 'Sold'];
  const amenities = [
    'Studio Apartments',
    '1 Bed Apartments',
    '2 Bed Apartments',
    '3 Bed Apartments',
    'Pent Houses'
  ];

  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAmenityClick = (amenity) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  return (
    <div className={`${styles.filterBox} ${isVisible ? styles.visible : ''}`}>
      {/* <div className={styles.tabBar}>
        {tabs.map((tab, index) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {tab}
          </div>
        ))}
      </div> */}
     { isVisible && <div className={styles.amenitiesList}>
        {amenities.map((amenity, index) => (
          <div
            key={amenity}
            className={`${styles.amenity} ${selectedAmenities.includes(amenity) ? styles.selectedAmenity : ''}`}
            onClick={() => handleAmenityClick(amenity)}
            // style={{ animationDelay: `${(index + tabs.length) * 0.06}s` }}
          >
            {amenity}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default FilterBox;