import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiPlusSquare, FiBarChart2, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/dashboard/allUsers", label: "All Users", icon: <FiUsers /> },
  { path: "/dashboard/addDoctor", label: "Add Doctor", icon: <FiPlusSquare /> },
{ path: "/dashboard/reports", label: "Reports", icon: <FiBarChart2 /> },

  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-extrabold text-green-700 dark:text-green-400">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              location.pathname === link.path
                ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                : "hover:bg-green-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition">
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
