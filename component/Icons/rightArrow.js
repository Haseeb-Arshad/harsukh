import React from 'react';
import styles from '@/styles/ImageBackground.module.css';

const MenuIcon = () => (
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7L15 12L10 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

const RightArrow = ({ nextBtn }) => (
    <>
    <div  className={`${styles.menuArrowButton}`}>
      <MenuIcon />
    </div>
    </>
);

export default RightArrow;