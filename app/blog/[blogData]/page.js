import { generateMetadata } from './metadata';

import React from 'react';
import BlogPostPage from '@/component/modules/blog/parts/blogPostPage';

export { generateMetadata };

const page = ({ params }) => {
 
  return (
  <>
    <BlogPostPage params={params} />
  </>
  );
};

export default page;
