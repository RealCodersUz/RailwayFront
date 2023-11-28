/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/main";
import Header from "../../components/header/main";
import React, { useEffect } from "react";
import "./index.scss";
import ReportCards from "../../components/reportCards/ReportCards";
import SideBar from "../../components/sidebar";
// import SideBar from "../sidebar";

const Main = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <ReportCards />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
