import React from 'react';
import BlogPageClient from '@/component/modules/blog/BlogPageClient';

export const metadata = {
  title: 'Real Estate Insights & Investment Tips | The Harsukh Blog',
  description: 'Read expert guides on Galiyat real estate. Get investment tips, construction updates, and tourism news for Ayubia and Nathia Gali.',
  alternates: {
    canonical: 'https://theharsukh.com/blog',
  },
  openGraph: {
    title: 'Real Estate Insights & Investment Tips | The Harsukh Blog',
    description: 'Read expert guides on Galiyat real estate. Get investment tips, construction updates, and tourism news for Ayubia and Nathia Gali.',
    url: 'https://theharsukh.com/blog',
    type: 'website',
  },
};

const Page = () => {
  return <BlogPageClient />;
};

export default Page;
