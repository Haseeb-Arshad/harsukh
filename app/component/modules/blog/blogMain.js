'use client';

import React, {useEffect, useState} from 'react';
import styles from '@/styles/blog/blogMain.module.css';
import BlogCard from '@/app/component/modules/blog/parts/blogCard';
import blogData from '@/app/component/data/blog/blogData.json';
import axios from 'axios';
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


  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {


        const response = await fetch('https://almaymaar.rems.pk/api/blog', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);

      
      } 
      
      catch (error) 
      {

        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);


  return (
    <BlogCard posts={blogData.blogPosts} />
    // <BlogCard posts={blogData.blogs} />
  );
};

export default BlogPage;