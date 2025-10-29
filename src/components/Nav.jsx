import React, { useEffect, useState } from "react";
import { FiBell, FiUser, FiMenu, FiX, FiMessageSquare, FiMessageCircle, FiUserPlus } from "react-icons/fi";
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

  const handleLogout = async () => {
    try {
      await axios.post("https://hackathon-backend-flax.vercel.app/auth/logout", {
        email: user?.email,
      });
      toast.success("Logout successful", { autoClose: 1000 });
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-600 dark:from-gray-800 dark:to-gray-900 shadow-xl z-50 border-b border-green-700 dark:border-gray-700">
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/home")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966482.png"
            alt="Logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md border-2 border-white dark:border-gray-600"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
            HealthMate
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-semibold text-white">
          <Link to="/home" className="hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/family" className="hover:text-yellow-300 transition-colors">Family</Link>
          <Link to="/about" className="hover:text-yellow-300 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-xl relative text-white">
          <FiMessageCircle
            className="cursor-pointer hover:text-yellow-300 transition-transform hover:scale-110"
            onClick={() => { setShowMessages(!showMessages); setShowNotification(false); setShowPopup(false); }}
          />
          <FiBell
            className="cursor-pointer hover:text-yellow-300 transition-transform hover:scale-110"
            onClick={() => { setShowNotification(!showNotification); setShowMessages(false); setShowPopup(false); }}
          />
          <ModeToggle />
          <FiUserPlus
            className="cursor-pointer hover:text-yellow-300 transition-transform hover:scale-110"
            onClick={() => { setShowPopup(!showPopup); setShowNotification(false); setShowMessages(false); }}
          />

          {/* Mobile Menu */}
          <button
            className="md:hidden text-2xl focus:outline-none hover:text-yellow-300 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-green-600 dark:bg-gray-800 overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col items-center py-4 space-y-4 text-lg font-medium text-white">
          <Link to="/dashboard" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/report" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Reports</Link>
          <Link to="/doctors" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Doctors</Link>
          <Link to="/family" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Family</Link>
          <Link to="/chat" className="hover:text-yellow-300" onClick={() => setMenuOpen(false)}>AI Chat</Link>
        </div>
      </div>

      {/* Popups */}
      {showPopup && <UserPopup user={user} onLogout={handleLogout} onClose={() => setShowPopup(false)} />}
      {showNotification && <NotificationPopup onClose={() => setShowNotification(false)} />}
      {showMessages && <MessagePopup onClose={() => setShowMessages(false)} />}
    </nav>
  );
};

export default Nav;
