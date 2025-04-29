import React, { useState, useEffect } from "react";
import crops from "../data/crops.json";
import soils from "../data/soils.json";

function IrrigationForm({ onCalculate }) {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [area, setArea] = useState("");
  const [days, setDays] = useState("");
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    if (selectedCrop && selectedSoil && area && days) {
      const cropData = crops.find((c) => c.name === selectedCrop);
      const soilData = soils.find((s) => s.type === selectedSoil);
      const totalWater = (cropData.waterRequirement * parseFloat(area)) / parseFloat(days); // liters per day
      const flowRate = (totalWater / 3600).toFixed(2); // liters/sec
      const pipeSize = suggestPipeSize(flowRate);

      const result = {
        crop: selectedCrop,
        soil: selectedSoil,
        area: parseFloat(area),// acres
        days: parseFloat(days),// days
        totalWater: totalWater.toFixed(2),
        flowRate,
        pipeSize,
        season: cropData.season,
        infiltrationRate: soilData.infiltrationRate,
        holdingCapacity: soilData.holdingCapacity
      };

      setCalculation(result);
      onCalculate(result);
    }
  }, [selectedCrop, selectedSoil, area, days, onCalculate]);

  const suggestPipeSize = (flowRate) => {
    const fr = parseFloat(flowRate);
    if (fr <= 0.3) return "1/2 inch";
    if (fr <= 0.6) return "3/4 inch";
    if (fr <= 1.5) return "1 inch";
    if (fr <= 3) return "1.5 inch";
    return "2 inch or above";
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Irrigation Calculator</h2>

      <div className="mb-4">
        <label className="block font-medium">Crop</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select crop</option>
          {crops.map((crop) => (
            <option key={crop.name} value={crop.name}>
              {crop.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Soil Type</label>
        <select
          value={selectedSoil}
          onChange={(e) => setSelectedSoil(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select soil</option>
          {soils.map((soil) => (
            <option key={soil.type} value={soil.type}>
              {soil.type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Area (in acres)</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter area"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Days of irrigation</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter number of days"
        />
      </div>

      {calculation && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <p><strong>Crop:</strong> {calculation.crop}</p>
          <p><strong>Soil:</strong> {calculation.soil}</p>
          <p><strong>Season:</strong> {calculation.season}</p>
          <p><strong>Infiltration Rate:</strong> {calculation.infiltrationRate}</p>
          <p><strong>Holding Capacity:</strong> {calculation.holdingCapacity}</p>
          <p><strong>Total Water Needed:</strong> {calculation.totalWater} L/day</p>
          <p><strong>Flow Rate:</strong> {calculation.flowRate} L/s</p>
          <p><strong>Suggested Pipe Size:</strong> {calculation.pipeSize}</p>
        </div>
      )}
    </div>
  );
}

export default IrrigationForm;
