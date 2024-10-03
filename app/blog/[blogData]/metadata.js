import { notFound } from 'next/navigation';

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

    // Comprehensive meta tags for SEO and social platforms
    return {
      title: blogData.title,
      description: blogData.description,
      openGraph: {
        title: blogData.title,
        description: blogData.description,
        type: 'article',
        url: `https://theharsukh.com/blog/${slug}`,
        images: [blogData.file], // Ensure this is a full URL to the image
      },
      twitter: {
        card: 'summary_large_image',
        title: blogData.title,
        description: blogData.description,
        images: [blogData.file],
      },
      robots: 'index, follow', // SEO: Allow search engines to index and follow the page
      'og:type': 'article', // OpenGraph type as article for blog posts
      'og:site_name': 'Harsukh', // Your site name
      'og:locale': 'en_US', // Locale to target specific language audience
      'og:image:alt': blogData.title, // Alt text for image
      'twitter:image:alt': blogData.title, // Alt text for Twitter image
      'og:url': `https://theharsukh.com/blog/${slug}`, // Canonical URL of the post
      'canonical': `https://theharsukh.com/blog/${slug}`, // Canonical URL for SEO
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    notFound(); // Trigger the 404 page
  }
}
