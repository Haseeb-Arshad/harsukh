// pages/vision.js

import Image from 'next/image';
import styles from '@/styles/home/vision.module.css'; // Importing the CSS module
// import visionBg from '@/public/images/home/vision-bg.webp'

export default function VisionPage() {
  return (
    <div className={styles.container}>
      <div className={styles.visionContent}>
        <div className={styles.visionImage}>
          <Image
            src='/images/home/vision-bg.webp' // Make sure the image is placed in your public folder
            alt="Harsukh Residencies"
            fill
            // layout="fill"
            // objectFit="cover"
            quality={100}
          />
        </div>
        <div className={styles.visionText}>
          <div className={styles.title}>VISION</div>
          <div className={styles.content}>
            The vision of the Harsukh Residencies is to make an example of luxury
            living with the nature present in the region of Galyat. The aim and
            goal is to provide luxury living with elegance, apartments designed
            to perfection, premium amenities setting a standard of living with a
            sophisticated atmosphere of both comfort and beauty, ensuring the
            residents to live peacefully in the hills away from all the hassle
            of life.
          </div>
        </div>
      </div>
    </div>
  );
}