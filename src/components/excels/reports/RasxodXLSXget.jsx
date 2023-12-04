/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Math Operations");

import "./index.scss";
import { Button, Form } from "react-bootstrap";

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
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const binaryData = e.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        setData(excelData);
        setEditingData([...excelData]);
      };
      reader.readAsBinaryString(file);
    }
  };

  // file change end

  // handle Edit start
  const handleEdit = (rowIndex, columnName, value) => {
    setEditingData((prevEditingData) => {
      const updatedData = [...prevEditingData];
      updatedData[rowIndex][columnName] = value;
      return updatedData;
    });
  };
  // handle Edit end

  // save to excel start
  const handleSave = async () => {
    const editedWorkbook = new ExcelJS.Workbook();
    const editedSheet = editedWorkbook.addWorksheet("Sheet1");

    editingData.forEach((row) => {
      editedSheet.addRow(row);
    });

    // save to excel end

    // Edit data start
    const editedFileData = await editedWorkbook.xlsx.writeBuffer();
    const blob = new Blob([editedFileData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = editedFileName || "exampleData.xlsx";
    a.click();
  };
  // Edit data end

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
              <input type="file" id="myFileInput" />
            </div>
            <div className="d-flex flex-row align-items-center justify-center h-100">
              <button
                onClick={handleSave}
                className="btn btn-success h-75 mx-2 align-center"
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
