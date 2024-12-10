import { NextResponse } from "next/server";

export const revalidate = 2 * 60; 

export async function POST(request) {
  
  const data = await request.json();
  const { passengers, legs, distance_unit = "km", cabin_class = "economy" } = data;

  
  if (!passengers || !legs || !Array.isArray(legs) || legs.length < 2) {
    return NextResponse.json({ message: "Missing or insufficient required fields" }, { status: 400 });
  }

  //
  const requiredLegs = 2;
  if (legs.length !== requiredLegs) {
    return NextResponse.json({ message: "You must provide both departure and return flight details" }, { status: 400 });
  }

  try {
    
    const carbonResponse = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CARBON_API_KEY}`, // Ensure the API key is correctly set
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "flight",
        passengers,
        legs: legs.map((leg) => ({
          departure_airport: leg.departure_airport,
          destination_airport: leg.destination_airport,
          cabin_class: leg.cabin_class || cabin_class, // Default to economy if no cabin class is specified
        })),
        distance_unit,
      }),
    });

    // Check if the response is successful
    if (!carbonResponse.ok) {
      const errorData = await carbonResponse.json();
      return NextResponse.json({
        message: "Failed to fetch carbon estimate",
        error: errorData,
      }, { status: carbonResponse.status });
    }

   
    const carbonData = await carbonResponse.json();

  
    return NextResponse.json({
      data: carbonData.data,
      message: "Carbon emissions calculated successfully",
    });

  } catch (error) {
    console.error("Error fetching carbon estimate:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
