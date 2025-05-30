import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/ceoVision.module.css';

const AnimatedText = ({ text, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={`${className} ${styles.animatedText} ${inView ? styles.isInview : ''}`}>
      <span className={styles.textInner}>{text}</span>
    </div>
  );
};

const CEOVisionPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMidScreen, setIsMidScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        setIsMidScreen(width > 768 && width < 880);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  const visionText = "My journey in real estate has always been guided by a passion for redefining luxury living. With Harsukh Residencies, that vision comes to life where elegance meets comfort and modern design meets natural beauty. Harsukh Residencies is distinct because it reflects a deep commitment to quality, sustainability, and enhancing the community. This isn't just about building homes; it's about building a legacy that contributes positively to the surroundings and offers residents a serene escape from the bustle of everyday life. For those considering Harsukh Residencies, I am looking forward to having you join me on this journey.";

  const getImageDimensions = () => {
    if (isMobile) {
      return { width: 190, height: 205 };
    } else if (isMidScreen) {
      return { width: 220, height: 240 };
    } else {
      return { width: 300, height: 330 };
    }
  };

  const imageDimensions = getImageDimensions();

  return (
    <>
      <div className={styles.mainPage}>
        <div className={styles.pageContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="https://cdn.theharsukh.com/images/home/ceo-profile-pic.webp"
                width={imageDimensions.width}
                height={imageDimensions.height}
                alt="CEO portrait"
                className={styles.ceoImage}
              />
            </div>
            <div className={styles.textContainer}>
              <AnimatedText text="CEO's Vision" className={styles.title} />
              <AnimatedText text={visionText} className={styles.animatedTextContainer} />
              <div className={styles.signatureContainer}>
                <Image
                  src="/signature/signature.png"
                  alt="CEO's Signature"
                  width={150}
                  height={50}
                  className={styles.signature}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CEOVisionPage;
