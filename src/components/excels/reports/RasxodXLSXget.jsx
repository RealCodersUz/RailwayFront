/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import FormData from "form-data";

// import ExcelJS from "exceljs";
const editedWorkbook = XLSX.utils.book_new();
const editedSheet = XLSX.utils.aoa_to_sheet([["Sheet1"]]);

import "./index.scss";
import { Button, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Workbook } from "exceljs";
import { Link } from "react-router-dom";

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
  { name: "Расходы", url: "/files/rasxod.xlsx" },
  { name: "Форма 69", url: "/files/forma69.xlsx" },
  { name: "Debit kredit", url: "/files/Debit_kredit.xlsx" },
  { name: "Основные инструменты", url: "/files/Osnovnie_sredstvo.xlsx" },
  { name: "Материальный отчет", url: "/files/Materialni_Otchet.xlsx" },
  { name: "Налог", url: "/files/Nalog.xlsx" },
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
  const [errorMsg, setErrorMsg] = useState(true);
  const [editingData, setEditingData] = useState([]);
  const [editedFileName, setEditedFileName] = useState("");
  const fileInputRef = useRef(null);
  const [type, setType] = useState("Rasxod");
  const [selectedType, setSelectedType] = useState({
    name: "Расходы",
    type: "rasxod",
    url: "/files/rasxod.xlsx",
  });
  // const [imageFile, setImageFile] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const foundReport = reportsData.find((report) => report.name === type);
    if (foundReport) {
      console.log("Topilgan ma'lumot: ", foundReport);
      setSelectedType(foundReport);
    } else {
      console.log("Bunday nomli ma'lumot topilmadi");
    }
  }, [type]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  // file change start
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFiles([...e.target.files]);

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

        try {
          const worksheet = workbook.Sheets[sheetName];

          // Ustunlarni aniqlash
          const columns = [];
          for (let key in worksheet) {
            if (key[0] === "!") continue;

            const col = key.slice(0, 1);

            console.log(col, "column");

            // Check if the column letter is not A or B
            if (
              col !== "A" &&
              col !== "B" &&
              col !== "J" &&
              !columns.includes(col)
            ) {
              columns.push(col);
            }
          }

          const cellLength = excelData.length;

          console.log(columns);

          // Qatorlarni jamlash
          for (let i = 0; i < cellLength; i++) {
            const currentRow = i + 2; // Excel rows are 1-indexed

            const totalSum = columns.reduce((sum, col) => {
              // Check if the cell exists for the given column and current row
              const cellKey = col + currentRow;
              if (worksheet[cellKey]) {
                const cellValue = worksheet[cellKey].v;
                // Add the cell value to the sum
                sum += +cellValue;
              }

              workbook.Sheets[sheetName]["J" + currentRow] = {
                t: "n",
                v: sum,
              };
              console.log("Barcha ustunlar jami:", sum, "sum");
              return sum;
            }, 0);
          }
        } catch (error) {
          toast.error("Itogoni chiqarishda xato", { type: "error" });
        }

        //  Boyiga Hisoblash start

        const cellLength = excelData.length;
        let CtotalSum = 0;
        let DtotalSum = 0;
        let EtotalSum = 0;
        let FtotalSum = 0;
        let GtotalSum = 0;
        let HtotalSum = 0;
        let ItotalSum = 0;
        let JtotalSum = 0;

        for (let i = 2; i < cellLength; i++) {
          let CcellValueS = `C${i}`;
          let DcellValueS = `D${i}`;
          let EcellValueS = `E${i}`;
          let FcellValueS = `F${i}`;
          let GcellValueS = `G${i}`;
          let HcellValueS = `H${i}`;
          let IcellValueS = `I${i}`;
          let JcellValueS = `J${i}`;

          // Check if the cell exists in the sheet
          if (
            workbook.Sheets[sheetName][CcellValueS] &&
            workbook.Sheets[sheetName][DcellValueS] &&
            workbook.Sheets[sheetName][EcellValueS] &&
            workbook.Sheets[sheetName][FcellValueS] &&
            workbook.Sheets[sheetName][GcellValueS] &&
            workbook.Sheets[sheetName][HcellValueS] &&
            workbook.Sheets[sheetName][IcellValueS] &&
            workbook.Sheets[sheetName][JcellValueS]
          ) {
            // Validate that the values are valid numbers
            const isValidNumber = (cell) =>
              typeof cell == "number" && !isNaN(cell);

            // C cell
            let CvalueS = workbook.Sheets[sheetName][CcellValueS].v;
            console.log(CvalueS);

            // D cell
            let DvalueS = workbook.Sheets[sheetName][DcellValueS].v;
            console.log(DvalueS);

            // E cell
            let EvalueS = workbook.Sheets[sheetName][EcellValueS].v;
            console.log(EvalueS);

            // F cell
            let FvalueS = workbook.Sheets[sheetName][FcellValueS].v;
            console.log(FvalueS);

            // G cell
            let GvalueS = workbook.Sheets[sheetName][GcellValueS].v;
            console.log(GvalueS);

            // H cell
            let HvalueS = workbook.Sheets[sheetName][HcellValueS].v;
            console.log(HvalueS);

            // I cell
            let IvalueS = workbook.Sheets[sheetName][IcellValueS].v;
            console.log(IvalueS);

            // //J cell
            let JvalueS = workbook.Sheets[sheetName][JcellValueS].v;
            console.log(JvalueS);

            // Validate values
            if (
              isValidNumber(CvalueS) &&
              isValidNumber(DvalueS) &&
              isValidNumber(EvalueS) &&
              isValidNumber(FvalueS) &&
              isValidNumber(GvalueS) &&
              isValidNumber(HvalueS) &&
              isValidNumber(IvalueS) &&
              isValidNumber(JvalueS)
            ) {
              // Calculate total sums
              CtotalSum += CvalueS;
              DtotalSum += DvalueS;
              EtotalSum += EvalueS;
              FtotalSum += FvalueS;
              GtotalSum += GvalueS;
              HtotalSum += HvalueS;
              ItotalSum += IvalueS;
              JtotalSum += JvalueS;
            } else {
              return toast(
                `Faylda Xatolik, Qatorlarda ortiqcha harflar, belgilar yoki boʻsh kataklar mavjud.
                Iltimos toʻgʻirlab  qayta import qiling.`,
                { type: "error" }
              );
            }
          }
        }

        // Add totalSum
        const lastRowIndex = cellLength + 1;

        // C
        const lastCCell = `C${lastRowIndex}`;
        workbook.Sheets[sheetName][lastCCell] = {
          t: "n",
          v: typeof CtotalSum === "number" ? CtotalSum : 0,
        };

        // D
        const lastDCell = `D${lastRowIndex}`;
        workbook.Sheets[sheetName][lastDCell] = {
          t: "n",
          v: typeof DtotalSum === "number" ? DtotalSum : 0,
        };

        // E
        const lastECell = `E${lastRowIndex}`;
        workbook.Sheets[sheetName][lastECell] = {
          t: "n",
          v: typeof EtotalSum === "number" ? EtotalSum : 0,
        };

        // F
        const lastFCell = `F${lastRowIndex}`;
        workbook.Sheets[sheetName][lastFCell] = {
          t: "n",
          v: typeof FtotalSum === "number" ? FtotalSum : 0,
        };

        // G
        const lastGCell = `G${lastRowIndex}`;
        workbook.Sheets[sheetName][lastGCell] = {
          t: "n",
          v: typeof GtotalSum === "number" ? GtotalSum : 0,
        };

        // H
        const lastHCell = `H${lastRowIndex}`;
        workbook.Sheets[sheetName][lastHCell] = {
          t: "n",
          v: typeof HtotalSum === "number" ? HtotalSum : 0,
        };

        // I
        const lastICell = `I${lastRowIndex}`;
        workbook.Sheets[sheetName][lastICell] = {
          t: "n",
          v: typeof ItotalSum === "number" ? ItotalSum : 0,
        };

        // J
        const lastJCell = `J${lastRowIndex}`;
        workbook.Sheets[sheetName][lastJCell] = {
          t: "n",
          v: typeof JtotalSum === "number" ? JtotalSum : 0,
        };

        try {
          toast(`Muvvafaqiyatli`, { type: "success" });
          excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          setData(excelData);
          setEditingData([...excelData]);
        } catch (error) {
          return toast(
            `Qoʻshishda Xatolik, Qatorlarda ortiqcha harflar, belgilar yoki boʻsh kataklar mavjud.
                Iltimos toʻgʻirlab  qayta import qiling.`,
            { type: "error" }
          );
        }

        // const worksheet = workbook.Sheets[sheetName];

        // // Ustunlarni aniqlash
        // const columns = [];
        // for (let key in worksheet) {
        //   if (key[0] === "!") continue;

        //   const col = key.slice(0, 1);

        //   console.log(col, "column");

        //   // Check if the column letter is not A or B
        //   if (col !== "A" && col !== "B" && !columns.includes(col)) {
        //     columns.push(col);
        //   }
        // }

        // console.log(columns); // This will log the unique columns excluding A and B

        // // Qatorlarni jamlash
        // const totalSum = columns.reduce((sum, col) => {
        //   // Check if the cell exists for the given column and row 2
        //   if (worksheet[col + "2"]) {
        //     const cellValue = worksheet[col + "2"].v;
        //     // Add the cell value to the sum
        //     sum += +cellValue;
        //   }
        //   return sum;
        // }, 0);

        // console.log("Barcha ustunlar jami:", totalSum);

        //
      } catch (error) {
        return toast(
          `Faylda Xatolik, Qatorlarda ortiqcha harflar, belgilar yoki boʻsh kataklar mavjud.
              Iltimos toʻgʻirlab  qayta import qiling.`,
          { type: "error" }
        );
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
    // Check if the workbook is empty
    if (editedWorkbook.SheetNames.length === 0) {
      toast.warning("No data to save.", { type: "warning" });
      return;
    }

    // Use XLSX.writeFile to create and save the file
    XLSX.writeFile(editedWorkbook, editedFileName);
  };

  const currentYear = new Date().getFullYear(); // Hozirgi yilni olish
  const years = Array.from({ length: 10 }, (v, i) => currentYear + i); // 10 yil oldinga to‘liq miqdorda yillarni olish
  console.log(years);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setselectedYears] = useState(currentYear);

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

  // let formData = new FormData();

  // formData.append("branch_name", branchName);
  // formData.append("type", selectedType);
  // formData.append("year", selectedYears);
  // formData.append("month", selectedMonth);
  // formData.append("file", selectedFiles[0]);

  const handleSubmit = async () => {
    try {
      // Create FormData object and append data
      let formData = new FormData();

      formData.append("type", selectedType.name);
      formData.append("year", selectedYears);
      formData.append("month", selectedMonth);
      formData.append("file", selectedFiles[0]);

      console.log(selectedType, "selectedType");

      // Make the POST request
      const response = await axios.post("/archive", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Server response:", response.data);

      // Toast message for successful submission
      toast.success("Data submitted successfully", { type: "success" });
    } catch (error) {
      // Toast message for submission error
      toast.error("Error submitting data. Please try again.", {
        type: "error",
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className=" p-5">
          <h1 className="text-center">Отчеты</h1>
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              onChange={(e) => setType(e.target.value)}
            >
              <option selected disabled value="">
                <p>Выберите тип</p>
              </option>
              {reportsData.map((data, index) => (
                <option key={index} value={data.key}>
                  {data.name}
                </option>
              ))}
            </select>
            {/* <label>Month:</label> */}
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

            {/* <label>Year:</label> */}
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

            <button className="btn btn-primary mx-3 w-25 rounded" type="button">
              Поиск
            </button>
          </div>

          <p className="text-danger fw-semibold text-center" hidden={errorMsg}>
            Отправка недоступна. Крайний срок истек.
          </p>
          <div className="px-5 w-100 py-5">
            <h5 className="text-danger">
              Eslatib oʻtaman faylda ortiqcha belgi, ortiqcha son kiritilishi
              kerak boʻlgan joyga belgi harf tushib qolmaganini tekshiring!{" "}
            </h5>
            <br />
            <br />
            <form className="w-100 border-bottom border-secondary d-flex flex-row justify-content-between pb-2">
              <div className="file-input-wrapper"></div>

              <div className="d-flex flex-row align-items-center justify-center h-100">
                <br />

                <Link
                  to={"https://railwayback.up.railway.app" + selectedType.url}
                  // onClick={handleSave}
                  className="btn btn-success h-75 mx-2 align-center"
                >
                  Скачать шаблон
                </Link>

                <input
                  type="file"
                  id="myFileInput"
                  accept=".xls, .xlsx"
                  onChange={handleFileChange}
                />
              </div>
            </form>
          </div>
          <div>
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
                            handleEdit(
                              rowIndex,
                              "Износ осн.ср-в",
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
          <div
            className="d-flex flex-row-reverse gap-3 w-full"
            hidden={selectedFiles != []}
          >
            <button className="btn btn-danger">Повторить попытку</button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Отправить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RasxodXLSXget;
