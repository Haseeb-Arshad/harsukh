
// BlogPage.js
'use client'
import React from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import BlogGrid from './parts/blogGrid';

const BlogPage = ({ posts }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>News</div>
      <BlogGrid posts={posts} />
    </div>
  );
};

export default BlogPage;