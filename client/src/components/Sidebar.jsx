import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/dashboard", icon: "ri-bar-chart-box-fill", label: "Dashboard" },
    { path: "/schedule", icon: "ri-calendar-2-fill", label: "Schedule" },
    { path: "/projects", icon: "ri-folder-user-fill", label: "Projects" },
    { path: "/messages", icon: "ri-message-line", label: "Messages" },
    { path: "/jamming", icon: "ri-vidicon-fill", label: "Jamming" },
  ];

  return (
    <aside className="flex-col h-screen w-64 m-4 mr-0 text-slate-500 space-y-36">
      <a href="/" className="text-2xl font-semibold">
        TopFlow
      </a>
      <ul className="flex-col space-y-4 text-md font-semibold">
        {links.map((link) => (
          <li
            key={link.path}
            className={`flex gap-x-2 p-2 rounded-l-full ${
              location.pathname === link.path ? "bg-gray-100 p-4" : ""
            }`}
          >
            <i className={link.icon}></i>
            <a href={link.path}>{link.label}</a>
          </li>
        ))}
      </ul>
      <button
        className="p-2 border-2 border-slate-500 rounded-lg duration-300 hover:-translate-y-1  hover:shadow-sm hover:shadow-gray-500"
        onClick={() => navigate("/")}
      >
        <i className="ri-login-box-line"></i>
        Log Out
      </button>
    </aside>
  );
}
