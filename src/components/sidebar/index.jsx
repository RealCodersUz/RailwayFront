/* eslint-disable no-unused-vars */
import {
  CDBIcon,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { FaPencilRuler } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaArrowRightArrowLeft, FaChartSimple } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { PiArchiveBoxBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

let userRole = "";

userRole = localStorage.getItem("role");
const SideBar = () => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setHidden(userRole !== "super_admin");
  }, []);
  // if (userRole) {
  // }
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast("выход", { type: "info" });
    navigate("/login");
  }

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#808080" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<FaArrowRightArrowLeft />}>
          <h4 className="text-decoration-none text-secondary">Меню</h4>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content text-secondary z-1">
          <CDBSidebarMenu className="px-4">
            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/"
              activeClassName="activeClicked"
            >
              <CDBIcon>
                <AiOutlineHome className="text-bolder fs-5 z-3 " />
              </CDBIcon>

              <CDBSidebarMenuItem>Главный</CDBSidebarMenuItem>
            </Link>

            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/reports"
              activeClassName="activeClicked"
            >
              <CDBIcon>
                <FaChartSimple className="text-bolder fs-5 z-3 " />
              </CDBIcon>

              <CDBSidebarMenuItem>Отчеты</CDBSidebarMenuItem>
            </Link>
            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/archives"
              activeClassName="activeClicked"
            >
              <CDBIcon>
                <PiArchiveBoxBold className="text-bolder fs-5 z-3 " />
              </CDBIcon>
              <CDBSidebarMenuItem>Архив</CDBSidebarMenuItem>
            </Link>
            {/*{userRole == "admin" ? (
                ""
              ) : (
                <Link
                  className="d-flex flex-row align-items-center justify-center text-secondary"
                  exact
                  to="/settings"
                  activeClassName="activeClicked"
                >
                  <CDBIcon fab>
                    <FaPencilRuler className="text-bolder fs-5 z-3" />
                  </CDBIcon>
                  <CDBSidebarMenuItem>Настройки</CDBSidebarMenuItem>
                </Link>
              )}*/}
            {/* {userRole !== "admin" ? (
                ""
              ) : ( */}
            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/settings"
              activeClassName="activeClicked"
              style={{ display: userRole !== "super_admin" ? "none" : "flex" }}
              hidden={hidden}
            >
              <CDBIcon fab hidden={hidden}>
                <FaPencilRuler className="text-bolder fs-5 z-3" />
              </CDBIcon>
              <CDBSidebarMenuItem hidden={hidden}>Настройки</CDBSidebarMenuItem>
            </Link>
            {/* )} */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ color: "red", marginTop: "" }}>
          <Link
            className="d-flex flex-row align-items-center justify-center pb-4 px-4 text-danger"
            // className="text-danger text-decoration-none"

            exact
            onClick={handleLogout}
            activeClassName="activeClicked"
          >
            <CDBIcon fab>
              <FiLogOut className="text-bolder fs-5 z-3 " />
            </CDBIcon>

            <CDBSidebarMenuItem>Выход</CDBSidebarMenuItem>
          </Link>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
