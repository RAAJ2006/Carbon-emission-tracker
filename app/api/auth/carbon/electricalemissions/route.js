import { NextResponse } from "next/server";

export const revalidate = 2 * 60

export async function POST(request) {
  const data = await request.json()
  const electricity_unit = data.electricity_unit
  const electricity_value = data.electricity_value
  const country = data.country
  const state = data.state
  const type = data.type

  if (!electricity_unit || !electricity_value || !country) {
    console.log(electricity_unit, electricity_value, country)
    return NextResponse.json({ message: 'Missing required fields' });
  }

  try {
    const carbonResponse = await fetch('https://www.carboninterface.com/api/v1/estimates', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CARBON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        electricity_unit,
        electricity_value,
        country,
        state,
        type
      }),
    });

    if (!carbonResponse.ok) {
      const errorData = await carbonResponse.json();
      return NextResponse.json({
        message: 'Failed to fetch carbon estimate',
        error: errorData,
      });
    }

    const data = await carbonResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching carbon estimate:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}

// the handler syntax you were using was in the next js 13 used in pages directory, i used the new next 14 syntax
// when looking at documentation makes sure to select the app router one
// just go through this page once : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// how are you btw, okay