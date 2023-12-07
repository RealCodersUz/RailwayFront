import { Link } from "react-router-dom";
import "./index.scss";
import { BsFillTelephoneFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="d-flex flex-row flex-wrap justify-content-between px-5 py-3">
        <div className="d-flex flex-row flex-wrap-reverse md-w-100 align-items-center sm-align-items-center w-75">
          <div className="footer-logo-main d-flex flex-row flex-wrap-reverse align-items-center">
            <Link
              to="/"
              className="text-decoration-none text-dark d-flex flex-wrap w-100"
            >
              <div className="footer-logo">
                <img src="/logo-text.png" alt="logo" className="" />
              </div>
            </Link>
          </div>
        </div>
        <div className="help">
          <h5>Нужна помощь?</h5>
          <span>
            <Link
              to="tel:+998912345678"
              className="footer-link text-decoration-none fw-bold text-dark"
            >
              <BsFillTelephoneFill /> +998 99 999 99 99
            </Link>
          </span>
        </div>
      </div>
      <p className="text-center text-secondary">© 2023 Все права защищены.</p>
    </footer>
  );
};

export default Footer;
