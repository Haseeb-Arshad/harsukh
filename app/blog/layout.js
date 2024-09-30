
'use client'
import React from 'react'
import Navbar from '../component/modules/blog/parts/navbar'
import Image from 'next/image'
import { useEffect } from 'react';
import Swup from 'swup';
import SwupFadeTheme from '@swup/fade-theme';

const Layout = ({ children }) => {


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
      <Navbar/>
      <main style={{paddng: '5rem', minHeight: '100vh'}}>{children}</main>

      {/* </Navbar> */}
    </div>
  )
}

export default Layout