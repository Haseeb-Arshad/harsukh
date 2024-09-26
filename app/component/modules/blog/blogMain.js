import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/state/blog/blogSlice';
import styles from '@/styles/blog/blogMain.module.css';
import BlogLayout from '@/app/component/modules/blog/parts/blogCard';
import Loader from '../../ui/Loading/Loading';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogPosts, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error fetching blog posts: {error}</div>;
  }

  return (
    <div className={styles.main}>
      {blogPosts.length > 0 ? (
        <BlogLayout posts={blogPosts} />
      ) : (
        <div>No blog posts available.</div>
      )}
    </div>
  );
};

export default BlogPage;
