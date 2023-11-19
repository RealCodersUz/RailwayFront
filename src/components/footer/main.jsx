import "./index.scss";

const Footer = () => {
  return (
    <footer className="w-full h-50">
      <div className="d-flex flex-row flex-wrap justify-content-between px-5 py-5  h-100">
        <div className="d-flex flex-row flex-wrap-reverse md-w-100 align-items-center sm-align-items-center w-75">
          <img
            src="https://picsum.photos/200/300"
            alt="logo"
            width="220px"
            height="180px"
            className="footer-diamond-shape"
          />
          <div className="texts w-50">
            <h3>CRM Железнодорожный учет</h3>
            <h5>Oтправка отчётов в рамках одной системы</h5>
          </div>
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
    </footer>
  );
};

export default Footer;
