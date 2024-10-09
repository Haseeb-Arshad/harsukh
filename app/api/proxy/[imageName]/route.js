// app/api/proxy/[imageName]/route.js

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { imageName } = params;

  // Define a mapping from imageName to CDN URLs
  const floorData = 
  {
    "valley-floor-1": "https://cdn.theharsukh.com/images/floors/basement1.webp",
    "valley-floor-3": "https://cdn.theharsukh.com/images/floors/basement3.webp",
    "valley-floor-4": "https://cdn.theharsukh.com/images/floors/basement4.webp",
    "valley-floor-5": "https://cdn.theharsukh.com/images/floors/basement5.webp",
    "valley-floor-6": "https://cdn.theharsukh.com/images/floors/basement6.webp",
    "ground-floor": "https://cdn.theharsukh.com/images/floors/groundfloor.webp",
    "first-floor": "https://cdn.theharsukh.com/images/floors/firstfloor.webp",
    "second-floor": "https://cdn.theharsukh.com/images/floors/secondfloor.webp",
    "third-floor": "https://cdn.theharsukh.com/images/floors/thirdfloor.webp",

    "Penthouse": "https://cdn.theharsukh.com/Webpage/apartments/penthouse.webp",
    "OneBed": "https://cdn.theharsukh.com/Webpage/apartments/oneBed.webp",
    "TwoBed": "https://cdn.theharsukh.com/Webpage/apartments/twoBed.webp",
    "ThreeBed": "https://cdn.theharsukh.com/Webpage/apartments/threeBed.webp",
    "Studio": "https://cdn.theharsukh.com/Webpage/apartments/studio.webp",

    };

  const imageUrl = floorData[imageName];

  if (!imageUrl) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new NextResponse('Error fetching image', { status: 500 });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/webp';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify your domain
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('Error in proxy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
