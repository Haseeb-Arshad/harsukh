"use client";

import { motion } from 'framer-motion';

// export default function Template({Children }) {
//   return (
//     // <motion.div
//     //   initial={{ y:20, opacity: 0 }}
//     //   animate={{ y:0, opacity: 1 }}
//     //   exit={{ opacity: 0 }}
//     //   transition={{ ease: 'easeInOut' , duration: 0.5}}
//     // >
//     //   {Children}
//     // </motion.div>
//     <div>
//       {Children}
//     </div>
//   );
// }

export default function Template({ children }) {
  return <motion.div
        initial={{ y:20, opacity: 0 }}
        animate={{ y:0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut' , duration: 0.5}}
      >
        {children}
      </motion.div>
}