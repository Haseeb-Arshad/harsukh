
import TotalFloor from '@/app/component/data/TotalFloorData';

export default function sitemap() {
    const today = new Date();
  
    const staticRoutes =  [
      {
        url: 'https://theharsukh.com', // Home route
        lastModified: today,
        changeFrequency: 'yearly',
        priority: 1, 
      },
      {
        url: 'https://theharsukh.com/about',
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8, 
      },
      {
        url: 'https://theharsukh.com/blog',
        lastModified: today,
        changeFrequency: 'daily',
        priority: 0.7,
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
    ]


    const dynamicRoutes = TotalFloor.flatMap((floor) => {
        // Generate URLs for each floor
        const floorUrl = {
          url: `https://theharsukh.com/${floor.id}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        };
    
        // Generate URLs for apartments within each floor
        const apartmentUrls = Array.from({ length: 146 }, (_, i) => ({
          url: `https://theharsukh.com/${floor.id}/Apartment${i + 1}`, // Dynamic apartment URL for each floor
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
    
        // Combine the floor URL and its respective apartment URLs
        return [floorUrl, ...apartmentUrls];
      });
    

      return [
        ...staticRoutes,
        ...dynamicRoutes,
      ];
};

