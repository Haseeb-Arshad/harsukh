'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/home/footer.module.css';
import PrivacyPolicy from './privacyPolicy';
import { useInView } from 'react-intersection-observer';

const Footer = ({onPrivacyPolicyClick }) => {

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


  const handleGetDirections = () => {
    // Coordinates for HARSUKH
    const destination = '34.0162791,73.3928231';
    
    // Create the URL for Google Maps directions with the destination
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  // const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  // const handlePrivacyPolicyClick = () => {
  //   setIsPrivacyPolicyOpen(true);
  // };


  const handlePrivacyPolicyClick = () => {
    if (onPrivacyPolicyClick) {
      onPrivacyPolicyClick();
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isMidScreen, setIsMidScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        setIsMidScreen(width > 768 && width < 880);
      };
      
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);


  const getImageDimensions = () => {
    if (isMobile) {
      return { width: 140, height: 70 };
    } else if (isMidScreen) {
      return { width: 180, height: 100 };
    } else {
      return { width: 200, height: 115 };
    }
  };

  const imageDimensions = getImageDimensions();

  return (
    <>
    {/* <PrivacyPolicy isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} /> */}
    <div className={styles.footer}>
      <div className={styles.container}>
       
        {!isMobile && (
        <div className={styles.logo}>
          <Image style={{cursor:"pointer"}} src="https://cdn.theharsukh.com/floors/floors/HarsukhLogo.webp" alt="menu" width={imageDimensions.width} height={imageDimensions.height} />
        </div>
        )}
        <div className={styles.content}>
          <div className={styles.contact}>
            <h3>Get in Touch</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactInfoIconCircle}>
                <Image src="/images/icons/homePage/maps.svg" alt="Location" width={16} height={16} />
              </div>
              <div style={{cursor:'pointer'}} className={styles.contactInfoText} onClick={handleGetDirections}>
                  24-D, 2nd floor, Rashid Plaza, Main Jinnah Avenue, Blue Area, G-6/3, Islamabad              
              </div>
              
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactInfoIconCircle}>
                <Image src="/images/icons/homePage/emailIcon.svg" alt="Location" width={16} height={16} />
              </div>     
              <div>
                info@theharsukh.com
              </div>         
              
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactInfoIconCircle}>
                <Image src="/images/icons/homePage/call.svg" alt="Location" width={16} height={16} />
              </div>    
              <div onClick={handleCallClick} style={{cursor:'pointer'}}>
                051-111-520-520
              </div>          
              
            </div>
          </div>
          
          <div className={styles.social}>
            <div className={styles.socialTitle}>Follow us on Social Media</div>
            <div className={styles.socialIcons}>
              <Link className={styles.socialIcon} href="https://www.facebook.com/people/Harsukh/61556868763411/?mibextid=ZbWKwL"><Image src="https://cdn.theharsukh.com/images/icons/homePage/facebook.svg" alt="Facebook" width={20} height={20} /></Link>
              <Link className={styles.socialIcon} href="https://www.instagram.com/theharsukh/?igsh=M3UzM2s4cXVza255"><Image src="https://cdn.theharsukh.com/images/icons/homePage/insta.svg" alt="Instagram" width={20} height={20} /></Link>
              <Link className={styles.socialIcon} href="#"><Image src="/images/Logo/tiktokIcon.svg" alt="Twitter" width={20} height={20} /></Link>
              <Link className={styles.socialIcon} href="https://www.youtube.com/@theharsukh"><Image src="https://cdn.theharsukh.com/images/icons/homePage/youtube.svg" alt="YouTube" width={20} height={20} /></Link>
              <Link className={styles.socialIcon} href="https://www.linkedin.com/company/harsukh-residencies/about/"><Image src="https://cdn.theharsukh.com/images/icons/homePage/linkedin.svg" alt="LinkedIn" width={20} height={20} /></Link>
            </div>
          </div>
          
          <div className={styles.newsletter}>
            <div className={styles.newsletterTitle}>Get the latest News from us</div>
            <div className={styles.form}>
              <div className={styles.formInput}>
                <input className={styles.inputBox} type="email" placeholder="Enter Your Email" />
              </div>
              <div className={styles.submitbutton} type="submit">Submit</div>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.links}>
            <div onClick={handlePrivacyPolicyClick} className={styles.handlePrivacyPolicyClick}>
              Privacy Policy
            </div>
          </div>
        </div>
      </div>

    </div>

    </>

  );
};

export default Footer;