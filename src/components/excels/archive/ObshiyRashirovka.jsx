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
import { useNavigate } from "react-router-dom";

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

const ObshiyRashirovkaComponent = () => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [flattenedCValues, setFlattenedCValues] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showButtonClicked, setShowButtonClicked] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [branchData, setBranchData] = useState([]);
  const [type, setType] = useState("");
  const [branchNames, setBranchNames] = useState([]);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let userRole = localStorage.getItem("role");
    if (userRole) {
      setHidden(userRole !== "super_admin");
    }

    if (!hidden) {
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
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));

          const usersData = response.data.data || [];
          const allBranchNames = usersData
            .map((user) => user.branch_name)
            .filter(Boolean);

          const uniqueBranchNames = [...new Set(allBranchNames)];
          console.log(uniqueBranchNames);
          setBranchNames(uniqueBranchNames);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [hidden]);
  useEffect(() => {
    let userRole = localStorage.getItem("role");
    if (userRole) {
      setHidden(userRole !== "super_admin" ? true : false);
    }
    if (!hidden && branchName == "Общий") {
      excelBtnHidden();
      console.log("hiddendan otti");
      const fetchData = async () => {
        let rashirovkaConfig = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://railwayback.up.railway.app/value?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios
            .request(rashirovkaConfig)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              console.log(response.data.data, "rashirovka");
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
  }, [hidden, branchName, selectedMonth, selectedYears, type]);

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
    excelBtnShow();
    setData([]);
    let url = `https://railwayback.up.railway.app/archive?type=${type}&branch_name=${branchName}&year=${selectedYears}&month=${selectedMonth}`;
    let userRole = localStorage.getItem("role");
    if (userRole) {
      setHidden(userRole !== "super_admin");
    }

    if (!hidden && branchName === "Общий") {
      console.log("hiddendan otti");

      const fetchData = async () => {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://railwayback.up.railway.app/value?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));

          const responseData = response.data.data;
          console.log(responseData);
          if (Array.isArray(responseData)) {
            const valuesData = responseData;

            console.log(branchData, "BranchData");

            const groupedBranchData = valuesData.map((item) => ({
              branch_name: item.branch_name,
              values: item.values,
            }));

            const firstElementsArray = [];

            for (let i = 0; i < groupedBranchData.length; i++) {
              let sum = 0;

              for (let j = 0; j < groupedBranchData[i].values.length; j++) {
                const salaryValue =
                  groupedBranchData[i].values[j]?.Зарплата || 0;

                console.log(salaryValue, "Salary");

                sum += salaryValue;
              }

              // Log the result
              console.log(sum);

              // Collect the sums into a new array
              firstElementsArray.push(sum);
            }

            console.log(firstElementsArray, "First Elements Array");
            setBranchData(groupedBranchData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
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

  const renderTable = (values) => {
    if (!values || values.length === 0) {
      return <p>No values available.</p>;
    }

    const headers = Object.keys(values[0] || {}); // Assuming values is an array of objects

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
          {values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{row?.[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderBranchTable = () => {
    if (branchData.length === 0) {
      return <h5 className="text-danger">No data available.</h5>;
    }

    return (
      <div>
        {branchData.map((branchItem, index) => (
          <div key={index}>
            <h3 className="text-center">{branchItem.branch_name}</h3>
            {Object.keys(branchItem.values[0]).map((category, catIndex) => (
              <div key={catIndex}>
                <h4 className="text-center">{category}</h4>
                {renderTable(branchItem.values.map((item) => item[category]))}
              </div>
            ))}
          </div>
        ))}
      </div>
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
          <h1 className="text-center">Общий aрхивы</h1>
          <div className="input-group my-5 ">
            <select
              className="form-control mx-3 rounded border-primary"
              id="filials"
              hidden={hidden}
              onChange={(e) => {
                setBranchName(e.target.value);
                if (e.target.value === "Общий" && type === "Расходы") {
                  navigate("/obshiy-archive");
                }
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
        <div>
          <Table>
            {/* <Table> */}
            <thead>
              <tr>
                {branchNames.map((data, index) => (
                  <th key={index} scope="col">
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* {Object.values(tableData).map((el, i) => (
                  <td key={i}>{el}</td>
                ))} */}
              </tr>
            </tbody>
          </Table>
          {/* {renderBranchTable()} */}
        </div>
      </div>
    </>
  );
};

export default ObshiyRashirovkaComponent;
