import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/home/aboutus.module.css';
import { useInView } from 'react-intersection-observer';
import Head from 'next/head';



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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    
    <section className={styles.container}>

      <Head>
        <title>Harsukh Residencies - Luxury Apartments in Ayubia | About Us</title>
        <meta name="description" content="Discover Harsukh Residencies, a luxury living experience in Ayubia. Designed for the high-end market, it blends modern comfort with nature, offering an investment like no other." />
        <meta name="keywords" content="Harsukh Residencies, luxury apartments, Ayubia apartments, modern living, investment opportunity, nature living, high-end residencies, grandeur and luxury, Ayubia real estate" />
        <meta name="author" content="Harsukh Residencies" />
        <meta property="og:title" content="Harsukh Residencies - Luxury Apartments in Ayubia" />
        <meta property="og:description" content="Experience the grandeur of Harsukh Residencies, combining modern luxury with the beauty of nature in Ayubia. Perfect for the high-end market." />
        <meta property="og:image" content="https://cdn.theharsukh.com/images/home/aboutusHarsukh.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theharsukh.com/about-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harsukh Residencies - Luxury Apartments in Ayubia" />
        <meta name="twitter:description" content="Setting an example of luxury and modern living in nature, Harsukh Residencies is a unique investment in Ayubia." />
        <meta name="twitter:image" content="https://cdn.theharsukh.com/images/home/aboutusHarsukh.webp" />
      </Head>

      <div className={styles.imageSection}>
        {!isMobile && (
          <Image
            src="https://cdn.theharsukh.com/images/home/aboutusHarsukh.webp"
            alt="Harsukh Residencies"
            fill
            sizes="100vw"
            quality={85}
            priority
            className={styles.backgroundImage}
          />
        )}
        <Image
          src="https://cdn.theharsukh.com/images/home/aboutUsback.webp"
          alt="Harsukh Residencies Background"
          fill
          sizes="100vw"
          quality={85}
          className={styles.backgroundImageLines}
        />
      </div>
      <div className={styles.contentOverlay}>
        <div className={styles.content}>
          <AnimatedText text="ABOUT US" className={styles.title} />
          <AnimatedText
            text="Setting an example of grandeur and luxury in Ayubia, Harsukh Residencies is designed for the high-end market. Blending the comfort of nature and beauty. Finishing it to perfection, this project is a combination of modern living within nature, making it an investment like no other."
            className={styles.description}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
