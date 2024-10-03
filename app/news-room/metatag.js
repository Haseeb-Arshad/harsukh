import { notFound } from 'next/navigation';
import { JSDOM } from 'jsdom'; // To parse the HTML content

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { blogData: slug } = params;
  try {
    const detailResponse = await fetch(`https://almaymaar.rems.pk/api/blog/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
      },
      next: { revalidate: 0 }
    });

    if (!detailResponse.ok) {
      throw new Error(`Failed to fetch blog post: ${detailResponse.status} ${detailResponse.statusText}`);
    }

    const contentType = detailResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const postData = await detailResponse.json();
    const blogData = postData.blog;

    if (!blogData || !blogData.title) {
      return {
        title: 'Blog Post',
        description: 'A blog post.',
      };
    }

    // Parse the HTML description to extract plain text
    const dom = new JSDOM(blogData.description);
    const plainText = dom.window.document.body.textContent || "";

    // Split the plain text into sentences and get the first two
    const sentences = plainText.split(/(?<=\.)\s+/); // Split by periods followed by space
    const metaDescription = sentences.slice(0, 2).join(' '); // Join the first two sentences

    // Add custom image description (e.g., based on title or content)
    const imageDescription = `${blogData.title} - A glimpse of luxury living in Galiyat, Pakistan.`;

    return {
      title: blogData.title,
      description: metaDescription,
      openGraph: {
        title: blogData.title,
        description: metaDescription,
        type: 'article',
        url: `https://theharsukh.com/news-room/${slug}`,
        images: [{
          url: blogData.file, // Ensure this is a full URL to the image
          alt: imageDescription, // Custom description for the image
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: blogData.title,
        description: metaDescription,
        images: [{
          url: blogData.file, // Twitter image
          alt: imageDescription, // Custom alt for the image
        }],
      },
      robots: 'index, follow', // SEO
      'og:type': 'article',
      'og:site_name': 'Almaymaar',
      'og:locale': 'en_US',
      'og:image:alt': imageDescription,
      'twitter:image:alt': imageDescription,
      'og:url': `https://theharsukh.com/news-room/${slug}`,
      'canonical': `https://theharsukh.com/news-room/${slug}`,
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    notFound(); // Trigger the 404 page
  }
}
