export default function Sidebar() {
  return (
    <aside className="flex-col h-screen w-64 space-y-24 p-6 border-r-2 border-slate-300 text-slate-500">
      <a href="/" className="text-2xl font-semibold">
        PILOT
      </a>
      <ul className="flex-col space-y-8 text-md font-semibold">
        <li className="flex gap-x-2">
          <i class="ri-bar-chart-box-fill"></i>
          <a href="dashboard">Dashboard</a>
        </li>
        <li className="flex gap-x-2">
          <i class="ri-calendar-2-fill"></i>
          <a href="schedule">Schedule</a>
        </li>
        <li className="flex gap-x-2">
          <i class="ri-folder-user-fill"></i>
          <a href="projects">Projects</a>
        </li>
        <li className="flex gap-x-2">
          <i class="ri-message-line"></i>
          <a href="messages">Messages</a>
        </li>
        <li className="flex gap-x-2">
          <i class="ri-vidicon-fill"></i>
          <a href="jamming">Jamming</a>
        </li>
      </ul>
      <button className="p-2 border-2 border-slate-500 rounded-lg">
        <i class="ri-login-box-line"></i>
        Log Out
      </button>
    </aside>
  );
}
