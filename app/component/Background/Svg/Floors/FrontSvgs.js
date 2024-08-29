import { useCallback, useEffect, useRef, useState, useMemo, React} from "react";
import styles from "@/styles/ImageBackground.module.css";

const FrontSvgs = ({svgRef, setSelectedPath, selectedPath}) => {
  return (
    <svg
    ref={svgRef}
    version="1.1"
    id={styles.masker}
    viewBox="0 0 1920 1080"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    xmlSpace="preserve"
  >

    <polygon
      className={styles.st0}
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
    />

    <polyline
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      className={styles.st0}
      points="428.82 874.84 428.82 924.18 687.17 922.66 944.59 917.15 1182.1 917.15 1182.1 867.93 824.98 871.37 680.44 873.59 625.87 873.43 428.82 874.84"
    />

    <polygon
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      className={styles.st0}
      points="428.82 814.12 428.82 866.55 596.18 865.48 699.52 863.34 750.12 862.73 830.77 860.59 946.99 859.98 1182.15 860.9 1182.1 810.83 853.77 812.29 733.87 813.51 621.94 814.12 428.82 814.12"
    />
    <polygon
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      className={styles.st0}
      points="1362.91 754.5 1362.91 803.11 822.18 804.64 428.82 804.64 428.82 754.5 1362.91 754.5"
    />
    <path
      className={styles.st0}
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      d="M1512.8,698v44.71l-78.35-.69-370.09,4.51H872.44l-171.52-1.22-104.25,1.22-167.39.16V695.19H701.54l119.75.48,33,2.28,253.23.3h97.53Z"
    />
    <path
      className={styles.st0}
      data-image="Valley Floor 2"
      data-tip="valley-floor-2"
      d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
    />
    <path
      className={styles.st0}
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      d="M429,575.19q.16,25.3.31,50.6l182.37-.31h87.13l122,2.83,34.7,3h217.84l35.46,2.45h246.42l157.61,1.83V589.71l-150.88.92-17.74-5.2-139.1.92L1169,584.82l-141.86-.3-100.28-.62-71.39-.27-34.09-6.47-88.66.32L697,575.34l-43.72,1.53H624.18l-30-1.53Z"
    />

    <path
      className={styles.st0}
      data-image="Ground Floor"
      data-tip="ground-floor"
      d="M820.92,522.83v44.26L855,574.66l244.28-1.15V525.59l-243.62,1Z M1512.8,534.93q-.08,23-.16,46l-150-1.53-16-3.46H1345c-53.73-.68-148-1.05-201.7-1.73-.31-15.18.31-30.65,0-45.83,54.11,0,147.82.08,201.93.11l18.58,6.65Z M783.06,519.38v50.14l-21.14-.5-63.14-1.46H611.65l-182.37.31q-.15-25.3-.31-50.6l165.25.15,30,1.53h29.05L697,517.42Z"
    />

    <path
      className={styles.st0}
      data-image="First Floor"
      data-tip="first-floor"
      d="M820.92,466.66v45.55L855.47,516l243.82-.76v-47l-244.43.38Z M1512.87,526.27h-105l-43.79-2.52-16.82-3.44-4.87.07h0l-24.14,1.31-174.88-1.61V472.85L1343.65,474l21.55,7.57,147.75-.15Z M783.06,461v50.14l-21.14-.49-63.14-1.47H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
    />

    <path
      className={styles.st0}
      data-image="Second Floor"
      data-tip="second-floor"
      d="M820.92,411.17v45.4L857,458.25l242.29,2v-49.1L855.47,413Z M1143.32,416.82h205.14l16.51,3.52,72,0,75.32,48.27v4.74l-82.24.61h-65.43l-17.12-8.4-204.31.38Z M783.06,403.58v47.89l-21.14-.5-62,.78H611.65l-182.37.31q-.15-25.31-.31-50.6l165.25.15,30,1.53Z"
    />

    <path
      onMouseEnter={() => setSelectedPath(true)}
      onMouseLeave={() => setSelectedPath(false)}
      data-image="Third Floor"
      data-tip="third-floor"
      className={!selectedPath ? styles.st0 : styles.st1Hovers}
      d="M1420.24,409.94H1206.3L1143,410q.16-20.67.31-41.35l46.47-106.09,176.1,112.81L1391,391.9Z M783.06,366c0,9.36,0,20,0,29.35-13.29,0-29.29-.52-42.58-.54H720.32c-44,.53-85.62-1.37-129.65-.84l-161.43,1.38.19-13.42L607.37,263.8l13.76,15.29L709.79,221h1.45Z"
    />
    <polygon
      onMouseEnter={() => setSelectedPath(true)}
      onMouseLeave={() => setSelectedPath(false)}
      data-image="Third Floor"
      data-tip="third-floor"
      className={!selectedPath ? styles.st0 : styles.st1Hovers}
      points="820.92 401.99 1099.29 401.99 1099.29 331.98 1086.15 272.98 836.36 272.98 820.92 332.29 820.92 401.99"
    />

  </svg>  )
}

export default FrontSvgs