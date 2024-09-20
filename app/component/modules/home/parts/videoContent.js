import React, { useState, useEffect } from 'react';
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.querySelector(`.${styles.videoBackground}`);
    if (video) {
      video.addEventListener('loadeddata', () => setIsVideoLoaded(true));
      return () => video.removeEventListener('loadeddata', () => setIsVideoLoaded(true));
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.videoContent}>
        <div className={styles.videoContentText}>
          <AnimatedText
            text="LUXURY BENCHMARK"
            className={styles.title}
          />
          <AnimatedText 
            text="Galiyat region offers immense views which showcase the natural beauty of Pakistan. With many places to visit, every year the number of tourists is gradually increasing, making this region a perfect opportunity for investment. The weather being quite pleasant in the summer, this region is a gateway to beauty. Many projects under construction help make the Galiyat a more prominent region for investors to invest. With expressway being under talks of extension, this draws more tourists gradually and the location helps us secure an ROI with a percentage of more than one"
            className={styles.content}
          />
        </div>
      </div>
      {!isVideoLoaded && <div className={styles.videoPlaceholder}>Loading video...</div>}
      <video
        className={`${styles.videoBackground} ${isVideoLoaded ? styles.videoLoaded : ''}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://res.cloudinary.com/dykglphpa/video/upload/v1726852356/harsukh/kjqoxv455khgkl5tohpn.webm" type="video/webm" />
        <source src="https://res.cloudinary.com/dykglphpa/video/upload/v1726852356/harsukh/kjqoxv455khgkl5tohpn.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoContent;