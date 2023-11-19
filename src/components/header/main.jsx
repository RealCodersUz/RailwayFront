/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import "./index.scss";
import React, { useEffect } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

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
      console.log(response.data.data, "data");
    } catch (error) {
      console.error("Error Message:", error.message);
      console.error("Error:", error);
    }
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
  console.log(formattedDate);
  console.log(formattedWatch);
  return (
    <header className="w-full h-50 bg-body-tertiary sticky-top pb-2">
      <nav className="navbar  h-25">
        <div className="container-fluid d-flex flex-wrap-reverse">
          {/* <div className="d-flex flex-row justify-between"> */}
          <div className="d-flex flex-row gap-3">
            <div className="time">{formattedDate}</div>
            <div className="time">
              {formattedWatch.slice(0, formattedWatch.length - 2)}
            </div>
          </div>
          <div className="right d-flex flex-row justify-center align-items-center gap-3">
            <div className="names">
              <div className="name">
                <p>{data.name}</p>
              </div>
              <div className="branch_name">
                <p>{data.branch_name}</p>
              </div>
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="img"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </nav>
      <div className="d-flex flex-row flex-wrap justify-content-between px-5 pb-2  h-100">
        <div className="d-flex flex-row flex-wrap-reverse md-w-100 align-items-center sm-align-items-center w-75 ">
          <a
            href="/"
            className="text-decoration-none text-dark d-flex flex-wrap w-100"
          >
            <img
              src="https://picsum.photos/200/300"
              alt="logo"
              width="220px"
              height="180px"
              className="header-diamond-shape"
            />
            <div className="texts w-50">
              <h3>CRM Железнодорожный учет</h3>
              <h5>Oтправка отчётов в рамках одной системы</h5>
            </div>
          </a>
        </div>
        <div className="help">
          <h5>Вам нужна помощь ?</h5>
          <span>
            <a href="tel=+998912345678" className="text-decoration-none">
              +99891 234 56 78
            </a>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
