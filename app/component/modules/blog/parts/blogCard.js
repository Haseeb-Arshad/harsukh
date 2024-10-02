import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/blog/blogCard.module.css';
import Link from 'next/link';

const BlogCard = ({ post, isLarge }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add(styles.swupEnter);
        }
      },
      { rootMargin: "0px 0px -20px 0px", threshold: 0.1 }
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
    <Link
    href={`/blog/${post.slug}`}
    ref={cardRef}
    className={`${styles.card} ${isLarge ? styles.largeCard : styles.smallCard} ${styles.swupFadeIn}`}
  >
    <div className={styles.largeimageWrapper}>
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
      <div className={styles.title}>
        <div style={{ fontSize: '1.5rem' }} className={styles.LargetitleText}>{post.title}</div>
      </div>
      {isLarge && <p className={styles.excerpt}>{post.excerpt}</p>}
      <div className={styles.readMore}>
        Read more
      </div>
    </div>
  </Link>
  );
};

const SmallBlogCard = ({ post }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add(styles.swupEnter);
        }
      },
      { rootMargin: "0px 0px -20px 0px", threshold: 0.1 }
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
    
    <Link
      href={`/blog/${post.slug}`} 
      ref={cardRef}
      className={`${styles.card} ${styles.smallCard} ${styles.swupFadeIn}`}
    >
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
        <div href={`/blog/${post.slug}`} className={styles.title}>
          <div className={styles.titleText}>{post.title}</div>
        </div>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div href={`/blog/${post.slug}`} className={styles.readMore}>
          Read more
        </div>
      </div>
    </Link>
  );
};


const SmallAdditionalBlogCard = ({ post }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current.classList.add(styles.swupEnter);
        }
      },
      { rootMargin: "0px 0px -20px 0px", threshold: 0.1 }
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
      href={`/blog/${post.slug}`} 
      ref={cardRef}
      className={`${styles.card} ${styles.smallAdditionalCard} ${styles.swupFadeIn}`}
    >
      <div className={styles.additionalImageWrapper}>
        <div className={styles.additionalImageContainer}>
          <Image
            src={post.file}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.additionalCardContent}>
        <div href={`/blog/${post.slug}`} className={styles.title}>
          <div className={styles.additionalTitleText}>{post.title}</div>
        </div>
        <p className={styles.additionalExcerpt}>{post.excerpt}</p>
        <div href={`/blog/${post.slug}`} className={styles.readMore}>
          Read more
        </div>
      </div>
    </div>
  );
};


const BlogLayout = ({ posts }) => {
  const [largePost, ...smallPosts] = posts;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 950);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile); // Clean up resize listener
    };
  }, []);


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>BLOGS</h1>
        <div className={styles.blogGrid}>
          <div className={styles.largePostWrapper}>
            <BlogCard post={largePost} isLarge={true} />
          </div>
          <div className={styles.smallPostsWrapper}>
            { !isMobile ?
            (
            <div className={styles.smallPosts}>
              {smallPosts.slice(0, 3).map((post, index) => (
                <SmallBlogCard key={index} post={post} />
              ))}
            </div>)
            :
            (
            <div className={styles.smallPosts}>
              {smallPosts.map((post, index) => 
                (                 
                <SmallBlogCard key={index} post={post} />               
                ))
              }  
            </div>
            )
            }
          </div>
        </div>
        {smallPosts.length > 3 && !isMobile && (
          <div className={styles.additionalPosts}>
            {smallPosts.slice(3).map((post, index) => (
              <SmallAdditionalBlogCard key={index + 3} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogLayout;

