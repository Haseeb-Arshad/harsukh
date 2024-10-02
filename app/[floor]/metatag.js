
export const revalidate = 0; // Add this line to disable caching

export async function generateMetadata({ params }) {
    const floor = params.floor;
    let floorName = '';
  
    switch (floor) {
      case 'ground-floor':
        floorName = 'Ground Floor';
        break;
      case 'first-floor':
        floorName = 'First Floor';
        break;
      case 'second-floor':
        floorName = 'Second Floor';
        break;
      case 'third-floor':
        floorName = 'Third Floor';
        break;
      case 'valley-floor-1':
        floorName = 'Valley Floor 1';
        break;
      case 'valley-floor-3':
        floorName = 'Valley Floor 3';
        break;
      case 'valley-floor-4':
        floorName = 'Valley Floor 4';
        break;
      case 'valley-floor-5':
        floorName = 'Valley Floor 5';
        break;
      case 'valley-floor-6':
        floorName = 'Valley Floor 6';
        break;
      default:
        floorName = 'Floor';
    }
  
    return {
      title: `${floorName} Preview | Harsukh, Galyat`,
      description: `Explore the ${floorName.toLowerCase()} at Harsukh Residences in Galyat, Pakistan. Luxury apartments with stunning views and world-class amenities.`,
    };
  }