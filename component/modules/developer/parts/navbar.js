'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('About');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'Home') {
      router.push('/');

    } else if (menuItem === 'Blogs') {
      router.push('/blog');
    }
    // Add more conditions for other menu items as needed
  };
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setVisible(false);
      } else { // if scroll up show the navbar
        setVisible(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <nav className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        <Image style={{cursor:"pointer"}} src="https://cdn.theharsukh.com/images/blog/harsukhLogo.svg" alt="menu" width={200} height={115} />
        <ul className={styles.menu}>
          {['Home', 'Developer', 'Blogs', 'News Room'].map((item) => (
            <li
              key={item}
              className={activeMenuItem === item ? styles.activeMenuItem : ''}
              onClick={() => handleMenuItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        
        <Link href="#">
            <button className={styles.exploreBtn}>
                Get in Touch
            </button>
        </Link>

          
      </nav>
      {children}
    </>
  );
};

export default Navbar;