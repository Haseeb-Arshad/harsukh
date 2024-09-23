import React from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/blogCard.module.css';
import Link from 'next/link';

const NewsCard = ({ post, isLarge }) => {
  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src={post.image} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            className={styles.image}
          />
        </div>
      </div>
      
      <div className={styles.content}>
        <Link href={`/news-room${post.url}`} className={styles.title}>
          <div className={styles.titleText}>{post.title}</div>
        </Link>
        {isLarge && <p className={styles.excerpt}>{post.excerpt}</p>}
        <Link href={`/news-room${post.url}`} className={styles.readMore}>Read more</Link>
      </div>
    </div>
  );
};



const SmallNewsCard = ({ post, isLarge }) => {
  return (
    <div className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard}`}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src={post.image} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover" 
            className={styles.image}
          />
        </div>
      </div>
      
      <div className={styles.SmallCardcontent}>
        <Link href={`/news-room${post.url}`} className={styles.title}>
          <div className={styles.titleText}>{post.title}</div>
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link href={`/news-room${post.url}`} className={styles.readMore}>Read more</Link>
      </div>
    </div>
  );
};

const NewsLayout = ({ posts }) => {
  const [largePost, ...smallPosts] = posts;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>NEWS</h1>
        <div className={styles.blogGrid}>
          <div className={styles.largePostWrapper}>
            <NewsCard post={largePost} isLarge={true} />
          </div>
          <div className={styles.smallPostsWrapper}>
            <div className={styles.smallPosts}>
              {smallPosts.map((post, index) => (
                <SmallNewsCard key={index} post={post} isLarge={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLayout;