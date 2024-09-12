'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import '@/styles/barba.css';

const FluidTransition = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 100); // Match this with your desired animation duration
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="fluid-bg"
          className="fluid-bg"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          // exit={{ y: '100%' }}
          transition={{
            duration: 1,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        />
      )}

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FluidTransition;