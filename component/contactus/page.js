'use client'
import React, { useRef, useEffect, useCallback } from 'react';
import styles from "@/styles/contactUs/contact.module.css";
import Image from 'next/image';

const ContactUsPopup = ({ onClose }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

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
    
      useEffect(() => {
        const handleVisibilityChange = () => {
          if (!document.hidden && window.location.pathname.endsWith('/callus')) {
            const cleanUrl = window.location.href.replace('/callus', '');
            window.history.replaceState({}, '', cleanUrl);
          }
        };
    
        const handleFocus = () => {
          if (window.location.pathname.endsWith('/callus')) {
            const cleanUrl = window.location.href.replace('/callus', '');
            window.history.replaceState({}, '', cleanUrl);
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('focus', handleFocus);
        };
      }, []);

    return (
        <div className={styles.popupOverlay}>
            <div ref={popupRef} className={styles.popupContent}>
                <div className={styles.popupContentBack}>
                    <div className={styles.contactTitle}>Contact Us</div>
                    <div className={styles.contactInfo}>
                        <p><strong>Call Now</strong></p>
                        <p onClick={handleCallClick}>
                            {/* <a href="tel:051111520520">051-111-520-520</a> */}
                            051-111-520-520
                        </p>
                        <p><strong>Booking Office</strong></p>
                        <p>24-D, 2nd floor, Rashid Plaza, Main Jinnah Avenue, Blue Area, G-6/3, Islamabad</p>
                    </div>
                </div>
               
                 <Image 
                        src="/images/ContactUs/contact.png"
                        alt="Building" 
                        layout="fill"
                        objectFit="cover"
                        style={{borderRadius:'0.3rem', marginTop:'5px'}}
                    />
                {/* <div className={styles.imageContainer}>
                    <Image 
                        src="/images/building.jpg" 
                        alt="Building" 
                        layout="fill"
                        objectFit="cover"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default ContactUsPopup;