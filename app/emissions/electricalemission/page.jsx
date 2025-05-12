"use client";
import { useState } from "react";

const ElectricityEstimateForm = () => {
  const [electricityValue, setElectricityValue] = useState("");
  const [electricityUnit, setElectricityUnit] = useState("mwh");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [carbonData, setCarbonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);

  // Country and state data
  const countryStateData = [
    {
      country: 'us',
      name: 'United States of America',
      states: [
        { code: 'al', name: 'Alabama' },
        { code: 'ak', name: 'Alaska' },
        { code: 'az', name: 'Arizona' },
        { code: 'ar', name: 'Arkansas' },
        { code: 'ca', name: 'California' },
        { code: 'co', name: 'Colorado' },
        { code: 'ct', name: 'Connecticut' },
        { code: 'de', name: 'Delaware' },
        { code: 'fl', name: 'Florida' },
        { code: 'ga', name: 'Georgia' },
        { code: 'hi', name: 'Hawaii' },
        { code: 'id', name: 'Idaho' },
        { code: 'il', name: 'Illinois' },
        { code: 'in', name: 'Indiana' },
        { code: 'ia', name: 'Iowa' },
        { code: 'ks', name: 'Kansas' },
        { code: 'ky', name: 'Kentucky' },
        { code: 'la', name: 'Louisiana' },
        { code: 'me', name: 'Maine' },
        { code: 'md', name: 'Maryland' },
        { code: 'ma', name: 'Massachusetts' },
        { code: 'mi', name: 'Michigan' },
        { code: 'mn', name: 'Minnesota' },
        { code: 'ms', name: 'Mississippi' },
        { code: 'mo', name: 'Missouri' },
        { code: 'mt', name: 'Montana' },
        { code: 'ne', name: 'Nebraska' },
        { code: 'nv', name: 'Nevada' },
        { code: 'nh', name: 'New Hampshire' },
        { code: 'nj', name: 'New Jersey' },
        { code: 'nm', name: 'New Mexico' },
        { code: 'ny', name: 'New York' },
        { code: 'nc', name: 'North Carolina' },
        { code: 'nd', name: 'North Dakota' },
        { code: 'oh', name: 'Ohio' },
        { code: 'ok', name: 'Oklahoma' },
        { code: 'or', name: 'Oregon' },
        { code: 'pa', name: 'Pennsylvania' },
        { code: 'ri', name: 'Rhode Island' },
        { code: 'sc', name: 'South Carolina' },
        { code: 'sd', name: 'South Dakota' },
        { code: 'tn', name: 'Tennessee' },
        { code: 'tx', name: 'Texas' },
        { code: 'ut', name: 'Utah' },
        { code: 'vt', name: 'Vermont' },
        { code: 'va', name: 'Virginia' },
        { code: 'wa', name: 'Washington' },
        { code: 'wv', name: 'West Virginia' },
        { code: 'wi', name: 'Wisconsin' },
        { code: 'wy', name: 'Wyoming' },
      ],
    },
    {
      country: 'ca',
      name: 'Canada',
      states: [],
    },
    {
      country: 'at',
      name: 'Austria',
      states: [],
    },
    {
      country: 'be',
      name: 'Belgium',
      states: [],
    },
    {
      country: 'bg',
      name: 'Bulgaria',
      states: [],
    },
    {
      country: 'hr',
      name: 'Croatia',
      states: [],
    },
    {
      country: 'cy',
      name: 'Cyprus',
      states: [],
    },
    {
      country: 'cz',
      name: 'Czechia',
      states: [],
    },
    {
      country: 'dk',
      name: 'Denmark',
      states: [],
    },
    {
      country: 'eu-27',
      name: 'EU-27',
      states: [],
    },
    {
      country: 'eu-27+1',
      name: 'EU27+1',
      states: [],
    },
    {
      country: 'ee',
      name: 'Estonia',
      states: [],
    },
    {
      country: 'fi',
      name: 'Finland',
      states: [],
    },
    {
      country: 'fr',
      name: 'France',
      states: [],
    },
    {
      country: 'de',
      name: 'Germany',
      states: [],
    },
    {
      country: 'gr',
      name: 'Greece',
      states: [],
    },
    {
      country: 'gu',
      name: 'Hungary',
      states: [],
    },
    {
      country: 'ie',
      name: 'Ireland',
      states: [],
    },
    {
      country: 'it',
      name: 'Italy',
      states: [],
    },
    {
      country: 'lv',
      name: 'Latvia',
      states: [],
    },
    {
      country: 'lt',
      name: 'Lithuania',
      states: [],
    },
    {
      country: 'lu',
      name: 'Luxembourg',
      states: [],
    },
    {
      country: 'mt',
      name: 'Malta',
      states: [],
    },
    {
      country: 'nl',
      name: 'Netherlands',
      states: [],
    },
    {
      country: 'pl',
      name: 'Poland',
      states: [],
    },
    {
      country: 'pt',
      name: 'Portugal',
      states: [],
    },
    {
      country: 'ro',
      name: 'Romania',
      states: [],
    },
    {
      country: 'sk',
      name: 'Slovakia',
      states: [],
    },
    {
      country: 'si',
      name: 'Slovenia',
      states: [],
    },
    {
      country: 'es',
      name: 'Spain',
      states: [],
    },
    {
      country: 'se',
      name: 'Sweden',
      states: [],
    },
    {
      country: 'gb',
      name: 'United Kingdom',
      states: [],
    },
  ];


  // Handle country selection and update available states
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    const selectedCountryData = countryStateData.find(
      (data) => data.country === selectedCountry
    );
    setStates(selectedCountryData ? selectedCountryData.states : []);
    setState(""); // Reset state when country changes
  };

  // Fetch carbon data
  const fetchCarbonData = async () => {
    if (!electricityValue || !country) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/carbon/electricalemissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electricity_value: electricityValue,
          electricity_unit: electricityUnit,
          country: country,
          state: state || "",
          type: "electricity",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        sessionStorage.setItem("carbonData", JSON.stringify(result));
        setCarbonData(result);
      } else {
        alert("Error fetching carbon estimate: " + result.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Error fetching data.");
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCarbonData();
  };
  const getCountryAndStateNames = (countryCode, stateCode) => {
    const countryData = countryStateData.find(
      (country) => country.country.toLowerCase() === countryCode.toLowerCase()
    );

    const countryName = countryData ? countryData.name : "Unknown Country";

    let stateName = "N/A";
    if (countryData && countryData.states && stateCode) {
      const stateData = countryData.states.find(
        (state) => state.code.toLowerCase() === stateCode.toLowerCase()
      );
      stateName = stateData ? stateData.name : "Unknown State";
    }

    return { countryName, stateName };
  };
  return (
    <div className="min-h-screen overflow-y-auto">
      {!carbonData ? (
        <>
          <div className="flex justify-center text-white mt-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
              <div className="flex justify-center mb-8">
                <h1 className="font-mono text-3xl text-center text-white">
                  Electricity Carbon Estimate
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Electricity Value */}
                <div className="flex flex-col mb-6">
                  <label className="text-xl font-mono mb-2">Electricity Value</label>
                  <input
                    type="number"
                    className="p-3 rounded-lg border border-gray-400 text-black"
                    value={electricityValue}
                    onChange={(e) => setElectricityValue(e.target.value)}
                    required
                    placeholder="Enter value in MWh or kWh"
                  />
                </div>

                {/* Electricity Unit */}
                <div className="flex flex-col mb-6">
                  <label className="text-xl font-mono mb-2">Electricity Unit</label>
                  <select
                    className="p-3 rounded-lg border border-gray-400 text-black"
                    value={electricityUnit}
                    onChange={(e) => setElectricityUnit(e.target.value)}
                  >
                    <option value="mwh">MWh</option>
                    <option value="kwh">kWh</option>
                  </select>
                </div>

                {/* Country */}
                <div className="flex flex-col mb-6">
                  <label className="text-xl font-mono mb-2">Country</label>
                  <select
                    className="p-3 rounded-lg border border-gray-400 text-black"
                    value={country}
                    onChange={handleCountryChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countryStateData.map((countryData) => (
                      <option key={countryData.country} value={countryData.country}>
                        {countryData.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State */}
                {states.length > 0 && (
                  <div className="flex flex-col mb-6">
                    <label className="text-xl font-mono mb-2">State</label>
                    <select
                      className="p-3 rounded-lg border border-gray-400 text-black"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((stateData) => (
                        <option key={stateData.code} value={stateData.code}>
                          {stateData.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white-500 hover:bg-white-600 text-white font-bold py-3 mt-3 rounded-lg w-full transition duration-300"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center bg-[#26272b] shadow-[0px_0px_12px_#18191b] rounded-lg mx-11 my-5 p-3">
            <h2 className="text-white font-bold text-xl">Carbon Emission Details</h2>
          </div>
          {carbonData && carbonData.data && carbonData.data.attributes ? (
            (() => {
              const {
                country = countryData.name,
                state = "N/A",
                electricity_unit = "N/A",
                electricity_value = "N/A",
                estimated_at,
                carbon_g = "N/A",
                carbon_lb = "N/A",
                carbon_kg = "N/A"
              } = carbonData.data.attributes;

              // Formatting the date if it's available
              const estimatedAtFormatted = estimated_at
                ? new Date(estimated_at).toLocaleString()
                : "N/A";
              const { countryName, stateName } = getCountryAndStateNames(country, state);

              return (
                <div className="space-y-4">
                  {[
                    { label: "Country", value: countryName },
                    { label: "State", value: stateName },
                    { label: "Electricity Unit", value: electricity_unit },
                    { label: "Electricity Value", value: electricity_value },
                    { label: "Estimated At", value: estimatedAtFormatted },
                    { label: "Carbon (grams)", value: carbon_g },
                    { label: "Carbon (pounds)", value: carbon_lb },
                    { label: "Carbon (kilograms)", value: carbon_kg },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex text-white justify-between items-center cursor-pointer bg-[#26272b] hover:bg-[#32333b] shadow-[0px_0px_12px_#18191b] hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out rounded-lg mx-11 my-5 p-3"
                    >
                      <div><p><strong>{item.label}:</strong></p></div>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
              )
              ;
            })()
          ) : (
            <div className="flex text-white justify-between items-center bg-[#26272b] shadow-[0px_0px_12px_#18191b] rounded-lg mx-11 my-5 p-3">
              <div><p><strong>Data Not Available or Incomplete</strong></p></div> 
            </div>

          )}
        </div>
      )}
    </div>

  );
}
export default ElectricityEstimateForm;



