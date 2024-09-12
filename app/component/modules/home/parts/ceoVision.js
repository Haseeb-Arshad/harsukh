import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/ceoVision.module.css';

const lineVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }
  }
};

const AnimatedText = ({ text }) => {
  return (
    <motion.div className={styles.animatedTextContainer}>
      {text.split('\n').map((line, index) => (
        <motion.p
          key={index}
          variants={lineVariants}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
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

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const visionText = "My journey in real estate has always been guided by a passion for redefining luxury living. With Harsukh Residencies, that vision comes to life where elegance meets comfort and modern design meets natural beauty. Harsukh Residencies is distinct because it reflects a deep commitment to quality, sustainability, and enhancing the community. This isn't just about building homes; it's about building a legacy that contributes positively to the surroundings and offers residents a serene escape from the bustle of everyday life. For those considering Harsukh Residencies, I am looking forward to having you join me on this journey.";

  return (
    <div className={styles.pageContainer}>
      <motion.div 
        className={styles.contentWrapper}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.01,
            },
          },
        }}
      >
        <motion.div
          className={styles.imageContainer}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
            },
          }}
        >
          <Image
            src="/images/home/ceo-profile-pic.webp"
            width={isMidScreen ? 300 : 330}
            height={isMidScreen ? 330 : 360}
            alt="CEO portrait"
            className={styles.ceoImage}
          />
        </motion.div>
        <div className={styles.textContainer}>
          <motion.h2
            className={styles.title}
            variants={lineVariants}
          >
            CEO&apos;s Vision
          </motion.h2>

          <AnimatedText text={visionText} />
        </div>
      </motion.div>
    </div>
  );
};

export default CEOVisionPage;