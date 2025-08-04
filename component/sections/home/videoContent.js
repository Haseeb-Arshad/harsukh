import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/videoContent.module.css';

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

const VideoContent = () => {

  return (
    <div className={styles.main}>
      <div className={styles.videoContent}>
        <div className={styles.videoContentText}>
          <AnimatedText
            text="LUXURY BENCHMARK"
            className={styles.title}
          />
          <AnimatedText
            text="By Harsukh Residencies"
            className={styles.title}
          />
          <AnimatedText 
            text="Galiyat region offers immense views which showcase the natural beauty of Pakistan. With many places to visit, every year the number of tourists is gradually increasing, making this region a perfect opportunity for investment. The ideal location of Harsukh Residencies, where the weather being quite pleasant in the summer, this region is a gateway to beauty. Many projects under construction help make the Galiyat a more prominent region for investors to invest. With expressway being under talks of extension, this draws more tourists gradually and the location helps us secure an ROI with a percentage of more than one"
            className={styles.content}
          />
        </div>
      </div>


        <motion.div className={styles.imageWrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.49, 0.23, 0, 1] }}>
          <Image  unoptimized src="https://cdn.theharsukh.com/images/home/harsukhImage1.webp" layout="fill" objectFit="cover" quality={100} priority alt="Luxury hotel in mountains" />
        </motion.div>
    </div>
  );
};

export default VideoContent;
