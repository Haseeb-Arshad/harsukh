import React from 'react';
import styles from '@/styles/Floor/floorApartment.module.css';

const PopupMenu = ({ activePolygon, popupPosition, handleExplorePlan, handleEnterVR }) => {
  return (
    <div 
      className={styles.popupMenu}
      style={{ 
        left: `${popupPosition.x}px`, 
        top: `${popupPosition.y}px` 
      }}
    >
      <div className={styles.popupButtons}>
        <div className={styles.explorePlanButton} onClick={handleExplorePlan}>
          Explore Plan
        </div>
        <div className={styles.enterVRButton} onClick={handleEnterVR}>
          Gallery
        </div>
      </div>
      <div className={styles.unitInfo}>
        <div className={styles.unitHeader}>
          <div className={styles.unitHeaderTitle}>{activePolygon.id}</div>
          <span className={styles.unitStatus}>{activePolygon.status}</span>
          <span className={styles.starIcon}></span>
        </div>
        <div className={styles.unitDetails}>
          <div><span>Bedrooms</span><span>{activePolygon.bedroom}</span></div>
          <div><span>Net Area</span><span>{activePolygon.netArea}</span></div>
          <div><span>Gross Area</span><span>{activePolygon.grossArea}</span></div>
          <div><span>Price</span><span>{activePolygon.totalArea} sq. ft.</span></div>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;