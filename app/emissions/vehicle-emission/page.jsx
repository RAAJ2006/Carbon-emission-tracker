'use client';
import { useState, useEffect } from 'react';

export default function VehicleForm() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('mi');
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState('');
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  // Fetch vehicle makes when component mounts
  useEffect(() => {
    const fetchMakes = async () => {
      setLoadingMakes(true);
      try {
        const response = await fetch('/api/auth/carbon/vehicle/getVehicleMakes');
        if (!response.ok) throw new Error('Failed to fetch vehicle makes');

        const data = await response.json();
        setMakes(data);
      } catch (err) {
        setError('Error fetching vehicle makes');
        console.error(err);
      } finally {
        setLoadingMakes(false);
      }
    };
    fetchMakes();
  }, []);

  // Fetch vehicle models when a make is selected
  useEffect(() => {
    if (!selectedMake) return;

    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const response = await fetch(`/api/auth/carbon/vehicle/getVehicleModels?makeId=${selectedMake}`);
        if (!response.ok) throw new Error('Failed to fetch vehicle models');

        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError('Error fetching vehicle models');
        console.error(err);
      } finally {
        setLoadingModels(false);
      }
    };
    fetchModels();
  }, [selectedMake]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEstimate(null);

    if (!distance || !selectedModel) {
      setError('Please fill in all fields');
      return;
    }

    setLoadingEstimate(true);
    try {
      const response = await fetch('/api/auth/carbon/vehicle/getEstimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: "vehicle",
          distance_unit: distanceUnit,
          distance_value: parseFloat(distance),
          vehicle_model_id: selectedModel,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'Failed to fetch estimate');
      } else {
        setEstimate(result.data.attributes);
      }
    } catch (err) {
      setError('Error calculating estimate');
      console.error(err);
    } finally {
      setLoadingEstimate(false);
    }
  };

  if (estimate) {
    return (
      <div className="flex justify-center min-h-screen overflow-y-auto ">
  <div className="mt-11 flex flex-col items-center  w-full mx-11 cursor-pointer">
    
    <h2 className="text-white text-2xl font-bold mb-6 w-full text-center">Estimate Results:</h2>

    {/* Vehicle Make Row */}
    <div className="flex justify-between mb-4  bg-[#3b3c44]   hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Vehicle Make:</p>
      <p className="text-white  w-1/2 text-right">{estimate.vehicle_make}</p>
    </div>

    {/* Vehicle Model Row */}
    <div className="flex justify-between  mb-4 bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Vehicle Model:</p>
      <p className="text-white  w-1/2 text-right">{estimate.vehicle_model}</p>
    </div>

    {/* Vehicle Year Row */}
    <div className="flex justify-between  mb-4  bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white font-semibold w-1/2">Vehicle Year:</p>
      <p className="text-white  w-1/2 text-right">{estimate.vehicle_year}</p>
    </div>

    {/* Distance Row */}
    <div className="flex justify-between mb-4  bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Distance:</p>
      <p className="text-white  w-1/2 text-right">{estimate.distance_value} {estimate.distance_unit}</p>
    </div>

    {/* Carbon Emissions Header */}
    <div className="flex justify-between mb-4  bg-[#2d2e35]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white text-xl font-semibold w-full flex justify-center">Carbon Emissions:</p>
    </div>

    {/* Carbon Emissions Rows */}
    <div className="flex justify-between mb-4  bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Grams:</p>
      <p className="text-white  w-1/2 text-right">{estimate.carbon_g}g</p>
    </div>

    <div className="flex justify-between  mb-4 bg-[#3b3c44] hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Pounds:</p>
      <p className="text-white text-lg w-1/2 text-right">{estimate.carbon_lb} lb</p>
    </div>

    <div className="flex justify-between  mb-4 bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Kilograms:</p>
      <p className="text-white  w-1/2 text-right">{estimate.carbon_kg} kg</p>
    </div>

    <div className="flex justify-between  mb-4  bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg mx-6 my-5 p-3 transform hover:scale-105 transition duration-300 ease-in-out w-full">
      <p className="text-white  font-semibold w-1/2">Metric Tons:</p>
      <p className="text-white  w-1/2 text-right">{estimate.carbon_mt} mt</p>
    </div>

    {/* Estimated At Row */}
    <div className="flex justify-between w-full mt-2 mb-4 p-3 bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg transform hover:scale-105 transition duration-300 ease-in-out">
      <p className="text-white  font-semibold w-1/2">Estimated at:</p>
      <p className="text-white  w-1/2 text-right">{new Date(estimate.estimated_at).toLocaleString()}</p>
    </div>
    <div className="flex justify-between w-full mt-2 mb-4 p-3 bg-[#3b3c44]  hover:shadow-[0px_0px_16px_#111216] rounded-lg transform hover:scale-105 transition duration-300 ease-in-out"><button onClick={()=>setEstimate(null)} className='text-white font-semibold w-1/2'>Calculate Again</button></div>
  </div>
</div>




    );
  }

  return (
    <div className='min-h-screen overflow-y-auto'>
      {/* Form to enter make, model, and distance */}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-96 mx-auto">
        <div>
          <h1 className='font-mono text-xl text-white mb-5'>Vehicle Emission Estimator</h1>
        </div>
        <div className="mb-4">
          <label className="block text-white font-mono mb-2">Vehicle Make:</label>
          {loadingMakes ? (
            <p className='text-white font-mono'>Loading makes...</p>
          ) : makes.length === 0 ? (
            <p className='text-white font-mono'>No makes available</p>
          ) : (
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make.data.id} value={make.data.id}>
                  {make.data.attributes.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white font-mono mb-2">Vehicle Model:</label>
          {loadingModels ? (
            <p className='font-mono text-white'>Loading models...</p>
          ) : models.length === 0 ? (
            <p className="font-mono text-white">No models available for the selected make</p>
          ) : (
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model.data.id} value={model.data.id}>
                  {model.data.attributes.name} ({model.data.attributes.year})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label className="block text-white  mb-2 font-mono">Distance:</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
          />
          <select
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="mi">Miles</option>
            <option value="km">Kilometers</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loadingEstimate}
          className="w-full px-4 py-3 mt-4 font-bold text-white border-2  rounded-md transition-colors duration-300  cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:bg-gray-100"
        >
          {loadingEstimate ? 'Calculating...' : 'Get Estimate'}
        </button>
      </form>


      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}



