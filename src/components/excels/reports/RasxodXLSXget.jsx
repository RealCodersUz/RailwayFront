/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import "./index.scss";
import { Button, Form, Row, Table } from "react-bootstrap";
import { Workbook } from "exceljs";

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

// table styles end

const reportsData = [
  { name: "Расходы", url: "/files/rasxodData.xlsx", urlHref: "/reports" },
  { name: "Форма 69", url: "/files/forma69.xlsx", urlHref: "/forma69" },
  {
    name: "Debit kredit",
    url: "/files/Debit_kredit.xlsx",
    urlHref: "/debitKridet",
  },
  {
    name: "Основные инструменты",
    url: "/files/Osnovnie_sredstvo.xlsx",
    urlHref: "/insurments",
  },
  {
    name: "Материальный отчет",
    url: "/files/Materialni_Otchet.xlsx",
    urlHref: "/materialOtchet",
  },
  { name: "Налог", url: "/files/Nalog.xlsx", urlHref: "/nalog" },
  {
    name: "Расход рашировка",
    url: "/files/Nalog.xlsx",
    urlHref: "/rashirovka",
  },
];

const RasxodXLSXget = () => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [editingData, setEditingData] = useState([]);
  const [showButtonClicked, setShowButtonClicked] = useState(false);
  const [showColInfo, setShowColInfo] = useState(false);
  const [type, setType] = useState("Расходы");
  const [selectedType, setSelectedType] = useState({
    name: "Расходы",
    type: "rasxod",
    url: "/files/rasxodData.xlsx",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundReport = reportsData.find((report) => report.name === type);
    if (foundReport) {
      console.log("Topilgan ma'lumot: ", foundReport);
      setSelectedType(foundReport);

      navigate(foundReport.urlHref);
    } else {
      console.log("Bunday nomli ma'lumot topilmadi");
    }
  }, [type, navigate]);

  useEffect(() => {
    if (showButtonClicked) {
      handleReadLocalFile();
    }
  }, [showButtonClicked]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleShowButtonClick = () => {
    setShowButtonClicked(true);
  };

  const handleRepeatAttempt = () => {
    setShowButtonClicked(false);
    setData([]);
    setEditingData([]);

    const yilSelect = document.getElementById("yilSelect");
    if (yilSelect) {
      yilSelect.value = "";
    }

    setSelectedMonth("");

    const reports = document.getElementById("reports");
    if (reports) {
      reports.value = "Расходы";
    }
  };

  const handleReadLocalFile = () => {
    const file = "/files/rasxodData.xlsx";

    fetch(file)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (let i = 0; i < excelData.length; i++) {
          // excelData[i]["Наименование затрать"] = "";
          excelData[i]["Зарплата"] = "";
          excelData[i]["Соц-страх"] = "";
          excelData[i]["Материалы"] = "";
          excelData[i]["Топливо"] = "";
          excelData[i]["Эл/энергия"] = "";
          excelData[i]["Износ осн.ср-в"] = "";
          excelData[i]["Прочие"] = "";
          excelData[i]["Итого"] = "";
        }

        console.log(excelData, "excelData");
        setData(excelData);
        setEditingData([...excelData]);
      })
      .catch((error) => {
        toast.error(`Произошла ошибка при отправке данных: ${error.message}`, {
          type: "error",
        });

        console.error("Error reading local file:", error);
        setErrorMsg(true);
      });
  };

  const handleEdit = (rowIndex, columnName, value) => {
    setEditingData((prevEditingData) => {
      const updatedData = [...prevEditingData];

      // if (showColInfo) {
      updatedData[rowIndex][columnName] = value * 1;
      // }
      //     else {
      //       // Set the value only for the selected column, clear others

      //       updatedData[rowIndex][columnName] = value;
      //       const columnsToSet = [
      //         "Наименование затрать",
      //         "Зарплата",
      //         "Соц-страх",
      //         "Материалы",
      //         "Топливо",
      //         "Эл/энергия",
      //         "Износ осн.ср-в",
      //         "Прочие",
      //         "Итого",
      //       ];
      //       columnsToSet.forEach((column) => {
      //         if (column !== columnName) {
      //           updatedData[rowIndex][column] = "";
      //         }
      //       });

      //       setShowColInfo(true);
      //     }

      setEditingData(updatedData);
      console.log(updatedData, "UpdatedData");
      return updatedData;
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (v, i) => currentYear + i);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setSelectedYears] = useState(currentYear);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearsChange = (event) => {
    setSelectedYears(event.target.value);
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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log(
        "year",
        selectedYears,
        "month",
        selectedMonth,
        "values",
        editingData
      );

      const res = await axios.post(
        "/rasxod",
        {
          year: selectedYears,
          month: selectedMonth,
          file: editingData,
          values: [
            { Зарплата: salaries },
            { Соц_страх: socialInsurance },
            {
              Материалы: materials,
            },
            {
              Топливо: fuel,
            },
            {
              Эл_энергия: electricity,
            },
            {
              Износ_осн_ср_в: depreciation,
            },
            {
              Прочие: others,
            },
            {
              Итого: total,
            },
          ],
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setShowButtonClicked(false);

        setData([]);
        setEditingData([]);

        console.log(res.data);
        handleRepeatAttempt();
        toast.success("Muvaffaqiyatli Adminga yuborildi", {
          type: "success",
        });
      }
    } catch (error) {
      handleRepeatAttempt();
      toast.error(`Произошла ошибка при отправке данных: ${error.message}`, {
        type: "error",
      });
      console.log("Error:", error);
    }
  };

  // Extracting values from each row

  // const namesOfExpenses = data.map((row) => row["Наименование затрать"] || "");
  const salaries = data.map((row) => row["Зарплата"] || 0);
  const socialInsurance = data.map((row) => row["Соц-страх"] || 0);
  const materials = data.map((row) => row["Материалы"] || 0);
  const fuel = data.map((row) => row["Топливо"] || 0);
  const electricity = data.map((row) => row["Эл/энергия"] || 0);
  const depreciation = data.map((row) => row["Износ осн.ср-в"] || 0);
  const others = data.map((row) => row["Прочие"] || 0);
  const total = data.map((row) => row["Итого"] || 0);

  // console.log(namesOfExpenses, "Наименование затрать");
  console.log(salaries, "Зарплата");
  console.log(socialInsurance, "Соц_страх");
  console.log(materials, "Материалы");
  console.log(fuel, "Топливо");
  console.log(electricity, "Эл/энергия");
  console.log(depreciation, "Износ осн.ср-в");
  console.log(others, "Прочие");
  console.log(total, "Итого");

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
              {/* <option selected disabled value="">
                <p>Выберите тип</p>
              </option> */}
              {reportsData.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
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
              onChange={handleYearsChange}
              id="yilSelect"
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
            <button
              className="btn btn-primary mx-3 w-25 rounded"
              type="button"
              onClick={handleShowButtonClick}
            >
              Поиск
            </button>
          </div>
          <p className="text-danger fw-semibold text-center" hidden={errorMsg}>
            Отправка недоступна. Крайний срок истек.
          </p>
          <div className="px-5 w-100 py-5">
            <h5 className="text-danger">
              Напоминаю, убедитесь, что в файле нет лишних символов и лишних
              цифр!{" "}
            </h5>
            <br />
            <br />
            <form className="w-100 border-bottom border-secondary d-flex flex-row justify-content-between pb-5">
              <div className="file-input-wrapper"></div>
              <div className="d-flex flex-row align-items-center justify-center h-100">
                <br />
                <Link
                  to={"https://railwayback.up.railway.app/" + selectedType.url}
                  className="btn btn-success h-75 mx-2 align-center"
                >
                  Скачать шаблон
                </Link>
                <button
                  className="btn btn-primary mx-3 rounded"
                  type="button"
                  onClick={handleShowButtonClick}
                >
                  Показать шаблон
                </button>
              </div>
            </form>
          </div>

          {showButtonClicked == true ? (
            <div className="d-flex flex-row-reverse gap-3 w-full mb-5">
              <button
                className="btn btn-warning text-light"
                onClick={handleRepeatAttempt}
              >
                Повторить попытку
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                Отправить
              </button>
            </div>
          ) : (
            ""
          )}

          <div>
            {data.length > 0 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={cellStyle}>Наименование затрать</th>
                    <th style={cellStyle}>Зарплата</th>
                    <th style={cellStyle}>Соц-страх</th>
                    <th style={cellStyle}>Материалы</th>
                    <th style={cellStyle}>Топливо</th>
                    <th style={cellStyle}>Эл/энергия</th>
                    <th style={cellStyle}>Износ осн.ср-в</th>
                    <th style={cellStyle}>Прочие</th>
                    <th style={cellStyle}>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  {editingData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {/* <td style={cellStyle} className="text-center">{row["№"]}</td> */}

                      <td style={cellStyle} className="text-center">
                        {row["Наименование затрать"]}

                        {/* <input
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
                        /> */}
                      </td>

                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
                      <td style={cellStyle} className="text-center">
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
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RasxodXLSXget;
