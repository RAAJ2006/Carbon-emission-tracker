import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.carboninterface.com/api/v1/vehicle_makes', {
      headers: {
        Authorization: `Bearer ${process.env.CARBON_API_KEY}`,
        "Content-type":"application/json"
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: 'Failed to fetch vehicle makes', error: errorData });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching vehicle makes:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}
