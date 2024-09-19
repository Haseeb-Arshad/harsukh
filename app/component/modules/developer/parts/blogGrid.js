'use client'

import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from './blogCard';
import styles from '@/styles/blog/blogGrid.module.css';

const BlogGrid = ({ posts }) => {
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
            <BlogCard {...post} />
          </motion.div>
        ))}
      </div>
    );
  };

  export default BlogGrid;