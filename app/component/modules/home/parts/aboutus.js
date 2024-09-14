import React from 'react';
import Image from 'next/image';
import styles from '@/styles/home/aboutus.module.css';
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

const AboutUs = () => {
  return (
    <section className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="/images/home/aboutusHarsukh.webp"
          alt="Harsukh Residencies"
          fill
          sizes="100vw"
          quality={85}
          priority
          className={styles.backgroundImage}
        />
        <img
          src="/images/home/aboutUsback.webp"
          alt="Harsukh Residencies Background"
          fill
          sizes="100vw"
          quality={85}
          className={styles.backgroundImageLines}
        />
      </div>
      <div className={styles.contentOverlay}>
        <div className={styles.content}>
          <AnimatedText
            text="ABOUT US"
            className={styles.title}
          />
          <AnimatedText
            text="Setting an example of grandeur and luxury in Ayubia, Harsukh Residencies is designed for the high-end market. Blending the comfort of nature and beauty. Finishing it to perfection, this project is a combination of modern living within nature, making it an investment like no other."
            className={styles.description}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;