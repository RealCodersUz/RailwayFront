/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import RasxodXLSXget from "../../components/excels/reports/RasxodXLSXget";
import SideBar from "../../components/sidebar";
import ChanceModal from "../../components/chanceModal/main";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const SettingsPage = () => {
  const [ChancemodalShow, setChanceModalShow] = React.useState(false);

  return (
    <div className="h-full">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <div className="w-100 text-secondary">
          <h1 style={{ marginLeft: "35%", marginTop: "2rem" }}>Настройки</h1>
          <h3>
            <Link
              // to="/"
              style={{ display: "block" }}
              className="text-secondary"
            >
              Контроль профили
            </Link>

            <Link
              className="text-secondary"
              variant="primary"
              onClick={() => setChanceModalShow(true)}
              // to="/"
            >
              Контроль подчинение
            </Link>

            <ChanceModal
              show={ChancemodalShow}
              onHide={() => setChanceModalShow(false)}
            />
          </h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
