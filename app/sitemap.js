export default function sitemap() {
    const today = new Date();
  
    return [
      {
        url: 'https://theharsukh.com', // Home route
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 1, // Home pages are critical
      },
      {
        url: 'https://theharsukh.com/about',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8, // "About" pages are important, but rarely updated
      },
      {
        url: 'https://theharsukh.com/blog',
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7, // Blog content usually gets updated frequently
      },
      {
        url: 'https://theharsukh.com/callus',
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://theharsukh.com/news-room',
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7, 
      },
      {
        url: 'https://theharsukh.com/map-view',
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://theharsukh.com/explore',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://theharsukh.com/developer',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },


    ]};

