import React, {useState, useCallback, useRef, useEffect} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/home/header.module.css';
import { useInView } from 'react-intersection-observer';
// import TextMasked from './anim/TextMasked';
import RegisterRequestForm from '@/component/ui/Bars/contactBox';

const Header = ({ toggleContactForm }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAutoplayError, setIsAutoplayError] = useState(false);
  const videoRef = useRef(null);
  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);
  const [isContacted, setIsContacted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.45  // This controls when the animation starts as you scroll into view
  });

  const TitleOne = "THE BEST APARTMENT OF GALYAT"
  const titleOneLines = TitleOne.split('\n');

  
  
  

  const titleText = 'HARSUKH - Luxury in the Heart of Galiyat';
  const titleLines = titleText.split('\n');

  const subtitle = "A Mountain-Front Investment Promising Up to 25% Annual ROI";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } }
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [.165,.84,.44,1] }
    }
  };

  const subtitleVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 1.2, ease: [.165,.84,.44,1] }
    }
  };

  const buttonVariants = {
    hidden: { y: 5, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.4, ease: [0.49, 0.23, 0, 1] }
    }
  };

  const handleCall = () => {
    setIsContacted(!isContacted);
  };
  
  const handleContactClose = () => {
    setIsContacted(false);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // When video data is loaded
      const handleLoadedData = () => setIsVideoLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);

      // Try to play video programmatically
      const playVideo = async () => {
        try {
          await video.play();
          setIsAutoplayError(false);  // Video played successfully
        } catch (error) {
          // Autoplay failed - browser blocked the play
          console.error('Auto-play failed:', error);
          setIsAutoplayError(true);  // Trigger the error state
        }
      };

      // Attempt to auto-play the video
      playVideo();

      // Clean up the event listener when component unmounts
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  return (
    <>
    <motion.div id="header" className={styles.container} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
    <video ref={videoRef} className={styles.videoWrapper} autoPlay loop muted playsInline preload="auto">
      <source src="/video/harsukh-intro.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
      <div className={styles.overlay}></div>
      <motion.div className={styles.content}>

        <h1 ref={ref} className={`${styles.SplitLines} ${inView ? styles.isInview : ''}`}>
          {titleLines.map((line, index) => (
            <div key={index} className={styles.titleLines}>
              <div className={styles.lineInner}>{line}</div>
            </div>
          ))}
        </h1>
        <motion.div className={`${styles.subtitle} ${inView ? styles.isInview : ''}`}>
          <span className={styles.lineInner}>{subtitle}</span>
        </motion.div>

      </motion.div>
    </motion.div>
          
    {isContacted && (
        <div style={{zIndex:'99999999999'}} className={styles.ContactedContainer}>
          <RegisterRequestForm onClose={handleContactClose} />
        </div>
      )}

    </>
  );

};

export default Header;