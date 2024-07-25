import React, { useEffect, useRef, useState } from 'react';
import OpenSeadragon from 'openseadragon';
import styles from '@/styles/floorApartment.module.css';
import { Suspense } from 'react';
import Loading from '../[floor]/Loading';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Floor = ({ imageName, imageLink }) => {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLaptopScreen, setIsLaptopScreen] = useState(false);
  const [activePolygon, setActivePolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
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

      viewer.addHandler('tile-loaded', () => {
        setIsLoading(false);
      });

      viewer.addHandler('open', function() {
        if (imageName === 'thirdFloor' || imageName === 'secondfloor') {
          const svgOverlay = document.createElement('div');
          svgOverlay.style.position = 'absolute';
          svgOverlay.style.left = '0';
          svgOverlay.style.top = '0';
          svgOverlay.style.width = '100%';
          svgOverlay.style.height = '100%';

          const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10000 10000" preserveAspectRatio="none">
            <polygon data-image="Penthouse 01" data-tip="penthouse01" class="${styles.st0}" points="333.05 190.04 458.47 136.61 458.47 195.31 471.31 195.31 471.31 190.96 483.69 190.96 483.69 173.99 586.19 173.99 586.19 226.96 598.8 226.96 598.8 223.29 612.1 223.29 612.1 226.96 663.47 226.96 663.47 351.92 611.64 351.92 611.64 439.98 640.76 439.98 640.76 528.25 611.99 528.25 611.87 529.52 605.57 529.52 477.96 529.52 348.98 529.52 348.98 190.73 333.05 190.04" />
            <polygon data-image="Penthouse 02" data-tip="penthouse02" class="${styles.st0}" points="739.98 261.27 689.22 261.27 689.22 375.92 739.98 375.92 739.98 439.21 711.85 439.21 711.85 530.01 905.61 528.94 905.61 468.18 957.66 468.18 957.66 530.01 1064.28 528.71 1064.28 530.01 1087.67 530.01 1152.56 530.01 1152.56 439.52 1123.67 439.98 1123.67 374.39 1175.03 374.62 1175.03 263.41 1123.9 263.64 1120.23 263.64 1120.23 258.6 1079.18 258.6 1079.18 222.37 784.53 222.37 784.53 258.83 746.47 258.83 746.47 267.54 740.74 267.54 739.98 261.27" />
            <polygon data-image="Penthouse 03" data-tip="penthouse03" class="${styles.st0}" points="1277.53 303.54 1402.95 362.7 1443.77 362.7 1443.77 345.96 1502.93 345.96 1502.93 362.7 1495.29 362.7 1495.29 375.24 1501.48 375.24 1501.48 408.33 1495.21 408.33 1495.21 420.94 1508.05 420.94 1508.05 412.61 1540.36 412.61 1540.36 473.97 1540.36 529.25 1444.69 529.25 1223.03 529.25 1223.03 440.43 1251.77 440.43 1251.77 425.76 1200.71 425.76 1200.71 329.15 1251.77 329.15 1251.77 375.92 1263.69 375.92 1263.69 368.89 1277.45 368.89 1277.53 303.54" />
            <polygon data-image="Penthouse 04" data-tip="penthouse04" class="${styles.st0}" points="1223.18 575.26 1223.18 663.54 1251.85 663.54 1251.85 677.3 1200.71 677.3 1200.71 774.06 1251.85 774.06 1251.85 733.94 1276.84 733.94 1276.84 794.47 1404.56 733.94 1443.54 733.94 1443.54 750.22 1503.16 749.99 1503.16 733.94 1508.2 733.94 1508.2 684.87 1539.85 684.87 1539.85 574.34 1351.36 574.34 1252.31 574.34 1223.18 575.26" /> 
            <polygon data-image="Penthouse 05" data-tip="penthouse05" class="${styles.st0}" points="711.16 575.95 711.16 663.54 740.28 663.54 740.28 722.01 688.92 722.01 688.92 835.98 740.28 835.98 740.28 846.06 784.53 846.06 784.53 868.08 1078.73 868.08 1078.73 840.79 1123.67 840.79 1123.67 835.75 1174.57 835.75 1174.57 724.53 1123.67 724.53 1123.67 663.77 1152.79 663.77 1152.79 574.34 1026.67 574.34 962.47 574.34 962.47 614.7 876.71 614.7 876.71 613.5 874.88 613.5 874.88 574.34 768.88 574.34 768.88 573.48 746.24 573.48 746.24 574.17 739.99 574.17 739.99 576.29 711.16 575.95" />
            <polygon data-image="Penthouse 06" data-tip="penthouse06" class="${styles.st0}" points="348.79 574.5 357.96 574.5 435.62 574.5 612.33 574.5 612.33 575.87 640.76 575.87 640.76 663.62 611.87 663.62 611.87 752.13 662.32 752.13 662.32 862.8 611.57 862.8 611.57 867.85 599.03 867.85 599.03 863.11 586.34 863.11 586.34 917.07 483.77 917.07 483.77 912.94 470.93 912.94 470.93 907.75 458.09 907.75 458.09 966.75 332.13 912.79 352.76 912.79 352.76 900.02 349.25 900.02 349.25 844.31 349.25 680.51 348.79 574.5" />
          </svg>
          `;

          svgOverlay.innerHTML = svgContent;

          viewer.addOverlay({
            element: svgOverlay,
            location: new OpenSeadragon.Rect(0, 0, 5.209, 5.208),
            placement: OpenSeadragon.Placement.CENTER
          });

          // Add click event listeners to polygons
          svgOverlay.querySelectorAll('polygon').forEach(polygon => {
            polygon.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const dataTip = e.target.getAttribute('data-image');
              if (dataTip) {
                setActivePolygon({
                  id: dataTip,
                  // status: 'Available',
                  bedroom: 3,
                  netArea: '150',
                  grossArea: '300',
                  totalArea: '184.60'
                });
                const rect = e.target.getBoundingClientRect();
                setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              }
            });

            // Disable zoom on polygon hover
            polygon.addEventListener('mouseenter', () => {
              viewer.setMouseNavEnabled(false);
            });

            polygon.addEventListener('mouseleave', () => {
              viewer.setMouseNavEnabled(true);
            });
          });
        }
      });


      const zoomControls = document.createElement('div');
      zoomControls.className = styles.zoomControls;

      const zoomInButton = document.createElement('div');
      zoomInButton.className = styles.ZoomInbuttonStyle;
      zoomInButton.innerHTML = '<img src="/images/icons/zoomIn.svg" alt="Zoom In" width="24" height="24" />';
      zoomInButton.onclick = () => viewer.viewport.zoomBy(1.5);

      const zoomOutButton = document.createElement('div');
      zoomOutButton.className = styles.ZoonOutbuttonStyle;
      zoomOutButton.innerHTML = '<img src="/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />';
      zoomOutButton.onclick = () => viewer.viewport.zoomBy(0.667);

      // const resetZoomButton = document.createElement('div');
      // resetZoomButton.className = styles.ZoonOutbuttonStyle;
      // resetZoomButton.innerHTML = '<img src="/images/icons/resetZoom.svg" alt="Reset Zoom" width="24" height="24" />';
      // resetZoomButton.onclick = () => viewer.viewport.goHome();

      zoomControls.appendChild(zoomInButton);
      zoomControls.appendChild(zoomOutButton);
      // zoomControls.appendChild(resetZoomButton);

      viewer.addControl(zoomControls, {
        anchor: OpenSeadragon.ControlAnchor.TOP_LEFT
      });

    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [imageName, imageLink, router]);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopScreen(window.innerWidth >= 1100);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      router.push(`/thirdFloor/${activePolygon.id}`);
    }
  };

  const handleEnterVR = () => {
    console.log('Enter VR');
    // Implement VR entry logic here
  };

  return (
    <Suspense fallback={<div className={styles.loadingOverlay}><Loading /></div>}>
      
      
      <div className={styles.zoomReset}>
        <div className={styles.zoomResetInside}>
          Zoom Out
        </div>
      </div>

      <div className={styles.backToBuilding}>
        <div className={styles.backToBuildingInside}>
          Back to Building
        </div>
      </div>


      <div className={styles.floorContainer}>
      
      
        {isLoading && <Loading />}
        <div ref={viewerRef} style={{ width: '100%', height: '100vh', visibility: isLoading ? 'hidden' : 'visible' }} />
        
        
        {activePolygon && ( 
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
                <div className={styles.unitHeaderTitle}> {activePolygon.id}</div>
                <span className={styles.unitStatus}>{activePolygon.status}</span>
                <span className={styles.starIcon}>☆</span>
              </div>
              <div className={styles.unitDetails}>
                <div><span>Bedrooms</span><span >{activePolygon.bedroom}</span></div>
                <div><span>Net Area</span><span>{activePolygon.type}</span></div>
                <div><span>Gross Area</span><span>{activePolygon.type}</span></div>
                <div><span>Price</span><span>{activePolygon.totalArea} sq. ft.</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default Floor;