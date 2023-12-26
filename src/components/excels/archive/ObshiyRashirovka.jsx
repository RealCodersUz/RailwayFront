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

const ObshiyRashirovkaComponent = () => {
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(true);
  const [branchName, setBranchName] = useState("Общий");
  const [flattenedCValues, setFlattenedCValues] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showButtonClicked, setShowButtonClicked] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [branchData, setBranchData] = useState([]);
  const [itogo, setItogo] = useState([]);
  const [type, setType] = useState("Расход рашировка");
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
          toast(
            `Hech narsa topilmadi yana urinib ko'ring yoki tekshirib ko'ring!`,
            { type: "warning" }
          );
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
          // url: `https://railwayback.up.railway.app/value?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          url: `http://localhost:1111/value?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };
        let Admconfig = {
          method: "get",
          maxBodyLength: Infinity,
          // url: `https://railwayback.up.railway.app/admdata?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          url: `http://localhost:1111/admdata?month=${selectedMonth}&year=${selectedYears}&type=${type}&branch_name=${branchName}`,
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        };

        try {
          const response = await axios.request(config);
          const admResponse = await axios.request(Admconfig);
          
          const responseData = response.data.data;
          const responseAdmData = admResponse.data.data;

          console.log(responseAdmData, "admdata");

          let allVal = responseAdmData[0].values;

          if (Array.isArray(responseAdmData)) {
            const valuesData = [];
            const namesData = [];
            // console.log(JSON.parse(responseAdmData), "valueslar");
            responseAdmData[0].values.map((i) => {
              // console.log(JSON.stringify(i), "bu i");
              valuesData.push(i);
            });
            responseAdmData[0].names.map((i) => {
              // console.log(JSON.stringify(i), "bu i");
              namesData.push(i);
            });

            console.log(valuesData, "values");
            console.log(namesData, "names");

            // console.log(groupedItogo, "groupedItogo");

            setItogo(valuesData);
          }
          if (Array.isArray(responseData)) {
            const valuesData = responseData;

            // console.log(valuesData, "values");

            const groupedBranchData = valuesData.map((item) => {
              console.log(item, "itemni ozi");
              let itemVal = item.values;
              let itemName = item.names;

              console.log(itemVal, "itemVal");

              let valArray = [];
              let namesArray = [];

              // let arr = [];
              // Process the values array and return the filial and values properties
              for (let i = 0; i < itemVal.length; i++) {
                const values = itemVal[i];
                valArray.push(values);
              }
              for (let i = 0; i < itemName.length; i++) {
                const values = itemName[i];
                namesArray.push(values);
              }

              let arr = [];
              let kalitlar = [];

              namesArray.forEach((d) => {
                let o = [d];
              
                kalitlar.push(d);

              });

              valArray.forEach((d) => {
                let o = [d];
                // console.log(d, "d");

                // var Qiymat = Object.values(o[0])[0];
                // kalitlar.push(Object.keys(Qiymat)[0]);
                // console.log(kalitlar, "keys");

                // var birinchiQiymat = Object.values(Qiymat)[0];
                arr.push(d);

                // console.log(birinchiQiymat, "birinchiQiymat");
              });
              // console.log(arr, "arr");
              // console.log(kalitlar, "kalitlar");

              let filial = item.branch_name;
              // let newData = branchData.push({ filial: filial, data: arr });
              // setBranchData(newData);
              // Combine the array of objects into a single object using reduce
              // let valuesObject = valArray.reduce((acc, obj) => {
              //   const key = Object.keys(obj)[0];
              //   acc[key] = obj[key];
              //   return acc;
              // }, {});

              return { filial, kalitlar, arr, allVal };
            });

            console.log(groupedBranchData, "groupedBranchData");

            setBranchData(groupedBranchData);
          }
        } catch (error) {
          // toast("M")
          toast(
            `Hech narsa topilmadi yana urinib ko'ring yoki tekshirib ko'ring!`,
            { type: "warning" }
          );
          console.error("Error fetching data:", error);
        }
      };

      await fetchData();
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

  const renderTable = (filials, itogo) => {
    if (!filials || filials.length === 0) {
      return <p>No values available.</p>;
    }

    const headers = filials[0]?.kalitlar || [];
    const branches = filials.map((filial) => filial.filial);

    return (
      <Table striped bordered hover id="xlsxTable">
        <thead>
          <tr>
            <th>Наименование затраты</th>
            {branches.map((branch, index) => (
              <th key={index}>{branch}</th>
            ))}
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, rowIndex) => {
            let rowTotal = 0; // Initialize row total for each header

            return (
              <tr key={rowIndex}>
                <td>{header}</td>
                {filials.map((filial, index) => {
                  const cellValue = filial.arr[rowIndex] || 0; // Use 0 if the value is undefined
                  rowTotal += cellValue; // Add the cell value to the row total

                  return <td key={index}>{cellValue}</td>;
                })}
                <td>{rowTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const handleDownload = () => {
    // Assuming your table has an id attribute, replace 'your-table-id' with the actual id of your table
    const table = document.getElementById("xlsxTable");

    // Convert HTML table data to worksheet
    const ws = XLSX.utils.table_to_sheet(table);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Create a dynamic filename based on branchName, type, and date
    const filename = `${branchName}_${type}_${selectedYears}_${selectedMonth}.xlsx`;

    // Write the workbook to a file with the dynamic filename
    XLSX.writeFile(wb, filename);
  };

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
              {/* <option selected disabled>
                Выберите филиал
              </option> */}
              <option selected>Общий</option>
              {branchNames.map((data, index) => (
                <option key={index} value={data.key}>
                  {data}
                </option>
              ))}
            </select>
            <select
              className="form-control mx-3 rounded border-primary"
              id="reports"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {/* <option selected disabled>
                Выберите тип
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

          {renderTable(branchData)}
        </div>
      </div>
    </>
  );
};

export default ObshiyRashirovkaComponent;
