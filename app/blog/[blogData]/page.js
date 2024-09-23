import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from '@/styles/blog/part/blogPostPage.module.css';

// Simulating the blog data, ideally this would come from a CMS or API
const blogPosts = [
  {
    title: "Harsukh – Your Ultimate Destination",
    content: `Located in the heart of Galiyat, Harsukh residencies offers a unique living of combing luxury with comfort. Harsukh represents a blend of luxury living combined with the beauty of nature. Despite the location its accessibility with the capital city Islamabad is a 1.5 hours drive.

    This example of luxury living present on the Nathiagali road, nearby Ayubia is an escape from the daily hassles of urban life. Harsukh's closeness to nearby tourist destinations e.g Mushkpuri top, motto tunnel, Miranjani trek, Ayubia Chairlift make it more unique and a premier choice for luxury living in the Galiyat.

    Harsukh facilitates the investors by offering them different amenities and facilities. The amenities include:
    
    • Hot water Thermal pools
    • Dedicated Car Parking
    • Culinary Square
    • Gymnasium

    These amenities combine to make Harsukh an example of luxury living in the Galiyat region. Whether you are tired or restless, Harsukh is an escape into the nature with luxury amenities provided and state of the art lobbies, corridors and a luxurious reception.

    Investing here in Harsukh brings an attractive opportunity for the investors. The location, combined with the potential of development make it a promising opportunity for investment in real estate. Harsukh is promised to increase in value as the location of Harsukh will provide more than 1% ROI making it a sound investment choice for the ones who want to secure an apartment in the Harsukh Residencies.`,
    image: "https://res.cloudinary.com/dykglphpa/image/upload/v1726917679/harsukh/blog/rulfseo5gi7zdgsntjll.png",
    url: "harsukh-your-ultimate-destination"
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
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;