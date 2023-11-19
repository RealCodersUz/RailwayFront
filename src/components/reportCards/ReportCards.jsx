/* eslint-disable no-unused-vars */
import React from "react";

const reportsData = [
  { name: "Отчеты", url: "/reports" },
  { name: "Форма 69", url: "/forma69" },
  { name: "data1", url: "http" },
  { name: "data1", url: "http" },
  { name: "data1", url: "http" },
];

function ReportCards() {
  return (
    <>
      <div className="container p-5">
        <div className="card p-5">
          <h2 className="text-center">Отчеты</h2>

          <h4 className="text-center pb-5">Отправлять отчеты</h4>
          <div className="d-flex justify-content-between">
            {reportsData.map((data, index) => (
              <div className="card p-3" style={{ width: "12rem" }} key={index}>
                <a href={data.url} className="text-decoration-none">
                  <h5 className="card-title text-center">{data.name}</h5>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportCards;
