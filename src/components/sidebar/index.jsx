import {
  CDBIcon,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom";
import { FaArrowRightArrowLeft, FaChartSimple } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { PiArchiveBoxBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";

const SideBar = () => {
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
              <CDBIcon fab icon="home">
                <AiOutlineHome className="text-bolder fs-5 z-3 " />
              </CDBIcon>
              <CDBSidebarMenuItem>Dashboard</CDBSidebarMenuItem>
            </Link>
            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/reports"
              activeClassName="activeClicked"
            >
              <CDBIcon fab icon="home">
                <FaChartSimple className="text-bolder fs-5 z-3 " />
              </CDBIcon>

              <CDBSidebarMenuItem>Отчеты</CDBSidebarMenuItem>
            </Link>
            <Link
              className="d-flex flex-row align-items-center justify-center text-secondary"
              exact
              to="/profile"
              activeClassName="activeClicked"
            >
              <CDBIcon fab icon="home">
                <PiArchiveBoxBold className="text-bolder fs-5 z-3 " />
              </CDBIcon>
              <CDBSidebarMenuItem>Архив</CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ color: "red" }}>
          <Link
            className="d-flex flex-row align-items-center justify-center pb-4 px-4 text-danger"
            exact
            to="/login"
            activeClassName="activeClicked"
          >
            <CDBIcon fab icon="home">
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
