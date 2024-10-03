// 'use client'

import React from 'react';
// import BlogPage from '@/app/component/modules/blog/blogMain';
import blogData from '@/app/component/data/newsroom/newsroomData.json';
import styles from '@/styles/blog/blogMain.module.css'
import NewsroomPage from '@/app/component/modules/newsroom/newroomMain';

const Page = () => {
  return (
    <>
    <div className={styles.main}>
      <NewsroomPage posts={blogData.posts} />
    </div>
    </>
  );
};

export default Page;