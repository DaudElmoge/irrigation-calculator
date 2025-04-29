import React, { useState } from "react";
import * as XLSX from "xlsx";
import IrrigationForm from "./components/IrrigationForm";

function App() {
  const [calculation, setCalculation] = useState(null);

  const handleExport = () => {
    if (!calculation) return;

    const worksheetData = [
      {
        Crop: calculation.crop,
        Soil: calculation.soil,
        Season: calculation.season,
        Area: calculation.area,
        "Days of Irrigation": calculation.days,
        "Water Needed (L/day)": calculation.totalWater,
        "Flow Rate (L/s)": calculation.flowRate,
        "Pipe Size Suggestion": calculation.pipeSize,
        "Infiltration Rate": calculation.infiltrationRate,
        "Holding Capacity": calculation.holdingCapacity
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Irrigation Report");

    XLSX.writeFile(workbook, "irrigation_calculation.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Akbari Irrigation Calculator 🌾💧
      </h1>

      <div className="max-w-xl mx-auto">
        <IrrigationForm onCalculate={setCalculation} />

        {calculation && (
          <button
            onClick={handleExport}
            className="mt-6 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Export to Excel
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
