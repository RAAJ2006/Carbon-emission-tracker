"use client";

import React, { useState } from 'react';

const FlightEmission = () => {
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [departureAirport, setDepartureAirport] = useState('');
    const [destinationAirport, setDestinationAirport] = useState('');
    const [passengers, setPassengers] = useState('');
    const [carbonData, setCarbonData] = useState(null);
    const [error, setError] = useState(null);

    const airportArray = [
        { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport" },
        { code: "PEK", name: "Beijing Capital International Airport" },
        { code: "LAX", name: "Los Angeles International Airport" },
        { code: "DXB", name: "Dubai International Airport" },
        { code: "HND", name: "Tokyo Haneda Airport" },
        { code: "ORD", name: "O'Hare International Airport" },
        { code: "LHR", name: "London Heathrow Airport" },
        { code: "CDG", name: "Charles de Gaulle Airport" },
        { code: "DFW", name: "Dallas/Fort Worth International Airport" },
        { code: "DEN", name: "Denver International Airport" },
        { code: "FRA", name: "Frankfurt Airport" },
        { code: "IST", name: "Istanbul Airport" },
        { code: "CGK", name: "Soekarno-Hatta International Airport" },
        { code: "SIN", name: "Singapore Changi Airport" },
        { code: "JFK", name: "John F. Kennedy International Airport" },
        { code: "KUL", name: "Kuala Lumpur International Airport" },
        { code: "SEA", name: "Seattle-Tacoma International Airport" },
        { code: "MIA", name: "Miami International Airport" },
        { code: "LIM", name: "Jorge Chávez International Airport" },
        { code: "SYD", name: "Sydney Kingsford Smith Airport" },
        { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" },
        { code: "MUC", name: "Munich Airport" },
        { code: "SFO", name: "San Francisco International Airport" },
        { code: "LGW", name: "London Gatwick Airport" },
        { code: "AMM", name: "Queen Alia International Airport" },
        { code: "BKK", name: "Suvarnabhumi Airport" },
        { code: "HKG", name: "Hong Kong International Airport" },
        { code: "AMS", name: "Amsterdam Schiphol Airport" },
        { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport" },
        { code: "BCN", name: "Barcelona El Prat Airport" },
        { code: "DUB", name: "Dublin Airport" },
        { code: "MEX", name: "Mexico City International Airport" },
        { code: "ICN", name: "Incheon International Airport" },
        { code: "LIS", name: "Lisbon Humberto Delgado Airport" },
        { code: "SVO", name: "Sheremetyevo International Airport" },
        { code: "ZRH", name: "Zurich Airport" },
        { code: "BNE", name: "Brisbane Airport" },
        { code: "PVG", name: "Shanghai Pudong International Airport" },
        { code: "YVR", name: "Vancouver International Airport" },
        { code: "CPT", name: "Cape Town International Airport" },
        { code: "KIX", name: "Kansai International Airport" },
        { code: "NRT", name: "Narita International Airport" },
        { code: "TPE", name: "Taipei Taoyuan International Airport" },
        { code: "CAN", name: "Guangzhou Baiyun International Airport" },
        { code: "MEL", name: "Melbourne Airport" },
        { code: "LHE", name: "Allama Iqbal International Airport" },
        { code: "DEL", name: "Indira Gandhi International Airport" },
        { code: "EWR", name: "Newark Liberty International Airport" },
        { code: "OTP", name: "Henri Coandă International Airport" },
        { code: "YUL", name: "Montréal-Pierre Elliott Trudeau International Airport" },
        { code: "VIE", name: "Vienna International Airport" },
        { code: "WAW", name: "Warsaw Chopin Airport" },
        { code: "STN", name: "London Stansted Airport" },
        { code: "CGH", name: "Congonhas-São Paulo Airport" },
        { code: "BWI", name: "Baltimore/Washington International Thurgood Marshall Airport" },
        { code: "BOG", name: "El Dorado International Airport" },
        { code: "SHA", name: "Hongqiao International Airport" },
        { code: "LGA", name: "LaGuardia Airport" },
        { code: "GIG", name: "Galeão International Airport" },
        { code: "YEG", name: "Edmonton International Airport" },
        { code: "GDL", name: "Guadalajara International Airport" },
        { code: "LCY", name: "London City Airport" },
        { code: "SCL", name: "Arturo Merino Benítez International Airport" },
        { code: "AKL", name: "Auckland Airport" },
        { code: "SGN", name: "Tan Son Nhat International Airport" },
        { code: "STT", name: "Cyril E. King Airport" },
        { code: "FCO", name: "Leonardo da Vinci International Airport" },
        { code: "MSP", name: "Minneapolis-Saint Paul International Airport" },
        { code: "HEL", name: "Helsinki-Vantaa Airport" },
        { code: "STP", name: "Santo Domingo International Airport" },
        // { code: "SHA", name: "Shanghai Hongqiao International Airport" },
        { code: "CPH", name: "Copenhagen Airport" },
        { code: "RIX", name: "Riga International Airport" },
        { code: "RUH", name: "King Khalid International Airport" },
        { code: "TLV", name: "Ben Gurion International Airport" },
        { code: "GVA", name: "Geneva International Airport" },
        { code: "MXP", name: "Milan Malpensa Airport" },
        { code: "CTS", name: "New Chitose Airport" },
        { code: "GRU", name: "São Paulo-Guarulhos International Airport" },
        { code: "OSL", name: "Oslo Gardermoen Airport" },
        { code: "STL", name: "Lambert-St. Louis International Airport" },
        { code: "BLR", name: "Kempegowda International Airport" },
        { code: "SLC", name: "Salt Lake City International Airport" },
        { code: "CVG", name: "Cincinnati/Northern Kentucky International Airport" },
        { code: "MAN", name: "Manchester Airport" },
        { code: "EZE", name: "Ministro Pistarini International Airport" },
        { code: "DUS", name: "Düsseldorf International Airport" }
    ];



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const requestData = {
            // type: "flight",
            // passengers: parseInt(passengers),
            // legs: [
            //     { departure_airport: departureAirport, destination_airport: destinationAirport },
            //     { departure_airport: destinationAirport, destination_airport: departureAirport }
            // ]
            type: "flight",
            passengers: parseInt(passengers),
            legs: [{ departure_airport: departureAirport, destination_airport: destinationAirport },
            {
                departure_airport: destinationAirport, destination_airport: departureAirport
            }
            ]
        };

        try {
            const response = await fetch("/api/auth/carbon/flightemissions", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            if (response.ok) {
                sessionStorage.setItem("carbonData", JSON.stringify(result));
                setCarbonData(result);
            } else {
                setError(result.message || 'Failed to fetch data');
                setCarbonData(null);
            }
        } catch (err) {
            setError('An error occurred while fetching the data');
            setCarbonData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen overflow-y-auto'>
            <h1>Flight Emission Calculator</h1>

            {carbonData && carbonData.data ? (
                <div className="mx-11 my-5">
                    <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3 mb-3">
                        <h2 className="text-lg font-semibold">Carbon Emission Estimate</h2>
                    </div>

                    <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3 mb-3">
                        <p>Carbon (g): {carbonData.data.attributes.carbon_g}</p>
                    </div>

                    <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3 mb-3">
                        <p>Carbon (kg): {carbonData.data.attributes.carbon_kg}</p>
                    </div>

                    <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3 mb-3">
                        <p>Carbon (metric tons): {carbonData.data.attributes.carbon_mt}</p>
                    </div>

                    <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3">
                        <button
                            onClick={() => setCarbonData(null)}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                            Calculate Again
                        </button>
                    </div>
                </div>

            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow-lg space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center">Flight Emission Calculator</h2>

                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium">Departure Airport</span>
                            <select
                                value={departureAirport}
                                onChange={(e) => setDepartureAirport(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="" disabled>Select Airport</option>
                                {airportArray.map((airport) => (
                                    <option key={airport.code} value={airport.code} className="text-black">
                                        {airport.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Destination Airport</span>
                            <select
                                value={destinationAirport}
                                onChange={(e) => setDestinationAirport(e.target.value)}
                                required
                                className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="" disabled>Select Airport</option>
                                {airportArray.map((airport) => (
                                    <option key={airport.code} value={airport.code} className="text-black">
                                        {airport.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Passengers</span>
                            <input
                                type="number"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                                required
                                min="1"
                                className="mt-1 w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 mt-4 font-semibold rounded-lg transition-colors ${loading ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Calculating...' : 'Calculate Emission'}
                    </button>
                </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FlightEmission;

