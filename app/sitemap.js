export default function sitemap() {
    const today = new Date();
  
    return [
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app', // Home route
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 1, // Home pages are critical
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/about',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8, // "About" pages are important, but rarely updated
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/blog',
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7, // Blog content usually gets updated frequently
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/callus',
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/news-room',
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7, 
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/map-view',
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/explore',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8, // A "Contact/Call Us" page, so not frequently updated
      },
      {
        url: 'https://harsukh-123-git-master-haseebarshads-projects.vercel.app/developer',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.3, // A "Contact/Call Us" page, so not frequently updated
      },


    ]};

