import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import OpenSeadragon from 'openseadragon';
import Loading from '@/app/[floor]/Loading';
import ZoomControls from './ZoomControl';
import PopupMenu from './PopupMenu';
import BedroomButton from './BedroomButton';
import { handleSvgOverlay } from './svgOverlayHandler';
import styles from '@/styles/Floor/floorApartment.module.css';
import { apartmentData } from '@/app/component/data/floorData';


const Floor = ({ imageName, imageLink }) => {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePolygon, setActivePolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [viewer, setViewer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let viewer;

    if (viewerRef.current) {
      viewer = OpenSeadragon({
        element: viewerRef.current,
        tileSources: {
          type: 'image',
          url: `${imageLink}`,
          buildPyramid: false,
          width: 10000,
          height: 10000,
        },
        showNavigationControl: false,
        maxZoomPixelRatio: 10,
        smoothTileEdgesMinZoom: 1,
        blendTime: 0.1,
        constrainDuringPan: true,
        minZoomImageRatio: 1,
        visibilityRatio: 1,
        minZoomLevel: 0.8,
        maxZoomLevel: 7,
        wrapHorizontal: false,
        zoomPerScroll: 1.2,
        zoomPerClick: 1.5,
        animationTime: 0.5,
        gestureSettingsMouse: {
          clickToZoom: false,
          pinchToZoom: true,
          dblClickToZoom: true,
        },
        loadTilesWithAjax: true,
        ajaxHeaders: {
          'Cache-Control': 'max-age=3600',
        },
      });

      setViewer(viewer);

      viewer.addHandler('tile-loaded', () => {
        setIsLoading(false);
      });

      viewer.addHandler('open', function() {
        handleSvgOverlay(viewer, imageName, setActivePolygon, setPopupPosition, apartmentData);
      });
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [imageName, imageLink]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('polygon') && !e.target.closest(`.${styles.popupMenu}`)) {
        setActivePolygon(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleExplorePlan = () => {
    if (activePolygon) {
      router.push(`/${imageName}/${activePolygon.id}`);
    }
  };

  const handleEnterVR = () => {
    // Implement VR entry logic here
  };

  return (
    <>
      <ZoomControls viewer={viewer} />
      
      <div className={styles.floorContainer}>
        {isLoading && <Loading />}
        <div ref={viewerRef} style={{ width: '100%', height: '100vh', visibility: isLoading ? 'hidden' : 'visible' }} />
        
        {activePolygon && (
          <PopupMenu
            activePolygon={activePolygon}
            popupPosition={popupPosition}
            handleExplorePlan={handleExplorePlan}
            handleEnterVR={handleEnterVR}
          />
        )}
      </div>
    </>
  );
};

export default Floor;