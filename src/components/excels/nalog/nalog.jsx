/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";

const NalogSaver = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: null,
          });
          console.log(jsonData, "Json Data");

          setData(jsonData);
        } catch (error) {
          console.error("XLSX faylini o'qishda xatolik yuz berdi:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    // Convert the edited data to a sheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Use XLSX.writeFile to create and save the file
    XLSX.writeFile(wb, "exampleData.xlsx");
  };

  const renderTable = () => {
    if (data.length === 0) {
      return <p>Faylni yuklang</p>;
    }

    // Extract headers from the first row with non-empty values
    const headers = data[0].filter((header) => header !== null);

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) => (
                <td key={index}>{cell === null ? "" : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {renderTable()}
      <Button variant="primary" onClick={handleDownload}>
        Excel Faylni Yuklab Olish
      </Button>
    </div>
  );
};

export default NalogSaver;
