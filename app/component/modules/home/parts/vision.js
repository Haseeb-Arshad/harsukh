import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/vision.module.css';
// import AnimatedText from '@/components/AnimatedText'; // Import the AnimatedText component


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

export default function VisionPage() {
  return (
    <div className={styles.container}>
      <div className={styles.visionContent}>
        <div className={styles.visionImage}>
          <Image
            unoptimized
            src='https://cdn.theharsukh.com/images/home/vision-bg.webp'
            alt="Harsukh Residencies"
            layout="fill" objectFit="cover" 
            quality={100}
          />
        </div>
        <div className={styles.visionText}>
          <AnimatedText text="VISION" className={styles.title} />
          <AnimatedText
            text="The vision of the Harsukh Residencies is to make an example of luxury living with the nature present in the region of Galyat. The aim and goal is to provide luxury living with elegance, apartments designed to perfection, premium amenities setting a standard of living with a sophisticated atmosphere of both comfort and beauty, ensuring the residents to live peacefully in the hills away from all the hassle of life."
            className={styles.content}
          />
        </div>
      </div>
    </div>
  );
}
