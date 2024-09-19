import React, {useState, useCallback} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/home/header.module.css';
import { useInView } from 'react-intersection-observer';
import TextMasked from './anim/TextMasked';
import RegisterRequestForm from '@/app/component/ui/Bars/contactBox';

const Header = () => {

  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);
  const [isContacted, setIsContacted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.45  // This controls when the animation starts as you scroll into view
  });

  const TitleOne = "THE BEST APARTMENT OF GALYAT"
  const titleOneLines = TitleOne.split('\n');

  const titleText = 'The Best of Both Worlds';
  const titleLines = titleText.split('\n');

  const subtitle = "Luxury in the heart of Galyat";

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

  return (
    <>
    <motion.div id="header" className={styles.container} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <motion.div className={styles.imageWrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.49, 0.23, 0, 1] }}>
        <Image unoptimized src="https://cdn.theharsukh.com/images/home/harsukhImage1.webp" layout="fill" objectFit="cover" quality={100} priority alt="Luxury hotel in mountains" />
      </motion.div>
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
        <motion.button onClick={handleCall} className={`${styles.ctaBtn} ctaBtn`} variants={buttonVariants}>
          Get in Touch
        </motion.button>
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