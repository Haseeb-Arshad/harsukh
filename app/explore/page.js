

import React from 'react'
import ExplorePage from '@/component/modules/explore/explorePage'



export const metadata = {
  title: 'Explore Ayubia & Galiyat | Top Tourist Spots Near Harsukh',
  description: 'Discover top attractions near Harsukh. Visit Ayubia Chairlift, Pipeline Track, and Nathia Gali just minutes from your apartment.',
  openGraph: {
    title: 'Explore Ayubia & Galiyat | Top Tourist Spots Near Harsukh',
    description: 'Discover top attractions near Harsukh. Visit Ayubia Chairlift, Pipeline Track, and Nathia Gali just minutes from your apartment.',
    url: 'https://theharsukh.com/explore',
    images: [
      {
        url: 'https://cdn.theharsukh.com/images/background/front-view-winter.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Front View in Winter'
      },
      {
        url: 'https://cdn.theharsukh.com/images/background/back-view.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Back View'
      }, {
        url: 'https://cdn.theharsukh.com/images/background/front-view-summer.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Front View in Summer'
      }
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://theharsukh.com/explore'
  }
};

const page = () => {
  return (
    <>
      <ExplorePage />
    </>
  )
}

export default page
