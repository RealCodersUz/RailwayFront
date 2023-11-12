const Footer = () => {
  return (
    <footer className="w-full h-100">
      <div className="d-flex flex-row flex-wrap justify-content-between px-5 pt-5">
        <div className="d-flex flex-row flex-wrap ">
          <img
            src="https://picsum.photos/200/300"
            alt="logo"
            width="220px"
            height="180px"
          />
          <div className="texts w-50">
            <h3>CRM Железнодорожный учет</h3>
            <h5>Oтправка отчётов в рамках одной системы</h5>
          </div>
        </div>
        <div className="help">
          <h5>nujna pomosh</h5>
          <a href="tel:+99899999999">+99899999999</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
