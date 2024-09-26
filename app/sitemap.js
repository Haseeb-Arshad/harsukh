import { apartmentData } from '@/app/component/data/floorData'

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
      // ... other static routes
    ];
  
    let dynamicRoutes = [];
    
    if (typeof apartmentData === 'object' && apartmentData !== null) {
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
  
          if (!Array.isArray(apartments)) {
            console.warn(`Apartments for ${floorName} is not an array`);
            return [floorUrl];
          }
  
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
    } else {
      console.warn('apartmentData is not defined or is not an object. Skipping dynamic route generation.');
    }
  
    // Combine static and dynamic routes
    return [...staticRoutes, ...dynamicRoutes];
  }