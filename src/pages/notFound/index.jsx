/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import Footer from "../../components/footer/main";
import Header from "../../components/header/main";
import "./404.scss";

const NotFound = () => {
  return (
    <>
      <div className="full-scren">
        <Header />
        <div className="full">
          <div className="center align-items-center">
            <h1 className="text-center">404</h1>
            <h2 className="text-center">
              Ошибка загрузки страницы.
              <br />
              Пожалуйста, попробуйте еще раз.
            </h2>

            <Link to="/" className="text-center text-decoration-none link404">
              Главная страница
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
