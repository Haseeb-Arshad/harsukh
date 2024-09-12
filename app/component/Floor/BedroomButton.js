import React from 'react';
import styles from '@/styles/Floor/floorApartment.module.css';

const BedroomButton = ({ bedrooms, onClick, position }) => {
  return (
    <button
      className={styles.bedroomButton}
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {bedrooms}
    </button>
  );
};

export default BedroomButton;