import React from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import BlogCard from '@/app/component/modules/blog/parts/blogCard';
import blogData from '@/app/component/data/blog/blogData.json';

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
    <BlogCard posts={blogData.blogPosts} />
  );
};

export default BlogPage;