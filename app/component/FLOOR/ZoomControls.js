// ZoomControls.js
import React from "react";
import styles from "@/styles/Floor/floorApartment.module.css";

const ZoomControls = ({ onZoomIn, onZoomOut, onReset, isMobile }) => {
  return (
    <div>
      {!isMobile ? (
        <>
          <div className={styles.ZoomInbuttonStyle} onClick={onZoomIn}>
            <img src="/images/icons/zoomIn.svg" alt="Zoom In" width="24" height="24" />
          </div>
          <div className={styles.ZoomOutbuttonStyle} onClick={onZoomOut}>
            <img src="/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />
          </div>
        </>
      ) : (
        <>
          <div className={styles.ZoomInMobbuttonStyle} onClick={onZoomIn}>
            <img src="/images/icons/zoomIn.svg" alt="Zoom In" width="24" height="24" />
          </div>
          <div className={styles.ZoomOutMobbuttonStyle} onClick={onZoomOut}>
            <img src="/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />
          </div>
        </>
      )}
      {!isMobile && (
        <div className={styles.BottomZoomexitBack}>
          <div className={styles.ButtomZoomExitBtns}>
            <div className={styles.zoomReset} onClick={onReset}>
              <div className={styles.zoomResetInside}>Zoom Out</div>
            </div>
            <div className={styles.backToBuilding} onClick={() => window.location.href = "/explore"}>
              <div className={styles.backToBuildingInside}>Back to Building</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomControls;
