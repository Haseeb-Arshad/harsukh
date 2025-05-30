'use client'

import React from 'react';
import BlogPage from '@/component/modules/blog/blogMain';
import blogData from '@/component/data/blog/blogData.json';
import styles from '@/styles/blog/blogMain.module.css'

const Page = () => {
  return (
    <>
    <div id="swup" className={styles.main}>
      <BlogPage posts={blogData.posts} />
    </div>
    </>
  );
};

export default Page;