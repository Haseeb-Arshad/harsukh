'use client'
import React from 'react';
import styles from "@/styles/contactUs/contact.module.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ContactUs = () =>
{
    const router = useRouter();

    return(
        <>
            <div className={styles.imageWrapper}>
                {/* <img src='/images/ContactUs/ContactUsBack.png' cover   */}
                <img
                    src="/images/ContactUs/ContactUsBack.webp"
                    alt="Background"
                    className={styles.backgroundImage}/>
          
          
               
          
            </div>
            <div className={styles.HarsukhLogo}>
                <Image src="/images/ContactUs/harsukhLogo.webp" height={110} width={170} alt='Harsukh' />        
            </div>
            <div className={styles.AlmaymaarLogo} onClick={()=>router.push("https://almaymaar.com")}>
                <Image src="/images/ContactUs/Almaymaar.png" height={55} width={210} alt='Harsukh' />        
            </div>
            <div className={styles.contactDetailsBox}>
                <div className={styles.callBow}>
                    <div className={styles.callTitle}>
                        Call Now
                    </div>
                    <div className={styles.CallContact}>
                        051-111-520-520
                    </div>
                </div>
                <div className={styles.BookingBox}>
                    <div className={styles.BookingTitle}>
                        Booking Office
                    </div>
                    <div className={styles.BookingLocation}>
                        24-D, 2nd floor, Rashid Plaza, Main Jinnah Avenue, Blue Area, G-6/3, Islamabad
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactUs;