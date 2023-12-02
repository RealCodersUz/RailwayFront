/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import RasxodXLSXget from "../../components/excels/reports/RasxodXLSXget";
import SideBar from "../../components/sidebar";

const SettingsPage = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <div className="w-100 text-secondary">
          <h1 style={{ marginLeft: "35%", marginTop: "2rem" }}>Настройки</h1>
          <h3>
            <Link
              to="/subSettings"
              style={{ display: "block" }}
              className="text-secondary"
            >
              Контроль подчинение
            </Link>

            <Link to="/userSettings" className="text-secondary">
              Контроль профили
            </Link>
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
