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
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleFileSelect = (e) => {
  //   const file = [...e.target.files];

  //   console.log(file, "FILE");
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(
      ".file",
      file,
      "e.target.files",
      e.target.files,
      "[...e.target.files]",
      [...e.target.files]
    );
    setSelectedFiles([...e.target.files]);

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
            } else {
              flattenedCValuesArray.push(cellValue);
            }
          }

          setFlattenedCValues(flattenedCValuesArray);
        } catch (error) {
          console.error("XLSX faylini o'qishda xatolik yuz berdi:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create FormData object and append data
      let formData = new FormData();

      formData.append("type", "Расход рашировка");
      formData.append("year", selectedYears);
      formData.append("month", selectedMonth);
      formData.append("file", selectedFiles[0]);

      console.log(selectedFiles[0], "selectedFiles ");

      // Make the POST request
      const response = await axios.post("/archive", formData, {
        // timeout: 25000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Server response:", response.data);

      if (response.status === 200) {
        // Corrected the property name to 'status'
        try {
          // Use token directly without string interpolation
          const token = localStorage.getItem("token");

          const res = await axios.post(
            "/value",
            {
              year: selectedYears,
              month: selectedMonth,
              values: flattenedCValues,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (res.status === 200 || res.status === 201) {
            console.log(res.data);
            toast.success("Muvaffaqiyatli Adminga yuborildi", {
              type: "success",
            });
          }
        } catch (error) {
          // Toast message for submission error
          toast.error("Adminga yuborishda xatolik: " + error.message);
          console.error("Error:", error);
        }
      } else {
        // Handle other status codes if needed
        console.error("Server returned non-200 status:", response.status);
      }

      // Toast message for successful submission
      toast.success("Maʻlumotlar muvaffaqiyatli saqlandi", { type: "success" });
    } catch (error) {
      // Toast message for submission error
      toast.error(`Maʻlumotlarni yuborishda xatolik: ${error.message}`, {
        type: "error",
      });
      console.log("Error:", error.message);
    }
  };

  const handleSave = () => {
    // Check if the workbook is empty
    if (data.length === 0) {
      toast.warning("No data to save.", { type: "warning" });
      return;
    }

    // Create a new workbook
    const editedWorkbook = XLSX.utils.book_new();

    // Add a worksheet to the workbook
    const editedSheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(editedWorkbook, editedSheet, "Sheet1");

    // Define the file name
    const editedFileName = "edited_workbook.xlsx";

    // Use XLSX.writeFile to create and save the file
    XLSX.writeFile(editedWorkbook, editedFileName);
  };

  const currentYear = new Date().getFullYear(); // Hozirgi yilni olish
  const years = Array.from({ length: 10 }, (v, i) => currentYear + i); // 10 yil oldinga to‘liq miqdorda yillarni olish
  console.log(years);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setselectedYears] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearsChange = (event) => {
    setselectedYears(event.target.value);
  };

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const renderTable = () => {
    if (data.length === 0) {
      return;
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
      <div className="d-flex w-100 px-5 py-2">
        <input type="file" onChange={handleFileUpload} className="w-100" />
        <select
          className="form-control mx-3 rounded border-primary"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option selected disabled value="">
            Выберите месяц
          </option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          className="form-control mx-3 rounded border-primary"
          // value={selectedYears}
          onChange={handleYearsChange}
        >
          <option selected disabled value="">
            Выберите год
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {/* <Button variant="primary" onClick={handleSave} className="w-50">
          Yuklab Olish
        </Button> */}
        <Button variant="primary" onClick={handleSubmit} className="w-50">
          Joʻnatish
        </Button>
      </div>
      <div className="d-flex px-5 py-2 gap-5 w-100"></div>

      {renderTable()}
    </div>
  );
};

export default Razshirovka;
