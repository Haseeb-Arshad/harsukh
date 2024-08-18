'use client'
import React, { useRef, useEffect } from 'react';
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

    return (
        <div className={styles.popupOverlay}>
            <div ref={popupRef} className={styles.popupContent}>
                <div className={styles.popupContentBack}>
                    <div className={styles.contactTitle}>Contact Us</div>
                    <div className={styles.contactInfo}>
                        <p><strong>Call Now</strong></p>
                        <p>051-111-520-520</p>
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