
'use client'

import React, { useEffect, useState  } from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import NewsRoom from '@/component/modules/newsroom/parts/newsroomCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '@/state/newsroom/newsroomSlice';
import Loader from '@/component/ui/Loading/Loading'
import Footer from '@/component/modules/blog/parts/footer';
import PrivacyPolicy from '../../sections/home/privacyPolicy';

const NewsroomMain = () => {

  const dispatch = useDispatch();
  const { newsPosts, loading, error } = useSelector((state) => state.news);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchNews());
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
    <>
      <div id="swup" className={styles.main}>
        {newsPosts.length > 0 ? (
          <NewsRoom posts={newsPosts} />
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
    </>
  
  );
};

export default NewsroomMain;
