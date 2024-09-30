import { notFound } from 'next/navigation';

export const revalidate = 0; // Add this line to disable caching

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
      next: { revalidate: 0 } // Force revalidation on every request
    });

    if (!detailResponse.ok) {
      throw new Error(`Failed to fetch blog post: ${detailResponse.status} ${detailResponse.statusText}`);
    }

    const contentType = detailResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const postData = await detailResponse.json();
    // console.log("Fetched post data:", postData);
    const blogData = postData.blog;

    if (!blogData || !blogData.title) {
      return {
        title: 'Blog Post',
        description: 'A blog post.',
      };
    }
    

    return {
      title: blogData.title,
      description: blogData.description,
      openGraph: {
        images: [blogData.file],
        title: blogData.title,
        description: blogData.description,
      },
    };

  } catch (error) {
    console.error('Error in generateMetadata:', error);
    notFound(); // This will trigger the not-found page
  }
}