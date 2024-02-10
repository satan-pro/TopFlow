import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Jamming from "../pages/Jamming";
import Messages from "../pages/Messages";
import Projects from "../pages/Projects";
import Schedule from "../pages/Schedule";

export default function Navbar() {
  return (
    <nav className="flex-col h-screen bg-slate-400 w-64 space-y-48">
      <a href="/">Pilot</a>
      <ul className="flex-col gap-5 space-y-4">
        <li>
          <a href="dashboard">Dashboard</a>
        </li>
        <li>
          <a href="schedule">Schedule</a>
        </li>
        <li>
          <a href="projects">Projects</a>
        </li>
        <li>
          <a href="messages">Messages</a>
        </li>
        <li>
          <a href="jamming">Jamming</a>
        </li>
      </ul>
      <button className="border-2 border-slate-900 rounded-sm p-1">
        Log Out
      </button>
    </nav>
  );
}
