import React, { useEffect, useRef, useState, useCallback } from 'react';
import OpenSeadragon from 'openseadragon';
import styles from '@/styles/Floor/floorApartment.module.css';
import { Suspense } from 'react';
import Loading from  '@/app/component/ui/Loading/Loading';
import { useRouter } from 'next/navigation';
import styles3 from '@/styles/Floor/floorApartment.module.css';
import { useParams } from 'next/navigation';
import LeftArrow from '@/app/component/Icons/leftArrow';
import RightArrow from '@/app/component/Icons/rightArrow';
import Image from 'next/image';
import apartmentData from '@/app/component/data/floorData';
import amenstyles from "@/styles/amenity/amenityGrid.module.css"

import { useSelector, useDispatch } from 'react-redux';

import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import Loader from  '@/app/component/ui/Loading/Loading';
import Gallery from '@/app/component/ui/Gallery/Gallery';
import { setGalleryPressed } from '@/state/gallery/GalleryState';

const Apartment = ({ imageName, imageLink }) => {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLaptopScreen, setIsLaptopScreen] = useState(false);
  const router = useRouter();
  const [viewer, setViewer] = useState(null);
  const params = useParams();
  const [selectedArea, setSelectedArea] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apartmentType, setApartmentType] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [zoomCoord, setZoomCoord] = useState(0.7);


  
  const dispatch = useDispatch();
  const amenityRef = useRef(null);

  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [direction, setDirection] = useState(null);
  const imageBoxRef = useRef(null);
  const autoPlayRef = useRef(null);
  const imageLoadingRef = useRef(false);
  const amenityButtonRef = useRef(null); 

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const [language, setLanguage] = useState(languageState === "ur");
  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );
  
  const openGallery = () => {
    dispatch(setGalleryPressed(true));
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [params, router]);

  const floorNameMapping = {
    'third-floor': "3rd Floor",
    'second-floor': "2nd Floor",
    'first-floor': "1st Floor",
    'ground-floor': "Ground Floor",
    'vallery-floor-1': "Basement 1",
    'vallery-floor-3': "Basement 3",
    'vallery-floor-4': "Basement 4",
    'vallery-floor-5': "Basement 5",
    'vallery-floor-6': "Basement 6"
  };
  const areas = [
    {
      name: "Studio",
      image: "/images/Amenity/Studio.png",
      details: [
        { src: 'https://cdn.theharsukh.com/images/gallery/Studio/studio-1.webp', caption: 'Cozy and efficient studio apartment' },
        { src: 'https://cdn.theharsukh.com/images/gallery/studio/studio-2.webp', caption: 'Modern furnishings in our studio units' },
        { src: 'https://cdn.theharsukh.com/images/gallery/studio/studio-3.webp', caption: 'Compact living area in studio apartment' },
      ]
    },
    {
      name: "One Bed",
      image: "/images/Amenity/OneBed.png",
      details: [
        { src: '/images/gallery/OneBed/oneBed-1.webp', caption: 'Spacious one-bedroom apartment' },
        { src: '/images/gallery/OneBed/oneBed-2.webp', caption: 'Comfortable living room in one-bed unit' },
        { src: '/images/gallery/OneBed/oneBed-3.webp', caption: 'Well-equipped kitchen in one-bedroom apartment' },
        { src: '/images/gallery/OneBed/oneBed-4.webp', caption: 'Cozy bedroom in one-bed apartment' },
      ]
    },
    {
      name: "Two Bed",
      image: "/images/Amenity/TwoBed.png",
      details: [
        { src: '/images/gallery/TwoBed/twoBed-1.webp', caption: 'Luxurious two-bedroom apartment' },
        { src: '/images/gallery/TwoBed/twoBed-2.webp', caption: 'Elegant dining area in two-bed unit' },
        { src: '/images/gallery/TwoBed/twoBed-3.webp', caption: 'Master bedroom in two-bedroom apartment' },
        { src: '/images/gallery/TwoBed/twoBed-4.webp', caption: 'Second bedroom in two-bed apartment' },
        { src: '/images/gallery/TwoBed/twoBed-5.webp', caption: 'Modern bathroom in two-bedroom unit' },
        { src: '/images/gallery/TwoBed/twoBed-6.webp', caption: 'Balcony view from two-bed apartment' },
      ]
    },
    {
      name: "Three Bed",
      image: "/images/Amenity/ThreeBed.png",
      details: [
        { src: '/images/gallery/ThreeBed/threeBed-1.webp', caption: 'Spacious three-bedroom apartment' },
        { src: '/images/gallery/ThreeBed/threeBed-2.webp', caption: 'Large living area in three-bed unit' },
        { src: '/images/gallery/ThreeBed/threeBed-3.webp', caption: 'Fully equipped kitchen in three-bedroom apartment' },
        { src: '/images/gallery/ThreeBed/threeBed-4.webp', caption: 'Master bedroom in three-bed apartment' },
        { src: '/images/gallery/ThreeBed/threeBed-5.webp', caption: 'Family bathroom in three-bedroom unit' },
      ]
    },
    {
      name: "Penthouse",
      image: "/images/Amenity/Penthouse.png",
      details: [
        { src: '/images/gallery/Penthouse/penthouse-1.webp', caption: 'Luxurious penthouse living room' },
        { src: '/images/gallery/Penthouse/penthouse-2.webp', caption: 'Gourmet kitchen in penthouse suite' },
        { src: '/images/gallery/Penthouse/penthouse-3.webp', caption: 'Master bedroom with panoramic views' },
        { src: '/images/gallery/Penthouse/penthouse-4.webp', caption: 'Elegant dining area in penthouse' },
        { src: '/images/gallery/Penthouse/penthouse-5.webp', caption: 'Spa-like bathroom in penthouse suite' },
        { src: '/images/gallery/Penthouse/penthouse-6.webp', caption: 'Private terrace with stunning city views' },
        { src: '/images/gallery/Penthouse/penthouse-7.webp', caption: 'Second bedroom in penthouse apartment' },
        { src: '/images/gallery/Penthouse/penthouse-8.webp', caption: 'Home office space in penthouse' },
      ]
    },
  ];

  useEffect(() => {
    const apartmentParam = params.apartment; // e.g., "Apartment1"
    const match = apartmentParam.match(/\d+/); // Extracts the digits from the string
    const apartmentNumber = match ? parseInt(match[0]) : null; // Gets the first match or null if no match
    const floorName = floorNameMapping[params.floor];

    if (floorName && apartmentNumber) {
      const apartmentInfo = apartmentData[floorName].find(apt => apt.Apartmentno === apartmentNumber);
      if (apartmentInfo) {
        setApartmentType(apartmentInfo.Type);
      }
    }
  }, [params]);


  const handleBackClick = () => {
    const floor = params.floor;
    router.push(`/${floor}`);
  };

  const [amenityClicked, setAmenityClicked] = useState(false);

  const handleAmenitiesClickOutside = useCallback((event) => {
    if (
      amenityButtonRef.current &&
      !amenityButtonRef.current.contains(event.target) &&
      amenityRef.current &&
      !amenityRef.current.contains(event.target)
    ) {
      setAmenityClicked(false);
    }
  }, []);



  useEffect(() => {
    document.addEventListener("mousedown", handleAmenitiesClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleAmenitiesClickOutside);
    };
  }, [handleAmenitiesClickOutside]);


  const openImageBox = (area) => {
    if (area && area.details && area.details.length > 0) {
      setSelectedArea(area);
      setCurrentImageIndex(0);
      setIsLoading(true);
      setTimeout(() => setIsOverlayActive(true), 50);
    } else {
      // Optionally, you can show an error message to the user
    }
  };

   const closeImageBox = useCallback(() => {
    setIsOverlayActive(false);
    setTimeout(() => setSelectedArea(null), 500);
  }, []);

  const nextImage = useCallback(() => {
    if (imageLoadingRef.current) return;
    setDirection('next');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedArea.details.length);
  }, [selectedArea]);

  const prevImage = useCallback(() => {
    if (imageLoadingRef.current) return;
    setDirection('prev');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedArea.details.length) % selectedArea.details.length);
  }, [selectedArea]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageBoxRef.current && !imageBoxRef.current.contains(event.target)) {
        closeImageBox();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeImageBox();
      }
    };

    if (selectedArea) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedArea, closeImageBox]);


  useEffect(() => {
    if (selectedArea && !isLoading) {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      autoPlayRef.current = setTimeout(() => {
        nextImage();
      }, 7000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [selectedArea, isLoading, nextImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
    imageLoadingRef.current = false;
  };
  

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);

      console.log(isMobile)
      if(isMobile)
      {
        console.log("MOB")
      }
      else
      console.log("LARGE")

      console.log("MOBILLEE VIEWWWW")
      setZoomCoord(isMobile ? 2.6 : 0.7); 
      console.log(zoomCoord)

    };
  
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);



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
        visibilityRatio: zoomCoord,
        defaultZoomLevel: zoomCoord,
        minZoomLevel: 0.7,
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
          'Cache-Control': 'no-cache',
          "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        },
      });

      setViewer(viewer);

      viewer.addHandler('tile-loaded', () => {
        setIsLoading(false);
      });

      viewer.addHandler('open', function() {
        if (isMobile) {
          viewer.viewport.zoomTo(2);
        }
      });

      viewer.addHandler('open', function() {
        if (imageName === 'third-floor') {
          if (typeof document !== 'undefined') { // Check if document is defined
            const svgOverlay = document.createElement('div');
            svgOverlay.style.position = 'absolute';
            svgOverlay.style.left = '0';
            svgOverlay.style.top = '0';
            svgOverlay.style.width = '100%';
            svgOverlay.style.height = '100%';

            const svgContent = `
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 10000 10000" preserveAspectRatio="none">
                <polygon data-image="Penthouse 01" data-tip="penthouse01" class="${styles.st0}" points="333.05 190.04 458.47 136.61 458.47 195.31 471.31 195.31 471.31 190.96 483.69 190.96 483.69 173.99 586.19 173.99 586.19 226.96 598.8 226.96 598.8 223.29 612.1 223.29 612.1 226.96 663.47 226.96 663.47 351.92 611.64 351.92 611.64 439.98 640.76 439.98 640.76 528.25 611.99 528.25 611.87 529.52 605.57 529.52 477.96 529.52 348.98 529.52 348.98 190.73 333.05 190.04" />
                <polygon data-image="Penthouse 05" data-tip="penthouse05" class="${styles.st0}" points="1277.53 303.54 1402.95 362.7 1443.77 362.7 1443.77 345.96 1502.93 345.96 1502.93 362.7 1495.29 362.7 1495.29 375.24 1501.48 375.24 1501.48 408.33 1495.21 408.33 1495.21 420.94 1508.05 420.94 1508.05 412.61 1540.36 412.61 1540.36 473.97 1540.36 529.25 1444.69 529.25 1223.03 529.25 1223.03 440.43 1251.77 440.43 1251.77 425.76 1200.71 425.76 1200.71 329.15 1251.77 329.15 1251.77 375.92 1263.69 375.92 1263.69 368.89 1277.45 368.89 1277.53 303.54" />
                <polygon data-image="Penthouse 06" data-tip="penthouse06" class="${styles.st0}" points="1223.18 575.26 1223.18 663.54 1251.85 663.54 1251.85 677.3 1200.71 677.3 1200.71 774.06 1251.85 774.06 1251.85 733.94 1276.84 733.94 1276.84 794.47 1404.56 733.94 1443.54 733.94 1443.54 750.22 1503.16 749.99 1503.16 733.94 1508.2 733.94 1508.2 684.87 1539.85 684.87 1539.85 574.34 1351.36 574.34 1252.31 574.34 1223.18 575.26" />
              </svg>
            `;

            svgOverlay.innerHTML = svgContent;

            viewer.addOverlay({
              element: svgOverlay,
              location: new OpenSeadragon.Rect(0, 0, 5.209, 5.208),  // Adjust the size of the overlay
              placement: OpenSeadragon.Placement.CENTER
            });

            // Add click event listeners to polygons
            svgOverlay.querySelectorAll('polygon').forEach(polygon => {
              polygon.addEventListener('click', (e) => {
                e.preventDefault();
                const dataTip = e.target.getAttribute('data-tip');
                if (dataTip) {
                  router.push(`/thirdFloor/${dataTip}`);
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
        }
      });

      // Custom zoom controls (left-aligned)
      if (typeof document !== 'undefined') { // Check if document is defined
        const zoomControls = document.createElement('div');
        zoomControls.className = styles.zoomControls;

        const zoomInButton = document.createElement('button');
        zoomInButton.className = styles.buttonStyle;
        zoomInButton.innerHTML = '<img src="https://cdn.theharsukh.com/images/icons/zoomIn.svg" alt="Zoom In" width="24" height="24" />';
        zoomInButton.onclick = () => viewer.viewport.zoomBy(1.5);

        const zoomOutButton = document.createElement('button');
        zoomOutButton.className = styles.buttonStyle;
        zoomOutButton.innerHTML = '<img src="https://cdn.theharsukh.com/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />';
        zoomOutButton.onclick = () => viewer.viewport.zoomBy(0.667);

        const resetZoomButton = document.createElement('button');
        resetZoomButton.className = styles.buttonStyle;
        resetZoomButton.innerHTML = '<img src="https://cdn.theharsukh.com/images/icons/resetZoom.svg" alt="Reset Zoom" width="24" height="24" />';
        resetZoomButton.onclick = () => viewer.viewport.goHome();

        viewer.addControl(zoomControls, {
          anchor: OpenSeadragon.ControlAnchor.TOP_LEFT
        });
      }  

      return () => {
        if (viewer) {
          viewer.destroy();
        }
      };
    } }   , [imageName, isMobile,imageLink, router]);

  
  useEffect(() => {
    const handleResize = () => {
      setIsLaptopScreen(window.innerWidth >= 1100);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
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
      <div style={{ position: 'relative' }}>
        {isLoading && <Loading />}
        <div ref={viewerRef} style={{ width: '100%', height: '100vh', visibility: isLoading ? 'hidden' : 'visible' }} />
      </div>

        <div className={styles3.ZoomInbuttonStyle} onClick={handleZoomIn}>         
          <img src="https://cdn.theharsukh.com/images/icons/zoomIn.svg" alt="Zoom Out" width="24" height="24" />         
        </div>

        <div className={styles3.ZoomOutbuttonStyle} onClick={handleZoomOut}>         
          <img src="https://cdn.theharsukh.com/images/icons/zoomOut.svg" alt="Zoom Out" width="24" height="24" />         
        </div>

      {!isMobile && 
    
      <div className={styles3.ButtomZoomExitBtnOutside}>
        <div className={styles.ButtomZoomExitBtns}>
          <div className={styles3.zoomReset} onClick={handleResetZoom}>
            <div className={styles3.zoomResetInside}>
              {/* Zoom Out */}
              {translations.zoomout}
            </div>
          </div>

          <div className={styles3.backToBuilding} onClick={handleBackClick}>
            <div className={styles3.backToBuildingInside}>
            {translations.backToLayout}
            </div>
          </div>

          <div ref={amenityButtonRef}  className={styles3.backToBuilding}         onClick={openGallery}
          >
            <div className={styles3.backToBuildingInside}>
              {translations.gallery}
            </div>
          </div>
        </div>
        
      </div>
      }

      {/* <div style={{overflow:"none"}}>

        <Gallery
            apartmentType={apartmentType} 
            isOpen={isGalleryOpen} 
            onClose={closeGallery}
        />
      </div> */}
   
    </>

  );
};

export default Apartment;