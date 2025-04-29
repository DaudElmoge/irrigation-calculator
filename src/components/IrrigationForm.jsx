import React, { useEffect, useState } from "react";
import crops from "../data/crops.json";
import soils from "../data/soils.json";
import rainfallData from "../data/rainfall.json";

function IrrigationForm({ onCalculate }) {
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("acres");
  const [days, setDays] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (crop && soil && selectedCounty && area && days) {
      const cropData = crops.find(c => c.name === crop);
      const soilData = soils.find(s => s.type === soil);
      const countyData = rainfallData.find(c => c.county === selectedCounty);
      if (!cropData || !soilData || !countyData) return;

      let convertedArea = parseFloat(area);
      if (unit === "hectares") convertedArea *= 2.47105;
      if (unit === "sqm") convertedArea *= 0.000247105;

      const rainfallPerDay = countyData.rainfall / 365;
      const netWater = Math.max(cropData.waterRequirement - rainfallPerDay, 0);// ensure no negative water requirement
      const totalWater = (netWater * convertedArea) / parseFloat(days);// calculate total water needed
      const flowRate = totalWater / (60 * 60);// convert to L/sec
      const pipeSize = flowRate < 1 ? "1 inch" : flowRate < 2 ? "1.5 inch" : "2 inch";// determine pipe size based on flow rate

      const preview = {
        crop: cropData.name,
        season: cropData.season,
        soil: soilData.type,
        soilDescription: soilData.description,
        infiltrationRate: soilData.infiltrationRate,
        holdingCapacity: soilData.holdingCapacity,
        county: countyData.county,
        annualRainfall: countyData.rainfall,
        rainfallPerDay: rainfallPerDay.toFixed(2),// convert to mm/day
        area: `${area} ${unit}`,
        days,
        totalWater: totalWater.toFixed(2),// convert to L/day
        flowRate: flowRate.toFixed(2),// convert to L/sec
        pipeSize
      };

      setResult(preview);
      onCalculate(preview);
    }
  }, [crop, soil, selectedCounty, area, unit, days, onCalculate]);

  return (
    <form className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-4">💧 Irrigation Calculator</h2>

      {/* Crop */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Select Crop</label>
        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">-- Choose --</option>
          {crops.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Soil */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Select Soil Type</label>
        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">-- Choose --</option>
          {soils.map(s => <option key={s.type} value={s.type}>{s.type}</option>)}
        </select>
      </div>

      {/* County */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Select County</label>
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">-- Choose --</option>
          {rainfallData.map(c => <option key={c.county} value={c.county}>{c.county}</option>)}
        </select>
      </div>

      {/* Area and Units */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Farm Area</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., 1"
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
            <option value="sqm">m²</option>
          </select>
        </div>
      </div>

      {/* Days */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Irrigation Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="e.g., 30"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Preview */}
      {result && (
        <div className="bg-green-50 border border-green-300 p-4 rounded-lg mt-6 space-y-2">
          <h3 className="text-xl font-semibold text-green-800">📊 Irrigation Preview</h3>
          <p><span className="font-medium">Crop:</span> {result.crop}</p>
          <p><span className="font-medium">Season:</span> {result.season}</p>
          <p><span className="font-medium">Soil:</span> {result.soil}</p>
          <p className="text-sm italic text-gray-600">{result.soilDescription}</p>
          <p><span className="font-medium">Infiltration:</span> {result.infiltrationRate}</p>
          <p><span className="font-medium">Holding:</span> {result.holdingCapacity}</p>
          <p><span className="font-medium">County:</span> {result.county}</p>
          <p><span className="font-medium">Rainfall:</span> {result.annualRainfall} mm/yr (~{result.rainfallPerDay} mm/day)</p>
          <p><span className="font-medium">Area:</span> {result.area}</p>
          <p><span className="font-medium">Days:</span> {result.days}</p>
          <p><span className="font-medium">Water Required:</span> {result.totalWater} L/day</p>
          <p><span className="font-medium">Flow Rate:</span> {result.flowRate} L/sec</p>
          <p><span className="font-medium">Suggested Pipe Size:</span> {result.pipeSize}</p>
        </div>
      )}
    </form>
  );
}

export default IrrigationForm;
