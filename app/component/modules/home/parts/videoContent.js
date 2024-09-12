import React, { useEffect, useRef } from 'react';
// import AnimatedText from './AnimatedText';
import styles from '@/styles/home/videoContent.module.css';
import { useInView } from 'react-intersection-observer';


const AnimatedText = ({ text, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const createLines = (text) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = [];

    words.forEach((word) => {
      if (currentLine.join(' ').length + word.length < 98) {
        currentLine.push(word);
      } else {
        lines.push(currentLine.join(' '));
        currentLine = [word];
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }

    return lines;
  };

  const lines = createLines(text);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} className={`${styles.titleLines} ${inView ? styles.isInview : ''}`}>
          <span className={styles.lineInner}>{line}</span>
        </div>
      ))}
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
            text="Galiyat region offers immense views which showcase the natural beauty of Pakistan. With many places to visit, every year the number of tourists is gradually increasing, making this region a perfect opportunity for investment. The weather being quite pleasant in the summer, this region is a gateway to beauty. Many projects under construction help make the Galiyat a more prominent region for investors to invest. With expressway being under talks of extension, this draws more tourists gradually and the location helps us secure an ROI with a percentage of more than one"
            className={styles.content}
          />
        </div>
      </div>
      {/* Background Video */}
      <video 
        className={styles.videoBackground}
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/video/homePage.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoContent;