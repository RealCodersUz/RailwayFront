import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Main from "./pages/main/main";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
