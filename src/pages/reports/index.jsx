/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import RasxodXLSXget from "../../components/excels/reports/RasxodXLSXget";
import SideBar from "../../components/sidebar";

const GetReportsPage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <RasxodXLSXget />
      </div>
      <Footer />
    </div>
  );
};

export default GetReportsPage;
