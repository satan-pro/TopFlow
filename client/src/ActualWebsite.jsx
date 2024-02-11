import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jamming from "./pages/Jamming";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import Schedule from "./pages/Schedule";

export default function ActualWebsite() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Dashboard;
      break;
    case "/dashboard":
      Component = Dashboard;
      break;
    case "/projects":
      Component = Projects;
      break;
    case "/schedule":
      Component = Schedule;
      break;
    case "/messages":
      Component = Messages;
      break;
    case "/jamming":
      Component = Jamming;
      break;
  }
  return (
    <div className="flex">
      <Sidebar />
      <Component />
    </div>
  );
}
