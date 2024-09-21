import React from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/blogCard.module.css';

const BlogCard = ({ post, isLarge }) => {
  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : ''}`}>
      <div className={styles.imageContainer}>
        <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.content}>
        {/* Updated href to follow "/blog/{post.url}" structure */}
        <a href={`/blog${post.url}`} className={styles.title}>
          <h2>{post.title}</h2>
        </a>
        <a href={`/blog${post.url}`} className={styles.readMore}>Read more</a>
      </div>
    </div>
  );
};

export default BlogCard;
