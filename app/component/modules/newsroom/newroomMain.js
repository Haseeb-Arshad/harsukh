
'use client'

import React, { useEffect } from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import NewsRoom from '@/app/component/modules/newsroom/parts/newsroomCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '@/state/newsroom/newsroomSlice';
import Loader from '@/app/component/ui/Loading/Loading'

const NewsroomMain = () => {

  const dispatch = useDispatch();
  const { newsPosts, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error fetching blog posts: {error}</div>;
  }


  return (
    <>
      <div className={styles.main}>
        {newsPosts.length > 0 ? (
          <NewsRoom posts={newsPosts} />
        ) : (
          <div>No blog posts available.</div>
        )}
      </div>
    </>
  
  );
};

export default NewsroomMain;


// const Page = () => {

//   const dispatch = useDispatch();
//   const { blogPosts, loading, error } = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(fetchBlogs());
//   }, [dispatch]);

//   if (loading) {
//     return <div><Loader/></div>;
//   }

//   if (error) {
//     return <div>Error fetching blog posts: {error}</div>;
//   }

//   return (
//     <>
//     <div className={styles.main}>
//       {blogPosts.length > 0 ? (
//         <BlogLayout posts={blogPosts} />
//       ) : (
//         <div>No blog posts available.</div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Page;



