import React from 'react'
import styles from '@/styles/home/developer.module.css';
import Image from 'next/image';


const Developer2 = () => {
    
  return (
    <div className={styles.DeveloperPartcontainer}>
       <div className={styles.content}>
            <h2 className={styles.title}>Architect</h2>
            <Image className={styles.logo} src="/images/icons/Logo/6figures.png" alt="Harsukh Residencies" width={160} height={65} />
            <div className={styles.description}>
                <p className={styles.desc}>
                    6 Figures Architectural Firm is renowned for their ability to craft spaces that tell a story. With a perfect balance of functionality and artistic expression, their designs are innovative, sustainable, and timeless. Their portfolio includes iconic projects, such as luxury high-rises and peaceful retreats, each reflecting their commitment to excellence. Every structure they create is a testament to their philosophy of blending architecture with the human spirit
                </p>
            </div>
        </div>
    </div>
  )
}

export default Developer2
