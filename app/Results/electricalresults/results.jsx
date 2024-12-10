"use client"
import { useEffect, useState } from 'react';

const Result = () => {
  const [carbonData, setCarbonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('carbonData');
    if (storedData) {
      setCarbonData(JSON.parse(storedData));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!carbonData) return <div>No data available.</div>;

  const { carbon_g, carbon_lb, carbon_kg, carbon_mt, electricity_value, electricity_unit } = carbonData.attributes;

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='text-white'>Carbon Emission Estimate</h1>
      <p className='text-white'><strong>Electricity Value:</strong> {electricity_value} {electricity_unit}</p>
      <p className='text-white'><strong>Carbon in grams:</strong> {carbon_g}</p>
      <p className='text-white'><strong>Carbon in pounds:</strong> {carbon_lb}</p>
      <p className='text-white'><strong>Carbon in kilograms:</strong> {carbon_kg}</p>
      <p className='text-white'><strong>Carbon in metric tons:</strong> {carbon_mt}</p>
    </div>
  );
};

export default Result;
