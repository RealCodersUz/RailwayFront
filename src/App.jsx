import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Main from "./pages/main/main";
import GetReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          {/* reports  start*/}
          <Route path="/reports" element={<GetReportsPage />} />
          {/* reports end */}

          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
