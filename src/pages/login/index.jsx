import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) navigate("/");
  }, []);

  // let headers = { "Access-Control-Allow-Origin": "*" };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let res = await axios.post("/users/login", values);

      if (res.status === 200) {
        toast("Войти успешно", { type: "success" });
        setValues({ username: "", password: "" });
        console.log(res.data.data.token, "data");
        // console.log(res.data.data[0].token);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("проблема с интернетом", { type: "warning" });
      } else {
        toast("Введенная информация неверна", { type: "error" });
      }

      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <main className="min-vh-100 text-bg-light my-auto ">
      <div className="">
        <article className="text-center pt-5">
          <h2>CRM</h2>
          <h3>Железнодорожный учет</h3>
        </article>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="bg-white border w-50 p-3 m-auto"
          >
            {/* ... (your form content) */}
            <div className="my-3">
              <label className="form-label" htmlFor="username">
                Имя <span style={{ color: "red" }}>( * ) </span>
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                value={values.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-3">
              <label className="form-label" htmlFor="password">
                Пароль <span style={{ color: "red" }}>( * ) </span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                required
                // min={4}
              />
            </div>

            <div className="mt-3">
              <button
                disabled={
                  !values.username || values.password.length < 4 || isSubmitting // Disable the button while submitting
                }
                className="btn btn-primary d-block w-100 fs-4"
              >
                {isSubmitting ? "Вход..." : "Входить"}
              </button>

              <h6 className="text-center pt-5 ">
                Если есть проблемы обращайтесь.
                <br />
                <span>
                  <a href="tel=+998912345678" className="text-decoration-none">
                    +998912345678
                  </a>
                </span>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
