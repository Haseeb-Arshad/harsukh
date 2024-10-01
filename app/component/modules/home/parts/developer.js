import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/developer.module.css';
import React from 'react';

// AnimatedText Component (from VideoContent)
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

const Developer = () => {
  const devText1 = "Almaymaar, a leading real estate developer based in Islamabad, is renowned for its unwavering commitment to creating high-quality, innovative residential and commercial projects. Among their notable achievements is Aiwa City Attock, a project that has set new benchmarks in the real estate sector. Currently, Almaymaar is developing their signature project, Harsukh Residencies, which embodies their dedication to luxurious living and architectural excellence.";
  const devText2 = "Almaymaar's projects consistently reflect a deep understanding of homeowners' desires, ensuring that each development not only meets but anticipates the needs of future residents. With Harsukh Residencies, Almaymaar aims to redefine luxury living, integrating modern design with the serene beauty of nature.";

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.emptyDiv}></div>
        <div className={styles.title}>
          <div className={styles.titleText}>Developer</div>
        </div>
        <div className={styles.logoDiv}>
          <Image
            className={styles.logo}
            src="https://cdn.theharsukh.com/images/ContactUs/Almaymaar.png"
            alt="Harsukh Residencies"
            width={190}
            height={45}
          />
        </div>
        <div className={styles.description}>
          <AnimatedText text={devText1} className={styles.desc} />
          <AnimatedText text={devText2} className={styles.desc} />
        </div>
      </div>
    </section>
  );
};

export default Developer;
