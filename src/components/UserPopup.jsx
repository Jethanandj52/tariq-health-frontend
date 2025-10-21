import React, { useEffect, useRef } from "react";

const UserPopup = ({ user, onLogout, onClose }) => {
  const popupRef = useRef(null);

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!user) return null;

  return (
    <div
      ref={popupRef}
      className="absolute right-5 top-16 w-72 bg-white/100 dark:bg-gray-900/100 backdrop-blur-md border border-green-200 dark:border-gray-700 rounded-2xl shadow-xl p-5 z-50 animate-slide-up transition-all duration-300"
    >
      {/* User Info */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={user.url || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-400 dark:border-green-600 shadow-md"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>

        <p className="mt-3 font-semibold text-lg text-gray-800 dark:text-gray-100">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
      

        <button
          onClick={onLogout}
          className="w-full py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 active:scale-95 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPopup;
