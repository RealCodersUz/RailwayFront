const Header = () => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const optionsWatch = {
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(); // Note: months are zero-based, so November is 10
  //   const dateWatch = new Date(2023, 10, 10, 10, 50); // Note: months are zero-based, so November is 10

  const formattedDate = new Intl.DateTimeFormat("default", options).format(
    date
  );
  const formattedWatch = new Intl.DateTimeFormat(
    "default",
    optionsWatch
  ).format(date);
  console.log(formattedDate);
  console.log(formattedWatch);
  return (
    <header className="w-full h-50">
      <nav className="navbar sticky-top bg-body-tertiary h-25">
        <div className="container-fluid d-flex flex-wrap-reverse">
          {/* <div className="d-flex flex-row justify-between"> */}
          <div className="d-flex flex-row gap-3">
            <div className="time">{formattedDate}</div>
            <div className="time">
              {formattedWatch.slice(0, formattedWatch.length - 2)}
            </div>
          </div>
          <div className="right d-flex flex-row justify-center align-items-center gap-3">
            <div className="names">
              <div className="name">
                <p>Muhammadjon</p>
              </div>
              <div className="branch_name">
                <p>Sirdaryo</p>
              </div>
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="img"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </nav>
      <div className="d-flex flex-row flex-wrap justify-content-between px-5 py-5  h-100">
        <div className="d-flex flex-row flex-wrap-reverse md-w-100 align-items-center sm-align-items-center w-75">
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
    </header>
  );
};

export default Header;
