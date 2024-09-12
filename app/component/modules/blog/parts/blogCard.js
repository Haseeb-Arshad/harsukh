'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/blog/blogCard.module.css';

const BlogCard = ({ title, date, excerpt, image, author }) => (
  <motion.div
    className={styles.card}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
    ease={[0.49, 0.23, 0, 1]}
  >
    <div className={styles.imageContainer}>
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className={styles.content}>
      <div className={styles.dateContainer}>
        <div className={styles.dateIcon}>
            <Image src="/images/icons/blog/calendarIcon.svg" alt="harsukhLogo" width={15} height={15} />
        </div>
        <div className={styles.date}>
            {date}
        </div>
      </div>

    <div className={styles.title}>{title}</div>

      {/* <p className={styles.date}>{date}</p> */}
      <p className={styles.excerpt}>{excerpt}</p>
      <motion.a
        href="#"
        className={styles.readMore}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        Continue reading
      </motion.a>

      <div className={styles.authorContainer}>
        <div className={styles.authorImage}>
            <Image src="/images/icons/blog/user-profile.svg" alt="harsukhLogo" width={15} height={15} />
        </div>
        <div className={styles.author}> 
            {author}
        </div>
      </div>
      
    </div>
  </motion.div>
);

export default BlogCard;