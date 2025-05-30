import { useCallback, useEffect, useRef, useState, useMemo, React} from "react";
import styles from "@/styles/ImageBackground.module.css";

const BackSvgs = ({svgRef, handleBackMouseLeave, hoveredGroup, handleBackMouseEnter,   }) => {
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


<g
    onMouseEnter={() => handleBackMouseEnter('third-floor')}
    onMouseLeave={handleBackMouseLeave}
    data-image="Third Floor"
    data-tip="third-floor"
  >
    <polygon
      className={hoveredGroup === 'third-floor' ? styles.st1Hovers : styles.st0}
      data-image="Third Floor"
      data-tip="third-floor"
      points="1132.38 418.42 1132.38 419.64 1132.36 418.42 1132.38 418.42 737.04 386.21 736.15 452.59 736.15 500.05 630.52 483.24 364.53 482.82 461.85 423.36 652 306.98 737.04 386.21"/>
    <polygon
    data-image="Third Floor"
    data-tip="third-floor"
      className={hoveredGroup === 'third-floor' ? styles.st1Hovers : styles.st0}
      points="1132.38 419.64 1132.38 478.96 770.24 480.79 768.71 418.42 771.16 418.45 777.5 418.45 768.71 418.42 771.24 319.36 797.83 230.62 1110.83 226.73 1130.55 319.02 1132.36 418.42 1132.38 419.64 1639.13 469.32 1639.13 487.21 1173.66 489.21 1173.5 458.17 1172.81 379.98 1269.04 266.17 1388.51 338.85 1407.25 326.66 1533.2 404.66 1639.13 469.32"/>
</g>

<g
    onMouseEnter={() => handleBackMouseEnter('second-floor')}
    onMouseLeave={handleBackMouseLeave}
    data-image="Second Floor"
    data-tip="second-floor"
  >
    <polygon  className={hoveredGroup === 'second-floor' ? styles.st1Hovers : styles.st0}
      data-image="Second Floor"
      data-tip="second-floor" points="248.2 558.75 665.53 558.75 733.25 560.59 733.25 509.68 629.3 495.46 431.64 493.63 346.8 493.63 248.37 554.48 248.2 558.75"/>
    <polygon  className={hoveredGroup === 'second-floor' ? styles.st1Hovers : styles.st0}
      data-image="Second Floor"
      data-tip="second-floor" points="768.71 489.21 768.71 553.87 1132.38 553.87 1132.38 491.5 768.71 489.21 1175.95 508.31 1175.95 557.83 1640.27 551.89 1639.13 494.56 1175.95 497.3 1175.95 508.31"/>
</g>

<g
    onMouseEnter={() => handleBackMouseEnter('first-floor')}
    onMouseLeave={handleBackMouseLeave}
    data-image="First Floor"
    data-tip="first-floor"
  >
    <polygon  className={hoveredGroup === 'first-floor' ? styles.st1Hovers : styles.st0}
      data-image="First Floor"
      data-tip="first-floor" points="246.94 626.01 662.62 626.62 733.25 622.34 733.25 570.37 662.93 569.15 247.63 569.64 246.94 626.01 768.71 569.15 770.55 569.14 1132.38 567.01 1132.38 626.62 768.71 626.62 768.71 569.15"/>
    <polygon  className={hoveredGroup === 'first-floor' ? styles.st1Hovers : styles.st0}
      data-image="First Floor"
      data-tip="first-floor" points="1175.95 570.67 1175.95 625.4 1255.13 626.62 1430.62 629.38 1641.58 629.38 1640.51 564.87 1292.43 564.87 1175.95 570.67"/>
</g>

<g
    onMouseEnter={() => handleBackMouseEnter('ground-floor')}
    onMouseLeave={handleBackMouseLeave}
    data-image="Ground Floor"
    data-tip="ground-floor"
  >

    <polygon className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
      data-image="Ground Floor"
      data-tip="ground-floor" points="245.49 695.11 447.58 698.78 629.49 700.46 732.83 681.2 732.83 636.41 677.8 636.41 630.71 639.47 246.71 637.94 245.49 695.11"/>
    <path className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
      data-image="Ground Floor"
      data-tip="ground-floor" d="M1643,706.88l-388.28,1.83-81.17-5,1.83-66.5,79.34,3.21h387.51Z"/>
    <rect className={hoveredGroup === 'ground-floor' ? styles.st1Hovers : styles.st0}
      data-image="Ground Floor"
      data-tip="ground-floor" x="768.71" y="638.76" width="363.67" height="66.95"/>
</g>



    <polygon className={styles.st0}
      data-image="Valley Floor 1"
      data-tip="valley-floor-1" points="245.91 700.46 288.56 713.76 427.75 731.87 430.5 731.87 430.5 708.94 245.91 700.46 1644.03 717.12 1644.03 785.45 1136.2 785.45 1131.16 777.81 1090.65 777.81 886.27 772 863.34 785.45 563.87 749.53 550.73 747.92 550.73 713.76 756.79 713.76 811.21 717.12 1130.09 717.12 1138.34 722.12 1231.59 722.12 1644.03 717.12"/>

    <polygon className={styles.st0}
      data-image="Valley Floor 2"
      data-tip="valley-floor-2" points="1031.95 789.88 1137.43 797.22 1644.03 799.06 1644.03 867.85 1031.95 803.64 1031.95 789.88"/>

</svg>
  )
}

export default BackSvgs