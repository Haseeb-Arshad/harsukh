import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/blog/part/blogPostPage.module.css';
import blogData from '@/app/component/data/blog/blogData.json';

const getPostByUrl = (slug) => {

  const slugArray = '/' + slug;
  // console.log("SLUG ARRAY", slugArray)

  return blogData.blogPosts.find(post => post.url === slugArray);
};


const renderContent = (content) => {
  return content.split('\n\n').map((block, index) => {
    if (block.startsWith('•')) {
      // Render bullet points
      const items = block.split('\n');
      return (
        <ul key={index} className={styles.bulletList}>
          {items.map((item, i) => (
            <li key={i}>{item.replace('•', '').trim()}</li>
          ))}
        </ul>
      );
    } else if (block.startsWith('###')) {
      // Render subheadings
      return <h3 key={index} className={styles.subheading}>{block.replace('###', '').trim()}</h3>;
    } else if (block.startsWith('>')) {
      // Render blockquotes
      return <blockquote key={index} className={styles.blockquote}>{block.replace('>', '').trim()}</blockquote>;
    } else {
      // Render regular paragraphs
      return <p key={index} className={styles.paragraph}>{block}</p>;
    }
  });
};

const BlogPostPage = ({ params }) => {
  const { blogData: slug } = params;
  const post = getPostByUrl(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.main}>
      <article className={styles.blogPostContainer}>
        <Image src={post.image} alt={post.title} width={600} height={400} className={styles.blogImage} />
        <h1 className={styles.blogTitle}>{post.title}</h1>
        <div className={styles.blogContent}>
          {renderContent(post.content)}
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;