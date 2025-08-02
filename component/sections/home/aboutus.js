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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For mobile, keep text as paragraph; for desktop, break into lines
  if (isMobile && className === styles.desc) {
    return (
      <div ref={ref} className={className}>
        <div className={`${styles.titleLines} ${inView ? styles.isInview : ''}`}>
          <span className={styles.lineInner}>{text}</span>
        </div>
      </div>
    );
  }

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

      <div className={styles.content}>
        <div className={styles.emptyDiv}></div>
        <div className={styles.titleSection}>
          <AnimatedText text="VISION" className={styles.title} />
        </div>
        <div className={styles.subtitleSection}>
          <AnimatedText text="A NEW PARADIGM OF LUXURY LIVING IN NATURE" className={styles.subtitle} />
        </div>
        <div className={styles.description}>
          <AnimatedText
            text="Nestled between Nathiagali and Ayubia in the heart of the Galyat region, Harsukh Residencies redefines elevated living by fusing architectural sophistication with the untouched serenity of the hills. Conceived as a high-rise sanctuary in Kuza Gali, Ayubia, Harsukh is more than a residential project—it is a masterfully orchestrated blend of premium apartments, immersive nature, and curated wellness."
            className={styles.desc}
          />
          <br />
          {/* <br /> */}
          <AnimatedText
            text="Crafted for those who seek elegance and peace, Harsukh is a lifestyle that transcends the ordinary. Designed with precision and guided by a vision to deliver luxury living amidst nature, Harsukh sets a new standard of high-altitude refinement for a discerning few—making it not only a lifestyle choice, but an investment unlike any other."
            className={styles.desc}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
