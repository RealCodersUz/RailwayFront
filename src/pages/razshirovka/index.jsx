/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import Razshirovka from "../../components/excels/razshirovka/razshirovka";
// import Form69Saver from "../../components/excels/forma69/forma69";

const RazshirovkaPage = () => {
  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="d-flex flex-row">
          <SideBar />
          <Razshirovka />
          {/* <Form69Saver /> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RazshirovkaPage;
