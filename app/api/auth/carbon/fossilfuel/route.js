// app/api/fossilfuels/route.js

import { NextResponse } from "next/server";

export const revalidate = 2 * 60;

export async function POST(request) {

  const data = await request.json();
  const fuelSourceType = data.fuel_source_type;
  const fuelSourceUnit = data.fuel_source_unit;
  const fuelSourceValue = data.fuel_source_value;
  const type = data.type;


  if (!fuelSourceType || !fuelSourceUnit || !fuelSourceValue) {
    console.log(fuelSourceType, fuelSourceUnit, fuelSourceValue);
    return NextResponse.json({ message: 'Missing required fields' });
  }

  try {

    const carbonResponse = await fetch('https://www.carboninterface.com/api/v1/estimates', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CARBON_API_KEY}`, // Use your API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: "fuel_combustion",
        fuel_source_type: fuelSourceType,
        fuel_source_unit: fuelSourceUnit,
        fuel_source_value: fuelSourceValue,

        emission_type: type
      }),
    });


    if (!carbonResponse) {
      const errorData = await carbonResponse.json();
      return NextResponse.json({
        message: "Failed to fetch data from API",
        error: errorData,
      })
    }


    const result = await carbonResponse.json();
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error fetching fossil fuel carbon estimate:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}
