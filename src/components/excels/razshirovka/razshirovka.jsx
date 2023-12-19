/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify";

const Razshirovka = () => {
  const [data, setData] = useState([]);
  const [flattenedCValues, setFlattenedCValues] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          setData(jsonData);
          console.log(jsonData, "Json Data");

          const cellLength = jsonData.length;
          const worksheet = workbook.Sheets[sheetName];

          const flattenedCValuesArray = [];
          for (let i = 2; i <= cellLength; i++) {
            let cellValue = worksheet[`C${i}`]?.v;
            if (cellValue === undefined) {
              cellValue = 0;
              flattenedCValuesArray.push(cellValue);
            }
            flattenedCValuesArray.push(cellValue);
          }

          setFlattenedCValues(flattenedCValuesArray);

          console.log(flattenedCValuesArray, "C qator Data");
          console.log(flattenedCValuesArray[0], "C qator 1 son");
          console.log(flattenedCValuesArray[1], "C qator 2 son");
          console.log(flattenedCValuesArray[2], "C qator 3 son");

          // // Uncomment the following lines when you're ready to send data to the backend
          try {
            await axios.post("/api/upload", { data: flattenedCValuesArray });
            toast("Data successfully sent to the backend", { type: "info" });
          } catch (error) {
            toast.error("Error sending data to the backend:", error);
          }
        } catch (error) {
          console.error("XLSX faylini o'qishda xatolik yuz berdi:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const blob = XLSX.write(wb, {
      bookType: "xlsx",
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "output.xlsx");
  };

  const renderTable = () => {
    if (data.length === 0) {
      return <p>Faylni yuklang</p>;
    }

    const headers = Object.keys(data[0]);

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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
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

export default Razshirovka;
