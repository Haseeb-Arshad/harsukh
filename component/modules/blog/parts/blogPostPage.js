'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '@/state/blog/blogSlice';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/blog/part/blogPostPage.module.css';
import Loader from '@/component/ui/Loading/Loading';
import { FaArrowLeft, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';

const BlogPostPage = ({ params }) => {
  const { blogData: slug } = params;
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { blogPosts } = useSelector((state) => state.blogs);

  useEffect(() => {
    const fetchPostData = async () => {
      if (blogPosts.length > 0) {
        const foundPost = blogPosts.find((p) => p.slug === slug || p.url === `/${slug}`);
        if (foundPost) {
          setPost(foundPost);
          setLoading(false);
          return;
        }
      }

      try {
        const detailResponse = await fetch(`https://almaymaar.rems.pk/api/blog/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
          },
        });

        if (!detailResponse.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const postData = await detailResponse.json();
        setPost(postData.blog);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug, blogPosts]);

  useEffect(() => {
    if (blogPosts.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogPosts.length]);

  const calculateReadTime = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!post) return notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className={styles.main}>
      <div className={styles.topNavigation}>
        <Link href="/blog" className={styles.backLink}>
          <FaArrowLeft /> Back to Journal
        </Link>
      </div>

      <article className={styles.blogPostContainer}>
        <header className={styles.blogHeader}>
          <h1 className={styles.blogTitle}>{post.title}</h1>

          <div className={styles.blogMeta}>
            <span className={styles.metaItem}>
              <FaRegCalendarAlt /> {post.date || 'February 2, 2026'}
            </span>
            <span className={styles.metaItem}>
              <FaRegClock /> {calculateReadTime(post.description)} min read
            </span>
            {post.author && (
              <span className={styles.metaItem}>
                By {post.author}
              </span>
            )}
            <span className={styles.categoryBadge}>
              {post.category || post.type?.toUpperCase() || 'LIFESTYLE'}
            </span>
          </div>
        </header>

        <div className={styles.imageWrapper}>
          <Image
            src={post.file}
            alt={post.title}
            width={1200}
            height={600}
            className={styles.blogImage}
            priority
          />
        </div>

        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

        <footer className={styles.blogFooter}>
          <div className={styles.shareSection}>
            <h3>Share this story</h3>
            <div className={styles.shareButtons}>
              {/* Share icons could go here */}
            </div>
          </div>
        </footer >
      </article>

      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Continue Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((related) => (
              <Link href={`/blog/${related.slug}`} key={related.id} className={styles.relatedCard}>
                <div className={styles.relatedImageWrapper}>
                  <img src={related.file} alt={related.title} />
                </div>
                <h3>{related.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
