/* eslint-disable no-unused-vars */
import React from "react";
const reportsData = [
  { name: "Расходы", url: "/reports", img: "/sum.png" },
  { name: "Форма 69", url: "/forma69", img: "/doc.png" },
  { name: "Основные инструменты", url: "/tools", img: "/zarik.png" },
  { name: "Материальный отчет", url: "/mreport", img: "/block.png" },
  { name: "Налог", url: "/nalog", img: "/procent.png" },
];

function ReportCards() {
  return (
    <>
      <div className="">
        <div className="container p-5">
          <div className=" p-5">
            <h2 className="text-center">Отчеты</h2>

            {/* <h4 className="text-center pb-5">Отправлять отчеты</h4> */}
            <div className="d-flex justify-content-between flex-wrap g-4 ">
              {reportsData.map((data, index) => (
                <div
                  className="card px-4 border-bottom bg-primary text-white m-2"
                  style={{ width: "16rem" }}
                  key={index}
                >
                  <a
                    href={data.url}
                    className="text-decoration-none d-flex align-items-center py-4 justify-center text-wrap text-white"
                  >
                    <img src={data.img} alt="no rasm" />
                    <h5 className="card-title  px-4 text-center text-white ">
                      {data.name}
                    </h5>
                  </a>
                </div>
              ))}
              <div
                className="card p-1 mx-2 border-bottom bg-primary text-white"
                style={{ width: "16rem", height: "4rem" }}
              >
                <a
                  href="#"
                  className="text-decoration-none d-flex py-2 align-items-center justify-content-center text-white"
                >
                  <h5 className="card-title  px-4 text-center text-white">
                    pakazat vsyo
                  </h5>
                  <img src="/ewo.png" alt="ewo" />
                </a>
              </div>
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
          <div className="px-5 w-100 ">
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
