/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/main";
import Header from "../../components/header/main";
import React, { useEffect } from "react";
import "./index.scss";
import ReportCards from "../../components/reportCards/ReportCards";

const Main = () => {
  return (
    <div className="h-full">
      <Header />
      <ReportCards />
      <Footer />
    </div>
  );
};

export default Main;
