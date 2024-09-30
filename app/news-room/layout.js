'use client'

import React from 'react'
import Navbar from '../component/modules/blog/parts/navbar'
import Image from 'next/image'

import RegisterRequestForm from '@/app/component/ui/Bars/contactBox';
import { useRegisterForm } from "@/app/component/hooks/useRegisterForm"
import styles from '@/styles/home/main.module.css';


const Layout = ({ children }) => {
  const { isFormOpen, isSuccess, openForm, closeForm, handleSuccess } = useRegisterForm();


  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        // border: '1px solid red',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        <div className={styles.contactFormOverlay}>
          <RegisterRequestForm  onSuccess= {handleSuccess} onClose={closeForm} />
        </div>
      )}
    </div>
  )
}

export default Layout