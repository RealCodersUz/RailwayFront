import {
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

        <CDBSidebarContent className="sidebar-content text-secondary">
          <CDBSidebarMenu>
            <Link
              className="text-secondary"
              exact
              to="/"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem>
                <AiOutlineHome className="text-bolder fs-5 " /> Dashboard
              </CDBSidebarMenuItem>
            </Link>
            <Link
              className="text-secondary"
              exact
              to="/reports"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem>
                <FaChartSimple className="text-bolder fs-5 " />
                Отчеты
              </CDBSidebarMenuItem>
            </Link>
            <Link
              className="text-secondary"
              exact
              to="/profile"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem>
                <PiArchiveBoxBold /> Архив
              </CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ color: "red" }}>
          <Link
            className="text-danger"
            exact
            to="/login"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon={""}>
              {" "}
              <FiLogOut />
              Analytics
            </CDBSidebarMenuItem>
          </Link>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
