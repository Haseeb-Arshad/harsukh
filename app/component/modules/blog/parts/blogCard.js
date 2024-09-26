import React from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/blogCard.module.css';
import Link from 'next/link';

const BlogCard = ({ post, isLarge }) => {
  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src={post.file} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            className={styles.image}
          />
        </div>
      </div>
      
      <div className={styles.content}>
        <Link href={`/blog/${post.slug}`} className={styles.title}>
          <div className={styles.titleText}>{post.title}</div>
        </Link>
        {isLarge && <p className={styles.excerpt}>{post.excerpt}</p>}
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>Read more</Link>
      </div>
    </div>
  );
};



const SmallBlogCard = ({ post, isLarge }) => {
  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src={post.file} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            className={styles.image}
          />
        </div>
      </div>
      
      <div className={styles.SmallCardcontent}>
        <Link href={`/blog/${post.slug}`} className={styles.title}>
          <div className={styles.titleText}>{post.title}</div>
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className={styles.readMore}>Read more</Link>
      </div>
    </div>
  );
};

const BlogLayout = ({ posts }) => {
  const [largePost, ...smallPosts] = posts;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>BLOGS</h1>
        <div className={styles.blogGrid}>
          <div className={styles.largePostWrapper}>
            <BlogCard post={largePost} isLarge={true} />
          </div>
          <div className={styles.smallPostsWrapper}>
            <div className={styles.smallPosts}>
              {smallPosts.map((post, index) => (
                <SmallBlogCard key={index} post={post} isLarge={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;