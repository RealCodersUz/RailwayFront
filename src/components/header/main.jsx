/* eslint-disable no-unused-vars */
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./index.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";
import { CDBSidebarMenuItem } from "cdbreact";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

import { Collapse, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // clock
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // componentWillUnmount
    return () => clearInterval(intervalId);
  }, []); // useEffect only runs once on component mount

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // end

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if the token is not present
      navigate("/login");
    } else {
      // Fetch data only if the token is present
      getData();
    }
  }, [token, navigate]);

  const [data, setData] = React.useState([]);

  async function getData() {
    try {
      const response = await axios.get("/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setData(response.data.data);

      console.log(response.data, "mana bu");
    } catch (error) {
      console.error("Error Message:", error.message);
      console.error("Error:", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast("выход", { type: "info" });
    navigate("/login");
  }

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const optionsWatch = {
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(); // Note: months are zero-based, so November is 10
  //   const dateWatch = new Date(2023, 10, 10, 10, 50); // Note: months are zero-based, so November is 10

  const formattedDate = new Intl.DateTimeFormat("default", options).format(
    date
  );
  const formattedWatch = new Intl.DateTimeFormat(
    "default",
    optionsWatch
  ).format(date);
  // console.log(formattedDate);
  // console.log(formattedWatch);
  return (
    <header className="header w-full bg-body-tertiary sticky-top pb-2">
      <div className="navbar h-25 d-flex flex-row flex-wrap justify-content-between px-5 pb-2  h-100">
        <div className="header-logo-main d-flex flex-row flex-wrap-reverse align-items-center">
          <Link
            to="/"
            className="text-decoration-none text-dark d-flex flex-wrap w-100"
          >
            <div className="header-logo">
              <img src="/logo_full_text.png" alt="logo" className="" />
            </div>
          </Link>
        </div>

        <div className="header-clock">
          <div className="time">
            {/* {formattedWatch.slice(0, formattedWatch.length - 2)}
             */}
            {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="time">{formattedDate}</div>
        </div>

        <div className="user-settings d-flex flex-row justify-center align-items-center">
          <div className="names">
            <div className="name">
              <p className="fw-bold">{data.name}</p>
            </div>
            <div className="branch_name">
              <p>{data.branch_name}</p>
            </div>
          </div>

          {/* <Link to="/settings" className="settings fw-bold "></Link> */}

          <Button
            className="settings fw-bold btn-light"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <IoSettingsOutline />
          </Button>
        </div>
      </div>
      <div className="mx-5" style={{}}>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className="vxod-btn" style={{}}>
              <Link
                className="text-danger text-end text-decoration-none"
                exact
                onClick={handleLogout}
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon={""}>
                  <FiLogOut />
                  Выход
                </CDBSidebarMenuItem>
              </Link>
            </div>
          </div>
        </Collapse>
      </div>
    </header>
  );
};

export default Header;
