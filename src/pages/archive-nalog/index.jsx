import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import ObshiyNalogComponent from "../../components/excels/archive/ObshiyNalog";

const ObshiyNalogPage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <ObshiyNalogComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ObshiyNalogPage;
