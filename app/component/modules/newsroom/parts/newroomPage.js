'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '@/state/newsroom/newsroomSlice';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/blog/part/blogPostPage.module.css';
import Loader from '@/app/component/ui/Loading/Loading';

const NewroomPage = ({ params }) => {
  const { blogData: slug } = params;
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { newsPosts } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchPostData = async () => {
      if (newsPosts.length > 0) {
        const foundPost = newsPosts.find((p) => p.url === `/${slug}`);
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
        console.log(postData.blog, "POST DATA");
        setPost(postData.blog);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug, newsPosts]);

  useEffect(() => {
    if (newsPosts.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, newsPosts.length]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.main}>
      <article className={styles.blogPostContainer}>
        <Image src={post.file} alt={post.title} width={600} height={400} className={styles.blogImage} />
        <h1 className={styles.blogTitle}>{post.title}</h1>
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </article>
    </div>
  );
};

export default NewroomPage;