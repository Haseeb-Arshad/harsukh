import { useCallback, useEffect, useRef, useState, useMemo, React} from "react";
import styles from "@/styles/ImageBackground.module.css";

const BackViewSvgs = ({svgRef, setSvgHover }) => {
  return (
    <svg
    ref={svgRef}
    version="1.1"
    id={styles.masker}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1920 1080"
    xmlSpace="preserve"
    onMouseEnter={() =>setSvgHover(true)}
    onMouseLeave={() =>setSvgHover(false)}
  >

    <polygon data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="5"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2} points="450.45 458.32 450.45 484.46 628.84 484.46 628.84 349.17 450.45 458.32"/>
    <rect data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="4"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2} x="812.28" y="353.76" width="142.62" height="130.7"/>
    <rect data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="3"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2} x="954.9" y="353.76" width="136.2" height="130.7"/>
    <polygon data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="2"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2} points="1292.43 484.46 1391.49 484.46 1391.49 368.89 1292.43 312.48 1292.43 484.46"/>
    <polygon data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="1"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2} points="1430.7 484.46 1612.99 484.46 1430.7 373.02 1430.7 484.46"/>

    <polygon data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="11"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2} points="285.35 557.53 383.19 557.53 383.19 498.83 285.35 557.53"/>
    <polygon data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="12"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} points="429.96 470.09 383.19 498.83 383.19 557.53 431.49 557.53 429.96 470.09"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="13"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="450.45" y="494.85" width="92.03" height="61.15"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="14"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="542.47" y="494.85" width="86.37" height="61.15"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="15"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="812.28" y="494.85" width="142.62" height="61.15"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="16"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="954.9" y="494.85" width="136.2" height="61.15"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="17"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1293.66" y="494.85" width="96" height="61.15"/>
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="18"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1429.4" y="494.85" width="85.3" height="61.15"/>
      
    <rect data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="19"
      bedroomCount="1"
      apartmentType="Penthouse"
      className={styles.st2} x="1514.7" y="494.85" width="98.29" height="61.15"/>

    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="29"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="266.55" y="568.38" width="164.94" height="62.83"/>
    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="30"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="570.14" y="568.38" width="58.7" height="62.83"/>
    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="31"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="812.28" y="568.38" width="142.62" height="64.66"/>
    <rect  data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="32"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="954.9" y="568.38" width="136.2" height="64.66"/>
    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="33"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="1292.43" y="568.38" width="97.22" height="64.66"/>
    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="34"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1429.4" y="568.38" width="92.45" height="64.66"/>
    <rect data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="35"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1521.85" y="568.38" width="91.15" height="64.66"/>


    <rect data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="45"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="266.55" y="638.09" width="164.94" height="66.04"/>
    <rect data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="46"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="812.28" y="640.38" width="147.72" height="63.75"/>
    <rect data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="47"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="960" y="640.38" width="131.11" height="63.75"/>
    <rect data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="48"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="1292.43" y="640.38" width="97.22" height="63.75"/>
    <rect  data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="49"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2} x="1429.4" y="640.38" width="92.45" height="63.75"/>
    <rect data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="50"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}  x="1521.85" y="640.38" width="91.15" height="63.75"/>

    <polygon data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="60"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} points="431.49 711.01 361.02 711.01 361.02 724.4 431.49 734.39 431.49 711.01"/>

    <polygon data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="61"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} points="664.15 711.01 758.62 711.01 756.79 774.29 664.15 761.45 664.15 711.01"/>
    <polygon data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="62"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}  points="266.55 711.01 361.02 724.4 361.02 711.01 266.55 711.01"/>

    <polygon data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="63"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} points="628.84 711.01 628.84 757.33 551.8 749.99 551.8 712.38 628.84 711.01"/>

    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="64"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="812.28" y="711.01" width="121.07" height="74.75"/>
    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="65"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2} x="970.04" y="711.01" width="121.07" height="74.75"/>
    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="66"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1128.71" y="711.01" width="119.69" height="74.75"/>
    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="67"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1292.43" y="711.01" width="97.22" height="74.75"/>
    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="68"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1429.4" y="711.01" width="91.8" height="74.75"/>
    <rect data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="69"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2} x="1521.2" y="711.01" width="91.8" height="74.75"/>

  </svg>
  )
}

export default BackViewSvgs