import React, { useState } from "react";
import { FiBell, FiUser, FiMessageSquare } from "react-icons/fi";
import { ModeToggle } from "../mode-toggle";
import UserPopup from "../UserPopup";

const DashboardNav = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-green-100 dark:border-gray-800 z-40 transition">
      <div className="flex justify-between items-center px-6 py-3">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
          HealthMate Admin 🩺
        </h1>

        <div className="flex items-center gap-5 text-xl">
          <FiMessageSquare className="cursor-pointer hover:text-green-600 transition" />
          <FiBell className="cursor-pointer hover:text-green-600 transition" />
          <ModeToggle />
          <FiUser
            className="cursor-pointer hover:text-green-600 transition"
            onClick={() => setShowPopup(!showPopup)}
          />
        </div>
      </div>

      {showPopup && (
        <UserPopup
           
          onClose={() => setShowPopup(false)}
        />
      )}
    </nav>
  );
};

export default DashboardNav;
