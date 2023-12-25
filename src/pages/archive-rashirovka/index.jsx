import Header from "../../components/header/main";
import Footer from "../../components/footer/main";
import SideBar from "../../components/sidebar";
import ObshiyRashirovkaComponent from "../../components/excels/archive/ObshiyRashirovka";

const ObshiyRashirovkaPage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="d-flex flex-row">
        <SideBar />

        <ObshiyRashirovkaComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ObshiyRashirovkaPage;
