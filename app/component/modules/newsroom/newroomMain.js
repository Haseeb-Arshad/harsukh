import React from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import NewsRoom from '@/app/component/modules/newsroom/parts/newsroomCard';
import blogData from '@/app/component/data/newsroom/newsroomData.json';

// const BlogPage = () => {
//   return (
//     <div className={styles.main}>
//       <div className={styles.container}>
//         <h1 className={styles.pageTitle}>BLOGS</h1>
//         <div className={styles.blogGrid}>
//           {blogData.blogPosts.map((post, index) => (
//             <BlogCard key={index} post={post} isLarge={index === 0} />
//           ))}
//         </div>
//       </div>
//     </div>

//   );
// };

// export default BlogPage;

const BlogPage = () => {
  return (
    <NewsRoom posts={blogData.blogPosts} />
  );
};

export default BlogPage;