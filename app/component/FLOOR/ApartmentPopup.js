// ApartmentPopup.js
import React from "react";
import Image from "next/image";
import styles from "@/styles/Floor/floorApartment.module.css";
import Lottie from "react-lottie";
import StarAnimate from "@/public/json/StarAnimate.json";

const ApartmentPopup = ({
  position,
  apartment,
  onExplore,
  onGallery,
  onFavorite,
  isFavorite,
  translations,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: StarAnimate,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className={styles.popupMenu}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className={styles.popupTop}>
        <div className={styles.popupTopBtns} onClick={onExplore}>
          {translations["exploreplan"]}
        </div>
        <div
          className={styles.popupTopBtnsGallery}
          style={{ cursor: "pointer" }}
          onClick={onGallery}
        >
          {translations["gallery"]}
        </div>
      </div>

      <div className={styles.apartmentInterestBox}>
        <div className={styles.apartmentInterestInside}>
          <div className={styles.apartmentInterestTitle}>
            <div className={styles.apartmentInterestTitleText}>
              {translations["apartmentNo"]} {apartment.id}
            </div>
            <div
              className={styles.apartmentInterestTitleIcon}
              onClick={onFavorite}
            >
              <Image
                src={
                  isFavorite
                    ? "/images/icons/favIconFilled.svg"
                    : "/images/icons/favIcon.svg"
                }
                quality={100}
                alt="Favorite"
                height={22}
                width={22}
              />
            </div>
          </div>
          <div className={styles.apartmentInterestList}>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>
                {translations["Floor"]}
              </div>
              <div className={styles.apartmentInterestItemValue}>
                {apartment.floor || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>
                {translations["Type"]}
              </div>
              <div className={styles.apartmentInterestItemValue}>
                {apartment.Type || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>
                {translations["Bedrooms"]}
              </div>
              <div className={styles.apartmentInterestItemValue}>
                {apartment.Bedrooms || ""}
              </div>
            </div>
            <div className={styles.apartmentInterestItem}>
              <div className={styles.apartmentInterestItemKey}>
                {translations["Area"]}
              </div>
              <div className={styles.apartmentInterestItemValue}>
                {apartment.Area || ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentPopup;
