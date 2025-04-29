import React, { useState } from "react";
import IrrigationForm from "./components/IrrigationForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton";
import * as XLSX from "xlsx";

function App() {
  const [result, setResult] = useState(null);

  const handleCalculate = (preview) => {
    setResult(preview);
  };

  const exportToExcel = () => {
    if (!result) return;
    const worksheet = XLSX.utils.json_to_sheet([result]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Irrigation Data");
    XLSX.writeFile(workbook, "irrigation_data.xlsx");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <IrrigationForm onCalculate={handleCalculate} />
        {result && <FloatingButton onClick={exportToExcel} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
