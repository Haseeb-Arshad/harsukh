'use client'

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/newsroom/newsroomGrid.module.css';
import NewsroomCard from './newsroomCard';

const NewsroomGrid = ({ posts }) => {
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return <p>No posts available.</p>;
    }
  
    return (
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <motion.div
            key={post.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NewsroomCard {...post} />
          </motion.div>
        ))}
      </div>
    );
  };

  export default NewsroomGrid;