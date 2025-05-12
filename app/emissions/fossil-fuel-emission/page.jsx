'use client';

import React, { useState } from 'react';

const FossilFuelsPage = () => {
  const [fuelSourceType, setFuelSourceType] = useState('');
  const [fuelSourceUnit, setFuelSourceUnit] = useState('');
  const [fuelSourceValue, setFuelSourceValue] = useState('');

  const [carbonData, setCarbonData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requestData = {
      fuel_source_type: fuelSourceType,
      fuel_source_unit: fuelSourceUnit,
      fuel_source_value: parseFloat(fuelSourceValue),
      type: 'fuel_combustion',
    };

    try {
      const response = await fetch('/api/auth/carbon/fossilfuel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });



      const result = await response.json();

      if (response.ok) {
        // Assuming the response data has a nested structure like result.data.attributes
        setCarbonData(result.data.attributes);  // Access the attributes directly
      } else {
        setError(result.message || 'Failed to fetch data');
        setCarbonData(null);
      }
    } catch (err) {
      setError('An error occurred while fetching the data');
      setCarbonData(null);
    }
  };

  return (
    <div className='text-white min-h-screen overflow-y-auto flex items-center justify-center'>
      {!carbonData ? (
        <div className="justify-center flex flex-col gap-24 mt-10 w-full max-w-2xl">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
            <div className="flex justify-center mb-8">
              <h1 className='font-bold font-mono text-2xl'>Fossil Fuel Emission Estimator</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label className="text-xl font-mono mb-2 text-white flex flex-col gap-1">
                  Fuel Source Type:
                  <input
                    type="text"
                    value={fuelSourceType}
                    onChange={(e) => setFuelSourceType(e.target.value)}
                    className="p-1 rounded-lg border border-gray-400 text-black"
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col mb-6">
                <label className="text-xl font-mono mb-2 text-white flex flex-col gap-1">
                  Fuel Source Unit:
                  <input
                    type="text"
                    value={fuelSourceUnit}
                    onChange={(e) => setFuelSourceUnit(e.target.value)}
                    className="p-1 rounded-lg border border-gray-400 text-black"
                    required
                  />
                </label>
              </div>

              <div className="mb-6">
                <label className="text-xl font-mono mb-2 text-white flex flex-col gap-1">
                  Fuel Source Value:
                  <input
                    type="number"
                    value={fuelSourceValue}
                    onChange={(e) => setFuelSourceValue(e.target.value)}
                    className="p-1 rounded-lg border border-gray-400 text-black"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                className="bg-white-500 hover:bg-white-600 text-white font-bold py-3 mt-3 rounded-lg w-full transition duration-300"
              >
                Get Emission Estimate
              </button>
            </form>
          </div>
          <div className='h-1 w-full bg-white'></div>
          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-white mx-auto mb-32">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4 text-left">Fuel Source Type</th>
                  <th className="border-b py-2 px-4 text-left">Fuel Source Unit</th>
                  <th className="border-b py-2 px-4 text-left">BTU</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fuelSourceType: "Bituminous Coal", fuelSourceUnit: "bit", btu: "short_ton btu" },
                  { fuelSourceType: "Home Heating and Diesel Fuel (Distillate)", fuelSourceUnit: "dfo", btu: "gallon btu" },
                  { fuelSourceType: "Jet Fuel", fuelSourceUnit: "jf", btu: "gallon btu" },
                  { fuelSourceType: "Kerosene", fuelSourceUnit: "ker", btu: "gallon btu" },
                  { fuelSourceType: "Lignite Coal", fuelSourceUnit: "lig", btu: "short_ton btu" },
                  { fuelSourceType: "Municipal Solid Waste", fuelSourceUnit: "msw", btu: "short_ton btu" },
                  { fuelSourceType: "Natural Gas", fuelSourceUnit: "ng", btu: "thousand_cubic_feet btu" },
                  { fuelSourceType: "Petroleum Coke", fuelSourceUnit: "pc", btu: "gallon btu" },
                  { fuelSourceType: "Propane Gas", fuelSourceUnit: "pg", btu: "gallon btu" },
                  { fuelSourceType: "Residual Fuel Oil", fuelSourceUnit: "rfo", btu: "gallon btu" },
                  { fuelSourceType: "Subbituminous Coal", fuelSourceUnit: "sub", btu: "short_ton btu" },
                  { fuelSourceType: "Tire-Derived Fuel", fuelSourceUnit: "tdf", btu: "short_ton btu" },
                  { fuelSourceType: "Waste Oil", fuelSourceUnit: "wo", btu: "barrel btu" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#32333b] transition duration-300 ease-in-out">
                    <td className="border-b py-2 px-4">{item.fuelSourceType}</td>
                    <td className="border-b py-2 px-4">{item.fuelSourceUnit}</td>
                    <td className="border-b py-2 px-4">{item.btu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {/* Emission data view */}

          <div className="flex text-white justify-between items-center cursor-pointer bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg my-5 p-5 w-96 mx-0">
            <h2 className="font-bold text-xl">Carbon Estimate</h2>
          </div>

          {/* Display Carbon Data */}

          {carbonData && Object.keys(carbonData).map((key, idx) => (
            <div
              key={idx}
              className="flex text-white justify-between items-center cursor-pointer bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg mx-11 my-5 p-3  w-full"
            >
              <div><p><strong>{key}:</strong></p></div>
              <div><p>{carbonData[key]}</p></div>
            </div>

          ))}

          <div className="text-white bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg p-3">
            <button
              onClick={() => setCarbonData(null)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Calculate Again
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )
      }
    </div>
  );
};

export default FossilFuelsPage;
