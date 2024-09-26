import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/blogCard.module.css';
import Link from 'next/link';

const NewsCard = ({ post, isLarge }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add(styles.swupEnter);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard} ${styles.swupFadeIn}`}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Link href={`/news-room/${post.url}`}>
            <Image
              src={post.file}
              alt={post.title}
              fill
              className={styles.image}
            />
          </Link>
        </div>
      </div>
      <Link href={`/news-room/${post.slug}`}>

      <div className={styles.content}>
        <h2 className={styles.title}>{post.title}</h2>
        {isLarge && <p className={styles.excerpt}>{post.excerpt}</p>}
        <Link href={`/news-room/${post.slug}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
      </Link>

    </div>
  );
};

const SmallNewsCard = ({ post }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add(styles.swupEnter);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles.smallCard} ${styles.swupFadeIn}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={post.file}
          alt={post.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.SmallCardcontent}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link href={`/news-room/${post.slug}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </div>
  );
};

const NewsLayout = ({ posts }) => {
  const [largePost, ...smallPosts] = posts;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>NEWS</h1>
        <div className={styles.blogGrid}>
          <div className={styles.largePostWrapper}>
            <NewsCard post={largePost} isLarge={true} />
          </div>
          <div className={styles.smallPostsWrapper}>
            <div className={styles.smallPosts}>
              {smallPosts.map((post, index) => (
                <SmallNewsCard key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsLayout;