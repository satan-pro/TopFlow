import { useState } from "react";

export default function Sidebar() {
  const [selected, setSelected] = useState(false);
  function handleSetSelected() {
    setSelected((val) => !val);
  }

  return (
    <aside className="flex-col h-screen w-64 m-4 mr-0 text-slate-500 space-y-36">
      <a href="/" className="text-2xl font-semibold">
        TopFlow
      </a>
      <ul className="flex-col space-y-4 text-md font-semibold">
        <li className="flex gap-x-2 bg-gray-100 p-4 rounded-l-full">
          <i className="ri-bar-chart-box-fill"></i>
          <a href="dashboard" onClick={handleSetSelected}>
            Dashboard
          </a>
        </li>
        <li className="flex gap-x-2 p-2 rounded-l-full ">
          <i className="ri-calendar-2-fill"></i>
          <a href="schedule">Schedule</a>
        </li>
        <li className="flex gap-x-2 p-2 rounded-l-full ">
          <i className="ri-folder-user-fill"></i>
          <a href="projects">Projects</a>
        </li>
        <li className="flex gap-x-2 p-2 rounded-l-full ">
          <i className="ri-message-line"></i>
          <a href="messages">Messages</a>
        </li>
        <li className="flex gap-x-2 p-2 rounded-l-full ">
          <i className="ri-vidicon-fill"></i>
          <a href="jamming">Jamming</a>
        </li>
      </ul>
      <button className="p-2 border-2 border-slate-500 rounded-lg duration-300 hover:-translate-y-1  hover:shadow-sm hover:shadow-gray-500 ">
        <i className="ri-login-box-line"></i>
        Log Out
      </button>
    </aside>
  );
}
