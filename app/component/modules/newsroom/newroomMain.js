import React from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import NewsRoom from '@/app/component/modules/newsroom/parts/newsroomCard';
import blogData from '@/app/component/data/newsroom/newsroomData.json';

const BlogPage = () => {
  return (
    <NewsRoom posts={blogData.newsPosts} />
  );
};

export default BlogPage;