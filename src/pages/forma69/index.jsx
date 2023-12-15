/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import Form69Saver from "../../components/excels/forma69/forma69";

const Forma69Page = () => {
  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="d-flex flex-row">
          <SideBar />

          <Form69Saver />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Forma69Page;
