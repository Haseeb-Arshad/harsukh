// Floor.js
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FloorViewer from "./FloorViewer";
import ZoomControls from "./ZoomControls";
import ApartmentPopup from "./ApartmentPopup";
import GalleryModal from "./GalleryModal";
import { useWindowSize } from "./hooks";
import {
  addFavoriteApartment,
  removeFavoriteApartment,
} from "@/state/apartment/favApartment";
import { setGalleryPressed } from "@/state/gallery/GalleryState";
import Loading from '@/app/component/ui/Loading/Loading';
import en from '@/app/component/locales/en.json';
import ur from '@/app/component/locales/ur.json';
import styles from "@/styles/Floor/floorApartment.module.css";
import Lottie from "react-lottie";
import StarAnimate from "@/public/json/StarAnimate.json";
import { getFloorName } from "./dataservice";

const Floor = ({ imageName, imageLink }) => {
  const { isMobile, isLaptop } = useWindowSize();
  const viewerRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePolygon, setActivePolygon] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [zoomCoord, setZoomCoord] = useState(0.7);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activePolygonType, setActivePolygonType] = useState(null);

  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const languageState = useSelector((state) => {
    const lang = state.language.lang.find((site) => site.id === '1');
    return lang ? lang.language : 'en';
  });

  const translations = useMemo(
    () => (languageState === "ur" ? ur : en),
    [languageState]
  );

  const favoriteApartments = useSelector(
    (state) => state.favoriteApartments.favoriteApartments
  );

  const isGalleryPressed = useSelector(
    (state) => state.gallery.isGalleryPressed
  );

  useEffect(() => {
    const apartmentParam = params.floor;
    const match = apartmentParam.match(/\d+/);
    const apartmentNumber = match ? match[0] : null;

    if (apartmentNumber) {
      const { apartment, floor } = getFloorName(apartmentNumber);
      if (apartment) {
        setActivePolygon({
          floor: floorNameMapping[floor] || "",
          id: apartment.Apartmentno,
          Type: apartment.Type,
          Bedrooms: apartment.Bedrooms,
          Area: apartment.Area,
        });
      } else {
        // Optionally handle the case where the apartment is not found
      }
    }
  }, [params.floor]);

  const floorNameMapping = {
    "third-floor": "3rd Floor",
    "second-floor": "2nd Floor",
    "first-floor": "1st Floor",
    "ground-floor": "Ground Floor",
    "valley-floor-1": "Valley Floor 1",
    "valley-floor-3": "Valley Floor 3",
    "valley-floor-4": "Valley Floor 4",
    "valley-floor-5": "Valley Floor 5",
    "valley-floor-6": "Valley Floor 6",
  };

  const handlePolygonClick = (apartment) => {
    setActivePolygon(apartment);
    // Calculate popup position based on the viewport or other logic
    setPopupPosition({ x: 500, y: 500 }); // Example position
  };

  const handleZoomIn = () => {
    if (viewerRef) {
        const currentZoom = viewerRef.viewport.getZoom();
        const maxZoom = viewerRef.viewport.getMaxZoom();
        const newZoom = Math.min(currentZoom * 1.5, maxZoom);
        viewerRef.viewport.zoomTo(newZoom);
      }
    // Implement zoom in logic via OpenSeadragon instance
  };

  const handleZoomOut = () => {
    // Implement zoom out logic via OpenSeadragon instance
    if (viewerRef) {
        const currentZoom = viewerRef.viewport.getZoom();
        const minZoom = viewerRef.viewport.getMinZoom();
        const newZoom = Math.max(currentZoom / 1.5, minZoom);
        viewerRef.viewport.zoomTo(newZoom);
      }
  };

  const handleResetZoom = () => {
    if (viewerRef) {
        viewerRef.viewport.goHome();
      }
    // Implement reset zoom logic via OpenSeadragon instance
  };

  const handleExplorePlan = () => {
    if (activePolygon) {
      router.push(`/${imageName}/Apartment${activePolygon.id}`);
    }
  };

  const handleGallery = (type) => {
    setActivePolygonType(type);
    dispatch(setGalleryPressed(true));
  };

  const handleFavorite = () => {
    if (activePolygon) {
      const isFavorite = favoriteApartments.some(
        (apt) => apt.Apartmentno === activePolygon.id
      );

      if (isFavorite) {
        dispatch(removeFavoriteApartment(activePolygon.id));
        setPopupMessage(translations["favDelPopup"]);
      } else {
        dispatch(addFavoriteApartment(activePolygon));
        setPopupMessage(translations["favAddPopup"]);
      }

      setShowPopup(true);
      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 5000);
      setTimeout(() => {
        setShowPopup(false);
      }, 5500);
    }
  };

  return (
    <>
      {!isMobile && (
        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleResetZoom}
          isMobile={isMobile}
        />
      )}

      <div className={styles.floorContainer}>
        {isLoading && <Loading />}
        <FloorViewer
          imageName={imageName}
          imageLink={imageLink}
          onPolygonClick={handlePolygonClick}
          zoomCoord={zoomCoord}
          isMobile={isMobile}
        />

        {activePolygon && (
          <ApartmentPopup
            position={popupPosition}
            apartment={activePolygon}
            onExplore={handleExplorePlan}
            onGallery={() => handleGallery(activePolygon.Type)}
            onFavorite={handleFavorite}
            isFavorite={favoriteApartments.some(
              (apt) => apt.Apartmentno === activePolygon.id
            )}
            translations={translations}
          />
        )}

        {showPopup && (
          <div
            className={`${styles.favpopupMenu} ${
              isPopupVisible ? styles.visible : ""
            }`}
          >
            <div className={styles.favpopupMenuIcon}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: StarAnimate,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={30}
                width={30}
              />
            </div>
            <div className={styles.favpopupMenuContent}>{popupMessage}</div>
          </div>
        )}
      </div>

      <GalleryModal apartmentType={activePolygonType} />
    </>
  );
};

export default Floor;
