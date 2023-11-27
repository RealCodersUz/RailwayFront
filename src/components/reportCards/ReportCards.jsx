/* eslint-disable no-unused-vars */
import React from "react";
import SideBar from "../sidebar";

const reportsData = [
  { name: "Отчеты", url: "/reports" },
  { name: "Форма 69", url: "/forma69" },
  { name: "Основные инструменты", url: "/tools" },
  { name: "Материальный отчет", url: "/mreport" },
  { name: "Налог", url: "/nalog" },
];

function ReportCards() {
  return (
    <>
      <div className="d-flex flex-row">
        <SideBar />
        <div className="container p-5">
          <div className=" p-5">
            <h2 className="text-center">Отчеты</h2>

            {/* <h4 className="text-center pb-5">Отправлять отчеты</h4> */}
            <div className="d-flex justify-content-between">
              {reportsData.map((data, index) => (
                <div
                  className="card p-3"
                  style={{ width: "12rem" }}
                  key={index}
                >
                  <a href={data.url} className="text-decoration-none">
                    <h5 className="card-title text-center">{data.name}</h5>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className=" p-5">
            <h2 className="text-center p-3">Архив</h2>
            <div className="input-group my-5">
              <select
                className="form-control mx-3 rounded border-primary"
                name="fileType"
                id="filetype"
              >
                {reportsData.map((data, index) => (
                  <option className="p-3" style={{ width: "2rem" }} key={index}>
                    {data.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="form-control mx-3 rounded border-primary"
              />
              <button className="btn btn-primary rounded" type="button">
                Button
              </button>
            </div>
            {/* <form></form> */}
          </div>
          <div className="p-5 w-100 ">
            <div className="w-100 border-bottom border-secondary d-flex flex-row justify-content-between ">
              <p className=" fw-bold fs-3 text-black">topilgan file</p>
              <button className="btn btn-primary h-25 align-center">
                Pakazat
              </button>
              {/* <input className="form-control" type="file" id="formFile" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportCards;
