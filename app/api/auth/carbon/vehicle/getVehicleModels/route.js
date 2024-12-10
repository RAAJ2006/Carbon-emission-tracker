import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const makeId = searchParams.get('makeId');

  if (!makeId) {
    return NextResponse.json({ message: 'Missing make ID' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CARBON_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: 'Failed to fetch vehicle models', error: errorData });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}
