// import TotalFloor from '@/app/component/data/TotalFloorData';


const TotalFloor = [
    { id: 'third-floor' },
    { id: 'second-floor'},
    { id: 'first-floor'},
    { id: 'ground-floor' },
    { id: 'valley-floor-1'},
    { id: 'valley-floor-3'},
    { id: 'valley-floor-4' },
    { id: 'valley-floor-5'},
    { id: 'valley-floor-6' },
  ];

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
        dynamicRoutes = TotalFloor.flatMap((floor) => {
            const floorUrl = {
                url: `https://theharsukh.com/${floor.id}`,
                lastModified: today,
                changeFrequency: 'monthly',
                priority: 0.7,
            };

            const apartmentUrls = Array.from({ length: 146 }, (_, i) => ({
                url: `https://theharsukh.com/${floor.id}/Apartment${i + 1}`,
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