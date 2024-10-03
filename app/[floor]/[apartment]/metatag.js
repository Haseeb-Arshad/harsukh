import { notFound } from 'next/navigation';
const apartmentData = {
    "3rd Floor": [
      { Apartmentno: 1, Type: "Penthouse", Bedrooms: 2, Area: "1142 sqft" },
      { Apartmentno: 2, Type: "Penthouse", Bedrooms: 2, Area: "1286 sqft" },
      { Apartmentno: 3, Type: "Penthouse", Bedrooms: 3, Area: "1663 sqft" },
      { Apartmentno: 4, Type: "Penthouse", Bedrooms: 3, Area: "1665 sqft" },
      { Apartmentno: 5, Type: "Penthouse", Bedrooms: 3, Area: "1465 sqft" },
      { Apartmentno: 6, Type: "Penthouse", Bedrooms: 3, Area: "1421 sqft" },
      { Apartmentno: 7, Type: "Penthouse", Bedrooms: 3, Area: "1599 sqft" },
      { Apartmentno: 8, Type: "Penthouse", Bedrooms: 3, Area: "1568 sqft" },
      { Apartmentno: 9, Type: "Penthouse", Bedrooms: 2, Area: "1238 sqft" },
      { Apartmentno: 10, Type: "Penthouse", Bedrooms: 2, Area: "1142 sqft" },
    ],
    "2nd Floor": [
      { Apartmentno: 11, Type: "Penthouse", Bedrooms: 2, Area: "1108 sqft" },
      { Apartmentno: 12, Type: "Two Bed", Bedrooms: 2, Area: "1130 sqft" },
      { Apartmentno: 13, Type: "Two Bed", Bedrooms: 2, Area: "1275 sqft" },
      { Apartmentno: 14, Type: "Three Bed", Bedrooms: 3, Area: "1663 sqft" },
      { Apartmentno: 15, Type: "Three Bed", Bedrooms: 3, Area: "1666 sqft" },
      { Apartmentno: 16, Type: "One Bed", Bedrooms: 1, Area: "746 sqft" },
      { Apartmentno: 17, Type: "One Bed", Bedrooms: 1, Area: "505 sqft" },
      { Apartmentno: 18, Type: "One Bed", Bedrooms: 1, Area: "559 sqft" },
      { Apartmentno: 19, Type: "Penthouse", Bedrooms: 1, Area: "511 sqft" },
      { Apartmentno: 20, Type: "Penthouse", Bedrooms: 1, Area: "511 sqft" },
      { Apartmentno: 21, Type: "One Bed", Bedrooms: 1, Area: "451 sqft" },
      { Apartmentno: 22, Type: "One Bed", Bedrooms: 1, Area: "487 sqft" },
      { Apartmentno: 23, Type: "One Bed", Bedrooms: 1, Area: "722 sqft" },
      { Apartmentno: 24, Type: "Three Bed", Bedrooms: 3, Area: "1599 sqft" },
      { Apartmentno: 25, Type: "Three Bed", Bedrooms: 3, Area: "1568 sqft" },
      { Apartmentno: 26, Type: "Two Bed", Bedrooms: 2, Area: "1224 sqft" },
      { Apartmentno: 27, Type: "Two Bed", Bedrooms: 2, Area: "1130 sqft" },
      { Apartmentno: 28, Type: "Penthouse", Bedrooms: 2, Area: "1108 sqft" },
    ],
    "1st Floor": [
      { Apartmentno: 29, Type: "Two Bed", Bedrooms: 2, Area: "1154 sqft" },
      { Apartmentno: 30, Type: "Two Bed", Bedrooms: 2, Area: "1154 sqft" },
      { Apartmentno: 31, Type: "Two Bed", Bedrooms: 2, Area: "1305 sqft" },
      { Apartmentno: 32, Type: "Three Bed", Bedrooms: 3, Area: "1725 sqft" },
      { Apartmentno: 33, Type: "Three Bed", Bedrooms: 3, Area: "1728 sqft" },
      { Apartmentno: 34, Type: "One Bed", Bedrooms: 1, Area: "778 sqft" },
      { Apartmentno: 35, Type: "Two Bed", Bedrooms: 2, Area: "929 sqft" },
      { Apartmentno: 36, Type: "One Bed", Bedrooms: 1, Area: "515 sqft" },
      { Apartmentno: 37, Type: "One Bed", Bedrooms: 1, Area: "539 sqft" },
      { Apartmentno: 38, Type: "One Bed", Bedrooms: 1, Area: "508 sqft" },
      { Apartmentno: 39, Type: "One Bed", Bedrooms: 1, Area: "720 sqft" },
      { Apartmentno: 40, Type: "Three Bed", Bedrooms: 3, Area: "1659 sqft" },
      { Apartmentno: 41, Type: "Three Bed", Bedrooms: 3, Area: "1627 sqft" },
      { Apartmentno: 42, Type: "Two Bed", Bedrooms: 2, Area: "1225 sqft" },
      { Apartmentno: 43, Type: "Two Bed", Bedrooms: 2, Area: "1154 sqft" },
      { Apartmentno: 44, Type: "Two Bed", Bedrooms: 2, Area: "1154 sqft" },
    ],
    "Ground Floor": [
      { Apartmentno: 45, Type: "Two Bed", Bedrooms: 2, Area: "1203 sqft" },
      { Apartmentno: 46, Type: "Two Bed", Bedrooms: 2, Area: "1183 sqft" },
      { Apartmentno: 47, Type: "Two Bed", Bedrooms: 2, Area: "1339 sqft" },
      { Apartmentno: 48, Type: "Three Bed", Bedrooms: 3, Area: "1793 sqft" },
      { Apartmentno: 49, Type: "Three Bed", Bedrooms: 3, Area: "1796 sqft" },
      { Apartmentno: 50, Type: "Two Bed", Bedrooms: 2, Area: "1080 sqft" },
      { Apartmentno: 51, Type: "One Bed", Bedrooms: 1, Area: "629 sqft" },
      { Apartmentno: 52, Type: "One Bed", Bedrooms: 1, Area: "603 sqft" },
      { Apartmentno: 53, Type: "One Bed", Bedrooms: 1, Area: "590 sqft" },
      { Apartmentno: 54, Type: "One Bed", Bedrooms: 1, Area: "821 sqft" },
      { Apartmentno: 55, Type: "Three Bed", Bedrooms: 3, Area: "1725 sqft" },
      { Apartmentno: 56, Type: "Three Bed", Bedrooms: 3, Area: "1691 sqft" },
      { Apartmentno: 57, Type: "Two Bed", Bedrooms: 2, Area: "1288 sqft" },
      { Apartmentno: 58, Type: "Two Bed", Bedrooms: 2, Area: "1179 sqft" },
      { Apartmentno: 59, Type: "Two Bed", Bedrooms: 2, Area: "1205 sqft" },
    ],
    "Basement 1": [
      { Apartmentno: 60, Type: "Two Bed", Bedrooms: 2, Area: "1200 sqft" },
      { Apartmentno: 61, Type: "Two Bed", Bedrooms: 2, Area: "1168 sqft" },
      { Apartmentno: 62, Type: "Two Bed", Bedrooms: 2, Area: "1300 sqft" },
      { Apartmentno: 63, Type: "Two Bed", Bedrooms: 2, Area: "1310 sqft" },
      { Apartmentno: 64, Type: "Two Bed", Bedrooms: 2, Area: "1174 sqft" },
      { Apartmentno: 65, Type: "Two Bed", Bedrooms: 2, Area: "1174 sqft" },
      { Apartmentno: 66, Type: "Two Bed", Bedrooms: 2, Area: "1030 sqft" },
      { Apartmentno: 67, Type: "One Bed", Bedrooms: 1, Area: "681 sqft" },
      { Apartmentno: 68, Type: "One Bed", Bedrooms: 1, Area: "516 sqft" },
      { Apartmentno: 69, Type: "One Bed", Bedrooms: 1, Area: "614 sqft" },
      { Apartmentno: 70, Type: "One Bed", Bedrooms: 1, Area: "658 sqft" },
      { Apartmentno: 71, Type: "One Bed", Bedrooms: 1, Area: "623 sqft" },
      { Apartmentno: 72, Type: "One Bed", Bedrooms: 1, Area: "599 sqft" },
      { Apartmentno: 73, Type: "One Bed", Bedrooms: 1, Area: "586 sqft" },
      { Apartmentno: 74, Type: "One Bed", Bedrooms: 1, Area: "759 sqft" },
      { Apartmentno: 75, Type: "Two Bed", Bedrooms: 2, Area: "959 sqft" },
      { Apartmentno: 76, Type: "Two Bed", Bedrooms: 2, Area: "815 sqft" },
      { Apartmentno: 77, Type: "Two Bed", Bedrooms: 2, Area: "1116 sqft" },
      { Apartmentno: 78, Type: "Two Bed", Bedrooms: 2, Area: "1258 sqft" },
      { Apartmentno: 79, Type: "Two Bed", Bedrooms: 2, Area: "1274 sqft" },
      { Apartmentno: 80, Type: "Two Bed", Bedrooms: 2, Area: "1159 sqft" },
      { Apartmentno: 81, Type: "Two Bed", Bedrooms: 2, Area: "1200 sqft" },
    ],
  
    "Basement 3": [
      { Apartmentno: 82, Type: "Two Bed", Bedrooms: 2, Area: "1102 sqft" },
      { Apartmentno: 83, Type: "Two Bed", Bedrooms: 2, Area: "1034 sqft" },
      { Apartmentno: 84, Type: "Two Bed", Bedrooms: 2, Area: "1169 sqft" },
      { Apartmentno: 85, Type: "Two Bed", Bedrooms: 2, Area: "1192 sqft" },
      { Apartmentno: 86, Type: "Two Bed", Bedrooms: 2, Area: "1046 sqft" },
      { Apartmentno: 87, Type: "Two Bed", Bedrooms: 2, Area: "1111 sqft" },
      { Apartmentno: 88, Type: "Two Bed", Bedrooms: 2, Area: "1022 sqft" },
      { Apartmentno: 89, Type: "One Bed", Bedrooms: 1, Area: "899 sqft" },
      { Apartmentno: 90, Type: "One Bed", Bedrooms: 1, Area: "703 sqft" },
      { Apartmentno: 91, Type: "One Bed", Bedrooms: 1, Area: "550 sqft" },
      { Apartmentno: 92, Type: "One Bed", Bedrooms: 1, Area: "552 sqft" },
      { Apartmentno: 93, Type: "One Bed", Bedrooms: 1, Area: "593 sqft" },
      { Apartmentno: 94, Type: "One Bed", Bedrooms: 1, Area: "564 sqft" },
      { Apartmentno: 95, Type: "One Bed", Bedrooms: 1, Area: "538 sqft" },
      { Apartmentno: 96, Type: "One Bed", Bedrooms: 1, Area: "528 sqft" },
      { Apartmentno: 97, Type: "One Bed", Bedrooms: 1, Area: "683 sqft" },
      { Apartmentno: 98, Type: "One Bed", Bedrooms: 1, Area: "862 sqft" },
      { Apartmentno: 99, Type: "Two Bed", Bedrooms: 2, Area: "978 sqft" },
      { Apartmentno: 100, Type: "Two Bed", Bedrooms: 2, Area: "1071 sqft" },
      { Apartmentno: 101, Type: "Two Bed", Bedrooms: 2, Area: "1003 sqft" },
      { Apartmentno: 102, Type: "Two Bed", Bedrooms: 2, Area: "1134 sqft" },
      { Apartmentno: 103, Type: "Two Bed", Bedrooms: 2, Area: "1131 sqft" },
      { Apartmentno: 104, Type: "Two Bed", Bedrooms: 2, Area: "1024 sqft" },
      { Apartmentno: 105, Type: "Two Bed", Bedrooms: 2, Area: "1117 sqft" },
    ],
    "Basement 4": [
      { Apartmentno: 106, Type: "One Bed", Bedrooms: 1, Area: "542 sqft" },
      { Apartmentno: 107, Type: "One Bed", Bedrooms: 1, Area: "492 sqft" },
      { Apartmentno: 108, Type: "Studio", Bedrooms: 1, Area: "380 sqft" },
      { Apartmentno: 109, Type: "Studio", Bedrooms: 1, Area: "400 sqft" },
      { Apartmentno: 110, Type: "One Bed", Bedrooms: 1, Area: "564 sqft" },
      { Apartmentno: 111, Type: "Studio", Bedrooms: 1, Area: "309 sqft" },
      { Apartmentno: 112, Type: "Studio", Bedrooms: 1, Area: "416 sqft" },
      { Apartmentno: 113, Type: "Studio", Bedrooms: 1, Area: "473 sqft" },
      { Apartmentno: 114, Type: "One Bed", Bedrooms: 1, Area: "505 sqft" },
      { Apartmentno: 115, Type: "Studio", Bedrooms: 1, Area: "386 sqft" },
      { Apartmentno: 116, Type: "One Bed", Bedrooms: 1, Area: "559 sqft" },
      { Apartmentno: 117, Type: "One Bed", Bedrooms: 1, Area: "702 sqft" },
      { Apartmentno: 118, Type: "Two Bed", Bedrooms: 2, Area: "1018 sqft" },
      { Apartmentno: 119, Type: "Two Bed", Bedrooms: 2, Area: "1194 sqft" },
      { Apartmentno: 120, Type: "Two Bed", Bedrooms: 2, Area: "1038 sqft" },
      { Apartmentno: 121, Type: "Two Bed", Bedrooms: 2, Area: "1157 sqft" },
      { Apartmentno: 122, Type: "Two Bed", Bedrooms: 2, Area: "1157 sqft" },
      { Apartmentno: 123, Type: "Two Bed", Bedrooms: 2, Area: "1046 sqft" },
      { Apartmentno: 124, Type: "Two Bed", Bedrooms: 2, Area: "1210 sqft" },
    ],
    "Basement 5": [
      { Apartmentno: 125, Type: "One Bed", Bedrooms: 1, Area: "506 sqft" },
      { Apartmentno: 126, Type: "One Bed", Bedrooms: 1, Area: "508 sqft" },
      { Apartmentno: 127, Type: "One Bed", Bedrooms: 1, Area: "512 sqft" },
      { Apartmentno: 128, Type: "Two Bed", Bedrooms: 2, Area: "880 sqft" },
      { Apartmentno: 129, Type: "One Bed", Bedrooms: 1, Area: "557 sqft" },
      { Apartmentno: 130, Type: "One Bed", Bedrooms: 1, Area: "599 sqft" },
      { Apartmentno: 131, Type: "One Bed", Bedrooms: 1, Area: "524 sqft" },
      { Apartmentno: 132, Type: "One Bed", Bedrooms: 1, Area: "534 sqft" },
      { Apartmentno: 133, Type: "One Bed", Bedrooms: 1, Area: "534 sqft" },
      { Apartmentno: 134, Type: "One Bed", Bedrooms: 1, Area: "524 sqft" },
      { Apartmentno: 135, Type: "One Bed", Bedrooms: 1, Area: "596 sqft" },
    ],
    "Basement 6": [
      { Apartmentno: 136, Type: "Studio", Bedrooms: 0, Area: "473 sqft" },
      { Apartmentno: 137, Type: "Studio", Bedrooms: 0, Area: "471 sqft" },
      { Apartmentno: 138, Type: "Studio", Bedrooms: 0, Area: "488 sqft" },
      { Apartmentno: 139, Type: "One Bed", Bedrooms: 1, Area: "458 sqft" },
      { Apartmentno: 140, Type: "One Bed", Bedrooms: 1, Area: "587 sqft" },
      { Apartmentno: 141, Type: "One Bed", Bedrooms: 1, Area: "598 sqft" },
      { Apartmentno: 142, Type: "One Bed", Bedrooms: 1, Area: "512 sqft" },
      { Apartmentno: 143, Type: "One Bed", Bedrooms: 1, Area: "520 sqft" },
      { Apartmentno: 144, Type: "One Bed", Bedrooms: 1, Area: "520 sqft" },
      { Apartmentno: 145, Type: "One Bed", Bedrooms: 1, Area: "512 sqft" },
      { Apartmentno: 146, Type: "One Bed", Bedrooms: 1, Area: "593 sqft" },
    ],
  };
  
  const floorPathToName = {
    'ground-floor': 'Ground Floor',
    'first-floor': '1st Floor',
    'second-floor': '2nd Floor',
    'third-floor': '3rd Floor',
    'basement-1': 'Basement 1',
    'basement-3': 'Basement 3',
    'basement-4': 'Basement 4',
    'basement-5': 'Basement 5',
    'basement-6': 'Basement 6'
  };
  
  // SEO content templates
  const seoContent = {
    taglines: {
      penthouse: "Experience Luxury Living at New Heights in Galyat",
      threeBed: "Spacious Family Living with Panoramic Mountain Views",
      twoBed: "Perfect Balance of Comfort and Elegance in Galyat",
      oneBed: "Sophisticated Living in a Cozy Mountain Setting",
      studio: "Smart Living in Style at Harsukh Residences"
    },
    amenities: {
      penthouse: "private terrace, premium finishes, panoramic mountain views",
      threeBed: "expansive living areas, modern kitchen, multiple bathrooms",
      twoBed: "contemporary design, fitted kitchen, scenic views",
      oneBed: "efficient layout, modern amenities, comfortable living",
      studio: "smart design, integrated living space, modern conveniences"
    }
  };
  
  function getApartmentType(type) {
    if (type.toLowerCase().includes('penthouse')) return 'penthouse';
    if (type.toLowerCase().includes('three')) return 'threeBed';
    if (type.toLowerCase().includes('two')) return 'twoBed';
    if (type.toLowerCase().includes('one')) return 'oneBed';
    return 'studio';
  }
  
  export const revalidate = 0;
  
  export async function generateMetadata({ params }) {
    const { floor, apartment } = params;
    const floorName = floorPathToName[floor];
    if (!floorName || !apartmentData[floorName]) return notFound();
  
    const match = apartment.match(/\d+/);
    const apartmentNumber = match ? parseInt(match[0]) : null;
    const apartmentInfo = apartmentData[floorName].find(apt => apt.Apartmentno === apartmentNumber);
    if (!apartmentInfo) return notFound();
  
    const type = getApartmentType(apartmentInfo.Type);
    const baseUrl = `https://theharsukh.com/${floor}/${apartment}`;
    
    // Generate dynamic content
    const title = `${apartmentInfo.Type} (${apartmentInfo.Area}) | ${floorName} | Harsukh Residences, Galyat`;
    const description = `${seoContent.taglines[type]} in this luxurious ${apartmentInfo.Area} ${apartmentInfo.Type} with ${apartmentInfo.Bedrooms} bedroom${apartmentInfo.Bedrooms > 1 ? 's' : ''} on ${floorName}. Features ${seoContent.amenities[type]}. Experience premium living at Harsukh Residences, Galyat.`;
    
    return {
      // Basic Meta Tags
      title,
      description,
      keywords: `Luxury Apartments, Harsukh Residences, Apartments in Galyat, Pakistan Properties, Galyat Real Estate, Modern Apartments in Galyat, Best Apartments in Pakistan, ${apartmentInfo.Type}, ${apartmentInfo.Bedrooms} Bedroom Apartment`,
      
      // Open Graph Meta Tags
      openGraph: {
        title: `${apartmentInfo.Type} at Harsukh Residences, Galyat`,
        description,
        url: baseUrl,
        siteName: 'Harsukh Residences',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: 'https://cdn.theharsukh.com/images/background/front-view-winter.webp',
            width: 1200,
            height: 630,
            alt: `${apartmentInfo.Type} at Harsukh Residences`
          }
        ]
      },
      
      // Twitter Meta Tags
      twitter: {
        card: 'summary_large_image',
        title: `${apartmentInfo.Type} at Harsukh Residences | Luxury Living in Galyat`,
        description: description.substring(0, 200) + '...',
        images: ['https://cdn.theharsukh.com/images/background/front-view-winter.webp']
      },
      
      // Verification and Technical Meta Tags
      verification: {
        google: 'pdF67cKTIKSHMJM0IRkz4p7_4A2CZlKPQD22CDeK4Hs'
      },
      
      // Canonical URL
      alternates: {
        canonical: baseUrl
      },
      
      // Additional Meta Tags
      other: {
        'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        'viewport': 'width=device-width, initial-scale=1, maximum-scale=5'
      },
  
      // Structured Data
      alternativeMetadata: {
        structured: {
          '@context': 'https://schema.org',
          '@type': 'Apartment',
          name: `${apartmentInfo.Type} at Harsukh Residences`,
          description,
          numberOfRooms: apartmentInfo.Bedrooms,
          floorSize: {
            '@type': 'QuantitativeValue',
            value: parseInt(apartmentInfo.Area),
            unitText: 'SQUARE_FOOT'
          },
          location: {
            '@type': 'Place',
            name: 'Harsukh Residences',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Galyat',
              addressRegion: 'KPK',
              addressCountry: 'Pakistan'
            }
          },
          url: baseUrl,
          image: 'https://cdn.theharsukh.com/images/background/front-view-winter.webp'
        }
      }
    };
  }
  
  // Helper function to add JSON-LD to your page component
  export function ApartmentJsonLd({ metadata }) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(metadata.alternativeMetadata.structured)
        }}
      />
    );
  }