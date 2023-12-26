/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const reportsData = [
  {
    name: "Расход рашировка",
    url: "/files/rasxod_rashirovka.xlsx",
    urlHref: "/rashirovka",
  },
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
];

const Razshirovka = () => {
  const [data, setData] = useState([]);
  const [flattenedCValues, setFlattenedCValues] = useState();
  const [flattenedCNameArray, setFlattenedCNameArray] = useState();
  const [values, setValues] = useState();
  const [names, setNames] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showButtonClicked, setShowButtonClicked] = useState(false);

  const [type, setType] = useState("Расход рашировка");

  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState({
    name: "Расход рашировка",
    type: "rashirovka",
    url: "/files/rasxod_rashirovka.xlsx",
  });

  const handleShowButtonClick = () => {
    setShowButtonClicked(true);
  };

  const handleRepeatAttempt = () => {
    setData([]);
    setShowButtonClicked(false);
    setSelectedFiles([]);

    const inputElement = document.getElementById("fileChangeInput");
    if (inputElement) {
      inputElement.value = "";
    }

    const yilSelect = document.getElementById("yilSelect");
    if (yilSelect) {
      yilSelect.value = "";
    }

    setSelectedMonth("");

    const reports = document.getElementById("reports");
    if (reports) {
      reports.value = "Расход рашировка";
    }
  };

  const handleFileSelect = (e) => {
    const file = [...e.target.files];
    setSelectedFiles(file);

    console.log(file, "FILE");
  };

  const handleTypeChange = (e) => {
    const selectedType = reportsData.find(
      (data) => data.name === e.target.value
    );

    if (selectedType) {
      setSelectedType(selectedType);
      navigate(selectedType.urlHref); // Redirect to the specified route
    }
  };

  const handleFileUpload = (e) => {
    handleShowButtonClick();
    const file = e.target.files[0];

    setSelectedFiles(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          setData(jsonData);
          console.log(jsonData, "Json Data");

          const cellLength = jsonData.length;

          const worksheet = workbook.Sheets[sheetName];

          let flattenedCValuesArray = [];
          let flattenedCNameArray = [];

          // Store key words in an array
          const keyWordsArray = ["Наименование затраты"]; // Add more key words if needed

          for (let i = 0; i < cellLength; i++) {
            let jsonName = jsonData[i][keyWordsArray[0]];
            console.log(jsonName, "jsonName");
            flattenedCNameArray.push(jsonName);
          }
          console.log(flattenedCNameArray, "flattenedCNameArray");

          for (let i = 2; i <= cellLength + 1; i++) {
            // Fix index out of bounds error
            let cellValue = worksheet[`C${i}`]?.v;
            if (cellValue === undefined) {
              cellValue = 0;
            }
            flattenedCValuesArray.push(cellValue);
          }

          setFlattenedCNameArray(flattenedCNameArray);
          setFlattenedCValues(flattenedCValuesArray);

          const values = [];
          const names = [];

          for (let i = 0; i < flattenedCNameArray.length; i++) {
            // Fix the syntax error here
            values.push(flattenedCValuesArray[i]);
            names.push(flattenedCNameArray[i]);
          }

          console.log(values, "values");

          setValues(values);
          setNames(names);

          console.log(flattenedCValuesArray, "flattenedCValuesArray");
          console.log(flattenedCNameArray, "flattenedCValuesArray");
        } catch (error) {
          console.error("XLSX faylini o'qishda xatolik yuz berdi:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };
  // if (values) {
  //   let ss = [];
  //    [...values].map((t) => {
  //     ss.push(t);
  //     return t;
  //   });
  //   ss.map((q) => {
  //     console.log(q, "valls");
  //   });
  // }

  const handleSubmit = async () => {
    try {
      // Create FormData object and append data
      let formData = new FormData();

      formData.append("type", selectedType.name);
      formData.append("year", selectedYears);
      formData.append("month", selectedMonth);
      formData.append("file", selectedFiles);

      console.log(selectedFiles, "selectedFiles ");

      // Make the POST request
      const response = await axios.post("/archive", formData, {
        // timeout: 25000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log("Server response:", response.data);

      if (response.status === 201 || response.status === 200) {
        // Corrected the property name to 'status'
        try {
          // Use token directly without string interpolation

          const token = localStorage.getItem("token");
          const res = await axios.post(
            "/value",
            {
              year: selectedYears,
              month: selectedMonth,
              values: values,
              names: names,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          console.log(res, "res");
        } catch (error) {
          // Toast message for submission error
          // toast.error("Adminga yuborishda xatolik: " + error.message);
          console.error("Error:", error);
        }
      } else {
        // Handle other status codes if needed
        console.log("Server returned non-200 status:", response.status);
      }

      // Toast message for successful submission
      handleRepeatAttempt();
      toast.success("Данные успешно сохранены", { type: "success" });
    } catch (error) {
      // Toast message for submission error
      handleRepeatAttempt();
      toast.error(`Произошла ошибка при отправке данныхk: ${error.message}`, {
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

  const renderTable = () => {
    if (data.length === 0) {
      return;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>СЧЁТ</th>
            <th>Наименование затраты</th>
            <th>Текущий месяц</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row["СЧЁТ"]}</td>
              <td>{row["Наименование затраты"]}</td>
              <td>{row["Текущий месяц"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <div className="container">
        <div className=" p-5">
          <h1 className="text-center">Расход рашировка</h1>
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              onChange={handleTypeChange}
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
              id="oySelect"
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
            <button className="btn btn-primary mx-3 w-25 rounded" type="button">
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
            <form className="w-100  d-flex flex-row justify-content-between pb-2">
              <div className="file-input-wrapper"></div>
              <div className="d-flex flex-row align-items-center justify-center h-100">
                <br />
                <Link
                  to={"https://railwayback.up.railway.app/" + selectedType.url}
                  className="btn btn-success h-75 mx-2 align-center"
                >
                  Скачать шаблон
                </Link>

                <input
                  id="fileChangeInput"
                  type="file"
                  onChange={handleFileUpload}
                  className="btn btn-primary mx-3 rounded"
                />
              </div>
            </form>
          </div>

          {showButtonClicked == true ? (
            <div className="d-flex flex-row-reverse gap-3 w-full">
              <button className="btn btn-danger" onClick={handleRepeatAttempt}>
                Повторить попытку
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                Отправить
              </button>
            </div>
          ) : (
            ""
          )}
          <br />
          <div className="w-100 border-bottom border-secondary"></div>
          <br />
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default Razshirovka;
