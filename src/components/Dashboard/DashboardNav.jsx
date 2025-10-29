import React, { useState } from "react";
import { FiBell, FiUser, FiMessageSquare } from "react-icons/fi";
import { ModeToggle } from "../mode-toggle";
import UserPopup from "../UserPopup";

const DashboardNav = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <nav className="fixed top-0 left-64 right-0 z-50 bg-gradient-to-r from-white/60 via-white/40 to-white/60 dark:from-gray-900/60 dark:via-gray-800/40 dark:to-gray-900/60 backdrop-blur-xl border-b border-white/30 dark:border-gray-800 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Brand */}
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          HealthMate Admin 🩺
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-2xl text-gray-600 dark:text-gray-300">
          <button className="relative hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-300">
            <FiMessageSquare />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
              2
            </span>
          </button>

          <button className="relative hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-300">
            <FiBell />
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
              5
            </span>
          </button>

          <ModeToggle />

          <div className="relative">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-300"
              onClick={() => setShowPopup(!showPopup)}
            >
              <FiUser />
            </div>

            {showPopup && (
              <div className="absolute right-0 mt-3">
                <UserPopup onClose={() => setShowPopup(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
