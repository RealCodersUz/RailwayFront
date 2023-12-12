/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import ArchiveComponent from "../../components/excels/archive/archiveComponent";

const ArchivePage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <ArchiveComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ArchivePage;
