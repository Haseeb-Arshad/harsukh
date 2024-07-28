import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Floor/floorApartment.module.css';

const ZoomControls = ({ viewer }) => {
  const router = useRouter();

  const handleResetZoom = () => {
    if (viewer) {
      viewer.viewport.goHome();
    }
  };

  const handleZoomIn = () => {
    if (viewer) {
      const currentZoom = viewer.viewport.getZoom();
      const maxZoom = viewer.viewport.getMaxZoom();
      const newZoom = Math.min(currentZoom * 1.5, maxZoom);
      viewer.viewport.zoomTo(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (viewer) {
      const currentZoom = viewer.viewport.getZoom();
      const minZoom = viewer.viewport.getMinZoom();
      const newZoom = Math.max(currentZoom / 1.5, minZoom);
      viewer.viewport.zoomTo(newZoom);
    }
  };

  return (
    <>
      <div className={styles.ZoomInbuttonStyle} onClick={handleZoomIn}>         
        <img src="/images/icons/zoomIn.svg" alt="Zoom In" width="24" height="24" />         
      </div>

      <div className={styles.ZoomOutbuttonStyle} onClick={handleZoomOut}>         
        <img src="/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />         
      </div>
    
      <div className={styles.ButtomZoomExitBtns}>
        <div className={styles.zoomReset} onClick={handleResetZoom}>
          <div className={styles.zoomResetInside}>
            Zoom Out
          </div>
        </div>

        <div className={styles.backToBuilding} onClick={() => router.push('/')}>
          <div className={styles.backToBuildingInside}>
            Back to Building
          </div>
        </div>

        <div className={styles.backToBuilding}>
          <div className={styles.backToBuildingInside}>
            Gallery
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoomControls;