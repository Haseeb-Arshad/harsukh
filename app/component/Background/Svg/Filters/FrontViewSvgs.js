import { useCallback, useEffect, useRef, useState, useMemo, React} from "react";
import styles from "@/styles/ImageBackground.module.css";


const FrontViewSvgs = ({svgRef, setSvgHover }) => {
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
    <polygon
      data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="10"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2}
      points="446.78 393.2 591.57 298.53 589.86 396.41 446.78 396.41 446.78 393.2"
    />
    <polygon
      data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="9"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2}
      points="619.67 303.31 693.04 256.08 695.34 382.19 619.67 382.19 619.67 303.31"
    />
    <rect
      data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="8"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2}
      x="854.93"
      y="361.55"
      width="110.52"
      height="45.86"
    />
    <rect
      data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="7"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2}
      x="965.45"
      y="361.55"
      width="100.89"
      height="45.86"
    />
    <polygon
      data-image="Third Floor"
      data-tip="third-floor"
      ApartmentNum="6"
      bedroomCount="3"
      apartmentType="Penthouse"
      className={styles.st2}
      points="1207.59 296.89 1207.59 409.25 1347.92 409.25 1347.92 384.48 1207.59 296.89"
    />

    <polygon
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="28"
      bedroomCount="2"
      apartmentType="Penthouse"
      className={styles.st2}
      points="446.78 407.41 446.78 456.25 528.87 456.25 528.87 404.66 446.78 404.66 446.78 407.41"
    />
    <rect
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="27"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="404.66"
      width="62.7"
      height="51.59"
    />
    <polygon
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="26"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      points="626.78 398.93 626.78 443.87 695.34 443.87 695.34 398.01 626.78 398.93"
    />
    <rect
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="25"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="411.08"
      width="110.52"
      height="49.22"
    />
    <rect
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="24"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="965.45"
      y="411.08"
      width="100.89"
      height="49.22"
    />
    <polygon
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="23"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      points="1207.59 416.59 1285.1 416.59 1285.1 465.5 1206.52 465.5 1207.59 416.59"
    />
    <rect
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="22"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1285.1"
      y="416.59"
      width="62.83"
      height="48.92"
    />
    <polygon
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="21"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      points="1365.2 397.32 1365.2 473.76 1408.61 473.76 1408.61 424.23 1365.2 397.32"
    />
    <polygon
      data-image="Second Floor"
      data-tip="second-floor"
      ApartmentNum="20"
      bedroomCount="1"
      apartmentType="Penthouse"
      className={styles.st2}
      points="1487.49 473.76 1408.61 473.76 1408.61 424.23 1487.49 473.76"
    />

    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="44"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="463.67"
      width="82.09"
      height="51.97"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="43"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="463.67"
      width="64.36"
      height="51.97"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="42"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="626.78"
      y="457.86"
      width="68.56"
      height="47.46"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="41"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="468.64"
      width="110.52"
      height="47.01"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="40"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="965.45"
      y="468.64"
      width="100.89"
      height="47.01"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="39"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1206.52"
      y="473.76"
      width="78.57"
      height="48"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="38"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1285.1"
      y="473.76"
      width="62.83"
      height="48"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="37"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1363.97"
      y="481.1"
      width="57.78"
      height="40.66"
    />
    <rect
      data-image="First Floor"
      data-tip="first-floor"
      ApartmentNum="36"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1421.76"
      y="481.1"
      width="74.9"
      height="40.66"
    />
    

    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="59"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="521.15"
      width="82.09"
      height="45.86"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="58"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="521.15"
      width="64.36"
      height="45.86"
    />
    <path
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="57"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      d="M625.63,517.25h70.62V567H625.63C626.32,567,625.63,517.25,625.63,517.25Z"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="56"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="526.19"
      width="110.52"
      height="48.15"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="55"
      bedroomCount="3"
      apartmentType="Bedroom"
      className={styles.st2}
      x="965.45"
      y="526.19"
      width="100.89"
      height="48.15"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="54"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1206.52"
      y="528.48"
      width="78.57"
      height="49.53"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="53"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1285.1"
      y="528.48"
      width="62.83"
      height="49.53"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="52"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1363.97"
      y="536.28"
      width="63.06"
      height="46.32"
    />
    <rect
      data-image="Ground Floor"
      data-tip="ground-floor"
      ApartmentNum="51"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1427.03"
      y="536.28"
      width="69.63"
      height="46.32"
    />

    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="81"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="575.26"
      width="82.09"
      height="50.75"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="80"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="575.26"
      width="65.89"
      height="50.75"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="79"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="625.63"
      y="575.26"
      width="70.63"
      height="50.75"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="78"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="732.94"
      y="575.26"
      width="88.66"
      height="50.75"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="77"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="584.74"
      width="88.66"
      height="48.31"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="76"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="977.53"
      y="584.74"
      width="88.82"
      height="48.31"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="75"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1107.16"
      y="584.74"
      width="76.43"
      height="48.31"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="74"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1205.64"
      y="584.74"
      width="73.95"
      height="48.31"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="73"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1279.59"
      y="584.74"
      width="68.33"
      height="48.31"
    />
    <polygon
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="72"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      points="1362.97 588.41 1364.04 633.04 1431.39 633.04 1431.39 588.41 1362.97 588.41"
    />
    <rect
      data-image="Valley Floor 1"
      data-tip="valley-floor-1"
      ApartmentNum="71"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1431.39"
      y="588.41"
      width="65.27"
      height="44.64"
    />

    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="105"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="694.96"
      width="82.09"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="104"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="694.96"
      width="65.89"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="103"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="625.63"
      y="694.96"
      width="73.84"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="102"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="732.94"
      y="694.96"
      width="88.66"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="101"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="997.1"
      y="694.96"
      width="69.25"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="100"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="926.93"
      y="694.96"
      width="70.17"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="99"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="694.96"
      width="72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="98"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1107.16"
      y="694.96"
      width="76.43"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="97"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1205.64"
      y="694.96"
      width="73.95"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="96"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1279.59"
      y="694.96"
      width="68.33"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="95"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1363.97"
      y="694.96"
      width="67.41"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 3"
      data-tip="valley-floor-3"
      ApartmentNum="94"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1431.39"
      y="694.96"
      width="65.27"
      height="50.9"
    />

    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="124"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="755.03"
      width="82.09"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="123"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="755.03"
      width="67.72"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="122"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="625.63"
      y="755.03"
      width="73.84"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="121"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="732.94"
      y="755.03"
      width="88.66"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="120"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="755.03"
      width="72"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="119"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="926.93"
      y="755.03"
      width="69.71"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="118"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="996.64"
      y="755.03"
      width="69.71"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="117"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1107.16"
      y="755.03"
      width="76.43"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="116"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1205.64"
      y="755.03"
      width="47.04"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="115"
      bedroomCount="0"
      apartmentType="Studio"
      className={styles.st2}
      x="1252.69"
      y="755.03"
      width="47.04"
      height="51.36"
    />
    <rect
      data-image="Valley Floor 4"
      data-tip="valley-floor-4"
      ApartmentNum="114"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1299.73"
      y="755.03"
      width="48.19"
      height="51.36"
    />

    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="127"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="446.78"
      y="814.65"
      width="82.09"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="128"
      bedroomCount="2"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="814.65"
      width="67.72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="129"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="625.63"
      y="814.65"
      width="73.84"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="130"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="732.94"
      y="814.65"
      width="88.66"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="131"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="814.65"
      width="72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="132"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="926.93"
      y="814.65"
      width="72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="133"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="998.93"
      y="814.65"
      width="67.41"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 5"
      data-tip="valley-floor-5"
      ApartmentNum="134"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1107.16"
      y="814.65"
      width="76.43"
      height="50.9"
    />

    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="138"
      bedroomCount="0"
      apartmentType="Studio"
      className={styles.st2}
      x="446.78"
      y="873.81"
      width="82.09"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="139"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="528.87"
      y="873.81"
      width="67.72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="140"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="625.63"
      y="873.81"
      width="73.84"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="141"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="732.94"
      y="873.81"
      width="88.66"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="142"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="854.93"
      y="873.81"
      width="72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="143"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="926.93"
      y="873.81"
      width="72"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="144"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="998.93"
      y="873.81"
      width="67.41"
      height="50.9"
    />
    <rect
      data-image="Valley Floor 6"
      data-tip="valley-floor-6"
      ApartmentNum="145"
      bedroomCount="1"
      apartmentType="Bedroom"
      className={styles.st2}
      x="1107.16"
      y="873.81"
      width="76.43"
      height="50.9"
    />

    <path
      className={styles.st0}
      data-image="Valley Floor 2"
      data-tip="valley-floor-2"
      d="M429.28,635.11v51.06l193.38.15h75.21l123.21,1.44c10.93.13,21.93,1.19,32.86,1.32,34.83.41,69.58-.11,104.41.3H1291l221.43,1.84.38-46.17-176.26-2.44-130.85-.92-98.45-.31-254.06-.92L821,637.36l-87.08-.56-54.72-1.23h-89Z"
    />

    
  </svg>
  
    )
}

export default FrontViewSvgs;