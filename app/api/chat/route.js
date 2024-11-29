// /app/api/chat/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { user_input } = await request.json();

    // Forward the request to the external backend API
    const response = await fetch('https://chat-jzr3.onrender.com/ask/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user_input }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the response from the backend to the frontend
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
