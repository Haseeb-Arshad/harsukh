import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/blog/part/blogPostPage.module.css';
import newsData from '@/app/component/data/newsroom/newsroomData.json';

// Simulating the blog data, ideally this would come from a CMS or API
const blogPosts = [
   {
          title: "Galiyat Welcomes Luxury Living",
          excerpt: "Almaymaar announces high-rise luxury apartments in Galiyat, promising to redefine modern living with unique architecture and top-notch amenities.",
          content: "Galiyat, the region which is known for its beautiful landscapes and tourism, is on the verge of the launch of new project that promises to elevate the area's surroundings. Almaymaar has announced a high-rise luxury apartments that are set to redefine modern and Luxury living in this stunning region. \n\nWhile details are still under wraps, there is a blend of a unique architecture designs that will harmonize with Galiyat's natural beauty. Residents can expect top-notch amenities, panoramic views of the majestic Himalayas, and a lifestyle that seamlessly combines comfort with luxury and elegance. This development will not only provide luxurious housing options but will also boost the local economy through new job opportunities and increased tourism.",
          image: "https://res.cloudinary.com/dykglphpa/image/upload/v1726917647/harsukh/blog/burchnb5gu4egolrtrfa.png",
          url: "galiyat-welcomes-luxury-living"
        }
];

// Function to find a post by URL slug
const getPostByUrl = (slug) => {
  // console.log("SLUG", slug)
  const slugArray = '/' + slug;

  return newsData.newsPosts.find(post => post.url === slugArray);
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