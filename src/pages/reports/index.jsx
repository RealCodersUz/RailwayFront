/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import RasxodXLSXget from "../../components/excels/reports/RasxodXLSXget";

const GetReportsPage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <RasxodXLSXget />
      <Footer />
    </div>
  );
};

export default GetReportsPage;
