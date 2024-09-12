'use client'
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from '@/styles/home/privacyPolicy.module.css';
import data from '@/app/component/data/privacypolicy.json';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
    //   transition: { 
    //     type: 'spring', 
    //     damping: 25, 
    //     stiffness: 500,
    //     duration: 0.5
    //   } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
    //   transition: { 
    //     // staggerChildren: 0.1,
    //     delayChildren: 0.3
    //   } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            ref={modalRef}
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >

            <div className={styles.closeButtonBox}>
                <motion.button 
                className={styles.closeButton}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <X size={15} />
                </motion.button>
            </div>
            

            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className={styles.content}
            >
              <motion.div className={styles.title} variants={itemVariants}>{data.title}</motion.div>
              <motion.div className={styles.dateTitle} variants={itemVariants}>Effective Date: {data.effectiveDate}</motion.div>
              <motion.p variants={itemVariants}>{data.introduction}</motion.p>
              
              <motion.div className={styles.headings} variants={itemVariants}>Scope</motion.div>
              <motion.ul>
                {data.scope.map((item, index) => (
                  <motion.li key={index} variants={itemVariants}>{item}</motion.li>
                ))}
              </motion.ul>

              <motion.div className={styles.headings} variants={itemVariants}>Personal Data Collection</motion.div>
              <motion.ul>
                {Object.entries(data.personalDataCollection).map(([key, value], index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <strong>{key}:</strong> {value}
                  </motion.li>
                ))}
              </motion.ul>


            <div className={styles.headings}>Purposes of Personal Data Collection</div>
            <ul>
              {data.purposesOfPersonalDataCollection.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className={styles.headings}>Sharing Personal Data</div>
            <ul>
              {data.sharingPersonalData.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className={styles.headings}>Security Measures</div>
            <ul>
              {data.securityMeasures.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className={styles.headings}>Retention Period</div>
            <p>{data.retentionPeriod}</p>
            <div className={styles.headings}>Your Rights</div>
            <ul>
              {data.yourRights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <motion.div  className={styles.headings} variants={itemVariants}>Contact Us</motion.div>
              <motion.p variants={itemVariants}>{data.contactUs}</motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicy;