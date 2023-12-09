/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
// import ExcelJS from "exceljs";
const editedWorkbook = XLSX.utils.book_new();
const editedSheet = XLSX.utils.aoa_to_sheet([["Sheet1"]]);

import "./index.scss";
import { Button, Form, Row } from "react-bootstrap";

// table styles start
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  margin: "20px 0",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: "#00f",
  fontWeight: "bold",
};

const inputStyle = {
  border: "none",
  padding: "8px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  marginTop: "20px",
  width: "15rem",
  height: "3rem",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

// table styles end

const reportsData = [
  { name: "Отчеты", url: "/reports" },
  { name: "Форма 69", url: "/forma69" },
  { name: "Основные инструменты", url: "/insurments" },
  { name: "Материальный отчет", url: "/material-reports" },
  { name: "Налог", url: "/nalog" },
];

// const months = [
//   { key: "monthSelected", name: "Выберите месяц" },
//   { key: "january", name: "Январь" },
//   { key: "february", name: "Февраль" },
//   { key: "march", name: "Март" },
//   { key: "april", name: "Апрель" },
//   { key: "may", name: "Май" },
//   { key: "june", name: "Июнь" },
//   { key: "july", name: "Июль" },
//   { key: "august", name: "Август" },
//   { key: "september", name: "Сентябрь" },
//   { key: "october", name: "Октябрь" },
//   { key: "november", name: "Ноябрь" },
//   { key: "december", name: "Декабрь" },
// ];

// const years = [
//   { key: "yearSelected", name: "Выберите год" },
//   { key: "2022", name: "2022" },
//   { key: "2023", name: "2023" },
// ];

const RasxodXLSXget = () => {
  const [data, setData] = useState([]);
  const [editingData, setEditingData] = useState([]);
  const [editedFileName, setEditedFileName] = useState("");
  const fileInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  // file change start
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("File not selected.");
      return;
    }

    // Check if the file type is supported (xlsx)

    if (!file.name.endsWith(".xlsx")) {
      console.error(
        "Unsupported file type. Please upload an Excel file (.xlsx)."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const binaryData = e.target.result;
        const data = new Uint8Array(binaryData);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0]; // Assuming you are working with the first sheet
        let excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log(excelData, "bu yerda ");

        const cellLength = excelData.length;

        for (let i = 0; i < cellLength; i++) {
          let JcellCalueS = `J${i}`;
        }

        // Add totalSum to the last row of column B
        const lastRowIndex = cellLength + 1;
        const lastJCell = `J${lastRowIndex}`;

        let lastJCellValue = workbook.Sheets[sheetName][lastJCell].v;

        console.log(lastJCellValue);

        excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setData(excelData);
        setEditingData([...excelData]);
      } catch (error) {
        console.error("Error reading the Excel file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // file change end

  // handle Edit start
  const handleEdit = (rowIndex, columnName, value) => {
    setEditingData((prevEditingData) => {
      const updatedData = [...prevEditingData];
      updatedData[rowIndex][columnName] = value;
      console.log(([rowIndex][columnName] = value), "bu value");
      return updatedData;
    });
  };
  // handle Edit end

  // Handle Save
  const handleSave = () => {
    // Convert the edited data to a sheet
    const editedSheet = XLSX.utils.json_to_sheet(editingData);

    // Add the sheet to the workbook
    XLSX.utils.book_append_sheet(editedWorkbook, editedSheet, "Sheet1");

    // Get the added sheet
    const addedSheet = editedWorkbook.Sheets["Sheet1"];

    // Get the range of the added sheet
    const addedRange = XLSX.utils.decode_range(addedSheet["!ref"]);

    // Get the last row number of the added sheet
    const lastRow = addedRange.e.r + 1;

    // Add "HAA" to the last row in the first column
    XLSX.utils.sheet_add_aoa(
      addedSheet,
      [["HAA Bu yerda Excel haqida malumot bor "]],
      {
        origin: -1,
        top: lastRow,
      }
    );

    // Use XLSX.writeFile to create and save the file
    XLSX.writeFile(editedWorkbook, editedFileName || "exampleData.xlsx");
  };

  // Save data end

  // Select Mont start

  const [selectedMonth, setSelectedMonth] = useState("selected");
  const [selectedYears, setselectedYears] = useState("selected");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearsChange = (event) => {
    setselectedYears(event.target.value);
  };

  // Select Mont end

  return (
    <>
      <div className="container">
        <div className=" p-5">
          <h1 className="text-center">Отчеты</h1>
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
            >
              {reportsData.map((data, index) => (
                <option key={index} value={data.key}>
                  {data.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="form-control mx-3 rounded border-primary"
            />
            <button className="btn btn-primary mx-3 w-25 rounded" type="button">
              Поиск
            </button>
          </div>
        </div>
        <p className="text-danger fw-semibold text-center" hidden={true}>
          Отправка недоступна. Крайний срок истек.
        </p>
        <div className="px-5 w-100 py-5">
          <form className="w-100 border-bottom border-secondary d-flex flex-row justify-content-between pb-2">
            <div className="file-input-wrapper">
              <input
                type="file"
                id="myFileInput"
                accept=".xls, .xlsx"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex flex-row align-items-center justify-center h-100">
              <button
                onClick={handleSave}
                className="btn btn-success h-75 mx-2 align-center onClick={handleSave}"
              >
                Скачать шаблон
              </button>

              <button className="btn btn-primary h-75 mx-2 align-center">
                Загрузить
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="cards ">
            <div className="d-flex justify-content-end gap-5 row"></div>

            {/* 
            <div className="d-flex justify-content-start gap-1">
              <div className="">
                <input
                  className="excelInputs"
                  style={buttonStyle}
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={handleFileChange}
                />
              </div>
              <div className="">
                <button style={buttonStyle} onClick={handleSave}>
                  Скачать шаблон
                </button>
              </div>{" "}
              <div className="">
                <button style={buttonStyle} onClick={handleSave}>
                  Загрузить шаблон
                </button>
              </div>
            </div> */}
          </div>

          {data.length > 0 && (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={headerCellStyle}>№</th>
                  <th style={headerCellStyle}>Наименование затрать</th>
                  <th style={headerCellStyle}>Зарплата</th>
                  <th style={headerCellStyle}>Соц-страх</th>
                  <th style={headerCellStyle}>Материалы</th>
                  <th style={headerCellStyle}>Топливо</th>
                  <th style={headerCellStyle}>Эл/энергия</th>
                  <th style={headerCellStyle}>Износ осн.ср-в</th>
                  <th style={headerCellStyle}>Прочие</th>
                  <th style={headerCellStyle}>Итого</th>
                </tr>
              </thead>
              <tbody>
                {editingData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={cellStyle}>{row["№"]}</td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Наименование затрать"]}
                        onChange={(e) =>
                          handleEdit(
                            rowIndex,
                            "Наименование затрать",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Зарплата"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Зарплата", e.target.value)
                        }
                      />
                    </td>

                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Соц-страх"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Соц-страх", e.target.value)
                        }
                      />
                    </td>

                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Материалы"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Материалы", e.target.value)
                        }
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Топливо"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Топливо", e.target.value)
                        }
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Эл/энергия"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Эл/энергия", e.target.value)
                        }
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Износ осн.ср-в"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Износ осн.ср-в", e.target.value)
                        }
                      />
                    </td>
                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Прочие"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Прочие", e.target.value)
                        }
                      />
                    </td>

                    <td style={cellStyle}>
                      <input
                        className="excelInputs"
                        style={inputStyle}
                        type="text"
                        value={row["Итого"]}
                        onChange={(e) =>
                          handleEdit(rowIndex, "Итого", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default RasxodXLSXget;
