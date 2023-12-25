/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import ObshiyArchiveComponent from "../../components/excels/archive/ObshiyArchive";

const ObshiyArchivePage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <ObshiyArchiveComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ObshiyArchivePage;
