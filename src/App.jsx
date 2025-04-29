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
    const worksheet = XLSX.utils.json_to_sheet([result]);//transform the result into a format suitable for Excel
    const workbook = XLSX.utils.book_new();//create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Irrigation Data");//append the worksheet to the workbook
    //generate the Excel file and trigger a download
    //the file will be named "irrigation_data.xlsx"
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
