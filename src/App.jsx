import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Main from "./pages/main/main";
import GetReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";
import ArchivePage from "./pages/archive";
import RazshirovkaPage from "./pages/razshirovka";
import NalogPage from "./pages/nalog";
import ObshiyArchivePage from "./pages/archive-obshiy";
import ObshiyRashirovkaPage from "./pages/archive-rashirovka";
import ObshiyNalogPage from "./pages/archive-nalog";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          {/* reports  start*/}
          <Route path="/reports" element={<GetReportsPage />} />
          <Route path="/rashirovka" element={<RazshirovkaPage />} />{" "}
          <Route path="/nalog" element={<NalogPage />} />
          {/* reports end */}
          <Route path="/archives" element={<ArchivePage />} />{" "}
          <Route path="/obshiy-archive" element={<ObshiyArchivePage />} />
          <Route path="/obshiy-rashirovka" element={<ObshiyRashirovkaPage />} />
          <Route path="/obshiy-nalog" element={<ObshiyNalogPage />} />
          {/*  */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
