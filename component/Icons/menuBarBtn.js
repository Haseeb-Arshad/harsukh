import React from 'react';
import styles from '@/styles/ImageBackground.module.css';

const MenuIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="style=stroke">
      <g id="menu-fries">
        <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6Z" fill="currentColor"/>
        <path id="vector (Stroke)_2" fillRule="evenodd" clipRule="evenodd" d="M8.25 12C8.25 11.5858 8.58579 11.25 9 11.25L21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75L9 12.75C8.58579 12.75 8.25 12.4142 8.25 12Z" fill="currentColor"/>
        <path id="vector (Stroke)_3" fillRule="evenodd" clipRule="evenodd" d="M2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H21C21.4142 17.25 21.75 17.5858 21.75 18C21.75 18.4142 21.4142 18.75 21 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z" fill="currentColor"/>
      </g>
    </g>
  </svg>
);

const MenubarButton = ({ handleMenu, inActive }) => (
    <div className={`${styles.menuButton} ${inActive ? styles.active : ''}`} onClick={handleMenu}>
      <MenuIcon />
    </div>
);

export default MenubarButton;