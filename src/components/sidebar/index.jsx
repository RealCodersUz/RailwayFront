import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";

const SideBar = () => {
  return (
    <CDBSidebar
      style={{
        // height: "100%",
        // position: "fixed",
        // top: "7rem",
        // left: "0",
        display: "block",
        maxWidth: "15rem",
      }}
      textColor="#333"
      backgroundColor="#f0f0f0"
      className="sticky-bottom"
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Contrast Light Mode
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="chart-line" iconType="solid">
            Metrics
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
        <CDBSidebarMenu style={{ visibility: "hidden" }}>
          <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="chart-line" iconType="solid">
            qaaaaaaaaaa
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          logout
        </div>
      </CDBSidebarFooter>
      {/* <CDBSidebarFooter style={{ paddingLeft: "2rem" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          Sidebar Footer
        </div>
      </CDBSidebarFooter> */}
    </CDBSidebar>
  );
};

export default SideBar;
