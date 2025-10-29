import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiPlusSquare,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { path: "/dashboard/allUsers", label: "All Users", icon: <FiUsers /> },
    { path: "/dashboard/addDoctor", label: "Add Doctor", icon: <FiPlusSquare /> },
    { path: "/dashboard/reports", label: "Reports", icon: <FiBarChart2 /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white/70 via-white/40 to-white/20 dark:from-gray-900/60 dark:via-gray-800/40 dark:to-gray-900/20 backdrop-blur-2xl border-r border-white/20 dark:border-gray-800 shadow-xl flex flex-col justify-between transition-all duration-300">
      
      {/* Logo / Title */}
      <div className="p-6 border-b border-white/30 dark:border-gray-800">
        <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          Admin Panel
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">HealthMate</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-5 space-y-3">
        {links.map((link) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`group flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-300 shadow-inner"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:text-indigo-500 dark:hover:text-indigo-300"
              }`}
            >
              <span
                className={`text-xl transition-transform duration-300 ${
                  active ? "scale-110 text-indigo-500 dark:text-indigo-300" : "group-hover:scale-110"
                }`}
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-5 border-t border-white/30 dark:border-gray-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-100/20 dark:hover:bg-gray-800 transition-all duration-300">
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
