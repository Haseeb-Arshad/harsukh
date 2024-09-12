import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/home/navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';

const Navbar = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('About');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    setIsMobileMenuOpen(false);
    if (menuItem === 'About') {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (menuItem === 'Blogs') {
      router.push('/blog');
    }
    // Add more conditions for other menu items as needed
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.nav} ${visible ? styles.visible : styles.hidden}`}>
        <Image style={{cursor:"pointer"}} src="/Webpage/floors/HarsukhLogo.webp" alt="menu" width={180} height={105} />
        <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          <Menu size={24} />
        </div>
        <ul className={`${styles.menu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {['About', 'Developer', 'Blogs', 'News Room'].map((item) => (
            <li

              key={item}
              className={` ${styles.menuitems} ${activeMenuItem === item ? styles.activeMenuItem : ''}`}
              onClick={() => handleMenuItemClick(item)}
            >
              {item}
            </li>
          ))}
          <li className={styles.mobileExploreBtn}>
            <Link href="/explore">
              <button className={styles.exploreBtn}>
                Explore Building
              </button>
            </Link>
          </li>
        </ul>
        
        <Link href="/explore" className={styles.desktopExploreBtn}>
          <button className={styles.exploreBtn}>
            Explore Building
          </button>
        </Link>
      </nav>
      
      <div className={styles.main}>
        {children}
      </div>
    </>
  );
};

export default Navbar;