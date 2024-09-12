'use client'

import React from 'react';
import BlogPage from '@/app/component/modules/blog/blogMain';
import blogData from '@/app/component/data/blog/blogData.json';
import styles from '@/styles/blog/blogMain.module.css'

const Page = () => {
  return (
    <>
    <div className={styles.main}>
      <BlogPage posts={blogData.posts} />

    </div>
    </>
  );
};

export default Page;