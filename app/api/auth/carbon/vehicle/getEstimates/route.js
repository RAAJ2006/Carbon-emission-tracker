import { NextResponse } from 'next/server';

export async function POST(request) {
 const data=await request.json()
 const distanceUnit=data.distance_unit
 const distance=data.distance_value
 const vehicleModelId=data.vehicle_model_id
 const type =data.type

  if (!distance || !distanceUnit || !vehicleModelId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const response = await fetch('https://www.carboninterface.com/api/v1/estimates', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CARBON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type:"vehicle",
        distance_unit: distanceUnit,
        distance_value: distance,
        vehicle_model_id: vehicleModelId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: 'Failed to calculate estimate', error: errorData });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calculating carbon estimate:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}
