
// BlogPage.js
'use client'
import React from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import NewsroomGrid from './parts/newsroomGrid';

const NewsroomPage = ({ posts }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>News</div>
      <NewsroomGrid posts={posts} />
    </div>
  );
};

export default NewsroomPage;