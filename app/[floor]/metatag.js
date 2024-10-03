export const revalidate = 0;

export async function generateMetadata({ params }) {
  const floor = params.floor;
  let floorName = '';
  let floorImage = '';
  // Set floorName based on URL parameter
  switch (floor) {
    case 'ground-floor':
      floorName = 'Ground Floor';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/sdgx8yr9x5m7fujgmkhz.webp';
      break;
    case 'first-floor':
      floorName = 'First Floor';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/dacaey47usruxqtaflbw.webp';
      break;
    case 'second-floor':
      floorName = 'Second Floor';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/u0yuwj9hcksdyrfvt2v6.webp';
      break;
    case 'third-floor':
      floorName = 'Third Floor';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/w93ebaknkhgdvho14dam.webp';
      break;
    case 'valley-floor-1':
      floorName = 'Valley Floor 1';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/fhedzbg4rbbwi1dxqvla.webp';
      break;
    case 'valley-floor-3':
      floorName = 'Valley Floor 3';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/oavkmlubaaeodqt1hybh.webp';
      break;
    case 'valley-floor-4':
      floorName = 'Valley Floor 4';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/zgraopgd026l39cmsqmj.webp';
      break;
    case 'valley-floor-5':
      floorName = 'Valley Floor 5';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497429/harsukh/x7ft24yzvoia1gh9z6dp.webp';
      break;
    case 'valley-floor-6':
      floorName = 'Valley Floor 6';
      floorImage = 'https://res.cloudinary.com/dykglphpa/image/upload/v1726497427/harsukh/alkljqraarzk52u6atwt.webp';
      break;
    default:
      floorName = 'Floor';
  }

  // Meta description for the page
  const metaDescription = `Explore the ${floorName.toLowerCase()} at Harsukh Residences in Galyat, Pakistan. Luxury apartments with stunning views and world-class amenities.`;

  // Custom image alt description
  const imageDescription = `${floorName} - Harsukh Residences, luxury apartments in Galyat, Pakistan.`;

  return {
    title: `${floorName} Preview | Harsukh, Galyat`,
    description: metaDescription,
    openGraph: {
      title: `${floorName} Preview | Harsukh, Galyat`,
      description: metaDescription,
      type: 'website',
      url: `https://theharsukh.com/floors/${floor}`, // Canonical URL for the floor page
      images: [{
        url: floorImage, // Replace with a real image URL
        alt: imageDescription, // Alt text for the image
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${floorName} Preview | Harsukh, Galyat`,
      description: metaDescription,
      images: [{
        url: floorImage, // Replace with a real image URL
        alt: imageDescription, // Alt text for the Twitter image
      }],
    },
    robots: 'index, follow', // Allow indexing and following of the page
    'og:type': 'website',
    'og:site_name': 'Harsukh Residences',
    'og:locale': 'en_US',
    'og:image:alt': imageDescription, // Custom alt text for the OpenGraph image
    'twitter:image:alt': imageDescription, // Custom alt text for the Twitter image
    'og:url': `https://theharsukh.com/floors/${floor}`, // Canonical URL
    'canonical': `https://theharsukh.com/floors/${floor}`, // Canonical URL for SEO
  };
}
