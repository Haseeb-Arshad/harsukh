import React, {useState, useCallback} from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/home/header.module.css';
import { useInView } from 'react-intersection-observer';
import TextMasked from './anim/TextMasked';
import RegisterRequestForm from '@/app/component/ui/Bars/contactBox';
import en from "@/app/component/locales/en.json";
import ur from "@/app/component/locales/ur.json";
import { useSelector } from 'react-redux';


const Header = () => {


  const [isCallHovered, setIsCallHovered] = useState(false);
  const [isWAHovered, setIsWAHovered] = useState(false);
  const [isContacted, setIsContacted] = useState(false);


  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === "1");
    return languageState ? languageState.language : "en";
  });

  const [language, setLanguage] = useState(languageState === "ur");
 
 

  const [translations, setTranslations] = useState(
    languageState === "ur" ? ur : en
  );



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

  const handleCallClick = useCallback(() => {
    // Add "/callus" to the URL without navigating
    const newUrl = `${window.location.origin}${window.location.pathname}${window.location.pathname.endsWith('/') ? '' : '/'}callus`;
    window.history.pushState({}, '', newUrl);

    // Attempt to open the phone dialer
    window.location.href = 'tel:051-111-520-520';

    // Set a timeout to remove "/callus" from the URL
    setTimeout(() => {
      if (window.location.pathname.endsWith('/callus')) {
        const cleanUrl = window.location.href.replace('/callus', '');
        window.history.replaceState({}, '', cleanUrl);
      }
    }, 1000); // Short delay to ensure the call attempt has been made
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    // Replace this with your company's WhatsApp number
    const whatsappNumber = '+923300111166';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, '_blank');
  }, []);
  

  return (
    <>
    <motion.div className={styles.container} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <motion.div className={styles.imageWrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: [0.49, 0.23, 0, 1] }}>
        <Image unoptimized src="/images/home/harsukhImage1.webp" layout="fill" objectFit="cover" quality={100} priority alt="Luxury hotel in mountains" />
      </motion.div>
      <div className={styles.overlay}></div>
      <motion.div className={styles.content}>
        <h1 ref={ref} className={`${styles.SplitLines} ${inView ? styles.isInview : ''}`}>
          {titleOneLines.map((line, index) => (
            <div key={index} className={styles.titleLines}>
              <span className={styles.lineInner}>{line}</span>
            </div>
          ))}
        </h1>

        <h1 ref={ref} className={`${styles.SplitLines} ${inView ? styles.isInview : ''}`}>
          {titleLines.map((line, index) => (
            <div key={index} className={styles.titleLines}>
              <span className={styles.lineInner}>{line}</span>
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

      <div
      className={`${styles.buttonss} ${styles.callButton} ${
        isCallHovered ? styles.expanded : ""
      }`}
      onMouseEnter={() => setIsCallHovered(true)}
      onMouseLeave={() => setIsCallHovered(false)}
      onClick={handleCallClick}
    >
      <Image
        src="/images/icons/callIcon.svg"
        quality={100}
        alt="Maps View Icon"
        height={16}
        width={16}
      />
      <div className={styles.buttonText}>{translations["callus"]}</div>
    </div>


    <div
      className={`${styles.buttonss} ${styles.whatsappButton} ${
        isWAHovered ? styles.expanded : ""
      }`}
      onMouseEnter={() => setIsWAHovered(true)}
      onMouseLeave={() => setIsWAHovered(false)}
      onClick={handleWhatsAppClick}
    >
      <Image
      
        src="/images/icons/homePage/whatsapp-icon.svg"
        quality={100}
        alt="Maps View Icon"
        height={19}
        width={19}
      />
      <div className={styles.buttonText}>WhatsApp us</div>
    </div>

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