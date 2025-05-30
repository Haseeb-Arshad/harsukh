import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '@/state/blog/blogSlice';
import styles from '@/styles/blog/blogMain.module.css';
import BlogLayout from '@/component/modules/blog/parts/blogCard';
import Loader from '../../ui/Loading/Loading';
import PrivacyPolicy from '../../sections/home/privacyPolicy';
import Footer from './parts/footer';
// import blogPosts from '@/app/component/data/blog/blogData.json';


const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogPosts, loading, error } = useSelector((state) => state.blogs);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error fetching blog posts: {error}</div>;
  }

  const handlePrivacyPolicyClick = () => {
    setIsPrivacyPolicyOpen(true);
  };

  return (
    <div id="swup" className={styles.main}>
      {blogPosts.length > 0 ? (
        <BlogLayout posts={blogPosts} />
      ) : (
        <div>No blog posts available.</div>
      )}

      <Footer onPrivacyPolicyClick={handlePrivacyPolicyClick}  />

      {isPrivacyPolicyOpen && (
      <div className={styles.privacyPolicyOverlay}>
        <PrivacyPolicy isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
      </div>
      )}

    </div>
  );
};

export default BlogPage;
