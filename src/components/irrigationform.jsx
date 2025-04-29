import React from "react";
import * as XLSX from "xlsx";
import { useState } from "react";

const IrrigationForm = () => {
    const [formData, setFormData] = useState({
        farmSize: "",
        cropType: "",
        soilType: "",
        irrigationMethod: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const calculateIrrigation = () => {
        const waterNeeds = {
            maize: 6000,
            tomatoes: 8000,
            potatoes: 7000,
        };

        const cropWaterNeeds = waterNeeds[formData.cropType.toLowerCase()] || 5000;
        const totalWater = cropWaterNeeds * Number(formData.farmSize);
        const flowRate = (totalWater / (60 * 60)).toFixed(2);

        return {
            ...formData,
            dailyWaterNeed: `${totalWater} Liters/day`,
            flowRate: `${flowRate} Liters/s`,
        };
    };

    const downloadExcel = () => {
        const result = calculateIrrigation();
        const worksheet = XLSX.utils.json_to_sheet([result]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Irrigation Plan");
        XLSX.writeFile(workbook, "Irrigation_Calculator_Output.xlsx");
    };

    return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Irrigation Calculator</h2>
        
              <div className="space-y-4">
                <input
                  type="number"
                  name="farmSize"
                  placeholder="Farm Size (acres)"
                  className="w-full p-2 border rounded"
                  value={formData.farmSize}
                  onChange={handleChange}
                />
        
                <select
                  name="cropType"
                  className="w-full p-2 border rounded"
                  value={formData.cropType}
                  onChange={handleChange}
                >
                  <option value="">Select Crop</option>
                  <option value="maize">Maize</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="potatoes">Potatoes</option>
                </select>
        
                <select
                  name="soilType"
                  className="w-full p-2 border rounded"
                  value={formData.soilType}
                  onChange={handleChange}
                >
                  <option value="">Select Soil Type</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                </select>
        
                <select
                  name="irrigationMethod"
                  className="w-full p-2 border rounded"
                  value={formData.irrigationMethod}
                  onChange={handleChange}
                >
                  <option value="">Select Irrigation Method</option>
                  <option value="drip">Drip</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="flood">Flood</option>
                </select>
        
                <button
                  onClick={downloadExcel}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Calculate and Download Excel
                </button>
              </div>
            </div>
          );
        };
        
        export default IrrigationForm;