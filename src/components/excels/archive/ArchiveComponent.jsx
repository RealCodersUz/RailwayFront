/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./index.scss";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

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
    url: "/files/rasxod_rashirovka.xlsx",
    urlHref: "/rashirovka",
  },
];

const ArchiveComponent = () => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [flattenedCValues, setFlattenedCValues] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showButtonClicked, setShowButtonClicked] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setSelectedYears] = useState("");

  const [type, setType] = useState("");
  const [branchNames, setBranchNames] = useState([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    if (userRole) {
      setHidden(userRole !== "super_admin" ? true : false);
    }
    if (!hidden) {
      console.log("hiddendan otti");
      const fetchData = async () => {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://railwayback.up.railway.app/users",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              console.log(response.data.data);
              const usersData = response.data.data || [];

              const allBranchNames = usersData
                .map((user) => user.branch_name)
                .filter(Boolean);

              const uniqueBranchNames = [...new Set(allBranchNames)];
              console.log(uniqueBranchNames);
              setBranchNames(uniqueBranchNames);
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error("Ma'lumotlarni olishda xatolik:", error);
        }
      };

      fetchData();
    }
  }, [hidden]);

  const handleShowButtonClick = () => {
    setShowButtonClicked(true);
  };

  const handleRepeatAttempt = () => {
    setData([]);
    setShowButtonClicked(false);
    setSelectedFiles([]);

    // Clear the input field
    const inputElement = document.getElementById("fileChangeInput");
    if (inputElement) {
      inputElement.value = "";
    }

    setSelectedMonth("");

    const filialSelect = document.getElementById("filialSelect");
    if (filialSelect) {
      filialSelect.value = "";
    }
    const reports = document.getElementById("reports");
    if (reports) {
      reports.value = "Выберите тип";
    }
    const filials = document.getElementById("filials");
    if (filials) {
      filials.value = "Выберите филиал";
    }
    const yilSelect = document.getElementById("yilSelect");
    if (yilSelect) {
      yilSelect.value = "";
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

          const cellLength = jsonData.length;
          const worksheet = workbook.Sheets[sheetName];

          const flattenedCValuesArray = [];

          for (let i = 2; i <= cellLength; i++) {
            let cellValue = worksheet[`C${i}`]?.v;
            if (cellValue === undefined) {
              cellValue = 0;
            }
            flattenedCValuesArray.push(cellValue);
          }

          setFlattenedCValues(flattenedCValuesArray);
        } catch (error) {
          console.error("XLSX faylini o'qishda xatolik yuz berdi:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const excelBtnHidden = () => {
    let btnExcelHidden = document.getElementById("btnExcelHidden");
    let btnRetry = document.getElementById("btnRetry");

    btnExcelHidden.style.display = "none";
    btnRetry.style.display = "none";
  };

  const excelBtnShow = () => {
    let btnExcelHidden = document.getElementById("btnExcelHidden");
    let btnRetry = document.getElementById("btnRetry");

    btnExcelHidden.style.display = "block";
    btnRetry.style.display = "block";
  };

  const handleSubmit = async () => {
    setData([]);
    excelBtnHidden();
    let url = `https://railwayback.up.railway.app/archive?type=${type}&branch_name=${branchName}&year=${selectedYears}&month=${selectedMonth}`;

    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data);
      console.log(!response.data.data);
      console.log(Boolean(response.data.data[0].file));
      if (!response.data.data) {
        console.log("ifda");
        toast("Нет в наличии", { type: "error" });
        <h5>Отправка недоступна. Крайний срок истек.</h5>;
      } else if (response.data.data[0].file) {
        console.log("elseda");
        const file =
          "https://railwayback.up.railway.app/" + response.data.data[0].file;

        try {
          excelBtnShow();
          // handleRepeatAttempt();
          toast("Успешный", { type: "success" });

          let arrayBuffer = await fetch(file).then((response) =>
            response.arrayBuffer()
          );

          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          );

          setData(excelData);
        } catch (error) {
          console.error("Нет в наличии", error);
          setErrorMsg(true);
        }
      } else if (response.data.data.file && response.data.data.file != []) {
        const file =
          "https://railwayback.up.railway.app/" + response.data.data[0].file;

        try {
          excelBtnShow();
          // handleRepeatAttempt();
          toast("Успешный", { type: "success" });

          let arrayBuffer = await fetch(file).then((response) =>
            response.arrayBuffer()
          );

          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          );

          setData(excelData);
        } catch (error) {
          console.error("Нет в наличии", error);
          setErrorMsg(true);
        }
      } else {
        toast("Нет в наличии", { type: "error" });
        <h5>Отправка недоступна. Крайний срок истек.</h5>;
      }
    } catch (error) {
      console.log(error);
      toast(`Ошибка : ${error.message}`, { type: "error" });
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (v, i) => currentYear + i);

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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearsChange = (event) => {
    setSelectedYears(event.target.value);
  };

  const renderTable = () => {
    if (data.length === 0) {
      return (
        <h5 className="text-danger">
          Отправка недоступна. Крайний срок истек.
        </h5>
      );
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

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "example.xlsx");
  };
  console.log(branchName);
  console.log(type);
  console.log(selectedMonth);
  console.log(selectedYears);
  return (
    <>
      <div className="container">
        <div className="p-5">
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="filials"
              hidden={hidden}
              onChange={(e) => {
                setBranchName(e.target.value);
              }}
            >
              <option selected disabled>
                Выберите филиал
              </option>
              {branchNames.map((data, index) => (
                <option key={index} value={data.key}>
                  {data}
                </option>
              ))}
              <option>Общий</option>
            </select>
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option selected disabled>
                Выберите тип
              </option>
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
              type="submit"
              onClick={handleSubmit}
            >
              Поиск
            </button>
          </div>
        </div>

        <p className="text-danger fw-semibold text-center" hidden={errorMsg}>
          Отправка недоступна. Крайний срок истек.
        </p>

        <div>
          <div className="cards ">
            <div className="d-flex justify-content-end gap-5 pb-3">
              <Button
                variant="warning"
                className="text-light"
                style={{ display: "none" }}
                id="btnRetry"
                onClick={() => {
                  handleRepeatAttempt(), excelBtnHidden();
                }}
              >
                Повторить попытку
              </Button>

              <Button
                variant="primary"
                style={{ display: "none" }}
                id="btnExcelHidden"
                onClick={handleDownload}
              >
                Загрузка файла Excel
              </Button>
            </div>
          </div>

          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default ArchiveComponent;
