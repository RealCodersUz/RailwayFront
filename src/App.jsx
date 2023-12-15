import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Main from "./pages/main/main";
import GetReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";
import ArchivePage from "./pages/archive";
import Forma69Page from "./pages/forma69";
import NalogPage from "./pages/nalog";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          {/* reports  start*/}
          <Route path="/reports" element={<GetReportsPage />} />
          <Route path="/form69" element={<Forma69Page />} />{" "}
          <Route path="/nalogs" element={<NalogPage />} />
          {/* reports end */}
          <Route path="/archives" element={<ArchivePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
