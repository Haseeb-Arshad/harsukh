import React, { useState, useEffect, useRef } from 'react';
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
  const [isAutoplayError, setIsAutoplayError] = useState(false);
  const videoRef = useRef(null);

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

      {/* Show loading placeholder until video is ready */}
      {!isVideoLoaded && <div className={styles.videoPlaceholder}>Loading video...</div>}

      {/* Hide play button (try to auto-play in the background) */}
      {isAutoplayError && <div className={styles.playButton}>▶ Play Video</div>}

      <video 
        ref={videoRef}
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        priority={true}
        playsInline
        preload="auto"
      >
        <source src="https://res.cloudinary.com/dykglphpa/video/upload/v1727349342/harsukh/t47bupxevu0rkxitiley.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoContent;
