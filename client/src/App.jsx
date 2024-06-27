import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Jamming from "./pages/Jamming";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import Schedule from "./pages/Schedule";

export default function App() {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/" && location.pathname !== "/login";

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jamming" element={<Jamming />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}
