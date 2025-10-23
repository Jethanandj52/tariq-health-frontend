import React, { useEffect, useState } from "react";
import {
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ModeToggle } from "./mode-toggle";
import UserPopup from "./UserPopup";

const Nav = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch user
  const fetchUser = async () => {
  try {
    const res = await axios.get("https://hackathon-backend-flax.vercel.app/auth/users");
    const activeUser = res.data.users.find((u) => u.isActive === true);
    if (activeUser) {
      setUser(activeUser);
      localStorage.setItem("userId", activeUser._id);
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
};


  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await axios.post("https://hackathon-backend-flax.vercel.app/auth/logout", {
        email: user?.email,
      });
      toast.success("Logout successful", { autoClose: 1000 });
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-md z-50 border-b border-green-100 dark:border-gray-800 transition-colors">
      <div className="flex justify-between items-center px-5 md:px-10 py-3">
        {/* ✅ Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966482.png"
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <span className="text-2xl font-extrabold text-green-700 dark:text-green-400">
            HealthMate 💚
          </span>
        </div>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex gap-10 text-[16px] font-semibold">
          <Link to="/home" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          
          <Link to="/doctors" className="hover:text-green-600 transition-colors">
            Doctors
          </Link>

          {/* 🧩 NEW: Family Members Tab */}
          <Link to="/family" className="hover:text-green-600 transition-colors">
            Family
          </Link>

          <Link to="/about" className="hover:text-green-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* ✅ Right Icons */}
        <div className="flex items-center gap-4 text-xl relative">
          <FiMessageSquare
            className="cursor-pointer hover:text-green-600 transition-transform hover:scale-110"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotification(false);
              setShowPopup(false);
            }}
          />
          <FiBell
            className="cursor-pointer hover:text-green-600 transition-transform hover:scale-110"
            onClick={() => {
              setShowNotification(!showNotification);
              setShowMessages(false);
              setShowPopup(false);
            }}
          />
          <ModeToggle />
          <FiUser
            className="cursor-pointer hover:text-green-600 transition-transform hover:scale-110"
            onClick={() => {
              setShowPopup(!showPopup);
              setShowNotification(false);
              setShowMessages(false);
            }}
          />

          {/* ✅ Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl focus:outline-none transition-transform hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-3 text-lg font-medium">
          <Link to="/dashboard" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/report" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
            Reports
          </Link>
          <Link to="/doctors" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
            Doctors
          </Link>

          {/* 🧩 NEW: Family Members Tab for Mobile */}
          <Link to="/family" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
            Family
          </Link>

          <Link to="/chat" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
            AI Chat
          </Link>
        </div>
      </div>

      {/* ✅ Popups */}
      {showPopup && (
        <UserPopup user={user} onLogout={handleLogout} onClose={() => setShowPopup(false)} />
      )}
      {showNotification && <NotificationPopup onClose={() => setShowNotification(false)} />}
      {showMessages && <MessagePopup onClose={() => setShowMessages(false)} />}
    </nav>
  );
};

export default Nav;
