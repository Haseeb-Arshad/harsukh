

import React from 'react'
import ExplorePage from '@/app/component/modules/explore/explorePage'



export const metadata = {
  title: 'Explore Harsukh Residences Galyat',
  description: 'Explore Harsukh Residences floor by floor with our interactive 3D building explorer. View apartment layouts, floor plans, and panoramic views from each level of our luxury residential complex in Galyat.',
  openGraph: {
    title: 'Explore Harsukh Residences Galyat',
    description: 'Take an interactive tour of Harsukh Residences. Explore floor plans, views, and apartment layouts in our luxury mountain retreat.',
    url: 'https://theharsukh.com/explore',
    images: [
      {
        url: 'https://cdn.theharsukh.com/images/background/front-view-winter.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Front View in Winter'
      },
      {
        url: 'https://cdn.theharsukh.com/images/background/front-view-summer.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Front View in Summer'
      },
      {
        url: 'https://cdn.theharsukh.com/images/background/back-view.webp',
        width: 1200,
        height: 630,
        alt: 'Harsukh Residences Back View'
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
