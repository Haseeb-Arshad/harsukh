import { apartmentData } from '@/app/component/data/apartmentData';

const floorNameMapping = {
  'third-floor': "3rd Floor",
  'second-floor': "2nd Floor",
  'first-floor': "1st Floor",
  'ground-floor': "Ground Floor",
  'valley-floor-1': "Basement 1",
  'valley-floor-3': "Basement 3",
  'valley-floor-4': "Basement 4",
  'valley-floor-5': "Basement 5",
  'valley-floor-6': "Basement 6"
};

const reverseFloorNameMapping = Object.fromEntries(
  Object.entries(floorNameMapping).map(([key, value]) => [value, key])
);

export default function sitemap() {
  const today = new Date();
  
  const staticRoutes = [
    {
      url: 'https://theharsukh.com',
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
      priority: 0.3,
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
      priority: 0.3,
    },
    {
      url: 'https://theharsukh.com/explore',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://theharsukh.com/developer',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  let dynamicRoutes = [];
  try {
    dynamicRoutes = Object.entries(apartmentData).flatMap(([floorName, apartments]) => {
      const floorId = reverseFloorNameMapping[floorName];
      if (!floorId) {
        console.warn(`No mapping found for floor: ${floorName}`);
        return [];
      }

      const floorUrl = {
        url: `https://theharsukh.com/${floorId}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
      };

      const apartmentUrls = apartments.map((apartment) => ({
        url: `https://theharsukh.com/${floorId}/Apartment${apartment.Apartmentno}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.6,
      }));

      return [floorUrl, ...apartmentUrls];
    });
  } catch (error) {
    console.error('Error generating dynamic routes:', error);
  }

  // Combine static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}