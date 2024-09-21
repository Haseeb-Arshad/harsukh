import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/blog/part/blogPostPage.module.css';

// Simulating the blog data, ideally this would come from a CMS or API
const blogPosts = [
  {
    title: "Almaymaar Unveils Luxury Living with High-Rise Apartments in Galiyat’s Scenic Landscape",
    content: "Galiyat Welcomes Luxury Living Galiyat, the region which is known for its beautiful landscapes and tourism, is on the verge of the launch of new project that promises to elevate the area’s surroundings. Almaymaar has announced a high-rise luxury apartments that are set to redefine modern and Luxury living in this stunning region. While details are still under wraps, there is a blend of a unique architecture designs that will harmonize with Galiyat's natural beauty. Residents can expect top-notch amenities, panoramic views of the majestic Himalayas, and a lifestyle that seamlessly combines comfort with luxury and elegance. This development will not only provide luxurious housing options but will also boost the local economy through new job opportunities and increased tourism.",
    image: "https://res.cloudinary.com/dykglphpa/image/upload/v1726917679/harsukh/blog/rulfseo5gi7zdgsntjll.png",
    url: "almaymaar-unveils-luxury-living-high-rise-apartments-galiyats-scenic-landscape"
  },
];

// Function to find a post by URL slug
const getPostByUrl = (slug) => {
  return blogPosts.find(post => post.url === slug);
};

// Dynamic Blog Page Component
const BlogPostPage = ({ params }) => {
  const { blogData } = params;
  const post = getPostByUrl(blogData);

  // If the post isn't found, return a 404 page
  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.main}>

        <div className={styles.blogPostContainer}>
        <Image src={post.image} alt={post.title} width={600} height={400} className={styles.blogImage} />
        <div className={styles.blogTitle}>{post.title}</div>

        <div className={styles.blogContent}>
            <p>{post.content}</p>
        </div>
        </div>
    </div>

  );
};

export default BlogPostPage;