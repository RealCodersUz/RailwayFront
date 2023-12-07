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
import UserModal from "../../components/userModal";

const SettingsPage = () => {
  const [ChancemodalShow, setChanceModalShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // return (
  //   <div>
  //     <h1>My App</h1>
  //     <button onClick={handleShowModal}>Show Users</button>
  //     <UserModal users={users} showModal={showModal} handleClose={handleCloseModal} />
  //   </div>
  // );
  return (
    <div className="h-full">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <div className="w-100 text-secondary">
          <h1 style={{ marginLeft: "35%", marginTop: "2rem" }}>Настройки</h1>
          <h3>
            {/* <Link
              // to="/"
              style={{ display: "block" }}
              className="text-secondary"
            >
              Контроль профили
            </Link> */}
            {/* <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Show Users
            </button>
            <UserModal
              users={users}
              showModal={showModal}
              handleClose={() => {
                setShowModal(true);
              }}
            /> */}

            <Link
              className="text-secondary d-block"
              variant="primary"
              onClick={() => setShowModal(true)}
              // to="/"
            >
              Контроль профили
            </Link>

            <UserModal
              // users={users}
              show={showModal}
              onHide={() => setShowModal(false)}
            />
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
