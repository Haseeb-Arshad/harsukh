import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNavbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleMenu = () => {
    // Add menu handling logic here
  };

  return (
    <>
      <motion.div
        className="bottom-navbar"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <NavbarItem icon="/images/icons/filterIcon.svg" label="Filter" onClick={handleFilter} />
        <NavbarItem icon="/images/icons/floorIcon.svg" label="Seasons" />
        <NavbarItem icon="/images/icons/menuIcon.svg" label="Menu" onClick={handleMenu} />
      </motion.div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="filter-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h2>Filter Options</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .bottom-navbar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #006d77;
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 50;
        }

        .filter-panel {
          position: fixed;
          bottom: 80px;
          left: 0;
          right: 0;
          background-color: white;
          height: 60vh;
          z-index: 40;
        }

        .filter-panel h2 {
          text-align: center;
          padding: 16px;
        }
      `}</style>
    </>
  );
};

const NavbarItem = ({ icon, label, onClick }) => (
  <motion.div
    className="navbar-item"
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Image src={icon} alt={label} width={24} height={24} className="navbar-icon" />
    <span>{label}</span>

    <style jsx>{`
      .navbar-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-size: 0.8rem;
        cursor: pointer;
      }

      .navbar-icon {
        margin-bottom: 4px;
      }
    `}</style>
  </motion.div>
);

export default BottomNavbar;