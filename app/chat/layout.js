
'use client'
import React from 'react'
// import Navbar from '../../component/modules/blog/parts/navbar'
import Image from 'next/image'
import { useEffect } from 'react';
import Swup from 'swup';
import SwupFadeTheme from '@swup/fade-theme';
// import { useRegisterForm } from "@/hooks/useRegisterForm"
import styles from '@/styles/home/main.module.css';
// import RegisterRequestForm from '@/component/ui/Bars/contactBox';
import Head from 'next/head';
import { useRegisterForm } from '../component/hooks/useRegisterForm';
import RegisterRequestForm from '../component/ui/Bars/contactBox';
import Navbar from '../component/modules/blog/parts/navbar';


const Layout = ({ children }) => {
  const { isFormOpen, isSuccess, openForm, closeForm, handleSuccess } = useRegisterForm();

  useEffect(() => {
    // Initialize GTM
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GTM-MJDJH587');

    // Track clicks
    const clickHandler = (event) => {
      if (event.target.dataset.gtmClick) {
        gtag('event', event.target.dataset.gtmClick, {
          eventCategory: 'click',
          eventAction: 'submit',
          eventLabel: 'submit-button',
        });
      }
    };
    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  useEffect(() => {
    const swup = new Swup({
      plugins: [new SwupFadeTheme()],
    });

    return () => {
      swup.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>

      <Head>
        {/* existing meta tags */}

        {/* Preload Critical Background Image */}
        <link
          rel="preload"
          href="https://cdn.theharsukh.com/images/blog/imageMask-bg.png"
          as="image"
          type="image/png"
          crossOrigin="anonymous"
        />
      </Head>


      <div style={{
        position: 'fixed',
        left: 0,
        top: '-25px',
        width: '30%', // Adjust this value to control how much of the left side is covered
        height: '100%',
        zIndex: 0 // Ensures the image stays behind other content
      }}>
        <Image
          src="https://cdn.theharsukh.com/images/blog/imageMask-bg.png"
          alt="imageMask-bg"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
        <Navbar
          successContactForm={isSuccess}
          handleSuccess={handleSuccess}
          toggleContactForm={openForm}
        />

      <main style={{paddng: '5rem', minHeight: '100vh'}}>{children}</main>

      {(isFormOpen || isSuccess) && (
        <div 
          data-gtm-click="submit-button"
          id="submit-button-id"
          className={`submit-button-id ${styles.contactFormOverlay}`}
        >
          <RegisterRequestForm  onSuccess= {handleSuccess} onClose={closeForm} />
        </div>
      )}


    </div>
  )
}

export default Layout