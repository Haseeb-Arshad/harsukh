'use client';

import { motion } from 'framer-motion';
import BarbaWrapper from '../component/ui/barba/barbaWrapper';
import { usePathname, useLoaderData } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    // <BarbaWrapper>
    <>
      {/* <motion.div
        className="animation-element"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      > */}
        {children}
      {/* </motion.div> */}
      </>
    // </BarbaWrapper>
  );
}